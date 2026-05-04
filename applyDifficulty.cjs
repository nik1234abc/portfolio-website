const fs = require('fs');

// ─── COMPLETE DIFFICULTY MAP ─────────────────────────────────────────────────
// All explicitly specified IDs
const difficultyMap = {
  // Java (1-25)
  1:1, 2:1, 3:1, 4:1, 5:2, 6:2, 7:2, 8:1, 9:2, 10:1,
  11:2, 12:2, 13:2, 14:2, 15:2, 16:1, 17:1, 18:1, 19:1, 20:2,
  21:1, 22:1, 23:2, 24:2, 25:1,
  // Java (121-150)
  121:2, 122:2, 123:2, 124:2, 125:1, 126:2, 127:2, 128:2, 129:2, 130:2,
  131:2, 132:1, 133:1, 134:1, 135:1, 136:2, 137:2, 138:2, 139:3, 140:2,
  141:1, 142:2, 143:1, 144:2, 145:1, 146:3, 147:2, 148:1, 149:1, 150:3,
  // Java (571-576)
  571:2, 572:3, 573:2, 574:2, 575:3, 576:2,
  // Spring Boot (26-45)
  26:1, 27:1, 28:1, 29:1, 30:1, 31:1, 32:1, 33:2, 34:1, 35:2,
  36:1, 37:1, 38:2, 39:2, 40:1, 41:1, 42:1, 43:1, 44:2, 45:1,
  // Spring Boot (151-180)
  151:1, 152:2, 153:1, 154:2, 155:1, 156:2, 157:2, 158:2, 159:2, 160:1,
  161:1, 162:2, 163:1, 164:1, 165:2, 166:1, 167:1, 168:1, 169:1, 170:2,
  171:2, 172:1, 173:1, 174:1, 175:1, 176:2, 177:2, 178:1, 179:1, 180:3,
  // Spring Boot (543-556)
  543:1, 544:2, 545:2, 546:2, 547:2, 548:2, 549:2, 550:2,
  551:2, 552:2, 553:3, 554:3, 555:2, 556:1,
  // Spring Boot (577-596)
  577:1, 578:1, 579:1, 580:2, 581:2, 582:2, 583:2, 584:2, 585:2, 586:2,
  587:2, 588:1, 589:1, 590:2, 591:3, 592:3, 593:3, 594:2, 595:3, 596:2,
  // REST APIs (46-64)
  46:2, 47:1, 48:1, 49:1, 50:1, 51:1, 52:2, 53:2, 54:1, 55:2,
  56:1, 57:3, 58:1, 59:2, 60:1, 61:1, 62:2, 63:2, 64:1,
  // REST APIs (181-210)
  181:1, 182:1, 183:1, 184:3, 185:1, 186:2, 187:2, 188:2, 189:3, 190:2,
  191:1, 192:3, 193:2, 194:2, 195:1, 196:1, 197:1, 198:1, 199:1, 200:1,
  201:2, 202:2, 203:1, 204:3, 205:1, 206:2, 207:3, 208:2, 209:1, 210:1,
  // REST APIs (503-542)
  503:2, 504:2, 505:2, 506:2, 507:2, 508:2, 509:2, 510:2,
  511:2, 512:2, 513:2, 514:2, 515:2, 516:2, 517:2, 518:2,
  519:2, 520:2, 521:2, 522:2, 523:2, 524:2, 525:2, 526:2,
  527:2, 528:2, 529:2, 530:2, 531:2, 532:2, 533:3, 534:2,
  535:2, 536:2, 537:3, 538:1, 539:2, 540:1, 541:3, 542:2,
  // Kafka (65-80)
  65:1, 66:1, 67:2, 68:2, 69:2, 70:2, 71:1, 72:2, 73:3, 74:2,
  75:2, 76:1, 77:2, 78:2, 79:1, 80:1,
  // Kafka (211-230)
  211:2, 212:2, 213:3, 214:2, 215:2, 216:3, 217:2, 218:2, 219:3, 220:3,
  221:2, 222:2, 223:2, 224:3, 225:1, 226:2, 227:1, 228:3, 229:2, 230:3,
  // Microservices (81-99)
  81:2, 82:2, 83:1, 84:2, 85:2, 86:2, 87:2, 88:3, 89:3, 90:2,
  91:2, 92:2, 93:2, 94:3, 95:2, 96:3, 97:2, 98:1, 99:3,
  // Microservices (231-250)
  231:3, 232:2, 233:1, 234:3, 235:2, 236:3, 237:1, 238:1, 239:2, 240:2,
  241:2, 242:2, 243:2, 244:3, 245:3, 246:2, 247:2, 248:2, 249:1, 250:2,
  // Coding Patterns (100-120)
  100:1, 101:1, 102:1, 103:2, 104:2, 105:2, 106:3, 107:2, 108:2, 109:2,
  110:2, 111:3, 112:2, 113:3, 114:2, 115:2, 116:2, 117:2, 118:1, 119:1,
  120:2,
  // SQL (251-274)
  251:1, 252:1, 253:1, 254:3, 255:2, 256:2, 257:2, 258:1, 259:1, 260:3,
  261:1, 262:1, 263:2, 264:3, 265:2, 266:1, 267:1, 268:1, 269:1, 270:1,
  271:2, 272:2, 273:2, 274:2,
  // SQL (565-570)
  565:2, 566:2, 567:2, 568:2, 569:2, 570:2,
  // Infra & Cloud specific (557-564)
  557:1, 558:2, 559:2, 560:2, 561:2, 562:3, 563:2, 564:1,
};

// ─── TEXT-BASED RULES FOR INFRA & CLOUD (275-502) ────────────────────────────
// Questions asking "What is X?" or basic definitions → 1
// Questions comparing two things or explaining how something works → 2
// Questions about edge cases, security internals, or advanced config → 3

function inferDifficulty(question) {
  const q = question.toLowerCase();
  // Advanced/edge case patterns → 3
  if (
    q.includes('edge case') ||
    q.includes('gotcha') ||
    q.includes('tricky') ||
    q.includes('internals') ||
    q.includes('security intern') ||
    q.includes('advanced config') ||
    q.includes('vulnerability') ||
    q.includes('exploit') ||
    q.includes('race condition') ||
    q.includes('deadlock') ||
    q.includes('memory leak') ||
    q.includes('overflow') ||
    q.includes('injection') ||
    q.includes('privilege escalation') ||
    q.includes('zero-day') ||
    q.includes('penetration') ||
    q.includes('isolation level') ||
    q.includes('phantom read') ||
    q.includes('dirty read') ||
    q.includes('serializable') ||
    q.includes('amortized') ||
    q.includes('concurrent modification') ||
    q.includes('transaction isolation') ||
    q.includes('uncommitted') ||
    q.includes('optimistic lock') ||
    q.includes('pessimistic lock') ||
    q.includes('distributed transaction') ||
    q.includes('two-phase commit') ||
    q.includes('saga') ||
    q.includes('event sourcing') ||
    q.includes('cqrs') ||
    q.includes('split brain') ||
    q.includes('byzantine') ||
    q.includes('cap theorem') ||
    q.includes('pacelc') ||
    q.includes('vector clock') ||
    q.includes('crdt') ||
    q.includes('raft') ||
    q.includes('paxos')
  ) {
    return 3;
  }
  // Basic "What is X?" definitions → 1
  if (
    q.startsWith('what is ') ||
    q.startsWith('what does ') ||
    q.startsWith('what are ') ||
    q.startsWith('which is ') ||
    q.startsWith('what stands for') ||
    q.includes('stand for') ||
    q.includes('what does ci stand') ||
    q.includes('what does cd stand') ||
    q.includes('what does aws stand') ||
    q.includes('what does vpc stand') ||
    q.includes('what does iam stand') ||
    q.includes('what does s3 stand') ||
    q.includes('what does ec2 stand') ||
    q.includes('what does rds stand') ||
    q.includes('what does sqs stand') ||
    q.includes('what does sns stand') ||
    q.includes('what does eks stand') ||
    q.includes('what does ecs stand') ||
    q.includes('what does elb stand') ||
    q.includes('what does alb stand') ||
    q.includes('what does nlb stand') ||
    q.includes('what does cdn stand') ||
    q.includes('what does dns stand') ||
    q.includes('what does ssl stand') ||
    q.includes('what does tls stand') ||
    q.includes('what does jwt stand') ||
    q.includes('what does oauth stand') ||
    q.includes('what does cors stand') ||
    q.includes('what does csrf stand') ||
    q.includes('what does xss stand') ||
    q.includes('what does sql stand') ||
    q.includes('what does nosql stand') ||
    q.includes('what does orm stand') ||
    q.includes('what does jpa stand') ||
    q.includes('what does rest stand') ||
    q.includes('what does soap stand') ||
    q.includes('what does grpc stand') ||
    q.includes('what does http stand') ||
    q.includes('what does https stand') ||
    q.includes('what does tcp stand') ||
    q.includes('what does udp stand') ||
    q.includes('what does ip stand') ||
    q.includes('what does url stand') ||
    q.includes('what does uri stand') ||
    q.includes('what does api stand') ||
    q.includes('what does sdk stand') ||
    q.includes('what does ide stand') ||
    q.includes('what does jvm stand') ||
    q.includes('what does jdk stand') ||
    q.includes('what does jre stand') ||
    q.includes('what does oop stand') ||
    q.includes('what does solid stand') ||
    q.includes('what does dry stand') ||
    q.includes('what does kiss stand') ||
    q.includes('what does yagni stand') ||
    q.includes('what does ci/cd stand') ||
    q.includes('what does devops stand') ||
    q.includes('what does sla stand') ||
    q.includes('what does slo stand') ||
    q.includes('what does sli stand') ||
    q.includes('what does mttr stand') ||
    q.includes('what does mtbf stand') ||
    q.includes('what does rpo stand') ||
    q.includes('what does rto stand') ||
    q.includes('what does ha stand') ||
    q.includes('what does dr stand') ||
    q.includes('what does k8s stand') ||
    q.includes('what does pod stand') ||
    q.includes('what does yaml stand') ||
    q.includes('what does json stand') ||
    q.includes('what does xml stand') ||
    q.includes('what does csv stand') ||
    q.includes('what does html stand') ||
    q.includes('what does css stand') ||
    q.includes('what does js stand') ||
    q.includes('what does ts stand') ||
    q.includes('what does npm stand') ||
    q.includes('what does mvn stand') ||
    q.includes('what does gradle stand') ||
    q.includes('what does maven stand') ||
    q.includes('what does git stand') ||
    q.includes('what does svn stand') ||
    q.includes('what does ci stand') ||
    q.includes('what does cd stand') ||
    q.includes('what does tdd stand') ||
    q.includes('what does bdd stand') ||
    q.includes('what does ddd stand') ||
    q.includes('what does aop stand') ||
    q.includes('what does ioc stand') ||
    q.includes('what does di stand') ||
    q.includes('what does mvc stand') ||
    q.includes('what does mvp stand') ||
    q.includes('what does mvvm stand') ||
    q.includes('what does crud stand') ||
    q.includes('what does acid stand') ||
    q.includes('what does base stand') ||
    q.includes('what does cap stand') ||
    q.includes('what does fifo stand') ||
    q.includes('what does lifo stand') ||
    q.includes('what does lru stand') ||
    q.includes('what does lfu stand') ||
    q.includes('what does ttl stand') ||
    q.includes('what does etl stand') ||
    q.includes('what does elt stand') ||
    q.includes('what does olap stand') ||
    q.includes('what does oltp stand') ||
    q.includes('what does bi stand') ||
    q.includes('what does ml stand') ||
    q.includes('what does ai stand') ||
    q.includes('what does nlp stand') ||
    q.includes('what does cv stand') ||
    q.includes('what does rl stand') ||
    q.includes('what does gan stand') ||
    q.includes('what does cnn stand') ||
    q.includes('what does rnn stand') ||
    q.includes('what does lstm stand') ||
    q.includes('what does bert stand') ||
    q.includes('what does gpt stand') ||
    q.includes('what does llm stand') ||
    q.includes('what does rag stand') ||
    q.includes('what does rag stand') ||
    q.includes('what does rag stand')
  ) {
    return 1;
  }
  // Default → 2
  return 2;
}

// ─── APPLY DIFFICULTIES ───────────────────────────────────────────────────────
const content = fs.readFileSync('src/data/quizData.js', 'utf8');

// Extract all questions with id and question text for text-based inference
const questionTexts = {};
const extractRegex = /\{ id: (\d+), difficulty: \d+, topic: "[^"]+", type: "[^"]+", question: "([^"]+)"/g;
let em;
while ((em = extractRegex.exec(content)) !== null) {
  questionTexts[parseInt(em[1])] = em[2];
}

// Build final difficulty map including text-based inference for 275-502
const finalMap = { ...difficultyMap };

// Fill in 275-502 that aren't explicitly listed
for (let id = 275; id <= 502; id++) {
  if (!(id in finalMap)) {
    const qText = questionTexts[id] || '';
    finalMap[id] = inferDifficulty(qText);
  }
}

// Verify all 596 IDs are covered
const allIds = Object.keys(questionTexts).map(Number);
const missing = allIds.filter(id => !(id in finalMap));
if (missing.length > 0) {
  console.log('WARNING: Missing difficulty for IDs:', missing);
}

// Now replace difficulty values in the file
let updated = content;
let changeCount = 0;

for (const [idStr, difficulty] of Object.entries(finalMap)) {
  const id = parseInt(idStr);
  // Match: { id: N, difficulty: X,  (where X might be different)
  const pattern = new RegExp(`(\\{ id: ${id}, difficulty: )(\\d+)(,)`, 'g');
  const newContent = updated.replace(pattern, (match, pre, oldDiff, post) => {
    if (parseInt(oldDiff) !== difficulty) {
      changeCount++;
    }
    return `${pre}${difficulty}${post}`;
  });
  updated = newContent;
}

fs.writeFileSync('src/data/quizData.js', updated, 'utf8');
console.log(`Done! Applied ${Object.keys(finalMap).length} difficulty assignments.`);
console.log(`Changed ${changeCount} values.`);

// Verify
const verifyContent = fs.readFileSync('src/data/quizData.js', 'utf8');
const verifyPairs = {};
const verifyRegex = /\{ id: (\d+), difficulty: (\d+),/g;
let vm;
while ((vm = verifyRegex.exec(verifyContent)) !== null) {
  verifyPairs[parseInt(vm[1])] = parseInt(vm[2]);
}

// Check a sample of the specified values
const checks = [
  [1,1],[2,1],[5,2],[6,2],[7,2],[9,2],[11,2],[46,2],[57,3],[73,3],
  [88,3],[106,3],[139,3],[146,3],[150,3],[184,3],[189,3],[192,3],
  [204,3],[207,3],[213,3],[216,3],[219,3],[220,3],[224,3],[228,3],[230,3],
  [231,3],[234,3],[236,3],[244,3],[245,3],[254,3],[260,3],[264,3],
  [533,3],[537,3],[541,3],[553,3],[554,3],[562,3],[572,3],[575,3],
  [591,3],[592,3],[593,3],[595,3],[180,3],[99,3],[96,3],[94,3],[89,3],[88,3],
  [557,1],[564,1],[538,1],[540,1],[543,1],[556,1],
];

let errors = 0;
for (const [id, expected] of checks) {
  const actual = verifyPairs[id];
  if (actual !== expected) {
    console.log(`VERIFY FAIL: id ${id} expected ${expected} got ${actual}`);
    errors++;
  }
}
if (errors === 0) {
  console.log('All spot-checks passed!');
} else {
  console.log(`${errors} spot-check failures.`);
}

// Print infra/cloud 275-502 assignments for review
console.log('\nInfra & Cloud (275-502) difficulty assignments:');
for (let id = 275; id <= 502; id++) {
  if (verifyPairs[id] !== undefined) {
    const qText = (questionTexts[id] || '').substring(0, 60);
    console.log(`  id ${id}: ${verifyPairs[id]} | ${qText}`);
  }
}
