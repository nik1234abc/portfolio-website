export const restApiInterview = {
  categories: ["REST APIs"],
  questions: [
    {
      id: 1, category: "REST APIs", difficulty: 1,
      question: "What is REST?",
      simpleAnswer: "REST (Representational State Transfer) is an architectural style for designing networked applications using standard HTTP methods to communicate between client and server.",
      explanation: "REST is not a protocol or standard — it's a set of constraints. When a web service follows these constraints, it's called RESTful. It uses HTTP as the communication protocol and treats everything as a resource identified by a URL.",
      analogy: "REST is like the rules of the road. The roads (HTTP) already exist. REST is the highway code — a set of agreed conventions (drive on the left, stop at red lights) that everyone follows so traffic flows predictably. You don't have to follow them, but if you do, everyone knows what to expect.",
      example: "A weather app fetching data from https://api.weather.com/cities/delhi is using REST — the client sends an HTTP GET request, and the server responds with JSON data.",
      followUps: [{ question: "Is REST the same as HTTP?", answer: "No. HTTP is the protocol. REST is an architectural style that uses HTTP as its transport mechanism." }],
      keyPoints: ["Architectural style, not a protocol", "Uses standard HTTP methods", "Resources identified by URLs", "Stateless communication"]
    },
    {
      id: 2, category: "REST APIs", difficulty: 1,
      question: "What is a RESTful API?",
      simpleAnswer: "A RESTful API is a web service that follows REST architectural constraints — it exposes resources via URLs and uses HTTP methods to perform operations on them.",
      explanation: "A RESTful API treats data as resources. Each resource has a unique URL. You interact with it using HTTP verbs: GET to read, POST to create, PUT/PATCH to update, DELETE to remove. The server responds with standard HTTP status codes and usually JSON.",
      analogy: "A RESTful API is like a well-run post office. You walk up to the counter (URL), tell the clerk what you want using a standard form (HTTP method), and they handle the rest. Every post office follows the same rules — you don't need a different process for each one.",
      example: "GitHub's API is RESTful: GET /users/nikhil returns user data, POST /repos creates a new repository, DELETE /repos/nikhil/old-project deletes it.",
      followUps: [{ question: "What makes an API truly RESTful?", answer: "It must follow all 6 REST constraints: client-server, stateless, cacheable, uniform interface, layered system, and optionally code-on-demand." }],
      keyPoints: ["Resources exposed via URLs", "HTTP verbs for operations", "JSON responses", "Stateless interactions"]
    },
    {
      id: 3, category: "REST APIs", difficulty: 1,
      question: "What are REST principles / constraints?",
      simpleAnswer: "REST has 6 core constraints: Client-Server, Stateless, Cacheable, Uniform Interface, Layered System, and Code-On-Demand (optional).",
      explanation: "Client-Server separates UI from data storage. Stateless means each request contains all needed info. Cacheable allows responses to be cached. Uniform Interface standardizes how resources are accessed. Layered System allows intermediaries like load balancers. Code-On-Demand lets servers send executable code to clients.",
      analogy: "REST constraints are like the rules of a board game. The game (HTTP) already exists. The rules (REST constraints) tell every player how to interact fairly — take turns, follow the board layout, use the pieces correctly. Anyone who knows the rules can join and play without a custom tutorial.",
      example: "When you call GET /products, the server doesn't remember your previous requests (Stateless), the response can be cached by your browser (Cacheable), and the URL structure is consistent (Uniform Interface).",
      followUps: [{ question: "Which constraint is most important?", answer: "Statelessness and Uniform Interface are considered the most critical for scalability and interoperability." }],
      keyPoints: ["Client-Server separation", "Stateless requests", "Cacheable responses", "Uniform Interface"]
    },
    {
      id: 4, category: "REST APIs", difficulty: 1,
      question: "What is statelessness in REST?",
      simpleAnswer: "Statelessness means the server does not store any information about the client between requests. Every request must contain all the information needed to process it.",
      explanation: "In a stateless system, the server treats each request independently. There's no session stored on the server side. If authentication is needed, the client must send credentials (like a JWT token) with every single request.",
      analogy: "Statelessness is like a vending machine. Every time you use it, you insert your coins and make your selection fresh — the machine doesn't remember you from last time. You carry all the context (your money, your choice) with you every single time.",
      example: "When you call GET /orders with a JWT token in the header, the server validates the token and returns your orders — it doesn't remember you from your last request.",
      followUps: [{ question: "What's the benefit of statelessness?", answer: "Scalability — any server instance can handle any request since no session state is stored. This makes horizontal scaling trivial." }],
      keyPoints: ["No server-side session storage", "Each request is self-contained", "Client sends auth with every request", "Enables horizontal scaling"]
    },
    {
      id: 5, category: "REST APIs", difficulty: 1,
      question: "What is client-server architecture in REST?",
      simpleAnswer: "Client-server means the client (frontend/mobile app) and server (backend API) are completely separate and communicate only through a defined interface.",
      explanation: "The client handles the UI and user experience. The server handles data storage and business logic. They are decoupled — you can change the frontend without touching the backend and vice versa, as long as the API contract stays the same.",
      analogy: "Client-server is like a restaurant. The kitchen (server) handles cooking and food storage. The waiter and dining room (client) handle the customer experience. The kitchen doesn't care if you're eating in or taking away — it just receives orders and sends food out. You can redecorate the dining room without touching the kitchen.",
      example: "A React frontend and a Spring Boot backend are separate. The frontend calls POST /api/login, and the backend handles authentication. You can replace the React app with a mobile app without changing the backend.",
      followUps: [{ question: "Why is this separation important?", answer: "It allows independent development, deployment, and scaling of frontend and backend teams." }],
      keyPoints: ["Frontend and backend are decoupled", "Communicate via API contract", "Independent deployment", "Enables multiple clients (web, mobile)"]
    },
    {
      id: 6, category: "REST APIs", difficulty: 1,
      question: "What is uniform interface in REST?",
      simpleAnswer: "Uniform Interface means all REST APIs follow the same standard rules for how resources are identified, manipulated, and communicated — making APIs predictable and consistent.",
      explanation: "It has 4 sub-constraints: Resource identification via URIs, manipulation through representations (JSON/XML), self-descriptive messages (Content-Type headers), and HATEOAS (links to related actions). This consistency means any developer can understand your API without custom documentation for every endpoint.",
      analogy: "Uniform interface is like a standard electrical outlet. No matter which country you're in, if you have the right plug shape, you can connect any device. You don't need a custom adapter for every appliance. REST's uniform interface means any client can talk to any REST API using the same standard rules.",
      example: "GET /users/5 always means 'get user with ID 5'. DELETE /users/5 always means 'delete user 5'. The pattern is uniform across all resources.",
      followUps: [{ question: "What is HATEOAS and is it required?", answer: "HATEOAS (Hypermedia as the Engine of Application State) means responses include links to related actions. It's part of the uniform interface but rarely implemented in practice." }],
      keyPoints: ["Consistent URL patterns", "Standard HTTP methods", "Self-descriptive messages", "Predictable API behavior"]
    },
    {
      id: 7, category: "REST APIs", difficulty: 1,
      question: "What is a resource in REST?",
      simpleAnswer: "A resource is any piece of data or object that can be identified, named, and accessed via a URL — like a user, order, product, or invoice.",
      explanation: "In REST, everything is a resource. Resources are nouns, not verbs. Each resource has a unique identifier (URI). Resources can be collections (/users) or individual items (/users/5). The server sends a representation of the resource (usually JSON) in the response.",
      analogy: "A resource in REST is like a file in a filing cabinet. Each file has a unique label (URI) and lives in a specific drawer (collection). You can read it, replace it, or remove it — but the file itself is just a named thing you can act on.",
      example: "In a banking API: /accounts is a collection resource, /accounts/12345 is a single account resource, /accounts/12345/transactions is a sub-resource.",
      followUps: [{ question: "Can a resource be an action?", answer: "Technically no — REST resources should be nouns. Actions are expressed through HTTP methods. But in practice, some APIs use action-based URLs like /users/5/activate." }],
      keyPoints: ["Resources are nouns, not verbs", "Identified by unique URIs", "Can be collections or single items", "Represented as JSON/XML"]
    },
    {
      id: 8, category: "REST APIs", difficulty: 1,
      question: "What is the difference between URI and URL?",
      simpleAnswer: "A URI (Uniform Resource Identifier) identifies a resource. A URL (Uniform Resource Locator) is a type of URI that also tells you how to locate/access it (includes the protocol and address).",
      explanation: "All URLs are URIs, but not all URIs are URLs. A URI just names something uniquely. A URL includes the scheme (https://), host (api.example.com), and path (/users/5) — enough information to actually reach the resource over a network.",
      analogy: "A URI is like a person's name — it uniquely identifies them. A URL is like their home address — it tells you both who they are and exactly how to find them. Every address is a name, but not every name is an address.",
      example: "URI: /users/5 (just an identifier). URL: https://api.example.com/users/5 (full address you can actually call).",
      followUps: [{ question: "What is a URN?", answer: "A URN (Uniform Resource Name) is another type of URI that names a resource without specifying its location, like isbn:978-3-16-148410-0." }],
      keyPoints: ["URI = identifier only", "URL = identifier + location", "All URLs are URIs", "REST uses URLs to identify resources"]
    },
    {
      id: 9, category: "REST APIs", difficulty: 1,
      question: "What is idempotency in REST?",
      simpleAnswer: "An operation is idempotent if calling it multiple times produces the same result as calling it once — no extra side effects on repeated calls.",
      explanation: "GET, PUT, DELETE, and HEAD are idempotent. POST is not. If you DELETE /users/5 ten times, the result is the same as deleting once — the user is gone. If you POST /users ten times, you create ten users.",
      analogy: "Idempotency is like a light switch. Flipping it off once turns the light off. Flipping it off five more times — the light is still off. The result is the same no matter how many times you repeat the action. Pressing a doorbell, on the other hand, rings it every single time — that's not idempotent.",
      example: "PUT /orders/99 with the same body 5 times updates the order to the same state each time — idempotent. POST /orders 5 times creates 5 separate orders — not idempotent.",
      followUps: [{ question: "Is idempotent the same as safe?", answer: "No. Safe means no side effects at all (GET, HEAD). Idempotent means same result on repeat. DELETE is idempotent but not safe — it does modify data." }],
      keyPoints: ["Same result on repeated calls", "GET, PUT, DELETE are idempotent", "POST is NOT idempotent", "Critical for retry logic"]
    },
    {
      id: 10, category: "REST APIs", difficulty: 1,
      question: "What is HTTP?",
      simpleAnswer: "HTTP (HyperText Transfer Protocol) is the foundation of data communication on the web — it defines how clients send requests and servers send responses.",
      explanation: "HTTP is a request-response protocol. The client sends a request with a method (GET, POST), URL, headers, and optional body. The server processes it and returns a response with a status code, headers, and optional body. REST APIs are built on top of HTTP.",
      analogy: "HTTP is like the postal system. You write a letter (request) with a specific format — recipient address (URL), type of request (method), and content (body). The post office (network) delivers it, and you get a reply (response) back. Both sides follow the same postal rules so the system works reliably.",
      example: "When you open a browser and visit https://api.example.com/users, your browser sends an HTTP GET request. The server responds with HTTP 200 OK and a JSON body containing the users list.",
      followUps: [{ question: "What is the difference between HTTP and HTTPS?", answer: "HTTPS is HTTP with TLS/SSL encryption. All data is encrypted in transit, preventing eavesdropping and man-in-the-middle attacks." }],
      keyPoints: ["Request-response protocol", "Foundation of REST APIs", "Stateless by nature", "HTTPS adds encryption"]
    },
    {
      id: 11, category: "REST APIs", difficulty: 1,
      question: "What is the structure of an HTTP request?",
      simpleAnswer: "An HTTP request has 4 parts: Request Line (method + URL + HTTP version), Headers (metadata), blank line, and optional Body (data).",
      explanation: "The request line specifies what you want to do and where. Headers provide context like Content-Type, Authorization, and Accept. The body carries data for POST/PUT requests. GET requests typically have no body.",
      analogy: "An HTTP request is like a formal letter. The first line is the subject and recipient (method + URL). The next section is the letterhead with context (headers). Then there's a blank line, and finally the actual message content (body). Every letter follows this same structure so the recipient knows exactly where to look for each piece of information.",
      example: "POST /api/users HTTP/1.1\nHost: api.example.com\nContent-Type: application/json\nAuthorization: Bearer eyJhb...\n\n{\"name\": \"Nikhil\", \"email\": \"n@example.com\"}",
      followUps: [{ question: "Can a GET request have a body?", answer: "Technically yes, but it's strongly discouraged. GET is for retrieval — use query parameters instead of a body." }],
      keyPoints: ["Request line: method + URL", "Headers: metadata", "Body: data payload (POST/PUT)", "GET requests have no body"]
    },
    {
      id: 12, category: "REST APIs", difficulty: 1,
      question: "What is the structure of an HTTP response?",
      simpleAnswer: "An HTTP response has: Status Line (HTTP version + status code + reason), Headers (metadata), blank line, and optional Body (response data).",
      explanation: "The status line tells you if the request succeeded or failed. Headers describe the response format and caching rules. The body contains the actual data — usually JSON for REST APIs.",
      analogy: "An HTTP response is like a package delivery. The label on the outside tells you the status (delivered, failed, returned). The packing slip inside gives details (headers). And the box itself contains what you ordered (body). The status label is the first thing you check before opening the box.",
      example: "HTTP/1.1 201 Created\nContent-Type: application/json\nLocation: /api/users/42\n\n{\"id\": 42, \"name\": \"Nikhil\", \"email\": \"n@example.com\"}",
      followUps: [{ question: "What is the Location header used for?", answer: "It's returned with 201 Created responses to tell the client the URL of the newly created resource." }],
      keyPoints: ["Status line: code + reason", "Headers: content type, caching", "Body: JSON response data", "Location header for created resources"]
    },
    {
      id: 13, category: "REST APIs", difficulty: 1,
      question: "What are HTTP methods?",
      simpleAnswer: "HTTP methods (also called verbs) define the action to perform on a resource: GET, POST, PUT, PATCH, DELETE, HEAD, and OPTIONS are the most common.",
      explanation: "Each method has a specific semantic meaning. GET retrieves data. POST creates. PUT replaces. PATCH partially updates. DELETE removes. HEAD is like GET but returns only headers. OPTIONS describes what methods are allowed on a resource.",
      analogy: "HTTP methods are like actions at a library. GET is browsing the shelves. POST is donating a new book. PUT is replacing an existing book with a new edition. PATCH is correcting a typo in a book. DELETE is removing a book from the collection. Each action has a clear, distinct meaning.",
      example: "GET /products — list products. POST /products — create product. PUT /products/1 — replace product 1. PATCH /products/1 — update specific fields. DELETE /products/1 — remove product 1.",
      followUps: [{ question: "What is the OPTIONS method used for?", answer: "Browsers send OPTIONS as a preflight request for CORS to check if the actual request is allowed before sending it." }],
      keyPoints: ["GET: retrieve", "POST: create", "PUT: replace", "PATCH: partial update", "DELETE: remove"]
    },
    {
      id: 14, category: "REST APIs", difficulty: 1,
      question: "Difference between GET, POST, PUT, PATCH, DELETE?",
      simpleAnswer: "GET reads data, POST creates new data, PUT replaces an entire resource, PATCH updates specific fields only, DELETE removes a resource.",
      explanation: "GET is safe and idempotent — no side effects. POST creates and is not idempotent. PUT replaces the whole resource (idempotent). PATCH is for partial updates — only send the fields you want to change. DELETE removes the resource (idempotent).",
      analogy: "Think of a whiteboard in an office. GET reads what's written. POST adds a new note. PUT erases everything and writes a completely new message. PATCH crosses out one word and writes a correction. DELETE wipes the whole board clean. Each method has a specific, non-overlapping job.",
      example: "PATCH /users/5 with {\"email\": \"new@email.com\"} only updates the email. PUT /users/5 is commonly treated as full replacement, so many APIs expect the full user representation; otherwise they may overwrite missing fields or reject the request.",
      followUps: [{ question: "When should you use PATCH instead of PUT?", answer: "Use PATCH when you only want to update specific fields. Use PUT when you want to replace the entire resource." }],
      keyPoints: ["GET: safe + idempotent", "POST: not idempotent", "PUT: full replacement", "PATCH: partial update", "DELETE: idempotent removal"]
    },
    {
      id: 15, category: "REST APIs", difficulty: 1,
      question: "What is the difference between safe and idempotent methods?",
      simpleAnswer: "Safe methods have no side effects (they don't modify data). Idempotent methods can be called multiple times with the same result. Safe methods are always idempotent, but not vice versa.",
      explanation: "GET and HEAD are both safe (read-only) and idempotent. DELETE is idempotent (deleting twice has same result) but not safe (it does modify data). POST is neither safe nor idempotent.",
      analogy: "Safe is like reading a book — you can read it a hundred times and nothing changes. Idempotent is like setting a thermostat to 22°C — you can press the button ten times and the temperature is still 22°C. But setting the thermostat does change something (it adjusts the heating), so it's idempotent but not safe.",
      example: "GET /users/5 — safe and idempotent (just reads). DELETE /users/5 — idempotent (deleting twice = user still gone) but not safe (modifies data). POST /users — neither (creates a new user each time).",
      followUps: [{ question: "Why does idempotency matter in distributed systems?", answer: "If a network request fails and you retry it, idempotent operations are safe to retry without causing duplicate side effects." }],
      keyPoints: ["Safe = no side effects (GET, HEAD)", "Idempotent = same result on repeat", "DELETE is idempotent but not safe", "POST is neither"]
    },
    {
      id: 16, category: "REST APIs", difficulty: 1,
      question: "What are HTTP status codes?",
      simpleAnswer: "HTTP status codes are 3-digit numbers in the response that tell the client whether the request succeeded, failed, or needs further action.",
      explanation: "They are grouped into 5 categories: 1xx (Informational), 2xx (Success), 3xx (Redirection), 4xx (Client Error), 5xx (Server Error). Using the right status code is critical for API clarity.",
      analogy: "HTTP status codes are like traffic lights at an intersection. Green (2xx) means go — everything worked. Yellow (3xx) means slow down and redirect. Red (4xx) means you made a wrong turn — your fault. Flashing red (5xx) means the traffic system itself has broken down — not your fault.",
      example: "200 OK — success. 201 Created — resource created. 400 Bad Request — invalid input. 401 Unauthorized — not authenticated. 404 Not Found — resource doesn't exist. 500 Internal Server Error — server crashed.",
      followUps: [{ question: "What is a 204 status code?", answer: "204 No Content — the request succeeded but there's nothing to return in the body. Used for DELETE or PUT operations." }],
      keyPoints: ["2xx = Success", "4xx = Client errors", "5xx = Server errors", "3xx = Redirects"]
    },
    {
      id: 17, category: "REST APIs", difficulty: 1,
      question: "Difference between 200, 201, and 204?",
      simpleAnswer: "200 OK means the request succeeded with a response body. 201 Created means a new resource was created. 204 No Content means success but nothing to return.",
      explanation: "Use 200 for successful GET, PUT, PATCH responses. Use 201 for successful POST that creates a resource — include a Location header pointing to the new resource. Use 204 for DELETE or operations where there's no meaningful data to return.",
      analogy: "200 is like a waiter bringing your food and saying 'here it is'. 201 is like a waiter saying 'your order has been placed and here's your receipt'. 204 is like a waiter clearing your empty plate and walking away without saying anything — the job is done, there's nothing to hand you.",
      example: "GET /users/5 → 200 OK with user JSON. POST /users → 201 Created with new user JSON + Location: /users/42. DELETE /users/5 → 204 No Content.",
      followUps: [{ question: "Should POST always return 201?", answer: "Not always. If POST triggers an action (like sending an email) rather than creating a resource, 200 OK is more appropriate." }],
      keyPoints: ["200: success with body", "201: resource created", "204: success, no body", "201 should include Location header"]
    },
    {
      id: 18, category: "REST APIs", difficulty: 1,
      question: "Difference between 400, 401, and 403?",
      simpleAnswer: "400 Bad Request means the client sent invalid data. 401 Unauthorized means the client is not authenticated. 403 Forbidden means the client is authenticated but doesn't have permission.",
      explanation: "400 is for validation errors — missing fields, wrong format. 401 means 'who are you?' — no token or invalid token. 403 means 'I know who you are, but you can't do this' — a regular user trying to access admin endpoints.",
      analogy: "400 is like filling out a form incorrectly — the clerk sends it back because it's incomplete. 401 is like arriving at a members-only club without your membership card — 'who are you?'. 403 is like arriving with your card but being told 'you're a regular member, not VIP — you can't enter this section'.",
      example: "POST /users with missing email → 400. GET /admin/users without a JWT token → 401. GET /admin/users with a valid user token (not admin) → 403.",
      followUps: [{ question: "Why is 401 called 'Unauthorized' when it means unauthenticated?", answer: "It's a historical naming mistake in the HTTP spec. 401 really means unauthenticated, and 403 means unauthorized (no permission)." }],
      keyPoints: ["400: invalid request data", "401: not authenticated", "403: authenticated but no permission", "Common interview distinction"]
    },
    {
      id: 19, category: "REST APIs", difficulty: 1,
      question: "Difference between 500 and 503?",
      simpleAnswer: "500 Internal Server Error means something unexpected crashed on the server. 503 Service Unavailable means the server is temporarily unable to handle requests (overloaded or down for maintenance).",
      explanation: "500 is a generic server crash — a bug, unhandled exception, or database failure. 503 is intentional or temporary — the server is alive but can't serve requests right now. 503 often includes a Retry-After header.",
      analogy: "500 is like a restaurant kitchen catching fire unexpectedly — something went wrong inside that nobody planned for. 503 is like a restaurant putting up a 'closed for renovation' sign — they know they can't serve you right now, it's temporary, and they'll be back.",
      example: "A NullPointerException in your Spring Boot controller → 500. Your server is under maintenance or at capacity → 503 with Retry-After: 120.",
      followUps: [{ question: "What is a 502 Bad Gateway?", answer: "502 means a gateway or proxy received an invalid response from an upstream server — common when your API Gateway can't reach the backend service." }],
      keyPoints: ["500: unexpected server crash", "503: temporary unavailability", "503 can include Retry-After header", "502: upstream server issue"]
    },
    {
      id: 20, category: "REST APIs", difficulty: 2,
      question: "How do you design a REST API?",
      simpleAnswer: "Design around resources (nouns), use HTTP methods for actions, use proper status codes, version your API, handle errors consistently, and keep it stateless.",
      explanation: "Start by identifying your resources (users, orders, products). Define URLs as nouns (/users, /orders). Map CRUD operations to HTTP methods. Return appropriate status codes. Add versioning (/v1/users). Design consistent error responses. Document with OpenAPI/Swagger.",
      analogy: "Designing a REST API is like designing a city's road system. You plan the major roads (resources), decide the traffic rules (HTTP methods), put up clear signs (status codes), and build in room for future expansion (versioning). A well-designed city is easy to navigate even for first-time visitors.",
      example: "For an e-commerce API: GET /v1/products (list), POST /v1/products (create), GET /v1/products/5 (get one), PUT /v1/products/5 (update), DELETE /v1/products/5 (delete).",
      followUps: [{ question: "What is contract-first API design?", answer: "You define the API spec (OpenAPI/Swagger) before writing any code. Teams can work in parallel — frontend mocks the API while backend implements it." }],
      keyPoints: ["Resources as nouns", "HTTP methods for actions", "Consistent error responses", "Versioning from day one"]
    },
    {
      id: 21, category: "REST APIs", difficulty: 1,
      question: "What are best practices for REST API naming?",
      simpleAnswer: "Use lowercase plural nouns for resources, hyphens for multi-word names, avoid verbs in URLs, and keep URLs hierarchical for related resources.",
      explanation: "URLs should describe resources, not actions. Use plural nouns (/users not /user). Use hyphens for readability (/user-profiles not /userProfiles). Nest related resources (/users/5/orders). Avoid verbs — the HTTP method is the verb.",
      analogy: "REST API naming is like street addresses. Good addresses are clear and consistent — '5 Main Street' tells you exactly where to go. Bad addresses are like 'go to the place where John lives and ask for his stuff' — confusing and non-standard. Plural nouns and hyphens are the street naming conventions of REST.",
      example: "Good: GET /users, POST /users, GET /users/5/orders. Bad: GET /getUsers, POST /createUser, GET /getUserOrders?userId=5.",
      followUps: [{ question: "Should you use camelCase or snake_case in JSON responses?", answer: "camelCase is standard for JSON (matches JavaScript conventions). snake_case is common in Python APIs. Pick one and be consistent." }],
      keyPoints: ["Plural nouns for collections", "Hyphens for multi-word paths", "No verbs in URLs", "Hierarchical nesting for relationships"]
    },
    {
      id: 22, category: "REST APIs", difficulty: 2,
      question: "Should we use nouns or verbs in REST URLs?",
      simpleAnswer: "Always use nouns. The HTTP method (GET, POST, DELETE) is the verb — the URL should only describe the resource.",
      explanation: "Using verbs in URLs is a common anti-pattern. /getUser, /deleteOrder, /createProduct are all wrong. The action is already expressed by the HTTP method. The URL should only identify what resource you're acting on.",
      analogy: "Using verbs in REST URLs is like naming a road 'Drive-to-the-supermarket Road'. The road's name should just be 'Supermarket Road' — the act of driving is implied. In REST, the HTTP method is the verb (drive, walk, run). The URL is just the destination.",
      example: "Wrong: POST /createUser, GET /getUsers, DELETE /deleteUser/5. Correct: POST /users, GET /users, DELETE /users/5.",
      followUps: [{ question: "What about actions that don't map to CRUD?", answer: "For non-CRUD actions, use a sub-resource noun: POST /orders/5/cancel, POST /users/5/activate, POST /payments/5/refund." }],
      keyPoints: ["URLs = nouns only", "HTTP method = the verb", "No /getUser or /deleteOrder", "Use sub-resources for actions"]
    },
    {
      id: 23, category: "REST APIs", difficulty: 2,
      question: "How do you design versioning in REST APIs?",
      simpleAnswer: "The most common approach is URL versioning (/v1/users). Other options are header versioning and query parameter versioning.",
      explanation: "URL versioning (/api/v1/users) is the most visible and widely used. Header versioning (Accept: application/vnd.api.v1+json) is cleaner but harder to test. Query param versioning (/users?version=1) is discouraged. Always version from day one — adding versioning later is painful.",
      analogy: "API versioning is like publishing editions of a textbook. The 2nd edition (/v2) can have major changes without making the 1st edition (/v1) disappear. Students using the old edition can still study. New students get the improved version. Both coexist until the old one is retired.",
      example: "URL versioning: GET /api/v1/users and GET /api/v2/users can coexist. v2 might return a different response structure without breaking v1 clients.",
      followUps: [{ question: "When should you create a new API version?", answer: "When making breaking changes — removing fields, changing field types, or changing URL structure. Non-breaking additions (new optional fields) don't require a new version." }],
      keyPoints: ["URL versioning is most common", "Version from day one", "Breaking changes require new version", "Run old and new versions in parallel"]
    },
    {
      id: 24, category: "REST APIs", difficulty: 2,
      question: "When to use URI path parameters vs query parameters?",
      simpleAnswer: "Use path parameters to identify a specific resource (/users/5). Use query parameters for filtering, sorting, pagination, and optional data (/users?role=admin&page=2).",
      explanation: "Path parameters are part of the resource identity — they identify which resource you're talking about. Query parameters are optional modifiers that filter or shape the response. A resource without its path param doesn't make sense; a resource without query params still works.",
      analogy: "Path parameters are like a house address — they identify exactly which house you mean. Query parameters are like instructions to the delivery driver — 'leave it at the back door, ring twice'. The address is required to find the house; the instructions are optional extras.",
      example: "GET /users/5 — path param identifies user 5. GET /users?status=active&sort=name&page=1 — query params filter and paginate the users list.",
      followUps: [{ question: "Can you use query params for authentication?", answer: "Technically yes (API keys in query params), but it's a security risk since URLs get logged. Always prefer Authorization headers." }],
      keyPoints: ["Path params = resource identity", "Query params = filtering/sorting/pagination", "Path params are required", "Query params are optional"]
    },
    {
      id: 25, category: "REST APIs", difficulty: 2,
      question: "How do you design pagination in a REST API?",
      simpleAnswer: "Use query parameters like page and size (or limit and offset) to control which subset of data is returned, and include pagination metadata in the response.",
      explanation: "Never return all records at once for large datasets. Use page-based pagination (?page=2&size=20) or cursor-based pagination (?cursor=abc123&limit=20). For page-based pagination, include metadata like total count, current page, or total pages when practical. Cursor-based pagination often omits total count because it is expensive or misleading on fast-changing datasets.",
      analogy: "Pagination is like reading a book chapter by chapter instead of all at once. You ask for chapter 1 (page 1), read it, then ask for chapter 2. The server doesn't hand you the entire library — just the pages you need right now. This keeps responses fast and manageable.",
      example: "GET /orders?page=1&size=20 returns: {\"data\": [...], \"page\": 1, \"size\": 20, \"totalElements\": 500, \"totalPages\": 25, \"hasNext\": true}",
      followUps: [{ question: "What is cursor-based pagination and when is it better?", answer: "Cursor-based uses an opaque pointer to the last item instead of page numbers. It's better for real-time data where records are constantly added/removed, preventing duplicate or skipped items." }],
      keyPoints: ["Never return all records", "page + size or limit + offset", "Page-based APIs often include total count/metadata", "Cursor-based for real-time data"]
    },
    {
      id: 26, category: "REST APIs", difficulty: 2,
      question: "How do you design filtering and sorting in a REST API?",
      simpleAnswer: "Use query parameters for filtering (?status=active&role=admin) and sorting (?sort=name,asc or ?sort=-createdAt).",
      explanation: "Filtering narrows down results based on field values. Sorting orders the results. Both are expressed as query parameters. For sorting, a common convention is ?sort=fieldName,direction or ?sort=-fieldName (minus prefix for descending).",
      analogy: "Filtering and sorting are like using a search engine. Filtering is typing 'red shoes size 10' to narrow results. Sorting is clicking 'sort by price: low to high'. You're not changing the data — you're just asking for a specific view of it.",
      example: "GET /users?status=active&role=admin&sort=name,asc — returns active admin users sorted by name ascending. GET /orders?sort=-createdAt — returns orders newest first.",
      followUps: [{ question: "How do you handle complex filtering?", answer: "For complex filters, some APIs use a filter query language like ?filter=age>25 AND city='Delhi', or accept a filter object in the request body (though this breaks REST conventions)." }],
      keyPoints: ["Query params for filtering", "sort=field,direction convention", "Minus prefix for descending", "Combine with pagination"]
    },
    {
      id: 27, category: "REST APIs", difficulty: 2,
      question: "How do you handle partial updates in REST?",
      simpleAnswer: "Use HTTP PATCH with only the fields you want to update in the request body. The server applies only those changes, leaving other fields untouched.",
      explanation: "PUT replaces the entire resource — you must send all fields. PATCH is for partial updates — send only what changed. This is more efficient and prevents accidentally overwriting fields you didn't intend to change.",
      analogy: "PATCH is like editing a single sentence in a document without retyping the whole thing. PUT is like throwing away the document and handing in a completely new one. If you only changed one line, PATCH is far more efficient — and safer, since you can't accidentally erase sections you didn't mean to touch.",
      example: "PATCH /users/5 with body {\"email\": \"new@email.com\"} only updates the email. The user's name, phone, and other fields remain unchanged.",
      followUps: [{ question: "What is JSON Patch (RFC 6902)?", answer: "A formal standard for PATCH operations using an array of operations like add, remove, replace, copy, move. More expressive but complex: [{\"op\": \"replace\", \"path\": \"/email\", \"value\": \"new@email.com\"}]" }],
      keyPoints: ["PATCH for partial updates", "Send only changed fields", "PUT requires full resource", "More efficient than PUT for small changes"]
    },
    {
      id: 28, category: "REST APIs", difficulty: 1,
      question: "What is HATEOAS?",
      simpleAnswer: "HATEOAS (Hypermedia as the Engine of Application State) means API responses include links to related actions, so clients can navigate the API dynamically without hardcoding URLs.",
      explanation: "Instead of the client knowing all possible URLs upfront, the server includes links in responses. A GET /orders/5 response might include links to cancel, pay, or track the order. The client follows these links rather than constructing URLs itself.",
      analogy: "HATEOAS is like a GPS that shows you the next possible turns after each step. Instead of memorizing the entire route upfront, the GPS tells you 'you can go left, right, or make a U-turn from here'. The API response tells the client what actions are available next, so the client doesn't need to know the full API map in advance.",
      example: "{\"id\": 5, \"status\": \"pending\", \"_links\": {\"self\": \"/orders/5\", \"cancel\": \"/orders/5/cancel\", \"pay\": \"/orders/5/payment\"}}",
      followUps: [{ question: "Is HATEOAS commonly used in practice?", answer: "Rarely. Most real-world REST APIs skip HATEOAS because it adds complexity. It's theoretically the highest level of REST maturity but practically uncommon." }],
      keyPoints: ["Responses include action links", "Client navigates via links", "Reduces client-server coupling", "Rarely implemented in practice"]
    },
    {
      id: 29, category: "REST APIs", difficulty: 1,
      question: "What is API consistency?",
      simpleAnswer: "API consistency means all endpoints follow the same patterns, naming conventions, error formats, and response structures throughout the entire API.",
      explanation: "Inconsistent APIs are hard to use and maintain. Consistency means: same naming style everywhere, same error response format, same pagination structure, same date formats, same HTTP method usage. Developers should be able to predict how a new endpoint works based on existing ones.",
      analogy: "API consistency is like a chain of restaurants. When you walk into any branch, the menu layout, ordering process, and food quality follow the same standards. You don't need to relearn how to order at each location. Developers feel the same way — a consistent API means no surprises at each new endpoint.",
      example: "If /users returns {\"data\": [...], \"page\": 1}, then /orders should also return {\"data\": [...], \"page\": 1} — not a different structure. If errors use {\"error\": \"message\"}, all errors should use that format.",
      followUps: [{ question: "How do you enforce API consistency in a team?", answer: "Use API design guidelines, OpenAPI specs, linting tools, and code reviews. Tools like Spectral can lint OpenAPI specs for consistency violations." }],
      keyPoints: ["Same naming conventions everywhere", "Consistent error format", "Consistent pagination structure", "Predictable behavior for developers"]
    },
    {
      id: 30, category: "REST APIs", difficulty: 1,
      question: "What is a request body?",
      simpleAnswer: "The request body is the data payload sent by the client to the server, typically in POST, PUT, or PATCH requests, usually formatted as JSON.",
      explanation: "The body carries the actual data you want to send — like a new user object when creating a user, or updated fields when editing one. GET and DELETE requests typically have no body. The Content-Type header tells the server how to parse the body.",
      analogy: "A request body is like the contents of a package you're mailing. The envelope (HTTP request) has the address (URL) and handling instructions (headers) on the outside. The actual item you're sending — the new user data, the updated order — goes inside the package. Without the contents, the envelope is just an empty delivery.",
      example: "POST /users with body: {\"name\": \"Nikhil\", \"email\": \"n@example.com\"} — the server reads this JSON and creates the user.",
      followUps: [{ question: "What happens if Content-Type is missing?", answer: "The server may not know how to parse the body and return a 415 Unsupported Media Type or 400 Bad Request error." }],
      keyPoints: ["Data payload from client to server", "Used in POST, PUT, PATCH", "Usually JSON format", "Content-Type header required"]
    },
    {
      id: 31, category: "REST APIs", difficulty: 1,
      question: "What is a response body?",
      simpleAnswer: "The response body is the data the server sends back to the client after processing a request — usually JSON containing the requested resource or a result message.",
      explanation: "The response body carries the actual payload — a user object, a list of orders, an error message, or a success confirmation. Not all responses have a body — 204 No Content has none. The Content-Type header in the response tells the client how to parse it.",
      analogy: "A response body is like the reply letter you get back from a company. The envelope (HTTP response) has the status stamp on the outside (status code). Inside is the actual reply — the data you asked for, or an explanation of what went wrong. A 204 is like getting an empty envelope back — the action was done, there's just nothing to say.",
      example: "GET /users/5 response body: {\"id\": 5, \"name\": \"Nikhil\", \"email\": \"n@example.com\"}.",
      followUps: [{ question: "Should error responses also have a body?", answer: "Yes. Always return a structured error body with error code, message, and details — never return an empty body for 4xx or 5xx responses." }],
      keyPoints: ["Data payload from server to client", "Usually JSON format", "204 responses have no body", "Always include body for errors"]
    },
    {
      id: 32, category: "REST APIs", difficulty: 1,
      question: "What is JSON?",
      simpleAnswer: "JSON (JavaScript Object Notation) is a lightweight, human-readable data format used to exchange data between a client and server in REST APIs.",
      explanation: "JSON represents data as key-value pairs, arrays, strings, numbers, booleans, and null. It is language-independent and easy to parse in any programming language. It replaced XML as the standard format for REST APIs because it is simpler and more compact.",
      analogy: "JSON is like a standardized form that everyone can fill out and read. Instead of writing a long letter (XML with opening and closing tags everywhere), you fill in labeled boxes — name: Nikhil, age: 25. Any system that knows the form format can read it instantly, regardless of what language it speaks.",
      example: "{\"id\": 1, \"name\": \"Nikhil\", \"skills\": [\"Java\", \"Spring Boot\"], \"active\": true}",
      followUps: [{ question: "What data types does JSON support?", answer: "String, Number, Boolean, Array, Object, and null. Dates are usually sent as ISO 8601 strings like 2024-01-15T10:30:00Z." }],
      keyPoints: ["Key-value pair format", "Language-independent", "Replaced XML as REST standard", "Dates sent as ISO 8601 strings"]
    },
    {
      id: 33, category: "REST APIs", difficulty: 2,
      question: "Why is JSON preferred over XML in REST APIs?",
      simpleAnswer: "JSON is preferred because it is more compact, easier to read, faster to parse, and maps naturally to objects in most programming languages.",
      explanation: "XML requires opening and closing tags for every field, making it verbose. JSON uses simple key-value pairs. JSON parses directly into native objects in JavaScript, Java, Python etc. JSON payloads are typically 30-40% smaller than equivalent XML, reducing bandwidth.",
      analogy: "JSON vs XML is like a text message versus a formal memo. The memo (XML) has a header, subject line, opening salutation, body, closing, and signature — all for the same information. The text message (JSON) just says what needs to be said. Same content, far less packaging.",
      example: "XML: <user><id>1</id><name>Nikhil</name></user>. JSON: {\"id\": 1, \"name\": \"Nikhil\"}. JSON is clearly more compact and readable.",
      followUps: [{ question: "Are there cases where XML is still preferred?", answer: "Yes — SOAP web services, enterprise integrations, and document-heavy systems that need XML Schema validation or namespaces." }],
      keyPoints: ["More compact than XML", "Easier to read and write", "Faster parsing", "Native object mapping in most languages"]
    },
    {
      id: 34, category: "REST APIs", difficulty: 1,
      question: "What are HTTP headers?",
      simpleAnswer: "HTTP headers are key-value pairs sent with requests and responses that provide metadata — like content type, authentication tokens, caching rules, and encoding information.",
      explanation: "Headers are separate from the body. Request headers tell the server about the client (what format it accepts, auth token, etc.). Response headers tell the client about the response (content type, caching, rate limit info). Headers carry communication metadata, not business data.",
      analogy: "HTTP headers are like the envelope around a letter. The letter itself is the body (your actual message). The envelope carries the sender's address, recipient, postage, and handling instructions — all the metadata the postal system needs without opening the letter. Headers work the same way for HTTP.",
      example: "Request headers: Authorization: Bearer eyJhb..., Content-Type: application/json. Response headers: Content-Type: application/json, X-RateLimit-Remaining: 99.",
      followUps: [{ question: "What are custom headers?", answer: "Headers you define yourself, typically prefixed with X-. Example: X-Request-ID: abc123 for request tracing across microservices." }],
      keyPoints: ["Metadata, not business data", "Request headers: auth and content type", "Response headers: caching and rate limits", "Custom headers for tracing"]
    },
    {
      id: 35, category: "REST APIs", difficulty: 1,
      question: "What is the Content-Type header?",
      simpleAnswer: "Content-Type tells the receiver what format the body is in — so it knows how to parse it.",
      explanation: "When a client sends a request with a body, it sets Content-Type to tell the server the format (application/json, application/xml, multipart/form-data). When the server sends a response, it sets Content-Type to tell the client how to read the response body.",
      analogy: "Content-Type is like the label on a food container. Before you open it, the label tells you what's inside and how to handle it — 'refrigerate after opening', 'shake well'. Without the label, you'd have to guess what's in the container. Content-Type tells the receiver exactly what format the body is in so it knows how to process it.",
      example: "POST /users with header Content-Type: application/json tells Spring Boot to use Jackson to deserialize the body into a Java object. Without it, the server may reject the request with 415.",
      followUps: [{ question: "What Content-Type is used for file uploads?", answer: "multipart/form-data is used for file uploads. application/octet-stream is used for raw binary file transfers." }],
      keyPoints: ["Describes body format", "Required for POST/PUT/PATCH requests", "application/json is most common", "Server uses it to parse the body"]
    },
    {
      id: 36, category: "REST APIs", difficulty: 1,
      question: "What is the Accept header?",
      simpleAnswer: "The Accept header is sent by the client to tell the server what response format it can handle — like JSON or XML.",
      explanation: "The client sets Accept: application/json to say 'please respond in JSON'. The server checks this header and formats the response accordingly. If the server cannot produce the requested format, it returns 406 Not Acceptable.",
      analogy: "The Accept header is like telling a waiter your dietary preference before they bring the menu. You say 'I only eat gluten-free' (Accept: application/json) and the kitchen prepares the dish in that format. If they can't accommodate your preference, they tell you upfront rather than serving you something you can't use.",
      example: "GET /users with Accept: application/json returns JSON. GET /users with Accept: application/xml returns XML (if supported by the server).",
      followUps: [{ question: "What is the difference between Content-Type and Accept?", answer: "Content-Type describes what you are sending (request body format). Accept describes what you want to receive (response format)." }],
      keyPoints: ["Client tells server preferred response format", "Accept: application/json is most common", "406 if format not supported", "Different from Content-Type"]
    },
    {
      id: 37, category: "REST APIs", difficulty: 1,
      question: "What is content negotiation?",
      simpleAnswer: "Content negotiation is the process where the client and server agree on the format of the response based on the Accept header sent by the client.",
      explanation: "The client sends Accept: application/json or Accept: application/xml. The server checks what formats it supports and responds in the best matching format. If no match, it returns 406 Not Acceptable. Spring Boot handles this automatically via HttpMessageConverters.",
      analogy: "Content negotiation is like ordering at a restaurant that serves the same dish in different styles. You tell the waiter 'I'd like the pasta, but gluten-free please' (Accept: application/xml). The kitchen makes the same dish in the format you requested. If they can't do gluten-free, they tell you (406 Not Acceptable).",
      example: "Same endpoint GET /users: with Accept: application/json returns JSON, with Accept: application/xml returns XML — same controller method, different output format.",
      followUps: [{ question: "How does Spring Boot implement content negotiation?", answer: "Spring Boot uses HttpMessageConverters. Jackson handles JSON, JAXB handles XML. It picks the right converter based on the Accept header automatically." }],
      keyPoints: ["Client and server agree on response format", "Driven by Accept header", "406 if no match found", "Spring Boot handles it automatically"]
    },
    {
      id: 38, category: "REST APIs", difficulty: 2,
      question: "When to use 200 vs 201?",
      simpleAnswer: "Use 200 OK for successful requests that return existing data. Use 201 Created specifically when a new resource has been successfully created.",
      explanation: "200 is the general success code — use it for GET, PUT, PATCH responses. 201 is specifically for POST requests that create a new resource. With 201, you should also return the created resource in the body and a Location header pointing to the new resource URL.",
      analogy: "200 vs 201 is like the difference between a shop assistant handing you an item you asked for versus handing you a receipt for something they just ordered in for you. Both are successful — but one means 'here it is now' and the other means 'it's been created, here's where to find it'.",
      example: "GET /users/5 returns 200 OK with user data. POST /users returns 201 Created with new user data and Location: /users/42 header.",
      followUps: [{ question: "Can POST return 200 instead of 201?", answer: "Yes, if the POST triggers an action rather than creating a resource (like POST /payments/process), 200 OK is appropriate." }],
      keyPoints: ["200: general success with data", "201: new resource created", "201 should include Location header", "POST returns 201, GET/PUT/PATCH return 200"]
    },
    {
      id: 39, category: "REST APIs", difficulty: 2,
      question: "When to use 204?",
      simpleAnswer: "Use 204 No Content when the request succeeded but there is nothing meaningful to return in the response body.",
      explanation: "204 is commonly used for DELETE operations (resource deleted, nothing to return), PUT/PATCH when you do not want to return the updated resource, and bulk operations. The response has no body — just the status code and headers.",
      analogy: "204 No Content is like a thumbs-up from a contractor after finishing a job. They did the work, everything went fine, but there's nothing to hand you — no invoice yet, no product to deliver. The action is complete; the silence is the confirmation.",
      example: "DELETE /users/5 returns 204 No Content (user deleted, nothing to return). PUT /users/5/status with body {\"active\": false} returns 204 No Content.",
      followUps: [{ question: "Should DELETE always return 204?", answer: "It is the most common choice, but 200 OK with a confirmation message is also acceptable. Return 404 if the resource does not exist." }],
      keyPoints: ["Success with no response body", "Common for DELETE operations", "Also used for PUT/PATCH without return data", "No body in response"]
    },
    {
      id: 40, category: "REST APIs", difficulty: 2,
      question: "When to use 400 vs 422?",
      simpleAnswer: "400 Bad Request is for malformed requests (invalid JSON, missing required headers). 422 Unprocessable Entity is for syntactically valid requests that fail business or semantic validation.",
      explanation: "400 means the server could not even understand the request — bad JSON syntax, wrong content type, missing required headers. 422 means the request was understood but the data fails validation rules — like an email field with an invalid format or a negative age value.",
      analogy: "400 vs 422 is like the difference between handing a cashier a crumpled, unreadable receipt (400 — can't even process it) versus handing them a perfectly readable receipt for a product that's out of stock (422 — understood it, but can't fulfill it). One is a format problem; the other is a content problem.",
      example: "Sending malformed JSON returns 400. Sending valid JSON with {\"age\": -5} where age must be positive returns 422 Unprocessable Entity.",
      followUps: [{ question: "Which one should Spring Boot @Valid return?", answer: "Spring Boot @Valid throws MethodArgumentNotValidException which is typically mapped to 400 Bad Request, though 422 is semantically more correct for validation failures." }],
      keyPoints: ["400: malformed or unparseable request", "422: valid syntax but fails business rules", "400 = server cannot parse it", "422 = server parsed it but data is invalid"]
    },
    {
      id: 41, category: "REST APIs", difficulty: 2,
      question: "When to use 401 vs 403?",
      simpleAnswer: "401 Unauthorized means the client is not authenticated (no valid token). 403 Forbidden means the client is authenticated but does not have permission to access the resource.",
      explanation: "Think of it this way: 401 means 'I don't know who you are, please log in first'. 403 means 'I know exactly who you are, but you are not allowed to do this'. A user without a token gets 401. A regular user trying to access an admin endpoint gets 403.",
      analogy: "Authentication is proving who you are — like showing your passport at the airport. Authorization is what you're allowed to do — like having a boarding pass for a specific flight. You can be authenticated (valid passport) but not authorized (wrong flight). 401 is the passport check; 403 is the gate check.",
      example: "GET /admin/reports with no JWT token returns 401. GET /admin/reports with a valid user token (role=USER, not ADMIN) returns 403.",
      followUps: [{ question: "Should you return 404 instead of 403 to hide resource existence?", answer: "Yes, in security-sensitive APIs it is common to return 404 instead of 403 to avoid revealing that a resource exists but is restricted." }],
      keyPoints: ["401: not authenticated", "403: authenticated but no permission", "401 = who are you?", "403 = I know you but you cannot do this"]
    },
    {
      id: 42, category: "REST APIs", difficulty: 2,
      question: "When to use 404?",
      simpleAnswer: "Use 404 Not Found when the requested resource does not exist at the given URL.",
      explanation: "404 is returned when the client requests a resource that cannot be found — either it never existed or it was deleted. It is also used intentionally to hide restricted resources (returning 404 instead of 403 for security). Do not return 404 for empty collections — return 200 with an empty array instead.",
      analogy: "404 is like going to an address that doesn't exist — the street is real but the house number isn't there. The road system (API) works fine; the specific destination just doesn't exist. An empty collection returning 200 with [] is like arriving at a real address and finding an empty room — the place exists, it's just empty.",
      example: "GET /users/9999 where user 9999 does not exist returns 404 Not Found. GET /users where no users exist returns 200 OK with [].",
      followUps: [{ question: "Should a deleted resource return 404 or 410?", answer: "410 Gone is more accurate for permanently deleted resources. 404 is acceptable if you do not track deletions. 410 tells clients to stop requesting that URL." }],
      keyPoints: ["Resource does not exist", "Do not use for empty collections", "Can be used to hide restricted resources", "410 Gone for permanently deleted"]
    },
    {
      id: 43, category: "REST APIs", difficulty: 2,
      question: "When to use 409 (Conflict)?",
      simpleAnswer: "Use 409 Conflict when the request cannot be completed because it conflicts with the current state of the resource — like trying to create a duplicate or update a stale version.",
      explanation: "409 is used for business-level conflicts: creating a user with an email that already exists, trying to confirm an order that is already cancelled, or optimistic locking conflicts where someone else updated the record first.",
      analogy: "409 Conflict is like trying to book a hotel room that someone else just reserved. Your request is perfectly valid — the room exists, you have the right credentials — but the current state of the world (someone else booked it) makes it impossible to fulfill. It's not your fault and not the server's fault; it's a collision of two valid actions.",
      example: "POST /users with {\"email\": \"existing@email.com\"} where that email is already registered returns 409 Conflict. PUT /orders/5 with an outdated version number returns 409 Conflict.",
      followUps: [{ question: "What is optimistic locking and how does 409 relate?", answer: "Optimistic locking uses a version field. If two users update the same record simultaneously, the second update finds the version has changed and returns 409 Conflict." }],
      keyPoints: ["Duplicate resource creation", "Stale data / optimistic locking", "Business state conflicts", "Different from 400 (not a bad request, just a conflict)"]
    },
    {
      id: 44, category: "REST APIs", difficulty: 2,
      question: "When to use 500?",
      simpleAnswer: "Use 500 Internal Server Error when an unexpected error occurs on the server that is not the client's fault — like an unhandled exception, database failure, or null pointer error.",
      explanation: "500 is the generic catch-all for server-side failures. It means something went wrong internally that the client could not have prevented. Never expose stack traces or internal details in the 500 response body — log them server-side and return a generic error message to the client.",
      analogy: "500 is like a restaurant kitchen catching fire unexpectedly — something went wrong inside that nobody planned for, and it's definitely not the customer's fault. The customer just gets told 'we can't serve you right now' — they don't need to know the details of what went wrong in the kitchen.",
      example: "A NullPointerException in a Spring Boot controller that is not caught returns 500. A database connection timeout returns 500. Always log the full error internally.",
      followUps: [{ question: "How do you prevent 500 errors from leaking sensitive info?", answer: "Use a global @ControllerAdvice to catch all unhandled exceptions and return a generic error response. Never let stack traces reach the client." }],
      keyPoints: ["Unexpected server-side failure", "Not the client's fault", "Never expose stack traces to client", "Log internally, return generic message"]
    },
    {
      id: 45, category: "REST APIs", difficulty: 1,
      question: "What is authentication in REST APIs?",
      simpleAnswer: "Authentication is the process of verifying who the client is — confirming their identity before allowing access to the API.",
      explanation: "In REST APIs, authentication is typically done via tokens (JWT), API keys, or OAuth. Since REST is stateless, the client must send credentials with every request — usually in the Authorization header. The server validates the credentials and identifies the caller.",
      analogy: "Authentication is like showing your ID at the door of a building. Every time you enter (every request), you show your badge (JWT token). The security guard (server) checks it's valid and knows who you are. Without the badge, you don't get in — regardless of what you want to do inside.",
      example: "Client sends POST /login with username and password. Server validates and returns a JWT token. Client includes Authorization: Bearer eyJhb... in all subsequent requests.",
      followUps: [{ question: "What is the difference between authentication and authorization?", answer: "Authentication = who are you (identity). Authorization = what are you allowed to do (permissions). Authentication always comes first." }],
      keyPoints: ["Verifies client identity", "JWT tokens are most common in REST", "Credentials sent with every request (stateless)", "Authorization header carries the token"]
    },
    {
      id: 46, category: "REST APIs", difficulty: 1,
      question: "What is authorization in REST APIs?",
      simpleAnswer: "Authorization is the process of determining what an authenticated client is allowed to do — checking permissions after identity is confirmed.",
      explanation: "After authentication confirms who the user is, authorization checks what they can access. This is typically role-based (RBAC) — ADMIN can delete users, USER can only read their own data. In Spring Security, this is handled via @PreAuthorize or security configuration.",
      analogy: "Authorization is like the different access levels in an office building. Everyone with a valid badge (authenticated) can enter the lobby. But only engineers can access the server room, and only executives can access the boardroom. Your badge proves who you are; your access level determines where you can go.",
      example: "User with role=USER calls DELETE /users/5. Server authenticates the token (valid), then checks authorization (role=USER cannot delete) and returns 403 Forbidden.",
      followUps: [{ question: "What is RBAC?", answer: "Role-Based Access Control — permissions are assigned to roles (ADMIN, USER, MANAGER), and users are assigned roles. Access decisions are based on the user's role." }],
      keyPoints: ["Determines what authenticated user can do", "Comes after authentication", "Role-based access control (RBAC)", "403 Forbidden when authorization fails"]
    },
    {
      id: 47, category: "REST APIs", difficulty: 1,
      question: "What is JWT?",
      simpleAnswer: "JWT (JSON Web Token) is a compact, self-contained token that securely carries user identity and claims between client and server without needing server-side session storage.",
      explanation: "A JWT has three parts separated by dots: Header (algorithm), Payload (claims like userId, roles, expiry), and Signature (verifies the token was not tampered with). The server signs the token with a secret key. On each request, the server verifies the signature — no database lookup needed.",
      analogy: "A JWT is like a signed wristband at a festival. The organizer stamps it when you enter (login). At every ride or bar, you show your wristband — they can verify it's genuine without calling the organizer. The wristband has your access level printed on it. When it expires, you need a new one.",
      example: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI1IiwicmVsZSI6IkFETUlOIn0.abc123 — Header.Payload.Signature. The payload decodes to {\"sub\": \"5\", \"role\": \"ADMIN\"}.",
      followUps: [{ question: "Can JWT be tampered with?", answer: "The payload can be decoded by anyone (it is base64, not encrypted). But it cannot be tampered with — changing the payload invalidates the signature. Use HTTPS to prevent interception." }],
      keyPoints: ["Header.Payload.Signature format", "Self-contained — no server session needed", "Signature prevents tampering", "Stateless and scalable"]
    },
    {
      id: 48, category: "REST APIs", difficulty: 2,
      question: "How does JWT work?",
      simpleAnswer: "The server creates a signed JWT on login and sends it to the client. The client stores it and sends it in the Authorization header on every request. The server verifies the signature to authenticate.",
      explanation: "Step 1: Client sends credentials to POST /login. Step 2: Server validates credentials, creates JWT with user info and expiry, signs it with a secret key, returns it. Step 3: Client stores JWT (localStorage or cookie). Step 4: Client sends Authorization: Bearer token on every request. Step 5: Server verifies signature and extracts user info — no DB lookup needed.",
      analogy: "JWT working is like a concert wristband system. You buy a ticket (login), the staff checks your ID and puts on a wristband (JWT). For the rest of the night, every staff member at every door just checks the wristband — they don't call the box office each time. The wristband itself proves you paid and what areas you can access.",
      example: "Login returns {\"token\": \"eyJhb...\"}. Next request: GET /orders with header Authorization: Bearer eyJhb... Server verifies signature, extracts userId=5, returns that user's orders.",
      followUps: [{ question: "What happens when a JWT expires?", answer: "The server returns 401 Unauthorized. The client must re-authenticate or use a refresh token to get a new access token." }],
      keyPoints: ["Login returns signed JWT", "Client sends token in Authorization header", "Server verifies signature on each request", "No server-side session storage needed"]
    },
    {
      id: 49, category: "REST APIs", difficulty: 1,
      question: "What is OAuth?",
      simpleAnswer: "OAuth is an authorization framework that allows a third-party application to access a user's resources on another service without the user sharing their password.",
      explanation: "OAuth lets users grant limited access to their data. For example, an app can use OAuth2 to access a user's Google contacts or GitHub profile without the user sharing their password with that app. For actual sign-in identity, OAuth is commonly paired with OpenID Connect (OIDC).",
      analogy: "OAuth 2.0 is like a hotel key card system. You check in at the front desk (authorization server), prove your identity, and get a key card (access token) that only opens your room and the gym — not every room in the hotel. You give the key card to a friend (third-party app) so they can access the gym on your behalf, without giving them your passport.",
      example: "You click 'Continue with Google' on a website. Google authenticates you and asks whether the app can access your profile data. The app receives a token it can use to call Google's API, but it never sees your Google password.",
      followUps: [{ question: "What is the difference between OAuth and JWT?", answer: "OAuth is an authorization framework (a protocol). JWT is a token format. OAuth can use JWT as its token format, but they are different things." }],
      keyPoints: ["Third-party access without sharing passwords", "Delegated access to protected APIs", "Often paired with OIDC in social login flows", "OAuth is a framework, JWT is a token format"]
    },
    {
      id: 50, category: "REST APIs", difficulty: 1,
      question: "What is an API key?",
      simpleAnswer: "An API key is a simple token (a long random string) that identifies the calling application and is sent with every request to authenticate it.",
      explanation: "API keys are simpler than JWT — no expiry, no user identity, just application identity. They are commonly used for server-to-server communication or public APIs. The key is usually sent in a header (X-API-Key: abc123) or as a query parameter. They do not carry user info — just identify which app is calling.",
      analogy: "An API key is like a library card. You present it every time you borrow a book (make a request). The library knows who you are and tracks your borrowing history. If you lose the card, you get a new one. It's simple but doesn't prove you're the rightful owner — anyone who finds your card can use it.",
      example: "GET /weather?city=Delhi with header X-API-Key: abc123xyz. The server checks if abc123xyz is a valid registered key and allows or denies the request.",
      followUps: [{ question: "What are the downsides of API keys?", answer: "No expiry by default, no user identity, hard to rotate if leaked, and sending in query params risks exposure in logs. JWT is more secure for user-facing APIs." }],
      keyPoints: ["Identifies the calling application", "Simpler than JWT", "No user identity info", "Sent in header or query param"]
    },
    {
      id: 51, category: "REST APIs", difficulty: 1,
      question: "What is HTTPS?",
      simpleAnswer: "HTTPS is HTTP with TLS/SSL encryption — it encrypts all data in transit between client and server, preventing eavesdropping and tampering.",
      explanation: "Without HTTPS, anyone on the network can read your API requests and responses in plain text — including JWT tokens, passwords, and sensitive data. HTTPS uses TLS to encrypt the connection. The server presents a certificate to prove its identity. All REST APIs must use HTTPS in production.",
      analogy: "HTTPS is like sending a letter in a locked box instead of a postcard. With a postcard (HTTP), anyone handling it can read the message. With a locked box (HTTPS/TLS), only the sender and recipient have the key. Even if someone intercepts the box, they can't read what's inside.",
      example: "Without HTTPS: an attacker on the same WiFi can intercept Authorization: Bearer eyJhb... and reuse your token. With HTTPS: all traffic is encrypted and unreadable to attackers.",
      followUps: [{ question: "What is the difference between TLS and SSL?", answer: "SSL is the older protocol (now deprecated). TLS is the modern, secure replacement. When people say SSL today, they usually mean TLS. HTTPS uses TLS." }],
      keyPoints: ["Encrypts data in transit", "Prevents eavesdropping and man-in-the-middle attacks", "Mandatory for production APIs", "Uses TLS certificates"]
    },
    {
      id: 52, category: "REST APIs", difficulty: 1,
      question: "What is CORS?",
      simpleAnswer: "CORS (Cross-Origin Resource Sharing) is a browser security mechanism that controls which domains are allowed to make requests to your API from a web page.",
      explanation: "Browsers block JavaScript from making requests to a different domain than the page it loaded from (same-origin policy). CORS lets your server tell browsers which origins are allowed. The server adds Access-Control-Allow-Origin headers to responses. Without CORS configuration, your React frontend on localhost:3000 cannot call your Spring Boot API on localhost:8080.",
      analogy: "CORS is like a nightclub's guest list policy. By default, only people from the same city (same origin) can enter. If you want to let people from another city in (cross-origin requests), the club owner (server) must explicitly add them to the guest list (Access-Control-Allow-Origin header). Without being on the list, the bouncer (browser) turns them away.",
      example: "React app on https://myapp.com calls GET https://api.myapp.com/users. Browser sends a preflight OPTIONS request. Server responds with Access-Control-Allow-Origin: https://myapp.com. Browser allows the actual request.",
      followUps: [{ question: "How do you configure CORS in Spring Boot?", answer: "Use @CrossOrigin on controllers, or configure globally via WebMvcConfigurer.addCorsMappings(). You can allow specific origins, methods, and headers." }],
      keyPoints: ["Browser security mechanism", "Controls which domains can call your API", "Preflight OPTIONS request for non-simple requests", "Configure in Spring Boot via @CrossOrigin"]
    },
    {
      id: 53, category: "REST APIs", difficulty: 2,
      question: "How do you secure REST APIs?",
      simpleAnswer: "Use HTTPS, JWT or OAuth for authentication, validate all inputs, implement rate limiting, use proper authorization checks, and never expose sensitive data in responses.",
      explanation: "Security layers: Transport (HTTPS), Authentication (JWT/OAuth), Authorization (RBAC), Input validation (prevent injection), Rate limiting (prevent abuse), Error handling (no stack traces), Logging and monitoring (detect attacks). Each layer adds protection.",
      analogy: "Securing a REST API is like securing a bank. You check IDs at the door (authentication), control which areas each person can access (authorization), encrypt everything in transit (HTTPS), monitor for suspicious activity (rate limiting + logging), and never leave sensitive data lying around (no secrets in URLs or logs).",
      example: "A secure Spring Boot API: HTTPS only, JWT validation in filter chain, @PreAuthorize for role checks, @Valid on request bodies, global exception handler hiding internals, rate limiting via API Gateway.",
      followUps: [{ question: "What is SQL injection and how do you prevent it in REST APIs?", answer: "SQL injection is when attackers send malicious SQL in request parameters. Prevent it by using parameterized queries or JPA repositories — never concatenate user input into SQL strings." }],
      keyPoints: ["HTTPS for transport security", "JWT/OAuth for authentication", "Input validation to prevent injection", "Rate limiting to prevent abuse"]
    },
    {
      id: 54, category: "REST APIs", difficulty: 2,
      question: "How do you design error responses in REST APIs?",
      simpleAnswer: "Return a consistent JSON error object with a status code, error code, human-readable message, and optionally field-level details for validation errors.",
      explanation: "Never return plain text errors or expose stack traces. A good error response has: HTTP status code, an application-specific error code, a message for developers, and optionally a list of field errors for validation failures. Consistency across all endpoints is critical.",
      analogy: "Good error handling is like a helpful GPS. When you take a wrong turn, it doesn't just go silent — it tells you 'turn around in 200 meters' with a clear reason. A good API error response tells the client exactly what went wrong, why, and ideally how to fix it — not just 'something failed'.",
      example: "{\"status\": 400, \"errorCode\": \"VALIDATION_FAILED\", \"message\": \"Request validation failed\", \"errors\": [{\"field\": \"email\", \"message\": \"must be a valid email\"}]}",
      followUps: [{ question: "Should you include a timestamp in error responses?", answer: "Yes, including a timestamp helps with debugging and correlating errors with logs. Also include a requestId or traceId for distributed tracing." }],
      keyPoints: ["Consistent JSON error structure", "Never expose stack traces", "Include error code and message", "Field-level errors for validation failures"]
    },
    {
      id: 55, category: "REST APIs", difficulty: 2,
      question: "What should an error response contain?",
      simpleAnswer: "An error response should contain: HTTP status code, application error code, human-readable message, timestamp, request path, and field-level errors for validation failures.",
      explanation: "A well-designed error response helps developers debug quickly. The status field mirrors the HTTP status. The errorCode is a machine-readable code your team defines. The message explains what went wrong. The path shows which endpoint failed. Field errors list exactly which input fields are invalid.",
      analogy: "A good error response is like a doctor's diagnosis note. It tells you what's wrong (error code), explains it in plain language (message), and points to the specific problem (field name, details). A bad error response is like a doctor just saying 'you're sick' — technically true but completely unhelpful.",
      example: "{\"timestamp\": \"2024-01-15T10:30:00Z\", \"status\": 422, \"errorCode\": \"INVALID_INPUT\", \"message\": \"Validation failed\", \"path\": \"/api/users\", \"errors\": [{\"field\": \"age\", \"message\": \"must be positive\"}]}",
      followUps: [{ question: "Should error messages be user-facing or developer-facing?", answer: "Include a developer-facing technical message and optionally a user-friendly message. Never include internal details like class names or SQL queries." }],
      keyPoints: ["Status code", "Application error code", "Human-readable message", "Timestamp and request path", "Field errors for validation"]
    },
    {
      id: 56, category: "REST APIs", difficulty: 1,
      question: "What is global exception handling in REST APIs?",
      simpleAnswer: "Global exception handling catches all unhandled exceptions across all controllers in one place and returns consistent, structured error responses.",
      explanation: "Without global exception handling, unhandled exceptions return ugly 500 errors with stack traces. In Spring Boot, @ControllerAdvice with @ExceptionHandler methods catches specific exceptions globally and maps them to proper HTTP responses. This keeps error handling DRY and consistent.",
      analogy: "Global exception handling is like a building's fire suppression system. Instead of each room having its own fire extinguisher that might be used differently, one central system activates consistently across the whole building. Every unhandled exception gets caught and formatted the same way — no matter which endpoint triggered it.",
      example: "@RestControllerAdvice class GlobalExceptionHandler { @ExceptionHandler(ResourceNotFoundException.class) returns 404, @ExceptionHandler(MethodArgumentNotValidException.class) returns 400 with field errors, @ExceptionHandler(Exception.class) returns 500 with generic message. }",
      followUps: [{ question: "What is the difference between @ControllerAdvice and @RestControllerAdvice?", answer: "@RestControllerAdvice is @ControllerAdvice + @ResponseBody. It automatically serializes the return value to JSON, which is what you want for REST APIs." }],
      keyPoints: ["Centralized error handling", "@RestControllerAdvice in Spring Boot", "Maps exceptions to HTTP responses", "Keeps error handling DRY and consistent"]
    },
    {
      id: 57, category: "REST APIs", difficulty: 2,
      question: "How do you maintain consistent error structure across a REST API?",
      simpleAnswer: "Define a standard error response class, use global exception handling to always return it, and document it in your API spec so all consumers know what to expect.",
      explanation: "Create a single ErrorResponse POJO with fixed fields. All exception handlers in @RestControllerAdvice return this same class. This guarantees every error — validation, not found, server error — has the same JSON structure. Document it in OpenAPI/Swagger so frontend teams can handle errors uniformly.",
      analogy: "Consistent error structure is like a standardized incident report form at a company. No matter which department files it — HR, engineering, finance — the form always has the same fields: date, severity, description, action taken. Anyone reading it knows exactly where to find each piece of information.",
      example: "Every error from your API always returns: {\"status\": int, \"errorCode\": string, \"message\": string, \"timestamp\": string}. Frontend can always check response.errorCode regardless of which endpoint failed.",
      followUps: [{ question: "What happens if different teams own different microservices?", answer: "Define a shared error response standard in your API design guidelines. Each team implements the same structure so API Gateway and frontend can handle errors uniformly across all services." }],
      keyPoints: ["Single ErrorResponse class", "All handlers return same structure", "Document in OpenAPI spec", "Frontend handles errors uniformly"]
    },
    {
      id: 58, category: "REST APIs", difficulty: 3,
      question: "How do you improve API performance?",
      simpleAnswer: "Use caching, pagination, database indexing, async processing, compression, and connection pooling to reduce response times and server load.",
      explanation: "Performance improvements work at multiple layers: Cache frequent responses (Redis), paginate large datasets, add database indexes on queried columns, use async processing for heavy tasks, enable GZIP compression on responses, use connection pooling (HikariCP), and avoid N+1 queries.",
      analogy: "API performance optimization is like tuning a car engine. You identify the bottleneck (is it the carburetor? the exhaust?), fix the specific part that's slowing things down, and measure the improvement. You don't replace the whole car — you diagnose and fix the specific constraint.",
      example: "GET /products is called 10,000 times/minute. Cache the response in Redis for 60 seconds — only 1 database query per minute instead of 10,000. Response time drops from 200ms to 2ms.",
      followUps: [{ question: "What is the difference between client-side and server-side caching?", answer: "Client-side caching uses HTTP cache headers (Cache-Control, ETag) so browsers/clients cache responses. Server-side caching uses Redis or in-memory caches to avoid repeated database queries." }],
      keyPoints: ["Caching with Redis", "Pagination for large datasets", "Database indexing", "GZIP compression", "Connection pooling"]
    },
    {
      id: 59, category: "REST APIs", difficulty: 1,
      question: "What is caching in REST APIs?",
      simpleAnswer: "Caching stores the result of an expensive operation (like a database query) so future identical requests can be served from the cache instead of recomputing.",
      explanation: "HTTP caching uses Cache-Control and ETag headers to let clients and proxies cache responses. Server-side caching uses Redis or Memcached to cache database query results. Caching dramatically reduces latency and database load for read-heavy APIs.",
      analogy: "Caching is like keeping a photocopy of a frequently requested document at the front desk. Instead of going to the filing room (database) every time someone asks for it, you hand them the copy instantly. When the original changes, you update the copy. Most requests never need to touch the filing room at all.",
      example: "GET /products/5 hits the database first time (200ms). Response includes Cache-Control: max-age=300. Next 300 seconds, the browser serves from cache (0ms). Server-side: Spring Boot @Cacheable stores result in Redis.",
      followUps: [{ question: "What is cache invalidation and why is it hard?", answer: "Cache invalidation means removing stale cached data when the underlying data changes. It is hard because you must decide when to invalidate — too early wastes the cache, too late serves stale data." }],
      keyPoints: ["Reduces database load", "HTTP caching via Cache-Control headers", "Server-side caching with Redis", "Cache invalidation is the hard part"]
    },
    {
      id: 60, category: "REST APIs", difficulty: 1,
      question: "What is rate limiting?",
      simpleAnswer: "Rate limiting restricts how many requests a client can make to an API within a time window — protecting the server from abuse, overload, and denial-of-service attacks.",
      explanation: "Rate limiting is typically implemented at the API Gateway level. Common strategies: fixed window (100 requests per minute), sliding window, or token bucket. When the limit is exceeded, the server returns 429 Too Many Requests with a Retry-After header telling the client when to try again.",
      analogy: "Rate limiting is like a coffee shop that only serves each customer a maximum of 5 coffees per hour. After your 5th coffee, the barista says 'come back in an hour'. This prevents one person from monopolizing the coffee machine and ensures everyone gets served. APIs do the same to prevent abuse and protect server resources.",
      example: "A free-tier API allows 100 requests/minute per API key. On the 101st request, the server returns 429 Too Many Requests with header Retry-After: 45 (seconds until the window resets).",
      followUps: [{ question: "How do you implement rate limiting in Spring Boot?", answer: "Use a library like Bucket4j or implement it at the API Gateway (AWS API Gateway, Kong, Nginx). Spring Boot itself does not have built-in rate limiting." }],
      keyPoints: ["Protects against abuse and DDoS", "Returns 429 Too Many Requests", "Retry-After header tells client when to retry", "Implemented at API Gateway level"]
    },
    {
      id: 61, category: "REST APIs", difficulty: 1,
      question: "What is load balancing?",
      simpleAnswer: "Load balancing distributes incoming API requests across multiple server instances to prevent any single server from being overwhelmed.",
      explanation: "A load balancer sits in front of your API servers and routes each request to the least busy or next available instance using algorithms like Round Robin, Least Connections, or IP Hash. This improves availability, scalability, and fault tolerance. If one instance goes down, the load balancer routes traffic to healthy ones.",
      analogy: "Load balancing is like a supermarket with multiple checkout lanes. Instead of everyone queuing at lane 1 while lanes 2-5 are empty, a staff member directs customers to the shortest queue. Each server (lane) handles a fair share of the work, and no single server gets overwhelmed.",
      example: "Your Spring Boot API runs on 3 instances. A load balancer receives 300 requests/second and sends 100 to each instance. If instance 2 crashes, the load balancer detects it via health checks and splits traffic between instances 1 and 3.",
      followUps: [{ question: "What is the difference between load balancing and API Gateway?", answer: "Load balancer distributes traffic at the network level. API Gateway adds application-level features like authentication, rate limiting, and routing. They are often used together." }],
      keyPoints: ["Distributes traffic across instances", "Prevents single point of failure", "Round Robin and Least Connections algorithms", "Health checks detect failed instances"]
    },
    {
      id: 62, category: "REST APIs", difficulty: 3,
      question: "What is the impact of pagination on performance?",
      simpleAnswer: "Pagination dramatically improves performance by loading only a small subset of data per request instead of fetching all records at once.",
      explanation: "Without pagination, GET /orders on a table with 1 million rows loads all 1 million records into memory, serializes them to JSON, and sends a massive response. With pagination, you load 20 records at a time. This reduces database load, memory usage, network bandwidth, and response time significantly.",
      analogy: "Pagination's impact on performance is like the difference between a library handing you every book they own versus letting you browse one shelf at a time. Carrying all million books at once would collapse the floor. Browsing shelf by shelf is fast, manageable, and you only carry what you actually need.",
      example: "GET /orders without pagination: 1 million rows, 500MB response, 30 second timeout. GET /orders?page=1&size=20: 20 rows, 5KB response, 10ms response time.",
      followUps: [{ question: "What is the downside of offset-based pagination for large datasets?", answer: "OFFSET becomes slow on large tables because the database still scans all skipped rows. For example, OFFSET 100000 LIMIT 20 scans 100,020 rows. Cursor-based pagination avoids this." }],
      keyPoints: ["Loads small subsets instead of all data", "Reduces memory, bandwidth, and response time", "OFFSET pagination slows on large datasets", "Cursor-based pagination is more efficient"]
    },
    {
      id: 63, category: "REST APIs", difficulty: 1,
      question: "What is idempotency in REST APIs?",
      simpleAnswer: "An API operation is idempotent if making the same request multiple times produces the same result as making it once — no extra side effects on retries.",
      explanation: "GET, PUT, DELETE, and HEAD are idempotent by design. POST is not. Idempotency is critical in distributed systems where network failures cause clients to retry requests. If a DELETE /orders/5 is retried after a timeout, the order is still deleted — same result. If POST /orders is retried, a duplicate order is created.",
      analogy: "Idempotency in REST APIs is like a light switch. Flipping it off once turns the light off. Flipping it off five more times — the light is still off. The result is the same no matter how many times you repeat the action. Pressing a doorbell, on the other hand, rings it every single time — that's not idempotent.",
      example: "Client sends DELETE /orders/5. Network times out. Client retries DELETE /orders/5. First call deleted the order. Second call gets 404 (already gone). Same end state — idempotent.",
      followUps: [{ question: "How do you make POST idempotent?", answer: "Use an idempotency key — the client sends a unique X-Idempotency-Key header. The server stores processed keys and returns the cached response if the same key is seen again." }],
      keyPoints: ["Same result on repeated calls", "GET, PUT, DELETE are idempotent", "POST is not idempotent by default", "Critical for safe retries in distributed systems"]
    },
    {
      id: 64, category: "REST APIs", difficulty: 2,
      question: "Why does idempotency matter in REST APIs?",
      simpleAnswer: "Idempotency matters because network failures cause clients to retry requests — without idempotency, retries can create duplicate data, double charges, or inconsistent state.",
      explanation: "In distributed systems, networks are unreliable. A client sends a request, the server processes it, but the response is lost. The client retries. If the operation is not idempotent, the server processes it again — creating a duplicate order, charging a card twice, or sending two emails. Idempotency guarantees retries are safe.",
      analogy: "Idempotency matters because network failures cause retries — like a fax machine that keeps resending if it doesn't get a confirmation. If the recipient's fax machine processes every copy, you end up with ten copies of the same document. Idempotency means the fax machine checks 'did I already receive this?' and only processes it once.",
      example: "Payment API: client sends POST /payments for Rs 5000. Network drops. Client retries. Without idempotency: customer is charged Rs 10000. With idempotency key: server detects duplicate and returns the original payment response.",
      followUps: [{ question: "Which HTTP methods are safe to retry automatically?", answer: "GET, HEAD, PUT, DELETE are safe to retry. POST should only be retried if the server supports idempotency keys. PATCH depends on implementation." }],
      keyPoints: ["Network failures cause retries", "Non-idempotent retries cause duplicates", "Critical for payment and financial APIs", "Idempotency keys make POST safe to retry"]
    },
    {
      id: 65, category: "REST APIs", difficulty: 2,
      question: "How do you implement idempotent APIs?",
      simpleAnswer: "Use idempotency keys — the client generates a unique key per request and sends it in a header. The server stores processed keys and returns cached responses for duplicate requests.",
      explanation: "The client generates a UUID for each logical operation and sends it as X-Idempotency-Key: uuid-here. The server checks if this key was already processed. If yes, return the stored response. If no, process the request, store the result against the key, and return the response. Keys are typically stored in Redis with a TTL.",
      analogy: "Implementing idempotent APIs is like a restaurant that gives each order a unique ticket number. If the same ticket comes in twice (network retry), the kitchen checks 'did we already make order #1234?' and returns the same meal rather than cooking it again. The ticket number is your idempotency key.",
      example: "Client sends POST /payments with X-Idempotency-Key: 550e8400-e29b-41d4-a716-446655440000. Server processes payment, stores {key: '550e...', response: {paymentId: 99}}. Client retries with same key. Server finds key in Redis, returns cached {paymentId: 99} without charging again.",
      followUps: [{ question: "How long should idempotency keys be stored?", answer: "Typically 24 hours to 7 days depending on your retry window. Store in Redis with TTL so they expire automatically." }],
      keyPoints: ["Client generates unique UUID per operation", "Server stores processed keys in Redis", "Duplicate key returns cached response", "Keys expire after TTL"]
    },
    {
      id: 66, category: "REST APIs", difficulty: 1,
      question: "What is a retry mechanism in REST APIs?",
      simpleAnswer: "A retry mechanism automatically resends a failed request after a delay, used when transient errors like network timeouts or 503 responses occur.",
      explanation: "Retries should only be used for idempotent operations or when idempotency keys are in place. Use exponential backoff — wait 1s, then 2s, then 4s between retries — to avoid overwhelming a struggling server. Set a maximum retry count. Do not retry on 4xx errors (client errors) — only on 5xx or network failures.",
      analogy: "A retry mechanism is like redialing a phone number when the call drops. You don't redial instantly every millisecond — you wait a moment, try again, wait a bit longer, try again. And if you get a 'number not in service' message (4xx), you stop — redialing won't help. You only retry when the problem might be temporary.",
      example: "Client calls GET /products. Gets 503 Service Unavailable. Waits 1 second, retries. Gets 503 again. Waits 2 seconds, retries. Gets 200 OK. Total: 3 attempts with exponential backoff.",
      followUps: [{ question: "What is exponential backoff with jitter?", answer: "Exponential backoff doubles the wait time on each retry. Jitter adds randomness to prevent all clients from retrying at the exact same moment (thundering herd problem)." }],
      keyPoints: ["Only retry idempotent operations", "Exponential backoff between retries", "Do not retry 4xx errors", "Set maximum retry count"]
    },
    {
      id: 67, category: "REST APIs", difficulty: 2,
      question: "How would you design a payment API?",
      simpleAnswer: "Design with idempotency keys to prevent duplicate charges, use HTTPS, validate all inputs, return proper status codes, and make the payment creation atomic.",
      explanation: "Key design decisions: POST /payments with X-Idempotency-Key header to prevent double charges. Validate amount, currency, and card details before processing. Return 201 Created with payment ID on success. Use database transactions to ensure atomicity. Store payment status (PENDING, SUCCESS, FAILED). Emit events for downstream processing.",
      analogy: "Designing a payment API is like designing a cash register system. Every transaction gets a unique receipt number (idempotency key). The register validates the payment before processing (input validation). The transaction is atomic — either the money moves and the receipt prints, or neither happens. And every transaction is logged for auditing.",
      example: "POST /v1/payments with body {\"amount\": 5000, \"currency\": \"INR\", \"cardToken\": \"tok_abc\"} and header X-Idempotency-Key: uuid. Returns 201 {\"paymentId\": 99, \"status\": \"SUCCESS\", \"amount\": 5000}.",
      followUps: [{ question: "How do you handle payment failures?", answer: "Return an appropriate business-level 4xx response (many APIs use 400, 409, or 422; some payment providers use 402 by convention), store the failure reason, and do not auto-retry hard declines without user action." }],
      keyPoints: ["Idempotency key to prevent duplicate charges", "HTTPS mandatory", "Atomic database transaction", "Emit events for downstream services"]
    },
    {
      id: 68, category: "REST APIs", difficulty: 2,
      question: "How do you handle duplicate requests in REST APIs?",
      simpleAnswer: "Use idempotency keys — clients send a unique key with each request, and the server deduplicates by checking if that key was already processed.",
      explanation: "Duplicate requests happen due to network retries, client bugs, or user double-clicking. For POST requests, the client generates a UUID and sends it as X-Idempotency-Key. The server stores processed keys in Redis. On duplicate, return the original response without reprocessing. For database-level deduplication, use unique constraints on business keys.",
      analogy: "Handling duplicate requests is like a post office that stamps each letter with a unique tracking number. If the same letter arrives twice (network retry), the post office checks 'did we already deliver tracking number #1234?' and returns the delivery confirmation without delivering it again. The tracking number is your idempotency key.",
      example: "User double-clicks 'Place Order'. Two POST /orders requests fire simultaneously with the same X-Idempotency-Key. First request creates the order. Second request finds the key in Redis and returns the same order response — no duplicate order created.",
      followUps: [{ question: "What is a unique constraint and how does it help?", answer: "A database unique constraint on a business key (like order reference number) prevents duplicate rows even if two requests slip through simultaneously. It is a last line of defense." }],
      keyPoints: ["Idempotency keys for POST requests", "Store processed keys in Redis with TTL", "Database unique constraints as backup", "Return cached response for duplicates"]
    },
    {
      id: 69, category: "REST APIs", difficulty: 2,
      question: "How do you handle large data responses in REST APIs?",
      simpleAnswer: "Use pagination to return data in chunks, streaming for very large files, compression to reduce payload size, and field filtering to return only needed fields.",
      explanation: "Never return millions of records in one response. Use pagination (?page=1&size=20). For file downloads, use streaming instead of loading the entire file into memory. Enable GZIP compression on responses. Support field filtering (?fields=id,name) so clients only get what they need. For very large exports, use async processing — return a job ID and let the client poll for completion.",
      analogy: "Handling large data responses is like a buffet restaurant. Instead of piling every dish on your plate at once (returning all records), you take one plate at a time (pagination). For a takeaway order of 500 items, the restaurant gives you a ticket and calls you when it's ready (async processing) — you don't stand at the counter blocking everyone else.",
      example: "GET /reports/export with 1 million rows: instead of returning all data, return {\"jobId\": \"abc123\", \"status\": \"PROCESSING\"}. Client polls GET /reports/export/abc123/status. When ready, GET /reports/export/abc123/download streams the file.",
      followUps: [{ question: "What is field filtering (sparse fieldsets)?", answer: "Allowing clients to specify which fields to return: GET /users?fields=id,name,email. Reduces payload size and improves performance when clients only need a few fields." }],
      keyPoints: ["Pagination for large datasets", "Streaming for file downloads", "GZIP compression", "Async processing for large exports"]
    },
    {
      id: 70, category: "REST APIs", difficulty: 2,
      question: "How do you design an API for high traffic?",
      simpleAnswer: "Use caching, horizontal scaling, load balancing, async processing, database optimization, and CDN for static content to handle high traffic.",
      explanation: "High traffic design: Cache frequent read responses in Redis. Scale horizontally — run multiple API instances behind a load balancer. Use async processing for heavy operations (Kafka, SQS). Optimize database queries with indexes. Use connection pooling (HikariCP). Implement rate limiting to prevent abuse. Use CDN for static assets.",
      analogy: "Designing an API for high traffic is like running a busy airport. You add more check-in counters (horizontal scaling), pre-print boarding passes for frequent flyers (caching), handle baggage separately from passengers (async processing), and have a fast lane for priority passengers (rate limiting tiers). No single bottleneck can shut down the whole airport.",
      example: "E-commerce API during a sale: Redis caches product catalog (10ms reads). 10 Spring Boot instances behind AWS ALB. Order creation publishes to Kafka (async). Database has indexes on product_id and user_id. Rate limiting prevents bot abuse.",
      followUps: [{ question: "What is the difference between vertical and horizontal scaling?", answer: "Vertical scaling adds more CPU/RAM to one server (limited and expensive). Horizontal scaling adds more server instances (unlimited and cost-effective). REST APIs are stateless so horizontal scaling is straightforward." }],
      keyPoints: ["Redis caching for read-heavy endpoints", "Horizontal scaling with load balancer", "Async processing with Kafka/SQS", "Database indexes and connection pooling"]
    },
    {
      id: 71, category: "REST APIs", difficulty: 2,
      question: "How do you ensure backward compatibility in REST APIs?",
      simpleAnswer: "Never remove or rename existing fields, use versioning for breaking changes, only add new optional fields, and deprecate old versions gradually.",
      explanation: "Backward compatible changes: adding new optional fields, adding new endpoints, adding new optional query parameters. Breaking changes that require a new version: removing fields, renaming fields, changing field types, changing URL structure, changing HTTP method. Always run old and new versions in parallel during migration.",
      analogy: "Backward compatibility is like adding a new USB port to a laptop without removing the old ones. Existing users with old cables (clients) still work fine. New users can use the new port. You never break what already works — you only add, never remove or rename.",
      example: "v1 returns {\"name\": \"Nikhil\"}. You want to split into firstName and lastName. Wrong: remove name field (breaking). Right: create /v2/users that returns {\"firstName\": \"Nikhil\", \"lastName\": \"Gadhwal\"} while keeping /v1/users working.",
      followUps: [{ question: "How long should you maintain old API versions?", answer: "Communicate a deprecation timeline (typically 6-12 months), notify consumers, monitor usage, and only retire a version when all consumers have migrated." }],
      keyPoints: ["Never remove or rename existing fields", "New optional fields are backward compatible", "Breaking changes require new version", "Deprecate old versions with timeline"]
    },
    {
      id: 72, category: "REST APIs", difficulty: 2,
      question: "How do you log and monitor REST APIs?",
      simpleAnswer: "Log every request and response with correlation IDs, monitor key metrics (latency, error rate, throughput), set up alerts, and use distributed tracing for microservices.",
      explanation: "Logging: log request method, URL, status code, response time, and correlation ID for every request. Use structured JSON logging for easy parsing. Monitoring: track p99 latency, error rate, and requests per second. Use Spring Boot Actuator for health and metrics. Distributed tracing with tools like Zipkin or AWS X-Ray to trace requests across microservices.",
      analogy: "API monitoring is like a hospital's patient monitoring system. Vital signs (response time, error rate, throughput) are tracked continuously. If something goes out of the normal range, an alarm sounds immediately. You don't wait for a patient to crash before checking their vitals — you monitor proactively.",
      example: "Every request logs: {\"traceId\": \"abc123\", \"method\": \"POST\", \"path\": \"/orders\", \"status\": 201, \"durationMs\": 45, \"userId\": 5}. Grafana dashboard shows p99 latency spiking — alert fires to PagerDuty.",
      followUps: [{ question: "What is a correlation ID and why is it important?", answer: "A unique ID generated per request that is passed through all services. It lets you trace a single user request across multiple microservices and log entries in distributed systems." }],
      keyPoints: ["Structured JSON logging", "Correlation ID per request", "Monitor latency, error rate, throughput", "Distributed tracing across microservices"]
    },
    {
      id: 73, category: "REST APIs", difficulty: 3,
      question: "How do you debug production API issues?",
      simpleAnswer: "Use correlation IDs to trace the request in logs, check error rates and latency in monitoring dashboards, reproduce locally if possible, and analyze recent deployments for changes.",
      explanation: "Step 1: Get the correlation ID from the user or error report. Step 2: Search logs for that ID to see the full request flow. Step 3: Check monitoring dashboards for error rate spikes or latency increases. Step 4: Check if a recent deployment caused the issue. Step 5: Check database slow query logs. Step 6: Use Spring Boot Actuator health endpoints to check service status.",
      analogy: "Debugging production API issues is like a detective investigating a crime scene. You start with the evidence (correlation ID in logs), trace the timeline (request flow), check for recent changes (deployments), and narrow down the suspect (the specific service or query that failed). You follow the clues rather than guessing.",
      example: "User reports order not created. Get their request correlation ID. Search ELK logs: find 500 error at OrderService, caused by database connection timeout. Check monitoring: DB connection pool exhausted after deployment. Fix: increase HikariCP pool size.",
      followUps: [{ question: "How do you debug an issue you cannot reproduce locally?", answer: "Add more detailed logging around the suspected area, deploy to staging with production-like data, use feature flags to enable debug logging for specific users, and analyze heap/thread dumps if it is a JVM issue." }],
      keyPoints: ["Use correlation ID to trace in logs", "Check monitoring dashboards first", "Correlate with recent deployments", "Spring Boot Actuator for health checks"]
    },
    {
      id: 74, category: "REST APIs", difficulty: 1, topic: "9. Idempotency & Reliability", difficulty: "Intermediate",
      question: "What are ETag and If-Match headers, and how do they help prevent lost updates?",
      simpleAnswer: "ETag is a version identifier for a resource representation. Clients send If-Match with the ETag they last saw, and the server only applies the update if the version still matches.",
      explanation: "This is a common optimistic concurrency control pattern for APIs. Without it, two users can read the same resource, make changes, and the later write silently overwrites the first one. With ETag/If-Match, the second update fails if the resource changed in the meantime, so the client can re-read and retry intentionally.",
      analogy: "An ETag is like a version number on a document. When you ask for the document again, you say 'I have version 7 — has it changed?' If the server still has version 7, it says '304 Not Modified — use what you have'. If it's now version 8, it sends the new document. You only download what's actually changed.",
      example: "Client A GETs /orders/5 and receives ETag: \"v3\". Client B updates the order, making it v4. Client A later sends PUT /orders/5 with If-Match: \"v3\". Server returns 412 Precondition Failed instead of overwriting the newer data.",
      followUps: [{ question: "How is this related to optimistic locking in the database?", answer: "They solve the same problem at different layers. APIs often expose a version field or ETag that maps to an optimistic locking/version column in the database." }],
      keyPoints: ["ETag identifies a resource version", "If-Match prevents stale overwrites", "Useful for PUT/PATCH on shared resources", "Common optimistic concurrency pattern"]
    },
    {
      id: 75, category: "REST APIs", difficulty: 1, topic: "10. Real-World Scenarios", difficulty: "Intermediate",
      question: "What is a webhook and when should you use one?",
      simpleAnswer: "A webhook is an HTTP callback where your server sends an event notification to another system when something happens, instead of that system polling repeatedly.",
      explanation: "Webhooks are useful when the consumer wants near-real-time updates without constantly asking your API for status. They reduce polling noise and can shorten end-to-end latency, but they require retries, signing, idempotency, and observability because delivery is over the open internet and can fail.",
      analogy: "A webhook is like signing up for text alerts from your bank. Instead of you calling the bank every hour to check your balance (polling), the bank texts you automatically whenever something happens. You register your phone number (webhook URL) once, and the bank pushes updates to you in real time.",
      example: "A payment provider sends your backend a webhook like POST /payments/webhook when a payment succeeds or fails. Your system updates the order status when that callback arrives.",
      followUps: [{ question: "When is polling still a better fit than webhooks?", answer: "Polling is simpler when the client cannot expose a public callback endpoint, when latency requirements are relaxed, or when reliability and debugging simplicity matter more than immediacy." }],
      keyPoints: ["Server-to-server event callback", "Reduces client polling", "Useful for payment, delivery, and async job updates", "Needs retry, idempotency, and security hardening"]
    },
    {
      id: 76, category: "REST APIs", difficulty: 2, topic: "6. Security", difficulty: "Core",
      question: "How do you secure webhook endpoints?",
      simpleAnswer: "Verify a cryptographic signature, validate timestamps to prevent replay, allow idempotent processing, and return a fast acknowledgment before doing heavy work asynchronously.",
      explanation: "Because webhooks come from external systems, you cannot trust the payload blindly. Providers usually sign the raw request body with a shared secret. Your server recomputes the HMAC and compares it securely. To reduce replay attacks, many providers also include a timestamp that must be recent. You should also make webhook consumers idempotent because providers retry on timeouts and failures.",
      analogy: "Securing a webhook endpoint is like verifying a signed delivery. The courier (webhook provider) signs the package with a tamper-evident seal (HMAC signature). When it arrives, you check the seal matches before opening it. If the seal is broken or missing, you reject the delivery — you don't process packages that could have been tampered with in transit.",
      example: "Stripe-style flow: read the raw body, compute HMAC(secret, timestamp + body), compare with the signature header, reject if invalid or too old, store the event ID to dedupe retries, respond 200 quickly, then hand off processing to a queue.",
      followUps: [{ question: "Why should you acknowledge quickly instead of doing all work inline?", answer: "Providers often retry if your endpoint is slow. Returning a fast 2xx and processing asynchronously reduces duplicate deliveries and makes the integration more reliable." }],
      keyPoints: ["Verify HMAC signature on raw body", "Check timestamp/replay window", "Store event IDs for deduplication", "Acknowledge fast, process asynchronously"]
    },
    {
      id: 77, category: "REST APIs", difficulty: 2, topic: "10. Real-World Scenarios", difficulty: "Core",
      question: "How do you design an asynchronous REST API for long-running work?",
      simpleAnswer: "Accept the request quickly, return 202 Accepted with a job/resource ID, process the work in the background, and expose a status endpoint or webhook callback for result tracking.",
      explanation: "Long-running work like report generation, video processing, or bulk imports should not block a user-facing HTTP connection for minutes. The standard pattern is submit -> receive job ID -> poll or subscribe for status. This gives better resilience, avoids timeouts, and lets you retry background steps safely.",
      analogy: "An async REST API is like dropping off your car at a garage. You leave the car (submit the request), get a ticket (job ID), and go about your day. Later you call back with your ticket number to check if the car is ready (poll for status). You don't stand at the garage waiting — you're free to do other things.",
      example: "POST /reports returns 202 Accepted with {\"jobId\":\"rpt-123\"}. Client polls GET /reports/jobs/rpt-123 until status becomes COMPLETED, or registers a webhook to be notified when the report is ready.",
      followUps: [{ question: "What should the status endpoint return?", answer: "At minimum: job ID, status, timestamps, progress if available, and either the result location or an error reason when the job completes or fails." }],
      keyPoints: ["Return 202 for accepted background work", "Expose job ID and status endpoint", "Use polling or webhooks for completion", "Avoid holding long-running synchronous HTTP requests open"]
    }
  ]
};
