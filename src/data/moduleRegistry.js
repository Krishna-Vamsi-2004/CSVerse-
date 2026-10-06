/**
 * MODULE_REGISTRY — single source of truth for all CSVerse AI modules.
 * Add future modules (DBMS, Networking, OS) by appending entries here.
 * The Sidebar, Progress Dashboard, and routing all derive from this registry.
 *
 * @typedef {{ id: string, label: string, icon: string }} TopicEntry
 * @typedef {{ id: string, label: string, phase: number, topics: TopicEntry[] }} ModuleRegistryEntry
 */

/** @type {ModuleRegistryEntry[]} */
export const MODULE_REGISTRY = [
  {
    id: 'dsa',
    label: 'Data Structures & Algorithms',
    phase: 1,
    groups: [
      {
        label: 'Data Structures',
        topics: [
          { id: 'arrays',        label: 'Arrays',               icon: '📦' },
          { id: 'strings',       label: 'Strings',              icon: '🔤' },
          { id: 'linkedlist',    label: 'Linked Lists',         icon: '🔗' },
          { id: 'stacks',        label: 'Stacks',               icon: '📚' },
          { id: 'queues',        label: 'Queues',               icon: '🚶' },
          { id: 'trees',         label: 'Binary Trees',         icon: '🌳' },
          { id: 'bst',           label: 'Binary Search Trees',  icon: '🔎' },
          { id: 'heaps',         label: 'Heaps',                icon: '🏔️' },
          { id: 'graphs',        label: 'Graphs',               icon: '🕸️' },
          { id: 'hashtables',    label: 'Hash Tables',          icon: '#️⃣' },
          { id: 'tries',         label: 'Tries',                icon: '🌿' },
        ],
      },
      {
        label: 'Algorithms',
        topics: [
          { id: 'bubblesort',    label: 'Bubble Sort',          icon: '🫧' },
          { id: 'selectionsort', label: 'Selection Sort',       icon: '🧹' },
          { id: 'insertionsort', label: 'Insertion Sort',       icon: '📌' },
          { id: 'mergesort',     label: 'Merge Sort',           icon: '🔀' },
          { id: 'quicksort',     label: 'Quick Sort',           icon: '⚡' },
          { id: 'heapsort',      label: 'Heap Sort',            icon: '🏗️' },
          { id: 'linearsearch',  label: 'Linear Search',        icon: '🔦' },
          { id: 'binarysearch',  label: 'Binary Search',        icon: '🎯' },
          { id: 'bfs',           label: 'Breadth-First Search', icon: '🌊' },
          { id: 'dfs',           label: 'Depth-First Search',   icon: '🕳️' },
          { id: 'dijkstra',      label: "Dijkstra's Algorithm", icon: '🗺️' },
          { id: 'bellmanford',   label: 'Bellman-Ford',         icon: '⚖️' },
          { id: 'prim',          label: "Prim's Algorithm",     icon: '🌐' },
          { id: 'kruskal',       label: "Kruskal's Algorithm",  icon: '🔩' },
        ],
      },
      {
        label: 'Algorithmic Techniques',
        topics: [
          { id: 'twopointers',     label: 'Two Pointers',         icon: '👆' },
          { id: 'slidingwindow',   label: 'Sliding Window',       icon: '🪟' },
          { id: 'recursion',       label: 'Recursion',            icon: '🔁' },
          { id: 'backtracking',    label: 'Backtracking',         icon: '↩️' },
          { id: 'greedy',          label: 'Greedy Method',        icon: '🤑' },
          { id: 'dp',              label: 'Dynamic Programming',  icon: '🧩' },
          { id: 'divideconquer',   label: 'Divide and Conquer',   icon: '✂️' },
          { id: 'bitmanipulation', label: 'Bit Manipulation',     icon: '⚙️' },
        ],
      },
    ],
    // flat topics list derived from groups — used by existing code that reads module.topics
    get topics() {
      return this.groups.flatMap(g => g.topics)
    },
  },
  {
    id: 'dbms',
    label: 'Database Management Systems',
    phase: 2,
    topics: [
      { id: 'sql-basics',    label: 'SQL Basics',          icon: '📁' },
      { id: 'joins',         label: 'JOIN Visualization',  icon: '📋' },
      { id: 'normalization', label: 'Normalization',        icon: '🗂️' },
      { id: 'transactions',  label: 'Transactions & ACID', icon: '🔐' },
      { id: 'indexing',      label: 'Indexing & B-Trees',  icon: '🌳' },
      { id: 'er-diagram',    label: 'ER Diagrams',         icon: '🔷' },
    ],
  },
  {
    id: 'networking',
    label: 'Computer Networks',
    phase: 3,
    groups: [
      {
        label: 'Fundamentals',
        topics: [
          { id: 'osi-model',    label: 'OSI Model',          icon: '🧱' },
          { id: 'tcp-ip',       label: 'TCP/IP Stack',        icon: '📡' },
          { id: 'dns',          label: 'DNS Resolution',      icon: '🌐' },
          { id: 'http',         label: 'HTTP & HTTPS',        icon: '🔗' },
          { id: 'ip-subnetting',label: 'IP & Subnetting',     icon: '🔢' },
        ],
      },
      {
        label: 'Protocols & Security',
        topics: [
          { id: 'tcp-handshake',label: 'TCP Handshake',       icon: '🤝' },
          { id: 'routing',      label: 'Routing Protocols',   icon: '🗺️' },
          { id: 'firewall',     label: 'Firewalls & NAT',     icon: '🛡️' },
          { id: 'ssl-tls',      label: 'SSL / TLS',           icon: '🔒' },
        ],
      },
    ],
    get topics() { return this.groups.flatMap(g => g.topics) },
  },
  {
    id: 'os',
    label: 'Operating Systems',
    phase: 4,
    groups: [
      {
        label: 'Core Concepts',
        topics: [
          { id: 'processes',    label: 'Processes & Threads', icon: '⚙️' },
          { id: 'scheduling',   label: 'CPU Scheduling',      icon: '📅' },
          { id: 'memory',       label: 'Memory Management',   icon: '🧠' },
          { id: 'virtual-mem',  label: 'Virtual Memory',      icon: '💾' },
          { id: 'file-system',  label: 'File Systems',        icon: '📂' },
        ],
      },
      {
        label: 'Synchronization',
        topics: [
          { id: 'deadlock',     label: 'Deadlocks',           icon: '🔴' },
          { id: 'semaphores',   label: 'Semaphores & Mutex',  icon: '🚦' },
          { id: 'ipc',          label: 'IPC Mechanisms',      icon: '📨' },
        ],
      },
    ],
    get topics() { return this.groups.flatMap(g => g.topics) },
  },
];

/**
 * Look up a module by ID.
 * @param {string} moduleId
 * @returns {ModuleRegistryEntry | undefined}
 */
export function getModuleById(moduleId) {
  return MODULE_REGISTRY.find((m) => m.id === moduleId);
}

/**
 * Look up a topic within a module by topic ID.
 * @param {string} moduleId
 * @param {string} topicId
 * @returns {TopicEntry | undefined}
 */
export function getTopicById(moduleId, topicId) {
  const mod = getModuleById(moduleId);
  return mod?.topics.find((t) => t.id === topicId);
}
