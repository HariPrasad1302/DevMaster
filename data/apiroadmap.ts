export interface ApiRoadmapTopic {
  id: string;
  title: string;
  category: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  description: string;
  keyPoints: string[];
  codeExample?: string;
  resources: string[];
}

export interface ApiRoadmapCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  order: number;
}

export const apiCategories: ApiRoadmapCategory[] = [
  { id: 'basics', name: 'Learn the Basics', icon: '📡', color: '#3b82f6', description: 'HTTP, URLs, methods, headers — the foundation of all APIs', order: 1 },
  { id: 'api-styles', name: 'API Styles', icon: '🔀', color: '#8b5cf6', description: 'REST, GraphQL, gRPC, SOAP — when to use which', order: 2 },
  { id: 'rest-design', name: 'REST & JSON APIs', icon: '🌐', color: '#10b981', description: 'REST principles, versioning, pagination, error handling', order: 3 },
  { id: 'auth', name: 'Authentication & Authorization', icon: '🔐', color: '#f59e0b', description: 'JWT, OAuth2, API keys, RBAC, session auth', order: 4 },
  { id: 'security', name: 'API Security', icon: '🛡', color: '#ef4444', description: 'OWASP API Top 10, security best practices', order: 5 },
  { id: 'performance', name: 'API Performance', icon: '⚡', color: '#06b6d4', description: 'Caching, rate limiting, load balancing, monitoring', order: 6 },
  { id: 'integration', name: 'Integration Patterns', icon: '🔗', color: '#f97316', description: 'Async APIs, event-driven, message queues, webhooks', order: 7 },
  { id: 'testing', name: 'API Testing', icon: '🧪', color: '#84cc16', description: 'Unit, integration, load testing and mocking', order: 8 },
  { id: 'realtime', name: 'Real-time APIs', icon: '📶', color: '#ec4899', description: 'WebSockets, Server-Sent Events for live data', order: 9 },
  { id: 'standards', name: 'Standards & Lifecycle', icon: '📋', color: '#14b8a6', description: 'OpenAPI, versioning strategy, compliance, deprecation', order: 10 },
];

export const apiTopics: ApiRoadmapTopic[] = [
  // BASICS
  {
    id: 'what-are-apis',
    title: 'What are APIs?',
    category: 'basics',
    level: 'beginner',
    estimatedHours: 2,
    description: 'Understanding APIs, client-server model, and the request-response cycle',
    keyPoints: [
      'API = Application Programming Interface — a contract between software components',
      'Client-server model: client sends requests, server returns responses',
      'APIs define what operations are available and what data format to use',
      'Public APIs (OpenWeather, Stripe) vs Private/Internal APIs',
      'API contract: agreed-upon endpoints, methods, request/response formats',
      'REST is the most common API style for web services',
      'APIs enable microservices, mobile apps, and third-party integrations',
      'API documentation is as important as the implementation itself',
    ],
    codeExample: `# Simple HTTP request to a public API
import requests

response = requests.get('https://api.example.com/users/1')
print(response.status_code)  # 200
print(response.json())       # {'id': 1, 'name': 'Alice', 'email': 'alice@example.com'}

# What just happened:
# 1. Client (your script) sent GET /users/1 to the server
# 2. Server processed the request
# 3. Server returned JSON data with status 200 OK`,
    resources: ['MDN Web Docs: What is an API?', 'REST API Tutorial', 'Postman Learning Center'],
  },
  {
    id: 'http-fundamentals',
    title: 'HTTP Fundamentals',
    category: 'basics',
    level: 'beginner',
    estimatedHours: 3,
    description: 'The HTTP protocol: statelessness, request/response structure, HTTP versions',
    keyPoints: [
      'HTTP = HyperText Transfer Protocol — the foundation of web communication',
      'Stateless: each request is independent; server stores no session memory between requests',
      'Request structure: Method + URL + Headers + Body',
      'Response structure: Status Line + Headers + Body',
      'HTTP/1.1: one request per connection (keep-alive improves this)',
      'HTTP/2: multiplexing (multiple requests on one connection), header compression, server push',
      'HTTP/3: runs over QUIC (UDP) instead of TCP — lower latency, better on lossy networks',
      'HTTPS = HTTP + TLS encryption — always use HTTPS in production',
    ],
    codeExample: `# HTTP Request format
GET /api/users HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGci...
Accept: application/json
Content-Type: application/json

# HTTP Response format
HTTP/1.1 200 OK
Content-Type: application/json
Cache-Control: max-age=3600

{"users": [{"id": 1, "name": "Alice"}]}`,
    resources: ['MDN HTTP Guide', 'HTTP/2 Explained', 'High Performance Browser Networking'],
  },
  {
    id: 'http-methods',
    title: 'HTTP Methods',
    category: 'basics',
    level: 'beginner',
    estimatedHours: 2,
    description: 'GET, POST, PUT, PATCH, DELETE — what each method means and when to use it',
    keyPoints: [
      'GET — retrieve a resource; safe (no side effects) and idempotent',
      'POST — create a resource; NOT safe, NOT idempotent',
      'PUT — replace a resource entirely; idempotent (same result if repeated)',
      'PATCH — partially update a resource; not always idempotent',
      'DELETE — remove a resource; idempotent',
      'HEAD — like GET but returns only headers, no body; useful for checking if resource exists',
      'OPTIONS — returns allowed methods for a URL; used in CORS preflight',
      'Safe methods (GET, HEAD, OPTIONS) should never modify server state',
    ],
    codeExample: `import requests

base = 'https://api.example.com'

# GET - fetch resource
r = requests.get(f'{base}/users/1')

# POST - create resource
r = requests.post(f'{base}/users', json={'name': 'Bob', 'email': 'bob@example.com'})

# PUT - replace resource entirely
r = requests.put(f'{base}/users/1', json={'name': 'Bob', 'email': 'bob@new.com', 'role': 'admin'})

# PATCH - partial update
r = requests.patch(f'{base}/users/1', json={'email': 'bob@new.com'})

# DELETE - remove resource
r = requests.delete(f'{base}/users/1')`,
    resources: ['MDN HTTP Methods', 'RFC 7231'],
  },
  {
    id: 'http-status-codes',
    title: 'HTTP Status Codes',
    category: 'basics',
    level: 'beginner',
    estimatedHours: 2,
    description: 'Understanding 1xx, 2xx, 3xx, 4xx, 5xx status codes and when to use each',
    keyPoints: [
      '1xx Informational: 100 Continue, 101 Switching Protocols',
      '2xx Success: 200 OK, 201 Created, 204 No Content, 206 Partial Content',
      '3xx Redirection: 301 Moved Permanently, 302 Found, 304 Not Modified',
      '4xx Client Errors: 400 Bad Request, 401 Unauthorized, 403 Forbidden, 404 Not Found, 409 Conflict, 422 Unprocessable Entity, 429 Too Many Requests',
      '5xx Server Errors: 500 Internal Server Error, 502 Bad Gateway, 503 Service Unavailable, 504 Gateway Timeout',
      '401 vs 403: 401 means not authenticated (no credentials), 403 means authenticated but not authorized',
      '400 vs 422: 400 = malformed request; 422 = valid syntax but semantic error (validation failed)',
      'Always return consistent, meaningful status codes — never 200 with an error body',
    ],
    codeExample: `from fastapi import FastAPI, HTTPException
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get('/users/{user_id}')
def get_user(user_id: int):
    user = db.find(user_id)
    if not user:
        raise HTTPException(status_code=404, detail='User not found')
    return user  # 200 OK

@app.post('/users', status_code=201)
def create_user(data: UserCreate):
    return db.create(data)  # 201 Created

@app.delete('/users/{user_id}', status_code=204)
def delete_user(user_id: int):
    db.delete(user_id)
    # 204 No Content — no response body`,
    resources: ['MDN Status Codes', 'httpstatuses.com'],
  },
  {
    id: 'http-headers',
    title: 'HTTP Headers',
    category: 'basics',
    level: 'beginner',
    estimatedHours: 2,
    description: 'Request and response headers — Content-Type, Authorization, Cache-Control, CORS, and custom headers',
    keyPoints: [
      'Headers carry metadata about the request/response, not the body content',
      'Content-Type: tells the receiver how to parse the body (application/json, multipart/form-data)',
      'Accept: tells server what format the client can handle',
      'Authorization: carries credentials (Bearer token, Basic auth)',
      'Cache-Control: controls caching behavior (max-age, no-cache, no-store)',
      'X-Request-ID: custom header for tracing requests across services',
      'CORS headers: Access-Control-Allow-Origin, Access-Control-Allow-Methods',
      'Custom headers use X- prefix by convention (though deprecated in RFC 6648)',
    ],
    codeExample: `import requests

# Setting request headers
headers = {
    'Authorization': 'Bearer eyJhbGci...',
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'X-Request-ID': 'uuid-1234',
}
r = requests.get('https://api.example.com/data', headers=headers)

# Reading response headers
print(r.headers['Content-Type'])    # application/json
print(r.headers['Cache-Control'])   # max-age=3600

# FastAPI: setting response headers
from fastapi import Response

@app.get('/data')
def get_data(response: Response):
    response.headers['X-Total-Count'] = '42'
    return {'items': [...]}`,
    resources: ['MDN HTTP Headers', 'HTTP Header Field Registry'],
  },
  {
    id: 'url-query-path',
    title: 'URL, Query & Path Parameters',
    category: 'basics',
    level: 'beginner',
    estimatedHours: 2,
    description: 'Structuring URLs with path params for resources and query params for filtering',
    keyPoints: [
      'URL anatomy: scheme://host:port/path?query#fragment',
      'Path parameters identify a specific resource: /users/{id}',
      'Query parameters filter, sort, or paginate: /users?role=admin&page=2&limit=20',
      'Use path params for required, hierarchical identifiers',
      'Use query params for optional filters, sorting, and pagination',
      'URL encoding: spaces → %20, & in values → %26 (always encode special chars)',
      'Avoid verbs in URLs — use nouns: /users not /getUsers',
      'Nested resources: /users/{id}/orders — max 2-3 levels deep',
    ],
    codeExample: `from fastapi import FastAPI, Query
from typing import Optional

app = FastAPI()

# Path parameter — required, part of resource identity
@app.get('/users/{user_id}/orders/{order_id}')
def get_order(user_id: int, order_id: int):
    return db.get_order(user_id, order_id)

# Query parameters — optional, for filtering/sorting
@app.get('/users')
def list_users(
    role: Optional[str] = None,
    page: int = Query(1, ge=1),
    limit: int = Query(20, le=100),
    sort: str = 'name',
):
    return db.list_users(role=role, page=page, limit=limit, sort=sort)`,
    resources: ['URL Standard', 'RFC 3986'],
  },
  {
    id: 'cors',
    title: 'CORS (Cross-Origin Resource Sharing)',
    category: 'basics',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Understanding same-origin policy, preflight requests, and configuring CORS in FastAPI',
    keyPoints: [
      'Same-origin policy: browsers block requests to a different origin (scheme+host+port) by default',
      'CORS allows servers to explicitly permit cross-origin requests',
      'Simple requests (GET/POST with basic headers) go through; complex ones trigger a preflight',
      'Preflight: browser sends OPTIONS request first to check server allows the actual request',
      'Access-Control-Allow-Origin: * allows all origins (avoid for credentialed requests)',
      'Access-Control-Allow-Methods: specifies allowed HTTP methods',
      'Access-Control-Allow-Headers: specifies allowed request headers',
      'Access-Control-Allow-Credentials: true required if sending cookies/auth headers cross-origin',
    ],
    codeExample: `from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=['https://myapp.com', 'https://staging.myapp.com'],
    allow_credentials=True,
    allow_methods=['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    allow_headers=['Authorization', 'Content-Type', 'X-Request-ID'],
)

# For development only (never in production):
# allow_origins=['*']  -- allows ALL origins, no credentials`,
    resources: ['MDN CORS', 'CORS specification (Fetch Standard)'],
  },

  // API STYLES
  {
    id: 'restful-apis',
    title: 'RESTful APIs',
    category: 'api-styles',
    level: 'beginner',
    estimatedHours: 4,
    description: 'REST constraints, resource-based design, and the Richardson Maturity Model',
    keyPoints: [
      'REST = Representational State Transfer — an architectural style, not a protocol',
      '6 constraints: Stateless, Uniform Interface, Client-Server, Cacheable, Layered System, Code on Demand (optional)',
      'Resources are nouns: /users, /orders, /products — never /getUser or /createOrder',
      'Representations: resources can have multiple formats (JSON, XML) — client chooses via Accept header',
      'Richardson Maturity Model: Level 0 (one URI), Level 1 (resources), Level 2 (HTTP verbs), Level 3 (HATEOAS)',
      'Most APIs are at Level 2 — using correct HTTP methods and status codes',
      'Stateless means each request has all info needed — no server-side session',
      'Most popular style for public/web APIs due to simplicity and tooling',
    ],
    codeExample: `from fastapi import FastAPI, HTTPException, status
from pydantic import BaseModel

app = FastAPI()

class User(BaseModel):
    name: str
    email: str

# Level 2 REST: correct HTTP methods + status codes
@app.get('/users')            # List
@app.get('/users/{id}')       # Read
@app.post('/users', status_code=201)  # Create
@app.put('/users/{id}')       # Replace
@app.patch('/users/{id}')     # Partial update
@app.delete('/users/{id}', status_code=204)  # Delete`,
    resources: ['Roy Fielding REST Dissertation', 'REST API Tutorial', 'Richardson Maturity Model (Fowler)'],
  },
  {
    id: 'graphql-apis',
    title: 'GraphQL APIs',
    category: 'api-styles',
    level: 'intermediate',
    estimatedHours: 5,
    description: 'Query exactly what you need — schema definition, resolvers, and when GraphQL beats REST',
    keyPoints: [
      'GraphQL: single endpoint (/graphql), client specifies exactly what fields to return',
      'Solves over-fetching (REST returns too many fields) and under-fetching (need multiple REST calls)',
      'Three operation types: Query (read), Mutation (write), Subscription (real-time)',
      'Schema Definition Language (SDL) defines types and operations — serves as API contract',
      'Resolvers: functions that return data for each field in the schema',
      'N+1 problem: naive resolvers make N extra DB queries — solved with DataLoader (batching)',
      'Tools: Strawberry (Python), Apollo Client (JS), graphene-django',
      'Best for: complex, nested data; multiple clients with different data needs; rapid iteration',
    ],
    codeExample: `# Strawberry GraphQL with FastAPI
import strawberry
from strawberry.fastapi import GraphQLRouter

@strawberry.type
class User:
    id: int
    name: str
    email: str

@strawberry.type
class Query:
    @strawberry.field
    def user(self, id: int) -> User:
        return get_user_from_db(id)

    @strawberry.field
    def users(self) -> list[User]:
        return get_all_users()

schema = strawberry.Schema(query=Query)
graphql_app = GraphQLRouter(schema)
app.include_router(graphql_app, prefix='/graphql')

# Client query — fetch only what you need:
# { user(id: 1) { name email } }`,
    resources: ['GraphQL Official Docs', 'Strawberry Python', 'GraphQL Best Practices'],
  },
  {
    id: 'grpc-apis',
    title: 'gRPC APIs',
    category: 'api-styles',
    level: 'advanced',
    estimatedHours: 5,
    description: 'High-performance RPC with Protocol Buffers — ideal for microservice communication',
    keyPoints: [
      'gRPC = Google Remote Procedure Call — uses HTTP/2 and Protocol Buffers (binary format)',
      'Protocol Buffers: strongly-typed, compact binary serialization (10x smaller than JSON)',
      '.proto file defines services and messages — code generation for any language',
      'Four call types: Unary, Server Streaming, Client Streaming, Bidirectional Streaming',
      'HTTP/2 multiplexing: many concurrent calls over one connection',
      'Ideal for: microservice-to-microservice communication, real-time streaming, mobile backends',
      'Harder to debug than REST (binary, not human-readable); needs gRPC tools like grpcurl',
      'Not browser-native (needs gRPC-Web proxy); REST/GraphQL better for public APIs',
    ],
    codeExample: `# service.proto
syntax = "proto3";

service UserService {
  rpc GetUser (GetUserRequest) returns (User);
  rpc ListUsers (ListUsersRequest) returns (stream User);
}

message GetUserRequest { int32 id = 1; }
message User {
  int32 id = 1;
  string name = 2;
  string email = 3;
}

# Python server (after generating code with protoc)
import grpc
from concurrent import futures
import service_pb2_grpc, service_pb2

class UserServiceServicer(service_pb2_grpc.UserServiceServicer):
    def GetUser(self, request, context):
        user = db.get(request.id)
        return service_pb2.User(id=user.id, name=user.name, email=user.email)

server = grpc.server(futures.ThreadPoolExecutor(max_workers=10))
service_pb2_grpc.add_UserServiceServicer_to_server(UserServiceServicer(), server)
server.add_insecure_port('[::]:50051')
server.start()`,
    resources: ['gRPC Official Docs', 'Protocol Buffers Guide', 'gRPC vs REST comparison'],
  },

  // REST DESIGN
  {
    id: 'versioning',
    title: 'API Versioning Strategies',
    category: 'rest-design',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'URI, header, and query param versioning — and how to deprecate old versions gracefully',
    keyPoints: [
      'URI versioning: /v1/users — most visible and explicit; recommended for major changes',
      'Header versioning: Accept: application/vnd.api+json;version=2 — clean URLs but less discoverable',
      'Query param: /users?version=2 — easy to test but pollutes query params',
      'Content negotiation: Accept: application/vnd.myapi.v2+json — most RESTful but complex',
      'Semantic versioning: MAJOR.MINOR — bump major for breaking changes, minor for additive',
      'Never break existing clients — deprecate, then sunset with a date',
      'Deprecation headers: Deprecation: true, Sunset: Sat, 31 Dec 2025 23:59:59 GMT',
      'Support at least N-1 version to give clients time to migrate',
    ],
    codeExample: `from fastapi import APIRouter, FastAPI

app = FastAPI()

v1_router = APIRouter(prefix='/v1')
v2_router = APIRouter(prefix='/v2')

@v1_router.get('/users/{id}')
def get_user_v1(id: int):
    return {'id': id, 'name': 'Alice'}  # old format

@v2_router.get('/users/{id}')
def get_user_v2(id: int, response: Response):
    # v1 is deprecated
    response.headers['Deprecation'] = 'true'
    response.headers['Sunset'] = 'Sat, 31 Dec 2025 23:59:59 GMT'
    return {'id': id, 'firstName': 'Alice', 'lastName': 'Smith'}  # new format

app.include_router(v1_router)
app.include_router(v2_router)`,
    resources: ['API Versioning Best Practices', 'Stripe API Versioning', 'RFC 8594 Sunset Header'],
  },
  {
    id: 'pagination',
    title: 'Pagination',
    category: 'rest-design',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Offset, cursor, and keyset pagination — choosing the right strategy for your use case',
    keyPoints: [
      'Offset-limit: LIMIT 20 OFFSET 60 — simple but performance degrades on large datasets',
      'Cursor-based: use an opaque cursor (encoded ID/timestamp) — stable, efficient, no skipped rows',
      'Keyset pagination: WHERE id > last_id ORDER BY id LIMIT 20 — fast because uses index',
      'Page-based: ?page=3&per_page=20 — user-friendly but same issues as offset at scale',
      'Link header: RFC 5988 standard — include next/prev/first/last links in response',
      'Cursor pagination is preferred for real-time data (prevents duplicates/skips on inserts)',
      'Always include total count in response for UI progress indicators',
      'Limit max page size to prevent abuse (e.g., limit=1000 DoS risk)',
    ],
    codeExample: `from fastapi import FastAPI, Query
from typing import Optional

app = FastAPI()

# Offset pagination (simple, OK for small datasets)
@app.get('/users')
def list_users(page: int = 1, limit: int = Query(20, le=100)):
    offset = (page - 1) * limit
    users = db.query(User).offset(offset).limit(limit).all()
    total = db.query(User).count()
    return {
        'data': users,
        'page': page,
        'limit': limit,
        'total': total,
        'pages': (total + limit - 1) // limit,
    }

# Cursor pagination (scalable, for large/real-time data)
@app.get('/users/cursor')
def list_users_cursor(cursor: Optional[str] = None, limit: int = 20):
    after_id = decode_cursor(cursor) if cursor else 0
    users = db.query(User).filter(User.id > after_id).limit(limit + 1).all()
    has_next = len(users) > limit
    data = users[:limit]
    return {
        'data': data,
        'next_cursor': encode_cursor(data[-1].id) if has_next else None,
    }`,
    resources: ['Cursor Pagination (Slack Engineering)', 'RFC 5988 Link Relations'],
  },
  {
    id: 'rate-limiting',
    title: 'Rate Limiting',
    category: 'rest-design',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Protect your API with token bucket, sliding window, and fixed window rate limiting',
    keyPoints: [
      'Rate limiting prevents API abuse, ensures fair usage, and protects backend resources',
      'Fixed window: count requests in time window (e.g., 100/minute) — simple but burst at window edge',
      'Sliding window: tracks each request timestamp — accurate, no edge burst problem',
      'Token bucket: bucket fills at rate R; each request consumes 1 token — allows bursts up to bucket size',
      '429 Too Many Requests with Retry-After header tells client when to retry',
      'X-RateLimit-Limit, X-RateLimit-Remaining, X-RateLimit-Reset — standard headers',
      'Per-user rate limits (by API key or user ID) vs global limits',
      'Redis is the standard backend for distributed rate limiting',
    ],
    codeExample: `# Using SlowAPI (built on limits) with FastAPI
from fastapi import FastAPI, Request
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.get('/api/search')
@limiter.limit('100/minute')   # 100 requests per minute per IP
async def search(request: Request, q: str):
    return {'results': search_db(q)}

@app.get('/api/export')
@limiter.limit('5/hour')       # expensive endpoint — stricter limit
async def export(request: Request):
    return generate_export()`,
    resources: ['SlowAPI docs', 'Rate Limiting Strategies', 'Redis rate limiting patterns'],
  },
  {
    id: 'error-handling',
    title: 'Error Handling (RFC 7807)',
    category: 'rest-design',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Consistent error responses using Problem Details for HTTP APIs',
    keyPoints: [
      'RFC 7807 (Problem Details) is the standard for structured API error responses',
      'Problem Details fields: type (URI), title, status, detail, instance',
      'Always return JSON errors (never HTML error pages) — set Content-Type: application/problem+json',
      'Include a machine-readable type and human-readable detail',
      'Validation errors should include field-level details so clients can highlight the problem',
      'Never expose internal stack traces in production responses',
      'Use exception handlers in FastAPI to centralize error formatting',
      'Log errors server-side with request ID for debugging without exposing to client',
    ],
    codeExample: `from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse
from fastapi.exceptions import RequestValidationError

app = FastAPI()

# Custom exception
class APIError(Exception):
    def __init__(self, status: int, title: str, detail: str):
        self.status = status
        self.title = title
        self.detail = detail

@app.exception_handler(APIError)
async def api_error_handler(request: Request, exc: APIError):
    return JSONResponse(
        status_code=exc.status,
        content={
            'type': f'https://api.example.com/errors/{exc.title.lower().replace(" ", "-")}',
            'title': exc.title,
            'status': exc.status,
            'detail': exc.detail,
            'instance': str(request.url),
        },
        media_type='application/problem+json',
    )

@app.exception_handler(RequestValidationError)
async def validation_error_handler(request: Request, exc: RequestValidationError):
    return JSONResponse(status_code=422, content={
        'type': 'https://api.example.com/errors/validation-error',
        'title': 'Validation Error',
        'status': 422,
        'detail': 'One or more fields failed validation',
        'errors': exc.errors(),
    })`,
    resources: ['RFC 7807 Problem Details', 'FastAPI Error Handling'],
  },

  // AUTH
  {
    id: 'jwt',
    title: 'JWT (JSON Web Tokens)',
    category: 'auth',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'Stateless authentication with signed tokens — structure, claims, and refresh token pattern',
    keyPoints: [
      'JWT = Header.Payload.Signature — base64url encoded, dot-separated',
      'Header: algorithm (alg) and token type (typ)',
      'Payload: claims — iss (issuer), sub (subject/user id), exp (expiry), iat (issued at), custom claims',
      'Signature: HMAC-SHA256 or RS256 — verifies token was not tampered with',
      'HS256 (symmetric): one shared secret — fast but secret must be shared across services',
      'RS256 (asymmetric): private key signs, public key verifies — preferred for distributed systems',
      'Access token: short-lived (15min-1h); Refresh token: long-lived (7-30 days), used to get new access tokens',
      'Never store sensitive data in payload — it is only base64 encoded, not encrypted',
    ],
    codeExample: `import jwt
from datetime import datetime, timedelta, timezone
from fastapi import FastAPI, HTTPException, Depends
from fastapi.security import HTTPBearer

SECRET = 'your-secret-key'
security = HTTPBearer()

def create_access_token(user_id: int) -> str:
    payload = {
        'sub': str(user_id),
        'iat': datetime.now(timezone.utc),
        'exp': datetime.now(timezone.utc) + timedelta(minutes=15),
    }
    return jwt.encode(payload, SECRET, algorithm='HS256')

def verify_token(token: str) -> dict:
    try:
        return jwt.decode(token, SECRET, algorithms=['HS256'])
    except jwt.ExpiredSignatureError:
        raise HTTPException(401, 'Token expired')
    except jwt.InvalidTokenError:
        raise HTTPException(401, 'Invalid token')

def current_user(credentials = Depends(security)):
    return verify_token(credentials.credentials)

@app.get('/profile')
def profile(user = Depends(current_user)):
    return {'user_id': user['sub']}`,
    resources: ['JWT.io', 'PyJWT docs', 'OWASP JWT Cheat Sheet'],
  },
  {
    id: 'oauth2',
    title: 'OAuth 2.0',
    category: 'auth',
    level: 'advanced',
    estimatedHours: 5,
    description: 'Delegated authorization — Authorization Code flow, scopes, and PKCE',
    keyPoints: [
      'OAuth 2.0 is an authorization framework — lets users grant apps access to their data without sharing passwords',
      'Roles: Resource Owner (user), Client (app), Authorization Server (Google/GitHub), Resource Server (API)',
      'Authorization Code flow: most secure — auth code exchanged server-side for tokens',
      'Client Credentials: machine-to-machine (no user involved) — use for service accounts',
      'Implicit flow: deprecated — tokens exposed in URL (use Auth Code + PKCE instead)',
      'PKCE (Proof Key for Code Exchange): prevents interception attacks for public clients (SPAs, mobile)',
      'Scopes: fine-grained permissions — read:profile, write:posts, admin:users',
      'Access token (short-lived) + Refresh token (long-lived) pattern',
    ],
    codeExample: `# OAuth2 Authorization Code flow with FastAPI
from fastapi import FastAPI
from fastapi.security import OAuth2AuthorizationCodeBearer

oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl='https://auth.example.com/authorize',
    tokenUrl='https://auth.example.com/token',
    scopes={'read:users': 'Read user data', 'write:users': 'Create/update users'},
)

# Step 1: Redirect user to Authorization Server
# https://auth.example.com/authorize?
#   response_type=code&
#   client_id=MY_CLIENT_ID&
#   redirect_uri=https://myapp.com/callback&
#   scope=read:users&
#   state=random_state&
#   code_challenge=xxx&          # PKCE
#   code_challenge_method=S256

# Step 2: Exchange code for tokens (server-side)
import httpx

async def exchange_code(code: str):
    async with httpx.AsyncClient() as client:
        r = await client.post('https://auth.example.com/token', data={
            'grant_type': 'authorization_code',
            'code': code,
            'redirect_uri': 'https://myapp.com/callback',
            'client_id': 'MY_CLIENT_ID',
            'client_secret': 'MY_SECRET',
            'code_verifier': stored_verifier,  # PKCE
        })
    return r.json()  # {'access_token': '...', 'refresh_token': '...', 'expires_in': 3600}`,
    resources: ['OAuth 2.0 RFC 6749', 'OAuth.net', 'PKCE RFC 7636'],
  },
  {
    id: 'api-keys',
    title: 'API Keys & Management',
    category: 'auth',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Generating, scoping, and rotating API keys with secure storage',
    keyPoints: [
      'API keys are simple credentials for identifying and authenticating clients',
      'Generate with cryptographically secure random bytes (secrets.token_urlsafe)',
      'Store only the hashed key in the database (bcrypt or SHA-256) — never plaintext',
      'Show the key to the user ONCE at creation — store the hash only',
      'Scope keys to specific permissions — read-only keys, write keys, admin keys',
      'Rate limit per API key — each key has its own quota',
      'Key rotation: allow multiple active keys; let users revoke old ones',
      'Pass via Authorization: Bearer sk_live_xxx or X-API-Key header',
    ],
    codeExample: `import secrets
import hashlib
from fastapi import FastAPI, Security, HTTPException
from fastapi.security.api_key import APIKeyHeader

api_key_header = APIKeyHeader(name='X-API-Key')

def generate_api_key() -> tuple[str, str]:
    """Returns (raw_key, hashed_key). Store hash, give raw to user."""
    raw = secrets.token_urlsafe(32)
    hashed = hashlib.sha256(raw.encode()).hexdigest()
    return raw, hashed

def verify_api_key(api_key: str = Security(api_key_header)):
    hashed = hashlib.sha256(api_key.encode()).hexdigest()
    key_record = db.query(ApiKey).filter_by(key_hash=hashed, is_active=True).first()
    if not key_record:
        raise HTTPException(403, 'Invalid or revoked API key')
    return key_record

@app.post('/api-keys')
def create_key(user=Depends(current_user)):
    raw, hashed = generate_api_key()
    db.add(ApiKey(user_id=user.id, key_hash=hashed))
    db.commit()
    return {'key': raw, 'note': 'Save this — it will not be shown again'}`,
    resources: ['API Key Best Practices', 'OWASP Authentication Cheat Sheet'],
  },

  // SECURITY
  {
    id: 'api-vulnerabilities',
    title: 'OWASP API Security Top 10',
    category: 'security',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'The 10 most critical API security risks and how to prevent them',
    keyPoints: [
      'API1: Broken Object Level Authorization — user A accesses user B\'s data via ID manipulation',
      'API2: Broken Authentication — weak token validation, no expiry, no revocation',
      'API3: Broken Object Property Level Authorization — mass assignment, excessive data exposure',
      'API4: Unrestricted Resource Consumption — no rate limiting, DoS via expensive queries',
      'API5: Broken Function Level Authorization — regular user can access admin endpoints',
      'API6: Unrestricted Access to Sensitive Business Flows — no bot protection on checkout/signup',
      'API7: Server Side Request Forgery (SSRF) — attacker makes server fetch internal resources',
      'API8: Security Misconfiguration — debug mode on, default credentials, verbose errors',
      'API9: Improper Inventory Management — old API versions exposed, shadow APIs',
      'API10: Unsafe Consumption of APIs — trusting third-party APIs without validation',
    ],
    codeExample: `# API1: Broken Object Level Authorization — WRONG
@app.get('/orders/{order_id}')
def get_order(order_id: int):
    return db.get(order_id)  # ANYONE can read ANY order

# CORRECT: always verify ownership
@app.get('/orders/{order_id}')
def get_order(order_id: int, user=Depends(current_user)):
    order = db.get(order_id)
    if not order or order.user_id != user.id:
        raise HTTPException(404)  # 404 not 403 (don't leak existence)
    return order

# API3: Mass Assignment — WRONG
@app.post('/users/{id}')
def update_user(id: int, data: dict):  # attacker sends {'role': 'admin'}
    db.update(id, **data)

# CORRECT: explicit field allowlist
class UserUpdate(BaseModel):
    name: Optional[str]
    email: Optional[str]
    # role NOT included — can't be updated this way`,
    resources: ['OWASP API Security Top 10', 'OWASP API Security Project'],
  },
  {
    id: 'api-security-best',
    title: 'API Security Best Practices',
    category: 'security',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'Hardening your API: HTTPS, input validation, security headers, and audit logging',
    keyPoints: [
      'Always use HTTPS — never expose API over plain HTTP in production',
      'Validate ALL inputs at the boundary — use Pydantic models, not raw dicts',
      'Use parameterized queries — never build SQL strings from user input',
      'Minimize data exposure — return only what the client needs (no full DB rows)',
      'Set security headers: Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options',
      'Audit log every write operation: who, what, when — essential for compliance and incident response',
      'Use short-lived access tokens and rotate secrets regularly',
      'Implement request ID tracing — every request gets a unique ID for correlation in logs',
    ],
    codeExample: `from fastapi import FastAPI, Request
from fastapi.middleware.httpsredirect import HTTPSRedirectMiddleware
import uuid

app = FastAPI()

# Force HTTPS
app.add_middleware(HTTPSRedirectMiddleware)

# Security headers middleware
@app.middleware('http')
async def security_headers(request: Request, call_next):
    # Attach request ID for tracing
    request_id = str(uuid.uuid4())
    response = await call_next(request)
    response.headers['X-Request-ID'] = request_id
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['Referrer-Policy'] = 'strict-origin-when-cross-origin'
    return response

# Always validate with Pydantic — never raw dicts
class CreateUser(BaseModel):
    name: str = Field(min_length=1, max_length=100)
    email: EmailStr
    age: int = Field(ge=0, le=150)`,
    resources: ['OWASP Security Headers', 'OWASP Input Validation Cheat Sheet'],
  },

  // PERFORMANCE
  {
    id: 'http-caching',
    title: 'HTTP Caching',
    category: 'performance',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'Cache-Control, ETags, and 304 Not Modified for reducing server load and latency',
    keyPoints: [
      'Cache-Control: max-age=3600 — response can be cached for 3600 seconds',
      'Cache-Control: no-cache — must revalidate with server; Cache-Control: no-store — never cache',
      'Cache-Control: public — CDN can cache; private — only browser can cache (not CDN)',
      'ETag: unique identifier for a resource version (usually content hash)',
      'If-None-Match: client sends ETag; server returns 304 Not Modified if unchanged (saves bandwidth)',
      'Last-Modified / If-Modified-Since: time-based alternative to ETags',
      '304 Not Modified: no response body — client uses cached version',
      'CDN caching: Cloudflare/CloudFront caches responses at edge — global latency reduction',
    ],
    codeExample: `import hashlib
from fastapi import FastAPI, Request, Response
from fastapi.responses import JSONResponse

app = FastAPI()

@app.get('/products/{id}')
async def get_product(id: int, request: Request, response: Response):
    product = db.get_product(id)
    if not product:
        raise HTTPException(404)

    # Generate ETag from content hash
    etag = hashlib.md5(str(product.updated_at).encode()).hexdigest()

    # Check If-None-Match header
    if request.headers.get('If-None-Match') == etag:
        return Response(status_code=304)  # Not Modified — client uses cache

    response.headers['ETag'] = etag
    response.headers['Cache-Control'] = 'public, max-age=300'  # 5 min CDN cache
    return product`,
    resources: ['MDN HTTP Caching', 'Cache-Control in Practice', 'Google Web Fundamentals: Caching'],
  },
  {
    id: 'caching-strategies',
    title: 'Caching Strategies (Redis)',
    category: 'performance',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'Cache-aside, write-through, and TTL-based caching with Redis to reduce DB load',
    keyPoints: [
      'Cache-aside (lazy loading): app checks cache first, on miss loads from DB and caches',
      'Write-through: write to cache AND DB simultaneously — always consistent but slower writes',
      'Write-behind: write to cache, async flush to DB — fast writes but risk of data loss',
      'TTL (Time To Live): expiry time on cache entries prevents stale data buildup',
      'Cache invalidation: the hardest problem — delete cache on write to avoid stale reads',
      'Cache stampede: many requests miss cache simultaneously — use locking or probabilistic refresh',
      'Redis data structures: strings, hashes, sorted sets — match structure to use case',
      'Key naming convention: namespace:entity:id — e.g., api:users:123',
    ],
    codeExample: `import json
import redis
from fastapi import FastAPI

r = redis.Redis(host='localhost', port=6379, decode_responses=True)
app = FastAPI()

def cache_key(user_id: int) -> str:
    return f'api:users:{user_id}'

@app.get('/users/{user_id}')
async def get_user(user_id: int):
    key = cache_key(user_id)

    # Check cache first (cache-aside pattern)
    cached = r.get(key)
    if cached:
        return json.loads(cached)

    # Cache miss — load from DB
    user = db.get_user(user_id)
    if not user:
        raise HTTPException(404)

    # Store in cache with 5-minute TTL
    r.setex(key, 300, json.dumps(user.dict()))
    return user

@app.put('/users/{user_id}')
async def update_user(user_id: int, data: UserUpdate):
    updated = db.update_user(user_id, data)
    # Invalidate cache on write
    r.delete(cache_key(user_id))
    return updated`,
    resources: ['Redis Documentation', 'Caching Strategies Overview', 'AWS ElastiCache Best Practices'],
  },

  // INTEGRATION
  {
    id: 'webhooks',
    title: 'Webhooks vs Polling',
    category: 'integration',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Event-driven notifications with webhooks — server pushes to your endpoint instead of client polling',
    keyPoints: [
      'Polling: client repeatedly asks "any new data?" — wasteful, high latency',
      'Webhooks: server sends HTTP POST to your URL when an event happens — real-time, efficient',
      'Webhook payload: JSON body with event type and data',
      'Verify webhook signatures (HMAC-SHA256) to ensure requests come from the legitimate sender',
      'Return 200 quickly — process webhook async (queue the work, respond immediately)',
      'Implement idempotency: webhooks can be delivered multiple times — handle duplicates',
      'Retry logic: sender retries on non-2xx; your handler must be idempotent',
      'Use Stripe Webhooks, GitHub Webhooks, Slack Events API as examples',
    ],
    codeExample: `import hmac
import hashlib
from fastapi import FastAPI, Request, HTTPException

app = FastAPI()
WEBHOOK_SECRET = b'your-webhook-secret'

def verify_signature(payload: bytes, signature: str) -> bool:
    expected = 'sha256=' + hmac.new(WEBHOOK_SECRET, payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(expected, signature)

@app.post('/webhooks/stripe')
async def stripe_webhook(request: Request):
    payload = await request.body()
    sig = request.headers.get('Stripe-Signature', '')

    if not verify_signature(payload, sig):
        raise HTTPException(400, 'Invalid signature')

    event = await request.json()

    # Respond immediately, process async
    background_tasks.add_task(process_event, event)
    return {'received': True}  # must return 200 fast

async def process_event(event: dict):
    if event['type'] == 'payment_intent.succeeded':
        payment_id = event['data']['object']['id']
        # Check idempotency — skip if already processed
        if not db.is_processed(payment_id):
            db.mark_processed(payment_id)
            fulfill_order(payment_id)`,
    resources: ['Stripe Webhooks Guide', 'Webhook Best Practices', 'HMAC verification'],
  },
  {
    id: 'event-driven',
    title: 'Event-Driven Architecture',
    category: 'integration',
    level: 'advanced',
    estimatedHours: 4,
    description: 'Decouple services with events — producers, consumers, and message brokers',
    keyPoints: [
      'Event-driven: services communicate via events instead of direct API calls',
      'Producer publishes events; consumer subscribes and reacts — no direct coupling',
      'Event broker (Kafka, RabbitMQ, SQS) stores and routes events between services',
      'At-least-once delivery: events may be delivered multiple times — consumers must be idempotent',
      'Event sourcing: store state as sequence of events; rebuild state by replaying events',
      'CQRS: Command Query Responsibility Segregation — separate write model from read model',
      'Benefits: loose coupling, scalability, resilience (consumer can be down, events wait)',
      'Challenges: eventual consistency, debugging distributed events, ordering guarantees',
    ],
    codeExample: `# Kafka producer (publishes events)
from kafka import KafkaProducer
import json

producer = KafkaProducer(
    bootstrap_servers=['localhost:9092'],
    value_serializer=lambda v: json.dumps(v).encode(),
)

def order_created(order: dict):
    producer.send('order-events', {
        'type': 'order.created',
        'order_id': order['id'],
        'user_id': order['user_id'],
        'amount': order['total'],
    })
    producer.flush()

# Kafka consumer (subscribes and reacts)
from kafka import KafkaConsumer

consumer = KafkaConsumer(
    'order-events',
    bootstrap_servers=['localhost:9092'],
    value_deserializer=lambda m: json.loads(m.decode()),
    group_id='notification-service',  # consumer group for load balancing
)

for message in consumer:
    event = message.value
    if event['type'] == 'order.created':
        send_confirmation_email(event['user_id'], event['order_id'])`,
    resources: ['Kafka Documentation', 'Event-Driven Architecture (Martin Fowler)', 'AWS SNS+SQS patterns'],
  },

  // TESTING
  {
    id: 'api-unit-testing',
    title: 'Testing APIs with pytest',
    category: 'testing',
    level: 'beginner',
    estimatedHours: 3,
    description: 'Test FastAPI endpoints with TestClient — unit and integration testing patterns',
    keyPoints: [
      'FastAPI provides TestClient (wraps httpx) for testing without running a server',
      'test_client.get(), .post(), .put(), .delete() — mirror real HTTP calls',
      'Use pytest fixtures for test client, test DB, and shared test data',
      'Test happy path AND error cases (404, 401, 422 validation errors)',
      'Override dependencies (Depends) for test isolation — inject test DB instead of real DB',
      'Assert status code, response JSON, and headers',
      'Use factory functions or pytest-factory-boy for test data creation',
      'Aim for 80%+ coverage of business-critical paths',
    ],
    codeExample: `import pytest
from fastapi.testclient import TestClient
from main import app
from database import get_db, Base
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker

# Test database setup
engine = create_engine('sqlite:///./test.db')
TestSession = sessionmaker(bind=engine)

@pytest.fixture
def client():
    Base.metadata.create_all(bind=engine)
    def override_db():
        db = TestSession()
        try:
            yield db
        finally:
            db.close()
    app.dependency_overrides[get_db] = override_db
    with TestClient(app) as c:
        yield c
    Base.metadata.drop_all(bind=engine)

def test_create_user(client):
    r = client.post('/users', json={'name': 'Alice', 'email': 'alice@test.com'})
    assert r.status_code == 201
    assert r.json()['email'] == 'alice@test.com'

def test_get_nonexistent_user(client):
    r = client.get('/users/999')
    assert r.status_code == 404

def test_auth_required(client):
    r = client.get('/profile')
    assert r.status_code == 401`,
    resources: ['FastAPI Testing Docs', 'pytest docs', 'httpx docs'],
  },
  {
    id: 'load-testing',
    title: 'Load Testing',
    category: 'testing',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Stress test your API with Locust — find breaking points before production does',
    keyPoints: [
      'Load testing simulates real user traffic to find performance bottlenecks',
      'Key metrics: requests/sec (throughput), latency (p50/p95/p99), error rate',
      'Locust: Python-based, script user behavior with tasks and weights',
      'Ramp up users gradually — find the breaking point (where error rate spikes)',
      'k6: JS-based load testing tool, great for CI integration',
      'JMeter: Java-based, GUI-driven, enterprise standard',
      'Test your rate limits — verify 429s fire at the right threshold',
      'Run load tests in staging, not production',
    ],
    codeExample: `# locustfile.py
from locust import HttpUser, task, between

class APIUser(HttpUser):
    wait_time = between(1, 3)  # wait 1-3 seconds between tasks

    def on_start(self):
        # Login once, store token
        r = self.client.post('/auth/login', json={
            'email': 'test@example.com',
            'password': 'testpass123',
        })
        self.token = r.json()['access_token']
        self.headers = {'Authorization': f'Bearer {self.token}'}

    @task(5)  # weight 5 — run 5x more often than weight-1 tasks
    def get_users(self):
        self.client.get('/users', headers=self.headers)

    @task(2)
    def search_users(self):
        self.client.get('/users?role=admin', headers=self.headers)

    @task(1)
    def create_user(self):
        self.client.post('/users', headers=self.headers,
            json={'name': 'Load Test', 'email': f'test{id(self)}@test.com'})

# Run: locust -f locustfile.py --host=http://localhost:8000
# Then open http://localhost:8089 for web UI`,
    resources: ['Locust Documentation', 'k6 Load Testing', 'Performance Testing Guide'],
  },

  // REAL-TIME
  {
    id: 'websockets',
    title: 'WebSockets',
    category: 'realtime',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'Full-duplex real-time communication — chat apps, live dashboards, gaming',
    keyPoints: [
      'WebSocket: upgrades from HTTP to a persistent, full-duplex TCP connection',
      'ws:// (unsecure) or wss:// (over TLS) — always use wss:// in production',
      'Handshake: client sends Upgrade: websocket header, server responds with 101 Switching Protocols',
      'Unlike HTTP, either side can send messages at any time after connection',
      'Use cases: chat, live price feeds, collaborative editing, multiplayer games, notifications',
      'Connection management: handle disconnect/reconnect, heartbeat (ping/pong)',
      'Scale challenge: WebSockets are stateful — sticky sessions or Redis Pub/Sub for multi-server',
      'vs SSE: WebSocket is bidirectional; SSE is one-way (server→client only) but simpler',
    ],
    codeExample: `from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from typing import list

app = FastAPI()

class ConnectionManager:
    def __init__(self):
        self.active: list[WebSocket] = []

    async def connect(self, ws: WebSocket):
        await ws.accept()
        self.active.append(ws)

    def disconnect(self, ws: WebSocket):
        self.active.remove(ws)

    async def broadcast(self, message: str):
        for ws in self.active:
            await ws.send_text(message)

manager = ConnectionManager()

@app.websocket('/ws/chat')
async def chat(websocket: WebSocket, user: str):
    await manager.connect(websocket)
    try:
        while True:
            data = await websocket.receive_text()
            await manager.broadcast(f'{user}: {data}')
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        await manager.broadcast(f'{user} left the chat')`,
    resources: ['FastAPI WebSockets', 'MDN WebSockets API', 'WebSocket RFC 6455'],
  },
  {
    id: 'server-sent-events',
    title: 'Server-Sent Events (SSE)',
    category: 'realtime',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'One-way server-to-client streaming over HTTP — live feeds and notifications',
    keyPoints: [
      'SSE: server pushes updates to client over a persistent HTTP connection (one-way)',
      'Content-Type: text/event-stream — browser EventSource API handles reconnection automatically',
      'Simpler than WebSockets for server→client only use cases (no client messages needed)',
      'Works over standard HTTP — no special protocol upgrade; compatible with HTTP/2 multiplexing',
      'Event format: data: <payload>\\n\\n — with optional id: and event: fields',
      'Built-in reconnection: browser reconnects automatically; Last-Event-ID header resumes from last event',
      'Use cases: live notifications, activity feeds, progress bars, stock prices (read-only)',
      'Scale: each SSE connection holds a server-side coroutine — use async generators in FastAPI',
    ],
    codeExample: `import asyncio
from fastapi import FastAPI
from fastapi.responses import StreamingResponse

app = FastAPI()

async def event_generator(user_id: int):
    """Yield SSE-formatted events."""
    while True:
        notifications = db.get_new_notifications(user_id)
        for note in notifications:
            yield f"id: {note.id}\\n"
            yield f"event: notification\\n"
            yield f"data: {note.json()}\\n\\n"
        await asyncio.sleep(1)  # poll every second

@app.get('/notifications/stream')
async def stream_notifications(user_id: int):
    return StreamingResponse(
        event_generator(user_id),
        media_type='text/event-stream',
        headers={
            'Cache-Control': 'no-cache',
            'Connection': 'keep-alive',
            'X-Accel-Buffering': 'no',  # disable nginx buffering
        },
    )

# Frontend:
# const es = new EventSource('/notifications/stream?user_id=1');
# es.addEventListener('notification', e => console.log(JSON.parse(e.data)));`,
    resources: ['MDN Server-Sent Events', 'FastAPI StreamingResponse', 'SSE vs WebSockets'],
  },

  // STANDARDS
  {
    id: 'openapi-swagger',
    title: 'OpenAPI / Swagger',
    category: 'standards',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Auto-generate API documentation with OpenAPI 3.0 — Swagger UI, ReDoc, and API-first design',
    keyPoints: [
      'OpenAPI 3.0 is the industry standard for describing REST APIs — language-agnostic YAML/JSON',
      'FastAPI auto-generates OpenAPI spec from your Python type hints and docstrings',
      'Swagger UI (/docs) — interactive API explorer; ReDoc (/redoc) — clean documentation',
      'API-first design: write the OpenAPI spec before coding — serves as contract for teams',
      'Security schemes in OpenAPI: bearerAuth, apiKey, oauth2',
      'Request/response schemas are derived from Pydantic models',
      'Tags organize endpoints into logical groups in the docs UI',
      'Use operationId for stable, named operations (useful for client code generation)',
    ],
    codeExample: `from fastapi import FastAPI
from pydantic import BaseModel

app = FastAPI(
    title='My API',
    description='Full-featured REST API for managing users and orders',
    version='2.0.0',
    docs_url='/docs',
    redoc_url='/redoc',
)

class UserResponse(BaseModel):
    id: int
    name: str
    email: str

    model_config = {'json_schema_extra': {
        'example': {'id': 1, 'name': 'Alice', 'email': 'alice@example.com'}
    }}

@app.get(
    '/users/{user_id}',
    response_model=UserResponse,
    summary='Get a user by ID',
    tags=['Users'],
    operation_id='get_user',
    responses={
        404: {'description': 'User not found'},
        401: {'description': 'Not authenticated'},
    },
)
def get_user(user_id: int):
    """Retrieve a single user by their unique ID."""
    return db.get(user_id)`,
    resources: ['OpenAPI Specification', 'FastAPI Docs', 'Swagger Editor'],
  },
  {
    id: 'api-lifecycle',
    title: 'API Lifecycle Management',
    category: 'standards',
    level: 'advanced',
    estimatedHours: 3,
    description: 'Design → Build → Test → Deploy → Monitor → Deprecate — managing APIs over time',
    keyPoints: [
      'API lifecycle: Design → Prototype → Build → Test → Deploy → Monitor → Deprecate → Retire',
      'API-first: design the contract (OpenAPI spec) before implementation — align teams early',
      'Semantic versioning: v1.2.3 — major for breaking, minor for features, patch for fixes',
      'Deprecation: announce early, set a sunset date, send Deprecation and Sunset headers',
      'Migration guide: document how to move from v1 to v2 — diff of breaking changes',
      'Monitor API health: uptime, error rates, p99 latency via dashboards and alerting',
      'API gateway for lifecycle control: traffic splitting, A/B testing, gradual rollouts',
      'Client SDKs: generate from OpenAPI spec (openapi-generator) — reduces migration friction',
    ],
    codeExample: `# Deprecation headers in response
from fastapi import FastAPI, Response

@app.get('/v1/users/{id}')
def get_user_v1(id: int, response: Response):
    # Signal deprecation in every response header
    response.headers['Deprecation'] = 'true'
    response.headers['Sunset'] = 'Wed, 31 Dec 2025 23:59:59 GMT'
    response.headers['Link'] = '<https://api.example.com/v2/users/{id}>; rel="successor-version"'
    response.headers['Warning'] = '299 - "This endpoint is deprecated. Use /v2/users/{id}"'
    return legacy_get_user(id)

# Semantic versioning in pyproject.toml / package.json
# version = "2.1.0"  -- 2=major (breaking), 1=minor (new feature), 0=patch (bugfix)`,
    resources: ['API Lifecycle Management', 'RFC 8594 Sunset Header', 'Stripe API versioning docs'],
  },
];