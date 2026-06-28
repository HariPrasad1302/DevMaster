# DevMaster — Full Project Documentation

> Complete developer mastery platform: Python → Django → FastAPI → DSA → System Design → HLD/LLD → Crack Any MNC interview.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Tech Stack](#tech-stack)
3. [Project Structure](#project-structure)
4. [Features — Section by Section](#features--section-by-section)
5. [Data Architecture](#data-architecture)
6. [Component Architecture](#component-architecture)
7. [Design System](#design-system)
8. [AI Integration (Code Runner)](#ai-integration-code-runner)
9. [Routing & Navigation](#routing--navigation)
10. [Future Development Guide](#future-development-guide)
11. [How to Run](#how-to-run)

---

## Project Overview

DevMaster is a self-contained Next.js 15 learning platform built for developers who know Python and want to go deep — covering the full journey from Python internals, Django and FastAPI, to cracking DSA interviews at companies like Google, Amazon, Microsoft, TCS, and ZOHO.

Everything is **data-driven** — content lives in TypeScript data files (`/data`), and pages consume it. Adding new problems, topics, or scenarios means editing one data file, not touching UI code.

**Core philosophy:**
- No backend needed — fully client-side, ships as static files
- Content-first: structured TypeScript types enforce consistency
- AI-powered code evaluation via Anthropic API (no Judge0 or sandboxing needed)
- Dark-themed, professional UI built with CSS custom properties (no heavy UI library)

---

## Tech Stack

| Layer | Technology | Version | Purpose |
|---|---|---|---|
| Framework | Next.js (App Router) | 16.2.9 | Routing, SSG, layout system |
| Language | TypeScript | ^5 | Type-safe data schemas and components |
| Styling | Tailwind CSS | ^4 | Utility classes (minimal usage — mostly CSS vars) |
| Code Editor | @monaco-editor/react | ^4.7.0 | VS Code-grade editor inside browser |
| Animation | framer-motion | ^12 | Installed, available for future use |
| Icons | lucide-react | ^1.21.0 | Installed, available for future use |
| AI Evaluation | Anthropic API (`/v1/messages`) | claude-sonnet-4-6 | Code runner output simulation |
| React | React 19 | 19.2.4 | UI runtime |

**No database. No backend. No auth.** Pure static + client-side AI calls.

---

## Project Structure

```
devmaster/
│
├── app/                          # Next.js App Router — all pages live here
│   ├── layout.tsx                # Root layout: wraps all pages with Sidebar + main
│   ├── globals.css               # Full design system: CSS variables, utility classes
│   ├── page.tsx                  # / — Dashboard / Home with section cards
│   │
│   ├── python/
│   │   └── page.tsx              # /python — Python Roadmap (expandable topic cards)
│   │
│   ├── dsa/
│   │   ├── page.tsx              # /dsa — DSA problem listing with filter/search
│   │   └── [id]/
│   │       └── page.tsx          # /dsa/[id] — Individual problem: Problem | Approach | Code
│   │
│   ├── system-design/
│   │   └── page.tsx              # /system-design — HLD scenarios (sidebar + content panel)
│   │
│   ├── hld-lld/
│   │   └── page.tsx              # /hld-lld — LLD problems: Parking Lot, Elevator, etc.
│   │
│   ├── uml/
│   │   └── page.tsx              # /uml — UML diagram guides (Class, Sequence, State)
│   │
│   └── scenarios/
│       └── page.tsx              # /scenarios — Interview scenario walkthroughs
│
├── components/                   # Shared React components
│   ├── Sidebar.tsx               # Left nav — all route links, active state, branding
│   └── CodeRunner.tsx            # Monaco editor + AI code evaluation + test case display
│
├── data/                         # ALL content lives here — the "database" of the app
│   ├── dsa.ts                    # DSA problems, topics, difficulties, solutions, test cases
│   ├── roadmap.ts                # Python/Django/FastAPI learning roadmap topics
│   └── systemdesign.ts           # System design scenarios, HLD, LLD, UML guides
│
├── lib/                          # Utilities (empty — reserved for future helpers)
│
├── public/                       # Static assets (default Next.js SVGs)
│
├── next.config.ts                # Next.js config (default)
├── tsconfig.json                 # TypeScript config (strict mode)
├── postcss.config.mjs            # PostCSS for Tailwind
├── package.json                  # Dependencies and scripts
└── DEVMASTER.md                  # This file
```

**Total source lines:** ~3,300 across 15 files (excluding node_modules, .next)

---

## Features — Section by Section

### 1. Dashboard (`/`)

The landing page. Shows all 6 sections as clickable cards with icon, description, and stat line. Also shows the recommended learning order and target company badges (TCS, ZOHO, Amazon, Google, etc.).

**Key UI elements:**
- Section grid with `auto-fill, minmax(320px, 1fr)` — responsive without breakpoints
- Inline `color` from each section config drives the card accent
- Learning order banner at the bottom

---

### 2. Python Roadmap (`/python`)

A filterable, expandable topic explorer covering the full Python → Django → FastAPI stack.

**How it works:**
- 8 categories: Python Core, Python Advanced, OOP & Design, Django, FastAPI, Databases, Testing, DevOps
- 15+ topics, each with: level (beginner/intermediate/advanced), estimated hours, key concepts list, and a code example
- Click a category button to filter; click a topic row to expand inline
- Expanded panel shows a 2-column layout: Key Concepts (bullet list) + Code Example (syntax-highlighted `<pre>`)

**Data source:** `data/roadmap.ts` — `RoadmapTopic[]` and `RoadmapCategory[]`

**Topics currently covered:**
- Python Core: Data Types, Control Flow, Functions & Scope
- Python Advanced: Decorators & Context Managers, Generators & Iterators
- OOP: OOP Fundamentals, SOLID Principles
- Django: Project Setup, Models & ORM, Django REST Framework
- FastAPI: Fundamentals, Advanced Patterns (background tasks, WebSocket, lifespan)

---

### 3. DSA Problems (`/dsa` and `/dsa/[id]`)

Two-page flow: a filterable list view, then a full problem detail page.

#### List view (`/dsa`)
- Filter by topic (12 topics: Arrays, HashMaps, Two Pointers, Sliding Window, Stack/Queue, Linked Lists, Binary Search, Trees, Graphs, Heap, DP, Recursion)
- Filter by difficulty (Easy / Medium / Hard)
- Each row: problem number, title, pattern badge, company tags (up to 3), topic name, difficulty badge
- Clicking a row navigates to the detail page

#### Detail view (`/dsa/[id]`)
Three-tab interface:

**Tab 1 — Problem**
- Full problem statement
- Example inputs/outputs with explanation
- Clean formatted example cards with color-coded input/output

**Tab 2 — Approach**
- Time and Space complexity pills
- Detailed written explanation of the algorithm pattern
- Step-by-step reasoning, not just the solution

**Tab 3 — Code**
- Monaco editor pre-loaded with starter code (function signature + one test)
- "Solution" tab in editor shows the full working solution
- Test case chips showing input → expected output
- AI-powered Run button (see [AI Integration](#ai-integration-code-runner))

**Problems currently included (11):**

| Problem | Topic | Difficulty | Pattern |
|---|---|---|---|
| Two Sum | Arrays | Easy | HashMap Lookup |
| Best Time to Buy/Sell Stock | Arrays | Easy | Greedy / Single Pass |
| Maximum Subarray | Arrays | Medium | Kadane's Algorithm |
| Longest Substring No Repeat | Sliding Window | Medium | Sliding Window + HashMap |
| Container With Most Water | Two Pointers | Medium | Two Pointers (Greedy) |
| Max Depth of Binary Tree | Trees | Easy | Tree DFS (Recursion) |
| Level Order Traversal | Trees | Medium | BFS with Queue |
| Number of Islands | Graphs | Medium | DFS / BFS on Grid |
| Climbing Stairs | DP | Easy | Fibonacci / DP |
| Longest Common Subsequence | DP | Medium | 2D Dynamic Programming |
| Kth Largest Element | Heap | Medium | Min-Heap of size K |
| Subsets (Power Set) | Recursion | Medium | Backtracking |

**Data source:** `data/dsa.ts` — `Problem[]` and `Topic[]`

---

### 4. System Design (`/system-design`)

Two-panel layout: scenario list on the left, full content on the right. Four tabs per scenario.

**Tabs per scenario:**
- **Requirements** — Functional requirements (checklist) + Non-functional requirements + Scale estimations (DAU, RPS, storage)
- **Components** — Cards per system component with description and tech stack badges
- **Approach** — Full written deep-dive: how to think through the problem, algorithms, tradeoffs
- **Architecture** — ASCII architecture diagram (monospace rendered)

**Scenarios currently included:**

| Scenario | Difficulty | Key Topics |
|---|---|---|
| Recommendation System (Netflix/Amazon) | Hard | ML Pipeline, Two-Tower Model, Candidate Gen + Ranking, Cold Start |
| URL Shortener (bit.ly) | Medium | Hashing, Base62, KGS, Caching, 301 vs 302 |
| Real-Time Chat System (WhatsApp) | Hard | WebSocket, Message Queue, Fanout, Delivery Receipts |

**Data source:** `data/systemdesign.ts` — `SystemDesignScenario[]`

---

### 5. HLD / LLD (`/hld-lld`)

Same two-panel layout as System Design, filtered to `category: 'lld'` entries. Focused on object-oriented design problems.

**Tabs:** Requirements | Design (full class breakdown + patterns used) | Class Diagram (ASCII)

**LLD problems currently included:**

| Problem | Difficulty | Patterns |
|---|---|---|
| Parking Lot System | Medium | Strategy, Singleton, Factory, Observer |
| Elevator System | Hard | State Machine, SCAN Algorithm, Cost Function Dispatch |

Each problem covers:
- Full class breakdown with attributes and methods
- Which design patterns apply and why
- Scheduling algorithm explanation (where applicable)
- ASCII class diagram
- Key design decisions (interview discussion points)

---

### 6. UML Diagrams (`/uml`)

Two-panel layout for UML guides. Each guide is a long-form reference with notation examples, relationship explanations, and real diagrams drawn in ASCII/monospace.

**Guides currently included:**

| Guide | What it covers |
|---|---|
| Class Diagrams | Class box structure, all 6 relationship types, multiplicity notation, full e-commerce example |
| Sequence Diagrams | Lifelines, sync vs async arrows, alt/opt/loop frames, login flow example, when to use in interviews |

---

### 7. Scenarios (`/scenarios`)

Same as System Design but filtered to `category: 'scenario'` — framed as interview questions ("Design a recommendation system. What would you do?"). Same four-tab layout.

Currently includes: Recommendation System (shown as an interview-style scenario with the full decision framework).

---

## Data Architecture

All content is typed TypeScript — no JSON, no CMS, no database. Adding content = adding an object to an array.

### `data/dsa.ts`

```typescript
interface Problem {
  id: string;                    // URL slug: 'two-sum'
  title: string;
  topic: string;                 // must match a Topic.id
  difficulty: 'easy' | 'medium' | 'hard';
  companies: string[];           // shown as tags
  pattern: string;               // e.g. 'HashMap Lookup'
  description: string;           // full problem text (markdown-ish)
  examples: {
    input: string;
    output: string;
    explanation?: string;
  }[];
  approach: string;              // full algorithm explanation
  timeComplexity: string;        // e.g. 'O(n)'
  spaceComplexity: string;
  solution: string;              // complete working Python solution
  starterCode: string;           // skeleton for the editor
  testCases: {
    input: string;
    expected: string;
  }[];
}

interface Topic {
  id: string;                    // e.g. 'arrays', 'dp', 'graphs'
  name: string;
  icon: string;                  // unicode symbol
  description: string;
  order: number;                 // display order
}
```

### `data/roadmap.ts`

```typescript
interface RoadmapTopic {
  id: string;
  title: string;
  category: string;              // must match a RoadmapCategory.id
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  description: string;           // one-line summary shown collapsed
  keyPoints: string[];           // bullet list shown when expanded
  codeExample?: string;          // shown in right column when expanded
  resources: string[];           // external links (displayed, not linked currently)
}

interface RoadmapCategory {
  id: string;
  name: string;
  icon: string;
  color: string;                 // hex — used for button bg and card accent
  description: string;
  order: number;
}
```

### `data/systemdesign.ts`

```typescript
interface SystemDesignScenario {
  id: string;
  title: string;
  category: 'hld' | 'lld' | 'uml' | 'scenario';  // drives which page renders it
  difficulty: 'medium' | 'hard';
  companies: string[];
  tags: string[];
  problem: string;               // the interview question, verbatim
  requirements: {
    functional: string[];
    nonFunctional: string[];
  };
  estimations?: { label: string; value: string }[];
  hldComponents?: {
    name: string;
    description: string;
    tech: string;                // slash-separated: 'Kafka / Flink'
  }[];
  approach: string;              // long-form deep-dive text
  keyDecisions: string[];        // interview talking points
  diagram?: string;              // ASCII architecture diagram
  deepDive?: string;             // reserved for future expansion
}
```

---

## Component Architecture

### `components/Sidebar.tsx`

- Reads `usePathname()` to set active state
- `navItems` array drives all links — add a new route here to add it to nav
- Fixed left panel, `position: sticky; top: 0; height: 100vh`
- Branding logo with accent color split

### `components/CodeRunner.tsx`

The most complex component. Handles:

1. **Two-tab editor** — "Your Code" (editable) and "Solution" (read-only)
2. **Monaco editor** — loaded dynamically (`next/dynamic` with `ssr: false`) to avoid SSR issues
3. **Reset button** — restores `initialCode` prop
4. **Test cases strip** — shows input → expected pairs below the editor
5. **AI evaluation** — `POST /v1/messages` to Anthropic API with a Python evaluator system prompt
6. **Output panel** — appears after run, shows simulated output + 1-2 line analysis

**Monaco config used:**
```typescript
{
  minimap: { enabled: false },
  fontSize: 13,
  lineHeight: 1.7,
  padding: { top: 12, bottom: 12 },
  scrollBeyondLastLine: false,
  fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
  fontLigatures: true,
  readOnly: activeTab === 'solution',
  wordWrap: 'on',
}
```

---

## Design System

All design tokens live in `app/globals.css` as CSS custom properties. No Tailwind config needed — classes are hand-written utility classes.

### Color Tokens

```css
--bg-primary: #0d0d0f;       /* page background */
--bg-secondary: #141418;     /* sidebar, expanded panels */
--bg-card: #1a1a20;          /* card background */
--bg-hover: #22222a;         /* hover states, chips */
--accent-primary: #7c6af7;   /* purple — primary actions, active nav */
--accent-secondary: #5eead4; /* teal — code, tech badges */
--accent-warning: #f59e0b;   /* amber — medium difficulty, NFRs */
--accent-success: #10b981;   /* green — easy difficulty, functional reqs */
--accent-danger: #ef4444;    /* red — hard difficulty */
--text-primary: #f0f0f5;     /* headings, values */
--text-secondary: #9090a8;   /* body text, descriptions */
--text-muted: #5a5a70;       /* labels, metadata */
--border: #2a2a35;           /* default borders */
--border-accent: #3a3a50;    /* hover borders */
```

### Reusable CSS Classes

| Class | Purpose |
|---|---|
| `.card` | Base card: bg, border, radius, hover lift effect |
| `.card-active` | Card with active/selected state (purple border + tint) |
| `.badge` | Base badge: pill shape, small text |
| `.badge-easy` | Green difficulty badge |
| `.badge-medium` | Amber difficulty badge |
| `.badge-hard` | Red difficulty badge |
| `.badge-concept` | Purple concept/pattern badge |
| `.badge-design` | Teal tech/design badge |
| `.btn-primary` | Filled purple button |
| `.btn-ghost` | Bordered ghost button |
| `.sidebar-item` | Nav link with hover and active states |
| `.animate-in` | Fade-up entrance animation (0.3s) |
| `.prose-content` | Typographic styles for h2, h3, p, ul, code inside rich text |

### Typography

- **Display/headings:** System sans-serif stack (`Inter` preferred), weights 700–900
- **Body:** same stack, weight 400–500
- **Code:** `'JetBrains Mono', 'Fira Code', 'Cascadia Code', monospace`
- Font is loaded from system — no Google Fonts dependency

---

## AI Integration (Code Runner)

The `CodeRunner` component calls the Anthropic API directly from the browser.

### Request format

```typescript
POST https://api.anthropic.com/v1/messages

{
  model: "claude-sonnet-4-6",
  max_tokens: 1000,
  system: `You are a Python code evaluator. Simulate running the code and show output.
           If errors, show Python traceback. Also give 1-2 line analysis.
           Format: --- Output --- / [output] / --- Analysis --- / [analysis]`,
  messages: [
    { role: "user", content: "Run this Python code:\n\n```python\n{userCode}\n```" }
  ]
}
```

### Response handling

```typescript
const data = await response.json();
const text = data.content?.[0]?.text || 'No response';
setOutput(text);
```

### What the AI does
- Simulates Python execution (no sandboxing needed)
- Shows what `print()` statements would output
- Shows tracebacks for syntax/runtime errors
- Gives a brief correctness analysis
- Works for all problems currently in the platform

### API key handling
The API key is not stored in the frontend code. In the Claude.ai artifact context it is injected automatically. For local development, you need to either:
- Add a `/api/run` Next.js API route that holds the key server-side (recommended)
- Or set it via an environment variable exposed to the client (less secure)

See [Future Development Guide](#future-development-guide) for the recommended API route approach.

---

## Routing & Navigation

All routes use Next.js App Router with file-system routing.

| Route | File | Type | Description |
|---|---|---|---|
| `/` | `app/page.tsx` | Static | Dashboard |
| `/python` | `app/python/page.tsx` | Static | Roadmap |
| `/dsa` | `app/dsa/page.tsx` | Static | Problem list |
| `/dsa/[id]` | `app/dsa/[id]/page.tsx` | Dynamic | Problem detail |
| `/system-design` | `app/system-design/page.tsx` | Static | HLD scenarios |
| `/hld-lld` | `app/hld-lld/page.tsx` | Static | LLD problems |
| `/uml` | `app/uml/page.tsx` | Static | UML guides |
| `/scenarios` | `app/scenarios/page.tsx` | Static | Interview scenarios |

The `[id]` dynamic segment for `/dsa/[id]` reads from `problems` array in `data/dsa.ts`. The `id` field on each `Problem` object becomes the URL segment.

Navigation is fully client-side. The `Sidebar` component uses `usePathname()` from `next/navigation` to highlight the active route.

---

## Future Development Guide

Everything below is designed to be extended. Here's how to add to each section without breaking existing code.

---

### Adding a new DSA problem

Open `data/dsa.ts`, push a new object to the `problems` array:

```typescript
{
  id: 'unique-kebab-slug',         // becomes /dsa/unique-kebab-slug
  title: 'Problem Title',
  topic: 'graphs',                 // must match an existing Topic.id
  difficulty: 'medium',
  companies: ['Google', 'Amazon'],
  pattern: 'Union Find',
  description: `Problem statement text here...`,
  examples: [
    { input: 'n = 5, edges = [[0,1],[1,2]]', output: '2', explanation: 'Why...' }
  ],
  approach: `**Pattern: ...**\n\nExplanation...`,
  timeComplexity: 'O(n α(n))',
  spaceComplexity: 'O(n)',
  solution: `def solve(...):\n    pass`,
  starterCode: `def solve(...):\n    # Your code\n    pass`,
  testCases: [
    { input: 'n=5', expected: '2' }
  ],
}
```

That's it. The problem appears in the list, gets its own URL, and the code runner works automatically.

---

### Adding a new DSA topic

Add to the `dsaTopics` array in `data/dsa.ts`:

```typescript
{
  id: 'trie',
  name: 'Trie (Prefix Tree)',
  icon: '⟳',
  description: 'Efficient prefix search, autocomplete, word validation',
  order: 13,
}
```

Then tag problems with `topic: 'trie'`. The filter button appears automatically.

---

### Adding a Python roadmap topic

Open `data/roadmap.ts`, add to `roadmapTopics`:

```typescript
{
  id: 'py-async',
  title: 'Async / Await & asyncio',
  category: 'python-advanced',      // must match a RoadmapCategory.id
  level: 'advanced',
  estimatedHours: 6,
  description: 'Concurrency without threads using Python event loop',
  keyPoints: [
    'Event loop — single-threaded, non-blocking I/O',
    'async def and await — coroutine functions',
    'asyncio.gather() for concurrent coroutines',
    'asyncio.Queue for producer-consumer patterns',
    'aiohttp for async HTTP requests',
  ],
  codeExample: `import asyncio\n\nasync def fetch(url):\n    await asyncio.sleep(1)  # simulate I/O\n    return f"data from {url}"\n\nasync def main():\n    results = await asyncio.gather(\n        fetch("api1"), fetch("api2"), fetch("api3")\n    )\n    print(results)  # all 3 complete in ~1s, not 3s\n\nasyncio.run(main())`,
  resources: ['Python docs: asyncio', 'Real Python: Async IO'],
}
```

---

### Adding a new roadmap category

Add to `roadmapCategories` in `data/roadmap.ts`:

```typescript
{
  id: 'security',
  name: 'Security',
  icon: '🔐',
  color: '#dc2626',
  description: 'Auth, JWT, OAuth, API security',
  order: 9,
}
```

Then tag roadmap topics with `category: 'security'`.

---

### Adding a system design scenario

Add to `systemDesignScenarios` in `data/systemdesign.ts`. Set `category` to control which page renders it:

| `category` | Page |
|---|---|
| `'hld'` | `/system-design` |
| `'lld'` | `/hld-lld` |
| `'uml'` | `/uml` |
| `'scenario'` | `/scenarios` |

```typescript
{
  id: 'rate-limiter',
  title: 'Design a Rate Limiter',
  category: 'hld',
  difficulty: 'medium',
  companies: ['Google', 'Amazon', 'Cloudflare'],
  tags: ['Redis', 'Sliding Window', 'Token Bucket'],
  problem: `Design a rate limiter that restricts users to N requests per time window...`,
  requirements: {
    functional: ['Limit requests per user/IP', 'Support sliding window algorithm', ...],
    nonFunctional: ['< 1ms overhead per request', '99.99% availability', ...],
  },
  estimations: [
    { label: 'Requests/sec', value: '1M RPS' },
  ],
  hldComponents: [
    { name: 'Redis Counter', description: 'Atomic INCR + EXPIRE per key', tech: 'Redis' },
  ],
  approach: `## Token Bucket vs Sliding Window Log vs Sliding Window Counter...`,
  keyDecisions: ['Token bucket vs sliding window', 'Distributed rate limiting with Redis cluster'],
  diagram: `[ASCII diagram here]`,
}
```

---

### Adding a secure API route for the code runner

Currently the Anthropic API is called directly from the browser (works in Claude.ai artifact context). For production deployment, add a server-side API route:

**Create `app/api/run/route.ts`:**

```typescript
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const { code } = await req.json();

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': process.env.ANTHROPIC_API_KEY!,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 1000,
      system: `You are a Python code evaluator...`,
      messages: [{ role: 'user', content: `Run this:\n\`\`\`python\n${code}\n\`\`\`` }],
    }),
  });

  const data = await response.json();
  return NextResponse.json({ output: data.content?.[0]?.text || '' });
}
```

**Update `CodeRunner.tsx` to hit your route instead:**

```typescript
const response = await fetch('/api/run', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ code }),
});
const data = await response.json();
setOutput(data.output);
```

**Add to `.env.local`:**
```
ANTHROPIC_API_KEY=sk-ant-...
```

---

### Planned features / extension ideas

These are natural next steps based on the current architecture:

**Content:**
- [ ] Add 40+ more DSA problems (Binary Search section is empty, Linked Lists, Stack/Queue)
- [ ] Add Trie, Segment Tree, Monotonic Stack topics
- [ ] Add more LLD problems: Library Management System, ATM, Food Delivery, Chess
- [ ] Add more system design: Twitter Feed, Google Drive, Notification Service, Search Autocomplete
- [ ] Add sequence diagram examples for each system design scenario
- [ ] Add database design section (schema normalization, indexing, sharding)

**Features:**
- [ ] Progress tracking — mark problems as solved (localStorage)
- [ ] Problem bookmarks — save favorites
- [ ] Search across all content (problems, topics, scenarios)
- [ ] AI "hint" button — ask Claude for a nudge without revealing full solution
- [ ] AI "explain this solution" button on the solution tab
- [ ] Difficulty progression tracker — show % solved per topic
- [ ] Interview mode — timed problem solving with countdown

**Tech improvements:**
- [ ] Move API call to `/api/run` server-side route (hide API key)
- [ ] Add real Python execution via Pyodide (run Python in browser WASM)
- [ ] MDX for rich content rendering (replace plain `<pre>` blocks)
- [ ] Add syntax highlighting to `<pre>` blocks using Shiki or Prism
- [ ] Add Mermaid.js for auto-rendered UML diagrams
- [ ] Dark/light mode toggle
- [ ] Mobile responsive sidebar (hamburger menu)

**Deployment:**
- [ ] Deploy to Vercel (zero config — push to GitHub, connect to Vercel)
- [ ] Add `sitemap.xml` for SEO (each problem is a crawlable page)
- [ ] Add OG image generation for problem pages

---

## How to Run

### Local development

```bash
# Clone or extract the project
cd devmaster

# Install dependencies (~30 seconds)
npm install

# Start development server
npm run dev

# Open in browser
open http://localhost:3000
```

### Production build

```bash
npm run build    # Type-check + optimize
npm run start    # Serve production build locally
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel           # Follow prompts — deploys in ~60 seconds
```

Set `ANTHROPIC_API_KEY` in Vercel environment variables (project settings → environment variables) after setting up the `/api/run` route.

### Environment variables

| Variable | Required | Description |
|---|---|---|
| `ANTHROPIC_API_KEY` | Only for production | API key for code runner (after adding server-side route) |

Currently the app works without any env vars in the Claude.ai context where the API key is injected automatically.

---

## Build Output

```
Route (app)
├ ○ /                    Static  — Dashboard
├ ○ /python              Static  — Python Roadmap
├ ○ /dsa                 Static  — DSA Problem List
├ ƒ /dsa/[id]            Dynamic — Problem Detail (per problem ID)
├ ○ /system-design       Static  — HLD Scenarios
├ ○ /hld-lld             Static  — LLD Problems
├ ○ /uml                 Static  — UML Guides
└ ○ /scenarios           Static  — Interview Scenarios

○ Static = prerendered at build time
ƒ Dynamic = server-rendered on demand (only /dsa/[id])
```

Build time: ~9 seconds. Zero errors, zero warnings.

---

*DevMaster — built to take you from knowing Python to cracking MNC interviews.*
