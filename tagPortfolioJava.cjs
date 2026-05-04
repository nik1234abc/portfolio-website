/**
 * Tags Java questions in portfolio.js with difficulty: 1|2|3
 * Java questions are inline (id 1–90+) in the questions array.
 *
 * Rules:
 *   1 = "What is X", basic definitions, simple facts
 *   2 = How it works, comparisons, usage patterns
 *   3 = Edge cases, internals, concurrency gotchas, advanced
 *
 * Java-specific ID ranges (from assignTopics in portfolio.js):
 *   1–7   Core Java Basics          → mostly L1
 *   8–15  OOP Concepts              → L1/L2
 *   16–22 Object & Class Deep       → L2
 *   23–30 JVM & Memory              → L2/L3
 *   31–35 String & Immutable        → L2
 *   36–47 Collections Framework     → L2/L3
 *   48–58 Multithreading            → L2/L3
 *   59–64 Exception Handling        → L1/L2
 *   65–73 Java 8 Features           → L2
 *   74–78 Keywords & Concepts       → L1/L2
 *   79–90 Advanced Concepts         → L2/L3
 *   91+   VS Questions              → L2/L3
 */

const fs = require("fs");
const path = require("path");

// Per-ID difficulty map for Java questions (id → difficulty)
const javaDifficulty = {
  // Core Java Basics (1-7) — L1
  1: 1, 2: 1, 3: 1, 4: 1, 5: 1, 6: 1, 7: 2,
  // OOP Concepts (8-15) — L1/L2
  8: 1, 9: 1, 10: 1, 11: 1, 12: 2, 13: 2, 14: 2, 15: 2,
  // Object & Class Deep (16-22) — L2
  16: 2, 17: 2, 18: 2, 19: 2, 20: 2, 21: 2, 22: 2,
  // JVM & Memory (23-30) — L2/L3
  23: 2, 24: 2, 25: 2, 26: 2, 27: 3, 28: 3, 29: 2, 30: 2,
  // String & Immutable (31-35) — L2
  31: 2, 32: 2, 33: 2, 34: 2, 35: 2,
  // Collections Framework (36-47) — L2/L3
  36: 1, 37: 2, 38: 2, 39: 2, 40: 2, 41: 2, 42: 2,
  43: 2, 44: 3, 45: 3, 46: 2, 47: 2,
  // Multithreading & Concurrency (48-58) — L2/L3
  48: 1, 49: 2, 50: 2, 51: 2, 52: 3, 53: 3, 54: 3,
  55: 3, 56: 3, 57: 3, 58: 2,
  // Exception Handling (59-64) — L1/L2
  59: 1, 60: 1, 61: 2, 62: 2, 63: 2, 64: 2,
  // Java 8 Features (65-73) — L2
  65: 1, 66: 2, 67: 2, 68: 2, 69: 2, 70: 2, 71: 2, 72: 2, 73: 2,
  // Keywords & Important Concepts (74-78) — L1/L2
  74: 1, 75: 1, 76: 2, 77: 2, 78: 2,
  // Advanced Concepts (79-90) — L2/L3
  79: 2, 80: 2, 81: 3, 82: 3, 83: 3, 84: 3, 85: 2, 86: 2, 87: 2, 88: 2, 89: 2, 90: 2,
  // VS Questions (91+) — L2/L3
  91: 2, 92: 2, 93: 2, 94: 2, 95: 2, 96: 2, 97: 2, 98: 2, 99: 2, 100: 2,
};

const filePath = path.resolve(__dirname, "src/data/portfolio.js");
let src = fs.readFileSync(filePath, "utf8");

// We need to inject difficulty into Java question objects.
// Pattern: find `id: N,\n        category: "Java",` and inject difficulty after category line.
// The questions are multi-line objects so we match across lines.

let count = 0;

// Match: id: N, (newline) category: "Java", — inject difficulty: X after category line
src = src.replace(
  /(^\s+id:\s*(\d+),\s*\n\s+category:\s*"Java",)/gm,
  (match, full, idStr) => {
    const id = parseInt(idStr, 10);
    const diff = javaDifficulty[id] || 2;
    count++;
    // Insert difficulty right after the category line
    return full + `\n        difficulty: ${diff},`;
  }
);

fs.writeFileSync(filePath, src, "utf8");
console.log(`✓ portfolio.js — tagged ${count} Java questions with difficulty levels`);
