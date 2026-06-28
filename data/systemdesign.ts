export interface SystemDesignScenario {
  id: string;
  title: string;
  category: 'hld' | 'lld' | 'uml' | 'scenario';
  difficulty: 'medium' | 'hard';
  companies: string[];
  tags: string[];
  problem: string;
  requirements: {
    functional: string[];
    nonFunctional: string[];
  };
  estimations?: {
    label: string;
    value: string;
  }[];
  hldComponents?: {
    name: string;
    description: string;
    tech: string;
  }[];
  approach: string;
  keyDecisions: string[];
  diagram?: string;
  deepDive?: string;
}

export const systemDesignScenarios: SystemDesignScenario[] = [
  {
    id: 'recommendation-system',
    title: 'Design a Recommendation System (Netflix/Amazon)',
    category: 'scenario',
    difficulty: 'hard',
    companies: ['Google', 'Amazon', 'Netflix', 'Microsoft', 'Adobe'],
    tags: ['ML Pipeline', 'Real-time', 'Personalization', 'Collaborative Filtering'],
    problem: `Design a recommendation system like Netflix's "Recommended for You" or Amazon's "Customers also bought". The system should recommend relevant items to users based on their behavior, preferences, and similarity to other users.`,
    requirements: {
      functional: [
        'Recommend N items per user (homepage, item detail page, emails)',
        'Support two modes: real-time (per request) and batch (pre-computed)',
        'Handle new users with no history (cold start problem)',
        'Support A/B testing different recommendation algorithms',
        'Track and log which recommendations were clicked',
      ],
      nonFunctional: [
        '10M+ DAU, 1B+ items in catalog',
        'P99 latency < 100ms for recommendation requests',
        'Recommendation freshness: update within 24 hours of new behavior',
        '99.99% availability — recommendations always served (even stale)',
        'Personalized for each user — not just global trending',
      ],
    },
    estimations: [
      { label: 'Users', value: '10M DAU' },
      { label: 'Catalog size', value: '1B items' },
      { label: 'Requests/sec', value: '~50K RPS (peak)' },
      { label: 'Events/day', value: '~500M click/view events' },
      { label: 'Storage (user vectors)', value: '~20TB (128-dim float vectors)' },
    ],
    hldComponents: [
      { name: 'Event Collector', description: 'Captures user actions (views, clicks, purchases, ratings)', tech: 'Kafka + Flink' },
      { name: 'Feature Store', description: 'Precomputed user features and item embeddings', tech: 'Redis + Feast' },
      { name: 'ML Training Pipeline', description: 'Trains collaborative filtering / deep learning models', tech: 'Spark + MLflow' },
      { name: 'Candidate Generator', description: 'Retrieves top-K candidate items efficiently (ANN search)', tech: 'Faiss / Pinecone' },
      { name: 'Ranker', description: 'Scores candidates using richer ML model (user context, diversity)', tech: 'TensorFlow Serving' },
      { name: 'Recommendation API', description: 'Serves ranked results with caching fallback', tech: 'FastAPI + Redis' },
      { name: 'A/B Test Layer', description: 'Routes users to different algorithm variants', tech: 'Custom flags + Statsig' },
    ],
    approach: `## How to Think About This

**Three-stage pipeline is the standard:**

### Stage 1 — Candidate Generation (Recall)
Goal: go from 1B items → ~1000 candidates quickly.
- **Collaborative Filtering**: users who watched A also watched B. User-user and item-item similarity.
- **Matrix Factorization (ALS)**: learn latent factor vectors for users and items. Recommend items with high dot product.
- **Two-tower model**: learn user embedding and item embedding separately, then ANN search.
- Store item embeddings in a vector database. At query time, embed the user and do nearest-neighbor search.

### Stage 2 — Ranking (Precision)
Goal: go from 1000 candidates → top 20 personalized.
- Use a richer model (more features: time of day, device, session context, item freshness)
- Can afford higher latency here since fewer items
- Add diversity constraints (not 20 thrillers in a row)

### Stage 3 — Filtering & Business Rules
Goal: remove already-watched, out-of-stock, adult content, etc.

## Cold Start Problem Solutions
- **New user**: ask onboarding questions, show popular/trending
- **New item**: use content-based features (genre, tags, description embedding) until collaborative data accumulates

## Freshness vs Accuracy Tradeoff
- Pre-compute recommendations in batch every few hours (fast serving, possibly stale)
- Real-time update top candidates when user performs actions in session
- Hybrid: serve pre-computed, update in background after significant actions`,
    keyDecisions: [
      'ANN search library choice: Faiss (self-hosted) vs Pinecone (managed) vs Weaviate',
      'Offline vs Online recommendations: batch nightly vs real-time per request',
      'Cold start strategy for new users (content-based bootstrapping)',
      'Diversity vs relevance tradeoff in final ranking',
      'How to handle the explore vs exploit dilemma (show safe recs vs discover new tastes)',
    ],
    diagram: `
┌──────────────────────────────────────────────────────────────────┐
│                    RECOMMENDATION SYSTEM                          │
└──────────────────────────────────────────────────────────────────┘

USER ACTION                                                 
(click/view)  ──→  [ Kafka ]  ──→  [ Flink Stream ]  ──→  [ Feature Store (Redis) ]
                                          │
                                          ▼
                              [ Spark Batch Training ]
                                          │
                              ┌───────────┴───────────┐
                              │   User Embeddings     │   Item Embeddings
                              │   (stored per user)   │   (vector index)
                              └───────────────────────┘
                                          
USER REQUEST                              
    │                                     
    ▼                                     
[ API Gateway ]                           
    │                                     
    ▼                                     
[ Rec Service ]  ──→  [ Feature Store ]  (get user vector)
    │                                     
    ├──→  [ Candidate Gen ]  ──→  [ Faiss ANN Search ]  (1B → 1000 candidates)
    │                                     
    ├──→  [ Ranker Model ]   ──→  [ TF Serving ]         (1000 → 20 results)
    │                                     
    ├──→  [ Filter Layer ]   (remove watched, OOS, etc.)
    │                                     
    └──→  [ Response Cache (Redis) ]  ──→  CLIENT`,
  },
  {
    id: 'url-shortener',
    title: 'Design a URL Shortener (bit.ly / TinyURL)',
    category: 'hld',
    difficulty: 'medium',
    companies: ['Google', 'Amazon', 'Microsoft', 'ZOHO', 'TCS'],
    tags: ['Hashing', 'Database Design', 'Caching', 'Rate Limiting'],
    problem: `Design a URL shortening service like bit.ly. Users can submit a long URL and get a short 6-8 character code. When someone visits the short URL, they are redirected to the original long URL.`,
    requirements: {
      functional: [
        'Given a long URL, generate a unique short URL (6-8 chars)',
        'Redirect short URL to original URL',
        'Custom aliases optionally (user can pick their slug)',
        'URL expiration (optional TTL)',
        'Analytics: click count, geographic data',
      ],
      nonFunctional: [
        '100M URLs created per day',
        'Read heavy: 10:1 read/write ratio',
        'P99 redirect latency < 10ms',
        'URLs should not be predictable/sequential',
        '99.99% availability for redirects',
      ],
    },
    estimations: [
      { label: 'URL creates/day', value: '100M' },
      { label: 'Redirects/day', value: '1B (10:1 ratio)' },
      { label: 'Redirects/sec', value: '~12K RPS' },
      { label: 'Storage/URL', value: '~500 bytes' },
      { label: 'Total storage (5 years)', value: '~90TB' },
    ],
    hldComponents: [
      { name: 'Short URL Generator', description: 'Creates unique 6-char base62 code', tech: 'Base62 encoding / Counter / MD5' },
      { name: 'URL Database', description: 'Maps short code → long URL + metadata', tech: 'PostgreSQL / Cassandra' },
      { name: 'Cache Layer', description: 'Caches hot short codes to avoid DB lookups', tech: 'Redis (LRU cache)' },
      { name: 'CDN', description: 'Edge redirect for globally distributed speed', tech: 'CloudFront / Fastly' },
      { name: 'Analytics Service', description: 'Async click tracking pipeline', tech: 'Kafka + ClickHouse' },
      { name: 'Rate Limiter', description: 'Prevents abuse of URL creation endpoint', tech: 'Redis sliding window' },
    ],
    approach: `## Core: How to Generate Short Codes

**Option 1: Hash + Encode**
- MD5(long_url) → 128-bit hash → take first 43 bits → Base62 → 6-7 chars
- Problem: collisions (different URLs same hash). Fix: append counter or retry with offset.

**Option 2: Auto-increment ID + Base62**
- Use a DB auto-increment ID: 1, 2, 3...
- Encode in Base62 (a-z, A-Z, 0-9): ID 1 → "000001", ID 100M → "4c92"
- Problem: predictable. Fix: obfuscate with XOR or Feistel cipher before encoding.

**Option 3: KGS (Key Generation Service)**
- Pre-generate millions of random codes and store in "unused" pool
- When needed, pop one from pool, mark as used
- Very fast, no collision risk, can pre-cache

## Redirect Flow (must be < 10ms)
1. Request hits CDN edge → cache hit? → 301/302 immediately
2. Cache miss → hit Redis → found? → return + async update cache
3. Redis miss → query DB → return + populate Redis + CDN

**301 vs 302 redirect:**
- 301 (permanent): browser caches, reduces load — but can't track clicks
- 302 (temporary): browser always asks server — can track clicks per request

## Database Schema
\`\`\`sql
CREATE TABLE urls (
  id BIGSERIAL PRIMARY KEY,
  short_code VARCHAR(8) UNIQUE NOT NULL,
  long_url TEXT NOT NULL,
  user_id BIGINT REFERENCES users(id),
  expires_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  click_count BIGINT DEFAULT 0
);
CREATE INDEX idx_short_code ON urls(short_code);
\`\`\``,
    keyDecisions: [
      'Hash-based vs counter-based vs KGS for code generation',
      '301 (cacheable, no analytics) vs 302 (trackable) redirects',
      'Read through cache vs write through cache for redirects',
      'Single DB vs sharded by short_code for scale',
      'Synchronous vs async click analytics tracking',
    ],
  },
  {
    id: 'chat-system',
    title: 'Design a Real-Time Chat System (WhatsApp / Slack)',
    category: 'hld',
    difficulty: 'hard',
    companies: ['Google', 'Microsoft', 'Amazon', 'Adobe'],
    tags: ['WebSocket', 'Message Queue', 'Push Notifications', 'Consistency'],
    problem: `Design a real-time messaging system like WhatsApp. Users can send 1:1 and group messages. Messages must be delivered reliably, in order, and with delivery/read receipts.`,
    requirements: {
      functional: [
        '1:1 and group chat (up to 1000 members)',
        'Message delivery receipts (sent, delivered, read)',
        'Online presence indicators',
        'Message history with pagination',
        'Push notifications when offline',
        'Media: images, videos, files',
      ],
      nonFunctional: [
        '1B+ users, 100M DAU',
        'Message delivery latency < 500ms for online users',
        'Messages must not be lost (at-least-once delivery)',
        'Message ordering guaranteed within a conversation',
        '99.999% availability',
      ],
    },
    hldComponents: [
      { name: 'WebSocket Service', description: 'Persistent connections for real-time message push', tech: 'Node.js / Elixir + WebSocket' },
      { name: 'Chat Service', description: 'Handles message send, validation, fanout to recipients', tech: 'Go microservice' },
      { name: 'Message Queue', description: 'Decouples senders from receivers, guarantees delivery', tech: 'Kafka' },
      { name: 'Message DB', description: 'Stores all messages with sequence ordering', tech: 'Cassandra (time-series writes)' },
      { name: 'Presence Service', description: 'Tracks online/offline status with heartbeats', tech: 'Redis pub/sub' },
      { name: 'Push Notification', description: 'Sends APNs/FCM notifications for offline users', tech: 'FCM / APNs via queue' },
      { name: 'Session Store', description: 'Maps user → WebSocket server (for routing)', tech: 'Redis' },
    ],
    approach: `## The Core Problem: Routing Messages to Connected Clients

Users connect via WebSocket to one of many WebSocket servers. When Alice sends Bob a message:
1. Alice's WebSocket server receives the message
2. Need to find which WebSocket server Bob is connected to
3. Route and push to Bob's connection

**Session routing with Redis:**
- On connect: \`SET user:{bob_id}:server server-42\`
- On disconnect: delete the key
- On send: look up Bob's server, use internal messaging (pub/sub or gRPC) to reach it

## Message Ordering & Consistency

Each conversation needs a **sequence number**:
- Use a Snowflake ID or Redis INCR per conversation to assign sequence IDs
- Cassandra stores messages ordered by (conversation_id, sequence_id)
- Clients request messages from last received sequence_id on reconnect

## Delivery Receipts State Machine:
\`\`\`
SENT (server received) → DELIVERED (recipient device received) → READ (user opened)
\`\`\`
Store receipt state per (message_id, recipient_id). Update via WebSocket ACK from client.

## Group Messages (fanout problem)
- Small groups (< 200): write a copy to each member's inbox
- Large groups: use group timeline + member reads from shared log
- At 1000 members, sending a message must fan out 1000 writes — use async queue

## Media Handling
- Client uploads file directly to S3 (pre-signed URL)
- Message body contains S3 URL + thumbnail
- CDN serves media for fast global access`,
    keyDecisions: [
      'WebSocket vs Long Polling vs SSE for real-time delivery',
      'Push model (server pushes) vs Pull model (client polls)',
      'Cassandra vs MySQL for message storage (why Cassandra: write-heavy, time-series)',
      'Fanout on write vs fanout on read for group messages',
      'How to handle offline message delivery guarantee (persistent queue per user)',
    ],
  },
  // ─── LLD ───
  {
    id: 'lld-parking-lot',
    title: 'LLD: Design a Parking Lot System',
    category: 'lld',
    difficulty: 'medium',
    companies: ['Amazon', 'Google', 'Microsoft', 'ZOHO'],
    tags: ['OOP', 'Design Patterns', 'State Machine', 'LLD'],
    problem: `Design the object-oriented model for a parking lot system. The lot has multiple floors, each floor has spots of different types (compact, large, handicapped, motorcycle). Vehicles enter and exit, and the system must track availability and calculate fees.`,
    requirements: {
      functional: [
        'Vehicle can enter if spot of appropriate size is available',
        'System assigns the nearest available spot',
        'Supports multiple vehicle types: motorcycle, car, truck',
        'Calculate parking fee based on time and spot type',
        'Display availability board (spots per type per floor)',
        'Support VIP monthly passes',
      ],
      nonFunctional: [
        'Extensible — easy to add new vehicle/spot types',
        'Thread-safe — concurrent entries/exits',
        'Single parking lot can have up to 50 floors, 1000 spots each',
      ],
    },
    approach: `## Classes & Responsibilities

\`\`\`
VehicleType (enum): MOTORCYCLE, CAR, TRUCK
SpotType (enum): MOTORCYCLE, COMPACT, LARGE

Vehicle (abstract)
├── Motorcycle
├── Car
└── Truck

ParkingSpot
├── spot_id, floor, spot_type, SpotType
├── is_available: bool
└── parked_vehicle: Vehicle | None

Floor
├── floor_number
├── spots: list[ParkingSpot]
└── get_available_spots(spot_type) -> list[ParkingSpot]

ParkingTicket
├── ticket_id, vehicle, spot, entry_time
└── exit_time, fee

FeeCalculator (Strategy Pattern)
├── calculate(ticket) -> float
└── HourlyFeeCalculator, FlatRateFeeCalculator

ParkingLot (Singleton)
├── floors: list[Floor]
├── active_tickets: dict[plate → ticket]
├── park(vehicle) -> ParkingTicket | None
└── exit(ticket) -> float
\`\`\`

## Key Design Patterns Used
- **Strategy**: FeeCalculator — swap fee algorithms without changing ParkingLot
- **Singleton**: ParkingLot — one instance per system
- **Factory**: SpotFactory — create appropriate spots based on type
- **Observer**: Availability board subscribes to spot state changes

## Spot Assignment Rules
- Motorcycle → motorcycle spot (preferred) or compact spot
- Car → compact spot
- Truck → large spot only
- First fit on lowest floor (greedy is fine here)`,
    keyDecisions: [
      'Which design patterns apply and why',
      'How to handle concurrent spot reservation (threading.Lock)',
      'Spot assignment algorithm (nearest first, specific floor, etc.)',
      'Fee calculation extensibility (Strategy pattern)',
      'How entry/exit events are logged for audit',
    ],
    diagram: `
┌─────────────────── CLASS DIAGRAM ────────────────────────────────┐

  <<enum>>              <<abstract>>
  VehicleType           Vehicle
  ─────────────         ─────────────────────────
  MOTORCYCLE            - plate: str
  CAR                   - vehicle_type: VehicleType
  TRUCK                 + fits_in(spot: ParkingSpot): bool

                         ▲
            ┌────────────┼────────────┐
       Motorcycle       Car          Truck

  ParkingSpot                  Floor
  ─────────────────────────    ─────────────────────────
  - spot_id: str               - floor_number: int
  - spot_type: SpotType        - spots: list[ParkingSpot]
  - is_available: bool         + find_available(type): Spot
  - vehicle: Vehicle | None    + get_counts(): dict

  ParkingTicket                ParkingLot (Singleton)
  ─────────────────────────    ─────────────────────────
  - ticket_id: str             - floors: list[Floor]
  - vehicle: Vehicle           - tickets: dict
  - spot: ParkingSpot          + park(vehicle): Ticket
  - entry_time: datetime       + exit(ticket): float
  - fee: float                 + get_availability(): dict

  <<interface>>
  FeeCalculator
  + calculate(ticket): float
       ▲
  HourlyFee    FlatRateFee    MonthlyPass`,
  },
  {
    id: 'lld-elevator',
    title: 'LLD: Design an Elevator System',
    category: 'lld',
    difficulty: 'hard',
    companies: ['Google', 'Amazon', 'Microsoft', 'Adobe'],
    tags: ['OOP', 'State Machine', 'Scheduling Algorithm', 'LLD'],
    problem: `Design an elevator control system for a building with N elevators and M floors. The system must efficiently route elevator requests from people pressing buttons inside and outside elevators.`,
    requirements: {
      functional: [
        'External buttons (up/down) on each floor',
        'Internal floor selection buttons inside each elevator',
        'Display current floor and direction in elevator',
        'Door open/close with safety sensors',
        'Multiple elevators dispatched by a controller',
        'Emergency stop and alarm',
      ],
      nonFunctional: [
        'Minimize average wait time across all users',
        'Fair — no floor should be permanently starved',
        'Extensible scheduling algorithm (SCAN, LOOK, Round Robin)',
      ],
    },
    approach: `## State Machine: Elevator States
\`\`\`
IDLE → MOVING_UP → IDLE
IDLE → MOVING_DOWN → IDLE
MOVING_UP → DOOR_OPEN → DOOR_CLOSED → MOVING_UP or IDLE
MOVING_DOWN → DOOR_OPEN → DOOR_CLOSED → MOVING_DOWN or IDLE
Any state → EMERGENCY_STOP
\`\`\`

## SCAN Algorithm (Elevator Scheduling)
Like a disk scheduling algorithm:
- Elevator moves in one direction until no more requests in that direction
- Then reverses direction
- Handles internal and external requests

## Class Design
\`\`\`python
class Direction(Enum): UP = "UP"; DOWN = "DOWN"; IDLE = "IDLE"
class ElevatorState(Enum): IDLE, MOVING, DOOR_OPEN, EMERGENCY = ...

class Request:
    floor: int
    direction: Direction | None  # None for internal requests

class Elevator:
    id: int
    current_floor: int
    state: ElevatorState
    direction: Direction
    pending_floors: SortedSet  # floors to stop at
    
    def add_request(self, floor: int): ...
    def step(self): ...  # advance one floor or change state

class ElevatorController:
    elevators: list[Elevator]
    
    def dispatch(self, request: Request) -> Elevator:
        # Find best elevator using SCAN or cost function
        # Cost = distance + direction penalty
        ...
\`\`\`

## Dispatch Strategy: Cost Function
For each elevator, compute cost to handle a new request:
- Same direction + request is ahead: low cost (just add a stop)
- Same direction + request is behind: medium cost (handle on return)
- Opposite direction: high cost
- Idle: cost = distance to request floor`,
    keyDecisions: [
      'Scheduling algorithm: SCAN vs LOOK vs Round Robin vs ML-based',
      'How to handle internal vs external requests uniformly',
      'Thread safety — one thread per elevator vs event loop',
      'How emergency stop propagates and locks state',
      'Load balancing when multiple elevators are idle',
    ],
    diagram: '',
  },
  // ─── UML ───
  {
    id: 'uml-class-basics',
    title: 'UML Class Diagrams — Complete Guide',
    category: 'uml',
    difficulty: 'medium',
    companies: ['All companies'],
    tags: ['UML', 'Class Diagram', 'Relationships', 'OOP'],
    problem: `Understand all UML class diagram notations and relationships used in system design interviews and software architecture discussions.`,
    requirements: {
      functional: ['Learn all UML notations', 'Understand relationship types', 'Apply to real design problems'],
      nonFunctional: ['Be able to draw on whiteboard in interviews', 'Read existing UML diagrams'],
    },
    approach: `## UML Class Diagram Elements

### Class Box Structure
\`\`\`
┌─────────────────┐
│   ClassName     │   ← Class name (bold, centered)
├─────────────────┤
│ - privateField  │   ← Attributes (- private, + public, # protected)
│ + publicField   │
├─────────────────┤
│ + method(): ret │   ← Methods with return type
│ - helper(): void│
└─────────────────┘
\`\`\`

### Relationship Types

**1. Association (─────)**
Two classes know about each other.
\`User ────── Order\` (User has orders)

**2. Aggregation (◇─────)**  
"Has-a" relationship, but parts can exist independently.
\`Team ◇───── Player\` (Team has players, players exist without team)

**3. Composition (◆─────)**
Strong "has-a" — parts cannot exist without the whole.
\`House ◆───── Room\` (Room doesn't exist without House)

**4. Inheritance/Generalization (──▷)**
"Is-a" relationship.
\`Car ──▷ Vehicle\` (Car is a Vehicle)

**5. Realization/Implementation (- -▷)**
Class implements an interface.
\`EmailService - -▷ Notifier\`

**6. Dependency (- - →)**
One class uses another temporarily.
\`OrderService - - → PaymentGateway\`

### Multiplicity Notation
\`\`\`
1        exactly one
0..1     zero or one (optional)
*        zero or many
1..*     one or many
0..*     zero or many (same as *)
2..5     between 2 and 5
\`\`\`

## Complete Example: E-Commerce
\`\`\`
┌──────────┐  1    *  ┌──────────┐  1   *  ┌────────────┐
│  User    │─────────▶│  Order   │────────▶│ OrderItem  │
├──────────┤          ├──────────┤         ├────────────┤
│- id      │          │- id      │         │- quantity  │
│- email   │          │- status  │         │- price     │
│- name    │          │- total   │         └────────────┘
└──────────┘          └──────────┘               │ *
                            │ 1                   │
                            ▼                     ▼ 1
                     ┌────────────┐        ┌──────────┐
                     │  Payment   │        │  Product │
                     ├────────────┤        ├──────────┤
                     │- method    │        │- name    │
                     │- amount    │        │- price   │
                     └────────────┘        │- stock   │
                                           └──────────┘
\`\`\``,
    keyDecisions: [
      'Association vs Aggregation vs Composition — know the difference clearly',
      'When to use interfaces (Realization) vs abstract classes (Inheritance)',
      'Multiplicity notation must be accurate',
      'Keep diagrams focused — don\'t show every attribute in interviews',
    ],
  },
  {
    id: 'uml-sequence',
    title: 'UML Sequence Diagrams — Request Flows',
    category: 'uml',
    difficulty: 'medium',
    companies: ['All companies'],
    tags: ['UML', 'Sequence Diagram', 'Flow', 'API Design'],
    problem: `Learn to draw sequence diagrams showing how components interact over time — essential for HLD and API design discussions.`,
    requirements: {
      functional: ['Represent time-ordered interactions between components', 'Show sync vs async calls', 'Show error flows and alternatives'],
      nonFunctional: [],
    },
    approach: `## Sequence Diagram Notation

### Basic Elements
\`\`\`
Actor        Lifeline        Activation Box
  │           │   │              ║
  │           │   │              ║ (thick bar = object is active)
  │           │   │              ║
  
→  Synchronous call (waits for response)
-→ Asynchronous message (fire and forget)
←  Return message (dashed)
[  Activation box start
\`\`\`

### Example: User Login Flow
\`\`\`
User    Browser    AuthAPI    UserDB    Redis(Cache)
 │         │          │          │           │
 │─login──▶│          │          │           │
 │         │──POST /login──────▶│          │
 │         │          │─SELECT user────────▶│
 │         │          │◀──── user row ──────│
 │         │          │                     │
 │         │          │─ verify password    │
 │         │          │                     │
 │         │          │──SET session─────────────────▶│
 │         │          │◀───── OK ─────────────────────│
 │         │          │                     │           │
 │         │◀── 200 + JWT token ────────────│           │
 │◀── render home ────│                     │           │
\`\`\`

### Alt/Opt/Loop Frames
\`\`\`
┌─ alt [password matches] ──────────────────────────┐
│  AuthAPI ──▶ Redis: SET session                   │
│  AuthAPI ──▶ User: 200 OK + JWT                   │
├─ [else: password wrong] ──────────────────────────┤
│  AuthAPI ──▶ User: 401 Unauthorized               │
└────────────────────────────────────────────────────┘

┌─ loop [for each item in cart] ─────────────────────┐
│  OrderService ──▶ Inventory: check_stock(item_id)  │
│  Inventory ──▶ OrderService: stock_count           │
└────────────────────────────────────────────────────┘
\`\`\`

### When to Use Sequence Diagrams in Interviews
- API call flows (what happens when user hits this endpoint)
- Distributed system interactions (service A calls B which calls C)
- Error and retry flows
- Authentication/authorization flows
- Payment processing flows`,
    keyDecisions: [],
  },
];
