const fs = require('fs');
const content = fs.readFileSync('src/data/quizData.js', 'utf8');
const regex = /\{ id: (\d+), difficulty: (\d+), topic: "([^"]+)", type: "[^"]+", question: "([^"]+)"/g;
let m;
const questions = [];
while ((m = regex.exec(content)) !== null) {
  questions.push({ id: parseInt(m[1]), difficulty: parseInt(m[2]), topic: m[3], question: m[4] });
}

// Show questions 486-502 (coding pattern 'What is' questions)
console.log('=== Coding pattern questions 476-502 ===');
questions.filter(q => q.id >= 476 && q.id <= 502).forEach(q => {
  console.log(q.id + ' d=' + q.difficulty + ' | ' + q.question.substring(0, 90));
});

// Show questions 352, 359 (potential misclassifications)
console.log('\n=== Potential misclassifications ===');
[352, 359, 411, 449, 464, 470, 473, 485].forEach(id => {
  const q = questions.find(x => x.id === id);
  if (q) console.log(q.id + ' d=' + q.difficulty + ' | ' + q.question.substring(0, 90));
});

// Show all difficulty 1 in 275-502 range
console.log('\n=== Difficulty 1 in 275-502 ===');
questions.filter(q => q.id >= 275 && q.id <= 502 && q.difficulty === 1).forEach(q => {
  console.log(q.id + ' d=' + q.difficulty + ' | ' + q.question.substring(0, 90));
});

// Show all difficulty 3 in 275-502 range
console.log('\n=== Difficulty 3 in 275-502 ===');
questions.filter(q => q.id >= 275 && q.id <= 502 && q.difficulty === 3).forEach(q => {
  console.log(q.id + ' d=' + q.difficulty + ' | ' + q.question.substring(0, 90));
});
