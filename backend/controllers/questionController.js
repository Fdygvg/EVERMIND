const Question = require('../models/Question');
const axios = require('axios');

// Get all questions with optional filtering
const getAllQuestions = async (req, res) => {
  try {
    const { section, type, limit = 100, skip = 0 } = req.query;
    
    // Build query object
    const query = {};
    if (section) query.section = section;
    if (type) query.type = type;
    
    const questions = await Question.find(query)
      .limit(parseInt(limit))
      .skip(parseInt(skip))
      .sort({ createdAt: -1 });
    
    res.json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch questions',
      error: error.message
    });
  }
};

// Get single question by ID
const getQuestionById = async (req, res) => {
  try {
    const question = await Question.findById(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    res.json({
      success: true,
      data: question
    });
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch question',
      error: error.message
    });
  }
};

// Process raw text with Groq AI
const processRawQuestions = async (req, res) => {
  try {
    const { rawText, section } = req.body;
    
    if (!rawText || !section) {
      return res.status(400).json({
        success: false,
        message: 'Raw text and section are required'
      });
    }
    
    // Groq API prompt
    const groqPrompt = `
You are a question formatter for EVERMIND learning app.

Parse the following raw text and return ONLY a valid JSON array of question objects. Do not include any explanations, markdown formatting, or additional text.

Rules:
1. Each object must have: question, answer, type, tags
2. For programming questions, add a "code" field with executable example
3. For flag questions, add "image" field with https://flagcdn.com/w320/{country-code}.png
4. For Bible questions, format as "Where in the Bible does it talk about [topic]?"
5. Infer the "type" from context (javascript, python, html, git, bible, flags, etc.)
6. Keep tags minimal and relevant (max 2-3 tags)
7. Return ONLY valid JSON array, no markdown, no explanations, no additional text

Section: ${section}
Raw text:
${rawText}

Return ONLY this format (no markdown, no explanations):
[
  {
    "question": "...",
    "answer": "...",
    "type": "...",
    "tags": ["...", "..."],
    "code": "..." // optional
  }
]
`;

    // Call Groq API
    const groqResponse = await axios.post('https://api.groq.com/openai/v1/chat/completions', {
      model: 'llama-3.1-8b-instant',
      messages: [
        { role: 'user', content: groqPrompt }
      ],
      temperature: 0.1,
      max_tokens: 2000
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.GROQ_API_KEY2}`
      }
    });

    const aiResponse = groqResponse.data.choices[0].message.content;
    
    // Clean up the AI response - remove markdown formatting if present
    let cleanedResponse = aiResponse.trim();
    
    // Remove markdown code blocks if present
    if (cleanedResponse.startsWith('```json')) {
      cleanedResponse = cleanedResponse.replace(/^```json\s*/, '').replace(/\s*```$/, '');
    } else if (cleanedResponse.startsWith('```')) {
      cleanedResponse = cleanedResponse.replace(/^```\s*/, '').replace(/\s*```$/, '');
    }
    
    // Remove any leading/trailing text that's not JSON
    const jsonStart = cleanedResponse.indexOf('[');
    const jsonEnd = cleanedResponse.lastIndexOf(']') + 1;
    
    if (jsonStart !== -1 && jsonEnd > jsonStart) {
      cleanedResponse = cleanedResponse.substring(jsonStart, jsonEnd);
    }
    
    console.log('🤖 Raw AI Response:', aiResponse);
    console.log('🧹 Cleaned Response:', cleanedResponse);
    
    // Parse AI response
    let parsedQuestions;
    try {
      parsedQuestions = JSON.parse(cleanedResponse);
    } catch (parseError) {
      console.error('❌ Failed to parse AI response:', parseError);
      console.error('📝 Response that failed to parse:', cleanedResponse);
      
      // Try to extract JSON from the response if it's embedded in text
      const jsonMatch = cleanedResponse.match(/\[[\s\S]*\]/);
      if (jsonMatch) {
        try {
          parsedQuestions = JSON.parse(jsonMatch[0]);
          console.log('✅ Successfully extracted JSON from response');
        } catch (secondParseError) {
          console.error('❌ Second parse attempt failed:', secondParseError);
          return res.status(500).json({
            success: false,
            message: 'Failed to parse AI response. The AI returned invalid JSON format.',
            error: parseError.message,
            rawResponse: aiResponse.substring(0, 500) + '...' // First 500 chars for debugging
          });
        }
      } else {
        return res.status(500).json({
          success: false,
          message: 'Failed to parse AI response. The AI returned invalid JSON format.',
          error: parseError.message,
          rawResponse: aiResponse.substring(0, 500) + '...' // First 500 chars for debugging
        });
      }
    }

    // Validate and save questions
    const savedQuestions = [];
    const errors = [];

    for (const questionData of parsedQuestions) {
      try {
        // Add section to each question
        questionData.section = section;
        
        // Validate required fields
        if (!questionData.question || !questionData.answer || !questionData.type) {
          errors.push(`Missing required fields: ${JSON.stringify(questionData)}`);
          continue;
        }
        
        const question = new Question(questionData);
        const savedQuestion = await question.save();
        savedQuestions.push(savedQuestion);
      } catch (saveError) {
        errors.push(`Failed to save question: ${saveError.message}`);
      }
    }

    res.json({
      success: true,
      message: `Processed ${savedQuestions.length} questions successfully`,
      data: savedQuestions,
      errors: errors.length > 0 ? errors : undefined
    });

  } catch (error) {
    console.error('Error processing questions:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to process questions',
      error: error.message
    });
  }
};

// Create new question
const createQuestion = async (req, res) => {
  try {
    const question = new Question(req.body);
    const savedQuestion = await question.save();
    
    res.status(201).json({
      success: true,
      message: 'Question created successfully',
      data: savedQuestion
    });
  } catch (error) {
    console.error('Error creating question:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create question',
      error: error.message
    });
  }
};

// Update question
const updateQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Question updated successfully',
      data: question
    });
  } catch (error) {
    console.error('Error updating question:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update question',
      error: error.message
    });
  }
};

// Delete question
const deleteQuestion = async (req, res) => {
  try {
    const question = await Question.findByIdAndDelete(req.params.id);
    
    if (!question) {
      return res.status(404).json({
        success: false,
        message: 'Question not found'
      });
    }
    
    res.json({
      success: true,
      message: 'Question deleted successfully',
      data: question
    });
  } catch (error) {
    console.error('Error deleting question:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete question',
      error: error.message
    });
  }
};

module.exports = {
  getAllQuestions,
  getQuestionById,
  processRawQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion
};
