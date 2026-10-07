// src/utils/aiFallback.js
/**
 * Smart offline fallback for the AI assistant.
 * Analyses the actual question asked and returns a relevant, focused answer.
 * Used when Gemini API is unavailable or returns an error.
 */

// ─── Knowledge Base ──────────────────────────────────────────────────────────
// Each entry: { match: fn(query) => bool, answer: string }
// match runs in order; first match wins.

const KB = [

  // ── Greetings ────────────────────────────────────────────────────────────
  {
    match: q => /^(hi|hello|hey|howdy|sup|good (morning|evening|afternoon))\b/.test(q),
    answer: `Hello! 👋 I'm your **CSVerse AI Tutor**.

Ask me anything about the topic you're studying — algorithms, data structures, complexity, how something works, or differences between concepts. I'll give you a direct, focused answer.`,
  },
  {
    match: q => /how are you|how r u|you doing/.test(q),
    answer: `I'm ready to help! Ask me any Computer Science question — I'll answer it directly.`,
  },
  {
    match: q => /thank|thanks|thx|awesome|great job|well done/.test(q),
    answer: `You're welcome! Keep going — feel free to ask more questions anytime.`,
  },
  {
    match: q => /bye|goodbye|see ya/.test(q),
    answer: `Goodbye! Come back anytime to keep learning. 👋`,
  },
  {
    match: q => /who (are|built|made|created) you|your name|what are you/.test(q),
    answer: `I'm the **CSVerse AI Tutor** — a built-in assistant for the CSVerse AI learning platform. I'm here to answer your CS questions directly and help you understand algorithm visualizations.`,
  },

  // ── Arrays ──────────────────────────────────────────────────────────────
  {
    match: q => /what is an? array/.test(q),
    answer: `An **array** is a data structure that stores elements of the same type in **contiguous memory locations**.

**Key properties:**
- **Indexing:** O(1) — direct access via index using: \`address = base + index × size\`
- **Search:** O(n) unsorted, O(log n) sorted (binary search)
- **Insert/Delete at position:** O(n) — elements must shift
- **Space:** O(n)

Arrays are cache-friendly because elements are adjacent in memory. They're the foundation for most other data structures.`,
  },
  {
    match: q => /time complexity.*(array|arrays)|(array|arrays).*time complexity/.test(q),
    answer: `**Array Time Complexities:**

| Operation | Average | Worst |
|-----------|---------|-------|
| Access by index | O(1) | O(1) |
| Search (unsorted) | O(n) | O(n) |
| Search (sorted, binary) | O(log n) | O(log n) |
| Insert at end | O(1) | O(1) |
| Insert at position | O(n) | O(n) |
| Delete at end | O(1) | O(1) |
| Delete at position | O(n) | O(n) |`,
  },
  {
    match: q => /difference.*(array|linked list)|(array|linked list).*difference/.test(q),
    answer: `**Array vs Linked List:**

| Feature | Array | Linked List |
|---------|-------|-------------|
| Memory | Contiguous | Scattered (pointers) |
| Access | O(1) random | O(n) sequential |
| Insert/Delete at head | O(n) | O(1) |
| Insert/Delete at position | O(n) | O(n) to find + O(1) to link |
| Cache performance | ✅ Excellent | ❌ Poor |
| Size | Fixed (static) | Dynamic |
| Extra memory | None | Pointer per node |

**Use arrays** when you need fast random access.
**Use linked lists** when you need frequent insertions/deletions at the beginning.`,
  },

  // ── Linked List ──────────────────────────────────────────────────────────
  {
    match: q => /what is a? linked list/.test(q),
    answer: `A **linked list** is a linear data structure where elements (nodes) are stored at scattered memory locations. Each node contains:
- **data** — the value
- **next** — a pointer to the next node

**Types:**
- **Singly linked** — each node points to next only
- **Doubly linked** — each node has \`prev\` and \`next\` pointers
- **Circular** — last node points back to head

**Time complexities:**
- Access: O(n) | Insert at head: O(1) | Insert at tail: O(n) or O(1) with tail pointer | Delete: O(n) to find`,
  },
  {
    match: q => /how (to|do you) detect.*(cycle|loop)|cycle detection|floyd/.test(q),
    answer: `**Cycle Detection — Floyd's Algorithm (Tortoise & Hare):**

Use two pointers: \`slow\` moves 1 step, \`fast\` moves 2 steps. If they ever meet, a cycle exists.

\`\`\`js
function hasCycle(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}
\`\`\`

**Why it works:** In a cycle, the fast pointer laps the slow pointer — they must eventually point to the same node.
**Time:** O(n) | **Space:** O(1)`,
  },

  // ── Stacks ───────────────────────────────────────────────────────────────
  {
    match: q => /what is a? stack/.test(q),
    answer: `A **stack** is a linear data structure following **LIFO** (Last-In, First-Out).

**Operations — all O(1):**
- \`push(x)\` — add to top
- \`pop()\` — remove from top
- \`peek()\` — view top without removing

**Real-world uses:**
- Function call stack (recursion)
- Undo/Redo in editors
- Browser back button
- Balanced parentheses checking
- DFS traversal`,
  },
  {
    match: q => /what is a? queue/.test(q),
    answer: `A **queue** is a linear data structure following **FIFO** (First-In, First-Out).

**Operations — all O(1):**
- \`enqueue(x)\` — add to rear
- \`dequeue()\` — remove from front
- \`peek()\` — view front without removing

**Real-world uses:**
- CPU scheduling
- Print spooling
- BFS graph traversal
- Message queues`,
  },
  {
    match: q => /difference.*(stack|queue)|(stack|queue).*difference/.test(q),
    answer: `**Stack vs Queue:**

| Feature | Stack | Queue |
|---------|-------|-------|
| Principle | LIFO (Last In First Out) | FIFO (First In First Out) |
| Insert end | Top (push) | Rear (enqueue) |
| Remove end | Top (pop) | Front (dequeue) |
| Use case | DFS, recursion, undo | BFS, scheduling, printing |
| Complexity | O(1) push/pop | O(1) enqueue/dequeue |`,
  },

  // ── Sorting ──────────────────────────────────────────────────────────────
  {
    match: q => /how does bubble sort work|explain bubble sort/.test(q),
    answer: `**How Bubble Sort works:**

1. Start at the beginning of the array
2. Compare adjacent elements — if left > right, **swap** them
3. After each full pass, the **largest unsorted element bubbles to its correct position**
4. Repeat for n−1 passes (each pass sorts one more element)

**Example:** \`[5, 3, 8, 1]\`
- Pass 1: 3,5,8,1 → 3,5,1,8 ✅ 8 sorted
- Pass 2: 3,1,5,8 ✅ 5 sorted
- Pass 3: 1,3,5,8 ✅ done

**Time:** O(n²) worst/avg, O(n) best (sorted array with early-exit flag)
**Space:** O(1) — in-place
**Stable:** ✅ Yes`,
  },
  {
    match: q => /how does merge sort work|explain merge sort/.test(q),
    answer: `**How Merge Sort works (Divide & Conquer):**

1. **Divide:** Split array in half recursively until single elements remain
2. **Conquer:** Single elements are trivially sorted
3. **Combine:** Merge pairs of sorted halves — compare front elements, pick smaller, repeat

**Example:** \`[38, 27, 43, 3]\`
→ \`[38,27]\` + \`[43,3]\` → \`[27,38]\` + \`[3,43]\` → \`[3,27,38,43]\`

**Time:** O(n log n) — all cases (best, avg, worst)
**Space:** O(n) — needs auxiliary array
**Stable:** ✅ Yes`,
  },
  {
    match: q => /how does quick sort work|explain quick sort/.test(q),
    answer: `**How Quick Sort works:**

1. Pick a **pivot** element (commonly last element or median)
2. **Partition:** rearrange so all elements < pivot go left, all > pivot go right
3. Recursively apply to left and right sub-arrays

**Time:** O(n log n) average, **O(n²) worst** (sorted array with bad pivot)
**Space:** O(log n) call stack
**Stable:** ❌ No (standard implementation)

Quick Sort is typically faster than Merge Sort in practice due to better cache performance.`,
  },
  {
    match: q => /how does (insertion|selection) sort work|explain (insertion|selection) sort/.test(q),
    answer: q => {
      const isInsertion = /insertion/.test(q)
      if (isInsertion) return `**How Insertion Sort works:**

Builds the sorted array one element at a time. For each element, find its correct position in the sorted portion and shift others right to make room.

\`[5, 2, 4, 1]\` → \`[2, 5, 4, 1]\` → \`[2, 4, 5, 1]\` → \`[1, 2, 4, 5]\`

**Time:** O(n) best (already sorted), O(n²) worst/avg
**Space:** O(1) in-place | **Stable:** ✅ Yes
**Best for:** Small arrays or nearly sorted data.`
      return `**How Selection Sort works:**

Find the minimum element in the unsorted portion, swap it with the first unsorted element.

\`[64, 25, 12, 22]\` → swap 64↔12 → \`[12, 25, 64, 22]\` → swap 25↔22 → \`[12, 22, 64, 25]\` → ...

**Time:** O(n²) — all cases (always scans entire unsorted portion)
**Space:** O(1) in-place | **Stable:** ❌ No`
    },
  },
  {
    match: q => /sorting.*comparison|compare.*sorting algorithms|which sort is best/.test(q),
    answer: `**Sorting Algorithms Comparison:**

| Algorithm | Best | Average | Worst | Space | Stable |
|-----------|------|---------|-------|-------|--------|
| Bubble Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Selection Sort | O(n²) | O(n²) | O(n²) | O(1) | ❌ |
| Insertion Sort | O(n) | O(n²) | O(n²) | O(1) | ✅ |
| Merge Sort | O(n log n) | O(n log n) | O(n log n) | O(n) | ✅ |
| Quick Sort | O(n log n) | O(n log n) | O(n²) | O(log n) | ❌ |
| Heap Sort | O(n log n) | O(n log n) | O(n log n) | O(1) | ❌ |

**Rule of thumb:**
- Small arrays (< 20): Insertion Sort
- General purpose: Quick Sort (fastest in practice)
- Guaranteed O(n log n): Merge Sort
- Memory-constrained + O(n log n): Heap Sort`,
  },

  // ── Binary Search ────────────────────────────────────────────────────────
  {
    match: q => /how does binary search work|explain binary search/.test(q),
    answer: `**How Binary Search works:**

Requires a **sorted** array. Repeatedly halves the search space:

1. Set \`left = 0\`, \`right = n-1\`
2. Compute \`mid = floor((left + right) / 2)\`
3. If \`arr[mid] === target\` → found!
4. If \`arr[mid] < target\` → search right half: \`left = mid + 1\`
5. If \`arr[mid] > target\` → search left half: \`right = mid - 1\`
6. Repeat until \`left > right\`

**Time:** O(log n) — each step eliminates half the elements
**Space:** O(1) iterative, O(log n) recursive
**Prerequisite:** Array must be sorted`,
  },

  // ── Trees ────────────────────────────────────────────────────────────────
  {
    match: q => /what is a? (binary )?tree|explain.*tree/.test(q),
    answer: `A **binary tree** is a hierarchical data structure where each node has at most **two children** (left and right).

**Key terms:**
- **Root** — top node
- **Leaf** — node with no children
- **Height** — longest path from root to leaf
- **BST (Binary Search Tree)** — left < node < right, enabling O(log n) search

**Traversals:**
- **In-order** (L → Node → R): gives sorted order for BST
- **Pre-order** (Node → L → R): used to copy trees
- **Post-order** (L → R → Node): used to delete trees
- **Level-order (BFS)**: level by level using a queue`,
  },
  {
    match: q => /difference.*(bfs|dfs)|(bfs|dfs).*difference/.test(q),
    answer: `**BFS vs DFS:**

| Feature | BFS | DFS |
|---------|-----|-----|
| Structure | Queue | Stack / Recursion |
| Traversal | Level by level | Deep first, then backtrack |
| Space | O(w) — max width | O(h) — max height |
| Shortest path | ✅ In unweighted graphs | ❌ |
| Cycle detection | ✅ | ✅ |
| Use case | Shortest path, level order | Topological sort, maze solving |

**BFS** explores all neighbours before going deeper.
**DFS** goes as deep as possible, then backtracks.`,
  },

  // ── Complexity ──────────────────────────────────────────────────────────
  {
    match: q => /what is big.?o|explain big.?o|time complexity|space complexity/.test(q),
    answer: `**Big-O Notation** measures how an algorithm's time or space scales with input size n.

**Common complexities (fastest → slowest):**
- **O(1)** — Constant: array index access, hash lookup
- **O(log n)** — Logarithmic: binary search, BST operations
- **O(n)** — Linear: linear search, array traversal
- **O(n log n)** — Linearithmic: merge sort, quick sort (avg)
- **O(n²)** — Quadratic: bubble/selection/insertion sort
- **O(2ⁿ)** — Exponential: recursive fibonacci (no memo)
- **O(n!)** — Factorial: permutation generation

Big-O describes the **worst case** unless stated otherwise.`,
  },

  // ── Dynamic Programming ─────────────────────────────────────────────────
  {
    match: q => /what is dynamic programming|explain dp|how does dp work/.test(q),
    answer: `**Dynamic Programming (DP)** solves complex problems by breaking them into overlapping subproblems and storing results to avoid recomputation.

**Two approaches:**
- **Top-down (Memoization):** Recursive + cache results
- **Bottom-up (Tabulation):** Iterative, fill table from base cases up

**When to use DP:**
1. Problem has **overlapping subproblems** (same subproblem solved repeatedly)
2. Problem has **optimal substructure** (optimal solution built from optimal sub-solutions)

**Classic examples:** Fibonacci, Longest Common Subsequence, 0/1 Knapsack, Coin Change, Edit Distance`,
  },

  // ── Graphs ───────────────────────────────────────────────────────────────
  {
    match: q => /what is a? graph/.test(q),
    answer: `A **graph** is a non-linear data structure consisting of **vertices (nodes)** and **edges (connections)**.

**Types:**
- **Directed** — edges have direction (A → B)
- **Undirected** — edges are bidirectional
- **Weighted** — edges have costs/distances
- **Cyclic / Acyclic** (DAG = Directed Acyclic Graph)

**Representations:**
- **Adjacency Matrix:** O(V²) space, O(1) edge lookup
- **Adjacency List:** O(V+E) space, better for sparse graphs

**Key algorithms:** BFS, DFS, Dijkstra, Bellman-Ford, Prim, Kruskal`,
  },
  {
    match: q => /how does dijkstra|explain dijkstra/.test(q),
    answer: `**Dijkstra's Algorithm** finds the shortest path from a source vertex to all other vertices in a **weighted graph** (non-negative weights only).

**Steps:**
1. Set distance to source = 0, all others = ∞
2. Use a **min-priority queue** — always process the unvisited vertex with smallest distance
3. For each neighbour of current vertex: if \`dist[current] + edge_weight < dist[neighbour]\`, update it
4. Repeat until all vertices processed

**Time:** O((V + E) log V) with min-heap
**Limitation:** Fails with negative edge weights (use Bellman-Ford instead)`,
  },

  // ── DBMS ────────────────────────────────────────────────────────────────
  {
    match: q => /what is a? join|explain.*join|how.*join work/.test(q),
    answer: `**SQL JOINs** combine rows from two tables based on a related column.

- **INNER JOIN** — rows with matches in BOTH tables
- **LEFT JOIN** — ALL rows from left + matched from right (NULL if no match)
- **RIGHT JOIN** — ALL rows from right + matched from left
- **FULL OUTER JOIN** — ALL rows from both, NULL where no match
- **CROSS JOIN** — Cartesian product (every combination)

\`\`\`sql
SELECT e.name, d.dept_name
FROM employees e
INNER JOIN departments d ON e.dept_id = d.id;
\`\`\``,
  },
  {
    match: q => /what is acid|explain acid|acid properties/.test(q),
    answer: `**ACID Properties** guarantee reliable database transactions:

- **Atomicity** — All operations succeed, or ALL are rolled back ("all or nothing")
- **Consistency** — Database moves from one valid state to another valid state
- **Isolation** — Concurrent transactions don't interfere with each other
- **Durability** — Once committed, changes persist even after system crashes (written to disk)

These properties prevent data corruption in systems like banking, e-commerce, and healthcare.`,
  },
  {
    match: q => /what is normalization|explain normalization/.test(q),
    answer: `**Database Normalization** organises a database to reduce redundancy and prevent anomalies.

- **1NF:** Each column has atomic (indivisible) values; no repeating groups
- **2NF:** 1NF + no partial dependency (every non-key attribute depends on the WHOLE primary key)
- **3NF:** 2NF + no transitive dependency (non-key attributes don't depend on other non-key attributes)
- **BCNF:** 3NF + every determinant is a candidate key

**Higher NF = less redundancy, but more JOINs needed for queries.**`,
  },

  // ── OS ──────────────────────────────────────────────────────────────────
  {
    match: q => /what is a? deadlock|explain deadlock/.test(q),
    answer: `A **deadlock** occurs when two or more processes are blocked forever, each waiting for a resource held by the other.

**4 necessary conditions (all must hold):**
1. **Mutual Exclusion** — resources are non-shareable
2. **Hold and Wait** — process holds a resource while waiting for another
3. **No Preemption** — resources can't be forcibly taken
4. **Circular Wait** — P1 waits for P2, P2 waits for P1

**Prevention:** Break any one condition.
**Avoidance:** Banker's Algorithm — only grant requests that keep the system in a "safe state".
**Detection + Recovery:** Allow deadlocks, detect cycles, then kill/rollback processes.`,
  },
  {
    match: q => /cpu scheduling|round robin|fcfs|sjf|explain scheduling/.test(q),
    answer: `**CPU Scheduling Algorithms:**

- **FCFS (First Come First Served):** Non-preemptive, simple but can cause convoy effect (short jobs wait behind long ones)
- **SJF (Shortest Job First):** Minimises average waiting time; requires knowing burst time in advance
- **Round Robin:** Preemptive, each process gets a fixed **time quantum**; best for time-sharing systems
- **Priority Scheduling:** Higher priority processes run first; can cause starvation of low-priority processes
- **SRTF (Shortest Remaining Time First):** Preemptive SJF; best average waiting time theoretically

**Key metrics:** Waiting time, Turnaround time, Response time, CPU utilisation`,
  },

  // ── Networking ──────────────────────────────────────────────────────────
  {
    match: q => /osi model|explain osi|7 layers/.test(q),
    answer: `**OSI 7-Layer Model** (top to bottom):

7. **Application** — End-user protocols: HTTP, FTP, DNS, SMTP
6. **Presentation** — Encryption, compression, encoding (SSL/TLS)
5. **Session** — Establishes/maintains/terminates sessions
4. **Transport** — End-to-end delivery, flow control: TCP, UDP
3. **Network** — Routing and logical addressing: IP, ICMP
2. **Data Link** — Node-to-node framing, MAC addresses: Ethernet, Wi-Fi
1. **Physical** — Raw bits over physical media: cables, radio signals

**Memory aid:** "All People Seem To Need Data Processing" (Application → Physical)`,
  },
  {
    match: q => /tcp.*handshake|3.way handshake|three.way handshake/.test(q),
    answer: `**TCP 3-Way Handshake** establishes a reliable connection:

1. **SYN** — Client sends: "I want to connect, my sequence number is X"
2. **SYN-ACK** — Server replies: "Acknowledged X, my sequence number is Y"
3. **ACK** — Client confirms: "Acknowledged Y" → connection established!

**4-Way Termination:**
FIN → ACK → FIN → ACK

TCP is reliable (retransmits lost packets), ordered, and connection-oriented.
UDP is unreliable, unordered, connectionless — but faster.`,
  },

  // ── Two Pointers / Sliding Window ───────────────────────────────────────
  {
    match: q => /two pointer|explain two pointer/.test(q),
    answer: `**Two Pointers Technique** uses two indices to solve array/string problems efficiently.

**Patterns:**
- **Opposite ends:** start left=0, right=n-1, move inward (e.g., two-sum in sorted array)
- **Same direction:** both move forward at different speeds (e.g., remove duplicates)
- **Fast & Slow:** detect cycles in linked lists (Floyd's algorithm)

\`\`\`js
// Two sum in sorted array
function twoSum(arr, target) {
  let l = 0, r = arr.length - 1;
  while (l < r) {
    const sum = arr[l] + arr[r];
    if (sum === target) return [l, r];
    sum < target ? l++ : r--;
  }
}
\`\`\`

**Time:** O(n) vs O(n²) brute force`,
  },
  {
    match: q => /sliding window|explain sliding window/.test(q),
    answer: `**Sliding Window Technique** maintains a window over a sequence and slides it to avoid recomputation.

**Fixed-size window** (find max sum of k elements):
\`\`\`js
function maxSum(arr, k) {
  let sum = arr.slice(0, k).reduce((a, b) => a + b);
  let max = sum;
  for (let i = k; i < arr.length; i++) {
    sum += arr[i] - arr[i - k];  // slide: add new, remove old
    max = Math.max(max, sum);
  }
  return max;
}
\`\`\`

**Variable-size window:** expand right pointer, shrink left pointer when condition violated.

**Time:** O(n) vs O(n²) naive | Used for: max/min subarray, longest substring, anagram detection`,
  },

  // ── Recursion / Backtracking ─────────────────────────────────────────────
  {
    match: q => /what is recursion|how does recursion work|explain recursion/.test(q),
    answer: `**Recursion** is when a function calls itself with a smaller/simpler version of the problem.

**Two essential parts:**
1. **Base case** — the stopping condition (prevents infinite recursion)
2. **Recursive case** — the function calls itself with a reduced problem

\`\`\`js
function factorial(n) {
  if (n <= 1) return 1;          // base case
  return n * factorial(n - 1);   // recursive case
}
\`\`\`

**Call stack usage:** Each call adds a frame; O(n) space.
**When to use:** Tree traversal, divide & conquer, backtracking, mathematical definitions.`,
  },
  {
    match: q => /what is backtracking|explain backtracking/.test(q),
    answer: `**Backtracking** explores all possible solutions by building incrementally and abandoning ("backtracking") when a path can't lead to a valid solution.

**Pattern:**
\`\`\`
function solve(state):
  if isGoal(state): record solution; return
  for each choice in choices(state):
    if isValid(choice):
      makeChoice(choice)
      solve(state)        ← recurse
      undoChoice(choice)  ← backtrack
\`\`\`

**Classic problems:** N-Queens, Sudoku, Maze solving, Subset/Permutation generation
**Time:** Exponential in worst case, but pruning makes it practical`,
  },
]

// ─── Main export ─────────────────────────────────────────────────────────────

export function getFallbackAnswer(query = '', topicId = '') {
  const q = query.toLowerCase().trim()

  if (!q) {
    return `Hello! 👋 I'm your **CSVerse AI Tutor**. Ask me anything about the topic you're studying and I'll give you a direct, focused answer.`
  }

  for (const entry of KB) {
    if (entry.match(q)) {
      // Some answers are functions (they need the query to personalise)
      return typeof entry.answer === 'function' ? entry.answer(q) : entry.answer
    }
  }

  // Topic-aware fallback: give a specific starter answer about the current topic
  const topicNames = {
    arrays: 'Arrays', linkedlist: 'Linked Lists', stacks: 'Stacks', queues: 'Queues',
    trees: 'Binary Trees', bst: 'Binary Search Trees', heaps: 'Heaps', graphs: 'Graphs',
    hashtables: 'Hash Tables', bubblesort: 'Bubble Sort', selectionsort: 'Selection Sort',
    insertionsort: 'Insertion Sort', mergesort: 'Merge Sort', quicksort: 'Quick Sort',
    heapsort: 'Heap Sort', linearsearch: 'Linear Search', binarysearch: 'Binary Search',
    bfs: 'BFS', dfs: 'DFS', dijkstra: "Dijkstra's Algorithm", dp: 'Dynamic Programming',
    recursion: 'Recursion', backtracking: 'Backtracking', twopointers: 'Two Pointers',
    slidingwindow: 'Sliding Window', greedy: 'Greedy Algorithms',
  }

  const topicLabel = topicNames[topicId] || topicId || 'this topic'

  return `I couldn't find a cached answer for **"${query}"** in the offline knowledge base.

For a precise answer about **${topicLabel}**, try rephrasing your question — for example:
- *"What is ${topicLabel}?"*
- *"How does ${topicLabel} work?"*
- *"What is the time complexity of ${topicLabel}?"*

If the AI service is available, your question will be answered by Gemini AI with full context.`
}
