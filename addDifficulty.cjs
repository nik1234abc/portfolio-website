/**
 * Adds difficulty: 1|2|3 to every flashcard question in interview data files.
 * Rules:
 *   1 = "What is X" definitions, basic facts, simple concepts
 *   2 = How it works, comparisons, usage patterns, common config
 *   3 = Edge cases, internals, production gotchas, tricky scenarios
 *
 * Strategy: keyword-based heuristic on the question text, with per-file
 * overrides for known hard questions.
 */

const fs = require("fs");
const path = require("path");

// ── Difficulty heuristics ────────────────────────────────────────────────────

const level1Keywords = [
  /^what is /i,
  /^what are /i,
  /^what does /i,
  /^define /i,
  /^explain what/i,
  /^name the/i,
  /^which annotation/i,
  /^what keyword/i,
  /^what is the default/i,
  /^what is the purpose of/i,
  /^what is the difference between .{0,30} and .{0,30}\?$/i,
];

const level3Keywords = [
  /internally/i,
  /under the hood/i,
  /edge case/i,
  /production/i,
  /pitfall/i,
  /gotcha/i,
  /race condition/i,
  /deadlock/i,
  /memory leak/i,
  /performance/i,
  /optimize/i,
  /exactly.once/i,
  /idempotent producer/i,
  /transaction.*kafka/i,
  /kafka.*transaction/i,
  /outbox pattern/i,
  /schema registry/i,
  /avro.*protobuf/i,
  /consistent hashing/i,
  /cap theorem/i,
  /sharding/i,
  /zero.downtime/i,
  /expand.and.contract/i,
  /mvcc/i,
  /phantom read/i,
  /dirty read/i,
  /non.repeatable/i,
  /distributed transaction/i,
  /two.phase commit/i,
  /saga.*compensat/i,
  /circuit breaker.*state/i,
  /bulkhead/i,
  /service mesh/i,
  /mutual tls/i,
  /contract test/i,
  /consumer.driven/i,
  /bff pattern/i,
  /backend.for.frontend/i,
  /liveness.*readiness/i,
  /hpa.*scale/i,
  /kubernetes.*network/i,
  /opentelemetry/i,
  /lazyinitializationexception/i,
  /n\+1/i,
  /testcontainers/i,
  /filter.*interceptor.*controlleradvice/i,
  /jwt.*invalidat/i,
  /refresh token/i,
  /csrf/i,
  /sql injection/i,
  /xss/i,
];

function getDifficulty(question) {
  const q = question.trim();

  // Check level 3 first (most specific)
  for (const re of level3Keywords) {
    if (re.test(q)) return 3;
  }

  // Check level 1
  for (const re of level1Keywords) {
    if (re.test(q)) return 1;
  }

  // Default to 2
  return 2;
}

// ── Per-question overrides (id → difficulty) ─────────────────────────────────
// Add known exceptions here if the heuristic gets them wrong.
const overrides = {
  // springBoot
  "Spring Boot-1": 1, "Spring Boot-2": 1, "Spring Boot-3": 1,
  "Spring Boot-4": 1, "Spring Boot-5": 1, "Spring Boot-6": 1,
  "Spring Boot-7": 1, "Spring Boot-8": 1, "Spring Boot-9": 1,
  "Spring Boot-10": 1, "Spring Boot-11": 1, "Spring Boot-12": 1,
  "Spring Boot-20": 1, "Spring Boot-24": 1, "Spring Boot-25": 1,
  "Spring Boot-27": 1, "Spring Boot-28": 1, "Spring Boot-29": 1,
  "Spring Boot-30": 1,
  // kafka
  "Kafka-1": 1, "Kafka-2": 1, "Kafka-3": 1, "Kafka-4": 1,
  "Kafka-5": 1, "Kafka-6": 1, "Kafka-7": 1, "Kafka-8": 1,
  "Kafka-9": 1, "Kafka-10": 1, "Kafka-11": 1, "Kafka-12": 1,
  "Kafka-13": 1, "Kafka-14": 1, "Kafka-15": 1,
  // microservices
  "Microservices-1": 1, "Microservices-2": 1, "Microservices-3": 1,
  "Microservices-4": 1, "Microservices-5": 1, "Microservices-6": 1,
  "Microservices-7": 1, "Microservices-8": 1, "Microservices-9": 1,
  "Microservices-10": 1, "Microservices-11": 1, "Microservices-12": 1,
  "Microservices-13": 1, "Microservices-14": 1, "Microservices-15": 1,
  "Microservices-16": 1, "Microservices-17": 2,
  // REST APIs
  "REST APIs-1": 1, "REST APIs-2": 1, "REST APIs-3": 1,
  "REST APIs-4": 1, "REST APIs-5": 1, "REST APIs-6": 1,
  "REST APIs-7": 1, "REST APIs-8": 1, "REST APIs-9": 1,
  "REST APIs-10": 1, "REST APIs-11": 1, "REST APIs-12": 1,
  "REST APIs-13": 1, "REST APIs-14": 1, "REST APIs-15": 1,
  "REST APIs-16": 1, "REST APIs-17": 1, "REST APIs-18": 1,
  "REST APIs-19": 1, "REST APIs-20": 2,
  // Database
  "Database-301": 1, "Database-302": 1, "Database-303": 1,
  "Database-304": 1, "Database-305": 1, "Database-306": 1,
  "Database-307": 2, "Database-308": 1, "Database-309": 1,
  "Database-310": 2, "Database-317": 2, "Database-318": 1,
  "Database-319": 2, "Database-320": 2, "Database-321": 2,
  "Database-322": 2, "Database-323": 2, "Database-324": 1,
  "Database-325": 2, "Database-326": 2, "Database-327": 3,
  "Database-328": 2,
};

// ── File processor ────────────────────────────────────────────────────────────

function processFile(filePath) {
  let src = fs.readFileSync(filePath, "utf8");
  let changed = 0;

  // Match each question object: find id, category, existing difficulty (if any), question text
  // We'll use a regex to find lines with `id: N, category: "X"` and inject difficulty after id
  // Pattern: id: N, category: "CAT", [difficulty: D,] [topic: ...] question: "..."

  // Step 1: remove any existing difficulty fields so we can re-add cleanly
  src = src.replace(/,\s*difficulty:\s*[123]/g, "");
  src = src.replace(/difficulty:\s*[123],\s*/g, "");

  // Step 2: for each question block, determine difficulty and inject
  src = src.replace(
    /(\{\s*\n?\s*id:\s*(\d+),\s*\n?\s*category:\s*"([^"]+)")/g,
    (match, prefix, idStr, category) => {
      const key = `${category}-${idStr}`;
      let diff;
      if (overrides[key] !== undefined) {
        diff = overrides[key];
      } else {
        // We need the question text — look ahead in the source
        // Since we're in a replace callback we don't have lookahead easily,
        // so we'll do a second pass for question text
        diff = 2; // placeholder, will fix in second pass
      }
      changed++;
      return `${prefix}, difficulty: ${diff}`;
    }
  );

  // Step 3: second pass — fix difficulty using actual question text
  src = src.replace(
    /id:\s*(\d+),\s*category:\s*"([^"]+)",\s*difficulty:\s*2([\s\S]*?)question:\s*"([^"]+)"/g,
    (match, idStr, category, middle, questionText) => {
      const key = `${category}-${idStr}`;
      let diff;
      if (overrides[key] !== undefined) {
        diff = overrides[key];
      } else {
        diff = getDifficulty(questionText);
      }
      return match.replace(
        `id: ${idStr}, category: "${category}", difficulty: 2`,
        `id: ${idStr}, category: "${category}", difficulty: ${diff}`
      );
    }
  );

  fs.writeFileSync(filePath, src, "utf8");
  console.log(`✓ ${path.basename(filePath)} — processed`);
}

// ── Run ───────────────────────────────────────────────────────────────────────

const files = [
  "src/data/springBootInterview.js",
  "src/data/kafkaInterview.js",
  "src/data/microservicesInterview.js",
  "src/data/systemDesign.js",
  "src/data/restApiInterview.js",
  "src/data/databaseInterview.js",
  "src/data/devopsSecurityInterview.js",
  "src/data/awsInterview.js",
];

files.forEach(f => processFile(path.resolve(__dirname, f)));
console.log("\nDone. All interview files tagged with difficulty levels.");
