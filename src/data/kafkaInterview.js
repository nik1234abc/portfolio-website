export const kafkaInterview = {
  categories: ["Kafka"],
  questions: [
    {
      id: 1, category: "Kafka", topic: "1. Kafka Fundamentals",
      question: "What is Apache Kafka?",
      simpleAnswer: "Apache Kafka is a distributed, high-throughput messaging system that lets you publish, store, and consume streams of events in real time.",
      explanation: "Kafka was originally built at LinkedIn to handle massive amounts of real-time data. It works like a highly scalable, fault-tolerant log. Producers write messages to Kafka, Kafka stores them durably, and consumers read them at their own pace. Unlike traditional queues, Kafka retains messages even after they are consumed — so multiple consumers can read the same data independently.",
      example: "An e-commerce platform uses Kafka so that when an order is placed, OrderService publishes an event. PaymentService, InventoryService, and NotificationService all consume that same event independently — without OrderService knowing or caring about them.",
      followUps: [{ question: "Who created Kafka and why?", answer: "LinkedIn engineers Jay Kreps, Neha Narkhede, and Jun Rao created Kafka around 2010 to handle LinkedIn's activity stream data at scale. It was open-sourced and donated to Apache in 2011." }],
      keyPoints: ["Distributed messaging and streaming platform", "Messages are stored durably on disk", "Multiple consumers can read the same message", "Built for high throughput and low latency"]
    },
    {
      id: 2, category: "Kafka", topic: "1. Kafka Fundamentals",
      question: "Why is Kafka used?",
      simpleAnswer: "Kafka is used to reliably move large volumes of data between systems in real time, decouple microservices, and build event-driven architectures.",
      explanation: "Kafka solves the problem of connecting many systems that produce and consume data. Instead of building point-to-point connections between every pair of services (which becomes a mess), all services connect to Kafka. Producers write to Kafka, consumers read from Kafka. Kafka handles the routing, buffering, and reliability. It also handles massive scale — millions of messages per second.",
      example: "A bank uses Kafka to stream transaction events. The fraud detection service, the notification service, the analytics service, and the audit service all consume the same transaction stream independently — each doing their own processing without affecting each other.",
      followUps: [{ question: "What are the main use cases for Kafka?", answer: "Real-time data pipelines, microservices event-driven communication, activity tracking (clicks, page views), log aggregation, stream processing, and change data capture (CDC) from databases." }],
      keyPoints: ["Decouples producers from consumers", "Handles millions of messages per second", "Real-time data pipelines", "Event-driven microservices communication"]
    },
    {
      id: 3, category: "Kafka", topic: "1. Kafka Fundamentals",
      question: "What problem does Kafka solve?",
      simpleAnswer: "Kafka solves the problem of reliably moving data between many systems at scale, without tight coupling between producers and consumers.",
      explanation: "Before Kafka, if you had 5 source systems and 5 destination systems, you needed 25 point-to-point integrations. Each integration had its own protocol, error handling, and scaling concerns. Kafka acts as a central nervous system — every system connects to Kafka once. Producers push data in, consumers pull data out. Kafka also solves data loss (messages are persisted), speed mismatches (consumers read at their own pace), and replay (consumers can re-read old messages).",
      example: "Without Kafka: OrderService directly calls PaymentService, InventoryService, and NotificationService — 3 tight couplings. With Kafka: OrderService publishes one event. All three services consume independently. Adding a 4th consumer (AnalyticsService) requires zero changes to OrderService.",
      followUps: [{ question: "What is the N×M integration problem?", answer: "With N producers and M consumers, you need N×M direct connections without a broker. With Kafka, you only need N+M connections — each system connects to Kafka once." }],
      keyPoints: ["Eliminates N×M integration complexity", "Decouples producers and consumers", "Solves speed mismatch between systems", "Enables message replay and reprocessing"]
    },
    {
      id: 4, category: "Kafka", topic: "1. Kafka Fundamentals",
      question: "Difference between Kafka and traditional messaging systems?",
      simpleAnswer: "Traditional queues (RabbitMQ, ActiveMQ) delete messages after consumption. Kafka retains messages on disk for a configurable period, allowing multiple consumers and replay.",
      explanation: "Traditional message queues are designed for task distribution — one message, one consumer, then deleted. Kafka is designed as a distributed log — messages are written sequentially to disk and retained. Multiple consumer groups can read the same messages independently. Consumers track their own position (offset). This makes Kafka ideal for event streaming, audit logs, and reprocessing scenarios.",
      example: "RabbitMQ: OrderService sends a payment task. PaymentService picks it up, processes it, message is gone. Kafka: OrderService publishes OrderPlaced event. PaymentService reads it (offset 5). InventoryService also reads it (offset 5). Both get the same message. Tomorrow, a new AnalyticsService can replay from offset 0 and process all historical orders.",
      followUps: [{ question: "When should you use RabbitMQ over Kafka?", answer: "Use RabbitMQ for task queues where each task should be processed by exactly one worker and then deleted. Use Kafka for event streaming, high throughput, multiple consumers, or when you need message replay." }],
      keyPoints: ["Kafka retains messages after consumption", "Multiple consumer groups read independently", "Traditional queues: one consumer, then deleted", "Kafka supports message replay from any point"]
    },
    {
      id: 5, category: "Kafka", topic: "1. Kafka Fundamentals",
      question: "What is a distributed system?",
      simpleAnswer: "A distributed system is a collection of independent computers that work together and appear to the user as a single system.",
      explanation: "Kafka itself is a distributed system — it runs as a cluster of multiple broker nodes. Data is spread (partitioned) across brokers and replicated for fault tolerance. If one broker fails, others continue serving. Distributed systems provide scalability (add more nodes to handle more load) and fault tolerance (no single point of failure), but introduce complexity like network failures, partial failures, and consistency challenges.",
      example: "A Kafka cluster with 3 brokers: Broker 1 holds partitions 0 and 3, Broker 2 holds partitions 1 and 4, Broker 3 holds partitions 2 and 5. If Broker 2 fails, its partitions are served by replicas on Broker 1 and 3. The cluster keeps running.",
      followUps: [{ question: "What are the challenges of distributed systems?", answer: "Network partitions, partial failures, consistency vs availability trade-offs (CAP theorem), clock synchronization, and distributed transactions. Kafka handles these through replication, leader election, and ISR (in-sync replicas)." }],
      keyPoints: ["Multiple nodes working as one system", "Kafka runs as a cluster of brokers", "Provides scalability and fault tolerance", "Data is partitioned and replicated across nodes"]
    },

    // ─── 2. CORE CONCEPTS ────────────────────────────────────────────────────
    {
      id: 6, category: "Kafka", topic: "2. Core Concepts",
      question: "What is a topic in Kafka?",
      simpleAnswer: "A topic is a named category or feed to which producers write messages and from which consumers read messages — like a folder for a specific type of event.",
      explanation: "Topics are the fundamental way to organize data in Kafka. You create a topic for each type of event or data stream. Topics are durable — messages are stored on disk. Topics are split into partitions for scalability. You can have as many topics as you need. Topics are identified by name (e.g., 'order-events', 'payment-events', 'user-registrations').",
      example: "An e-commerce system has topics: 'orders' (all order events), 'payments' (all payment events), 'inventory' (stock updates), 'notifications' (email/SMS triggers). OrderService writes to 'orders'. PaymentService reads from 'orders' and writes to 'payments'.",
      followUps: [{ question: "Can you delete a topic in Kafka?", answer: "Yes, using the kafka-topics.sh --delete command or the AdminClient API. You must have delete.topic.enable=true in broker config. Deleting a topic removes all its data permanently." }],
      keyPoints: ["Named category for a stream of events", "Producers write to topics, consumers read from topics", "Topics are split into partitions", "Topics are stored durably on disk"]
    },
    {
      id: 7, category: "Kafka", topic: "2. Core Concepts",
      question: "What is a partition in Kafka?",
      simpleAnswer: "A partition is a subdivision of a topic — each topic is split into one or more partitions, and each partition is an ordered, immutable sequence of messages stored on disk.",
      explanation: "Partitions are the key to Kafka's scalability. Each partition is an independent ordered log. Messages within a partition are strictly ordered. Different partitions can be stored on different brokers, allowing parallel reads and writes. More partitions = more parallelism = higher throughput. Each partition can be consumed by only one consumer within a consumer group at a time.",
      example: "Topic 'orders' has 3 partitions: P0, P1, P2. P0 is on Broker 1, P1 is on Broker 2, P2 is on Broker 3. Three consumers can read in parallel — one per partition — tripling the throughput compared to a single partition.",
      followUps: [{ question: "Can you increase the number of partitions after creation?", answer: "Yes, you can increase partitions but not decrease them. Increasing partitions can break key-based ordering for existing keys since the partition assignment changes." }],
      keyPoints: ["Topic is split into ordered partitions", "Each partition is an independent log", "Partitions enable parallel processing", "More partitions = higher throughput"]
    },
    {
      id: 8, category: "Kafka", topic: "2. Core Concepts",
      question: "What is an offset in Kafka?",
      simpleAnswer: "An offset is a unique sequential number assigned to each message within a partition — it's like a position marker that tells you exactly where a message sits in the partition.",
      explanation: "Offsets start at 0 and increment by 1 for each new message in a partition. Offsets are per-partition — partition 0 has its own offset sequence, partition 1 has its own, etc. Consumers use offsets to track which messages they have already processed. By storing the last committed offset, a consumer can resume from exactly where it left off after a restart.",
      example: "Partition 0 of 'orders' topic: message at offset 0 (first order), offset 1 (second order), offset 2 (third order)... Consumer reads up to offset 5 and commits. If the consumer restarts, it resumes from offset 6 — no messages are missed or reprocessed.",
      followUps: [{ question: "Where are offsets stored?", answer: "Consumer offsets are stored in a special internal Kafka topic called __consumer_offsets. This replaced the older ZooKeeper-based offset storage in Kafka 0.9+." }],
      keyPoints: ["Unique sequential ID per message within a partition", "Starts at 0, increments by 1", "Consumers track their position using offsets", "Enables resume after restart without data loss"]
    },
    {
      id: 9, category: "Kafka", topic: "2. Core Concepts",
      question: "What is a producer in Kafka?",
      simpleAnswer: "A producer is any application or service that writes (publishes) messages to a Kafka topic.",
      explanation: "Producers push data into Kafka. They decide which topic to write to and optionally which partition (using a key or custom partitioner). Producers can configure delivery guarantees: fire-and-forget (fastest, may lose messages), synchronous (waits for acknowledgment), or asynchronous with callbacks. Producers also handle batching and compression to maximize throughput.",
      example: "OrderService is a producer. When a user places an order, OrderService creates an OrderPlaced event and calls kafkaTemplate.send('orders', orderId, orderEvent). Kafka stores it in the 'orders' topic. OrderService doesn't wait for consumers — it just publishes and moves on.",
      followUps: [{ question: "What is the 'acks' configuration in a producer?", answer: "acks=0: producer doesn't wait for any acknowledgment (fastest, can lose data). acks=1: waits for leader to acknowledge (default). acks=all or -1: waits for all in-sync replicas to acknowledge (safest, slowest)." }],
      keyPoints: ["Writes messages to Kafka topics", "Chooses topic and optionally partition", "Configurable delivery guarantees via acks", "Supports batching and compression"]
    },
    {
      id: 10, category: "Kafka", topic: "2. Core Concepts",
      question: "What is a consumer in Kafka?",
      simpleAnswer: "A consumer is any application or service that reads (subscribes to) messages from a Kafka topic.",
      explanation: "Consumers pull messages from Kafka — Kafka does not push to consumers. Each consumer tracks its own offset (position) in each partition it reads from. Consumers can read at their own pace without affecting producers or other consumers. Multiple consumers can read the same topic independently. Consumers are typically organized into consumer groups for parallel processing and load balancing.",
      example: "PaymentService is a consumer subscribed to the 'orders' topic. It continuously polls Kafka for new messages. When it reads an OrderPlaced event at offset 10, it processes the payment, then commits offset 10. If PaymentService restarts, it resumes from offset 11.",
      followUps: [{ question: "Does Kafka push messages to consumers or do consumers pull?", answer: "Consumers pull from Kafka. This is a deliberate design choice — consumers control their own pace, preventing slow consumers from being overwhelmed. Producers and consumers are completely decoupled in speed." }],
      keyPoints: ["Reads messages from Kafka topics", "Pull-based — consumers control their pace", "Tracks position using offsets", "Multiple consumers can read the same topic independently"]
    },
    {
      id: 11, category: "Kafka", topic: "2. Core Concepts",
      question: "What is a consumer group in Kafka?",
      simpleAnswer: "A consumer group is a set of consumers that work together to consume a topic — each partition is assigned to exactly one consumer in the group, enabling parallel processing.",
      explanation: "When multiple consumers share the same group ID, Kafka treats them as a team. Kafka divides the topic's partitions among the group members so no two consumers in the same group read the same partition. This allows horizontal scaling — add more consumers to the group to process faster. Different consumer groups are completely independent and each gets all the messages.",
      example: "Topic 'orders' has 3 partitions. Consumer group 'payment-group' has 3 consumers: Consumer A reads P0, Consumer B reads P1, Consumer C reads P2 — all in parallel. A separate group 'notification-group' also reads all 3 partitions independently.",
      followUps: [{ question: "What happens if you have more consumers than partitions?", answer: "The extra consumers sit idle — they have no partition to read from. Partitions are the unit of parallelism in Kafka. You can never have more active consumers than partitions in a group." }],
      keyPoints: ["Consumers sharing a group ID form a group", "Each partition assigned to one consumer in the group", "Enables parallel processing across consumers", "Different groups are independent — each gets all messages"]
    },
    {
      id: 12, category: "Kafka", topic: "2. Core Concepts",
      question: "What is a broker in Kafka?",
      simpleAnswer: "A broker is a single Kafka server that stores data and serves client requests — producers write to brokers, consumers read from brokers.",
      explanation: "A Kafka cluster is made up of multiple brokers. Each broker stores a subset of the topic partitions. Brokers handle all read and write requests from producers and consumers. Each partition has one broker designated as the leader (handles all reads/writes) and others as followers (replicas). Brokers are identified by a unique broker ID.",
      example: "A Kafka cluster has 3 brokers: Broker 1 (ID=1), Broker 2 (ID=2), Broker 3 (ID=3). Topic 'orders' has 3 partitions. P0's leader is on Broker 1, P1's leader is on Broker 2, P2's leader is on Broker 3. Each broker handles its own partition's traffic.",
      followUps: [{ question: "How many brokers should a production Kafka cluster have?", answer: "Minimum 3 brokers for production — this allows a replication factor of 3 and tolerates 1 broker failure. Large clusters can have dozens or hundreds of brokers." }],
      keyPoints: ["Single Kafka server node", "Stores partition data on disk", "Handles producer writes and consumer reads", "Each partition has one leader broker"]
    },
    {
      id: 13, category: "Kafka", topic: "2. Core Concepts",
      question: "What is a Kafka cluster?",
      simpleAnswer: "A Kafka cluster is a group of multiple brokers working together to provide a scalable, fault-tolerant messaging system.",
      explanation: "A cluster distributes the load across brokers — partitions are spread across all brokers so no single broker is a bottleneck. Replication ensures data is copied to multiple brokers so if one fails, others take over. One broker in the cluster acts as the Controller — it manages partition leadership and broker membership. Historically managed by ZooKeeper, modern Kafka (2.8+) uses KRaft (built-in consensus) instead.",
      example: "A 5-broker Kafka cluster handles 10 million messages/second for a streaming platform. Topic 'events' has 50 partitions spread across all 5 brokers (10 partitions each). Each partition is replicated to 2 other brokers. If Broker 3 dies, its 10 partitions are served by replicas on other brokers automatically.",
      followUps: [{ question: "What is ZooKeeper's role in Kafka?", answer: "ZooKeeper was used to manage broker metadata, leader election, and cluster coordination. Kafka is moving away from ZooKeeper with KRaft mode (Kafka Raft), which handles coordination internally without ZooKeeper." }],
      keyPoints: ["Multiple brokers working together", "Partitions distributed across brokers", "Data replicated for fault tolerance", "One broker acts as Controller"]
    },
    {
      id: 14, category: "Kafka", topic: "2. Core Concepts",
      question: "What is replication in Kafka?",
      simpleAnswer: "Replication means each partition is copied to multiple brokers — so if one broker fails, the data is still available on another broker.",
      explanation: "When you create a topic, you set a replication factor (e.g., 3). This means each partition has 1 leader and 2 follower replicas on different brokers. The leader handles all reads and writes. Followers continuously sync from the leader. If the leader broker fails, one of the followers is automatically elected as the new leader. No data is lost.",
      example: "Topic 'payments' has replication factor 3. Partition 0's leader is on Broker 1. Replicas are on Broker 2 and Broker 3. Producer writes to Broker 1 (leader). Broker 2 and 3 sync the data. Broker 1 crashes — Broker 2 becomes the new leader. Consumers continue reading without interruption.",
      followUps: [{ question: "What replication factor should you use in production?", answer: "Replication factor of 3 is the standard for production. It tolerates 1 broker failure while maintaining data availability. Factor of 1 means no redundancy — data loss if the broker fails." }],
      keyPoints: ["Each partition copied to multiple brokers", "One leader, rest are followers", "Leader handles all reads and writes", "Follower becomes leader if leader fails"]
    },
    {
      id: 15, category: "Kafka", topic: "2. Core Concepts",
      question: "What is leader and follower in Kafka?",
      simpleAnswer: "For each partition, one broker is the leader (handles all reads and writes) and the others holding replicas are followers (sync data from the leader).",
      explanation: "Every partition has exactly one leader at any time. All producer writes go to the leader. All consumer reads come from the leader (by default). Followers exist purely for redundancy — they continuously fetch new messages from the leader to stay in sync. If the leader broker goes down, Kafka's controller automatically elects one of the in-sync followers as the new leader within seconds.",
      example: "Partition 0 of 'orders': Leader on Broker 1, Followers on Broker 2 and 3. Producer sends message → goes to Broker 1. Broker 2 and 3 fetch it from Broker 1. Consumer reads from Broker 1. Broker 1 crashes → Broker 2 is elected leader → producer and consumer now talk to Broker 2.",
      followUps: [{ question: "Can consumers read from follower replicas?", answer: "By default, no — consumers read from the leader. Since Kafka 2.4, consumers can be configured to read from the nearest replica (follower) to reduce cross-datacenter latency using the rack.id configuration." }],
      keyPoints: ["One leader per partition at any time", "All writes and reads go to the leader", "Followers sync from leader for redundancy", "Follower elected as new leader if leader fails"]
    },

    // ─── 3. MESSAGE FLOW ─────────────────────────────────────────────────────
    {
      id: 16, category: "Kafka", topic: "3. Message Flow",
      question: "How does a message flow in Kafka?",
      simpleAnswer: "Producer sends a message → Kafka broker stores it in the correct partition → Consumer polls and reads it → Consumer commits the offset.",
      explanation: "Step by step: 1) Producer creates a message with an optional key and value. 2) Producer sends it to a topic — Kafka decides the partition (by key hash, round-robin, or custom logic). 3) The partition's leader broker writes the message to its log on disk and assigns it an offset. 4) Follower replicas sync the message. 5) Consumer polls the broker for new messages. 6) Broker returns messages from the consumer's current offset. 7) Consumer processes the message. 8) Consumer commits the new offset.",
      example: "OrderService sends: key='user-123', value='{orderId:456, amount:500}' to topic 'orders'. Kafka hashes 'user-123' → partition 1. Broker 2 (leader of P1) writes it at offset 42. Consumer group 'payment-group' polls Broker 2, gets offset 42, processes payment, commits offset 43.",
      followUps: [{ question: "What happens if the consumer crashes before committing the offset?", answer: "The consumer restarts and re-reads from the last committed offset. The message is processed again — this is at-least-once delivery. To avoid duplicate processing, make your consumer logic idempotent." }],
      keyPoints: ["Producer → Broker (partition leader) → Consumer", "Broker assigns offset and stores on disk", "Consumer polls broker — Kafka doesn't push", "Consumer commits offset after processing"]
    },
    {
      id: 17, category: "Kafka", topic: "3. Message Flow",
      question: "How does a producer send data to a partition?",
      simpleAnswer: "If a message has a key, Kafka hashes the key to determine the partition. If no key, messages are distributed round-robin across partitions.",
      explanation: "Partition selection logic: 1) If a custom partitioner is configured, it decides. 2) If a key is provided, Kafka uses murmur2 hash of the key modulo number of partitions. Same key always goes to the same partition — guaranteeing ordering for that key. 3) If no key, Kafka uses sticky partitioning (batches to one partition, then switches) for efficiency. This is important: key-based partitioning is how you guarantee message ordering for related events.",
      example: "Key = 'user-123', partitions = 3. hash('user-123') % 3 = 1. All messages for user-123 go to partition 1 — always in order. Key = 'user-456', hash % 3 = 0. Goes to partition 0. No key — round-robin: message 1 → P0, message 2 → P1, message 3 → P2.",
      followUps: [{ question: "What happens to ordering if you increase partitions?", answer: "Key-based ordering breaks. The same key may now hash to a different partition. Existing messages for that key are in the old partition, new ones in the new partition — ordering is lost across the change." }],
      keyPoints: ["Key present → hash(key) % partitions", "No key → round-robin or sticky partitioning", "Same key always goes to same partition", "Key-based routing guarantees per-key ordering"]
    },
    {
      id: 18, category: "Kafka", topic: "3. Message Flow",
      question: "How does a consumer read messages?",
      simpleAnswer: "Consumers poll Kafka brokers in a loop, requesting new messages from their current offset position in each assigned partition.",
      explanation: "Consumers use a poll loop — they continuously call poll() which fetches a batch of messages from the broker. The broker returns messages starting from the consumer's last committed offset. The consumer processes the batch, then commits the new offset, then polls again. Consumers are assigned specific partitions by the group coordinator. The poll interval and batch size are configurable for performance tuning.",
      example: "PaymentService consumer: while(true) { records = consumer.poll(Duration.ofMillis(100)); for(record : records) { processPayment(record); } consumer.commitSync(); } — polls every 100ms, processes each record, commits offset after each batch.",
      followUps: [{ question: "What is the difference between commitSync and commitAsync?", answer: "commitSync() blocks until the broker confirms the offset commit — safe but slower. commitAsync() doesn't block — faster but if it fails, the offset may not be committed and messages could be reprocessed." }],
      keyPoints: ["Consumer uses a poll loop to fetch messages", "Fetches from last committed offset", "Processes batch then commits new offset", "Poll interval and batch size are configurable"]
    },
    {
      id: 19, category: "Kafka", topic: "3. Message Flow",
      question: "What happens if a consumer fails?",
      simpleAnswer: "If a consumer fails, Kafka detects it via missed heartbeats, triggers a rebalance, and reassigns the failed consumer's partitions to other consumers in the group.",
      explanation: "Consumers send heartbeats to the group coordinator broker. If a consumer misses heartbeats for session.timeout.ms (default 10 seconds), the coordinator marks it as dead and triggers a rebalance. During rebalance, all consumers in the group stop processing briefly, partitions are redistributed, and processing resumes. The new consumer picks up from the last committed offset of the failed consumer — so no messages are lost, but uncommitted messages may be reprocessed.",
      example: "Consumer group has 3 consumers reading 3 partitions. Consumer B (reading P1) crashes. Group coordinator detects missed heartbeat after 10s. Rebalance triggered: Consumer A now reads P0 and P1, Consumer C reads P2. Consumer A starts reading P1 from Consumer B's last committed offset.",
      followUps: [{ question: "How do you minimize rebalance impact?", answer: "Use static group membership (group.instance.id) to avoid rebalances on temporary restarts. Tune session.timeout.ms and heartbeat.interval.ms. Use incremental cooperative rebalancing (default in newer Kafka) which only moves necessary partitions." }],
      keyPoints: ["Missed heartbeats trigger consumer failure detection", "Group coordinator reassigns partitions via rebalance", "New consumer resumes from last committed offset", "Uncommitted messages may be reprocessed"]
    },
    {
      id: 20, category: "Kafka", topic: "3. Message Flow",
      question: "What happens if a broker fails?",
      simpleAnswer: "If a broker fails, Kafka automatically elects new leaders for the partitions that were led by the failed broker — consumers and producers switch to the new leaders with minimal interruption.",
      explanation: "The Kafka Controller (a special broker role) monitors all brokers. When a broker fails, the Controller detects it and triggers leader election for all partitions that had their leader on the failed broker. A new leader is elected from the in-sync replicas (ISR) of each partition. Producers and consumers automatically discover the new leader via metadata requests and reconnect. The whole process typically takes a few seconds.",
      example: "Broker 2 fails. It was the leader for partitions P1 and P4. Controller elects Broker 3 as new leader for P1 and Broker 1 as new leader for P4. Producers retry and discover new leaders. Consumers reconnect to new leaders. Processing resumes. No data lost because replicas were in sync.",
      followUps: [{ question: "What if the failed broker had data that wasn't replicated yet?", answer: "If the broker had messages that weren't yet synced to followers (not in ISR), those messages can be lost. This is why acks=all is important — it ensures messages are written to all ISR replicas before the producer gets an acknowledgment." }],
      keyPoints: ["Controller detects broker failure", "New leader elected from in-sync replicas", "Producers and consumers auto-reconnect to new leader", "Data loss only if unsynced messages existed (use acks=all to prevent)"]
    },

    // ─── 4. PARTITIONING & ORDERING ──────────────────────────────────────────
    {
      id: 21, category: "Kafka", topic: "4. Partitioning & Ordering",
      question: "How does Kafka decide which partition a message goes to?",
      simpleAnswer: "If a key is provided, Kafka hashes the key to pick a partition. If no key, it uses round-robin or sticky partitioning.",
      explanation: "Kafka uses a Partitioner to decide the destination partition. The default partitioner works like this: if a key exists, it computes murmur2(key) % numPartitions — same key always lands on the same partition. If no key, Kafka uses sticky partitioning (fills one partition's batch before moving to the next) for better batching efficiency. You can also write a custom partitioner for special routing logic.",
      example: "Topic has 4 partitions. Message with key='order-99': hash('order-99') % 4 = 2 → goes to P2 every time. Message with no key: first batch goes to P0, next batch to P1, etc. Custom partitioner: route all 'premium' orders to P0 for priority processing.",
      followUps: [{ question: "What is a custom partitioner and when would you use it?", answer: "A custom partitioner implements the Partitioner interface and overrides the partition() method. Use it when you need special routing — e.g., route VIP customers to a dedicated partition, or route by geographic region." }],
      keyPoints: ["Key present → murmur2(key) % numPartitions", "No key → sticky partitioning for batching efficiency", "Same key always goes to same partition", "Custom partitioner for special routing logic"]
    },
    {
      id: 22, category: "Kafka", topic: "4. Partitioning & Ordering",
      question: "What is key-based partitioning?",
      simpleAnswer: "Key-based partitioning means all messages with the same key always go to the same partition — guaranteeing that those messages are processed in order.",
      explanation: "When you set a message key, Kafka hashes it to determine the partition. Since a partition is an ordered log, all messages with the same key arrive in the exact order they were produced. This is critical for use cases like user activity streams (all events for user-123 must be in order), financial transactions (all transactions for account-456 must be ordered), or change data capture (database row updates must be in order).",
      example: "E-commerce order updates: key = orderId. Order-101: CREATED (offset 5), PAYMENT_DONE (offset 8), SHIPPED (offset 12), DELIVERED (offset 20) — all in partition 2, all in order. Consumer processes them in sequence and correctly tracks order lifecycle.",
      followUps: [{ question: "What is a good key to use in Kafka?", answer: "Use a key that groups related messages that need ordering — like userId, orderId, accountId, or sessionId. Avoid keys with very low cardinality (like country code) as they create hot partitions. Avoid null keys if ordering matters." }],
      keyPoints: ["Same key → same partition always", "Partition is ordered → key-based ordering guaranteed", "Critical for event sequencing use cases", "Choose keys with high cardinality to avoid hot partitions"]
    },
    {
      id: 23, category: "Kafka", topic: "4. Partitioning & Ordering",
      question: "When is ordering guaranteed in Kafka?",
      simpleAnswer: "Ordering is guaranteed only within a single partition. Messages in the same partition are always consumed in the exact order they were produced.",
      explanation: "Kafka guarantees strict ordering within a partition because a partition is an append-only log — messages are written sequentially and read sequentially. There is NO ordering guarantee across partitions. If you need all messages for a specific entity (user, order, account) to be in order, use a consistent key so they all land in the same partition.",
      example: "Topic 'transactions' has 3 partitions. All transactions for account-123 use key='account-123' → always go to P1 → always consumed in order. But a transaction from account-123 (P1) and account-456 (P0) have no ordering guarantee relative to each other.",
      followUps: [{ question: "How do you guarantee global ordering across all messages?", answer: "Use a topic with only 1 partition. This gives global ordering but eliminates parallelism — only one consumer can read at a time. It's a trade-off: ordering vs throughput. Only use single partition for low-volume, strictly ordered streams." }],
      keyPoints: ["Ordering guaranteed within a partition", "No ordering guarantee across partitions", "Use consistent key to keep related messages in same partition", "Single partition = global order but no parallelism"]
    },
    {
      id: 24, category: "Kafka", topic: "4. Partitioning & Ordering",
      question: "Why is ordering only within a partition?",
      simpleAnswer: "Because each partition is an independent ordered log on a separate broker — there is no global clock or sequence number across partitions.",
      explanation: "Kafka is a distributed system. Partitions live on different brokers, written to by different threads, at different speeds. There is no central coordinator tracking the global order of messages across partitions. Each partition maintains its own offset sequence independently. When consumers read from multiple partitions in parallel, messages from different partitions interleave in an unpredictable order depending on network speed, broker load, and consumer timing.",
      example: "P0 has: msg-A (t=1ms), msg-B (t=3ms). P1 has: msg-C (t=2ms). Consumer reads P0 and P1 in parallel. It might get: A, B, C or A, C, B or C, A, B — no guarantee. But within P0, A always comes before B. Within P1, C is always in its own order.",
      followUps: [{ question: "Is there any way to get cross-partition ordering?", answer: "Not natively in Kafka. You'd need to implement application-level sequencing — include a timestamp or sequence number in the message payload and sort on the consumer side. This adds complexity and latency." }],
      keyPoints: ["Each partition is an independent log", "No global clock across partitions", "Parallel reads from multiple partitions interleave unpredictably", "Application-level sequencing needed for cross-partition order"]
    },

    // ─── 5. CONSUMER GROUP DEEP UNDERSTANDING ────────────────────────────────
    {
      id: 25, category: "Kafka", topic: "5. Consumer Groups",
      question: "What is a consumer group?",
      simpleAnswer: "A consumer group is a set of consumers identified by the same group ID that collectively consume a topic — each partition is read by exactly one consumer in the group.",
      explanation: "Consumer groups are Kafka's mechanism for parallel consumption and load balancing. When you have a topic with N partitions and a consumer group with N consumers, each consumer reads one partition — maximum parallelism. If you have fewer consumers than partitions, some consumers read multiple partitions. If more consumers than partitions, some consumers are idle. Different consumer groups are completely independent — each group maintains its own offsets and gets all messages.",
      example: "Topic 'orders' has 6 partitions. Group 'payment-service' has 3 consumers: Consumer 1 reads P0+P1, Consumer 2 reads P2+P3, Consumer 3 reads P4+P5. Group 'analytics-service' also has 6 consumers, each reading 1 partition. Both groups get all messages independently.",
      followUps: [{ question: "Can two consumers in the same group read the same partition?", answer: "No. Within a consumer group, each partition is assigned to exactly one consumer. This is enforced by Kafka's group coordinator. It prevents duplicate processing within the same group." }],
      keyPoints: ["Same group ID = same consumer group", "Each partition assigned to one consumer in the group", "Different groups are independent — each gets all messages", "Number of active consumers ≤ number of partitions"]
    },
    {
      id: 26, category: "Kafka", topic: "5. Consumer Groups",
      question: "Why are consumer groups used?",
      simpleAnswer: "Consumer groups enable parallel processing of a topic and allow multiple independent applications to each consume the full stream of messages.",
      explanation: "Two main reasons: 1) Scalability — by splitting partitions across multiple consumers in a group, you process messages in parallel. A topic with 12 partitions can be consumed 12x faster with 12 consumers vs 1. 2) Independence — different services (payment, notification, analytics) each need all the messages. By using separate groups, each service gets its own independent copy of the stream without interfering with others.",
      example: "High-volume 'clicks' topic with 20 partitions. Analytics team deploys 20 consumer instances in group 'analytics' — processes 20 partitions in parallel. Separately, the 'recommendation-engine' group has 10 consumers — each reads 2 partitions. Both groups process all click events independently.",
      followUps: [{ question: "What is the maximum parallelism you can achieve with consumer groups?", answer: "Maximum parallelism equals the number of partitions. You can have at most as many active consumers as partitions in a group. To increase parallelism, increase the number of partitions (but this is a one-way operation)." }],
      keyPoints: ["Parallel processing within a group", "Independent consumption across groups", "Max parallelism = number of partitions", "Each group maintains its own offset tracking"]
    },
    {
      id: 27, category: "Kafka", topic: "5. Consumer Groups",
      question: "What is rebalancing in Kafka?",
      simpleAnswer: "Rebalancing is the process where Kafka redistributes partition assignments among consumers in a group — triggered when consumers join, leave, or fail.",
      explanation: "A rebalance is triggered when: a new consumer joins the group, a consumer leaves or crashes, a consumer is considered dead (missed heartbeats), or new partitions are added to the topic. During a rebalance, all consumers in the group stop processing (stop-the-world), the group coordinator reassigns all partitions, and consumers resume with their new assignments. This causes a brief processing pause.",
      example: "Group has 3 consumers reading 6 partitions (2 each). Consumer 2 crashes. Rebalance triggered: Consumer 1 now reads P0, P1, P2. Consumer 3 reads P3, P4, P5. Processing pauses for ~1-2 seconds during reassignment, then resumes.",
      followUps: [{ question: "What is cooperative rebalancing?", answer: "Cooperative (incremental) rebalancing only revokes and reassigns the partitions that need to move — not all partitions. This minimizes the stop-the-world pause. It's the default in Kafka 3.x with the CooperativeStickyAssignor." }],
      keyPoints: ["Triggered by consumer join/leave/crash or new partitions", "All consumers pause during rebalance (eager rebalancing)", "Partitions redistributed among active consumers", "Cooperative rebalancing minimizes pause by moving only necessary partitions"]
    },
    {
      id: 28, category: "Kafka", topic: "5. Consumer Groups",
      question: "What happens during a rebalance?",
      simpleAnswer: "All consumers in the group stop processing, give up their partition assignments, the coordinator reassigns partitions, and consumers resume with new assignments.",
      explanation: "Eager rebalance steps: 1) Group coordinator notifies all consumers that a rebalance is starting. 2) All consumers revoke their current partition assignments and commit offsets. 3) All consumers rejoin the group and send their metadata to the coordinator. 4) The coordinator (or the group leader consumer) runs the partition assignment algorithm. 5) New assignments are sent to each consumer. 6) Consumers resume polling from their assigned partitions. The entire process can take seconds to tens of seconds depending on group size.",
      example: "10-consumer group processing 100 partitions. New consumer joins. Rebalance: all 10 stop → commit offsets → rejoin → coordinator assigns 100 partitions to 11 consumers (9 consumers get 9 partitions, 2 get 10) → all resume. ~2 second pause for the entire group.",
      followUps: [{ question: "How do you reduce rebalance frequency?", answer: "Increase session.timeout.ms to tolerate slow consumers. Use static membership (group.instance.id) so restarting consumers rejoin with the same identity without triggering a full rebalance. Tune heartbeat.interval.ms to be 1/3 of session.timeout.ms." }],
      keyPoints: ["All consumers stop and revoke partitions", "Coordinator runs assignment algorithm", "Consumers resume with new assignments", "Can cause seconds of processing pause"]
    },
    {
      id: 29, category: "Kafka", topic: "5. Consumer Groups",
      question: "What if consumers are more than partitions?",
      simpleAnswer: "Extra consumers sit idle — they have no partition to read from. Kafka cannot assign the same partition to two consumers in the same group.",
      explanation: "The number of active consumers in a group is capped by the number of partitions. If you have 10 partitions and 15 consumers in a group, 10 consumers are active (one per partition) and 5 are idle standby. The idle consumers are not wasted — they act as hot standbys. If an active consumer fails, an idle one immediately takes over its partition during rebalance without needing to spin up a new instance.",
      example: "Topic 'orders' has 4 partitions. Consumer group has 6 consumers. Kafka assigns: C1→P0, C2→P1, C3→P2, C4→P3. C5 and C6 are idle. C2 crashes → rebalance → C5 (idle) gets P1. Processing resumes quickly because C5 was already running.",
      followUps: [{ question: "Should you always match consumer count to partition count?", answer: "It depends. Matching gives maximum parallelism with no idle consumers. Having extra consumers provides faster failover. Having fewer consumers is fine if each consumer can handle multiple partitions. Scale based on your throughput needs." }],
      keyPoints: ["Max active consumers = number of partitions", "Extra consumers sit idle as hot standbys", "Idle consumers take over on failure — faster recovery", "Never assign same partition to two consumers in same group"]
    },

    // ─── 6. OFFSET MANAGEMENT ────────────────────────────────────────────────
    {
      id: 30, category: "Kafka", topic: "6. Offset Management",
      question: "What is an offset in Kafka?",
      simpleAnswer: "An offset is a unique sequential number for each message within a partition — consumers use it to track which messages they have already processed.",
      explanation: "Every message written to a partition gets an offset: 0, 1, 2, 3... Offsets are immutable and always increasing. They are per-partition — partition 0 has its own offset sequence, partition 1 has its own. Consumers store their current offset (the next message to read) in Kafka's internal __consumer_offsets topic. This allows consumers to resume exactly where they left off after a restart, crash, or rebalance.",
      example: "Partition 0: [offset 0: order-A, offset 1: order-B, offset 2: order-C, offset 3: order-D]. Consumer reads offsets 0, 1, 2 and commits offset 3 (meaning 'next read from 3'). Consumer restarts → resumes from offset 3 → reads order-D next. No messages skipped or reprocessed.",
      followUps: [{ question: "Can you reset a consumer's offset?", answer: "Yes. Use kafka-consumer-groups.sh --reset-offsets to move a consumer's offset to the beginning (--to-earliest), end (--to-latest), a specific offset, or a specific timestamp. Useful for reprocessing historical data or skipping bad messages." }],
      keyPoints: ["Unique sequential number per message per partition", "Consumers track position using offsets", "Stored in __consumer_offsets internal topic", "Enables resume after restart without data loss"]
    },

    // ─── 6. OFFSET MANAGEMENT (continued) ───────────────────────────────────
    {
      id: 31, category: "Kafka", topic: "6. Offset Management",
      question: "How are offsets stored in Kafka?",
      simpleAnswer: "Consumer offsets are stored in a special internal Kafka topic called __consumer_offsets — not in ZooKeeper or an external database.",
      explanation: "When a consumer commits an offset, Kafka writes a record to the __consumer_offsets topic with the key = (groupId, topic, partition) and value = committed offset. This topic is replicated like any other Kafka topic, making offset storage durable and fault-tolerant. Before Kafka 0.9, offsets were stored in ZooKeeper, which caused scalability issues. Moving offsets to Kafka itself solved this.",
      example: "Consumer group 'payment-service' commits offset 42 for topic 'orders', partition 1. Kafka writes to __consumer_offsets: key='payment-service:orders:1', value='42'. On restart, the consumer reads this record and knows to start from offset 43.",
      followUps: [{ question: "Can you read the __consumer_offsets topic directly?", answer: "Yes, but it's in binary format. Use kafka-consumer-groups.sh --describe to see committed offsets in a human-readable way. Direct reads of __consumer_offsets require deserializing with the internal schema." }],
      keyPoints: ["Stored in __consumer_offsets internal Kafka topic", "Key = (groupId, topic, partition), Value = offset", "Replicated for durability", "Replaced ZooKeeper-based offset storage in Kafka 0.9+"]
    },
    {
      id: 32, category: "Kafka", topic: "6. Offset Management",
      question: "What is auto-commit in Kafka?",
      simpleAnswer: "Auto-commit automatically commits the consumer's current offset at a fixed interval without you writing any commit code — convenient but can cause duplicate processing or data loss.",
      explanation: "When enable.auto.commit=true (default), Kafka commits the offset of the last polled message every auto.commit.interval.ms (default 5 seconds). This is simple but risky: if the consumer crashes after polling but before the auto-commit fires, those messages will be reprocessed on restart (at-least-once). If you commit before finishing processing, messages could be skipped on restart (at-most-once). For production, manual commit gives you precise control.",
      example: "Consumer polls messages at t=0s. Auto-commit fires at t=5s. Consumer crashes at t=3s. On restart, consumer re-reads all messages from t=0s because the offset wasn't committed yet — duplicate processing. With manual commit, you commit only after successful processing.",
      followUps: [{ question: "Should you use auto-commit in production?", answer: "Generally no for critical systems. Auto-commit is fine for simple, idempotent consumers where occasional reprocessing is harmless. For financial or exactly-once scenarios, use manual commit after confirmed processing." }],
      keyPoints: ["Commits offset automatically every 5 seconds by default", "enable.auto.commit=true is the default", "Risk: crash between poll and commit causes reprocessing", "Simple but less control than manual commit"]
    },
    {
      id: 33, category: "Kafka", topic: "6. Offset Management",
      question: "What is manual commit in Kafka?",
      simpleAnswer: "Manual commit means you explicitly call commitSync() or commitAsync() in your code after processing messages — giving you full control over exactly when the offset is saved.",
      explanation: "With manual commit, you decide when to commit. commitSync() blocks until Kafka confirms the commit — safe but slower. commitAsync() doesn't block — faster but if it fails silently, the offset may not be saved. Best practice: process the message fully, then commit. This gives at-least-once delivery. For exactly-once, combine manual commit with idempotent processing logic.",
      example: "consumer.poll() → get 10 messages → process all 10 → save to database → commitSync(). If processing fails on message 7, don't commit — on restart, re-read all 10 from the last committed offset. Only commit after all 10 are successfully processed.",
      followUps: [{ question: "What is per-message commit vs per-batch commit?", answer: "Per-message: commit after every single message — safest, slowest. Per-batch: commit after processing the entire poll batch — faster, but if batch processing fails midway, the whole batch is reprocessed. Per-batch is the most common approach." }],
      keyPoints: ["You call commitSync() or commitAsync() explicitly", "commitSync: blocks, safe", "commitAsync: non-blocking, faster but can fail silently", "Commit only after successful processing for at-least-once"]
    },
    {
      id: 34, category: "Kafka", topic: "6. Offset Management",
      question: "What happens if the offset is not committed?",
      simpleAnswer: "If the offset is not committed and the consumer restarts, it will re-read and reprocess all messages from the last committed offset — causing duplicate processing.",
      explanation: "Kafka only knows where a consumer left off based on the committed offset. If a consumer processes 100 messages but never commits, then crashes, Kafka has no record of that progress. On restart, the consumer starts from the last committed offset (or the beginning if never committed) and processes those 100 messages again. This is the at-least-once delivery guarantee — messages are never lost but may be processed more than once.",
      example: "Consumer starts fresh (no committed offset, auto.offset.reset=earliest). Reads offsets 0–99, processes them, crashes without committing. Restarts → reads offsets 0–99 again → processes them again. If your processing inserts into a database without deduplication, you get 200 rows instead of 100.",
      followUps: [{ question: "How do you handle duplicate processing caused by uncommitted offsets?", answer: "Make your consumer logic idempotent — processing the same message twice produces the same result as processing it once. Use a unique message ID to check if already processed, or use database upserts instead of inserts." }],
      keyPoints: ["Uncommitted offset = consumer re-reads on restart", "At-least-once delivery — messages processed multiple times", "Never lose messages but may duplicate processing", "Solution: idempotent consumer logic"]
    },

    // ─── 7. DELIVERY SEMANTICS ───────────────────────────────────────────────
    {
      id: 35, category: "Kafka", topic: "7. Delivery Semantics",
      question: "What is at-most-once delivery?",
      simpleAnswer: "At-most-once means a message is delivered zero or one time — it will never be delivered twice, but it might be lost if something goes wrong.",
      explanation: "At-most-once is achieved by committing the offset before processing the message. If the consumer crashes after committing but before finishing processing, the message is lost — the offset is already advanced so Kafka won't resend it. This is the fastest delivery mode (no retries, no duplicate checks) but sacrifices reliability. Acceptable for use cases where losing some messages is okay, like metrics or analytics.",
      example: "Consumer polls message at offset 10. Immediately commits offset 11. Then processes the message. Consumer crashes during processing. On restart, consumer starts from offset 11 — offset 10 is gone forever. The message was never fully processed but will never be retried.",
      followUps: [{ question: "When is at-most-once acceptable?", answer: "For non-critical, high-volume data where occasional loss is tolerable — like click tracking, page view analytics, or sensor readings where losing 0.01% of data doesn't matter." }],
      keyPoints: ["Commit offset BEFORE processing", "Message may be lost if crash occurs during processing", "Never duplicated but can be lost", "Use for non-critical, high-volume analytics"]
    },
    {
      id: 36, category: "Kafka", topic: "7. Delivery Semantics",
      question: "What is at-least-once delivery?",
      simpleAnswer: "At-least-once means a message is delivered one or more times — it will never be lost, but it might be processed more than once if something goes wrong.",
      explanation: "At-least-once is achieved by committing the offset only after successfully processing the message. If the consumer crashes after processing but before committing, Kafka resends the message on restart. The message is processed again — a duplicate. This is the most common delivery guarantee in Kafka. To handle duplicates, make your consumer logic idempotent (same result whether processed once or twice).",
      example: "Consumer reads offset 10, processes payment successfully, then crashes before committing. Restarts → reads offset 10 again → processes payment again → duplicate charge! Solution: check if payment for this orderId already exists before charging.",
      followUps: [{ question: "How do you make at-least-once safe?", answer: "Idempotent consumers: before processing, check if the message was already handled (using a unique ID stored in a database). Or use database upserts (INSERT ... ON CONFLICT DO NOTHING) instead of plain inserts." }],
      keyPoints: ["Commit offset AFTER processing", "Message may be processed more than once", "Never lost but can be duplicated", "Most common guarantee — handle with idempotent logic"]
    },
    {
      id: 37, category: "Kafka", topic: "7. Delivery Semantics",
      question: "What is exactly-once delivery?",
      simpleAnswer: "Exactly-once means every message is processed exactly one time — no data loss and no duplicates. The hardest guarantee to achieve.",
      explanation: "Exactly-once requires coordination between the producer, Kafka broker, and consumer. Kafka achieves this through: 1) Idempotent producers (enable.idempotence=true) — prevents duplicate writes from producer retries. 2) Transactional producers — atomically write to multiple partitions. 3) Read-process-write transactions — consumer reads, processes, and commits offset all in one atomic transaction. This is complex and has performance overhead.",
      example: "Stream processing: read from topic A, transform, write to topic B, commit offset — all in one transaction. If any step fails, the entire transaction rolls back. The message is neither written to topic B nor the offset committed. On retry, the exact same message is processed and written exactly once.",
      followUps: [{ question: "Does Kafka guarantee exactly-once end-to-end?", answer: "Kafka guarantees exactly-once within the Kafka ecosystem (producer → broker → consumer with Kafka Streams). For external systems (writing to a database), you need to implement idempotency at the application level since Kafka can't control external systems." }],
      keyPoints: ["No data loss AND no duplicates", "Requires idempotent producer + transactions", "Most complex and has performance overhead", "Kafka Streams supports exactly-once natively"]
    },
    {
      id: 38, category: "Kafka", topic: "7. Delivery Semantics",
      question: "How does Kafka achieve exactly-once?",
      simpleAnswer: "Through three mechanisms: idempotent producers (no duplicate writes), transactional producers (atomic multi-partition writes), and transactional consumers (atomic read-process-commit).",
      explanation: "1) Idempotent producer: each producer gets a unique PID and sequence number. If a message is retried, the broker detects the duplicate sequence and ignores it. 2) Transactional producer: beginTransaction() → send to multiple topics/partitions → commitTransaction(). Either all writes succeed or all are rolled back. 3) Consumer with isolation.level=read_committed: only reads messages from committed transactions — never sees partial or aborted writes.",
      example: "Kafka Streams job: beginTransaction() → read from 'orders' topic → process → write result to 'processed-orders' → commitOffsets() → commitTransaction(). If the job crashes mid-way, the transaction aborts. On restart, it re-reads the same message and processes it again — but the previous partial write is invisible to downstream consumers.",
      followUps: [{ question: "What is the performance cost of exactly-once?", answer: "Roughly 20-30% throughput reduction compared to at-least-once. The overhead comes from transaction coordination, two-phase commit protocol, and the extra metadata. Use exactly-once only when business requirements demand it." }],
      keyPoints: ["Idempotent producer: PID + sequence number prevents duplicates", "Transactional producer: atomic multi-partition writes", "read_committed isolation: consumers skip aborted transactions", "~20-30% throughput overhead vs at-least-once"]
    },

    // ─── 8. REPLICATION & FAULT TOLERANCE ───────────────────────────────────
    {
      id: 39, category: "Kafka", topic: "8. Replication & Fault Tolerance",
      question: "What is replication factor in Kafka?",
      simpleAnswer: "Replication factor is the number of copies of each partition across different brokers — a factor of 3 means each partition exists on 3 brokers.",
      explanation: "When you create a topic with replication factor N, Kafka stores each partition on N different brokers. One is the leader (handles reads/writes), the rest are followers (replicas). The replication factor determines fault tolerance: with factor 3, you can lose 2 brokers and still have data available. Higher replication = more fault tolerance but more disk usage and network overhead.",
      example: "Topic 'payments' with 3 partitions and replication factor 3 on a 3-broker cluster: P0 leader=Broker1, replicas=Broker2,Broker3. P1 leader=Broker2, replicas=Broker1,Broker3. P2 leader=Broker3, replicas=Broker1,Broker2. Broker1 fails → P0 elects Broker2 as leader. No data lost.",
      followUps: [{ question: "What is the minimum replication factor for production?", answer: "3 is the standard minimum for production. It tolerates 1 broker failure. Never use 1 in production — a single broker failure means data loss. For critical financial data, some teams use 5." }],
      keyPoints: ["Number of copies of each partition", "Factor 3 = 1 leader + 2 followers", "Tolerates (factor - 1) broker failures", "Higher factor = more fault tolerance, more storage cost"]
    },
    {
      id: 40, category: "Kafka", topic: "8. Replication & Fault Tolerance",
      question: "What is ISR (In-Sync Replicas)?",
      simpleAnswer: "ISR is the set of replicas that are fully caught up with the leader — only ISR members are eligible to become the new leader if the current leader fails.",
      explanation: "Not all replicas are always in sync. A follower falls out of ISR if it falls too far behind the leader (controlled by replica.lag.time.max.ms — default 30 seconds). The ISR list is maintained by the leader and stored in ZooKeeper/KRaft. When the leader fails, only a replica in the ISR can be elected as the new leader — this prevents data loss from electing a stale replica. If ISR shrinks to just the leader and the leader fails, Kafka must choose between availability (elect an out-of-sync replica) or consistency (wait for ISR).",
      example: "Partition 0: Leader=Broker1, Followers=Broker2,Broker3. ISR=[Broker1,Broker2,Broker3]. Broker3 gets slow → falls 30s behind → removed from ISR. ISR=[Broker1,Broker2]. Broker1 fails → only Broker2 can be elected leader (it's in ISR). Broker3 cannot be elected — it's missing recent messages.",
      followUps: [{ question: "What is unclean leader election?", answer: "Allowing a replica outside the ISR to become leader. Configured with unclean.leader.election.enable=true. This prioritizes availability over consistency — the new leader may be missing recent messages, causing data loss. Default is false in modern Kafka." }],
      keyPoints: ["Set of replicas fully caught up with leader", "Only ISR members eligible for leader election", "Replica removed from ISR if too far behind", "ISR ensures no data loss during leader failover"]
    },

    // ─── 8. REPLICATION & FAULT TOLERANCE (continued) ───────────────────────
    {
      id: 41, category: "Kafka", topic: "8. Replication & Fault Tolerance",
      question: "What happens if the leader fails?",
      simpleAnswer: "Kafka's Controller detects the failure and automatically elects a new leader from the ISR — producers and consumers reconnect to the new leader within seconds.",
      explanation: "The Kafka Controller (a special broker) monitors all partition leaders via heartbeats. When a leader broker goes down, the Controller detects it and picks the first replica in the ISR list as the new leader. It updates the cluster metadata. Producers and consumers periodically fetch metadata — they discover the new leader and reconnect automatically. The whole failover typically takes 5–30 seconds depending on configuration.",
      example: "Broker 1 is leader for partition 0. Broker 1 crashes. Controller sees Broker 1 is gone. ISR = [Broker1, Broker2, Broker3] → removes Broker1 → elects Broker2 as new leader. Updates metadata. Producer retries → fetches new metadata → sends to Broker2. Consumer reconnects to Broker2. Zero data loss since Broker2 was in sync.",
      followUps: [{ question: "How fast is Kafka leader failover?", answer: "Typically 5–30 seconds. Controlled by zookeeper.session.timeout.ms (or KRaft equivalent). You can tune it lower but too aggressive causes false positives (healthy brokers marked as failed due to GC pauses or network hiccups)." }],
      keyPoints: ["Controller detects leader failure", "New leader elected from ISR automatically", "Producers and consumers auto-reconnect via metadata refresh", "Failover typically takes 5–30 seconds"]
    },
    {
      id: 42, category: "Kafka", topic: "8. Replication & Fault Tolerance",
      question: "What is leader election in Kafka?",
      simpleAnswer: "Leader election is the process where Kafka automatically picks a new partition leader from the in-sync replicas when the current leader fails.",
      explanation: "The Kafka Controller manages leader elections. When a broker fails, the Controller iterates through each partition that had its leader on the failed broker. For each partition, it picks the first replica in the ISR list as the new leader. The new leader starts accepting reads and writes immediately. The Controller then broadcasts the updated partition metadata to all brokers so producers and consumers can find the new leaders.",
      example: "Broker 2 fails. It was leader for P1 (ISR: [B2, B3, B1]) and P4 (ISR: [B2, B1]). Controller elects B3 as leader for P1 (first in ISR after removing B2). Elects B1 as leader for P4. Broadcasts new metadata. All clients update their routing.",
      followUps: [{ question: "What is preferred leader election?", answer: "When a failed broker comes back online, Kafka can reassign leadership back to the original (preferred) leader using auto.leader.rebalance.enable=true. This keeps the load balanced across brokers over time." }],
      keyPoints: ["Controller manages all leader elections", "First replica in ISR becomes new leader", "Updated metadata broadcast to all brokers", "Preferred leader rebalance restores original assignments"]
    },
    {
      id: 43, category: "Kafka", topic: "8. Replication & Fault Tolerance",
      question: "What is data durability in Kafka?",
      simpleAnswer: "Data durability means messages written to Kafka are not lost — achieved through disk persistence and replication across multiple brokers.",
      explanation: "Kafka writes messages to disk (not just memory) on the broker. Combined with replication, this means data survives both broker restarts and broker failures. Durability is controlled by: acks setting on the producer (acks=all ensures all ISR replicas confirm the write), replication factor (more copies = more durable), and flush settings (log.flush.interval.messages controls how often data is fsynced to disk).",
      example: "Producer sends with acks=all, replication factor=3. Message is written to leader (Broker1) and both followers (Broker2, Broker3) before producer gets acknowledgment. Even if Broker1 and Broker2 both fail simultaneously, Broker3 still has the message. Data is durable.",
      followUps: [{ question: "Can Kafka lose data?", answer: "Yes, in specific scenarios: acks=0 or acks=1 with a broker crash before replication, unclean leader election enabled with an out-of-sync replica elected, or replication factor=1 with a broker disk failure. Proper configuration (acks=all, RF=3, unclean.leader.election=false) makes data loss extremely unlikely." }],
      keyPoints: ["Messages written to disk — survive restarts", "Replication across brokers — survive failures", "acks=all ensures all ISR replicas confirm write", "Replication factor 3 + acks=all = strong durability"]
    },

    // ─── 9. PERFORMANCE & SCALABILITY ───────────────────────────────────────
    {
      id: 44, category: "Kafka", topic: "9. Performance & Scalability",
      question: "Why is Kafka so fast?",
      simpleAnswer: "Kafka is fast because of sequential disk I/O, zero-copy data transfer, batching, compression, and a simple append-only log structure.",
      explanation: "Key reasons: 1) Sequential writes — Kafka appends to the end of a log file. Sequential disk I/O is nearly as fast as RAM. 2) Zero-copy — Kafka uses the OS sendfile() syscall to transfer data from disk to network without copying through application memory. 3) Batching — producers and consumers batch multiple messages together, reducing network round trips. 4) Compression — batches are compressed (gzip, snappy, lz4) reducing network bandwidth. 5) Partitioning — parallel reads/writes across multiple partitions and brokers.",
      example: "A single Kafka broker can handle 1 million messages/second. Compare to a traditional database that might handle 10,000 writes/second. The difference: Kafka does sequential appends to a log file (fast), while a database does random writes with index updates (slow).",
      followUps: [{ question: "What is the page cache and how does Kafka use it?", answer: "The OS page cache keeps recently accessed disk data in RAM. Kafka relies heavily on the page cache — recently written messages are served from RAM (not disk) to consumers. This is why Kafka consumers reading recent data are extremely fast." }],
      keyPoints: ["Sequential disk I/O — nearly as fast as RAM", "Zero-copy transfer via OS sendfile()", "Batching reduces network round trips", "Page cache serves recent messages from RAM"]
    },
    {
      id: 45, category: "Kafka", topic: "9. Performance & Scalability",
      question: "What is batching in Kafka?",
      simpleAnswer: "Batching means the producer groups multiple messages together and sends them as one network request — reducing overhead and dramatically increasing throughput.",
      explanation: "Instead of sending each message individually (one network call per message), the producer accumulates messages in a buffer and sends them together. Controlled by batch.size (max bytes per batch, default 16KB) and linger.ms (how long to wait for more messages before sending, default 0ms). Higher linger.ms = larger batches = higher throughput but slightly more latency. Batching also enables compression — compressing a batch of similar messages is much more effective than compressing individual messages.",
      example: "Without batching: 1000 messages = 1000 network calls. With batching (linger.ms=5): 1000 messages arrive in 5ms → sent as 1 batch → 1 network call. Throughput increases ~1000x for that burst. Latency increases by at most 5ms.",
      followUps: [{ question: "What is the trade-off with linger.ms?", answer: "Higher linger.ms = larger batches = higher throughput but adds latency (you wait up to linger.ms before sending). For real-time systems needing low latency, keep linger.ms=0. For high-throughput pipelines where latency is less critical, use linger.ms=5-20ms." }],
      keyPoints: ["Groups multiple messages into one network request", "Controlled by batch.size and linger.ms", "Higher throughput at the cost of slight latency", "Enables effective compression of similar messages"]
    },
    {
      id: 46, category: "Kafka", topic: "9. Performance & Scalability",
      question: "What is compression in Kafka?",
      simpleAnswer: "Compression reduces the size of message batches before sending over the network — saving bandwidth and increasing throughput.",
      explanation: "Kafka supports gzip, snappy, lz4, and zstd compression. Compression is configured on the producer (compression.type). The producer compresses the entire batch before sending. The broker stores the compressed batch as-is. The consumer decompresses when reading. Compression is most effective when messages are similar (like JSON events with the same schema). Typical compression ratios: 4:1 to 10:1 for JSON data.",
      example: "1000 JSON order events, each 500 bytes = 500KB uncompressed. With lz4 compression: ~80KB compressed. Network transfer is 6x faster. Broker stores 80KB instead of 500KB. Consumer decompresses in microseconds. Net result: higher throughput, lower storage cost.",
      followUps: [{ question: "Which compression algorithm should you use?", answer: "lz4 for best speed/compression balance (recommended for most cases). snappy for fast compression with moderate ratio. gzip for best compression ratio but slower. zstd (Kafka 2.1+) for best overall — better ratio than lz4 with similar speed." }],
      keyPoints: ["Compresses entire batch before sending", "Supported: gzip, snappy, lz4, zstd", "Broker stores compressed — consumer decompresses", "Typical 4:1 to 10:1 ratio for JSON data"]
    },
    {
      id: 47, category: "Kafka", topic: "9. Performance & Scalability",
      question: "What is throughput vs latency in Kafka?",
      simpleAnswer: "Throughput is how many messages per second Kafka can handle. Latency is how long it takes for a single message to go from producer to consumer. They are a trade-off — optimizing one often hurts the other.",
      explanation: "High throughput settings: larger batches (batch.size), longer wait (linger.ms), compression, more partitions. These increase the time a single message waits in the buffer before being sent — higher latency. Low latency settings: linger.ms=0, acks=1, smaller batches — messages sent immediately but fewer per network call — lower throughput. Design your Kafka configuration based on your use case: real-time alerting needs low latency, data pipelines need high throughput.",
      example: "Real-time fraud detection: linger.ms=0, acks=1 → message reaches consumer in <10ms but throughput is lower. Nightly analytics pipeline: linger.ms=20, batch.size=1MB, compression=lz4 → throughput of 500MB/s but individual message latency is 20-50ms.",
      followUps: [{ question: "What is end-to-end latency in Kafka?", answer: "End-to-end latency = producer send time + broker write time + consumer poll interval. With optimal settings, Kafka can achieve <10ms end-to-end latency. The consumer's fetch.min.bytes and fetch.max.wait.ms settings heavily influence consumer-side latency." }],
      keyPoints: ["Throughput: messages per second", "Latency: time from produce to consume", "linger.ms and batch.size trade latency for throughput", "Tune based on use case: real-time vs pipeline"]
    },
    {
      id: 48, category: "Kafka", topic: "9. Performance & Scalability",
      question: "How do you scale Kafka?",
      simpleAnswer: "Scale Kafka by adding more brokers to the cluster, increasing partitions on topics, and adding more consumers to consumer groups.",
      explanation: "Three dimensions of scaling: 1) Broker scaling — add more broker nodes to distribute partition load. Kafka automatically rebalances partitions across new brokers (with kafka-reassign-partitions.sh). 2) Partition scaling — increase partitions on a topic to allow more parallel consumers. More partitions = more parallelism but more overhead. 3) Consumer scaling — add more consumer instances to a group (up to the number of partitions). For producers, simply run more producer instances.",
      example: "Traffic doubles. Current: 3 brokers, 12 partitions, 12 consumers. Scale: add 3 more brokers (6 total) → rebalance partitions across 6 brokers. Increase partitions to 24 → add 12 more consumers (24 total). Each consumer now handles 1 partition. Throughput doubles.",
      followUps: [{ question: "Can you decrease the number of partitions?", answer: "No — Kafka does not support reducing partition count. You can only increase. To reduce partitions, you'd need to create a new topic with fewer partitions and migrate data. Plan your partition count carefully upfront." }],
      keyPoints: ["Add brokers to distribute load", "Increase partitions for more parallelism", "Add consumers up to partition count", "Cannot decrease partition count — plan ahead"]
    },

    // ─── 10. RETENTION & STORAGE ─────────────────────────────────────────────
    {
      id: 49, category: "Kafka", topic: "10. Retention & Storage",
      question: "What is retention policy in Kafka?",
      simpleAnswer: "Retention policy controls how long Kafka keeps messages before deleting them — either by time (e.g., 7 days) or by size (e.g., 100GB per partition).",
      explanation: "Unlike traditional queues that delete messages after consumption, Kafka retains messages for a configurable period regardless of whether they've been consumed. Two retention modes: 1) Time-based (log.retention.hours, default 168 = 7 days) — messages older than this are deleted. 2) Size-based (log.retention.bytes) — when partition size exceeds this, oldest segments are deleted. You can set both — whichever limit is hit first triggers deletion.",
      example: "Topic 'orders' with log.retention.hours=72 (3 days). Orders from Monday are deleted on Thursday. A new analytics service deployed on Wednesday can still replay all orders from the past 3 days. After 3 days, old messages are gone — new consumers can only read from the earliest available offset.",
      followUps: [{ question: "Can you set different retention per topic?", answer: "Yes. Override at the topic level using kafka-configs.sh --alter --add-config retention.ms=86400000. This overrides the broker-level default for that specific topic. Critical topics can have longer retention, high-volume topics shorter." }],
      keyPoints: ["Messages retained by time (default 7 days) or size", "Deleted regardless of whether consumed", "Enables replay of historical data within retention window", "Configurable per topic to override broker defaults"]
    },
    {
      id: 50, category: "Kafka", topic: "10. Retention & Storage",
      question: "What is log compaction in Kafka?",
      simpleAnswer: "Log compaction keeps only the latest message for each key in a partition — older messages with the same key are deleted, but the most recent value is always retained.",
      explanation: "Regular retention deletes messages by age or size regardless of key. Log compaction (cleanup.policy=compact) works differently — it scans the log and removes older messages that have been superseded by a newer message with the same key. The result: for each key, only the latest value is kept. This is perfect for maintaining the current state of entities (like a user profile or product price). A null value (tombstone) deletes the key entirely.",
      example: "Topic 'user-profiles' with compaction. User-123 updates: offset 5 (name=John), offset 12 (email=john@x.com), offset 20 (name=Johnny). After compaction: only offset 20 (name=Johnny, email=john@x.com merged) survives for user-123. A new consumer reading the topic gets the current state of all users without replaying the full history.",
      followUps: [{ question: "What is a tombstone message in Kafka?", answer: "A message with a key but null value. When log compaction runs, it deletes all messages for that key including the tombstone (after a grace period). Used to signal deletion of an entity — like deleting a user from a compacted topic." }],
      keyPoints: ["Keeps only latest message per key", "Older superseded messages are deleted", "Perfect for current-state topics (user profiles, configs)", "Null value (tombstone) = delete the key entirely"]
    },

    // ─── 10. RETENTION & STORAGE (continued) ────────────────────────────────
    {
      id: 51, category: "Kafka", topic: "10. Retention & Storage",
      question: "How does Kafka store data internally?",
      simpleAnswer: "Kafka stores each partition as a series of segment files on disk — an append-only log where new messages are written to the end of the active segment.",
      explanation: "Each partition is a directory on the broker's disk. Inside, data is split into segment files (default 1GB each). Each segment has a .log file (actual message data) and an .index file (offset-to-position mapping for fast lookups). The active segment is the one being written to. Older segments are read-only. When a segment reaches its size limit or age, a new segment is created. Kafka uses the index files to quickly jump to any offset without scanning the entire log.",
      example: "Partition 0 directory: 00000000000000000000.log (segment 1, offsets 0–999), 00000000000000001000.log (segment 2, offsets 1000–1999), 00000000000000002000.log (active segment, offsets 2000+). Consumer wants offset 1500 → Kafka checks index → jumps directly to the right position in segment 2.",
      followUps: [{ question: "What is the segment size and why does it matter?", answer: "Default segment size is 1GB (log.segment.bytes). Smaller segments mean more files but faster cleanup (retention deletes whole segments). Larger segments mean fewer files but slower cleanup. Tune based on your retention and throughput needs." }],
      keyPoints: ["Partition stored as segment files on disk", "Each segment: .log (data) + .index (offset lookup)", "Append-only — new messages go to active segment", "Index enables O(1) offset lookup without full scan"]
    },

    // ─── 11. REAL-WORLD CONCEPTS ─────────────────────────────────────────────
    {
      id: 52, category: "Kafka", topic: "11. Real-World Concepts",
      question: "How is Kafka used in microservices?",
      simpleAnswer: "Kafka acts as the communication backbone between microservices — services publish events to Kafka topics and other services consume those events asynchronously, keeping them fully decoupled.",
      explanation: "In a microservices architecture, services need to communicate without tight coupling. Kafka enables this: when something happens in ServiceA (order placed, payment done, user registered), it publishes an event to a Kafka topic. Any service that cares about that event subscribes to the topic and reacts independently. Services don't call each other directly — they only talk to Kafka. This means services can be deployed, scaled, and updated independently.",
      example: "E-commerce: OrderService publishes OrderPlaced → PaymentService consumes it and charges the card → publishes PaymentCompleted → InventoryService consumes it and reduces stock → publishes StockUpdated → ShippingService consumes it and creates shipment. Each service is independent, each can scale separately, none knows about the others.",
      followUps: [{ question: "What is the outbox pattern in microservices with Kafka?", answer: "Instead of writing to Kafka directly in a transaction (which can fail), write the event to an 'outbox' table in the same database transaction as your business data. A separate process reads the outbox table and publishes to Kafka. Guarantees the event is published if and only if the business transaction succeeds." }],
      keyPoints: ["Services publish events, others consume asynchronously", "Services are fully decoupled — only know about Kafka", "Each service scales independently", "Outbox pattern ensures reliable event publishing"]
    },
    {
      id: 53, category: "Kafka", topic: "11. Real-World Concepts",
      question: "When to use Kafka vs REST?",
      simpleAnswer: "Use Kafka when you need async, decoupled, high-throughput, or fan-out communication. Use REST when you need an immediate response or simple request-reply.",
      explanation: "Use Kafka when: multiple services need the same event (fan-out), the caller doesn't need an immediate response, you need message replay or audit trail, high throughput is required, or services need to be decoupled. Use REST when: you need an immediate synchronous response (e.g., check if payment succeeded), the operation is simple request-reply, you're building a public API, or the interaction is user-facing and needs real-time feedback.",
      example: "Use REST: User clicks 'Check Order Status' → needs immediate response → GET /orders/123. Use Kafka: Order is placed → trigger payment, inventory update, email, analytics all at once → publish OrderPlaced event → 4 services consume independently. REST for queries, Kafka for events.",
      followUps: [{ question: "Can you use both Kafka and REST in the same system?", answer: "Absolutely — most production systems do. REST for synchronous user-facing operations and queries. Kafka for async background processing, event propagation, and service-to-service decoupling. They complement each other." }],
      keyPoints: ["Kafka: async, fan-out, high-throughput, decoupled", "REST: sync, immediate response, request-reply", "Kafka: events and background processing", "REST: user-facing queries and real-time responses"]
    },
    {
      id: 54, category: "Kafka", topic: "11. Real-World Concepts",
      question: "What is event-driven architecture with Kafka?",
      simpleAnswer: "Event-driven architecture means services react to events published on Kafka topics instead of calling each other directly — making the system loosely coupled and highly scalable.",
      explanation: "In event-driven architecture, every significant action produces an event (OrderPlaced, PaymentFailed, UserDeleted). These events are published to Kafka. Any service interested in an event subscribes to the relevant topic. The publisher has no knowledge of subscribers. New services can be added without changing existing ones — just subscribe to the relevant topic. This makes the system extensible, resilient, and easy to scale.",
      example: "UserService publishes UserRegistered event. Today: EmailService sends welcome email. Tomorrow, you add RecommendationService — it subscribes to UserRegistered and sets up initial recommendations. UserService code is unchanged. The system grows without modifying existing services.",
      followUps: [{ question: "What is the difference between event notification and event-carried state transfer?", answer: "Event notification: the event just says something happened (OrderPlaced, id=123) — consumers must query for details. Event-carried state transfer: the event contains all the data (OrderPlaced with full order details) — consumers don't need to query back. Kafka supports both patterns." }],
      keyPoints: ["Services react to events, not direct calls", "Publisher has no knowledge of subscribers", "New services added without changing existing ones", "Highly extensible and loosely coupled"]
    },
    {
      id: 55, category: "Kafka", topic: "11. Real-World Concepts",
      question: "What is a Dead Letter Queue (DLQ) in Kafka?",
      simpleAnswer: "A Dead Letter Queue is a separate Kafka topic where messages that failed processing after all retries are sent — so they are not lost and can be investigated later.",
      explanation: "When a consumer fails to process a message (due to bad data, a bug, or a downstream service being down), it retries a few times. If all retries fail, instead of blocking the entire consumer or losing the message, the consumer publishes the failed message to a DLQ topic (e.g., 'orders-dlq'). The main consumer continues processing other messages. Engineers can later inspect the DLQ, fix the issue, and replay the failed messages.",
      example: "PaymentService consumes 'orders' topic. Message arrives with malformed JSON. Processing fails. Retries 3 times — still fails. PaymentService publishes the message to 'orders-dlq' topic with error metadata (reason, timestamp, original topic). Continues processing next message. Engineer later fixes the parser bug and replays messages from 'orders-dlq'.",
      followUps: [{ question: "How do you replay messages from a DLQ?", answer: "Write a small consumer that reads from the DLQ topic and republishes messages back to the original topic (or a fixed topic). Or use Kafka's offset reset to reprocess from a specific point after fixing the bug." }],
      keyPoints: ["Separate topic for messages that failed all retries", "Prevents one bad message from blocking the consumer", "Failed messages preserved for investigation and replay", "Include error metadata: reason, timestamp, original topic"]
    },
    {
      id: 56, category: "Kafka", topic: "11. Real-World Concepts",
      question: "How do you handle duplicate messages in Kafka?",
      simpleAnswer: "Handle duplicates by making your consumer logic idempotent — processing the same message twice produces the same result as processing it once.",
      explanation: "Duplicates happen in at-least-once delivery (consumer crashes before committing offset). Solutions: 1) Idempotent operations — use database upserts (INSERT ... ON CONFLICT DO UPDATE) instead of plain inserts. 2) Deduplication table — store processed message IDs in a table; check before processing. 3) Idempotency key — include a unique ID in the message; use it as a database unique constraint. 4) Exactly-once semantics — use Kafka transactions (complex, performance overhead).",
      example: "PaymentService receives OrderPlaced event. Before charging: check if payment for orderId=456 already exists in payments table. If yes → skip (already processed). If no → charge and insert. Even if the message is delivered 3 times, the payment is only charged once.",
      followUps: [{ question: "What is an idempotency key?", answer: "A unique identifier included in the message (like orderId or requestId) that the consumer uses to detect duplicates. Store processed keys in a database with a unique constraint. If inserting the key fails (duplicate), skip processing." }],
      keyPoints: ["Idempotent operations: same result whether processed once or twice", "Deduplication table: track processed message IDs", "Database upserts instead of plain inserts", "Exactly-once semantics for zero-tolerance scenarios"]
    },
    {
      id: 57, category: "Kafka", topic: "11. Real-World Concepts",
      question: "How do you handle retries in Kafka?",
      simpleAnswer: "Implement retry logic in the consumer — catch exceptions, retry a fixed number of times with backoff, and send to a Dead Letter Queue if all retries fail.",
      explanation: "Retry strategies: 1) In-memory retry — catch the exception and retry immediately (risky: blocks the consumer thread). 2) Retry with backoff — wait between retries (exponential backoff: 1s, 2s, 4s, 8s). 3) Retry topic — publish failed message to a 'orders-retry' topic with a delay, consume from retry topic after the delay. 4) DLQ after max retries — after N retries, send to DLQ. Spring Kafka's SeekToCurrentErrorHandler and RetryableTopic annotation automate much of this.",
      example: "Consumer fails to process message (downstream DB is down). Retry 1 after 1s — fails. Retry 2 after 2s — fails. Retry 3 after 4s — succeeds. If all 3 retries fail → publish to 'orders-dlq'. Main consumer continues with next message. DB recovers → engineer replays DLQ.",
      followUps: [{ question: "What is Spring Kafka's @RetryableTopic?", answer: "@RetryableTopic automatically creates retry topics and a DLQ topic. Failed messages are routed to retry-1, retry-2, etc. topics with configurable delays. After max retries, they go to the DLQ. No manual retry logic needed." }],
      keyPoints: ["Retry with exponential backoff to avoid overwhelming downstream", "Retry topics for delayed retries without blocking main consumer", "DLQ after max retries — never lose messages", "Spring Kafka @RetryableTopic automates retry infrastructure"]
    },

    // ─── 12. ERROR HANDLING & RELIABILITY ───────────────────────────────────
    {
      id: 58, category: "Kafka", topic: "12. Error Handling & Reliability",
      question: "What happens if message processing fails?",
      simpleAnswer: "The consumer catches the exception, retries based on retry policy, and if all retries fail, sends the message to a Dead Letter Queue — the consumer then moves on to the next message.",
      explanation: "Without proper error handling, a single bad message can block the entire consumer forever (poison pill). Proper handling: wrap processing in try-catch, implement retry logic, and route unprocessable messages to a DLQ. The key principle: never let one bad message stop the consumer from processing other messages. Log the error with full context (topic, partition, offset, message content) for debugging.",
      example: "Consumer reads message at offset 50. Processing throws NullPointerException. Retry 3 times — same error. Publish to DLQ with metadata: {originalTopic: 'orders', partition: 2, offset: 50, error: 'NullPointerException', timestamp: '...'}. Commit offset 51. Continue processing offset 51 normally.",
      followUps: [{ question: "What is a poison pill message?", answer: "A message that consistently causes the consumer to fail — like malformed JSON, unexpected null fields, or data that triggers a bug. Without a DLQ, a poison pill blocks the consumer indefinitely. Always handle with DLQ or skip-and-log strategy." }],
      keyPoints: ["Never let one bad message block the consumer", "Try-catch → retry → DLQ pattern", "Log full context for debugging", "Commit offset after DLQ routing to move forward"]
    },
    {
      id: 59, category: "Kafka", topic: "12. Error Handling & Reliability",
      question: "What is retry strategy in Kafka?",
      simpleAnswer: "A retry strategy defines how many times and how often a failed message is retried before giving up — typically using exponential backoff to avoid overwhelming a struggling downstream system.",
      explanation: "Common strategies: 1) Fixed delay — retry every N seconds. Simple but can overwhelm a recovering system. 2) Exponential backoff — double the wait time each retry (1s, 2s, 4s, 8s). Gives the downstream system time to recover. 3) Exponential backoff with jitter — add randomness to prevent all consumers retrying at the same time (thundering herd). 4) Max retries — after N attempts, give up and send to DLQ. Producer-side retries (retries config) handle transient broker issues. Consumer-side retries handle processing failures.",
      example: "PaymentService can't reach the payment gateway. Retry strategy: max 5 retries, exponential backoff with jitter. Attempt 1: wait 1s. Attempt 2: wait 2s+random. Attempt 3: wait 4s+random. Attempt 4: wait 8s+random. Attempt 5: wait 16s+random. All fail → DLQ. Gateway recovers → engineer replays DLQ.",
      followUps: [{ question: "What is the difference between producer retries and consumer retries?", answer: "Producer retries (retries config) handle transient network/broker errors when sending messages — automatic, built into the producer. Consumer retries handle failures in your processing logic — you implement these in your consumer code or use Spring Kafka's retry infrastructure." }],
      keyPoints: ["Exponential backoff prevents overwhelming recovering systems", "Add jitter to prevent thundering herd", "Max retries + DLQ for unrecoverable failures", "Producer retries for broker errors, consumer retries for processing errors"]
    },
    {
      id: 60, category: "Kafka", topic: "12. Error Handling & Reliability",
      question: "What is an idempotent producer in Kafka?",
      simpleAnswer: "An idempotent producer ensures that even if a message is sent multiple times due to retries, it is written to Kafka exactly once — no duplicates.",
      explanation: "When a producer sends a message and doesn't receive an acknowledgment (due to network timeout), it retries. Without idempotence, this creates duplicate messages in Kafka. With idempotent producer (enable.idempotence=true), each producer gets a unique Producer ID (PID) and each message gets a sequence number. The broker tracks the last sequence number per producer per partition. If a duplicate arrives (same PID + sequence), the broker silently discards it. This gives exactly-once at the producer level.",
      example: "Producer sends message with PID=5, sequence=100. Network times out. Producer retries — sends PID=5, sequence=100 again. Broker sees it already has sequence=100 for PID=5 → discards the duplicate. Producer receives acknowledgment. Message written exactly once in Kafka.",
      followUps: [{ question: "Does enabling idempotence affect performance?", answer: "Minimal impact. It automatically sets acks=all and retries=MAX_INT. Slight overhead from sequence number tracking. The safety benefit far outweighs the negligible performance cost. Always enable in production." }],
      keyPoints: ["enable.idempotence=true on producer", "Each message gets PID + sequence number", "Broker discards duplicates with same PID+sequence", "Prevents duplicate writes from producer retries"]
    },

    // ─── 12. ERROR HANDLING (continued) ─────────────────────────────────────
    {
      id: 61, category: "Kafka", topic: "12. Error Handling & Reliability",
      question: "What is a transactional producer in Kafka?",
      simpleAnswer: "A transactional producer can write to multiple topics/partitions atomically — either all writes succeed together or all are rolled back, with no partial results visible to consumers.",
      explanation: "Transactional producers extend idempotent producers. You assign a unique transactional.id. The producer calls beginTransaction(), sends messages to multiple topics/partitions, then either commitTransaction() or abortTransaction(). Consumers with isolation.level=read_committed only see messages from committed transactions — they never see partial or aborted writes. This is the foundation of exactly-once stream processing in Kafka.",
      example: "Stream processor reads from 'orders', transforms, writes to 'processed-orders', and commits offset — all in one transaction. beginTransaction() → read from 'orders' → write to 'processed-orders' → sendOffsetsToTransaction() → commitTransaction(). If it crashes mid-way, the transaction aborts. Downstream consumers never see the partial write.",
      followUps: [{ question: "What is the difference between idempotent and transactional producer?", answer: "Idempotent producer prevents duplicates for a single topic/partition. Transactional producer provides atomicity across multiple topics/partitions — all-or-nothing writes. Transactional implies idempotent." }],
      keyPoints: ["Atomic writes across multiple topics/partitions", "beginTransaction() → send → commitTransaction() or abortTransaction()", "Consumers with read_committed skip aborted transactions", "Foundation of exactly-once stream processing"]
    },

    // ─── 13. ADVANCED CONCEPTS ───────────────────────────────────────────────
    {
      id: 62, category: "Kafka", topic: "13. Advanced Concepts",
      question: "What is Kafka Streams?",
      simpleAnswer: "Kafka Streams is a Java library for building real-time stream processing applications that read from Kafka topics, transform the data, and write results back to Kafka topics.",
      explanation: "Kafka Streams runs inside your application — no separate cluster needed. It provides high-level DSL operations: filter, map, groupBy, aggregate, join, windowing. It handles state management (using RocksDB locally), fault tolerance (state backed up to Kafka changelog topics), and exactly-once processing. It's simpler than Spark or Flink for Kafka-native stream processing.",
      example: "Real-time order analytics: KStream<String, Order> orders = builder.stream('orders'); orders.filter((k,v) -> v.getAmount() > 1000).groupByKey().count().toStream().to('high-value-orders'). This reads all orders, filters high-value ones, counts per key, writes results to a new topic — all in real time.",
      followUps: [{ question: "What is the difference between Kafka Streams and Kafka Consumer?", answer: "A plain Kafka Consumer just reads messages — you write all processing logic manually. Kafka Streams provides a rich DSL for transformations, aggregations, joins, and windowing with built-in state management and fault tolerance. Use Streams for complex processing, plain Consumer for simple reads." }],
      keyPoints: ["Java library — runs inside your app, no separate cluster", "High-level DSL: filter, map, aggregate, join, window", "State stored in RocksDB, backed up to Kafka", "Supports exactly-once processing natively"]
    },
    {
      id: 63, category: "Kafka", topic: "13. Advanced Concepts",
      question: "What is KSQL?",
      simpleAnswer: "KSQL (now called ksqlDB) lets you query and process Kafka streams using SQL-like syntax — no Java code needed.",
      explanation: "ksqlDB is a streaming database built on Kafka Streams. You write SQL queries against Kafka topics as if they were database tables. It supports push queries (continuous, real-time results) and pull queries (point-in-time snapshot). Great for teams who know SQL but not Java. Runs as a separate server cluster. Under the hood, it compiles SQL into Kafka Streams applications.",
      example: "CREATE STREAM orders AS SELECT * FROM orders_topic; CREATE TABLE order_counts AS SELECT userId, COUNT(*) FROM orders GROUP BY userId EMIT CHANGES; — this continuously counts orders per user in real time, updating as new orders arrive. No Java code written.",
      followUps: [{ question: "When would you use ksqlDB vs Kafka Streams?", answer: "ksqlDB for quick prototyping, SQL-familiar teams, and simpler transformations. Kafka Streams for complex custom logic, fine-grained control, embedding processing in your Java application, or when you need features not expressible in SQL." }],
      keyPoints: ["SQL interface for Kafka stream processing", "Push queries: continuous real-time results", "Pull queries: point-in-time snapshot", "Compiles SQL to Kafka Streams under the hood"]
    },
    {
      id: 64, category: "Kafka", topic: "13. Advanced Concepts",
      question: "What is Schema Registry?",
      simpleAnswer: "Schema Registry is a service that stores and enforces the schema (structure) of Kafka messages — ensuring producers and consumers agree on the message format.",
      explanation: "Without Schema Registry, a producer can change the message format and break all consumers silently. Schema Registry stores schemas (Avro, Protobuf, JSON Schema) centrally. Producers register their schema before sending. Consumers fetch the schema to deserialize. Schema Registry enforces compatibility rules (backward, forward, full) — it rejects schema changes that would break existing consumers. The schema ID is embedded in each message (just 5 bytes) instead of the full schema.",
      example: "Producer registers schema: {name: string, amount: double, orderId: string}. Sends messages with schema ID=5. Consumer fetches schema ID=5 from registry, deserializes correctly. Producer tries to remove 'amount' field — Schema Registry rejects it (backward incompatible). Consumers are protected from breaking changes.",
      followUps: [{ question: "What is backward compatibility in Schema Registry?", answer: "Backward compatible: new schema can read data written with old schema. Example: adding an optional field is backward compatible — old consumers can still read new messages (they just ignore the new field). Removing a required field is NOT backward compatible." }],
      keyPoints: ["Central store for message schemas", "Enforces schema compatibility rules", "Prevents breaking changes from reaching consumers", "Schema ID embedded in message — not full schema"]
    },
    {
      id: 65, category: "Kafka", topic: "13. Advanced Concepts",
      question: "What is Avro vs JSON in Kafka?",
      simpleAnswer: "Avro is a compact binary serialization format with schema enforcement — much smaller and faster than JSON. JSON is human-readable text but larger and slower.",
      explanation: "JSON: human-readable, no schema enforcement, large payload size, slow to parse. Avro: binary format, schema required (stored in Schema Registry), 5-10x smaller than JSON, faster serialization/deserialization. Avro with Schema Registry is the standard for high-throughput production Kafka. Protobuf is another binary option — even more compact than Avro. Use JSON for development/debugging, Avro/Protobuf for production.",
      example: "Order event as JSON: '{\"orderId\":\"123\",\"userId\":\"456\",\"amount\":99.99}' = 45 bytes. Same event as Avro: ~12 bytes (binary, field names not repeated in each message — stored once in schema). At 1 million messages/second: JSON = 45MB/s, Avro = 12MB/s. Avro saves 73% bandwidth.",
      followUps: [{ question: "What is the main downside of Avro?", answer: "Not human-readable — you can't just look at a Kafka message and understand it. Requires Schema Registry to deserialize. Adds operational complexity. For debugging, use Kafka tools that integrate with Schema Registry to decode Avro messages." }],
      keyPoints: ["Avro: binary, compact, schema-enforced, fast", "JSON: text, human-readable, large, slow", "Avro 5-10x smaller than JSON", "Use Avro + Schema Registry for production, JSON for dev/debug"]
    },

    // ─── 14. DEVOPS / PRODUCTION ─────────────────────────────────────────────
    {
      id: 66, category: "Kafka", topic: "14. DevOps & Production",
      question: "How do you monitor Kafka?",
      simpleAnswer: "Monitor Kafka using JMX metrics exposed by brokers, combined with tools like Prometheus + Grafana, Confluent Control Center, or Datadog.",
      explanation: "Kafka exposes hundreds of metrics via JMX (Java Management Extensions). Key areas to monitor: broker health (under-replicated partitions, offline partitions), producer metrics (send rate, error rate, latency), consumer metrics (consumer lag, fetch rate), and topic metrics (bytes in/out, message rate). Use JMX Exporter to scrape metrics into Prometheus, then visualize in Grafana. Set alerts on consumer lag and under-replicated partitions.",
      example: "Grafana dashboard shows: consumer lag for 'payment-service' group spiking from 0 to 50,000 messages. Alert fires. Engineer investigates: PaymentService is slow due to a database bottleneck. Fix: add database index → lag drops back to 0 within minutes.",
      followUps: [{ question: "What is Confluent Control Center?", answer: "A commercial web UI from Confluent (Kafka's creators) for monitoring and managing Kafka clusters. Shows topics, consumer groups, lag, throughput, and schema registry. Easier than raw Prometheus/Grafana but requires Confluent Platform license." }],
      keyPoints: ["JMX metrics exposed by brokers", "Prometheus + Grafana for metrics collection and visualization", "Alert on consumer lag and under-replicated partitions", "Confluent Control Center for managed monitoring"]
    },
    {
      id: 67, category: "Kafka", topic: "14. DevOps & Production",
      question: "What metrics are important in Kafka?",
      simpleAnswer: "The most critical metrics are consumer lag, under-replicated partitions, broker disk usage, producer error rate, and request latency.",
      explanation: "Top metrics to watch: 1) Consumer lag — how far behind consumers are. Growing lag = consumers can't keep up. 2) Under-replicated partitions — partitions with fewer replicas than configured. Indicates broker issues. 3) Offline partitions — partitions with no leader. Critical alert. 4) Disk usage per broker — Kafka stores everything on disk. 5) Producer request rate and error rate. 6) Broker CPU and network I/O. 7) Request latency (produce and fetch). 8) Active controller count — should always be exactly 1.",
      example: "Alert rules: consumer_lag > 10000 → warning. under_replicated_partitions > 0 → critical. offline_partitions > 0 → page on-call immediately. broker_disk_usage > 80% → warning. active_controller_count != 1 → critical.",
      followUps: [{ question: "What does it mean if active_controller_count is 0 or 2?", answer: "0 means no controller — the cluster cannot perform leader elections or handle broker failures. 2 means split-brain — two brokers think they are the controller, which causes inconsistency. Both are critical alerts requiring immediate investigation." }],
      keyPoints: ["Consumer lag: most important consumer metric", "Under-replicated partitions: broker health indicator", "Offline partitions: critical — immediate action needed", "Active controller count must always be exactly 1"]
    },
    {
      id: 68, category: "Kafka", topic: "14. DevOps & Production",
      question: "How do you handle consumer lag?",
      simpleAnswer: "Reduce consumer lag by adding more consumers (up to partition count), optimizing processing logic, increasing batch size, or scaling the downstream system the consumer depends on.",
      explanation: "Consumer lag = messages produced - messages consumed. Growing lag means consumers are slower than producers. Solutions: 1) Add more consumer instances to the group (up to partition count for parallelism). 2) Optimize consumer processing — reduce DB calls, use batch inserts, cache lookups. 3) Increase fetch.max.bytes and max.poll.records to process larger batches per poll. 4) Scale downstream dependencies (DB, external APIs). 5) If lag is temporary (traffic spike), it will self-resolve when traffic normalizes.",
      example: "Black Friday: order rate spikes 10x. Consumer lag grows to 500,000. Action: scale PaymentService from 6 to 12 instances (topic has 12 partitions). Each instance now handles 1 partition. Processing rate doubles. Lag drains within 30 minutes.",
      followUps: [{ question: "What is the difference between consumer lag and latency?", answer: "Consumer lag is the number of unprocessed messages (a count). Latency is the time delay between a message being produced and consumed (time). High lag causes high latency. You can have low lag with high latency if processing each message is slow." }],
      keyPoints: ["Add consumers up to partition count for more parallelism", "Optimize processing: batch DB writes, cache lookups", "Tune max.poll.records for larger batches", "Monitor lag trend — growing lag needs immediate action"]
    },
    {
      id: 69, category: "Kafka", topic: "14. DevOps & Production",
      question: "What is consumer lag?",
      simpleAnswer: "Consumer lag is the difference between the latest message offset in a partition and the consumer's current committed offset — it tells you how many messages the consumer is behind.",
      explanation: "Lag = latest offset (log end offset) - consumer committed offset. Lag of 0 means the consumer is fully caught up. Lag of 10,000 means there are 10,000 unprocessed messages waiting. Lag is measured per partition and summed across all partitions for a consumer group. It's the single most important metric for consumer health. Persistent lag means your consumer can't keep up with the producer rate.",
      example: "Topic 'orders', partition 0: log end offset = 5000. PaymentService committed offset = 4800. Lag = 200. Partition 1: log end offset = 4900, committed = 4900. Lag = 0. Total group lag = 200. PaymentService is slightly behind on partition 0 but caught up on partition 1.",
      followUps: [{ question: "How do you check consumer lag from the command line?", answer: "kafka-consumer-groups.sh --bootstrap-server localhost:9092 --describe --group payment-service. Shows each partition's current offset, log end offset, and lag. Also available via Kafka AdminClient API programmatically." }],
      keyPoints: ["Lag = log end offset - consumer committed offset", "Lag of 0 = fully caught up", "Measured per partition, summed for group total", "Most important consumer health metric"]
    },
    {
      id: 70, category: "Kafka", topic: "14. DevOps & Production",
      question: "How do you debug Kafka issues in production?",
      simpleAnswer: "Check consumer lag, broker logs, under-replicated partitions, and use distributed tracing with correlation IDs to trace a message's journey through the system.",
      explanation: "Debugging steps: 1) Check consumer lag — is it growing? 2) Check broker logs for errors (OutOfMemoryError, disk full, network issues). 3) Check under-replicated partitions — broker health issue. 4) Use kafka-consumer-groups.sh to see exact offsets and lag per partition. 5) Use kafka-console-consumer.sh to manually read messages from a topic and inspect content. 6) Check producer error metrics — are messages failing to send? 7) Add correlation IDs to messages to trace them through multiple services.",
      example: "Alert: PaymentService lag growing. Steps: 1) kafka-consumer-groups.sh → lag is 50,000 on partition 2 only. 2) Check PaymentService logs → NullPointerException on specific message format. 3) kafka-console-consumer.sh --partition 2 --offset 49000 → find the bad message. 4) Fix the bug, deploy, replay from DLQ.",
      followUps: [{ question: "What is kafka-console-consumer and when do you use it?", answer: "A command-line tool to read messages from a Kafka topic directly. Use it to inspect message content, verify a topic has data, or debug consumer issues. kafka-console-consumer.sh --bootstrap-server localhost:9092 --topic orders --from-beginning." }],
      keyPoints: ["Check consumer lag first — growing lag is the main signal", "kafka-consumer-groups.sh for offset and lag details", "kafka-console-consumer.sh to inspect message content", "Correlation IDs to trace messages across services"]
    },

    // ─── 15. TRICKY INTERVIEW QUESTIONS ─────────────────────────────────────
    {
      id: 71, category: "Kafka", topic: "15. Tricky Interview Questions",
      question: "Can multiple consumers read the same message in Kafka?",
      simpleAnswer: "Yes — but only if they belong to different consumer groups. Within the same consumer group, each message is processed by exactly one consumer.",
      explanation: "This is one of Kafka's most powerful features. Consumer groups are independent — each group maintains its own offsets. So if you have 3 consumer groups subscribed to the same topic, each group gets every message. Within a single group, partitions are divided among consumers so no two consumers in the same group read the same partition. This enables fan-out: one event processed by payment, inventory, and notification services simultaneously.",
      example: "Topic 'orders' has 3 messages. Group 'payment-service': Consumer A reads all 3. Group 'inventory-service': Consumer B reads all 3. Group 'notification-service': Consumer C reads all 3. All three groups get the same messages independently. Within 'payment-service' group with 2 consumers: Consumer A reads messages 1,3 and Consumer B reads message 2 — no overlap.",
      followUps: [{ question: "How does Kafka know which messages each group has read?", answer: "Each consumer group commits its own offsets to the __consumer_offsets topic independently. Group A's offset for partition 0 is tracked separately from Group B's offset for the same partition. They never interfere with each other." }],
      keyPoints: ["Different groups: each gets all messages independently", "Same group: each message goes to exactly one consumer", "Enables fan-out to multiple services", "Each group tracks its own offsets independently"]
    },
    {
      id: 72, category: "Kafka", topic: "15. Tricky Interview Questions",
      question: "Can ordering be guaranteed across topics?",
      simpleAnswer: "No — Kafka only guarantees ordering within a single partition. There is no ordering guarantee across different topics or even across partitions of the same topic.",
      explanation: "Topics are completely independent in Kafka. There is no global sequence number or timestamp ordering across topics. Even within one topic, ordering is only guaranteed per partition. If you need cross-topic ordering, you must implement it at the application level — include a global sequence number or timestamp in your messages and sort on the consumer side. This adds significant complexity and is rarely needed in practice.",
      example: "OrderService publishes to 'orders' topic (offset 5) and 'audit-log' topic (offset 3) at the same time. A consumer reading both topics has no guarantee which message it sees first. The 'orders' message might arrive before or after the 'audit-log' message depending on network and broker timing.",
      followUps: [{ question: "How do you handle cross-topic ordering if you absolutely need it?", answer: "Include a global sequence number or event timestamp in every message. On the consumer side, buffer messages from all topics and sort by sequence number before processing. This adds latency and complexity — avoid if possible by redesigning to not need cross-topic ordering." }],
      keyPoints: ["No ordering guarantee across topics", "No ordering guarantee across partitions", "Ordering only within a single partition", "Application-level sequencing needed for cross-topic order"]
    },
    {
      id: 73, category: "Kafka", topic: "15. Tricky Interview Questions",
      question: "What happens if partition count changes?",
      simpleAnswer: "Increasing partitions breaks key-based ordering for existing keys — the same key may now hash to a different partition than before.",
      explanation: "Partition assignment uses hash(key) % numPartitions. If numPartitions changes, the same key hashes to a different partition. Messages for that key are now split across two partitions — old messages in the original partition, new messages in the new partition. A consumer reading both partitions will see them out of order. You cannot decrease partition count. Increasing partitions also triggers a consumer group rebalance.",
      example: "Key='user-123', 4 partitions: hash % 4 = 2 → all messages in P2. Increase to 6 partitions: hash % 6 = 3 → new messages go to P3. Old messages for user-123 are in P2, new ones in P3. Consumer reading P2 and P3 sees them interleaved — ordering broken for user-123.",
      followUps: [{ question: "How do you safely increase partitions without breaking ordering?", answer: "Plan partition count upfront. If you must increase: create a new topic with more partitions, migrate consumers to the new topic, and use a migration period where both topics are consumed. Or accept that ordering is broken for existing keys during the transition." }],
      keyPoints: ["Increasing partitions breaks key-based ordering", "Same key may hash to different partition after change", "Cannot decrease partition count", "Plan partition count carefully upfront — hard to change later"]
    },
    {
      id: 74, category: "Kafka", topic: "15. Tricky Interview Questions",
      question: "Why is consumer group important?",
      simpleAnswer: "Consumer groups enable parallel processing of a topic and allow multiple independent applications to each consume the full event stream — making Kafka both scalable and versatile.",
      explanation: "Without consumer groups, you'd have to choose: either one consumer processes everything (slow) or multiple consumers share the load but each misses some messages. Consumer groups solve both problems: within a group, partitions are divided for parallel processing (scalability). Across groups, each group gets all messages (fan-out). This dual capability is what makes Kafka suitable for both high-throughput processing and event-driven architectures simultaneously.",
      example: "Without groups: 1 consumer reads 1M messages/hour — too slow. With groups: 20 consumers in 'payment-group' each read 50K messages/hour = 1M/hour total. Simultaneously, 'analytics-group' with 10 consumers also reads all 1M messages for reporting. Both use cases served by the same Kafka topic.",
      followUps: [{ question: "What is the group coordinator?", answer: "A broker designated to manage a specific consumer group. It handles consumer registration, heartbeat tracking, rebalance triggering, and offset commits for the group. Each group has one coordinator broker, determined by hash(groupId) % numPartitions of __consumer_offsets." }],
      keyPoints: ["Enables parallel processing within a group", "Enables independent fan-out across groups", "Foundation of Kafka's scalability model", "Group coordinator manages membership and rebalances"]
    },
    {
      id: 75, category: "Kafka", topic: "15. Tricky Interview Questions",
      question: "Can Kafka lose data?",
      simpleAnswer: "Yes, but only with improper configuration. With the right settings (acks=all, replication factor ≥ 3, unclean leader election disabled), data loss is extremely unlikely.",
      explanation: "Scenarios where Kafka can lose data: 1) acks=0 or acks=1 — producer doesn't wait for full replication, broker crashes before replication completes. 2) Replication factor=1 — single copy, broker disk fails. 3) unclean.leader.election=true — out-of-sync replica elected as leader, missing recent messages. 4) Retention period expires — messages deleted after configured time. 5) Log compaction — older messages for a key are deleted. Production best practices: acks=all, RF=3, unclean.leader.election=false, min.insync.replicas=2.",
      example: "Safe config: producer acks=all, topic replication.factor=3, min.insync.replicas=2, unclean.leader.election.enable=false. This means: message only acknowledged after written to at least 2 in-sync replicas. Even if 1 broker fails, 2 copies exist. Unclean election disabled — no stale replica can become leader. Data loss probability: near zero.",
      followUps: [{ question: "What is min.insync.replicas?", answer: "min.insync.replicas=N means the producer's acks=all write only succeeds if at least N replicas are in sync. If fewer than N replicas are available, the producer gets a NotEnoughReplicasException. Set to 2 with RF=3 for strong durability — tolerates 1 broker failure while preventing data loss." }],
      keyPoints: ["acks=0/1 + broker crash = potential data loss", "RF=1 + disk failure = data loss", "unclean.leader.election=true = potential data loss", "Safe: acks=all + RF=3 + min.insync.replicas=2 + unclean election disabled"]
    }
  ]
};

