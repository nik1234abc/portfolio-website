import fs from 'fs';
import path from 'path';

const filePath = './src/data/quizData.js';
const content = fs.readFileSync(filePath, 'utf-8');

// Key explanations for common confusion areas
const explanations = {
  22: "ArrayList is a List that maintains insertion order. While CopyOnWriteArrayList is thread-safe, it's not the primary answer for insertion order maintenance.", // Which collection maintains insertion order and allows duplicates?
  146: "ConcurrentHashMap is fully thread-safe and fail-safe. CopyOnWriteArrayList uses fail-fast iterators despite thread-safety. Collections like HashMap are NOT thread-safe.", // Which collection is fail-safe?
  20: "ConcurrentHashMap is the thread-safe alternative (introduced in Java 5). HashMap is not thread-safe; Vector is thread-safe but legacy.", // What is the name of the thread-safe alternative to HashMap introduced in Java 5?
  136: "Comparator is used for custom sorting (external). Comparable is for natural ordering (internal to class).", // Which interface provides custom object comparison?
  137: "Comparable defines natural ordering within a class. Comparator provides custom sorting externally.", // Which interface provides natural ordering?
  5: "HashSet does NOT allow duplicates. ArrayList, LinkedList, and Vector all allow duplicates.", // Which collection does NOT allow duplicate elements?
};

// Function to add explanation field
const lines = content.split('\n');
const newLines = [];

lines.forEach(line => {
  // Check if line contains a question definition
  const match = line.match(/\{\s*id:\s*(\d+),/);
  if (match) {
    const questionId = parseInt(match[1]);
    if (explanations[questionId]) {
      // Add explanation before closing brace
      line = line.replace(/\s*\},?\s*$/, `, explanation: "${explanations[questionId]}" },`);
    } else if (line.trim().endsWith('},') || line.trim().endsWith('}')) {
      // Add placeholder explanation
      line = line.replace(/\s*\},?\s*$/, `, explanation: "" },`);
    }
  }
  newLines.push(line);
});

// Write back
fs.writeFileSync(filePath, newLines.join('\n'));
console.log('✓ Added explanation field to all questions');
console.log(`✓ Populated ${Object.keys(explanations).length} key explanations`);
