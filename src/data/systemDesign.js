export const systemDesign = {
  categories: ["System Design", "LLD", "Design Patterns", "SOLID", "Scalability"],
  questions: [

    // ─── 1. HLD – SYSTEM DESIGN ──────────────────────────────────────────────
    {
      id: 1,
      category: "System Design", difficulty: 2,
      topic: "1. HLD – Core Design",
      question: "Design a URL Shortener (like bit.ly)",
      simpleAnswer: "A URL shortener maps a long URL to a short unique code. When the short URL is hit, it redirects to the original long URL.",
      explanation: "Core components: 1) API to accept long URL and return short code. 2) A hash/encode function (Base62 on auto-increment ID) to generate unique short codes. 3) A database to store short→long mapping. 4) A redirect service that looks up the short code and returns HTTP 301/302. For scale: use Redis cache for hot URLs, a distributed ID generator (Snowflake), and a CDN for redirect latency.",
      analogy: "A URL shortener is like a coat check at a restaurant. You hand in your bulky coat (long URL) and get a small numbered ticket (short code). Anyone who shows the ticket gets the coat back. The ticket is meaningless on its own — its value is entirely in the lookup table that maps ticket numbers to coats.",
      example: "User submits https://very-long-url.com/path → system generates ID 10001 → Base62 encode → 'abc1' → stores in DB. User hits bit.ly/abc1 → Redis cache hit → 302 redirect to original URL.",
      followUps: [
        { question: "How do you scale to millions of redirects per second?", answer: "Cache hot URLs in Redis (most URLs are accessed frequently after creation). Use CDN edge nodes for redirect. Shard the DB by short code prefix. Read replicas for the lookup DB." },
        { question: "How do you handle custom aliases?", answer: "Allow users to specify a custom short code. Check uniqueness in DB before saving. Store in same table with a flag for custom vs auto-generated." }
      ],
      keyPoints: ["Base62 encoding on auto-increment ID", "Redis cache for hot URLs", "HTTP 302 for redirect (trackable)", "Distributed ID generator for uniqueness at scale"]
    },
    {
      id: 2,
      category: "System Design", difficulty: 2,
      topic: "1. HLD – Core Design",
      question: "Design a Notification System (email, SMS, push)",
      simpleAnswer: "A notification system receives notification requests from various services and reliably delivers them via email, SMS, or push — asynchronously and at scale.",
      explanation: "Components: 1) Notification API — accepts requests from other services. 2) Kafka topic per channel (email-notifications, sms-notifications, push-notifications). 3) Channel workers that consume from Kafka and call third-party providers (SendGrid for email, Twilio for SMS, FCM for push). 4) Retry logic with DLQ for failed deliveries. 5) User preference service — respects opt-outs and quiet hours.",
      analogy: "A notification system is like a post office with specialized delivery departments. When a letter arrives (notification request), it's sorted into the right department — email, SMS, or push. Each department has its own delivery staff and handles failures independently. If the email department is backed up, the SMS department keeps running normally.",
      example: "OrderService publishes OrderPlaced event → Notification API receives it → publishes to 'email-notifications' Kafka topic → Email Worker consumes → calls SendGrid API → email delivered. If SendGrid fails, message goes to DLQ for retry.",
      followUps: [
        { question: "How do you handle failures in third-party providers?", answer: "Retry with exponential backoff. After max retries, move to DLQ. Have fallback providers (e.g., if SendGrid fails, try Mailgun). Alert on DLQ size." },
        { question: "How do you prevent duplicate notifications?", answer: "Use idempotency keys — store notification ID in DB before sending. If same ID comes again, skip. Use exactly-once semantics in Kafka where possible." }
      ],
      keyPoints: ["Kafka per channel for async delivery", "Third-party providers: SendGrid, Twilio, FCM", "DLQ for failed notifications", "User preference service for opt-outs"]
    },
    {
      id: 3,
      category: "System Design", difficulty: 2,
      topic: "1. HLD – Core Design",
      question: "Design a Rate Limiter",
      simpleAnswer: "A rate limiter controls how many requests a client can make in a given time window — protecting backend services from abuse and overload.",
      explanation: "Algorithms: 1) Token Bucket — bucket refills at fixed rate, each request consumes a token. Allows bursts. 2) Fixed Window Counter — count requests per time window (e.g., 100/min). Simple but has edge-case spikes at window boundaries. 3) Sliding Window Log — track timestamps of each request, more accurate. Implementation: store counters in Redis (atomic INCR + EXPIRE). For distributed systems, use Redis cluster so all API gateway nodes share the same counter.",
      analogy: "A rate limiter is like a turnstile at a subway station that only lets 100 people through per minute. The 101st person gets a 'please wait' message. The counter resets every minute. Using Redis for the counter means every turnstile (API gateway node) shares the same count — so the limit applies globally, not per machine.",
      example: "User makes 100 requests in 1 minute — allowed. 101st request → Redis counter = 101 > limit → return HTTP 429 Too Many Requests with Retry-After header. Counter resets after 60 seconds.",
      followUps: [
        { question: "How do you rate limit per user vs per IP?", answer: "Use different Redis keys: 'rate:user:{userId}' for authenticated users, 'rate:ip:{ipAddress}' for unauthenticated. Apply stricter limits to IPs to prevent abuse." },
        { question: "Where do you place the rate limiter?", answer: "At the API Gateway level — before requests reach microservices. This centralizes the logic and protects all downstream services uniformly." }
      ],
      keyPoints: ["Token Bucket allows bursts, Fixed Window is simple", "Redis for distributed counter storage", "HTTP 429 with Retry-After on limit exceeded", "Place at API Gateway for centralized control"]
    },
    {
      id: 4,
      category: "System Design", difficulty: 2,
      topic: "1. HLD – Core Design",
      question: "Design a Food Delivery System (like Zomato/Swiggy)",
      simpleAnswer: "A food delivery system connects customers, restaurants, and delivery partners — handling order placement, real-time tracking, and payment.",
      explanation: "Key services: 1) UserService — customer profiles. 2) RestaurantService — menus, availability. 3) OrderService — order lifecycle. 4) PaymentService — payment processing. 5) DeliveryService — assign delivery partner, track location. 6) NotificationService — order updates. Real-time tracking uses WebSockets or SSE. Location data stored in Redis (fast reads). Kafka for async events between services (OrderPlaced → assign delivery partner → notify customer).",
      analogy: "A food delivery system is like a restaurant with a dispatch center. The customer places an order (OrderService), the cashier charges the card (PaymentService), the dispatch center finds the nearest available driver using a map (Redis geospatial), and the customer watches the driver's dot move on a live map (WebSocket). Kafka is the internal radio system that keeps all departments in sync without them calling each other directly.",
      example: "Customer places order → OrderService creates order → PaymentService charges card → Kafka event triggers DeliveryService to assign nearest partner → partner location tracked via Redis → customer sees live map via WebSocket.",
      followUps: [
        { question: "How do you assign the nearest delivery partner?", answer: "Store partner locations in Redis with geospatial index (GEOADD/GEORADIUS). When order is placed, query nearest available partner within radius. Use a matching algorithm considering distance and current load." },
        { question: "How do you handle order cancellations?", answer: "Saga pattern with compensating transactions: cancel payment (refund), release delivery partner, update restaurant, notify customer. Each step is a separate event in Kafka." }
      ],
      keyPoints: ["WebSockets for real-time delivery tracking", "Redis geospatial for nearest partner lookup", "Kafka for async order lifecycle events", "Saga pattern for cancellation rollback"]
    },
    {
      id: 5,
      category: "System Design", difficulty: 2,
      topic: "1. HLD – Core Design",
      question: "Design a Ride Booking System (like Uber)",
      simpleAnswer: "A ride booking system matches riders with nearby drivers in real time, handles pricing, trip tracking, and payment.",
      explanation: "Key components: 1) Location Service — drivers continuously send GPS updates (stored in Redis geospatial). 2) Matching Service — when rider requests, find nearest available drivers. 3) Trip Service — manages trip lifecycle (requested → accepted → in-progress → completed). 4) Pricing Service — surge pricing based on supply/demand ratio. 5) Payment Service — charge after trip. 6) Notification Service — push notifications to driver and rider. WebSockets for real-time location updates.",
      analogy: "A ride booking system is like a taxi dispatch center with a live map. Drivers constantly radio their GPS position (Redis geospatial updates). When a rider calls in, the dispatcher checks the map for the nearest available driver and connects them. The fare meter (pricing service) adjusts based on how many taxis are available versus how many people are calling — that's surge pricing.",
      example: "Rider requests ride → Matching Service queries Redis for drivers within 2km → sends request to top 3 drivers → first to accept gets the trip → WebSocket streams driver location to rider app → trip completes → Payment Service charges saved card.",
      followUps: [
        { question: "How do you implement surge pricing?", answer: "Monitor supply (available drivers) vs demand (ride requests) per geographic zone in real time. If demand/supply ratio > threshold, apply multiplier. Store zone pricing in Redis for fast reads." },
        { question: "How do you handle driver going offline mid-trip?", answer: "Keep last known location in Redis with TTL. If driver stops sending updates, use last location. Notify rider of connectivity issue. If trip is abandoned, trigger support flow and refund." }
      ],
      keyPoints: ["Redis geospatial for real-time driver locations", "WebSockets for live location streaming", "Surge pricing based on supply/demand ratio", "Matching service with timeout and fallback"]
    },

    // ─── BATCH 2: Q6–10 ──────────────────────────────────────────────────────
    {
      id: 6,
      category: "System Design", difficulty: 2,
      topic: "1. HLD – Core Design",
      question: "Design a Chat System (like WhatsApp)",
      simpleAnswer: "A chat system allows users to send and receive messages in real time, with support for one-on-one and group chats, message persistence, and delivery receipts.",
      explanation: "Key components: 1) WebSocket servers — persistent connections for real-time messaging. 2) Message Service — stores messages in DB (Cassandra for scale). 3) Presence Service — tracks online/offline status in Redis. 4) Notification Service — push notifications for offline users. 5) Media Service — upload images/videos to S3, store URL in message. For group chats, fan-out the message to all group members. Use Kafka to decouple message delivery from storage.",
      analogy: "A chat system is like a telephone exchange. WebSocket servers are the phone lines — persistent connections between users and the exchange. Cassandra is the voicemail system that stores every message durably. The Presence Service is the 'busy light' on each phone — it tells you if someone is available. If someone's phone is off (offline), the exchange leaves a push notification instead of ringing.",
      example: "User A sends message to User B → WebSocket server receives → stores in Cassandra → checks Presence Service: User B is online → delivers via WebSocket. If offline → push notification via FCM. Delivery receipt sent back to User A when B receives.",
      followUps: [
        { question: "How do you handle message ordering in group chats?", answer: "Assign a sequence number per conversation using a distributed counter (Redis INCR). Clients sort messages by sequence number. Kafka partition per conversation guarantees ordering within a chat." },
        { question: "How do you scale WebSocket connections to millions of users?", answer: "Use a WebSocket server cluster behind a load balancer with sticky sessions. Use Redis Pub/Sub so any server can deliver a message to a user connected to a different server." }
      ],
      keyPoints: ["WebSockets for real-time delivery", "Cassandra for message storage at scale", "Redis for presence (online/offline)", "Push notifications for offline users"]
    },
    {
      id: 7,
      category: "System Design", difficulty: 2,
      topic: "1. HLD – Core Design",
      question: "Design a Log Aggregation System",
      simpleAnswer: "A log aggregation system collects logs from many services, centralizes them, and makes them searchable — enabling monitoring and debugging at scale.",
      explanation: "Components: 1) Log Shippers — agents on each service (Filebeat, Fluentd) that tail log files and forward to Kafka. 2) Kafka — buffers log streams, decouples producers from consumers. 3) Log Processors — consume from Kafka, parse/enrich logs (Logstash). 4) Storage — Elasticsearch for full-text search, S3 for cold archival. 5) Visualization — Kibana dashboards. This is the ELK/EFK stack pattern.",
      analogy: "A log aggregation system is like a central newsroom for a large organization. Each department (microservice) has a reporter (Filebeat) who sends all their notes to the newsroom (Kafka). Editors (Logstash) clean up and format the notes. The archive room (Elasticsearch) stores everything in a searchable format. The editorial dashboard (Kibana) lets anyone search the entire archive instantly.",
      example: "OrderService writes logs to disk → Filebeat tails the file → ships to Kafka topic 'logs-orderservice' → Logstash consumes, parses JSON, adds metadata → indexes into Elasticsearch → DevOps searches 'ERROR orderId:123' in Kibana.",
      followUps: [
        { question: "How do you handle log volume spikes?", answer: "Kafka acts as the buffer — it absorbs spikes. Logstash consumers process at their own pace. Scale Elasticsearch horizontally with more nodes and shards when storage/query load increases." },
        { question: "How do you retain logs cost-effectively?", answer: "Hot storage in Elasticsearch for recent logs (7-30 days). Cold storage in S3 with lifecycle policies for older logs. Use ILM (Index Lifecycle Management) in Elasticsearch to automate tiering." }
      ],
      keyPoints: ["Filebeat/Fluentd as log shippers", "Kafka buffers log streams", "Elasticsearch for search, S3 for archival", "ELK/EFK stack is the standard pattern"]
    },
    {
      id: 8,
      category: "System Design", difficulty: 2,
      topic: "1. HLD – Core Design",
      question: "Design a File Upload System (like S3)",
      simpleAnswer: "A file upload system allows users to upload large files reliably, stores them durably, and serves them efficiently — with access control and CDN delivery.",
      explanation: "Flow: 1) Client requests a pre-signed URL from the Upload Service. 2) Upload Service generates a pre-signed S3 URL (valid for limited time) and returns it. 3) Client uploads directly to S3 using the pre-signed URL — bypassing your servers. 4) S3 triggers an event on upload completion. 5) Metadata Service stores file metadata (name, size, owner, S3 key) in DB. 6) CDN (CloudFront) serves files for fast global access. For large files, use multipart upload.",
      analogy: "Pre-signed URL file upload is like a hotel giving you a key card for a specific storage room. The hotel (your server) issues a temporary key (pre-signed URL) that only opens one specific room (S3 bucket path) for a limited time. You go directly to the storage room yourself — the hotel staff don't carry your luggage for you. This keeps the hotel lobby (your servers) free from heavy lifting.",
      example: "User uploads profile photo → client calls POST /upload/presign → server returns pre-signed S3 URL → client PUTs file directly to S3 → S3 triggers Lambda → Lambda saves metadata to DB → client gets CDN URL to display photo.",
      followUps: [
        { question: "How do you handle large file uploads (multi-GB)?", answer: "Use S3 multipart upload — split file into chunks (5MB+), upload each chunk in parallel, S3 assembles them. If a chunk fails, retry only that chunk. Much faster and resumable." },
        { question: "How do you implement access control?", answer: "Pre-signed URLs with expiry for temporary access. For permanent access control, use S3 bucket policies + IAM roles. For user-level permissions, store ACLs in your DB and validate before generating pre-signed URLs." }
      ],
      keyPoints: ["Pre-signed URLs — client uploads directly to S3", "Bypasses your servers for large file transfers", "CDN for fast global file delivery", "Multipart upload for large files"]
    },
    {
      id: 9,
      category: "System Design", difficulty: 2,
      topic: "1. HLD – Core Design",
      question: "Design a Search System (basic)",
      simpleAnswer: "A search system indexes content and allows users to query it with low latency — returning relevant results ranked by relevance.",
      explanation: "Components: 1) Crawler/Indexer — reads data from source DB and builds an inverted index. 2) Inverted Index — maps each word to the list of documents containing it. 3) Search Service — takes query, tokenizes it, looks up inverted index, ranks results. 4) Elasticsearch handles all of this out of the box. For real-time updates, use Kafka CDC (Change Data Capture) to stream DB changes to Elasticsearch. Cache popular queries in Redis.",
      analogy: "An inverted index is like the index at the back of a textbook. Instead of reading every page to find 'Java', you look up 'Java' in the index and get a list of page numbers. Elasticsearch builds this index automatically. CDC with Kafka is like a librarian who updates the index every time a new page is added to the book — keeping it in sync with the source.",
      example: "Product catalog: 'red shoes' query → tokenize → ['red', 'shoes'] → look up inverted index → find all products containing both words → rank by relevance score (TF-IDF) → return top 10. Cache 'red shoes' results in Redis for 5 minutes.",
      followUps: [
        { question: "How do you keep the search index in sync with the DB?", answer: "Use CDC (Change Data Capture) with Debezium to stream DB changes to Kafka. A consumer reads from Kafka and updates Elasticsearch. Near real-time sync with minimal DB load." },
        { question: "How do you implement autocomplete/typeahead?", answer: "Use Elasticsearch's completion suggester or a Trie data structure in Redis. Store popular search terms with their frequencies. Return top-N suggestions as user types." }
      ],
      keyPoints: ["Inverted index is the core data structure", "Elasticsearch handles indexing and search", "CDC + Kafka for real-time index sync", "Redis cache for popular queries"]
    },
    {
      id: 10,
      category: "System Design", difficulty: 2,
      topic: "2. LLD – Low Level Design",
      question: "Design a Parking Lot System",
      simpleAnswer: "A parking lot system manages vehicle entry/exit, slot allocation, and fee calculation — using OOP principles with clear class responsibilities.",
      explanation: "Classes: 1) ParkingLot — singleton, manages floors and entry/exit. 2) ParkingFloor — contains slots of different types. 3) ParkingSlot — abstract class with subtypes (TwoWheelerSlot, CarSlot, TruckSlot). 4) Vehicle — abstract with subtypes (Bike, Car, Truck). 5) Ticket — issued on entry with slot, vehicle, timestamp. 6) FeeCalculator — strategy pattern for different pricing. 7) DisplayBoard — shows available slots per type.",
      analogy: "A parking lot system is like a hotel with different room types. The ParkingLot is the hotel manager (Singleton — one manager). Floors are wings of the hotel. Slots are rooms of different types (standard, suite, accessible). A Ticket is your room key with check-in time. The FeeCalculator is the billing department — you can swap in a weekend rate or corporate rate (Strategy pattern) without changing how the hotel operates.",
      example: "Car enters → ParkingLot.getAvailableSlot(CAR) → finds nearest CarSlot → marks slot OCCUPIED → issues Ticket(slot, vehicle, entryTime). Car exits → Ticket scanned → FeeCalculator.calculate(entryTime, exitTime) → slot marked AVAILABLE.",
      followUps: [
        { question: "How do you make it thread-safe?", answer: "Synchronize slot allocation — use synchronized block or ReentrantLock when checking and marking a slot. Use ConcurrentHashMap for slot tracking. Atomic operations prevent two vehicles getting the same slot." },
        { question: "How do you apply the Strategy pattern here?", answer: "FeeCalculator is a strategy interface with implementations: HourlyFeeStrategy, DailyFeeStrategy, WeekendFeeStrategy. ParkingLot holds a reference to the current strategy and delegates fee calculation to it." }
      ],
      keyPoints: ["Singleton for ParkingLot", "Strategy pattern for fee calculation", "Abstract classes for Vehicle and Slot types", "Thread-safe slot allocation with locks"]
    },

    // ─── BATCH 3: Q11–15 ─────────────────────────────────────────────────────
    {
      id: 11,
      category: "System Design", difficulty: 2,
      topic: "2. LLD – Low Level Design",
      question: "Design an LRU Cache",
      simpleAnswer: "An LRU (Least Recently Used) cache evicts the least recently accessed item when the cache is full — implemented with a HashMap + Doubly Linked List for O(1) get and put.",
      explanation: "Data structures: 1) HashMap — maps key to the node in the linked list for O(1) lookup. 2) Doubly Linked List — maintains access order. Most recently used at head, least recently used at tail. On get: move accessed node to head. On put: add new node at head; if capacity exceeded, remove tail node and its key from HashMap. This gives O(1) for both get and put.",
      analogy: "An LRU cache is like a whiteboard with a limited number of sticky notes. The most recently used note is always at the top. When the board is full and you add a new note, the oldest one at the bottom gets thrown away. The HashMap is like knowing exactly which position each note is in — so you can grab or move any note instantly without scanning the whole board.",
      example: "Cache capacity=3. Put(1), Put(2), Put(3) → list: [3↔2↔1]. Get(1) → move 1 to head → [1↔3↔2]. Put(4) → capacity exceeded → evict tail (2) → [4↔1↔3]. Get(2) → cache miss.",
      followUps: [
        { question: "How do you make LRU Cache thread-safe?", answer: "Use ReentrantReadWriteLock — read lock for get, write lock for put. Or use LinkedHashMap with accessOrder=true wrapped in Collections.synchronizedMap(). For high concurrency, use ConcurrentLinkedHashMap (Guava's Cache)." },
        { question: "What is the time complexity of LRU Cache operations?", answer: "O(1) for both get and put — HashMap gives O(1) lookup, and moving a node in a doubly linked list is O(1) since we have direct reference to the node." }
      ],
      keyPoints: ["HashMap + Doubly Linked List = O(1) get and put", "Head = most recently used, Tail = least recently used", "On get: move node to head", "On put: add at head, evict tail if over capacity"]
    },
    {
      id: 12,
      category: "System Design", difficulty: 2,
      topic: "2. LLD – Low Level Design",
      question: "Design a BookMyShow System",
      simpleAnswer: "BookMyShow allows users to search movies, select seats, and book tickets — with concurrent seat locking to prevent double booking.",
      explanation: "Classes: 1) Movie — title, duration, genre. 2) Theatre — name, location, screens. 3) Screen — seats layout. 4) Show — movie + screen + time slot. 5) Seat — row, number, type (REGULAR/PREMIUM), status (AVAILABLE/LOCKED/BOOKED). 6) Booking — user + show + seats + payment. 7) SeatLockService — temporarily locks selected seats for 10 minutes during payment. Key challenge: concurrent seat selection — use optimistic locking (DB version column) or pessimistic locking (SELECT FOR UPDATE).",
      analogy: "Booking a seat is like reserving a table at a restaurant. When you say 'I want table 5', the host puts a 'reserved' sign on it for 10 minutes while you decide. If you don't confirm (complete payment), the sign comes off and someone else can take it. Two people trying to grab the same table simultaneously is handled by the database lock — only one gets the confirmation.",
      example: "User selects Show(Avengers, Screen3, 7PM) → views available seats → selects A1, A2 → SeatLockService locks A1, A2 for 10 min → user pays → Booking created → seats marked BOOKED. If payment fails, lock expires → seats become AVAILABLE again.",
      followUps: [
        { question: "How do you prevent two users from booking the same seat?", answer: "Use DB-level locking: SELECT FOR UPDATE on seat rows during booking transaction. Or use optimistic locking with a version column — if two users try simultaneously, one gets a version conflict and must retry." },
        { question: "How do you scale for high-demand shows (IPL final, blockbuster release)?", answer: "Use a queue-based waiting room — users enter a virtual queue. Process bookings in order. Use Redis distributed locks for seat reservation. Cache show/seat data in Redis to reduce DB load." }
      ],
      keyPoints: ["SeatLockService for temporary reservation during payment", "Optimistic or pessimistic locking for concurrent booking", "Show = Movie + Screen + TimeSlot", "Lock expires if payment not completed"]
    },
    {
      id: 13,
      category: "System Design", difficulty: 2,
      topic: "2. LLD – Low Level Design",
      question: "Design a Splitwise System",
      simpleAnswer: "Splitwise tracks shared expenses among a group and calculates who owes whom — minimizing the number of transactions needed to settle debts.",
      explanation: "Classes: 1) User — profile, balance map. 2) Group — members, expenses. 3) Expense — amount, payer, split type (EQUAL/EXACT/PERCENTAGE), participants. 4) Split — abstract with subtypes (EqualSplit, ExactSplit, PercentSplit). 5) ExpenseService — adds expense, updates balances. 6) SettlementService — calculates minimum transactions to settle all debts (greedy algorithm: match max creditor with max debtor). Balance stored as a map: userId → net amount (positive = owed to you, negative = you owe).",
      analogy: "Splitwise is like a group of friends keeping a shared ledger. Every time someone pays for the group, they write it in the ledger. At the end of the trip, instead of everyone paying everyone else back individually (which could be 10 transactions), a smart accountant (the greedy settlement algorithm) figures out the minimum number of transfers to zero out all balances.",
      example: "Group: A, B, C. A pays ₹300 dinner, split equally → each owes ₹100. B owes A ₹100, C owes A ₹100. B pays ₹150 movie, split equally → each owes ₹50. A owes B ₹50, C owes B ₹50. Net: C owes A ₹100, C owes B ₹50, A owes B ₹50 → simplified: C pays A ₹100, C pays B ₹50, A pays B ₹50.",
      followUps: [
        { question: "How do you minimize the number of settlement transactions?", answer: "Calculate net balance for each person. Use a greedy algorithm: repeatedly match the person with the highest positive balance (creditor) with the person with the most negative balance (debtor) until all balances are zero." },
        { question: "How do you handle currency conversion in international groups?", answer: "Store all amounts in a base currency (USD). Use an exchange rate service to convert at time of expense creation. Store both original amount/currency and converted amount for display." }
      ],
      keyPoints: ["Balance map: userId → net amount", "Strategy pattern for split types (Equal/Exact/Percent)", "Greedy algorithm minimizes settlement transactions", "Expense stores payer, participants, and split details"]
    },
    {
      id: 14,
      category: "System Design", difficulty: 2,
      topic: "2. LLD – Low Level Design",
      question: "Design a Vending Machine",
      simpleAnswer: "A vending machine dispenses products after payment — modeled using the State design pattern to manage transitions between machine states.",
      explanation: "States: IDLE → HAS_MONEY → DISPENSING → OUT_OF_STOCK. State pattern: each state is a class implementing a VendingMachineState interface with methods: insertCoin(), selectProduct(), dispenseProduct(), returnChange(). The machine delegates all actions to the current state object. Transitions: insertCoin() in IDLE → moves to HAS_MONEY. selectProduct() in HAS_MONEY → moves to DISPENSING. dispenseProduct() → moves back to IDLE. Classes: VendingMachine, Product, Inventory, CoinHandler.",
      analogy: "A vending machine's State pattern is like a traffic light. Each light (state) knows exactly what to do when triggered — green knows to turn yellow, yellow knows to turn red. You don't have a giant if-else block saying 'if current color is green AND timer fires THEN change to yellow'. Each state manages its own transitions, making the logic clean and easy to extend.",
      example: "Machine is IDLE. User inserts ₹20 → state changes to HAS_MONEY. User selects Chips (₹15) → state changes to DISPENSING → dispenses Chips → returns ₹5 change → state back to IDLE. If user inserts coin in DISPENSING state → state handles it gracefully (returns coin).",
      followUps: [
        { question: "Why use the State pattern here?", answer: "Without State pattern, you'd have complex if-else chains checking current state in every method. State pattern encapsulates state-specific behavior in separate classes, making it easy to add new states without modifying existing code (Open/Closed Principle)." },
        { question: "How do you handle insufficient funds?", answer: "In HAS_MONEY state, selectProduct() checks if inserted amount >= product price. If not, display 'Insufficient funds' and stay in HAS_MONEY state. User can insert more coins or request return of inserted coins." }
      ],
      keyPoints: ["State pattern for machine state transitions", "Each state handles its own valid actions", "States: IDLE, HAS_MONEY, DISPENSING, OUT_OF_STOCK", "Clean transitions without complex if-else chains"]
    },
    {
      id: 15,
      category: "System Design", difficulty: 2,
      topic: "2. LLD – Low Level Design",
      question: "Design a Task Scheduler",
      simpleAnswer: "A task scheduler executes tasks at specified times or intervals — supporting one-time, recurring, and delayed task execution with thread management.",
      explanation: "Components: 1) Task — interface with execute() method. 2) ScheduledTask — wraps Task with execution time and recurrence info. 3) TaskScheduler — maintains a priority queue (min-heap) sorted by next execution time. A background thread polls the queue, picks tasks due for execution, and runs them in a thread pool. 4) ThreadPoolExecutor — executes tasks concurrently. For recurring tasks, after execution, recalculate next run time and re-add to queue. Supports cron expressions for complex schedules.",
      analogy: "A task scheduler is like an alarm clock system. You set alarms (schedule tasks) with specific times. A background thread is the clock that constantly checks: 'is it time for any alarm yet?' The priority queue is the alarm list sorted by next ring time — the soonest alarm is always at the top. When an alarm fires, it's handed to a worker (thread pool) to handle, and recurring alarms are rescheduled automatically.",
      example: "Schedule: sendDailyReport() at 9AM every day. TaskScheduler adds it to priority queue with nextRunTime=tomorrow 9AM. Background thread wakes up, checks queue head — it's 9AM → submits to thread pool → executes → recalculates nextRunTime=day-after 9AM → re-adds to queue.",
      followUps: [
        { question: "How do you handle task failures?", answer: "Wrap task execution in try-catch. On failure, log the error, optionally retry with backoff (re-add to queue with delay). After max retries, mark task as FAILED and alert. Store task execution history in DB." },
        { question: "How do you make the scheduler distributed?", answer: "Use a distributed lock (Redis SETNX) so only one scheduler instance picks up a task. Store tasks in a shared DB instead of in-memory queue. Use Quartz Scheduler or Spring Batch for production distributed scheduling." }
      ],
      keyPoints: ["Priority queue (min-heap) sorted by next execution time", "Background thread polls and dispatches tasks", "ThreadPoolExecutor for concurrent execution", "Recurring tasks re-added to queue after execution"]
    },

    // ─── BATCH 4: Q16–20 – Design Patterns ───────────────────────────────────
    {
      id: 16,
      category: "System Design", difficulty: 2,
      topic: "3. Design Patterns",
      question: "How do you implement a thread-safe Singleton in Java?",
      simpleAnswer: "Use the Bill Pugh Singleton (static inner class) or double-checked locking with volatile — both are thread-safe and lazy-initialized.",
      explanation: "Options: 1) Eager initialization — instance created at class load. Simple but wastes memory if never used. 2) Double-checked locking — check null twice with synchronized block, use volatile to prevent instruction reordering. 3) Bill Pugh (best) — static inner class holds the instance; JVM guarantees class loading is thread-safe, so no synchronization needed. 4) Enum Singleton — simplest, handles serialization and reflection attacks automatically.",
      analogy: "The Bill Pugh Singleton is like a bank vault that's only built when the first customer asks for it. The JVM guarantees that class loading is thread-safe — so the vault is built exactly once, no matter how many customers ask simultaneously. Double-checked locking is like two security guards checking the vault door — the volatile keyword ensures both guards see the same state of the door.",
      example: "Bill Pugh: class Singleton { private Singleton(){} private static class Holder { static final Singleton INSTANCE = new Singleton(); } public static Singleton getInstance() { return Holder.INSTANCE; } } — lazy, thread-safe, no synchronization overhead.",
      followUps: [
        { question: "Why is volatile needed in double-checked locking?", answer: "Without volatile, the JVM can reorder instructions — another thread might see a partially constructed object. volatile ensures the instance is fully constructed before the reference is published." },
        { question: "How does Spring handle Singleton beans?", answer: "Spring beans are Singleton by default (one instance per ApplicationContext). Spring manages creation and thread safety through its IoC container — you don't need to implement the Singleton pattern manually." }
      ],
      keyPoints: ["Bill Pugh (static inner class) is the best approach", "volatile prevents instruction reordering in DCL", "Enum Singleton handles serialization automatically", "Spring beans are Singleton by default via IoC container"]
    },
    {
      id: 17,
      category: "System Design", difficulty: 2,
      topic: "3. Design Patterns",
      question: "Where did you use the Factory pattern in your project?",
      simpleAnswer: "Factory pattern creates objects without exposing the creation logic — the caller asks for an object by type, and the factory decides which concrete class to instantiate.",
      explanation: "Factory Method: defines an interface for creating an object but lets subclasses decide which class to instantiate. Abstract Factory: creates families of related objects. Simple Factory: a static method that returns different implementations based on input. Real usage: NotificationFactory returns EmailNotification, SMSNotification, or PushNotification based on channel type. PaymentProcessorFactory returns StripeProcessor or RazorpayProcessor based on config.",
      analogy: "The Factory pattern is like a car dealership. You tell the salesperson what type of car you want (sedan, SUV, truck) and they handle all the details of which model to get from the lot. You don't go to the factory yourself — you just describe what you need and the factory decides which specific object to create and hand back to you.",
      example: "NotificationFactory.create('EMAIL') → returns new EmailNotification(). NotificationFactory.create('SMS') → returns new SMSNotification(). The caller just calls notification.send() — doesn't know or care which implementation it got.",
      followUps: [
        { question: "What is the difference between Factory Method and Abstract Factory?", answer: "Factory Method creates one product via a method that subclasses override. Abstract Factory creates families of related products (e.g., a UIFactory that creates Button + TextField + Checkbox all in the same theme)." },
        { question: "How does Spring use the Factory pattern?", answer: "BeanFactory and ApplicationContext are factories — they create and manage beans. FactoryBean interface lets you define custom creation logic for complex beans." }
      ],
      keyPoints: ["Decouples object creation from usage", "Factory Method: subclasses decide the class", "Abstract Factory: families of related objects", "Real use: NotificationFactory, PaymentProcessorFactory"]
    },
    {
      id: 101,
      category: "System Design", difficulty: 2,
      topic: "3. Design Patterns",
      question: "How does the Builder pattern solve the telescoping constructor problem?",
      simpleAnswer: "The Builder pattern provides a step-by-step fluent interface to construct complex objects, avoiding giant constructors with many optional parameters.",
      explanation: "When a class has many optional fields, you often end up writing multiple constructors (telescoping constructors) or passing multiple 'null' values. The Builder pattern solves this by using a separate builder class. You chain method calls to set only the fields you need, and call `.build()` at the end. This makes the code highly readable and allows the final object to be completely immutable.",
      analogy: "The Builder pattern is like ordering a custom sandwich at a deli. Instead of choosing from a fixed menu (telescoping constructors) or handing the deli a list of 20 ingredients with most left blank (null parameters), you tell the deli worker step by step: 'sourdough bread, turkey, no onions, extra cheese'. You only specify what you want. The builder assembles the final sandwich when you say 'done'.",
      example: "User user = User.builder().firstName(\"John\").age(30).build(); (Often generated automatically via Lombok's @Builder annotation in Spring Boot).",
      followUps: [
        { question: "What is the difference between Builder and Factory?", answer: "Factory is about deciding *which* subclass or implementation to instantiate based on logic. Builder is about configuring the internal state of a *single* complex object step-by-step." }
      ],
      keyPoints: ["Solves telescoping constructor anti-pattern", "Makes object instantiation readable and fluent", "Allows the constructed object to be immutable", "Heavily utilized via Lombok's @Builder"]
    },
    {
      id: 102,
      category: "System Design", difficulty: 2,
      topic: "3. Design Patterns",
      question: "What is the Facade pattern and when should you use it?",
      simpleAnswer: "A Facade provides a simple, unified interface to a complex subsystem, hiding the underlying complexity from the client.",
      explanation: "If a client needs to interact with 5 different classes to complete a task, the client becomes tightly coupled to that complex logic. A Facade class acts as a front-facing wrapper. The client just calls one simple method on the Facade, and the Facade handles orchestrating the complex subsystem behind the scenes.",
      analogy: "The Facade pattern is like a hotel concierge. Behind the scenes, the concierge coordinates with housekeeping, room service, the spa, and the garage. You just say 'I need my car ready and my room cleaned by 3pm'. You don't call each department yourself. The concierge (Facade) handles the complexity. If the hotel reorganizes its departments, you still just call the concierge — your interaction never changes.",
      example: "An `OrderFacade` has a `placeOrder()` method. Behind the scenes, it internally calls `InventoryService.check()`, `PaymentService.charge()`, and `ShippingService.dispatch()`. The frontend controller only needs to talk to `OrderFacade`.",
      followUps: [
        { question: "Does a Facade prevent access to the underlying subsystem?", answer: "No, a Facade simply provides a convenient shortcut. Clients who need advanced control can still bypass the Facade and talk to the subsystem components directly." }
      ],
      keyPoints: ["Hides subsystem complexity", "Provides a unified, simple interface", "Promotes loose coupling between clients and subsystems"]
    },
    {
      id: 103,
      category: "System Design", difficulty: 2,
      topic: "3. Design Patterns",
      question: "What is the Proxy pattern and how does Spring use it?",
      simpleAnswer: "A Proxy acts as a surrogate or placeholder for another object, allowing you to intercept calls to the real object to add behavior like caching, security, or lazy loading.",
      explanation: "The Proxy implements the exact same interface as the real object. When the client calls a method, it actually hits the Proxy. The Proxy runs its own logic (like checking permissions, starting a transaction, or checking a cache), passes the call to the real object, and then returns the result.",
      analogy: "The Proxy pattern is like a personal assistant who screens your calls. When someone calls you (calls a method), the assistant (Proxy) answers first. They check if the caller is authorized, log the call, and handle simple requests themselves. Only then do they put the caller through to you (the real object). Spring's @Transactional works exactly this way — the proxy starts a transaction before your method runs and commits it after.",
      example: "Spring AOP uses Proxies heavily. When you annotate a method with `@Transactional`, Spring gives the client a Proxy. The Proxy starts the DB transaction, calls your real method, and then commits the transaction when your method finishes.",
      followUps: [
        { question: "What is the difference between Proxy and Decorator?", answer: "Intent. A Decorator dynamically adds new responsibilities or features to an object. A Proxy controls access to an object (e.g., lazy loading, security checks, transactions)." }
      ],
      keyPoints: ["Controls access to the underlying object", "Implements the same interface as the target", "Heavily used in Spring AOP (@Transactional, @Cacheable)"]
    },
    {
      id: 18,
      category: "System Design", difficulty: 2,
      topic: "3. Design Patterns",
      question: "How would you use the Adapter pattern to integrate a third-party API?",
      simpleAnswer: "The Adapter pattern wraps a third-party API behind your own interface — so your code talks to your interface, and the adapter translates calls to the third-party API.",
      explanation: "When integrating a third-party payment gateway (Stripe, Razorpay), their API has its own method signatures and data formats. You define a PaymentGateway interface with your own methods. Create a StripeAdapter that implements PaymentGateway and internally calls Stripe's SDK. If you switch to Razorpay, create RazorpayAdapter — your business code doesn't change at all. This is the Open/Closed Principle in action.",
      analogy: "The Adapter pattern is like a universal travel plug adapter. Your laptop (your code) has a standard plug (your interface). The foreign power outlet (third-party API) has a different shape. The adapter sits between them, translating one shape to the other. If you travel to a different country (switch payment providers), you just swap the adapter — your laptop doesn't change.",
      example: "Interface: PaymentGateway { charge(amount, currency, token) }. StripeAdapter implements PaymentGateway { charge(...) { stripe.charges.create({amount, currency, source: token}) } }. Your OrderService calls paymentGateway.charge() — works with Stripe today, Razorpay tomorrow.",
      followUps: [
        { question: "What is the difference between Adapter and Facade?", answer: "Adapter makes an incompatible interface compatible (wraps one interface to match another). Facade simplifies a complex subsystem by providing a unified simple interface (hides complexity, doesn't change interface)." },
        { question: "When would you use Adapter vs rewriting the integration?", answer: "Use Adapter when you can't modify the third-party code (you don't own it) and need to fit it into your existing interface. Rewrite only if the third-party API is so different that adapting it adds more complexity than it saves." }
      ],
      keyPoints: ["Wraps third-party API behind your own interface", "Business code talks to your interface only", "Swap providers by swapping adapters", "Enables Open/Closed Principle for integrations"]
    },
    {
      id: 19,
      category: "System Design", difficulty: 2,
      topic: "3. Design Patterns",
      question: "How does the Decorator pattern dynamically add behavior?",
      simpleAnswer: "Decorator wraps an object with another object that adds new behavior — without modifying the original class or using inheritance.",
      explanation: "Define a component interface. Create a concrete implementation. Create decorator classes that implement the same interface, hold a reference to the wrapped component, and add behavior before/after delegating to it. Decorators can be stacked. Real use: Java I/O streams (BufferedInputStream wraps FileInputStream), logging decorators, caching decorators, compression decorators.",
      analogy: "The Decorator pattern is like adding toppings to a pizza. You start with a base pizza (the core object). You add cheese (one decorator), then pepperoni (another decorator), then extra sauce (another). Each topping wraps the previous one and adds its own behavior. You can stack as many toppings as you want without changing the base pizza recipe. Java's BufferedInputStream wrapping FileInputStream is exactly this.",
      example: "Interface: DataSource { write(data), read() }. FileDataSource implements it. EncryptionDecorator wraps DataSource: write(data) { super.write(encrypt(data)) }. CompressionDecorator wraps DataSource: write(data) { super.write(compress(data)) }. Stack them: new CompressionDecorator(new EncryptionDecorator(new FileDataSource())) — writes compressed+encrypted data.",
      followUps: [
        { question: "What is the difference between Decorator and Inheritance?", answer: "Inheritance adds behavior at compile time and applies to all instances. Decorator adds behavior at runtime to specific instances. Decorator is more flexible — you can mix and match decorators dynamically." },
        { question: "Where is Decorator used in Spring?", answer: "Spring's TransactionInterceptor is a decorator — it wraps your service method with transaction management. Spring Security's filter chain is a chain of decorators adding authentication, authorization, CSRF protection." }
      ],
      keyPoints: ["Wraps object to add behavior without modifying it", "Same interface as the wrapped object", "Decorators can be stacked/chained", "Java I/O streams are the classic example"]
    },
    {
      id: 20,
      category: "System Design", difficulty: 2,
      topic: "3. Design Patterns",
      question: "How does the Strategy pattern handle multiple payment methods?",
      simpleAnswer: "Strategy pattern defines a family of algorithms (payment methods), encapsulates each one, and makes them interchangeable — the caller selects the strategy at runtime.",
      explanation: "Define a PaymentStrategy interface with a pay(amount) method. Create concrete strategies: CreditCardStrategy, UPIStrategy, NetBankingStrategy, WalletStrategy. PaymentService holds a reference to the current strategy. At runtime, based on user selection, inject the appropriate strategy. This avoids giant if-else chains and makes adding new payment methods easy — just add a new strategy class.",
      analogy: "The Strategy pattern is like a GPS navigation app with multiple route options. The destination (goal) is the same, but you can choose the strategy: fastest route, shortest route, or avoid tolls. You swap the routing algorithm at runtime without changing the app. The app just calls 'calculateRoute()' on whichever strategy is currently selected.",
      example: "PaymentStrategy interface: pay(amount). CreditCardStrategy: pay(amount) { chargeCard(amount) }. UPIStrategy: pay(amount) { initiateUPI(amount) }. PaymentService: setStrategy(strategy); processPayment(amount) { strategy.pay(amount) }. User selects UPI → setStrategy(new UPIStrategy()) → processPayment(500).",
      followUps: [
        { question: "How is Strategy different from Factory?", answer: "Factory is about object creation — which class to instantiate. Strategy is about behavior — which algorithm to use. They're often used together: a Factory creates the right Strategy based on user input." },
        { question: "Where does Spring use the Strategy pattern?", answer: "ResourceLoader strategy for loading resources. HandlerMapping strategy for routing requests. TransactionManager strategy for different transaction implementations (JPA, JDBC, JTA)." }
      ],
      keyPoints: ["Encapsulates each algorithm in its own class", "Interchangeable at runtime without changing caller", "Eliminates if-else chains for algorithm selection", "Open/Closed: add new strategy without modifying existing code"]
    },

    // ─── BATCH 5: Q21–25 – Observer + SOLID ──────────────────────────────────
    {
      id: 21,
      category: "System Design", difficulty: 2,
      topic: "3. Design Patterns",
      question: "How does the Observer pattern relate to event-driven systems?",
      simpleAnswer: "Observer pattern is the foundation of event-driven systems — a subject notifies all registered observers when its state changes, just like Kafka notifies all consumer groups when a new event is published.",
      explanation: "Observer: Subject maintains a list of observers. When state changes, Subject calls notify() on all observers. Each observer reacts independently. In event-driven systems: the event producer is the Subject, the message broker (Kafka) is the notification mechanism, and consumer services are the Observers. Kafka extends this to distributed scale — observers (consumers) can be on different machines, can be added/removed without changing the producer.",
      analogy: "The Observer pattern is like a YouTube channel subscription. The channel (subject) doesn't know who's watching — it just publishes a new video (event). All subscribers (observers) get notified automatically. You can subscribe or unsubscribe at any time without the channel changing anything. Kafka is essentially the Observer pattern at massive scale.",
      example: "Classic Observer: OrderService (subject) notifies PaymentObserver, InventoryObserver, NotificationObserver when order is placed. Kafka version: OrderService publishes to 'orders' topic. PaymentService, InventoryService, NotificationService each subscribe independently — same pattern, distributed scale.",
      followUps: [
        { question: "What is the difference between Observer and Pub-Sub?", answer: "Observer: subject knows its observers directly (tight coupling). Pub-Sub: publisher and subscriber are decoupled via a message broker — publisher doesn't know subscribers exist. Kafka is Pub-Sub, not pure Observer." },
        { question: "How do you implement Observer in Java?", answer: "Use java.util.Observable (deprecated) or implement manually: Subject interface with register/remove/notify methods. Or use Spring's ApplicationEventPublisher and @EventListener for in-process events." }
      ],
      keyPoints: ["Subject notifies all observers on state change", "Kafka is distributed Pub-Sub — evolution of Observer", "Observers are decoupled from the subject", "Adding new observers doesn't change the subject"]
    },
    {
      id: 22,
      category: "System Design", difficulty: 2,
      topic: "4. SOLID Principles",
      question: "Explain all SOLID principles with examples",
      simpleAnswer: "SOLID is 5 principles for writing maintainable OOP code: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.",
      explanation: "S — Single Responsibility: a class should have only one reason to change. O — Open/Closed: open for extension, closed for modification (add new behavior via new classes, not by editing existing ones). L — Liskov Substitution: subclasses must be substitutable for their parent class without breaking behavior. I — Interface Segregation: don't force clients to implement interfaces they don't use — split large interfaces. D — Dependency Inversion: depend on abstractions (interfaces), not concrete implementations.",
      analogy: "SOLID principles are like the building codes for software architecture. SRP is 'one room, one purpose' — don't put the kitchen in the bathroom. OCP is 'add rooms without demolishing existing ones'. LSP is 'a studio apartment must work anywhere a regular apartment is expected'. ISP is 'don't force tenants to pay for amenities they'll never use'. DIP is 'wire to the electrical standard, not to a specific brand of outlet'.",
      example: "S: UserService handles only user logic, not email sending. O: Add new payment method by adding a class, not editing PaymentService. L: Square should not extend Rectangle if it breaks area calculation. I: Don't force a ReadOnlyRepository to implement save(). D: OrderService depends on PaymentGateway interface, not StripePaymentGateway directly.",
      followUps: [
        { question: "Which SOLID principle is most commonly violated?", answer: "Single Responsibility — classes tend to grow over time and accumulate unrelated responsibilities. God classes that do everything are the most common violation." },
        { question: "How do SOLID principles relate to microservices?", answer: "SRP maps directly to microservice design — each service should have one business responsibility. DIP is why services communicate via APIs (abstractions) not direct class calls. OCP is why you add new services rather than modifying existing ones." }
      ],
      keyPoints: ["S: one reason to change", "O: extend via new classes, not modification", "L: subclass must honor parent contract", "I: small focused interfaces", "D: depend on abstractions"]
    },
    {
      id: 23,
      category: "System Design", difficulty: 2,
      topic: "4. SOLID Principles",
      question: "How does Single Responsibility Principle apply in microservices?",
      simpleAnswer: "Each microservice should own exactly one business capability — just as SRP says each class should have one reason to change, each service should have one reason to change.",
      explanation: "SRP at service level: UserService changes only when user management requirements change. OrderService changes only when order processing requirements change. If a service is changing for multiple unrelated reasons, it's violating SRP and should be split. This is the core principle behind service decomposition. A service that handles users, orders, AND payments is a monolith in disguise.",
      analogy: "SRP is like a job description. A chef should cook food — not also manage payroll, fix the plumbing, and drive the delivery van. When one person does too many unrelated jobs, any change to one job affects all the others. A class with one responsibility changes for only one reason — making it predictable and easy to maintain.",
      example: "Bad: UserOrderService handles user registration AND order placement AND payment processing — 3 reasons to change. Good: UserService (changes when user requirements change), OrderService (changes when order flow changes), PaymentService (changes when payment logic changes). Each has one responsibility.",
      followUps: [
        { question: "How do you identify SRP violations in a microservice?", answer: "If the service has multiple unrelated DB tables, multiple unrelated Kafka topics, or multiple teams working on it — it's likely violating SRP. If you can't describe the service's purpose in one sentence, it's too broad." },
        { question: "Can SRP be over-applied?", answer: "Yes — nano-services (one class per service) are an anti-pattern. SRP means one business capability, not one function. Balance cohesion with the operational overhead of managing many services." }
      ],
      keyPoints: ["Each service = one business capability", "One reason to change per service", "Multiple unrelated DB tables = SRP violation signal", "Guides service decomposition decisions"]
    },
    {
      id: 24,
      category: "System Design", difficulty: 2,
      topic: "4. SOLID Principles",
      question: "Explain Open/Closed Principle with a real backend example",
      simpleAnswer: "Open/Closed Principle: your code should be open for extension (add new behavior) but closed for modification (don't change existing tested code).",
      explanation: "Achieved through abstractions (interfaces/abstract classes). When requirements change, add a new implementation rather than modifying existing code. This prevents regression bugs in already-tested code. Real backend example: adding a new payment provider. Without OCP: edit PaymentService's if-else chain. With OCP: PaymentService depends on PaymentGateway interface. Add new RazorpayGateway class implementing the interface — zero changes to PaymentService.",
      analogy: "OCP is like a power strip with multiple outlets. You add new devices by plugging them in — you don't rewire the power strip. The strip (existing code) is closed for modification but open for extension (new plugs). Adding a new payment method means adding a new class, not editing the existing payment processing code.",
      example: "PaymentGateway interface: charge(amount). StripeGateway implements it. PaymentService uses PaymentGateway. New requirement: add Razorpay. Without OCP: add 'else if (provider == RAZORPAY)' in PaymentService. With OCP: create RazorpayGateway class, inject it — PaymentService unchanged, untouched, still passing all tests.",
      followUps: [
        { question: "How do you apply OCP in Spring Boot?", answer: "Use @Qualifier or @ConditionalOnProperty to inject different implementations. Define interfaces for all external dependencies. Use Spring profiles to switch implementations without code changes." },
        { question: "Is it always possible to follow OCP?", answer: "No — you can't anticipate every future change. Apply OCP to the parts of your system most likely to change (payment providers, notification channels, report formats). Don't over-engineer areas that are stable." }
      ],
      keyPoints: ["Add new behavior via new classes, not editing existing ones", "Achieved through interfaces and abstractions", "Prevents regression in tested code", "Most valuable for frequently changing parts of the system"]
    },
    {
      id: 25,
      category: "System Design", difficulty: 2,
      topic: "4. SOLID Principles",
      question: "What is Dependency Inversion in Spring Boot?",
      simpleAnswer: "Dependency Inversion: high-level modules should not depend on low-level modules — both should depend on abstractions. In Spring, this means your service depends on an interface, not a concrete class.",
      explanation: "Without DI: OrderService creates 'new StripePaymentGateway()' — tightly coupled to Stripe. With DI: OrderService has a constructor parameter of type PaymentGateway (interface). Spring injects the concrete implementation. OrderService doesn't know or care which payment provider is used. This makes testing easy (inject a mock), and switching providers requires zero changes to OrderService.",
      analogy: "DIP is like plugging into a standard electrical outlet rather than hardwiring your appliance directly to the building's wiring. Your appliance (high-level module) depends on the outlet standard (abstraction), not on the specific wiring behind the wall (low-level module). You can rewire the building or move to a different country (swap implementations) without changing the appliance.",
      example: "Bad: class OrderService { StripeGateway gateway = new StripeGateway(); }. Good: class OrderService { PaymentGateway gateway; OrderService(PaymentGateway gateway) { this.gateway = gateway; } }. Spring injects StripeGateway at runtime. Test injects MockPaymentGateway. OrderService is decoupled from the implementation.",
      followUps: [
        { question: "How does Spring Boot implement Dependency Inversion?", answer: "Through its IoC container and @Autowired/@Inject. You declare dependencies as interfaces, Spring resolves and injects the concrete bean. @Component, @Service, @Repository register implementations. The container wires everything together." },
        { question: "What is the difference between Dependency Inversion and Dependency Injection?", answer: "Dependency Inversion is the principle (depend on abstractions). Dependency Injection is the mechanism (Spring injects the dependency). DI is how you implement the DIP principle." }
      ],
      keyPoints: ["Depend on interfaces, not concrete classes", "Spring IoC container injects concrete implementations", "Makes testing easy — inject mocks", "Decouples high-level business logic from low-level details"]
    },

    // ─── BATCH 6: Q26–30 – Microservices + Event-Driven Design ───────────────
    {
      id: 26,
      category: "System Design", difficulty: 2,
      topic: "5. Microservices Design",
      question: "Sync vs Async communication — where would you use Kafka vs REST?",
      simpleAnswer: "REST (sync): caller waits for a response — use when you need the result to continue. Kafka (async): caller fires and forgets — use when you want to decouple services, handle high throughput, or notify multiple consumers.",
      explanation: "REST (synchronous): OrderService calls PaymentService and waits for 200 OK before confirming the order. Both services must be up simultaneously. Tight temporal coupling — if PaymentService is down, OrderService fails. Low latency for the caller. Best for: operations where the result is needed immediately (payment confirmation, auth check, inventory availability). Kafka (asynchronous): OrderService publishes OrderPaid event and moves on. InventoryService, NotificationService, InvoiceService all consume it independently at their own pace. Services are decoupled — if NotificationService is down, it catches up when it restarts. Best for: fan-out to multiple consumers, high-throughput pipelines, operations where the caller doesn't need to wait (notifications, invoice generation, analytics). Rule of thumb: if the caller needs the result to continue → REST. If the caller just needs to notify others → Kafka.",
      analogy: "REST vs Kafka is like a phone call versus sending a letter. A phone call (REST) is synchronous — you wait on the line for an answer and both parties must be available at the same time. A letter (Kafka) is asynchronous — you send it and go about your day. The recipient reads it when they're ready. Use a phone call when you need an immediate answer; use a letter when you're broadcasting to multiple recipients who can act independently.",
      example: "REST: POST /payments — OrderService waits for 200 OK before confirming order to user. Kafka: After order confirmed, publish OrderConfirmed event — NotificationService sends email, InventoryService reduces stock, InvoiceService generates PDF — all async, all independent, all at their own pace.",
      followUps: [
        { question: "What are the risks of using REST between microservices?", answer: "Tight temporal coupling — if PaymentService is down, OrderService fails. Cascading failures across the call chain. Latency adds up across multiple synchronous hops. Use circuit breakers (Resilience4j) to handle downstream failures gracefully." },
        { question: "Can you mix REST and Kafka in the same flow?", answer: "Yes — this is the recommended pattern. Use REST for the critical synchronous path (payment confirmation) and Kafka for downstream async processing (notifications, analytics, invoicing). Best of both worlds." }
      ],
      keyPoints: ["REST: immediate response needed, both services must be up, tight coupling", "Kafka: fire-and-forget, decoupled, high throughput, fan-out to multiple consumers", "REST: use when caller needs result to continue (payment, auth, inventory check)", "Kafka: use when caller just notifies others (notifications, invoicing, analytics)"]
    },
    {
      id: 27,
      category: "System Design", difficulty: 2,
      topic: "5. Microservices Design",
      question: "How do you handle distributed transactions?",
      simpleAnswer: "Avoid distributed transactions where possible. When needed, use the Saga pattern — a sequence of local transactions with compensating transactions for rollback.",
      explanation: "Traditional 2PC (Two-Phase Commit) is slow and creates tight coupling. The Saga pattern breaks a distributed transaction into a series of local transactions. Each step publishes an event. If a step fails, compensating transactions undo previous steps. Two styles: 1) Choreography — each service listens for events and reacts (decentralized). 2) Orchestration — a central Saga Orchestrator tells each service what to do (centralized, easier to track).",
      analogy: "A distributed transaction Saga is like a relay race with an undo button. Each runner (service) completes their leg and passes the baton (publishes an event). If a runner drops the baton (step fails), the previous runners run backwards to their starting positions (compensating transactions). The race either finishes completely or everyone returns to the start — there's no half-finished state.",
      example: "Order Saga: 1) OrderService creates order (PENDING). 2) PaymentService charges card. 3) InventoryService reserves stock. 4) OrderService marks CONFIRMED. If step 3 fails: compensating transactions — PaymentService refunds, OrderService cancels order. All via Kafka events.",
      followUps: [
        { question: "What is the difference between Choreography and Orchestration Saga?", answer: "Choreography: services react to events — decentralized, no single point of failure, but hard to track overall flow. Orchestration: a Saga Orchestrator coordinates — easier to visualize and debug, but the orchestrator is a central component." },
        { question: "How do you handle a compensating transaction that also fails?", answer: "Retry the compensating transaction with exponential backoff. If it keeps failing, alert operations team and put the transaction in a manual review queue. This is why idempotent compensating transactions are critical." }
      ],
      keyPoints: ["Saga pattern replaces distributed transactions", "Local transactions + compensating transactions for rollback", "Choreography: event-driven, Orchestration: central coordinator", "Avoid 2PC — it's slow and creates tight coupling"]
    },
    {
      id: 28,
      category: "System Design", difficulty: 2,
      topic: "5. Microservices Design",
      question: "How do you handle service failure? What is the Circuit Breaker pattern?",
      simpleAnswer: "Circuit Breaker monitors calls to a downstream service. If failures exceed a threshold, it 'opens' and stops sending requests — giving the failing service time to recover.",
      explanation: "States: 1) CLOSED — normal operation, requests flow through. 2) OPEN — failure threshold exceeded, requests fail fast without calling the service (returns fallback). 3) HALF-OPEN — after a timeout, allows a few test requests. If they succeed, circuit closes. If they fail, circuit opens again. In Spring Boot, use Resilience4j @CircuitBreaker. Configure: failure rate threshold (50%), wait duration in open state (30s), permitted calls in half-open (5).",
      analogy: "A circuit breaker in software works exactly like the electrical circuit breaker in your home. When too many failures occur (power surge), the breaker trips (circuit opens) to protect the rest of the system. You don't keep trying to use the faulty circuit — you wait for it to cool down, then carefully test it (half-open state) before restoring full power. Without it, one failing service can cascade and take down everything.",
      example: "OrderService calls PaymentService. PaymentService starts timing out. After 5 failures in 10 seconds, circuit opens. Next 30 seconds: OrderService returns fallback response ('Payment service unavailable, try again') without calling PaymentService. After 30s, half-open: 3 test calls succeed → circuit closes → normal operation resumes.",
      followUps: [
        { question: "What is the difference between Circuit Breaker and Retry?", answer: "Retry: immediately retries a failed request (good for transient failures). Circuit Breaker: stops retrying after threshold and waits (good for sustained failures). Use both together: retry a few times, then circuit breaker kicks in." },
        { question: "What is a fallback in Circuit Breaker?", answer: "A fallback is the response returned when the circuit is open. Could be: cached data, a default response, an error message, or routing to a backup service. Fallbacks prevent cascading failures from propagating to the user." }
      ],
      keyPoints: ["3 states: CLOSED → OPEN → HALF-OPEN", "OPEN state fails fast without calling the service", "Resilience4j @CircuitBreaker in Spring Boot", "Combine with Retry for comprehensive fault tolerance"]
    },
    {
      id: 29,
      category: "System Design", difficulty: 2,
      topic: "6. Event-Driven Design",
      question: "Design a system using Kafka for Order and Invoice processing",
      simpleAnswer: "OrderService publishes order events to Kafka. InvoiceService consumes them to generate invoices asynchronously — fully decoupled, reliable, and scalable.",
      explanation: "Flow: 1) Customer places order → OrderService saves to DB → publishes OrderPlaced event to Kafka topic 'order-events'. 2) InvoiceService consumes 'order-events' → generates invoice PDF → saves to S3 → saves invoice record to DB → publishes InvoiceGenerated event. 3) NotificationService consumes InvoiceGenerated → emails PDF to customer. Key design decisions: idempotent consumers (check if invoice already exists before creating), DLQ for failed invoice generation, retry with backoff.",
      analogy: "The Kafka order-invoice system is like a factory assembly line triggered by a customer order. The order arrives (Kafka event), the assembly line checks if this order was already processed (idempotency), builds the product (generates PDF), stores it in the warehouse (S3), logs it in the inventory system (DB), and sends a shipping notification (InvoiceGenerated event). If the line jams (failure), the item goes to a rework station (DLQ) instead of being lost.",
      example: "OrderService: kafkaTemplate.send('order-events', orderId, orderEvent). InvoiceService: @KafkaListener(topics='order-events') → check if invoice exists for orderId → if not, generate PDF → save to S3 → publish InvoiceGenerated. Idempotency key = orderId prevents duplicate invoices.",
      followUps: [
        { question: "How do you ensure an invoice is generated exactly once?", answer: "Before generating, check DB: SELECT * FROM invoices WHERE order_id = ?. If exists, skip. This idempotency check ensures that even if the Kafka message is delivered twice (at-least-once), the invoice is only created once." },
        { question: "What happens if InvoiceService is down for 2 hours?", answer: "Kafka retains messages. When InvoiceService comes back up, it resumes from its last committed offset and processes all the orders it missed. No data loss, no manual intervention needed." }
      ],
      keyPoints: ["OrderService publishes, InvoiceService consumes — fully decoupled", "Idempotency check prevents duplicate invoices", "DLQ for failed invoice generation", "Kafka retains messages — InvoiceService catches up after downtime"]
    },
    {
      id: 30,
      category: "System Design", difficulty: 2,
      topic: "6. Event-Driven Design",
      question: "How do you handle duplicate messages, ordering, and retry with DLQ in Kafka?",
      simpleAnswer: "Duplicate messages: idempotent consumers. Ordering: use message keys (same key → same partition). Retry: exponential backoff. DLQ: after max retries, send to dead letter topic for manual review.",
      explanation: "1) Duplicates: Kafka guarantees at-least-once delivery by default. Make consumers idempotent — check if already processed before acting (store processed message IDs in DB or Redis). 2) Ordering: messages with the same key always go to the same partition, which is consumed by one consumer — guaranteeing order per key. 3) Retry: on processing failure, retry with exponential backoff (1s, 2s, 4s, 8s). 4) DLQ: after N retries, publish to a dead-letter topic. A separate process monitors DLQ and alerts/retries manually.",
      analogy: "Handling Kafka duplicates, ordering, and retries is like a reliable postal system. Idempotency is the recipient checking 'did I already receive letter #1234?' before acting on it. Message keys are like sorting mail by address — all letters for the same address go to the same postman (partition) who delivers them in order. The DLQ is the undeliverable mail office — letters that failed after multiple attempts go there for manual review.",
      example: "InvoiceService receives OrderPlaced. Tries to generate invoice — PDF service is down. Retries: 1s, 2s, 4s, 8s — all fail. After 4 retries, publishes to 'order-events-DLQ'. Alert fires. Ops team investigates. PDF service recovers. Message replayed from DLQ.",
      followUps: [
        { question: "What is at-least-once vs exactly-once delivery?", answer: "At-least-once: message delivered at least once, may be duplicated (default Kafka). Exactly-once: message delivered exactly once, no duplicates (Kafka transactions + idempotent producer). Exactly-once has performance overhead — use at-least-once with idempotent consumers for most cases." },
        { question: "How do you monitor a DLQ?", answer: "Set up alerts on DLQ consumer lag (messages accumulating = something is broken). Use Kafka consumer group metrics. Build a DLQ dashboard showing message count, error types, and timestamps. Have a replay mechanism to reprocess DLQ messages after fixing the root cause." }
      ],
      keyPoints: ["Idempotent consumers handle duplicate messages", "Message keys guarantee ordering per key", "Exponential backoff for retries", "DLQ captures poison messages after max retries"]
    },

    // ─── BATCH 7: Q31–35 – Database Design + Scalability ─────────────────────
    {
      id: 31,
      category: "System Design", difficulty: 2,
      topic: "7. Database Design",
      question: "Design schema for an Order and Payment system",
      simpleAnswer: "Orders and Payments are separate tables with a foreign key relationship. Each has its own status lifecycle and audit fields.",
      explanation: "Orders table: order_id (PK), user_id (FK), status (PENDING/CONFIRMED/CANCELLED), total_amount, created_at, updated_at. Order_Items table: item_id (PK), order_id (FK), product_id, quantity, unit_price. Payments table: payment_id (PK), order_id (FK), amount, currency, status (INITIATED/SUCCESS/FAILED/REFUNDED), payment_method, gateway_transaction_id, created_at. Index on order_id in Payments for fast lookup. Index on user_id in Orders for user order history.",
      analogy: "The Orders and Payments schema is like a restaurant's order ticket and receipt system. The order ticket (Orders table) tracks what was ordered and its status. The receipt (Payments table) tracks how it was paid. They're linked by the order number. The Outbox pattern is like the waiter writing the order on a ticket AND dropping a copy in the kitchen's inbox at the same time — both happen together or neither does.",
      example: "User places order → INSERT into orders (status=PENDING) → INSERT into order_items → POST to PaymentService → INSERT into payments (status=INITIATED) → payment succeeds → UPDATE payments SET status=SUCCESS → UPDATE orders SET status=CONFIRMED.",
      followUps: [
        { question: "How do you handle partial refunds?", answer: "Add a refunds table: refund_id, payment_id, amount, reason, status, created_at. A payment can have multiple partial refunds. Track total_refunded amount. Status: PENDING → PROCESSED. Link back to original payment_id." },
        { question: "How do you ensure order and payment are consistent?", answer: "Use the Outbox pattern: in the same DB transaction, save the order AND an outbox event. A separate process reads the outbox and publishes to Kafka. This ensures the event is published if and only if the DB write succeeds." }
      ],
      keyPoints: ["Separate Orders and Payments tables", "Index on user_id (order history) and order_id (payment lookup)", "gateway_transaction_id for reconciliation with payment provider", "Outbox pattern for consistent event publishing"]
    },
    {
      id: 32,
      category: "System Design", difficulty: 2,
      topic: "7. Database Design",
      question: "SQL vs NoSQL — when to use which?",
      simpleAnswer: "SQL: structured data with relationships and ACID transactions — use for financial data, orders, user accounts. NoSQL: flexible schema, high write throughput, horizontal scale — use for catalogs, sessions, logs, and social graphs.",
      explanation: "SQL (PostgreSQL, MySQL): ACID transactions, complex joins, strong consistency, fixed schema. Best for: financial data, user accounts, order management — anything needing consistency and relational integrity. NoSQL types and when to use each: 1) Document (MongoDB) — flexible schema, nested data, no joins needed. Best for: product catalogs, user profiles, CMS content. 2) Key-Value (Redis) — ultra-fast O(1) reads/writes. Best for: caching, sessions, rate limiting, leaderboards. 3) Wide-Column (Cassandra) — high write throughput, time-series, partition by time or ID. Best for: logs, IoT data, order event history. 4) Graph (Neo4j) — relationship-heavy queries. Best for: social networks, recommendation engines, fraud detection. Polyglot persistence: in microservices, each service picks the best DB for its data shape — OrderService uses PostgreSQL, CatalogService uses MongoDB, SessionService uses Redis.",
      analogy: "SQL is like a well-organized spreadsheet with strict column types and formulas that enforce relationships. NoSQL is like a flexible notebook where each page can have a completely different format. Use the spreadsheet when data integrity and relationships matter. Use the notebook when you need flexibility, speed, or the data doesn't fit neatly into rows and columns.",
      example: "E-commerce: PostgreSQL for orders and payments (ACID needed). MongoDB for product catalog (flexible attributes per category — shoes have size, TVs have resolution). Redis for cart and sessions (fast key-value). Cassandra for order event history (high write, time-series). Elasticsearch for product search.",
      followUps: [
        { question: "Can you use both SQL and NoSQL in the same system?", answer: "Yes — polyglot persistence. Each service picks the best DB for its needs. OrderService uses PostgreSQL, CatalogService uses MongoDB, SessionService uses Redis. This is a microservices best practice — don't force one DB to do everything." },
        { question: "What are the downsides of NoSQL?", answer: "No ACID transactions across documents (though MongoDB 4+ supports multi-document transactions). No complex joins. Eventual consistency in distributed setups. Schema flexibility can lead to data quality issues without validation." }
      ],
      keyPoints: ["SQL: ACID, relationships, structured data, strong consistency", "NoSQL Document (MongoDB): flexible schema, nested data, no joins", "NoSQL Key-Value (Redis): O(1) reads/writes, caching and sessions", "NoSQL Wide-Column (Cassandra): high write throughput, time-series data"]
    },
    {
      id: 33,
      category: "System Design", difficulty: 2,
      topic: "7. Database Design",
      question: "What is indexing strategy? How do you scale a DB?",
      simpleAnswer: "Indexes speed up reads by creating a sorted data structure on a column. Scale DB with read replicas, connection pooling, caching, and eventually sharding.",
      explanation: "Indexing: Create indexes on columns used in WHERE, JOIN, and ORDER BY clauses. B-tree index for equality and range queries. Composite index for multi-column queries (order matters). Avoid over-indexing — each index slows down writes. Use EXPLAIN to analyze query plans. Scaling: 1) Vertical scaling — bigger server (limited). 2) Read replicas — route read queries to replicas. 3) Connection pooling (PgBouncer) — reuse connections. 4) Caching (Redis) — cache frequent queries. 5) Sharding — partition data across multiple DB instances.",
      analogy: "A database index is like the index at the back of a textbook — it lets you jump directly to the right page instead of reading every page. Read replicas are like making photocopies of the textbook so multiple people can read simultaneously. Caching is like keeping the most-read pages on your desk. Sharding is like splitting the textbook into volumes and storing each volume in a different library.",
      example: "Orders table: index on user_id (for 'get my orders'), index on status+created_at (for 'get pending orders by date'). Scale: 80% of traffic is reads → add 2 read replicas → route SELECT queries to replicas → write queries to primary. Cache 'get order by ID' in Redis with 5-min TTL.",
      followUps: [
        { question: "What is the N+1 query problem?", answer: "Fetching a list of N items and then making N additional queries to fetch related data for each item. Fix with JOIN or batch loading (JPA @BatchSize, Hibernate fetch joins). N+1 is a common performance killer." },
        { question: "When should you shard a database?", answer: "When a single DB instance can't handle the write load or data volume, even with replicas and caching. Sharding adds significant complexity — exhaust all other options first. Common shard keys: user_id, tenant_id, geographic region." }
      ],
      keyPoints: ["Index on WHERE, JOIN, ORDER BY columns", "Read replicas for read-heavy workloads", "Redis cache reduces DB load for frequent queries", "Sharding is last resort — adds significant complexity"]
    },
    {
      id: 34,
      category: "System Design", difficulty: 2,
      topic: "8. Scalability & Performance",
      question: "How will you scale your system horizontally? What is load balancing?",
      simpleAnswer: "Horizontal scaling adds more instances of a service. A load balancer distributes incoming requests across all instances — ensuring no single instance is overwhelmed.",
      explanation: "Horizontal scaling (scale out): add more servers/pods running the same service. Stateless services scale easily — any instance can handle any request. Stateful services need session affinity or externalized state (Redis). Load balancer algorithms: Round Robin (default), Least Connections (routes to least busy), IP Hash (sticky sessions). In Kubernetes, Horizontal Pod Autoscaler (HPA) automatically scales pods based on CPU/memory metrics.",
      analogy: "Horizontal scaling is like opening more checkout lanes at a supermarket when the queues get long. A load balancer is the staff member who directs customers to the shortest queue. HPA in Kubernetes is like a manager who automatically opens new lanes when queues exceed a threshold and closes them when the store quiets down — all without manual intervention.",
      example: "OrderService handles 1000 req/s with 2 instances. Traffic spikes to 3000 req/s. HPA detects high CPU → scales to 6 instances. Load balancer distributes requests round-robin across all 6. Traffic drops → HPA scales back to 2. Zero manual intervention.",
      followUps: [
        { question: "What is the difference between horizontal and vertical scaling?", answer: "Vertical (scale up): bigger machine, more CPU/RAM. Has a ceiling and requires downtime. Horizontal (scale out): more machines. No ceiling, no downtime, but requires stateless design and a load balancer." },
        { question: "How do you handle session state when scaling horizontally?", answer: "Externalize session state to Redis. All instances share the same Redis — any instance can serve any user's request. Never store session in local memory when running multiple instances." }
      ],
      keyPoints: ["Horizontal scaling: more instances, stateless design required", "Load balancer distributes requests across instances", "HPA in Kubernetes for automatic scaling", "Externalize state to Redis for stateless services"]
    },
    {
      id: 35,
      category: "System Design", difficulty: 2,
      topic: "8. Scalability & Performance",
      question: "What is caching? Where to use Redis? What is the CAP theorem?",
      simpleAnswer: "Caching stores frequently accessed data in fast memory to reduce DB load. Redis is used for caching, sessions, rate limiting, and pub/sub. CAP theorem says a distributed system can only guarantee 2 of 3: Consistency, Availability, Partition Tolerance.",
      explanation: "Caching patterns: 1) Cache-Aside (Lazy): app checks cache first, on miss reads DB and populates cache. 2) Write-Through: write to cache and DB simultaneously. 3) Write-Behind: write to cache, async write to DB. Redis use cases: session storage, API response cache, rate limiter counters, leaderboards (sorted sets), pub/sub, distributed locks. CAP: P (partition tolerance) is always required in distributed systems. So you choose: CP (consistent but may be unavailable during partition — like ZooKeeper) or AP (available but may return stale data — like Cassandra, DynamoDB).",
      analogy: "CAP theorem is like a bank during a network outage between branches. A CP bank refuses to process transactions if it can't confirm with headquarters — consistent but unavailable. An AP bank lets you withdraw cash even during the outage, accepting that the balance might be slightly stale — always available but eventually consistent. Network outages will happen, so you must choose which guarantee matters more for your use case.",
      example: "Cache-Aside: GET /products/123 → check Redis → miss → query DB → store in Redis with TTL 10min → return. Next request → Redis hit → return in <1ms. CAP: Kafka is AP — during a partition, it stays available but may have replication lag. PostgreSQL with synchronous replication is CP.",
      followUps: [
        { question: "What is cache invalidation and why is it hard?", answer: "Cache invalidation is updating or removing cached data when the source data changes. Hard because: when to invalidate? How to invalidate across multiple cache nodes? TTL-based expiry is simple but may serve stale data. Event-driven invalidation is accurate but complex." },
        { question: "What does BASE mean in NoSQL?", answer: "Basically Available, Soft state, Eventually consistent. The NoSQL alternative to ACID. Systems choose availability over strict consistency — data will eventually be consistent across nodes, but may be temporarily stale." }
      ],
      keyPoints: ["Cache-Aside is the most common caching pattern", "Redis: cache, sessions, rate limiting, pub/sub, locks", "CAP: choose CP or AP — can't have both during partition", "TTL prevents stale data buildup in cache"]
    },

    // ─── BATCH 8: Q36–40 – Advanced Patterns + Maven/Config ──────────────────
    {
      id: 36,
      category: "System Design", difficulty: 2,
      topic: "9. Reliability & Delivery Patterns",
      question: "What are Circuit Breaker, Retry, and Bulkhead patterns?",
      simpleAnswer: "Circuit Breaker stops calls to a failing service. Retry retries failed calls with backoff. Bulkhead isolates failures by limiting concurrent calls per downstream service — preventing one slow service from consuming all threads.",
      explanation: "Circuit Breaker: CLOSED → OPEN → HALF-OPEN. Stops cascading failures. Retry: retries transient failures (network blip) with exponential backoff + jitter. Don't retry non-transient errors (400 Bad Request). Bulkhead: like a ship's bulkhead — if one compartment floods, others stay dry. Limit thread pool or semaphore per downstream service. If PaymentService is slow, it only uses its allocated 10 threads — OrderService's other operations (calling InventoryService) are unaffected. All three are in Resilience4j.",
      analogy: "These three patterns are like a ship's safety systems. The circuit breaker is the emergency shutoff valve — when a pipe bursts (service fails), it closes to stop the flood. Retry with backoff is the repair crew that tries to fix the pipe, waiting longer between each attempt. The bulkhead is the watertight compartment — even if one section floods, the rest of the ship stays dry.",
      example: "OrderService calls PaymentService and InventoryService. Without Bulkhead: PaymentService hangs → all 200 threads stuck waiting → InventoryService calls also fail. With Bulkhead: PaymentService gets 20 threads, InventoryService gets 20 threads. PaymentService hangs → only its 20 threads affected → InventoryService still works fine.",
      followUps: [
        { question: "How do you configure these in Spring Boot?", answer: "Use Resilience4j: @CircuitBreaker(name='paymentService', fallbackMethod='paymentFallback'), @Retry(name='paymentService'), @Bulkhead(name='paymentService'). Configure thresholds in application.yml under resilience4j section." },
        { question: "What is the difference between Bulkhead and Rate Limiter?", answer: "Bulkhead limits concurrent calls (how many at the same time). Rate Limiter limits calls per time window (how many per second). Bulkhead prevents thread exhaustion. Rate Limiter prevents overloading a downstream service." }
      ],
      keyPoints: ["Circuit Breaker: stops calls to failing service", "Retry: handles transient failures with backoff", "Bulkhead: isolates thread pools per downstream service", "All three available in Resilience4j for Spring Boot"]
    },
    {
      id: 37,
      category: "System Design", difficulty: 2,
      topic: "9. Reliability & Delivery Patterns",
      question: "What is Backpressure in Kafka? What are Idempotency keys and Distributed Locking?",
      simpleAnswer: "Backpressure: consumer controls its consumption rate to avoid being overwhelmed. Idempotency keys ensure an operation is performed exactly once. Distributed locking ensures only one instance performs a critical operation at a time.",
      explanation: "Backpressure in Kafka: consumers pull at their own pace — if processing is slow, they simply poll less frequently. Configure max.poll.records to limit batch size. Use pause()/resume() on partitions if overwhelmed. Idempotency keys: client sends a unique key with each request. Server checks if key was already processed — if yes, return cached result. Prevents duplicate charges, duplicate orders. Distributed locking with Redis: SETNX (SET if Not eXists) with TTL. Only one instance gets the lock. Use Redisson library for robust distributed locks in Java.",
      analogy: "Kafka backpressure is like a factory worker who only picks up the next box when they've finished the current one — they control their own pace. Idempotency keys are like a bank's duplicate transaction detection — submitting the same payment form twice only charges you once. A distributed lock is like a single key to a shared office — only one person can hold it at a time, and it auto-returns after a set time if they forget to give it back.",
      example: "Idempotency: Payment request includes idempotency-key: 'order-123-pay'. PaymentService checks Redis: key exists? Return previous result. Key missing? Process payment, store result in Redis with key. Distributed lock: ScheduledJob uses Redis lock 'job:daily-report'. Only one pod acquires it and runs the job. Others skip.",
      followUps: [
        { question: "What happens if the lock holder crashes before releasing the lock?", answer: "The lock has a TTL (e.g., 30 seconds). After TTL expires, the lock is automatically released and another instance can acquire it. Always set a TTL on distributed locks to prevent deadlocks." },
        { question: "How does Kafka handle backpressure compared to RabbitMQ?", answer: "Kafka: consumers pull — natural backpressure, consumer controls pace. RabbitMQ: broker pushes to consumers — can overwhelm slow consumers. RabbitMQ has prefetch count to limit unacknowledged messages, but Kafka's pull model is inherently better for backpressure." }
      ],
      keyPoints: ["Kafka pull model = natural backpressure", "Idempotency keys prevent duplicate operations", "Redis SETNX for distributed locking", "Always set TTL on distributed locks to prevent deadlocks"]
    },
    {
      id: 38,
      category: "System Design", difficulty: 2,
      topic: "11. Build & Dependency Management",
      question: "What is Maven? What is pom.xml? What are dependency scopes?",
      simpleAnswer: "Maven is a build tool that manages dependencies, compiles code, runs tests, and packages your application. pom.xml is the configuration file. Dependency scope controls when a dependency is available.",
      explanation: "Maven lifecycle: validate → compile → test → package → verify → install → deploy. pom.xml defines: project coordinates (groupId, artifactId, version), dependencies, plugins, build configuration. Dependency scopes: compile (default — available everywhere), test (only during testing, not in final JAR), provided (available at compile time but provided by runtime environment — like servlet-api in Tomcat), runtime (not needed for compilation but needed at runtime — like JDBC driver). Spring Boot parent POM manages versions of all common dependencies.",
      analogy: "Maven is like a professional chef's mise en place system. The pom.xml is the recipe card — it lists every ingredient (dependency) needed and in what quantity (version). Dependency scopes are like storage locations: compile-scope ingredients are always on the counter (available everywhere), test-scope ingredients are only in the test kitchen (not shipped to customers), and provided-scope ingredients are already in the restaurant's pantry (the server provides them).",
      example: "scope=test: JUnit, Mockito — not included in production JAR. scope=provided: javax.servlet-api — Tomcat provides it at runtime. scope=runtime: mysql-connector-java — not needed to compile, but needed to run. scope=compile: spring-boot-starter-web — needed everywhere.",
      followUps: [
        { question: "What is transitive dependency and how do you resolve conflicts?", answer: "Transitive dependency: if A depends on B, and B depends on C, then A transitively depends on C. Conflict: two dependencies require different versions of C. Maven uses 'nearest wins' — the version closest to your project in the dependency tree wins. Use <exclusions> to exclude unwanted transitive deps, then explicitly declare the version you want." },
        { question: "What is the difference between dependencies and dependencyManagement?", answer: "dependencies: actually adds the dependency to your project. dependencyManagement: declares versions centrally (in parent POM) without adding the dependency. Child modules inherit the version but must still declare the dependency in their own <dependencies> section." }
      ],
      keyPoints: ["compile: everywhere, test: test only, provided: runtime provides it, runtime: not for compile", "pom.xml: project config, dependencies, plugins", "Spring Boot parent POM manages all dependency versions", "dependencyManagement: centralize versions without adding deps"]
    },
    {
      id: 39,
      category: "System Design", difficulty: 2,
      topic: "12. Configuration & Profiles",
      question: "application.properties vs application.yml? What is property resolution order?",
      simpleAnswer: "Both configure Spring Boot apps. YAML supports nested structure and is more readable. Property resolution order: command-line args > environment variables > profile-specific files > application.properties.",
      explanation: "application.properties: flat key=value format. application.yml: hierarchical YAML format — easier to read for nested config. Profile-specific: application-dev.yml, application-prod.yml — activated by spring.profiles.active. Resolution order (highest to lowest priority): 1) Command-line args (--server.port=9090). 2) OS environment variables. 3) Profile-specific application-{profile}.yml. 4) application.yml/properties. 5) @PropertySource annotations. 6) Default values in @Value. This allows overriding config per environment without changing code.",
      analogy: "The property resolution order is like a chain of command. The general's orders (command-line args) override the colonel's (env vars), who overrides the captain's (profile files), who overrides the lieutenant's (application.yml). YAML vs properties is like a nested folder structure versus a flat list — YAML's hierarchy makes complex config readable, while properties files are simpler for basic settings.",
      example: "application.yml: server.port=8080. application-prod.yml: server.port=443. Run with --spring.profiles.active=prod → port is 443. Run with --server.port=9090 → port is 9090 (command-line wins). Environment variable SERVER_PORT=7070 → port is 7070 (env var beats profile file).",
      followUps: [
        { question: "What is @ConfigurationProperties vs @Value?", answer: "@Value injects a single property: @Value('${server.port}'). @ConfigurationProperties binds a whole group of properties to a POJO: @ConfigurationProperties(prefix='app.kafka') — cleaner for multiple related properties, supports validation with @Validated." },
        { question: "What is bootstrap.yml and when is it used?", answer: "bootstrap.yml is loaded before application.yml — used in Spring Cloud for connecting to Config Server or Vault to fetch external configuration. The bootstrap context initializes first, fetches remote config, then the application context starts with that config." }
      ],
      keyPoints: ["YAML: hierarchical, readable. Properties: flat key=value", "Command-line > env vars > profile-specific > application.yml", "Profile-specific files: application-{profile}.yml", "@ConfigurationProperties for grouped config, @Value for single property"]
    },
    {
      id: 40,
      category: "System Design", difficulty: 2,
      topic: "14. Spring MVC Runtime Internals",
      question: "What happens internally when you hit an API? How does DispatcherServlet work?",
      simpleAnswer: "Request → Tomcat → DispatcherServlet → HandlerMapping (find controller) → HandlerAdapter (invoke method) → MessageConverter (serialize to JSON) → Response.",
      explanation: "Full flow: 1) HTTP request arrives at embedded Tomcat. 2) Tomcat passes to DispatcherServlet (the Front Controller). 3) DispatcherServlet asks HandlerMapping: which controller handles this URL? 4) HandlerMapping returns the controller method. 5) DispatcherServlet asks HandlerAdapter to invoke the method. 6) HandlerAdapter calls the @Controller method, resolves @RequestBody (Jackson deserializes JSON to Java object), @PathVariable, @RequestParam. 7) Controller returns a response object. 8) DispatcherServlet uses HttpMessageConverter (Jackson) to serialize the Java object to JSON. 9) Response sent back through Tomcat to client.",
      analogy: "DispatcherServlet is like the front desk of a large hotel. Every guest (HTTP request) checks in at the front desk. The front desk consults the room directory (HandlerMapping) to find which room (controller method) the guest should go to. A bellhop (HandlerAdapter) escorts the guest. The concierge (Jackson) translates between the guest's language (JSON) and the hotel's language (Java objects) in both directions.",
      example: "POST /orders with JSON body → Tomcat receives → DispatcherServlet → RequestMappingHandlerMapping finds OrderController.createOrder() → HandlerAdapter invokes it → Jackson deserializes request body to OrderRequest object → controller processes → returns OrderResponse → Jackson serializes to JSON → 201 Created response sent.",
      followUps: [
        { question: "What is the role of @RequestBody and how does Jackson work?", answer: "@RequestBody tells Spring to deserialize the HTTP request body into a Java object using the registered HttpMessageConverter (Jackson by default). Jackson uses ObjectMapper to map JSON fields to Java fields by name. Customize with @JsonProperty, @JsonIgnore, @JsonFormat." },
        { question: "What happens when Spring Boot starts internally?", answer: "main() → SpringApplication.run() → creates ApplicationContext → triggers @EnableAutoConfiguration → scans classpath for starter JARs → loads auto-configuration classes → creates and wires beans → starts embedded Tomcat → registers DispatcherServlet → application ready." }
      ],
      keyPoints: ["DispatcherServlet is the Front Controller — single entry point", "HandlerMapping resolves URL to controller method", "Jackson HttpMessageConverter handles JSON serialization", "Full chain: Tomcat → DispatcherServlet → HandlerMapping → Controller → Jackson → Response"]
    },

    // ─── BATCH 9: Q41–45 – Missing SOLID + Microservices gaps ────────────────
    {
      id: 41,
      category: "System Design", difficulty: 2,
      topic: "4. SOLID Principles",
      question: "Where did you violate SOLID in your project and how did you fix it?",
      simpleAnswer: "A common violation is a service class doing too much (SRP violation) — like a single OrderService handling order creation, payment, inventory update, and notification all in one method.",
      explanation: "Real example: Initially OrderService.placeOrder() was doing: validate order → charge payment → reduce inventory → send notification — all in one method, one class. This violates SRP (multiple reasons to change) and OCP (adding new step requires editing the method). Fix: extract PaymentService, InventoryService, NotificationService. OrderService orchestrates by publishing events to Kafka — each service reacts independently. Now adding a new step (e.g., loyalty points) means adding a new consumer, not editing OrderService.",
      analogy: "A SOLID violation is like a Swiss Army knife that also does your taxes, drives your car, and cooks dinner. It technically works, but when the knife blade breaks, you have to take the whole thing to the shop — including the tax software. Extracting responsibilities into separate services is like giving each tool its own handle. When the knife breaks, only the knife needs fixing.",
      example: "Before: OrderService.placeOrder() { validateOrder(); chargePayment(); reduceInventory(); sendEmail(); generateInvoice(); } — 5 responsibilities. After: OrderService.placeOrder() { validateOrder(); saveOrder(); kafkaTemplate.send('order-placed', event); } — 1 responsibility. Others react via Kafka.",
      followUps: [
        { question: "How do you identify SOLID violations during code review?", answer: "SRP: method/class doing too many unrelated things. OCP: switch/if-else on type to decide behavior. LSP: subclass throwing exceptions for methods it doesn't support. ISP: implementing interface methods with empty body or UnsupportedOperationException. DIP: 'new ConcreteClass()' inside business logic." },
        { question: "Is it always worth refactoring SOLID violations?", answer: "No — apply pragmatism. Fix violations in code that changes frequently or is hard to test. Don't over-engineer stable, simple code. Technical debt is acceptable when the cost of fixing exceeds the benefit." }
      ],
      keyPoints: ["SRP violation: one class doing too many things", "Fix: extract responsibilities into separate services", "Kafka helps enforce SRP — each service owns its reaction", "Refactor when code is hard to test or changes frequently"]
    },
    {
      id: 42,
      category: "System Design", difficulty: 2,
      topic: "5. Microservices Design",
      question: "How do microservices communicate? What is an API Gateway and why is it needed?",
      simpleAnswer: "Microservices communicate via REST (sync) or messaging like Kafka (async). An API Gateway is a single entry point for all clients — it handles routing, auth, rate limiting, and load balancing.",
      explanation: "Without API Gateway: clients call each service directly — they need to know all service URLs, handle auth per service, and deal with CORS. With API Gateway (Spring Cloud Gateway, Kong, AWS API Gateway): clients call one URL. Gateway routes to the right service, validates JWT tokens, applies rate limits, handles SSL termination, and aggregates responses. Also enables canary deployments and A/B testing by routing % of traffic to new versions.",
      analogy: "An API Gateway is like a hotel concierge desk. Without it, guests (clients) would wander the hotel knocking on every department's door directly — housekeeping, room service, the spa. With the concierge, guests make one call. The concierge knows where everything is, checks your room key (JWT), and routes you to the right department. Guests never need to know the hotel's internal layout.",
      example: "Mobile app calls api.myapp.com/orders → API Gateway validates JWT → routes to OrderService:8081. api.myapp.com/users → routes to UserService:8082. api.myapp.com/payments → routes to PaymentService:8083. Client knows only one URL. All auth happens at the gateway.",
      followUps: [
        { question: "What is the difference between API Gateway and Load Balancer?", answer: "Load Balancer distributes traffic across instances of the same service (layer 4/7). API Gateway routes traffic to different services based on path/headers, and adds cross-cutting concerns like auth, rate limiting, and logging (layer 7, application-aware)." },
        { question: "What are the risks of API Gateway?", answer: "Single point of failure — must be highly available (run multiple instances). Can become a bottleneck if it does too much logic. Keep it thin — routing, auth, rate limiting only. Business logic belongs in services." }
      ],
      keyPoints: ["API Gateway: single entry point for all clients", "Handles routing, JWT validation, rate limiting, SSL", "Prevents clients from knowing internal service topology", "Must be highly available — run multiple instances"]
    },
    {
      id: 43,
      category: "System Design", difficulty: 2,
      topic: "5. Microservices Design",
      question: "How do you ensure idempotency in microservices?",
      simpleAnswer: "Idempotency means performing the same operation multiple times produces the same result. Implement it using idempotency keys — store the key and result on first execution, return cached result on duplicates.",
      explanation: "Why needed: network retries, Kafka at-least-once delivery, and client retries can cause the same request to arrive multiple times. Without idempotency: duplicate payments, duplicate orders, duplicate emails. Implementation: 1) Client sends a unique idempotency-key header (UUID). 2) Server checks DB/Redis: has this key been processed? 3) If yes: return stored result. 4) If no: process, store key+result, return result. TTL on the key (e.g., 24 hours). For Kafka consumers: check if event ID already processed before acting.",
      analogy: "Idempotency is like a bank's duplicate transaction detection. If you accidentally submit the same payment form twice (network retry), the bank checks the transaction reference number. If it's already been processed, it returns the same confirmation without charging you again. The reference number is your idempotency key — it makes the operation safe to repeat.",
      example: "Payment request: POST /payments with header Idempotency-Key: 'uuid-abc-123'. PaymentService: SELECT * FROM idempotency_keys WHERE key='uuid-abc-123'. Found → return stored response. Not found → process payment → INSERT into idempotency_keys → return response. Network retry sends same request → returns same response, no double charge.",
      followUps: [
        { question: "What is the difference between idempotent and safe HTTP methods?", answer: "Safe: no side effects (GET, HEAD). Idempotent: same result if called multiple times (GET, PUT, DELETE — but not POST). POST is not idempotent by default — that's why we add idempotency keys for payment and order creation APIs." },
        { question: "How do you handle idempotency for Kafka consumers?", answer: "Store processed event IDs in a DB table or Redis set. Before processing: check if event ID exists. If yes: skip (already processed). If no: process and store the ID. Use the Kafka message key or a business ID (orderId) as the idempotency key." }
      ],
      keyPoints: ["Idempotency key: UUID sent by client with each request", "Server stores key+result on first execution", "Duplicate requests return cached result — no side effects", "Critical for payments, order creation, and Kafka consumers"]
    },
    {
      id: 44,
      category: "System Design", difficulty: 2,
      topic: "7. Database Design",
      question: "What is database sharding? When and how do you shard?",
      simpleAnswer: "Sharding splits a large database horizontally across multiple DB instances — each shard holds a subset of the data. Used when a single DB can't handle the data volume or write throughput.",
      explanation: "Shard key determines which shard a record goes to. Common strategies: 1) Range-based — shard by ID range (1–1M on shard1, 1M–2M on shard2). Simple but can cause hot spots. 2) Hash-based — hash(shardKey) % numShards. Even distribution but range queries are hard. 3) Directory-based — a lookup table maps keys to shards. Flexible but adds a lookup hop. Challenges: cross-shard joins are hard, distributed transactions across shards are complex, resharding is painful. Exhaust vertical scaling, read replicas, and caching before sharding.",
      analogy: "Database sharding is like splitting a massive encyclopedia into volumes stored in different libraries. Volume A-F is in Library 1, G-M in Library 2, N-Z in Library 3. When you look up 'Java', you go directly to Library 2 — you don't search all three. Each library handles its own queries independently, so the load is spread. The downside: if you need entries from multiple volumes, you have to visit multiple libraries and combine the results yourself.",
      example: "User table with 1 billion rows. Shard by user_id: hash(user_id) % 4 → 4 shards. user_id=1001 → hash → shard2. All queries for user_id=1001 go to shard2. Adding a 5th shard requires rehashing — use consistent hashing to minimize data movement.",
      followUps: [
        { question: "What is consistent hashing and why is it used for sharding?", answer: "Consistent hashing places shards on a ring. Adding/removing a shard only moves a fraction of keys (1/N) instead of rehashing everything. Used by Cassandra, DynamoDB, and Redis Cluster to minimize data movement during scaling." },
        { question: "What are the alternatives to sharding?", answer: "1) Read replicas for read-heavy workloads. 2) Caching (Redis) to reduce DB load. 3) Vertical scaling (bigger machine). 4) Archiving old data to cold storage. 5) NoSQL databases (Cassandra, DynamoDB) that shard automatically. Try all of these before manual sharding." }
      ],
      keyPoints: ["Sharding splits data horizontally across multiple DB instances", "Shard key determines which shard holds the data", "Hash-based: even distribution. Range-based: simple but hot spots", "Last resort — exhaust replicas, caching, and vertical scaling first"]
    },
    {
      id: 45,
      category: "System Design", difficulty: 2,
      topic: "8. Scalability & Performance",
      question: "What is a CDN and when do you need one?",
      simpleAnswer: "A CDN (Content Delivery Network) is a globally distributed network of servers that caches and serves static content from the location closest to the user — reducing latency and origin server load.",
      explanation: "Without CDN: every user request for images, JS, CSS, videos hits your origin server — high latency for users far away, high bandwidth cost. With CDN: static assets are cached at edge nodes worldwide. User in Mumbai gets content from a Mumbai edge node, not your US server. CDN also provides DDoS protection, SSL termination, and automatic compression. Use CDN for: static assets (images, CSS, JS), video streaming, file downloads, and API responses that are the same for all users.",
      analogy: "A CDN is like a chain of convenience stores stocked with the most popular items from a central warehouse. Instead of every customer driving to the warehouse (origin server) for a bottle of water, the local store (edge node) has it in stock. The warehouse only gets involved when the store runs out (cache miss) or when new stock arrives (cache invalidation). Customers get their water in 2 minutes instead of 2 hours.",
      example: "E-commerce site: product images served via CloudFront CDN. User in London → nearest CDN edge (Frankfurt) serves the image in 20ms instead of 200ms from US origin. Cache-Control: max-age=86400 → CDN caches for 24 hours. Origin only hit on cache miss or after TTL expires.",
      followUps: [
        { question: "How do you invalidate CDN cache when you update a file?", answer: "1) Cache busting: include file hash in filename (app.a3f9b2.js) — new file = new URL = automatic cache miss. 2) CDN invalidation API: explicitly purge specific paths (CloudFront CreateInvalidation). 3) Short TTL for frequently changing content." },
        { question: "Can you use CDN for API responses?", answer: "Yes, for public, cacheable API responses (product listings, public profiles). Set Cache-Control headers. Not suitable for personalized or authenticated responses. Use Vary header to cache different versions per Accept-Language or Accept-Encoding." }
      ],
      keyPoints: ["CDN serves content from nearest edge node to user", "Reduces latency, bandwidth cost, and origin server load", "Use for static assets, videos, file downloads", "Cache busting via file hashing for automatic invalidation"]
    },

    // ─── BATCH 10: Q46–50 – Real Project Deep Dive ───────────────────────────
    {
      id: 46,
      category: "System Design", difficulty: 2,
      topic: "10. Real Project Deep Dive",
      question: "Explain your Kafka-based invoice system end-to-end",
      simpleAnswer: "OrderService publishes an OrderPlaced event to Kafka. InvoiceService consumes it, generates a PDF invoice, stores it in S3, saves metadata to DB, and publishes InvoiceGenerated event for downstream consumers.",
      explanation: "End-to-end flow: 1) Order is placed and saved to DB. 2) OrderService publishes OrderPlaced event to Kafka topic 'order-events' with orderId as the key (ensures all events for same order go to same partition — ordering guaranteed). 3) InvoiceService @KafkaListener consumes the event. 4) Idempotency check: SELECT from invoices WHERE order_id = ? — skip if already exists. 5) Generate PDF using a template engine (iText/Jasper). 6) Upload PDF to S3, get URL. 7) Save invoice record to DB (invoice_id, order_id, s3_url, status=GENERATED). 8) Publish InvoiceGenerated event. 9) NotificationService consumes InvoiceGenerated → emails PDF link to customer.",
      analogy: "The Kafka invoice system is like a factory assembly line triggered by a customer order. The order arrives (Kafka event), the line checks if this order was already processed (idempotency), builds the product (generates PDF), stores it in the warehouse (S3), logs it in the inventory system (DB), and sends a shipping notification (InvoiceGenerated event). If the line jams (failure), the item goes to a rework station (DLQ) instead of being lost.",
      example: "OrderService: kafkaTemplate.send('order-events', orderId.toString(), orderEvent). InvoiceService: @KafkaListener(topics='order-events', groupId='invoice-group') → check DB → generate PDF → S3.putObject() → save to DB → kafkaTemplate.send('invoice-events', invoiceEvent).",
      followUps: [
        { question: "What happens if PDF generation fails?", answer: "Retry with exponential backoff (Spring Kafka RetryTemplate). After max retries, publish to 'order-events-DLQ'. Alert fires. Ops team investigates. After fix, replay from DLQ. Invoice status stays PENDING until successfully generated." },
        { question: "How do you handle high order volume during sales?", answer: "Kafka buffers the load — InvoiceService processes at its own pace. Scale InvoiceService horizontally (add more instances = more consumers in the group = more partitions processed in parallel). Ensure topic has enough partitions to match max consumer count." }
      ],
      keyPoints: ["orderId as Kafka key — ordering guaranteed per order", "Idempotency check before generating invoice", "S3 for PDF storage, DB for metadata", "DLQ for failed invoice generation with alerting"]
    },
    {
      id: 47,
      category: "System Design", difficulty: 2,
      topic: "10. Real Project Deep Dive",
      question: "What was the biggest challenge you faced and how did you solve it?",
      simpleAnswer: "A common challenge in Kafka-based systems is duplicate message processing causing duplicate invoices — solved by implementing idempotency checks using the orderId as a unique key.",
      explanation: "Challenge: Kafka guarantees at-least-once delivery. During a consumer restart or rebalance, messages near the last committed offset could be redelivered. Without protection, InvoiceService would generate duplicate invoices for the same order. Solution: Before processing any event, check: SELECT COUNT(*) FROM invoices WHERE order_id = ?. If count > 0, log and skip. This idempotency check is wrapped in a transaction with the invoice insert — ensuring atomicity. Also added a UNIQUE constraint on order_id in the invoices table as a DB-level safety net.",
      analogy: "Duplicate Kafka message processing is like a postal worker who delivers the same letter twice because the first delivery confirmation got lost. Without protection, the recipient acts on both letters — double-charging a customer. The idempotency check is like the recipient checking their mailbox log: 'did I already receive letter #1234?' If yes, they acknowledge it and throw the duplicate away without acting on it again.",
      example: "Consumer restarts after processing order-123 but before committing offset. Kafka redelivers order-123 event. InvoiceService checks DB: invoice for order-123 already exists → skips processing → commits offset. No duplicate invoice. UNIQUE constraint on order_id catches any race condition.",
      followUps: [
        { question: "How did you test this scenario?", answer: "Unit test: mock the invoice repository to return an existing invoice, verify the service skips processing. Integration test: publish the same event twice to a test Kafka topic, verify only one invoice is created in the test DB." },
        { question: "What other challenges did you face?", answer: "Consumer lag during high load — solved by increasing partition count and adding more consumer instances. Message ordering issues — solved by using orderId as the Kafka message key so all events for the same order go to the same partition." }
      ],
      keyPoints: ["Duplicate processing from at-least-once delivery is a real challenge", "Idempotency check + UNIQUE DB constraint as dual protection", "Wrap check and insert in a transaction for atomicity", "Test with duplicate event publishing in integration tests"]
    },
    {
      id: 48,
      category: "System Design", difficulty: 2,
      topic: "10. Real Project Deep Dive",
      question: "How did you debug a production issue in your Kafka system?",
      simpleAnswer: "Use consumer lag monitoring, distributed tracing, structured logging with correlation IDs, and Kafka topic inspection to trace a message from producer to consumer.",
      explanation: "Debugging steps: 1) Check consumer lag (Kafka consumer group metrics) — is the consumer falling behind? 2) Check application logs with correlation ID (orderId/traceId) to trace the specific message. 3) Use distributed tracing (Zipkin/Jaeger) to see the full request path. 4) Inspect the Kafka topic directly using kafka-console-consumer to see what messages are in the topic. 5) Check DLQ — are messages ending up there? 6) Check DB for partial state (order exists but no invoice). 7) Reproduce in staging with the same message payload.",
      analogy: "Debugging a Kafka production issue is like being a detective at a crime scene. Consumer lag is the first clue — is the suspect (consumer) falling behind? The correlation ID is the fingerprint that links evidence (logs) across multiple crime scenes (services). kafka-console-consumer is like directly examining the crime scene (topic) to see what evidence is there. The DLQ is the evidence locker — failed messages preserved for investigation.",
      example: "Alert: invoices not being generated for orders placed in last 30 minutes. Steps: Check consumer lag → lag is 50,000 messages (consumer is stuck). Check logs → NullPointerException in PDF generator for orders with null shipping address. Fix: add null check. Deploy. Consumer resumes. Replay DLQ messages. All invoices generated.",
      followUps: [
        { question: "What monitoring do you set up for a Kafka-based system?", answer: "Consumer lag per consumer group (alert if lag > threshold). DLQ message count (alert if > 0). Processing rate (messages/second). Error rate in application logs. End-to-end latency (time from event published to invoice generated). Use Prometheus + Grafana or Datadog." },
        { question: "How do you use correlation IDs for debugging?", answer: "Generate a unique traceId (UUID) when a request enters the system. Pass it in Kafka message headers. Log it in every service that processes the message. When debugging, search logs by traceId to see the complete journey of a specific order across all services." }
      ],
      keyPoints: ["Consumer lag is the first metric to check", "Correlation ID / traceId links logs across services", "kafka-console-consumer to inspect topic messages directly", "DLQ inspection reveals failed messages and error patterns"]
    },
    {
      id: 49,
      category: "System Design", difficulty: 2,
      topic: "10. Real Project Deep Dive",
      question: "How did you optimize performance in your system?",
      simpleAnswer: "Key optimizations: Kafka batch processing, DB query optimization with indexes, Redis caching for frequent reads, and async processing to remove blocking operations from the critical path.",
      explanation: "1) Kafka batch processing: instead of processing one message at a time, process in batches (spring.kafka.listener.type=batch) — reduces DB round trips. 2) DB indexing: added index on order_id and created_at in invoices table — query time dropped from 2s to 10ms. 3) Redis caching: cached frequently read config data (tax rates, template configs) with 1-hour TTL — eliminated repeated DB calls. 4) Async PDF generation: moved PDF upload to S3 to a separate async thread — reduced invoice processing time by 40%. 5) Connection pooling: tuned HikariCP pool size to match DB capacity.",
      analogy: "Performance optimization is like tuning a race car. You don't replace the whole car — you identify the slowest component (profiling), fix that specific part, and measure the lap time improvement. Batch DB inserts are like refueling once for 10 laps instead of stopping every lap. Redis caching is like pre-loading the fuel so you never have to stop at all. Async S3 upload is like having a pit crew work on the car while it's still moving.",
      example: "Before optimization: processing 100 orders/minute, each taking 800ms (DB query 200ms + PDF gen 400ms + S3 upload 200ms). After: batch DB inserts (50ms for 10 records), Redis cache for config (0ms), async S3 upload (non-blocking) → 150ms per order, 400 orders/minute.",
      followUps: [
        { question: "How do you identify performance bottlenecks?", answer: "Use APM tools (New Relic, Datadog) to find slow methods. Add timing logs around suspected slow operations. Use EXPLAIN on slow DB queries. Profile with Java Flight Recorder for CPU/memory hotspots. Check Kafka consumer lag for throughput issues." },
        { question: "What is the risk of batch processing in Kafka?", answer: "If the batch fails midway, you need to handle partial failures carefully. Either process the whole batch atomically (all or nothing) or track which records in the batch succeeded. Idempotency becomes even more important with batch processing." }
      ],
      keyPoints: ["Batch processing reduces DB round trips significantly", "Index on query columns — biggest DB performance win", "Redis cache for frequently read, rarely changing data", "Async non-blocking operations for I/O-heavy tasks like S3 upload"]
    },
    {
      id: 50,
      category: "System Design", difficulty: 2,
      topic: "10. Real Project Deep Dive",
      question: "How did you handle failures in your batch processing system?",
      simpleAnswer: "Failures handled with retry logic, idempotent processing, DLQ for poison messages, and checkpoint-based resumption so batch jobs can restart from where they failed.",
      explanation: "Batch processing failure strategies: 1) Retry with backoff: transient failures (DB timeout, S3 unavailable) are retried automatically. 2) Skip and log: for non-critical records, log the failure and continue processing the rest of the batch. 3) DLQ: after max retries, move failed records to a dead letter queue for manual review. 4) Checkpointing: store the last successfully processed record ID — on restart, resume from that ID instead of reprocessing everything. 5) Idempotent processing: safe to reprocess any record — no side effects on duplicates.",
      analogy: "Batch processing with checkpointing is like reading a very long book with a bookmark. If you fall asleep at page 5,432, your bookmark saves your place. When you wake up, you start from page 5,432 — not from page 1. Idempotent processing means re-reading a page you already read doesn't cause any harm. The DLQ is like a 'pages I couldn't understand' pile — set aside for later review.",
      example: "Batch job processes 10,000 invoices. Fails at record 5,432 due to DB timeout. Checkpoint saved at 5,431. Job restarts → reads checkpoint → starts from record 5,432. DB timeout was transient → retries succeed → job completes. No duplicate invoices because of idempotency check.",
      followUps: [
        { question: "How does Spring Batch help with this?", answer: "Spring Batch provides built-in checkpointing (JobRepository stores step execution state), retry/skip policies, chunk-oriented processing (read-process-write in chunks), and restart capability. It handles most failure scenarios out of the box." },
        { question: "What is the difference between skip and retry in batch processing?", answer: "Retry: attempt the same record again (for transient errors like network timeout). Skip: give up on this record and move to the next (for data errors like invalid format). Configure skip limit and retry limit separately. Skipped records are logged for manual review." }
      ],
      keyPoints: ["Checkpointing enables restart from failure point", "Idempotent processing makes retries safe", "DLQ for records that fail after max retries", "Spring Batch provides built-in retry, skip, and checkpoint support"]
    },

    // ─── BATCH 11: Q51–55 – Maven Deep Dive ──────────────────────────────────
    {
      id: 51,
      category: "System Design", difficulty: 2,
      topic: "11. Build & Dependency Management",
      question: "What is the Maven lifecycle? What are clean, install, and package?",
      simpleAnswer: "Maven lifecycle is a sequence of phases executed in order. clean deletes the target folder. package compiles and packages into a JAR/WAR. install packages and copies to local Maven repository (~/.m2).",
      explanation: "Three built-in lifecycles: 1) default (main build): validate → compile → test → package → verify → install → deploy. 2) clean: pre-clean → clean → post-clean. 3) site: generates project documentation. Key phases: compile (compiles source code), test (runs unit tests), package (creates JAR/WAR in target/), install (copies JAR to local ~/.m2 repo so other local projects can use it), deploy (uploads to remote repo like Nexus/Artifactory). Running a phase runs all preceding phases too — mvn install runs validate, compile, test, package, then install.",
      analogy: "The Maven lifecycle is like a car assembly line with mandatory stations. Every car must pass through: design (validate), build the frame (compile), quality check (test), final assembly (package), internal delivery (install), and shipping to dealers (deploy). You can't skip stations — running 'install' automatically runs all previous stations first. 'clean' is like clearing the factory floor before starting a new production run.",
      example: "mvn clean package: deletes target/ → compiles → runs tests → creates target/myapp-1.0.jar. mvn clean install: same + copies JAR to ~/.m2/repository. mvn clean install -DskipTests: skips test phase. mvn deploy: uploads to Nexus for team to use.",
      followUps: [
        { question: "What is the difference between mvn package and mvn install?", answer: "package creates the JAR in the target/ folder of the current project. install does everything package does AND copies the JAR to your local Maven repository (~/.m2) so other local projects can declare it as a dependency." },
        { question: "What is a Maven plugin and how does it relate to lifecycle phases?", answer: "Plugins provide the actual implementation of lifecycle phases. Each phase is bound to a plugin goal. compile phase → maven-compiler-plugin:compile. test phase → maven-surefire-plugin:test. package phase → maven-jar-plugin:jar. You can bind custom plugin goals to any phase." }
      ],
      keyPoints: ["Lifecycle: validate → compile → test → package → install → deploy", "clean: deletes target/. package: creates JAR. install: copies to ~/.m2", "Running a phase runs all preceding phases", "Plugins implement the actual work for each phase"]
    },
    {
      id: 52,
      category: "System Design", difficulty: 2,
      topic: "11. Build & Dependency Management",
      question: "What is the Spring Boot Maven plugin? What is parent POM?",
      simpleAnswer: "Spring Boot Maven plugin packages your app as an executable fat JAR with all dependencies included. Parent POM (spring-boot-starter-parent) provides default dependency versions, plugin configs, and build settings.",
      explanation: "Spring Boot Maven plugin (spring-boot-maven-plugin): 1) Repackages the JAR to include all dependencies (fat/uber JAR). 2) Makes it executable: java -jar myapp.jar. 3) Provides spring-boot:run goal for running locally. 4) Handles layered JARs for Docker optimization. Parent POM (spring-boot-starter-parent): inherits from spring-boot-dependencies which defines versions for 300+ dependencies. You declare a dependency without a version — parent POM provides it. Ensures all dependencies are compatible with each other.",
      analogy: "The Spring Boot Maven plugin creating a fat JAR is like packing a self-contained camping kit. Instead of a thin backpack that requires you to find food, water, and shelter separately (thin JAR needing external dependencies), the fat JAR is a fully stocked kit — tent, food, water all included. You can drop it anywhere and it works. The parent POM is like a pre-approved shopping list that guarantees all items are compatible with each other.",
      example: "Without plugin: mvn package creates a thin JAR (no dependencies) — can't run standalone. With plugin: mvn spring-boot:repackage creates a fat JAR with Tomcat, Spring, Jackson all inside — java -jar app.jar just works. Parent POM: declare spring-boot-starter-web without version → parent provides 3.2.0.",
      followUps: [
        { question: "What is a fat JAR vs thin JAR?", answer: "Thin JAR: contains only your compiled classes — needs dependencies on classpath separately. Fat/Uber JAR: contains your classes + all dependencies bundled inside — self-contained, runs anywhere with just java -jar. Spring Boot creates fat JARs by default." },
        { question: "What if you can't use spring-boot-starter-parent as parent?", answer: "If your project already has a corporate parent POM, import spring-boot-dependencies as a BOM (Bill of Materials) in dependencyManagement with scope=import. You get version management without inheriting the parent." }
      ],
      keyPoints: ["spring-boot-maven-plugin creates executable fat JAR", "Parent POM manages 300+ dependency versions automatically", "Fat JAR: self-contained, runs with java -jar", "Use BOM import if you can't use parent POM directly"]
    },
    {
      id: 53,
      category: "System Design", difficulty: 2,
      topic: "11. Build & Dependency Management",
      question: "What is dependency conflict and how do you resolve it? What is the dependency tree?",
      simpleAnswer: "Dependency conflict occurs when two dependencies require different versions of the same library. Maven uses 'nearest wins' to resolve it. Use mvn dependency:tree to visualize the full dependency graph.",
      explanation: "Conflict example: your project uses LibA (requires jackson 2.14) and LibB (requires jackson 2.10). Maven picks the version nearest to your project in the dependency tree (nearest wins rule). If both are at the same depth, the first declared wins. Resolution strategies: 1) Explicitly declare the version you want in your pom.xml — it's at depth 1, always wins. 2) Use <exclusions> to exclude the unwanted transitive dependency. 3) Use dependencyManagement to centrally control versions. mvn dependency:tree shows the full tree with all transitive dependencies and which version was selected.",
      analogy: "A dependency conflict is like two colleagues both ordering office supplies, each requesting a different brand of the same item. Maven's 'nearest wins' rule is like the office manager saying 'whoever submitted the request first (or is closest to the top of the org chart) gets their brand'. mvn dependency:tree is the full org chart showing who ordered what and which version won — so you can spot and resolve conflicts.",
      example: "mvn dependency:tree output: [INFO] +- com.libA:libA:1.0 [INFO] |  \\- com.fasterxml.jackson:jackson-databind:2.14 [INFO] +- com.libB:libB:2.0 [INFO] |  \\- com.fasterxml.jackson:jackson-databind:2.10 (omitted for conflict). Maven picks 2.14 (first declared). To force 2.15: add explicit dependency in your pom.xml.",
      followUps: [
        { question: "How do you exclude a transitive dependency?", answer: "<dependency><groupId>com.libA</groupId><exclusions><exclusion><groupId>com.fasterxml.jackson.core</groupId><artifactId>jackson-databind</artifactId></exclusion></exclusions></dependency> — then declare the version you want explicitly." },
        { question: "What is the difference between dependency:tree and dependency:analyze?", answer: "dependency:tree shows the full dependency graph. dependency:analyze shows: 1) used but undeclared dependencies (you use them but rely on transitive inclusion — risky). 2) declared but unused dependencies (dead weight — should be removed)." }
      ],
      keyPoints: ["Nearest wins: version closest to your project in tree wins", "mvn dependency:tree visualizes full dependency graph", "Explicit declaration in pom.xml always wins (depth 1)", "<exclusions> to remove unwanted transitive dependencies"]
    },
    {
      id: 54,
      category: "System Design", difficulty: 2,
      topic: "11. Build & Dependency Management",
      question: "How does Spring Boot manage dependency versions? What are Spring Boot starters?",
      simpleAnswer: "Spring Boot uses a BOM (Bill of Materials) via spring-boot-starter-parent to manage compatible versions of all dependencies. Starters are curated dependency bundles for specific features.",
      explanation: "Version management: spring-boot-starter-parent → spring-boot-dependencies (BOM) defines exact versions for 300+ libraries. You declare spring-boot-starter-web without a version — Spring Boot provides the tested, compatible version. Starters: pre-packaged sets of dependencies for a feature. spring-boot-starter-web includes: Spring MVC, Tomcat, Jackson, validation. spring-boot-starter-data-jpa includes: Hibernate, Spring Data JPA, JDBC. spring-boot-starter-kafka includes: Spring Kafka, Kafka clients. One starter replaces 5–10 individual dependency declarations.",
      analogy: "Spring Boot's BOM is like a pre-approved vendor list at a company. Instead of each team independently researching and approving suppliers (managing dependency versions), the central procurement team (Spring Boot) has already vetted and approved a compatible set. Teams just pick from the approved list — no version negotiation needed. Starters are like pre-packaged supply kits: 'web development kit' includes everything you need, already approved and compatible.",
      example: "Without starters: declare spring-webmvc, tomcat-embed-core, jackson-databind, hibernate-validator separately — must manage compatible versions. With starter: just declare spring-boot-starter-web — Spring Boot pulls all compatible dependencies automatically. Add spring-boot-starter-test → JUnit 5, Mockito, AssertJ all included.",
      followUps: [
        { question: "What happens internally when you add a starter dependency?", answer: "Maven downloads the starter JAR (which is mostly just a pom.xml with dependencies). Maven resolves all transitive dependencies. Spring Boot's auto-configuration detects the JARs on the classpath and automatically configures beans — e.g., detecting spring-webmvc → auto-configures DispatcherServlet." },
        { question: "How do you exclude a dependency from a starter?", answer: "<dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-web</artifactId><exclusions><exclusion><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-tomcat</artifactId></exclusion></exclusions></dependency> — then add spring-boot-starter-jetty instead." }
      ],
      keyPoints: ["BOM manages 300+ compatible dependency versions", "Starters: curated bundles — one declaration replaces many", "Auto-configuration triggered by JARs on classpath", "Exclude starter sub-dependencies to swap implementations (Tomcat → Jetty)"]
    },
    {
      id: 55,
      category: "System Design", difficulty: 2,
      topic: "11. Build & Dependency Management",
      question: "How do you override a dependency version in Spring Boot?",
      simpleAnswer: "Declare the dependency explicitly in your pom.xml with the version you want — it overrides the parent POM's managed version. Or use a property that the parent POM exposes.",
      explanation: "Method 1 — Override via property (cleanest): spring-boot-starter-parent exposes version properties like <jackson.version>. Add <properties><jackson.version>2.15.0</jackson.version></properties> in your pom.xml. Method 2 — Explicit declaration: declare the dependency with your desired version in <dependencies> — nearest wins rule means your explicit version beats the managed version. Method 3 — dependencyManagement override: add the dependency in your <dependencyManagement> section with the desired version — overrides parent's managed version for your project.",
      analogy: "Overriding a Spring Boot managed version is like a company employee requesting an exception to the approved vendor list. You fill out a form (declare the version explicitly in pom.xml), explain why you need a different version (security fix), and your request takes priority over the standard list. But the procurement team (Spring Boot) warns you: deviating from the approved list means you're responsible for ensuring compatibility.",
      example: "Override Jackson version: <properties><jackson-bom.version>2.15.2</jackson-bom.version></properties>. Or explicit: <dependency><groupId>com.fasterxml.jackson.core</groupId><artifactId>jackson-databind</artifactId><version>2.15.2</version></dependency>. Check available properties: mvn help:effective-pom.",
      followUps: [
        { question: "How do you find what property name to use for overriding?", answer: "Run mvn help:effective-pom to see the full resolved POM including all inherited properties. Or check the spring-boot-dependencies POM on Maven Central — it lists all version properties like <logback.version>, <hibernate.version>, etc." },
        { question: "Is it safe to override Spring Boot managed versions?", answer: "Risky — Spring Boot tests all dependencies together for compatibility. Overriding one version can cause subtle incompatibilities. Only override when you have a specific reason (security fix, bug fix). Test thoroughly after overriding." }
      ],
      keyPoints: ["Override via property: <jackson-bom.version>2.15.2</jackson-bom.version>", "Explicit declaration in <dependencies> always wins", "mvn help:effective-pom shows all resolved versions and properties", "Overriding managed versions risks compatibility — test thoroughly"]
    },

    // ─── BATCH 12: Q56–60 – Config + Embedded Server + Internal Flow ─────────
    {
      id: 56,
      category: "System Design", difficulty: 2,
      topic: "13. Configuration Internals",
      question: "What is profile-specific configuration? What is @PropertySource? How does Spring read config internally?",
      simpleAnswer: "Profile-specific config: application-{profile}.yml activated by spring.profiles.active. @PropertySource loads custom property files. Spring reads config via Environment abstraction backed by PropertySources.",
      explanation: "Profile-specific: application-dev.yml (local DB), application-prod.yml (prod DB). Activate: --spring.profiles.active=prod or SPRING_PROFILES_ACTIVE=prod env var. @PropertySource: loads a custom .properties file into the Spring Environment — @PropertySource('classpath:custom.properties'). Environment abstraction: Spring's Environment interface provides unified access to all properties regardless of source (YAML, properties, env vars, system props). Internally: Spring creates a MutablePropertySources chain. Each source is checked in priority order. @Value and @ConfigurationProperties read from this chain.",
      analogy: "Profile-specific configuration is like a wardrobe with labeled outfits for different occasions. The 'dev' outfit is casual (local database, debug logging). The 'prod' outfit is formal (production database, minimal logging). You tell Spring which outfit to wear (spring.profiles.active=prod) and it dresses accordingly. The Environment abstraction is like a personal stylist who knows where every item is regardless of which wardrobe it came from.",
      example: "application.yml: spring.datasource.url=jdbc:h2:mem:test. application-prod.yml: spring.datasource.url=jdbc:postgresql://prod-db:5432/mydb. Run with --spring.profiles.active=prod → prod DB URL used. @PropertySource('classpath:email.properties') → loads email.host, email.port into Environment.",
      followUps: [
        { question: "What is the difference between @PropertySource and application.properties?", answer: "application.properties/yml is automatically loaded by Spring Boot. @PropertySource manually loads additional property files. Use @PropertySource for module-specific configs or legacy property files that aren't in the standard location." },
        { question: "What is environment abstraction in Spring?", answer: "The Environment interface abstracts all configuration sources — system properties, environment variables, application.yml, @PropertySource files. Your code calls environment.getProperty('key') without knowing which source it came from. This enables the same code to work in dev (file-based config) and prod (env var-based config)." }
      ],
      keyPoints: ["application-{profile}.yml activated by spring.profiles.active", "@PropertySource loads custom property files into Environment", "Environment abstraction unifies all config sources", "PropertySources chain checked in priority order"]
    },
    {
      id: 57,
      category: "System Design", difficulty: 2,
      topic: "13. Configuration Internals",
      question: "What is bootstrap context vs application context in Spring Boot?",
      simpleAnswer: "Bootstrap context loads first — it connects to external config sources (Config Server, Vault) and fetches configuration. Application context loads second using that fetched configuration.",
      explanation: "Used in Spring Cloud microservices. bootstrap.yml is loaded before application.yml. The bootstrap context initializes a minimal Spring context to: 1) Connect to Spring Cloud Config Server. 2) Fetch application configuration from the server. 3) Decrypt encrypted properties (if using Vault). Then the full application context starts with the fetched config already available. Without bootstrap context, your app would start before knowing its DB URL, Kafka brokers, etc. In Spring Boot 2.4+, bootstrap context is disabled by default — use spring.config.import instead.",
      analogy: "Bootstrap context is like a scout who goes ahead of the main army to set up camp. The scout (bootstrap context) connects to the supply depot (Config Server), fetches all the provisions (configuration), and sets everything up. Only then does the main army (application context) march in and start operations — already knowing where the food, weapons, and maps are. Without the scout, the army would arrive unprepared.",
      example: "bootstrap.yml: spring.cloud.config.uri=http://config-server:8888. App starts → bootstrap context connects to config-server → fetches application-prod.yml → application context starts with DB URL, Kafka config, API keys all loaded from config server. No secrets in your JAR.",
      followUps: [
        { question: "What is Spring Cloud Config Server?", answer: "A centralized configuration server that stores config files in Git. Microservices fetch their config on startup. Change config in Git → refresh endpoint or Spring Cloud Bus broadcasts the change to all services — no redeployment needed." },
        { question: "How is bootstrap context different in Spring Boot 2.4+?", answer: "Spring Boot 2.4+ deprecated bootstrap context in favor of spring.config.import. Instead of bootstrap.yml, use: spring.config.import=configserver:http://config-server:8888 in application.yml. Same functionality, cleaner approach." }
      ],
      keyPoints: ["Bootstrap context loads before application context", "Fetches config from Config Server or Vault", "bootstrap.yml configures the bootstrap context", "Spring Boot 2.4+: use spring.config.import instead"]
    },
    {
      id: 58,
      category: "System Design", difficulty: 2,
      topic: "14. Spring MVC Runtime Internals",
      question: "How does embedded Tomcat work? How to switch to Jetty or Undertow? What is the main method's role?",
      simpleAnswer: "Spring Boot embeds Tomcat inside the JAR — no external server needed. Switch by excluding Tomcat starter and adding Jetty/Undertow starter. The main method bootstraps the entire Spring application.",
      explanation: "Embedded Tomcat: spring-boot-starter-web includes spring-boot-starter-tomcat. Spring Boot auto-configuration creates a TomcatServletWebServerFactory bean, which starts an embedded Tomcat instance on port 8080 (configurable). Tomcat runs inside your JVM process — no WAR deployment needed. Switch to Jetty: exclude spring-boot-starter-tomcat, add spring-boot-starter-jetty. Spring Boot detects Jetty on classpath → uses JettyServletWebServerFactory instead. Main method role: calls SpringApplication.run(MyApp.class, args) → creates ApplicationContext → triggers auto-configuration → starts embedded server → app is ready.",
      analogy: "Embedded Tomcat is like a food truck versus a restaurant building. A traditional deployment is like a restaurant that needs a building (external Tomcat) before it can serve food. Spring Boot's embedded server is like a food truck — the kitchen is built into the vehicle. You drive it anywhere and start serving immediately. Switching to Jetty is like swapping the truck's engine — same vehicle, different powertrain.",
      example: "Switch to Jetty in pom.xml: <dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-web</artifactId><exclusions><exclusion><artifactId>spring-boot-starter-tomcat</artifactId></exclusion></exclusions></dependency> <dependency><groupId>org.springframework.boot</groupId><artifactId>spring-boot-starter-jetty</artifactId></dependency>",
      followUps: [
        { question: "Why would you switch from Tomcat to Undertow?", answer: "Undertow is non-blocking and has lower memory footprint — better for high-concurrency reactive applications. Tomcat is the safe default for traditional servlet-based apps. Jetty is lightweight and good for embedded use cases." },
        { question: "What happens if you deploy a Spring Boot app to an external Tomcat?", answer: "Change packaging to WAR, extend SpringBootServletInitializer, mark spring-boot-starter-tomcat as provided scope. The external Tomcat provides the servlet container — the embedded one is excluded. Less common now — fat JAR + Docker is the modern approach." }
      ],
      keyPoints: ["Embedded Tomcat runs inside JVM — no external server needed", "Switch server: exclude Tomcat starter, add Jetty/Undertow starter", "main() → SpringApplication.run() → ApplicationContext → embedded server starts", "Undertow: non-blocking, low memory. Jetty: lightweight. Tomcat: default"]
    },
    {
      id: 59,
      category: "System Design", difficulty: 2,
      topic: "14. Spring MVC Runtime Internals",
      question: "What happens internally when Spring Boot starts?",
      simpleAnswer: "SpringApplication.run() creates the ApplicationContext, triggers auto-configuration, scans for components, wires all beans, starts the embedded server, and calls ApplicationRunner/CommandLineRunner beans.",
      explanation: "Step by step: 1) main() calls SpringApplication.run(). 2) SpringApplication determines the application type (SERVLET, REACTIVE, NONE). 3) Loads SpringApplicationRunListeners (hooks for startup events). 4) Creates the Environment (loads application.yml, env vars). 5) Creates ApplicationContext (AnnotationConfigServletWebServerApplicationContext for web apps). 6) Loads @Configuration classes. 7) Triggers @EnableAutoConfiguration — scans META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports for auto-config classes. 8) Creates and wires all beans (dependency injection). 9) Starts embedded Tomcat. 10) Calls ApplicationRunner and CommandLineRunner beans. 11) Publishes ApplicationReadyEvent.",
      analogy: "Spring Boot startup is like opening a new store. The main() method is the owner turning the key. Auto-configuration is the store's smart inventory system that automatically stocks shelves based on what's in the warehouse (classpath). Bean creation is hiring and training staff. Starting embedded Tomcat is opening the front door. ApplicationReadyEvent is the 'Open' sign turning on — the store is ready for customers.",
      example: "You add spring-boot-starter-data-jpa → JPA JAR on classpath → auto-configuration detects it → JpaAutoConfiguration creates EntityManagerFactory, TransactionManager beans automatically → your @Repository beans get injected with EntityManager — zero XML config.",
      followUps: [
        { question: "What is @EnableAutoConfiguration and how does it work?", answer: "It reads META-INF/spring/org.springframework.boot.autoconfigure.AutoConfiguration.imports (Spring Boot 2.7+) — a list of auto-configuration classes. Each class has @Conditional annotations — only activates if certain conditions are met (e.g., @ConditionalOnClass(DataSource.class) — only if DataSource is on classpath)." },
        { question: "What is the difference between ApplicationRunner and CommandLineRunner?", answer: "Both run after the application context is fully started. CommandLineRunner receives args as String[]. ApplicationRunner receives args as ApplicationArguments (parsed, with named options). Use them for startup tasks: data initialization, cache warming, health checks." }
      ],
      keyPoints: ["Auto-configuration reads from AutoConfiguration.imports file", "@Conditional annotations control which auto-configs activate", "Beans created and wired after all @Configuration classes loaded", "ApplicationReadyEvent fired when app is fully started"]
    },
    {
      id: 60,
      category: "System Design", difficulty: 2,
      topic: "15. Request Flow & Serialization",
      question: "How is request mapping resolved? How does Jackson convert JSON?",
      simpleAnswer: "RequestMappingHandlerMapping scans all @Controller beans at startup and builds a map of URL patterns to handler methods. Jackson's ObjectMapper converts JSON to Java objects and back using reflection.",
      explanation: "Request mapping resolution: At startup, RequestMappingHandlerMapping scans all @Controller/@RestController beans, reads @RequestMapping/@GetMapping/@PostMapping annotations, and builds a registry. On each request, DispatcherServlet asks HandlerMapping: 'which method handles GET /orders/123?' — it matches URL pattern, HTTP method, headers, and content type. Jackson JSON conversion: @RequestBody → Jackson reads the request body as a String → ObjectMapper.readValue() → uses reflection to map JSON fields to Java object fields by name. @ResponseBody → ObjectMapper.writeValueAsString() → serializes Java object to JSON string → written to response body. Customize with @JsonProperty, @JsonIgnore, @JsonFormat.",
      analogy: "RequestMappingHandlerMapping is like a hotel's room directory built at check-in time. When the hotel opens (app starts), every room's purpose is registered. When a guest arrives (HTTP request), the front desk instantly knows which room handles their request. Jackson is the hotel's translator — it converts the guest's foreign language (JSON) into the hotel's language (Java objects) when they check in, and translates back when they check out.",
      example: "POST /orders with body {\"productId\":5,\"quantity\":2}. DispatcherServlet → RequestMappingHandlerMapping finds OrderController.createOrder(@RequestBody OrderRequest). Jackson: reads body → new OrderRequest() → sets productId=5, quantity=2 via reflection. Controller returns OrderResponse → Jackson serializes → {\"orderId\":101,\"status\":\"CREATED\"} → 201 response.",
      followUps: [
        { question: "What happens when Jackson can't find a matching field?", answer: "By default, Jackson ignores unknown JSON fields (DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES is false in Spring Boot). To fail on unknown fields: @JsonIgnoreProperties(ignoreUnknown=false) or configure ObjectMapper globally. Missing required fields result in null values unless @NotNull validation is added." },
        { question: "How do you customize Jackson's ObjectMapper in Spring Boot?", answer: "Define a @Bean of type Jackson2ObjectMapperBuilderCustomizer or ObjectMapper. Or use spring.jackson.* properties in application.yml: spring.jackson.serialization.write-dates-as-timestamps=false, spring.jackson.default-property-inclusion=non_null." }
      ],
      keyPoints: ["RequestMappingHandlerMapping builds URL→method registry at startup", "Matching considers URL, HTTP method, headers, content type", "Jackson ObjectMapper uses reflection for JSON↔Java conversion", "Customize with @JsonProperty, @JsonIgnore, or ObjectMapper bean"]
    },

    // ─── SCALABILITY FUNDAMENTALS ─────────────────────────────────────────────
    {
      id: 61,
      category: "System Design", difficulty: 2,
      topic: "1. HLD – Core Design",
      question: "What is the CAP Theorem?",
      simpleAnswer: "CAP Theorem says that in a distributed system, you can only fully guarantee 2 out of 3 things at the same time: Consistency, Availability, and Partition Tolerance.",
      explanation: "Consistency means every user always sees the same, up-to-date data. Availability means the system always responds, even if the data might be slightly old. Partition Tolerance means the system keeps working even if the network between servers breaks. The catch: network failures (partitions) WILL happen in any real distributed system. So you always have to choose between Consistency and Availability when a network problem occurs.",
      analogy: "CAP theorem is like a bank during a network outage between branches. A CP bank refuses to process transactions if it can't confirm with headquarters — you get an error, but the data is always correct. An AP bank lets you withdraw cash even during the outage, accepting that your balance might briefly show the wrong amount — you're always served, but data might be slightly stale. Network outages will happen, so you must choose which guarantee matters more.",
      example: "Your bank app: when you check your balance, you MUST see the correct number (Consistency is critical). A social media 'like' counter: it is okay if it shows 1,203 instead of 1,205 for a few seconds (Availability is fine, slight staleness is acceptable). Banks choose CP. Social media chooses AP.",
      followUps: [{ question: "Can you have all three — C, A, and P?", answer: "Only if your network never fails, which is impossible in the real world. In practice, you always have to pick CP (consistent but may be unavailable during network issues) or AP (always available but data might be slightly stale)." }],
      keyPoints: ["C = Consistency: everyone sees the same data", "A = Availability: system always responds", "P = Partition Tolerance: works even if network breaks", "Real systems must choose CP or AP — P is non-negotiable"]
    },
    {
      id: 62,
      category: "System Design", difficulty: 2,
      topic: "1. HLD – Core Design",
      question: "What is Consistent Hashing and why is it used?",
      simpleAnswer: "Consistent Hashing is a smart way to distribute data across multiple servers so that when you add or remove a server, only a small amount of data needs to move — not everything.",
      explanation: "Normal hashing: if you have 3 servers and use server = hash(key) % 3, adding a 4th server changes the formula to % 4. Suddenly almost every key maps to a different server — you have to move almost all your data. Consistent hashing fixes this by imagining all servers on a circle (ring). Each key is placed on the ring and assigned to the nearest server clockwise. When you add a server, only the keys between the new server and its predecessor move. Everything else stays put.",
      analogy: "Consistent hashing is like assigning postal routes on a circular map. Each postman (server) covers a section of the circle. When a new postman joins, they only take over the section between themselves and the previous postman — everyone else keeps their existing routes. Normal hashing is like reassigning all routes from scratch every time someone joins or leaves — chaotic and expensive.",
      example: "You have 3 Redis cache servers. User 'Nikhil' always goes to Server 2 (based on ring position). You add Server 4. Only users whose ring position falls between Server 3 and Server 4 move to Server 4. User 'Nikhil' stays on Server 2. Only ~25% of data moves instead of ~75%.",
      followUps: [{ question: "Where is consistent hashing used in real systems?", answer: "Distributed caches (Redis Cluster, Memcached), Kafka partition assignment, load balancers, and distributed databases like Cassandra and DynamoDB all use consistent hashing or similar ring-based approaches." }],
      keyPoints: ["Distributes data across servers using a virtual ring", "Adding/removing a server moves only a small fraction of data", "Normal hashing moves almost all data when servers change", "Used in Redis Cluster, Kafka, Cassandra, and CDNs"]
    },
    {
      id: 63,
      category: "System Design", difficulty: 2,
      topic: "1. HLD – Core Design",
      question: "What is database sharding?",
      simpleAnswer: "Sharding means splitting a very large database table across multiple separate databases (shards), so each database only holds a portion of the data and can be on a different server.",
      explanation: "Imagine you have 1 billion users. One database server cannot handle that. With sharding, you split by user ID: users 1–250M go to Shard 1, users 250M–500M go to Shard 2, and so on. Each shard is a completely separate database on its own server. Queries for a specific user only hit one shard, making them fast. The downside: queries that need data from multiple shards (like 'count all users') become complex.",
      analogy: "Database sharding is like splitting a massive encyclopedia into volumes stored in different libraries. Volume A-F is in Library 1, G-M in Library 2, N-Z in Library 3. When you look up 'Java', you go directly to Library 2 — you don't search all three. Each library handles its own queries independently, so the load is spread. The downside: if you need entries from multiple volumes, you have to visit multiple libraries and combine the results yourself.",
      example: "Instagram shards user data by user ID. When you load your profile, the app calculates which shard your user ID belongs to and queries only that database. Your query hits 1 server instead of searching through 1 billion rows on one giant server.",
      followUps: [{ question: "What is the difference between sharding and replication?", answer: "Replication copies the same data to multiple servers (for availability and read scaling). Sharding splits different data across multiple servers (for write scaling and storage). You can use both together." }],
      keyPoints: ["Splits data across multiple databases by a shard key", "Each shard holds a different subset of data", "Improves write performance and storage capacity", "Cross-shard queries are complex — choose shard key carefully"]
    },
  ]
};

