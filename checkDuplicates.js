import { quizData } from './src/data/quizData.js';

// Find duplicates
const questionMap = {};
const duplicates = [];
const topics = {};

quizData.forEach(q => {
  const key = q.question.toLowerCase().trim();
  
  // Count topics
  if (!topics[q.topic]) {
    topics[q.topic] = 0;
  }
  topics[q.topic]++;
  
  if (questionMap[key]) {
    duplicates.push({
      id1: questionMap[key],
      id2: q.id,
      question: q.question,
      answer1: quizData.find(x => x.id === questionMap[key]).answer,
      answer2: q.answer
    });
  } else {
    questionMap[key] = q.id;
  }
});

console.log('╔════════════════════════════════════════╗');
console.log('║     QUIZ DATA ANALYSIS REPORT         ║');
console.log('╚════════════════════════════════════════╝\n');

console.log(`Total Questions: ${quizData.length}\n`);

console.log('Questions per Topic:');
Object.keys(topics).sort().forEach(topic => {
  console.log(`  • ${topic}: ${topics[topic]}`);
});

console.log('\n' + '─'.repeat(40));

if (duplicates.length === 0) {
  console.log('✓ NO DUPLICATES FOUND');
} else {
  console.log(`⚠ DUPLICATES FOUND: ${duplicates.length}`);
  duplicates.forEach((dup, idx) => {
    console.log(`\n  ${idx + 1}. IDs ${dup.id1} & ${dup.id2}:`);
    console.log(`     Question: "${dup.question}"`);
    console.log(`     Answer1: ${dup.answer1} | Answer2: ${dup.answer2}`);
  });
}

console.log('\n' + '─'.repeat(40));
