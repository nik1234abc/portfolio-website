// Improved parser — extract side names from keyPoints directly
function parseVsComparison(question, explanation, keyPoints) {
  if (!keyPoints?.length) return null;
  // Only attempt on VS questions
  if (!/\bvs\.?\b/i.test(question)) return null;

  // Step 1: Extract candidate side names from keyPoints
  // A keyPoint that starts with "SomeName:" or "SomeName (qualifier):" is a labeled point
  const labeledPoints = [];
  keyPoints.forEach(kp => {
    const m = kp.match(/^([^:]{2,40}):\s*(.+)$/);
    if (m) labeledPoints.push({ label: m[1].trim(), text: m[2].trim(), raw: kp });
  });

  if (labeledPoints.length < 2) return null;

  // Step 2: Cluster labels into sides
  // Two labels are the "same side" if one starts with the other (e.g. "NoSQL" and "NoSQL Document (MongoDB)")
  // We want the unique top-level sides
  const allLabels = labeledPoints.map(p => p.label);

  // Find the distinct "root" labels — prefer shorter ones that are prefixes of longer ones
  const roots = [];
  allLabels.forEach(label => {
    // Check if this label is already covered by an existing root
    const alreadyCovered = roots.some(r =>
      label.toLowerCase().startsWith(r.toLowerCase()) ||
      r.toLowerCase().startsWith(label.toLowerCase())
    );
    if (!alreadyCovered) roots.push(label);
    else {
      // Keep the shorter one as the root
      const idx = roots.findIndex(r =>
        label.toLowerCase().startsWith(r.toLowerCase()) ||
        r.toLowerCase().startsWith(label.toLowerCase())
      );
      if (idx >= 0 && label.length < roots[idx].length) roots[idx] = label;
    }
  });

  // Need at least 2 sides
  if (roots.length < 2) return null;

  // Step 3: Assign each labeled point to a root side
  const grouped = {};
  roots.forEach(r => { grouped[r] = []; });

  labeledPoints.forEach(({ label, text }) => {
    const root = roots.find(r =>
      label.toLowerCase().startsWith(r.toLowerCase()) ||
      r.toLowerCase().startsWith(label.toLowerCase())
    );
    if (root) grouped[root].push(text);
  });

  // Step 4: Build rows — zip the columns
  const maxRows = Math.max(...roots.map(r => grouped[r].length));
  if (maxRows === 0) return null;

  const rows = [];
  for (let i = 0; i < maxRows; i++) {
    const row = {};
    roots.forEach(r => { row[r] = grouped[r][i] || ''; });
    rows.push(row);
  }

  return { sides: roots, rows };
}

// Test 1: 3-way VS
const kp1 = [
  'JSON: readable, verbose, no binary encoding — good for development',
  'Avro: compact binary, schema evolution, registry-friendly — standard Kafka choice',
  'Protobuf: compact binary, strongly typed, cross-language — good for polyglot teams',
  'Pick based on team ecosystem and governance needs, not just readability'
];
console.log('Test 1 (Avro vs JSON vs Protobuf):');
console.log(JSON.stringify(parseVsComparison('Avro vs JSON vs Protobuf for Kafka messages', '', kp1), null, 2));

// Test 2: SQL vs NoSQL with sub-labels
const kp2 = [
  'SQL: ACID, relationships, structured data, strong consistency — OLTP systems',
  'NoSQL Document (MongoDB): flexible schema, nested data, no JOINs',
  'NoSQL Key-Value (Redis): O(1) reads/writes, caching and sessions',
  'NoSQL Wide-Column (Cassandra): high write throughput, time-series data'
];
console.log('\nTest 2 (SQL vs NoSQL):');
console.log(JSON.stringify(parseVsComparison('SQL vs NoSQL — when to use which?', '', kp2), null, 2));

// Test 3: ECS vs EKS vs Fargate
const kp3 = [
  'ECS: AWS-native, simpler, tight AWS integration',
  'EKS: managed Kubernetes, portable, multi-cloud ready',
  'Fargate: serverless compute — no EC2 to manage for either ECS or EKS',
  'EC2 launch type: more control and lower cost at scale vs Fargate'
];
console.log('\nTest 3 (ECS vs EKS vs Fargate):');
console.log(JSON.stringify(parseVsComparison('ECS vs EKS vs Fargate?', '', kp3), null, 2));

// Test 4: JWT vs Session
const kp4 = [
  'Session: stateful, DB/Redis lookup per request, easy to invalidate',
  'JWT: stateless, signature verification only, no DB lookup, scales across microservices',
  'JWT downside: hard to invalidate before expiry',
  'Best practice: short-lived JWT (15 min) + long-lived refresh token (7 days)'
];
console.log('\nTest 4 (JWT vs Session):');
console.log(JSON.stringify(parseVsComparison('JWT vs Session Tokens?', '', kp4), null, 2));

// Test 5: Liveness vs Readiness
const kp5 = [
  'Liveness failure: Pod is killed and restarted — for hung/deadlocked processes',
  'Readiness failure: Pod removed from load balancer, not killed — for startup and temporary unavailability',
  'A Pod can be alive but not ready (startup, dependency down)',
  'Spring Boot Actuator provides /liveness and /readiness endpoints out of the box'
];
console.log('\nTest 5 (Liveness vs Readiness):');
console.log(JSON.stringify(parseVsComparison('Liveness Probe vs Readiness Probe?', '', kp5), null, 2));

// Test 6: at-least-once vs exactly-once vs at-most-once
const kp6 = [
  'at-most-once: commit before processing — fast, may lose messages',
  'at-least-once: commit after processing — reliable, may duplicate',
  'exactly-once: idempotent producer + transactions — no loss, no duplicates within Kafka',
  'External systems always need application-level idempotency regardless of Kafka config'
];
console.log('\nTest 6 (at-least-once vs exactly-once vs at-most-once):');
console.log(JSON.stringify(parseVsComparison('at-least-once vs exactly-once vs at-most-once delivery', '', kp6), null, 2));
