export interface RoadmapTopic {
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

export interface RoadmapCategory {
  id: string;
  name: string;
  icon: string;
  color: string;
  description: string;
  order: number;
}

export const roadmapCategories: RoadmapCategory[] = [
  { id: 'python-core', name: 'Python Core', icon: '🐍', color: '#3b82f6', description: 'Language fundamentals', order: 1 },
  { id: 'python-advanced', name: 'Python Advanced', icon: '⚡', color: '#8b5cf6', description: 'Advanced patterns & internals', order: 2 },
  { id: 'oop', name: 'OOP & Design', icon: '🏛️', color: '#ec4899', description: 'Object-oriented design principles', order: 3 },
  { id: 'django', name: 'Django', icon: '🎸', color: '#10b981', description: 'Full-stack web framework', order: 4 },
  { id: 'fastapi', name: 'FastAPI', icon: '🚀', color: '#f59e0b', description: 'Modern async API framework', order: 5 },
  { id: 'databases', name: 'Databases', icon: '🗄️', color: '#ef4444', description: 'SQL, ORM, migrations', order: 6 },
  { id: 'testing', name: 'Testing', icon: '🧪', color: '#06b6d4', description: 'Unit, integration, API testing', order: 7 },
  { id: 'deployment', name: 'DevOps & Deployment', icon: '☁️', color: '#84cc16', description: 'Docker, CI/CD, cloud', order: 8 },
  { id: 'package-managers', name: 'Package Managers', icon: '📦', color: '#f97316', description: 'pip, conda, poetry, uv — managing Python dependencies', order: 9 },
  { id: 'advanced-python', name: 'Advanced Python', icon: '⚡', color: '#8b5cf6', description: 'Decorators, generators, context managers, metaclasses', order: 10 },
  { id: 'concurrency', name: 'Concurrency', icon: '🔄', color: '#06b6d4', description: 'Threading, multiprocessing, async/await, GIL', order: 11 },
  { id: 'static-typing', name: 'Static Typing', icon: '🔎', color: '#84cc16', description: 'Type hints, mypy, Pydantic, pyright', order: 12 },
  { id: 'code-quality', name: 'Code Quality', icon: '✨', color: '#ec4899', description: 'Formatting, linting, documentation, testing tools', order: 13 },
  { id: 'python-testing', name: 'Testing', icon: '🧪', color: '#14b8a6', description: 'pytest, unittest, mocking, coverage, TDD', order: 14 },
];

export const roadmapTopics: RoadmapTopic[] = [
  // ─── PYTHON CORE ───
  {
    id: 'py-data-types',
    title: 'Data Types & Variables',
    category: 'python-core',
    level: 'beginner',
    estimatedHours: 3,
    description: 'Python built-in types, type system, and variable binding. Understanding mutability vs immutability.',
    keyPoints: [
      'int, float, str, bool — immutable primitives',
      'list, dict, set, tuple — collections',
      'None type and truthiness',
      'Dynamic typing — variables are labels, not boxes',
      'id() and is vs == distinction',
      'Type conversion: int(), str(), float(), list()',
    ],
    codeExample: `# Immutability matters
a = "hello"
b = a
a += " world"
print(b)  # "hello" — strings are immutable, b didn't change

# Mutability matters
x = [1, 2, 3]
y = x          # y points to SAME list
y.append(4)
print(x)  # [1, 2, 3, 4] — x changed too!

# Fix: use copy
y = x.copy()
y.append(5)
print(x)  # [1, 2, 3, 4] — x unchanged now

# Type checking
print(type(42))          # <class 'int'>
print(isinstance(42, (int, float)))  # True`,
    resources: ['Python docs: Built-in Types', 'Real Python: Variables'],
  },
  {
    id: 'py-control-flow',
    title: 'Control Flow & Loops',
    category: 'python-core',
    level: 'beginner',
    estimatedHours: 2,
    description: 'if/elif/else, for/while loops, comprehensions, and Pythonic iteration patterns.',
    keyPoints: [
      'for item in iterable — Python-style iteration (no index needed usually)',
      'enumerate() for index + value pairs',
      'zip() to iterate multiple iterables simultaneously',
      'range() — start, stop, step',
      'List/dict/set comprehensions',
      'break, continue, else on loops',
      'Walrus operator := (Python 3.8+)',
    ],
    codeExample: `# Pythonic iteration patterns
names = ["Alice", "Bob", "Charlie"]

# With index
for i, name in enumerate(names):
    print(f"{i}: {name}")

# Zip two lists
scores = [90, 85, 92]
for name, score in zip(names, scores):
    print(f"{name}: {score}")

# List comprehension
squares = [x**2 for x in range(10) if x % 2 == 0]
# [0, 4, 16, 36, 64]

# Dict comprehension
word_lengths = {word: len(word) for word in names}
# {'Alice': 5, 'Bob': 3, 'Charlie': 7}

# Walrus operator
import re
if match := re.search(r'\\d+', "price: 42"):
    print(match.group())  # 42`,
    resources: ['Python docs: Control Flow', 'Real Python: Comprehensions'],
  },
  {
    id: 'py-functions',
    title: 'Functions & Scope',
    category: 'python-core',
    level: 'beginner',
    estimatedHours: 4,
    description: 'Defining functions, argument types, *args/**kwargs, closures, and scope rules.',
    keyPoints: [
      'Positional, keyword, default arguments',
      '*args and **kwargs — variadic functions',
      'Keyword-only arguments (after *)',
      'LEGB scope rule: Local → Enclosing → Global → Built-in',
      'Closures — functions capturing outer scope',
      'Lambda functions for short throwaway functions',
      'First-class functions — pass as arguments',
    ],
    codeExample: `# All argument types
def create_user(name, age, role="user", *tags, admin=False, **meta):
    print(f"{name}, {age}, {role}, tags={tags}, admin={admin}, meta={meta}")

create_user("Hari", 25, "dev", "backend", "python", admin=True, city="Mumbai")

# Closure
def make_counter(start=0):
    count = start
    def counter():
        nonlocal count
        count += 1
        return count
    return counter

c = make_counter(10)
print(c())  # 11
print(c())  # 12

# First-class functions
def apply(func, value):
    return func(value)

print(apply(str.upper, "hello"))   # HELLO
print(apply(lambda x: x*2, 5))    # 10`,
    resources: ['Python docs: Functions', 'Real Python: *args and **kwargs'],
  },
  {
    id: 'py-decorators',
    title: 'Decorators & Context Managers',
    category: 'python-advanced',
    level: 'intermediate',
    estimatedHours: 5,
    description: 'Writing and using decorators for cross-cutting concerns, and context managers with the with statement.',
    keyPoints: [
      'Decorators are functions that wrap other functions',
      '@functools.wraps to preserve metadata',
      'Decorator with arguments (3-level nesting)',
      'Class-based decorators',
      'Context managers with __enter__/__exit__',
      '@contextmanager from contextlib',
      'Common use cases: logging, timing, auth, retry',
    ],
    codeExample: `import functools
import time

# Decorator with arguments
def retry(max_attempts=3, delay=1.0):
    def decorator(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            for attempt in range(max_attempts):
                try:
                    return func(*args, **kwargs)
                except Exception as e:
                    if attempt == max_attempts - 1:
                        raise
                    print(f"Attempt {attempt+1} failed: {e}. Retrying...")
                    time.sleep(delay)
        return wrapper
    return decorator

@retry(max_attempts=3, delay=0.5)
def fetch_data(url: str):
    # simulated flaky function
    import random
    if random.random() < 0.7:
        raise ConnectionError("Network error")
    return f"Data from {url}"

# Context manager
from contextlib import contextmanager

@contextmanager
def timer(label: str):
    start = time.perf_counter()
    try:
        yield
    finally:
        elapsed = time.perf_counter() - start
        print(f"{label}: {elapsed:.3f}s")

with timer("sorting"):
    sorted(range(100000, 0, -1))`,
    resources: ['Real Python: Decorators', 'Python docs: contextlib'],
  },
  {
    id: 'py-generators',
    title: 'Generators & Iterators',
    category: 'python-advanced',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'Lazy evaluation with generators, the iterator protocol, and memory-efficient data pipelines.',
    keyPoints: [
      'yield vs return — generators pause execution',
      'Generator expressions: (x for x in ...)',
      'Iterator protocol: __iter__ and __next__',
      'yield from for delegating to sub-generators',
      'Infinite generators with while True',
      'Memory efficiency — never hold full dataset',
      'itertools module for common generator patterns',
    ],
    codeExample: `import itertools

# Generator function
def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Take first 10 Fibonacci numbers
fib = fibonacci()
first_10 = [next(fib) for _ in range(10)]
print(first_10)  # [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Memory-efficient file processing
def read_large_file(filepath: str):
    with open(filepath) as f:
        for line in f:
            yield line.strip()

# Pipeline: generator chaining
def parse_numbers(lines):
    for line in lines:
        if line.isdigit():
            yield int(line)

def filter_evens(numbers):
    yield from (n for n in numbers if n % 2 == 0)

# itertools examples
print(list(itertools.islice(fibonacci(), 5)))    # [0, 1, 1, 2, 3]
print(list(itertools.chain([1,2], [3,4], [5])))  # [1, 2, 3, 4, 5]
print(list(itertools.combinations([1,2,3], 2)))  # [(1,2),(1,3),(2,3)]`,
    resources: ['Real Python: Generators', 'Python docs: itertools'],
  },
  // ─── OOP ───
  {
    id: 'oop-fundamentals',
    title: 'OOP Fundamentals',
    category: 'oop',
    level: 'intermediate',
    estimatedHours: 6,
    description: 'Classes, inheritance, encapsulation, polymorphism — the four pillars with Pythonic patterns.',
    keyPoints: [
      '__init__, __str__, __repr__, __len__, __eq__ magic methods',
      '@classmethod and @staticmethod',
      '@property for computed attributes',
      'Inheritance and super()',
      'Multiple inheritance and MRO (Method Resolution Order)',
      'Abstract base classes with abc module',
      'Dataclasses — @dataclass decorator',
    ],
    codeExample: `from abc import ABC, abstractmethod
from dataclasses import dataclass, field

# Abstract base class
class Shape(ABC):
    @abstractmethod
    def area(self) -> float: ...

    @abstractmethod
    def perimeter(self) -> float: ...

    def describe(self):
        return f"{self.__class__.__name__}: area={self.area():.2f}"

@dataclass
class Circle(Shape):
    radius: float

    def area(self) -> float:
        import math
        return math.pi * self.radius ** 2

    def perimeter(self) -> float:
        import math
        return 2 * math.pi * self.radius

@dataclass
class Rectangle(Shape):
    width: float
    height: float
    tags: list = field(default_factory=list)  # mutable default

    def area(self) -> float:
        return self.width * self.height

    def perimeter(self) -> float:
        return 2 * (self.width + self.height)

shapes = [Circle(5), Rectangle(4, 6)]
for shape in shapes:
    print(shape.describe())`,
    resources: ['Real Python: OOP', 'Python docs: dataclasses'],
  },
  {
    id: 'solid-principles',
    title: 'SOLID Principles in Python',
    category: 'oop',
    level: 'advanced',
    estimatedHours: 8,
    description: 'Applying SOLID design principles to write maintainable, extensible Python code.',
    keyPoints: [
      'S — Single Responsibility: one class, one reason to change',
      'O — Open/Closed: open for extension, closed for modification',
      'L — Liskov Substitution: subtypes must be substitutable for base types',
      'I — Interface Segregation: many small interfaces > one fat interface',
      'D — Dependency Inversion: depend on abstractions, not concretions',
      'These principles reduce coupling and increase cohesion',
    ],
    codeExample: `from abc import ABC, abstractmethod

# ─── Dependency Inversion Principle ───
# Bad: OrderService directly creates EmailService
class BadOrderService:
    def place_order(self, order):
        import smtplib  # tight coupling!
        # send email directly...

# Good: Depend on abstraction
class Notifier(ABC):
    @abstractmethod
    def notify(self, message: str): ...

class EmailNotifier(Notifier):
    def notify(self, message: str):
        print(f"Email: {message}")

class SMSNotifier(Notifier):
    def notify(self, message: str):
        print(f"SMS: {message}")

class OrderService:
    def __init__(self, notifier: Notifier):
        self.notifier = notifier  # injected dependency

    def place_order(self, order: dict):
        # process order...
        self.notifier.notify(f"Order {order['id']} placed!")

# Easy to swap notifiers without changing OrderService
service = OrderService(EmailNotifier())
service.place_order({"id": "ORD-001"})

service2 = OrderService(SMSNotifier())
service2.place_order({"id": "ORD-002"})`,
    resources: ['Real Python: SOLID', 'Clean Code by Robert Martin'],
  },
  // ─── DJANGO ───
  {
    id: 'django-setup',
    title: 'Django Project Setup & Structure',
    category: 'django',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'Setting up a production-ready Django project with proper app structure, settings, and configuration.',
    keyPoints: [
      'django-admin startproject / startapp',
      'settings.py: BASE_DIR, DATABASES, INSTALLED_APPS, MIDDLEWARE',
      'Development vs Production settings split',
      'Environment variables with python-decouple or django-environ',
      'urls.py — project-level and app-level routing',
      'manage.py commands: runserver, migrate, makemigrations, shell',
      'App structure: models, views, serializers, urls, admin',
    ],
    codeExample: `# settings/base.py
from pathlib import Path
from decouple import config

BASE_DIR = Path(__file__).resolve().parent.parent.parent

SECRET_KEY = config('SECRET_KEY')
DEBUG = config('DEBUG', cast=bool, default=False)

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'rest_framework',
    'corsheaders',
    'users',
    'orders',
]

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': config('DB_NAME'),
        'USER': config('DB_USER'),
        'PASSWORD': config('DB_PASSWORD'),
        'HOST': config('DB_HOST', default='localhost'),
        'PORT': config('DB_PORT', default='5432'),
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
        'rest_framework.permissions.IsAuthenticated',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 20,
}`,
    resources: ['Django docs: Getting Started', 'Two Scoops of Django'],
  },
  {
    id: 'django-models',
    title: 'Django Models & ORM',
    category: 'django',
    level: 'intermediate',
    estimatedHours: 8,
    description: 'Designing models, relationships, migrations, and writing efficient ORM queries.',
    keyPoints: [
      'Field types: CharField, IntegerField, ForeignKey, ManyToManyField, JSONField',
      'Model relationships: OneToOne, ForeignKey, M2M with through models',
      'Meta class: ordering, indexes, constraints, verbose_name',
      'Custom managers and querysets',
      'select_related() and prefetch_related() for N+1 prevention',
      'F() expressions, Q() objects, annotate(), aggregate()',
      'Signals: pre_save, post_save, pre_delete',
    ],
    codeExample: `from django.db import models
from django.db.models import Q, F, Count, Avg

class ActiveManager(models.Manager):
    def get_queryset(self):
        return super().get_queryset().filter(is_active=True)

class Patient(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    objects = models.Manager()
    active = ActiveManager()

    class Meta:
        ordering = ['-created_at']
        indexes = [models.Index(fields=['email', 'is_active'])]

    def __str__(self):
        return self.name

class Appointment(models.Model):
    patient = models.ForeignKey(Patient, on_delete=models.CASCADE, related_name='appointments')
    scheduled_at = models.DateTimeField()
    status = models.CharField(max_length=20, choices=[
        ('pending', 'Pending'), ('confirmed', 'Confirmed'), ('cancelled', 'Cancelled')
    ])

# Efficient queries
# N+1 problem (bad)
appointments = Appointment.objects.all()
for apt in appointments:
    print(apt.patient.name)  # 1 query per appointment!

# Fixed with select_related
appointments = Appointment.objects.select_related('patient').all()

# Aggregate queries
from django.db.models import Count
stats = Patient.active.annotate(
    appointment_count=Count('appointments')
).filter(appointment_count__gt=2)

# Complex filter with Q
results = Patient.objects.filter(
    Q(name__icontains="hari") | Q(email__icontains="hari")
)`,
    resources: ['Django docs: Models', 'Django docs: QuerySet API'],
  },
  {
    id: 'django-drf',
    title: 'Django REST Framework',
    category: 'django',
    level: 'intermediate',
    estimatedHours: 10,
    description: 'Building production-grade REST APIs with DRF — serializers, viewsets, permissions, authentication.',
    keyPoints: [
      'Serializers: ModelSerializer, nested serializers, validation',
      'Views: APIView, GenericAPIView, ViewSets, ModelViewSet',
      'Routers for auto URL generation',
      'Permissions: IsAuthenticated, IsOwner, custom permissions',
      'JWT authentication with Simple JWT',
      'Filtering, ordering, search with django-filter',
      'Custom actions with @action decorator',
    ],
    codeExample: `from rest_framework import serializers, viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

class PatientSerializer(serializers.ModelSerializer):
    appointment_count = serializers.IntegerField(read_only=True)

    class Meta:
        model = Patient
        fields = ['id', 'name', 'email', 'phone', 'appointment_count', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_email(self, value):
        if Patient.objects.filter(email=value).exclude(pk=self.instance.pk if self.instance else None).exists():
            raise serializers.ValidationError("Email already registered.")
        return value

class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user.is_staff or obj.user == request.user

class PatientViewSet(viewsets.ModelViewSet):
    serializer_class = PatientSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        qs = Patient.active.annotate(appointment_count=Count('appointments'))
        if not self.request.user.is_staff:
            qs = qs.filter(user=self.request.user)
        return qs

    @action(detail=True, methods=['post'], url_path='cancel-appointments')
    def cancel_appointments(self, request, pk=None):
        patient = self.get_object()
        patient.appointments.filter(status='pending').update(status='cancelled')
        return Response({'message': 'All pending appointments cancelled'})`,
    resources: ['DRF docs', 'Simple JWT docs'],
  },
  // ─── FASTAPI ───
  {
    id: 'fastapi-setup',
    title: 'FastAPI Fundamentals',
    category: 'fastapi',
    level: 'intermediate',
    estimatedHours: 6,
    description: 'Building async APIs with FastAPI — routing, Pydantic models, dependency injection, and auto-documentation.',
    keyPoints: [
      'Path operations: @app.get, @app.post, @app.put, @app.delete',
      'Pydantic BaseModel for request/response validation',
      'Path params, query params, request body',
      'Dependency Injection with Depends()',
      'Async/await — fully async handlers',
      'Automatic Swagger UI at /docs',
      'Response models and status codes',
    ],
    codeExample: `from fastapi import FastAPI, Depends, HTTPException, status
from pydantic import BaseModel, EmailStr
from typing import Optional
import asyncpg

app = FastAPI(title="Healthcare API", version="1.0.0")

# Pydantic models
class PatientCreate(BaseModel):
    name: str
    email: EmailStr
    phone: str
    age: int

class PatientResponse(PatientCreate):
    id: int
    class Config:
        from_attributes = True

# Dependency injection
async def get_db():
    conn = await asyncpg.connect(DATABASE_URL)
    try:
        yield conn
    finally:
        await conn.close()

async def get_current_user(token: str = Depends(oauth2_scheme)):
    # verify JWT token
    ...

# Route with full features
@app.post("/patients/", response_model=PatientResponse, status_code=status.HTTP_201_CREATED)
async def create_patient(
    patient: PatientCreate,
    db = Depends(get_db),
    current_user = Depends(get_current_user)
):
    existing = await db.fetchrow("SELECT id FROM patients WHERE email=$1", patient.email)
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")

    row = await db.fetchrow(
        "INSERT INTO patients(name, email, phone, age) VALUES($1,$2,$3,$4) RETURNING *",
        patient.name, patient.email, patient.phone, patient.age
    )
    return dict(row)

@app.get("/patients/{patient_id}", response_model=PatientResponse)
async def get_patient(patient_id: int, db = Depends(get_db)):
    row = await db.fetchrow("SELECT * FROM patients WHERE id=$1", patient_id)
    if not row:
        raise HTTPException(status_code=404, detail="Patient not found")
    return dict(row)`,
    resources: ['FastAPI docs', 'FastAPI full course - Fireship'],
  },
  {
    id: 'fastapi-advanced',
    title: 'FastAPI Advanced Patterns',
    category: 'fastapi',
    level: 'advanced',
    estimatedHours: 8,
    description: 'Background tasks, WebSockets, middleware, SQLAlchemy with async, and structuring large FastAPI apps.',
    keyPoints: [
      'SQLAlchemy async with asyncio session',
      'Alembic for migrations',
      'Background tasks: BackgroundTasks and Celery',
      'WebSocket endpoints',
      'Custom middleware for logging, rate limiting',
      'APIRouter for modular organization',
      'Lifespan events for startup/shutdown',
    ],
    codeExample: `from fastapi import FastAPI, BackgroundTasks, WebSocket
from contextlib import asynccontextmanager
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker

# Lifespan for startup/shutdown
@asynccontextmanager
async def lifespan(app: FastAPI):
    # Startup
    engine = create_async_engine(DATABASE_URL, echo=False)
    app.state.engine = engine
    print("Database connected")
    yield
    # Shutdown
    await engine.dispose()
    print("Database disconnected")

app = FastAPI(lifespan=lifespan)

# Background task
async def send_notification_email(patient_id: int, message: str):
    # async email sending
    await asyncio.sleep(1)  # simulate
    print(f"Email sent to patient {patient_id}: {message}")

@app.post("/appointments/")
async def create_appointment(
    data: AppointmentCreate,
    background_tasks: BackgroundTasks,
    db: AsyncSession = Depends(get_async_session),
):
    appointment = await create_appointment_in_db(db, data)
    # Don't block the response — send email in background
    background_tasks.add_task(send_notification_email, data.patient_id, "Appointment confirmed")
    return appointment

# WebSocket
@app.websocket("/ws/notifications/{user_id}")
async def websocket_notifications(websocket: WebSocket, user_id: int):
    await websocket.accept()
    try:
        while True:
            # Send real-time notifications
            notification = await get_pending_notification(user_id)
            if notification:
                await websocket.send_json(notification)
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        print(f"User {user_id} disconnected")`,
    resources: ['FastAPI advanced docs', 'Full Stack FastAPI Template'],
  },

  // ─── PACKAGE MANAGERS ───
  {
    id: 'pip-pypi',
    title: 'pip & PyPI',
    category: 'package-managers',
    level: 'beginner',
    estimatedHours: 2,
    description: 'Installing, upgrading, uninstalling packages from the Python Package Index.',
    keyPoints: [
      'pip install/uninstall/upgrade — basic package operations',
      'requirements.txt — listing project dependencies',
      'pip freeze — snapshot installed packages',
      'pip install -e (editable) — install local package in development mode',
      'Virtual environments with pip — isolate project deps',
      'pip-tools for deterministic dependency pinning',
    ],
    codeExample: `# Install a package
pip install requests

# Install specific version
pip install requests==2.31.0

# Install with version constraint
pip install "requests>=2.28,<3.0"

# Upgrade a package
pip install --upgrade requests

# Uninstall
pip uninstall requests

# Freeze current environment to requirements.txt
pip freeze > requirements.txt

# Install from requirements.txt
pip install -r requirements.txt

# Editable install (for local package development)
pip install -e .

# Show package info
pip show requests

# List outdated packages
pip list --outdated

# requirements.txt example:
# requests==2.31.0
# fastapi==0.104.1
# sqlalchemy>=2.0,<3.0`,
    resources: ['pip docs', 'PyPI', 'pip-tools docs'],
  },
  {
    id: 'virtual-environments',
    title: 'Virtual Environments (venv/virtualenv/pyenv)',
    category: 'package-managers',
    level: 'beginner',
    estimatedHours: 3,
    description: 'Isolate project dependencies with virtual environments.',
    keyPoints: [
      'python -m venv — built-in virtual environment tool',
      'activate/deactivate — switch in and out of a venv',
      'pyenv for Python version management across projects',
      'pyenv-virtualenv — combine pyenv with virtual environments',
      'Why isolation matters — avoid dependency conflicts',
      '.python-version file — declare per-project Python version',
    ],
    codeExample: `# Create a virtual environment
python -m venv .venv

# Activate (Linux/macOS)
source .venv/bin/activate

# Activate (Windows PowerShell)
.venv\\Scripts\\Activate.ps1

# Deactivate
deactivate

# --- pyenv (manage multiple Python versions) ---
# Install pyenv (Linux/macOS via curl or brew)
# Install a Python version
pyenv install 3.12.3

# Set global default
pyenv global 3.12.3

# Set local version for current project (writes .python-version)
pyenv local 3.11.9

# List installed versions
pyenv versions

# --- pyenv-virtualenv ---
pyenv virtualenv 3.12.3 my-project-env
pyenv activate my-project-env
pyenv deactivate`,
    resources: ['Python docs: venv', 'pyenv GitHub', 'Real Python: Virtual Environments'],
  },
  {
    id: 'poetry',
    title: 'Poetry',
    category: 'package-managers',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Modern dependency management and packaging with pyproject.toml.',
    keyPoints: [
      'poetry init/new — scaffold a new project with pyproject.toml',
      'poetry add/remove — add or remove dependencies',
      'pyproject.toml — single file for metadata + deps',
      'poetry.lock — deterministic lock file (commit to VCS)',
      'Semantic versioning constraints (^1.2, ~1.2, >=1.2)',
      'poetry build/publish — build wheels and publish to PyPI',
      'Dependency groups (dev/test) — optional dependency sets',
    ],
    codeExample: `# Create new project
poetry new my-project

# Initialize in existing directory
poetry init

# Add a dependency
poetry add requests

# Add dev dependency
poetry add --group dev pytest black ruff

# Install all deps from poetry.lock
poetry install

# Update a package
poetry update requests

# Run a command inside the virtual env
poetry run python main.py
poetry run pytest

# Build distributable
poetry build

# Publish to PyPI
poetry publish

# pyproject.toml example:
[tool.poetry]
name = "my-project"
version = "0.1.0"
description = "A sample project"
authors = ["Hari <hari@example.com>"]

[tool.poetry.dependencies]
python = "^3.11"
requests = "^2.31"
fastapi = "^0.104"

[tool.poetry.group.dev.dependencies]
pytest = "^7.4"
ruff = "^0.1"
mypy = "^1.6"`,
    resources: ['Poetry docs', 'Real Python: Poetry'],
  },
  {
    id: 'conda-uv',
    title: 'Conda & uv',
    category: 'package-managers',
    level: 'intermediate',
    estimatedHours: 2,
    description: 'Conda for data science environments; uv for ultra-fast package management.',
    keyPoints: [
      'conda create/activate/install — environment and package management',
      'conda vs pip — conda installs compiled binaries including non-Python libs',
      'conda-forge — community channel with broader package support',
      'uv — 10-100x faster pip/venv replacement written in Rust',
      'uv venv — create virtual environments with uv',
      'uv pip install — drop-in pip replacement with speed',
    ],
    codeExample: `# ─── Conda ───
# Create environment with specific Python
conda create -n myenv python=3.11

# Activate
conda activate myenv

# Install packages (uses binary builds)
conda install numpy pandas scikit-learn

# Install from conda-forge channel
conda install -c conda-forge lightgbm

# Export environment
conda env export > environment.yml

# Recreate from yml
conda env create -f environment.yml

# List environments
conda env list

# ─── uv (ultra-fast pip replacement) ───
# Install uv (curl or pip)
pip install uv

# Create a virtual environment
uv venv .venv

# Install packages (much faster than pip)
uv pip install requests fastapi

# Install from requirements.txt
uv pip install -r requirements.txt

# Sync environment to requirements
uv pip sync requirements.txt

# uv also manages Python versions
uv python install 3.12`,
    resources: ['Conda docs', 'uv GitHub (Astral)', 'conda-forge'],
  },

  // ─── ADVANCED PYTHON ───
  {
    id: 'decorators-advanced',
    title: 'Decorators & Functools',
    category: 'advanced-python',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'Write and compose decorators; use functools.wraps, lru_cache, partial.',
    keyPoints: [
      'Decorator factories — decorators that take arguments (3-level nesting)',
      '@wraps to preserve __name__, __doc__, and other metadata',
      'Stacking decorators — order matters (bottom-up application)',
      'Class-based decorators using __call__',
      'functools.lru_cache / @cache for memoization',
      'functools.partial for partial function application',
      'functools.reduce for fold/accumulate patterns',
    ],
    codeExample: `import functools
import time

# ─── Decorator factory (accepts arguments) ───
def retry(max_attempts=3, exceptions=(Exception,)):
    def decorator(func):
        @functools.wraps(func)  # preserves func.__name__, __doc__ etc.
        def wrapper(*args, **kwargs):
            for attempt in range(1, max_attempts + 1):
                try:
                    return func(*args, **kwargs)
                except exceptions as e:
                    if attempt == max_attempts:
                        raise
                    print(f"Attempt {attempt} failed: {e}")
        return wrapper
    return decorator

@retry(max_attempts=3, exceptions=(ConnectionError,))
def fetch(url: str) -> str:
    ...

# ─── Stacking decorators ───
def bold(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return f"<b>{func(*args, **kwargs)}</b>"
    return wrapper

def italic(func):
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        return f"<i>{func(*args, **kwargs)}</i>"
    return wrapper

@bold       # applied second (outermost)
@italic     # applied first (innermost)
def greet(name):
    return f"Hello, {name}"

print(greet("Hari"))  # <b><i>Hello, Hari</i></b>

# ─── lru_cache for memoization ───
@functools.lru_cache(maxsize=128)
def fibonacci(n: int) -> int:
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

# ─── partial ───
from functools import partial

def power(base, exp):
    return base ** exp

square = partial(power, exp=2)
cube = partial(power, exp=3)
print(square(5))  # 25
print(cube(3))    # 27`,
    resources: ['Python docs: functools', 'Real Python: Decorators'],
  },
  {
    id: 'generators-itertools',
    title: 'Generators & itertools',
    category: 'advanced-python',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'Memory-efficient iteration with generators and the itertools module.',
    keyPoints: [
      'yield vs return — generators pause and resume execution',
      'Generator expressions — lazy (x for x in ...) vs eager [x for x in ...]',
      'send() to generator — two-way communication',
      'itertools.chain/islice/product/combinations/permutations/groupby',
      'Infinite iterators: itertools.count / cycle / repeat',
      'Lazy evaluation — no memory allocation until consumed',
    ],
    codeExample: `import itertools

# ─── Generator with send() ───
def accumulator():
    total = 0
    while True:
        value = yield total
        if value is None:
            break
        total += value

acc = accumulator()
next(acc)           # prime the generator
print(acc.send(10)) # 10
print(acc.send(20)) # 30
print(acc.send(5))  # 35

# ─── itertools showcase ───
# chain — flatten iterables
print(list(itertools.chain([1, 2], [3, 4], [5])))
# [1, 2, 3, 4, 5]

# islice — lazy slicing of infinite iterators
def naturals():
    n = 1
    while True:
        yield n
        n += 1

print(list(itertools.islice(naturals(), 5)))  # [1, 2, 3, 4, 5]

# groupby — group consecutive elements
data = [("A", 1), ("A", 2), ("B", 3), ("B", 4)]
for key, group in itertools.groupby(data, key=lambda x: x[0]):
    print(key, list(group))

# combinations & permutations
print(list(itertools.combinations("ABC", 2)))
# [('A','B'), ('A','C'), ('B','C')]

print(list(itertools.product([0, 1], repeat=3)))
# all 3-bit binary numbers`,
    resources: ['Python docs: itertools', 'Real Python: Generators'],
  },
  {
    id: 'context-managers',
    title: 'Context Managers',
    category: 'advanced-python',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Resource management with with statement and contextlib.',
    keyPoints: [
      '__enter__ / __exit__ protocol — class-based context managers',
      'contextlib.contextmanager — generator-based context managers',
      'ExitStack — manage multiple context managers dynamically',
      'contextlib.suppress — silently suppress specified exceptions',
      'contextlib.nullcontext — no-op context manager (useful in conditionals)',
      'asynccontextmanager — async context managers with async with',
      'Use cases: file handles, DB connections, locks, timers',
    ],
    codeExample: `import contextlib
import time

# ─── Generator-based context manager ───
@contextlib.contextmanager
def timer(label: str):
    start = time.perf_counter()
    try:
        yield  # body of the with block runs here
    finally:
        elapsed = time.perf_counter() - start
        print(f"{label}: {elapsed:.4f}s")

with timer("sorting 1M items"):
    sorted(range(1_000_000, 0, -1))

# ─── Class-based context manager ───
class ManagedDB:
    def __init__(self, url: str):
        self.url = url
        self.conn = None

    def __enter__(self):
        self.conn = connect(self.url)
        return self.conn

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            self.conn.rollback()
        else:
            self.conn.commit()
        self.conn.close()
        return False  # don't suppress exceptions

# ─── ExitStack for dynamic CMs ───
files = ["a.txt", "b.txt", "c.txt"]
with contextlib.ExitStack() as stack:
    handles = [stack.enter_context(open(f)) for f in files]
    # all files closed automatically

# ─── suppress ───
with contextlib.suppress(FileNotFoundError):
    import os
    os.remove("nonexistent.txt")  # silently ignored

# ─── asynccontextmanager ───
@contextlib.asynccontextmanager
async def async_timer(label: str):
    import asyncio
    start = time.perf_counter()
    try:
        yield
    finally:
        print(f"{label}: {time.perf_counter() - start:.4f}s")`,
    resources: ['Python docs: contextlib', 'Real Python: Context Managers'],
  },
  {
    id: 'metaclasses',
    title: 'Metaclasses & __dunder__ Methods',
    category: 'advanced-python',
    level: 'advanced',
    estimatedHours: 5,
    description: 'Deep Python object model: metaclasses, descriptors, __slots__, dunder methods.',
    keyPoints: [
      'type as the default metaclass — type(name, bases, namespace)',
      'Custom metaclass via __new__ vs __init__ on the metaclass',
      '__init_subclass__ — hook for when a class is subclassed',
      'Descriptors: __get__ / __set__ / __delete__ — power behind @property',
      '__slots__ — reduce memory per-instance by skipping __dict__',
      'Important dunders: __repr__ / __str__ / __eq__ / __hash__ / __len__ / __getitem__',
    ],
    codeExample: `# ─── Custom Metaclass ───
class SingletonMeta(type):
    _instances = {}

    def __call__(cls, *args, **kwargs):
        if cls not in cls._instances:
            cls._instances[cls] = super().__call__(*args, **kwargs)
        return cls._instances[cls]

class Config(metaclass=SingletonMeta):
    def __init__(self, env="production"):
        self.env = env

c1 = Config("dev")
c2 = Config("prod")
print(c1 is c2)   # True — same instance
print(c1.env)     # "dev"

# ─── Descriptor ───
class PositiveFloat:
    """Descriptor that validates value > 0."""
    def __set_name__(self, owner, name):
        self.name = name

    def __get__(self, obj, objtype=None):
        if obj is None:
            return self
        return obj.__dict__.get(self.name, 0.0)

    def __set__(self, obj, value):
        if value <= 0:
            raise ValueError(f"{self.name} must be positive, got {value}")
        obj.__dict__[self.name] = float(value)

class Product:
    price = PositiveFloat()
    weight = PositiveFloat()

    __slots__ = ('__dict__',)  # allow __dict__ but restrict arbitrary attrs

p = Product()
p.price = 9.99   # OK
p.weight = -1    # raises ValueError

# ─── __init_subclass__ ───
class PluginBase:
    _registry: dict = {}

    def __init_subclass__(cls, plugin_name: str, **kwargs):
        super().__init_subclass__(**kwargs)
        PluginBase._registry[plugin_name] = cls

class CSVPlugin(PluginBase, plugin_name="csv"):
    pass

class JSONPlugin(PluginBase, plugin_name="json"):
    pass

print(PluginBase._registry)
# {'csv': <class 'CSVPlugin'>, 'json': <class 'JSONPlugin'>}`,
    resources: ['Python docs: Data Model', 'Real Python: Metaclasses', 'Python docs: __slots__'],
  },
  {
    id: 'list-comprehensions-advanced',
    title: 'Comprehensions & Generator Expressions',
    category: 'advanced-python',
    level: 'intermediate',
    estimatedHours: 2,
    description: 'List, dict, set comprehensions and generator expressions for clean Pythonic code.',
    keyPoints: [
      'List comprehensions: [expr for x in iterable if condition]',
      'Dict comprehensions: {k: v for k, v in items}',
      'Set comprehensions: {expr for x in iterable}',
      'Nested comprehensions — flatten 2D lists',
      'Generator expressions — () instead of [] — lazy and memory-efficient',
      'When NOT to use comprehensions — complex logic belongs in a loop',
      'Walrus operator := — capture intermediate value in comprehension',
    ],
    codeExample: `# ─── List comprehension ───
squares = [x**2 for x in range(10) if x % 2 == 0]
# [0, 4, 16, 36, 64]

# ─── Dict comprehension ───
words = ["apple", "banana", "cherry"]
lengths = {word: len(word) for word in words}
# {'apple': 5, 'banana': 6, 'cherry': 6}

# ─── Set comprehension ───
unique_lengths = {len(word) for word in words}
# {5, 6}

# ─── Nested comprehension — flatten matrix ───
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [val for row in matrix for val in row]
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# ─── Generator expression (memory efficient) ───
total = sum(x**2 for x in range(1_000_000))  # no list created

# ─── Walrus operator in comprehension ───
import re
data = ["price: 10", "no number", "qty: 42", "none"]
numbers = [m.group() for line in data if (m := re.search(r"\\d+", line))]
# ['10', '42']

# ─── When NOT to use comprehensions ───
# Bad: hard to read
result = [transform(x) for x in data if condition1(x) if condition2(x) if condition3(x)]

# Better: explicit loop
result = []
for x in data:
    if condition1(x) and condition2(x) and condition3(x):
        result.append(transform(x))`,
    resources: ['PEP 572 (walrus)', 'Real Python: Comprehensions', 'Python docs: Expressions'],
  },
  {
    id: 'regex',
    title: 'Regular Expressions',
    category: 'advanced-python',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'Pattern matching with Python re module for text processing.',
    keyPoints: [
      're.match vs re.search vs re.findall — where in string to look',
      'Groups () and named groups (?P<name>...) for extraction',
      'Lookahead (?=...) and lookbehind (?<=...) assertions',
      're.compile for reusing patterns — avoids recompilation',
      'Common patterns: email, URL, phone number, IP address',
      're.sub for pattern-based string replacement',
      'Flags: re.IGNORECASE, re.MULTILINE, re.DOTALL, re.VERBOSE',
    ],
    codeExample: `import re

# ─── Basic search vs match ───
text = "User email: alice@example.com and bob@test.org"

# re.search — find first occurrence anywhere in string
m = re.search(r"[\\w.+-]+@[\\w-]+\\.[\\w.]+", text)
print(m.group())  # alice@example.com

# re.findall — all non-overlapping matches
emails = re.findall(r"[\\w.+-]+@[\\w-]+\\.[\\w.]+", text)
print(emails)  # ['alice@example.com', 'bob@test.org']

# ─── Named groups ───
log = "2024-01-15 ERROR Something went wrong"
pattern = re.compile(
    r"(?P<date>\\d{4}-\\d{2}-\\d{2}) (?P<level>\\w+) (?P<msg>.+)"
)
m = pattern.match(log)
if m:
    print(m.group("date"))   # 2024-01-15
    print(m.group("level"))  # ERROR
    print(m.group("msg"))    # Something went wrong

# ─── re.sub for replacement ───
phone = "Call me at (123) 456-7890 or 987-654-3210"
normalized = re.sub(r"[()\\s-]", "", phone)
print(normalized)  # CallmeatPhone1234567890or9876543210

# ─── Verbose mode for readability ───
email_pattern = re.compile(r"""
    [\\w.+-]+    # username
    @            # at sign
    [\\w-]+      # domain
    \\.          # dot
    [\\w.]+      # TLD
""", re.VERBOSE | re.IGNORECASE)

# ─── Lookahead / lookbehind ───
prices = "apple $2.50, banana $1.20, cherry $3.00"
# Find numbers preceded by $
amounts = re.findall(r"(?<=\\$)[\\d.]+", prices)
print(amounts)  # ['2.50', '1.20', '3.00']`,
    resources: ['Python docs: re module', 'regex101.com', 'Real Python: Regex'],
  },
  {
    id: 'lambdas-functional',
    title: 'Lambdas & Functional Programming',
    category: 'advanced-python',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Lambda functions, map/filter/reduce and functional programming in Python.',
    keyPoints: [
      'lambda syntax: lambda args: expression — single-expression anonymous function',
      'map() — apply function to every element (returns iterator)',
      'filter() — keep elements where function returns True',
      'functools.reduce() — fold a sequence into a single value',
      'operator module — operator.add, operator.itemgetter, operator.attrgetter',
      'Partial application with functools.partial',
      'Closures and variable capture — late binding gotcha',
    ],
    codeExample: `from functools import reduce
import operator

# ─── Lambda ───
double = lambda x: x * 2
add = lambda x, y: x + y
print(double(5))    # 10
print(add(3, 4))    # 7

# ─── map / filter / reduce ───
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

doubled = list(map(lambda x: x * 2, numbers))
evens = list(filter(lambda x: x % 2 == 0, numbers))
total = reduce(lambda acc, x: acc + x, numbers, 0)

# Pythonic alternatives (often preferred):
doubled = [x * 2 for x in numbers]
evens = [x for x in numbers if x % 2 == 0]
total = sum(numbers)

# ─── operator module ───
from operator import itemgetter, attrgetter

students = [{"name": "Alice", "grade": 90}, {"name": "Bob", "grade": 85}]
top = sorted(students, key=itemgetter("grade"), reverse=True)

# ─── Closure late binding gotcha ───
# Bad: all lambdas capture i by reference
fns_bad = [lambda x: x * i for i in range(3)]
print([f(2) for f in fns_bad])   # [4, 4, 4] — all use i=2

# Fix: capture by value using default arg
fns_good = [lambda x, i=i: x * i for i in range(3)]
print([f(2) for f in fns_good])  # [0, 2, 4]

# ─── Partial application ───
from functools import partial

def log(level, message):
    print(f"[{level}] {message}")

info = partial(log, "INFO")
error = partial(log, "ERROR")

info("Server started")   # [INFO] Server started
error("Disk full")       # [ERROR] Disk full`,
    resources: ['Python docs: functools', 'Real Python: Functional Programming'],
  },

  // ─── CONCURRENCY ───
  {
    id: 'gil',
    title: 'The GIL (Global Interpreter Lock)',
    category: 'concurrency',
    level: 'advanced',
    estimatedHours: 3,
    description: 'Understand Python GIL: what it is, why it exists, and how to work around it.',
    keyPoints: [
      'GIL prevents true thread parallelism for CPU-bound work in CPython',
      'Threads are still useful for I/O-bound tasks — GIL is released during I/O',
      'GIL is released during I/O, time.sleep, and many C extension calls',
      'CPython-specific — Jython, PyPy-STM do not have it',
      'GIL-free Python 3.13+ (PEP 703 — nogil build) available experimentally',
      'Work around GIL: multiprocessing for CPU-bound, asyncio/threading for I/O-bound',
    ],
    codeExample: `import threading
import multiprocessing
import time

def cpu_task(n):
    """CPU-bound: count to n."""
    count = 0
    for _ in range(n):
        count += 1
    return count

# ─── Threading — does NOT speed up CPU-bound work ───
start = time.perf_counter()
t1 = threading.Thread(target=cpu_task, args=(10_000_000,))
t2 = threading.Thread(target=cpu_task, args=(10_000_000,))
t1.start(); t2.start()
t1.join(); t2.join()
print(f"Threading: {time.perf_counter() - start:.2f}s")
# ~same as or SLOWER than sequential — GIL limits threads

# ─── Multiprocessing — bypasses GIL ───
start = time.perf_counter()
p1 = multiprocessing.Process(target=cpu_task, args=(10_000_000,))
p2 = multiprocessing.Process(target=cpu_task, args=(10_000_000,))
p1.start(); p2.start()
p1.join(); p2.join()
print(f"Multiprocessing: {time.perf_counter() - start:.2f}s")
# ~2x faster — each process has its own GIL

# ─── GIL released for I/O — threading works fine here ───
import urllib.request

def fetch(url):
    urllib.request.urlopen(url).read()

urls = ["https://example.com"] * 10
threads = [threading.Thread(target=fetch, args=(url,)) for url in urls]
for t in threads: t.start()
for t in threads: t.join()
# Fast — GIL released while waiting for network I/O`,
    resources: ['PEP 703 (nogil)', 'Real Python: GIL', 'David Beazley: Understanding the GIL'],
  },
  {
    id: 'threading',
    title: 'Threading',
    category: 'concurrency',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'Thread-based concurrency for I/O-bound tasks using threading module.',
    keyPoints: [
      'Thread class: target, args, kwargs, daemon, start(), join()',
      'ThreadPoolExecutor (concurrent.futures) — easier thread pool management',
      'Thread safety — shared state needs synchronization',
      'Lock / RLock / Semaphore — synchronization primitives',
      'queue.Queue — thread-safe producer-consumer communication',
      'Daemon threads — die when main thread exits',
      'Common pitfalls: race conditions, deadlocks, thread-safety of built-ins',
    ],
    codeExample: `import threading
import concurrent.futures
import queue
import time

# ─── ThreadPoolExecutor — preferred for most cases ───
def fetch_url(url: str) -> str:
    import urllib.request
    with urllib.request.urlopen(url, timeout=5) as resp:
        return resp.read(100).decode()

urls = [
    "https://httpbin.org/get",
    "https://httpbin.org/ip",
    "https://httpbin.org/uuid",
]

with concurrent.futures.ThreadPoolExecutor(max_workers=5) as executor:
    futures = {executor.submit(fetch_url, url): url for url in urls}
    for future in concurrent.futures.as_completed(futures):
        url = futures[future]
        try:
            data = future.result()
            print(f"{url}: {len(data)} bytes")
        except Exception as e:
            print(f"{url} failed: {e}")

# ─── Lock for thread-safe counter ───
counter = 0
lock = threading.Lock()

def increment(n: int):
    global counter
    for _ in range(n):
        with lock:       # acquire and release automatically
            counter += 1

threads = [threading.Thread(target=increment, args=(1000,)) for _ in range(10)]
for t in threads: t.start()
for t in threads: t.join()
print(counter)  # always 10000

# ─── Producer-Consumer with Queue ───
q: queue.Queue = queue.Queue(maxsize=10)

def producer():
    for i in range(20):
        q.put(i)
        time.sleep(0.01)
    q.put(None)  # sentinel

def consumer():
    while True:
        item = q.get()
        if item is None:
            break
        print(f"Processing {item}")
        q.task_done()`,
    resources: ['Python docs: threading', 'Python docs: concurrent.futures', 'Real Python: Threading'],
  },
  {
    id: 'multiprocessing',
    title: 'Multiprocessing',
    category: 'concurrency',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'True parallelism for CPU-bound tasks using multiprocessing module.',
    keyPoints: [
      'Process vs Pool — single process vs managed pool of workers',
      'ProcessPoolExecutor — high-level interface from concurrent.futures',
      'Shared memory: Manager / Value / Array for inter-process data',
      'Queue / Pipe for inter-process communication (IPC)',
      'Pool.map vs Pool.starmap — map with multiple args',
      'When to use multiprocessing vs async — CPU-bound vs I/O-bound',
      'Pickling requirements — all objects passed between processes must be picklable',
    ],
    codeExample: `import multiprocessing
import concurrent.futures
import time

# ─── ProcessPoolExecutor (recommended) ───
def is_prime(n: int) -> bool:
    if n < 2:
        return False
    for i in range(2, int(n**0.5) + 1):
        if n % i == 0:
            return False
    return True

numbers = list(range(10_000, 11_000))

# Sequential
start = time.perf_counter()
primes_seq = [n for n in numbers if is_prime(n)]
print(f"Sequential: {time.perf_counter() - start:.3f}s")

# Parallel with ProcessPoolExecutor
start = time.perf_counter()
with concurrent.futures.ProcessPoolExecutor() as executor:
    results = list(executor.map(is_prime, numbers))
primes_par = [n for n, p in zip(numbers, results) if p]
print(f"Parallel: {time.perf_counter() - start:.3f}s")

# ─── Pool.starmap for multiple args ───
def power(base, exp):
    return base ** exp

with multiprocessing.Pool() as pool:
    results = pool.starmap(power, [(2, 10), (3, 5), (4, 4)])
print(results)  # [1024, 243, 256]

# ─── Shared memory ───
def worker(shared_val, lock):
    for _ in range(1000):
        with lock:
            shared_val.value += 1

if __name__ == "__main__":
    val = multiprocessing.Value('i', 0)
    lock = multiprocessing.Lock()
    procs = [multiprocessing.Process(target=worker, args=(val, lock)) for _ in range(4)]
    for p in procs: p.start()
    for p in procs: p.join()
    print(val.value)  # 4000`,
    resources: ['Python docs: multiprocessing', 'Real Python: Multiprocessing', 'Python docs: concurrent.futures'],
  },
  {
    id: 'asyncio',
    title: 'asyncio & async/await',
    category: 'concurrency',
    level: 'intermediate',
    estimatedHours: 6,
    description: 'Asynchronous I/O with Python asyncio for high-throughput concurrent code.',
    keyPoints: [
      'Event loop — single-threaded scheduler that runs coroutines',
      'async def / await — define and call coroutines',
      'asyncio.gather() — run multiple coroutines concurrently',
      'asyncio.Queue — async-safe producer-consumer queue',
      'Task vs coroutine — Task wraps a coroutine for concurrent scheduling',
      'asyncio.timeout — cancel coroutines that take too long',
      'aiohttp for async HTTP; asyncio.run() as entry point',
      'run_in_executor — run blocking code without blocking the loop',
    ],
    codeExample: `import asyncio
import aiohttp
import time

# ─── Basic async/await ───
async def greet(name: str, delay: float):
    await asyncio.sleep(delay)  # non-blocking sleep
    print(f"Hello, {name}!")
    return f"done:{name}"

async def main():
    # Run concurrently — total ~1s not 3s
    results = await asyncio.gather(
        greet("Alice", 1.0),
        greet("Bob", 0.5),
        greet("Charlie", 0.8),
    )
    print(results)

asyncio.run(main())

# ─── Async HTTP with aiohttp ───
async def fetch(session: aiohttp.ClientSession, url: str) -> dict:
    async with session.get(url) as resp:
        return await resp.json()

async def fetch_all(urls: list[str]) -> list[dict]:
    async with aiohttp.ClientSession() as session:
        tasks = [fetch(session, url) for url in urls]
        return await asyncio.gather(*tasks, return_exceptions=True)

# ─── asyncio.Queue for producer-consumer ───
async def producer(q: asyncio.Queue):
    for i in range(10):
        await q.put(i)
        await asyncio.sleep(0.1)
    await q.put(None)  # sentinel

async def consumer(q: asyncio.Queue):
    while True:
        item = await q.get()
        if item is None:
            break
        print(f"Consumed: {item}")

async def pipeline():
    q = asyncio.Queue(maxsize=5)
    await asyncio.gather(producer(q), consumer(q))

# ─── run_in_executor — blocking code in async context ───
async def read_file_async(path: str) -> str:
    loop = asyncio.get_event_loop()
    # Runs open/read in a thread pool so event loop isn't blocked
    return await loop.run_in_executor(None, Path(path).read_text)`,
    resources: ['Python docs: asyncio', 'aiohttp docs', 'Real Python: asyncio'],
  },

  // ─── STATIC TYPING ───
  {
    id: 'type-hints',
    title: 'Type Hints & typing Module',
    category: 'static-typing',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'Add type annotations to Python code for better tooling and documentation.',
    keyPoints: [
      'Basic annotations: int, str, list, dict, tuple, bool, None',
      'Optional[X] (or X | None) — value may be None',
      'Union[X, Y] (or X | Y in Python 3.10+) — one of several types',
      'List/Dict/Tuple/Set from typing (legacy) vs built-in list/dict in 3.9+',
      'TypeVar and Generic — parameterized generic types',
      'Callable[[arg_types], return_type] — function type hints',
      'Literal, TypedDict, Protocol, TYPE_CHECKING guard',
    ],
    codeExample: `from __future__ import annotations  # postponed evaluation, allows forward refs
from typing import TypeVar, Generic, Protocol, Callable, TYPE_CHECKING

if TYPE_CHECKING:
    from mymodule import HeavyClass  # only imported for type checkers

# ─── Basic annotations ───
def greet(name: str, times: int = 1) -> str:
    return (f"Hello, {name}! " * times).strip()

# ─── Optional / Union (Python 3.10+ syntax) ───
def find_user(user_id: int) -> dict | None:
    ...

def process(value: int | str | float) -> str:
    return str(value)

# ─── TypedDict ───
from typing import TypedDict

class UserDict(TypedDict):
    name: str
    age: int
    email: str

def create_user(data: UserDict) -> UserDict:
    return data

# ─── Protocol (structural subtyping) ───
class Drawable(Protocol):
    def draw(self) -> None: ...

def render(shape: Drawable) -> None:
    shape.draw()  # works for any class with .draw(), no inheritance needed

# ─── Generic class ───
T = TypeVar("T")

class Stack(Generic[T]):
    def __init__(self) -> None:
        self._items: list[T] = []

    def push(self, item: T) -> None:
        self._items.append(item)

    def pop(self) -> T:
        return self._items.pop()

stack: Stack[int] = Stack()
stack.push(42)

# ─── Callable ───
from typing import Callable

def apply_twice(func: Callable[[int], int], value: int) -> int:
    return func(func(value))

# ─── Literal ───
from typing import Literal

def set_direction(direction: Literal["left", "right", "up", "down"]) -> None:
    ...`,
    resources: ['Python docs: typing', 'mypy docs', 'PEP 604 (X | Y syntax)'],
  },
  {
    id: 'mypy',
    title: 'mypy Static Type Checker',
    category: 'static-typing',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Run mypy to catch type errors before runtime.',
    keyPoints: [
      'mypy --strict — enable all optional checks for maximum safety',
      '# type: ignore — suppress specific mypy errors inline',
      'mypy.ini / pyproject.toml — project-level configuration',
      'Stub files (.pyi) — type info for untyped third-party packages',
      'Gradual typing — annotate incrementally, not all at once',
      'Common errors: incompatible types, missing return, None safety',
      'CI integration — fail build on mypy errors',
    ],
    codeExample: `# mypy.ini (or [tool.mypy] in pyproject.toml)
# [mypy]
# python_version = 3.11
# strict = true
# ignore_missing_imports = true

# ─── Annotated code that mypy validates ───
from typing import Sequence

def total(values: Sequence[float]) -> float:
    return sum(values)

result: float = total([1.0, 2.5, 3.0])  # OK
bad: float = total(["a", "b"])           # mypy error: str is not float

# ─── Optional safety ───
def get_name(user_id: int) -> str | None:
    ...

name = get_name(1)
# print(name.upper())    # mypy error: Item "None" of "str | None" has no attribute "upper"
if name is not None:
    print(name.upper())  # OK — narrowed to str

# ─── type: ignore ───
import third_party_lib  # type: ignore[import-untyped]

# ─── Revealing types during development ───
x = [1, 2, 3]
reveal_type(x)  # Revealed type is "builtins.list[builtins.int]"

# ─── pyproject.toml config ───
# [tool.mypy]
# python_version = "3.11"
# strict = true
# files = ["src/"]
# ignore_missing_imports = true
#
# [[tool.mypy.overrides]]
# module = "tests.*"
# disallow_untyped_defs = false`,
    resources: ['mypy docs', 'mypy: Getting Started', 'Real Python: mypy'],
  },
  {
    id: 'pydantic',
    title: 'Pydantic v2',
    category: 'static-typing',
    level: 'intermediate',
    estimatedHours: 5,
    description: 'Data validation and settings management using Python type annotations.',
    keyPoints: [
      'BaseModel — define data schemas with Python type hints',
      '@field_validator — validate and transform individual fields',
      '@model_validator — cross-field validation after model construction',
      'Field() — add metadata: default, alias, description, constraints',
      'model_dump() / model_json() — serialize model to dict/JSON',
      'Nested models and discriminated unions',
      'BaseSettings — load config from environment variables',
      'Pydantic v1 vs v2 — breaking changes (validators, Config class)',
    ],
    codeExample: `from pydantic import BaseModel, Field, field_validator, model_validator, EmailStr
from pydantic_settings import BaseSettings
from typing import Annotated
from datetime import datetime

# ─── Basic model ───
class Address(BaseModel):
    street: str
    city: str
    country: str = "India"

class User(BaseModel):
    id: int
    name: Annotated[str, Field(min_length=2, max_length=100)]
    email: EmailStr
    age: Annotated[int, Field(ge=0, le=150)]
    address: Address                          # nested model
    tags: list[str] = Field(default_factory=list)
    created_at: datetime = Field(default_factory=datetime.utcnow)

    @field_validator("name")
    @classmethod
    def name_must_be_title_case(cls, v: str) -> str:
        return v.title()

    @model_validator(mode="after")
    def check_adult_email(self) -> "User":
        if self.age < 18 and "example.com" not in self.email:
            raise ValueError("Under-18 users must use example.com email")
        return self

# Usage
user = User(
    id=1, name="hari prasad", email="hari@example.com", age=25,
    address={"street": "123 Main St", "city": "Mumbai"}
)
print(user.name)             # "Hari Prasad" (title-cased by validator)
print(user.model_dump())     # dict
print(user.model_dump_json()) # JSON string

# ─── BaseSettings for config ───
class AppSettings(BaseSettings):
    database_url: str
    secret_key: str
    debug: bool = False
    max_connections: int = 10

    model_config = {"env_file": ".env", "env_prefix": "APP_"}

settings = AppSettings()  # reads APP_DATABASE_URL, APP_SECRET_KEY from env`,
    resources: ['Pydantic v2 docs', 'pydantic-settings docs', 'Real Python: Pydantic'],
  },

  // ─── CODE QUALITY ───
  {
    id: 'ruff-black',
    title: 'Code Formatting (ruff / black)',
    category: 'code-quality',
    level: 'beginner',
    estimatedHours: 2,
    description: 'Auto-format Python code for consistency with ruff and black.',
    keyPoints: [
      'black — opinionated, zero-config formatter; minimal style decisions',
      'ruff — linter + formatter in one tool (Rust-based, very fast)',
      'ruff replaces flake8, isort, pylint, pyupgrade and more',
      'Line length convention: 88 (black default) or 100+',
      'pre-commit hooks — auto-format on every git commit',
      'pyproject.toml — configure ruff rules and black options',
      'ruff --fix — auto-fix fixable lint violations',
    ],
    codeExample: `# ─── pyproject.toml configuration ───

[tool.black]
line-length = 88
target-version = ["py311"]

[tool.ruff]
line-length = 88
target-version = "py311"

[tool.ruff.lint]
select = [
    "E",   # pycodestyle errors
    "W",   # pycodestyle warnings
    "F",   # pyflakes
    "I",   # isort
    "B",   # flake8-bugbear
    "C4",  # flake8-comprehensions
    "UP",  # pyupgrade
]
ignore = ["E501"]  # line too long (handled by formatter)

[tool.ruff.lint.isort]
known-first-party = ["myapp"]

# ─── .pre-commit-config.yaml ───
# repos:
#   - repo: https://github.com/astral-sh/ruff-pre-commit
#     rev: v0.1.9
#     hooks:
#       - id: ruff
#         args: [--fix]
#       - id: ruff-format
#   - repo: https://github.com/psf/black
#     rev: 23.12.0
#     hooks:
#       - id: black

# ─── CLI usage ───
# ruff check .          # lint
# ruff check --fix .    # lint + auto-fix
# ruff format .         # format (like black)
# black .               # format with black`,
    resources: ['ruff docs', 'black docs', 'pre-commit docs'],
  },
  {
    id: 'documentation',
    title: 'Documentation (Docstrings & Sphinx)',
    category: 'code-quality',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Write docstrings and generate API documentation with Sphinx.',
    keyPoints: [
      'Google style vs NumPy style vs reStructuredText docstrings',
      'pydoc — built-in Python documentation tool',
      'Sphinx setup: sphinx-quickstart, conf.py, index.rst',
      'autodoc extension — generate docs from docstrings',
      'sphinx-apidoc — auto-generate .rst files from Python modules',
      'Read the Docs — free hosting for Sphinx docs',
      'mkdocs + mkdocstrings as a simpler alternative to Sphinx',
    ],
    codeExample: `# ─── Google-style docstring ───
def calculate_discount(price: float, discount_pct: float) -> float:
    """Calculate the discounted price.

    Applies a percentage discount to the given price and returns
    the final price after discount.

    Args:
        price: Original price in USD. Must be non-negative.
        discount_pct: Discount percentage (0-100). E.g. 20 for 20% off.

    Returns:
        Final price after applying the discount.

    Raises:
        ValueError: If price is negative or discount_pct is outside [0, 100].

    Example:
        >>> calculate_discount(100.0, 20)
        80.0
        >>> calculate_discount(50.0, 0)
        50.0
    """
    if price < 0:
        raise ValueError(f"price must be non-negative, got {price}")
    if not 0 <= discount_pct <= 100:
        raise ValueError(f"discount_pct must be in [0, 100], got {discount_pct}")
    return price * (1 - discount_pct / 100)

# ─── NumPy style (common in scientific Python) ───
def dot_product(a, b):
    """
    Compute the dot product of two vectors.

    Parameters
    ----------
    a : list of float
        First vector.
    b : list of float
        Second vector, must have the same length as a.

    Returns
    -------
    float
        The dot product of a and b.
    """
    return sum(x * y for x, y in zip(a, b))

# ─── Sphinx conf.py snippet ───
# extensions = [
#     "sphinx.ext.autodoc",
#     "sphinx.ext.napoleon",   # Google/NumPy style support
#     "sphinx.ext.viewcode",
# ]`,
    resources: ['Sphinx docs', 'Google Python Style Guide', 'mkdocs docs'],
  },

  // ─── PYTHON TESTING ───
  {
    id: 'pytest',
    title: 'pytest',
    category: 'python-testing',
    level: 'intermediate',
    estimatedHours: 5,
    description: 'Modern Python testing with pytest — fixtures, parametrize, plugins.',
    keyPoints: [
      'Test discovery: test_*.py files, test_* functions, Test* classes',
      'Fixtures: @pytest.fixture — setup/teardown with dependency injection',
      'conftest.py — shared fixtures available across test files',
      '@pytest.mark.parametrize — run same test with multiple inputs',
      'monkeypatch — replace objects/env vars in tests',
      'tmp_path / capsys — built-in fixtures for temp files and stdout capture',
      'pytest-cov — measure code coverage',
      'pytest.ini / pyproject.toml — configure markers, paths, options',
    ],
    codeExample: `# conftest.py
import pytest
from myapp.db import create_engine, get_session
from myapp.models import Base

@pytest.fixture(scope="session")
def engine():
    eng = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(eng)
    yield eng
    eng.dispose()

@pytest.fixture
def db_session(engine):
    """Each test gets a fresh session, rolled back after."""
    with get_session(engine) as session:
        yield session
        session.rollback()

# test_user.py
import pytest
from myapp.services import UserService
from myapp.models import User

class TestUserService:
    def test_create_user(self, db_session):
        svc = UserService(db_session)
        user = svc.create(name="Hari", email="hari@example.com")
        assert user.id is not None
        assert user.name == "Hari"

    @pytest.mark.parametrize("email,valid", [
        ("valid@example.com", True),
        ("not-an-email", False),
        ("@nodomain.com", False),
        ("user@domain.co.uk", True),
    ])
    def test_email_validation(self, email: str, valid: bool):
        if valid:
            user = User(name="Test", email=email)
            assert user.email == email
        else:
            with pytest.raises(ValueError, match="Invalid email"):
                User(name="Test", email=email)

    def test_env_var(self, monkeypatch):
        monkeypatch.setenv("APP_DEBUG", "true")
        from myapp.config import settings
        assert settings.debug is True

# pytest.ini or pyproject.toml
# [tool.pytest.ini_options]
# testpaths = ["tests"]
# addopts = "--cov=myapp --cov-report=term-missing -v"
# markers = ["slow: marks tests as slow", "integration: integration tests"]`,
    resources: ['pytest docs', 'pytest-cov docs', 'Real Python: pytest'],
  },
  {
    id: 'unittest-mock',
    title: 'unittest & Mock',
    category: 'python-testing',
    level: 'intermediate',
    estimatedHours: 4,
    description: 'Standard library testing with unittest and mocking with unittest.mock.',
    keyPoints: [
      'TestCase class — setUp/tearDown for per-test setup',
      'assert methods: assertEqual, assertTrue, assertRaises, assertIn',
      '@patch decorator — replace real objects with mocks during a test',
      'MagicMock — auto-speccing mock object with magic method support',
      'side_effect — raise an exception or return different values on each call',
      'return_value — control what a mock returns',
      'assert_called_with / assert_called_once_with — verify call args',
      'spec parameter — constrain mock to real object interface',
    ],
    codeExample: `import unittest
from unittest.mock import patch, MagicMock, call

# src/notifier.py (under test)
# class EmailNotifier:
#     def send(self, to: str, subject: str, body: str) -> bool:
#         import smtplib
#         # ... real SMTP sending ...

# src/order_service.py
# class OrderService:
#     def __init__(self, notifier):
#         self.notifier = notifier
#     def place_order(self, order):
#         # ... process ...
#         self.notifier.send(order["email"], "Order placed", f"Order {order['id']} confirmed")
#         return order

from myapp.order_service import OrderService

class TestOrderService(unittest.TestCase):
    def setUp(self):
        self.mock_notifier = MagicMock()
        self.service = OrderService(notifier=self.mock_notifier)

    def test_place_order_sends_notification(self):
        order = {"id": "ORD-001", "email": "user@example.com", "total": 99.99}
        result = self.service.place_order(order)

        self.mock_notifier.send.assert_called_once_with(
            "user@example.com",
            "Order placed",
            "Order ORD-001 confirmed"
        )
        self.assertEqual(result["id"], "ORD-001")

    @patch("myapp.order_service.external_payment_api")
    def test_payment_failure_raises(self, mock_api):
        mock_api.charge.side_effect = ConnectionError("Payment gateway down")

        with self.assertRaises(ConnectionError):
            self.service.place_order({"id": "ORD-002", "email": "x@y.com"})

    def test_multiple_calls_tracked(self):
        orders = [{"id": f"ORD-00{i}", "email": "a@b.com"} for i in range(3)]
        for o in orders:
            self.service.place_order(o)

        self.assertEqual(self.mock_notifier.send.call_count, 3)

if __name__ == "__main__":
    unittest.main()`,
    resources: ['Python docs: unittest', 'Python docs: unittest.mock', 'Real Python: Mocking'],
  },
  {
    id: 'tdd',
    title: 'TDD & Testing Best Practices',
    category: 'python-testing',
    level: 'intermediate',
    estimatedHours: 3,
    description: 'Test-Driven Development workflow and testing best practices in Python.',
    keyPoints: [
      'Red-Green-Refactor cycle — write failing test, make it pass, clean up',
      'Test pyramid: many unit tests, fewer integration, fewest E2E',
      'AAA pattern: Arrange (setup), Act (call), Assert (verify)',
      'Test isolation — each test must be independent, no shared state',
      'What to mock vs test real — mock I/O, test pure logic',
      'pytest-asyncio for testing async functions',
      'hypothesis for property-based testing — auto-generate edge cases',
      'Coverage targets — 80%+ for most projects; 100% for critical paths',
    ],
    codeExample: `# ─── TDD example: Implement a shopping cart ───
# STEP 1: Write the test first (RED)

import pytest
from decimal import Decimal

# This class doesn't exist yet!
from myapp.cart import ShoppingCart

class TestShoppingCart:
    # Arrange
    def setup_method(self):
        self.cart = ShoppingCart()

    # ─── Red: these tests fail until we implement ShoppingCart ───

    def test_empty_cart_has_zero_total(self):
        # Act + Assert
        assert self.cart.total() == Decimal("0")

    def test_add_item_increases_total(self):
        self.cart.add_item("apple", price=Decimal("1.50"), qty=3)
        assert self.cart.total() == Decimal("4.50")

    def test_remove_item(self):
        self.cart.add_item("banana", price=Decimal("0.75"), qty=4)
        self.cart.remove_item("banana")
        assert self.cart.total() == Decimal("0")

    def test_discount_applied(self):
        self.cart.add_item("widget", price=Decimal("100"), qty=1)
        self.cart.apply_discount(10)  # 10% off
        assert self.cart.total() == Decimal("90.00")

# STEP 2: Implement just enough to pass (GREEN)
# myapp/cart.py
from decimal import Decimal

class ShoppingCart:
    def __init__(self):
        self._items: dict = {}
        self._discount_pct: Decimal = Decimal("0")

    def add_item(self, name: str, price: Decimal, qty: int = 1):
        self._items[name] = {"price": price, "qty": qty}

    def remove_item(self, name: str):
        self._items.pop(name, None)

    def apply_discount(self, pct: float):
        self._discount_pct = Decimal(str(pct))

    def total(self) -> Decimal:
        subtotal = sum(v["price"] * v["qty"] for v in self._items.values())
        return subtotal * (1 - self._discount_pct / 100)

# STEP 3: Refactor — extract discount logic, add type hints, etc.

# ─── hypothesis (property-based testing) ───
from hypothesis import given, strategies as st

@given(st.integers(min_value=0, max_value=1000))
def test_cart_total_never_negative(qty):
    cart = ShoppingCart()
    cart.add_item("item", price=Decimal("9.99"), qty=qty)
    assert cart.total() >= Decimal("0")`,
    resources: ['pytest-asyncio docs', 'Hypothesis docs', 'Real Python: TDD'],
  },
];