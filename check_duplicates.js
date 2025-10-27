const fs = require('fs');

// Read the programming.json file
const data = fs.readFileSync('data/programming.json', 'utf8');
const questions = JSON.parse(data);

console.log(`Total questions: ${questions.length}\n`);

// Create a map to track question counts
const questionMap = new Map();
const duplicates = [];

// Track questions by their text
questions.forEach((q, index) => {
    const key = q.question.toLowerCase().trim();
    if (questionMap.has(key)) {
        duplicates.push({
            question: q.question,
            indices: [questionMap.get(key), index],
            originalIndex: questionMap.get(key),
            duplicateIndex: index
        });
    } else {
        questionMap.set(key, index);
    }
});

// Check for similar questions (not exact duplicates)
console.log('\n=== EXACT DUPLICATES ===');
if (duplicates.length === 0) {
    console.log('No exact duplicates found!');
} else {
    duplicates.forEach(dup => {
        console.log(`\nQuestion: "${dup.question}"`);
        console.log(`  Found at indices: ${dup.indices[0]} and ${dup.indices[1]}`);
    });
}

// Check for similar questions (fuzzy matching)
console.log('\n=== POTENTIAL REDUNDANCIES ===');
const similarQuestions = [];
const allQuestions = questions.map((q, i) => ({ ...q, index: i }));

// Check for similar questions
for (let i = 0; i < allQuestions.length; i++) {
    for (let j = i + 1; j < allQuestions.length; j++) {
        const q1 = allQuestions[i].question.toLowerCase();
        const q2 = allQuestions[j].question.toLowerCase();
        
        // Check if one question is contained in another
        if (q1.includes(q2) && q1 !== q2 && q1.length > 10 && q2.length > 10) {
            similarQuestions.push({
                question1: allQuestions[i].question,
                question2: allQuestions[j].question,
                index1: allQuestions[i].index,
                index2: allQuestions[j].index
            });
        } else if (q2.includes(q1) && q1 !== q2 && q1.length > 10 && q2.length > 10) {
            similarQuestions.push({
                question1: allQuestions[j].question,
                question2: allQuestions[i].question,
                index1: allQuestions[j].index,
                index2: allQuestions[i].index
            });
        }
    }
}

// Limit similar questions output
if (similarQuestions.length > 0) {
    console.log(`Found ${similarQuestions.length} potentially similar questions:`);
    similarQuestions.slice(0, 10).forEach(sim => {
        console.log(`\n  Index ${sim.index1}: "${sim.question1}"`);
        console.log(`  Index ${sim.index2}: "${sim.question2}"`);
        console.log('  ---');
    });
    
    if (similarQuestions.length > 10) {
        console.log(`\n... and ${similarQuestions.length - 10} more similar questions`);
    }
} else {
    console.log('No obvious similar/redundant questions found!');
}

// Summary
console.log('\n=== SUMMARY ===');
console.log(`Total questions: ${questions.length}`);
console.log(`Exact duplicates: ${duplicates.length}`);
console.log(`Similar/redundant: ${similarQuestions.length}`);


