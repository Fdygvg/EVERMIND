const fs = require('fs');

// Read Question.md
const questionFile = fs.readFileSync('BUILD BREAK FIX/Question.md', 'utf8');

// Function to combine question objects
function combineQuestions(q1, q2) {
    // Combine questions into a comprehensive title
    const combinedQuestion = combineQuestionTitles(q1.question, q2.question);
    
    // Combine answers without repetition
    const combinedAnswer = combineAnswers(q1.answer, q2.answer);
    
    // Combine tags
    const combinedTags = [...new Set([...(q1.tags || []), ...(q2.tags || [])])];
    
    return {
        question: combinedQuestion,
        answer: combinedAnswer,
        type: q1.type || q2.type,
        tags: combinedTags
    };
}

function combineQuestionTitles(q1, q2) {
    // Extract key topics from each question
    const topics1 = extractTopics(q1);
    const topics2 = extractTopics(q2);
    
    // Create comprehensive question
    if (topics1 && topics2) {
        return `How to handle ${topics1} and ${topics2}?`;
    }
    
    // Fallback
    return `${q1} and ${q2}`;
}

function extractTopics(question) {
    // Extract key topics from question text
    if (question.includes('?')) {
        const mainTopic = question.replace(/\?$/, '').trim();
        return mainTopic;
    }
    return null;
}

function combineAnswers(a1, a2) {
    // Simple combination - this is a basic approach
    // We'll improve this as we go
    return `${a1}\n\n${a2}`;
}

// Parse the questions from Question.md
function parseQuestions(content) {
    const newQuestions = [];
    
    // Split by && separator
    const sections = content.split('&&');
    
    let currentGroup = [];
    
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i].trim();
        
        // Try to extract JSON object from section
        const jsonMatch = section.match(/\{[\s\S]*?\}/);
        
        if (jsonMatch) {
            try {
                const obj = JSON.parse(jsonMatch[0]);
                currentGroup.push(obj);
            } catch (e) {
                console.error('Could not parse JSON:', e);
            }
        }
        
        // If we hit a separator or end, process the group
        if (section.includes('---') || section.includes('--------------------') || i === sections.length - 1) {
            if (currentGroup.length > 1) {
                // Combine questions
                let combined = currentGroup[0];
                for (let j = 1; j < currentGroup.length; j++) {
                    combined = combineQuestions(combined, currentGroup[j]);
                }
                newQuestions.push(combined);
            } else if (currentGroup.length === 1) {
                newQuestions.push(currentGroup[0]);
            }
            currentGroup = [];
        }
    }
    
    return newQuestions;
}

const newQuestions = parseQuestions(questionFile);

// Read existing programming.json
const existingData = JSON.parse(fs.readFileSync('data/programming.json', 'utf8'));

// Filter out the question that's already added (CSS background)
const filteredNew = newQuestions.filter(q => {
    return !q.question.includes('set and control CSS background images');
});

// Add new questions
const updatedData = [...existingData, ...filteredNew];

// Write back
fs.writeFileSync('data/programming.json', JSON.stringify(updatedData, null, 2));

console.log(`Added ${filteredNew.length} new questions`);
