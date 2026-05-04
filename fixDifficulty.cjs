const fs = require('fs');

// Manual overrides for text-based inference corrections
// IDs 486-502: "What is the output/time complexity" code analysis questions → 2
// ID 359: "Which hook initializes bean properties after dependency injection?" → 2 (not advanced)
// ID 477: "What is the space complexity of iterative DP vs recursive DP" → 2 (comparison)
// ID 419: "What is the default thread pool size for @Async" → 2 (specific config knowledge)
// ID 367: "What is API versioning strategy in URI path" → 2 (not just a definition)
// ID 372: "What is Webhook primarily used for?" → 1 (basic definition, keep as 1)
// ID 392: "What does SLO define?" → 1 (basic definition, keep as 1)
// ID 348: "What is the purpose of Spring Cloud Config?" → 1 (basic definition, keep as 1)
// ID 358: "What does Micrometer library provide?" → 1 (basic definition, keep as 1)
// ID 378: "What does Spring Cloud Sleuth provide?" → 1 (basic definition, keep as 1)
// ID 398: "What does Reactor library provide?" → 1 (basic definition, keep as 1)
// ID 281: "What is the blueprint used to create Docker containers?" → 1 (basic, keep)
// ID 301: "What does CI stand for?" → 1 (basic, keep)
// ID 307: "What does OAuth2 mainly provide?" → 1 (basic, keep)
// ID 319: "What is the size of int in Java?" → 1 (basic, keep)

const overrides = {
  // Code analysis questions (486-502) - these require reading code, not just definitions
  486: 2, 487: 2, 488: 2, 489: 2, 490: 2, 491: 2, 492: 2, 493: 2,
  494: 2, 495: 2, 496: 2, 497: 2, 498: 2, 499: 2, 500: 2, 501: 2, 502: 2,
  // Comparison/how-it-works questions misclassified as 1
  477: 2, // "What is the space complexity of iterative DP vs recursive DP" - comparison
  419: 2, // "What is the default thread pool size for @Async" - specific config knowledge
  367: 2, // "What is API versioning strategy in URI path" - pattern knowledge
  // Misclassified as 3
  359: 2, // "Which hook initializes bean properties after dependency injection?" - common Spring knowledge
};

let content = fs.readFileSync('src/data/quizData.js', 'utf8');
let changeCount = 0;

for (const [idStr, difficulty] of Object.entries(overrides)) {
  const id = parseInt(idStr);
  const pattern = new RegExp(`(\\{ id: ${id}, difficulty: )(\\d+)(,)`, 'g');
  content = content.replace(pattern, (match, pre, oldDiff, post) => {
    if (parseInt(oldDiff) !== difficulty) {
      console.log(`id ${id}: ${oldDiff} → ${difficulty}`);
      changeCount++;
    }
    return `${pre}${difficulty}${post}`;
  });
}

fs.writeFileSync('src/data/quizData.js', content, 'utf8');
console.log(`\nApplied ${changeCount} override corrections.`);

// Final verification
const verifyContent = fs.readFileSync('src/data/quizData.js', 'utf8');
const verifyPairs = {};
const verifyRegex = /\{ id: (\d+), difficulty: (\d+),/g;
let vm;
while ((vm = verifyRegex.exec(verifyContent)) !== null) {
  verifyPairs[parseInt(vm[1])] = parseInt(vm[2]);
}

// Count by difficulty
const counts = {1: 0, 2: 0, 3: 0};
for (const d of Object.values(verifyPairs)) {
  counts[d] = (counts[d] || 0) + 1;
}
console.log('\nFinal difficulty distribution:');
console.log('  Difficulty 1 (Beginner):', counts[1]);
console.log('  Difficulty 2 (Intermediate):', counts[2]);
console.log('  Difficulty 3 (Advanced):', counts[3]);
console.log('  Total:', counts[1] + counts[2] + counts[3]);

// Verify key assignments from spec
const specChecks = [
  // Java
  [1,1],[2,1],[3,1],[4,1],[5,2],[6,2],[7,2],[8,1],[9,2],[10,1],
  [11,2],[12,2],[13,2],[14,2],[15,2],[16,1],[17,1],[18,1],[19,1],[20,2],
  [21,1],[22,1],[23,2],[24,2],[25,1],
  [121,2],[122,2],[123,2],[124,2],[125,1],[126,2],[127,2],[128,2],[129,2],[130,2],
  [131,2],[132,1],[133,1],[134,1],[135,1],[136,2],[137,2],[138,2],[139,3],[140,2],
  [141,1],[142,2],[143,1],[144,2],[145,1],[146,3],[147,2],[148,1],[149,1],[150,3],
  [571,2],[572,3],[573,2],[574,2],[575,3],[576,2],
  // Spring Boot
  [26,1],[27,1],[28,1],[29,1],[30,1],[31,1],[32,1],[33,2],[34,1],[35,2],
  [36,1],[37,1],[38,2],[39,2],[40,1],[41,1],[42,1],[43,1],[44,2],[45,1],
  [151,1],[152,2],[153,1],[154,2],[155,1],[156,2],[157,2],[158,2],[159,2],[160,1],
  [161,1],[162,2],[163,1],[164,1],[165,2],[166,1],[167,1],[168,1],[169,1],[170,2],
  [171,2],[172,1],[173,1],[174,1],[175,1],[176,2],[177,2],[178,1],[179,1],[180,3],
  [543,1],[544,2],[545,2],[546,2],[547,2],[548,2],[549,2],[550,2],
  [551,2],[552,2],[553,3],[554,3],[555,2],[556,1],
  [577,1],[578,1],[579,1],[580,2],[581,2],[582,2],[583,2],[584,2],[585,2],[586,2],
  [587,2],[588,1],[589,1],[590,2],[591,3],[592,3],[593,3],[594,2],[595,3],[596,2],
  // REST APIs
  [46,2],[47,1],[48,1],[49,1],[50,1],[51,1],[52,2],[53,2],[54,1],[55,2],
  [56,1],[57,3],[58,1],[59,2],[60,1],[61,1],[62,2],[63,2],[64,1],
  [181,1],[182,1],[183,1],[184,3],[185,1],[186,2],[187,2],[188,2],[189,3],[190,2],
  [191,1],[192,3],[193,2],[194,2],[195,1],[196,1],[197,1],[198,1],[199,1],[200,1],
  [201,2],[202,2],[203,1],[204,3],[205,1],[206,2],[207,3],[208,2],[209,1],[210,1],
  [503,2],[504,2],[505,2],[506,2],[507,2],[508,2],[509,2],[510,2],
  [511,2],[512,2],[513,2],[514,2],[515,2],[516,2],[517,2],[518,2],
  [519,2],[520,2],[521,2],[522,2],[523,2],[524,2],[525,2],[526,2],
  [527,2],[528,2],[529,2],[530,2],[531,2],[532,2],[533,3],[534,2],
  [535,2],[536,2],[537,3],[538,1],[539,2],[540,1],[541,3],[542,2],
  // Kafka
  [65,1],[66,1],[67,2],[68,2],[69,2],[70,2],[71,1],[72,2],[73,3],[74,2],
  [75,2],[76,1],[77,2],[78,2],[79,1],[80,1],
  [211,2],[212,2],[213,3],[214,2],[215,2],[216,3],[217,2],[218,2],[219,3],[220,3],
  [221,2],[222,2],[223,2],[224,3],[225,1],[226,2],[227,1],[228,3],[229,2],[230,3],
  // Microservices
  [81,2],[82,2],[83,1],[84,2],[85,2],[86,2],[87,2],[88,3],[89,3],[90,2],
  [91,2],[92,2],[93,2],[94,3],[95,2],[96,3],[97,2],[98,1],[99,3],
  [231,3],[232,2],[233,1],[234,3],[235,2],[236,3],[237,1],[238,1],[239,2],[240,2],
  [241,2],[242,2],[243,2],[244,3],[245,3],[246,2],[247,2],[248,2],[249,1],[250,2],
  // Coding Patterns
  [100,1],[101,1],[102,1],[103,2],[104,2],[105,2],[106,3],[107,2],[108,2],[109,2],
  [110,2],[111,3],[112,2],[113,3],[114,2],[115,2],[116,2],[117,2],[118,1],[119,1],
  [120,2],
  // SQL
  [251,1],[252,1],[253,1],[254,3],[255,2],[256,2],[257,2],[258,1],[259,1],[260,3],
  [261,1],[262,1],[263,2],[264,3],[265,2],[266,1],[267,1],[268,1],[269,1],[270,1],
  [271,2],[272,2],[273,2],[274,2],
  [565,2],[566,2],[567,2],[568,2],[569,2],[570,2],
  // Infra & Cloud specific
  [557,1],[558,2],[559,2],[560,2],[561,2],[562,3],[563,2],[564,1],
];

let errors = 0;
for (const [id, expected] of specChecks) {
  const actual = verifyPairs[id];
  if (actual !== expected) {
    console.log(`FAIL: id ${id} expected ${expected} got ${actual}`);
    errors++;
  }
}
if (errors === 0) {
  console.log('\nAll spec checks passed! ✓');
} else {
  console.log(`\n${errors} spec check failures.`);
}
