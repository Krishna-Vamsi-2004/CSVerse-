/**
 * Code snippets for each DSA topic with highlight logic.
 * getHighlightLines(frame) → number[] of 0-based line indices to highlight
 */

const SNIPPETS = {
  // ── EXISTING (untouched) ────────────────────────────────────────────────────
  bubblesort: {
    lines: [
      'function bubbleSort(arr) {',
      '  for (let pass = 0; pass < arr.length - 1; pass++) {',
      '    let swapped = false;',
      '    for (let j = 0; j < arr.length - 1 - pass; j++) {',
      '      if (arr[j] > arr[j + 1]) {',
      '        [arr[j], arr[j+1]] = [arr[j+1], arr[j]];',
      '        swapped = true;',
      '      }',
      '    }',
      '    if (!swapped) break;',
      '  }',
      '  return arr;',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      const states = frame?.elements?.map(e => e.state) ?? []
      if (states.includes('swapping'))  return [4, 5, 6]
      if (states.includes('comparing')) return [3, 4]
      if (d.toLowerCase().includes('sorted') || d.toLowerCase().includes('complete')) return [9, 11]
      return [1, 2]
    },
  },
  selectionsort: {
    lines: [
      'function selectionSort(arr) {',
      '  for (let i = 0; i < arr.length - 1; i++) {',
      '    let minIdx = i;',
      '    for (let j = i + 1; j < arr.length; j++) {',
      '      if (arr[j] < arr[minIdx]) {',
      '        minIdx = j;',
      '      }',
      '    }',
      '    if (minIdx !== i) {',
      '      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];',
      '    }',
      '  }',
      '  return arr;',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Swapping'))      return [8, 9]
      if (d.includes('minimum found')) return [4, 5]
      if (d.includes('Comparing'))     return [3, 4]
      if (d.includes('Assume'))        return [2]
      if (d.includes('complete'))      return [12]
      return [1]
    },
  },
  quicksort: {
    lines: [
      'function quickSort(arr, low, high) {',
      '  if (low < high) {',
      '    const pi = partition(arr, low, high);',
      '    quickSort(arr, low, pi - 1);',
      '    quickSort(arr, pi + 1, high);',
      '  }',
      '}',
      'function partition(arr, low, high) {',
      '  const pivot = arr[high];',
      '  let i = low - 1;',
      '  for (let j = low; j < high; j++) {',
      '    if (arr[j] < pivot) {',
      '      i++;',
      '      [arr[i], arr[j]] = [arr[j], arr[i]];',
      '    }',
      '  }',
      '  [arr[i+1], arr[high]] = [arr[high], arr[i+1]];',
      '  return i + 1;',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('pivot') && d.includes('position')) return [16, 17]
      if (d.includes('swapping') || d.includes('swapped')) return [11, 12, 13]
      if (d.includes('Comparing')) return [10, 11]
      if (d.includes('pivot'))     return [8]
      if (d.includes('Sub-array')) return [0, 1, 2]
      if (d.includes('complete'))  return [0]
      return [1]
    },
  },
  binarysearch: {
    lines: [
      'function binarySearch(arr, target) {',
      '  let low = 0, high = arr.length - 1;',
      '  while (low <= high) {',
      '    const mid = Math.floor((low + high) / 2);',
      '    if (arr[mid] === target) return mid;',
      '    else if (arr[mid] < target) low = mid + 1;',
      '    else high = mid - 1;',
      '  }',
      '  return -1;',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Found'))      return [4]
      if (d.includes('Right half')) return [5]
      if (d.includes('Left half'))  return [6]
      if (d.includes('Mid'))        return [3, 4]
      return [2]
    },
  },
  arrays: {
    lines: [
      '// Array — random access O(1)',
      'const arr = [10, 20, 30, 40, 50];',
      '',
      'const val = arr[index];       // access',
      'for (let i = 0; i < arr.length; i++) {',
      '  console.log(arr[i]);',
      '}',
      'arr.push(newValue);           // insert end O(1)',
      'arr.splice(index, 1);         // delete O(n)',
    ],
    getHighlightLines(frame) {
      const states = frame?.elements?.map(e => e.state) ?? []
      if (states.includes('comparing')) return [4, 5]
      if (states.includes('swapping'))  return [7]
      return [3]
    },
  },
  linkedlist: {
    lines: [
      'class Node {',
      '  constructor(value) {',
      '    this.value = value; this.next = null;',
      '  }',
      '}',
      'traverse() {',
      '  let curr = this.head;',
      '  while (curr !== null) {',
      '    visit(curr.value);',
      '    curr = curr.next;',
      '  }',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Following pointer')) return [9]
      if (d.includes('Visiting'))          return [7, 8]
      if (d.includes('complete'))          return [10]
      return [6]
    },
  },
  stacks: {
    lines: [
      'class Stack {',
      '  constructor() { this.data = []; }',
      '  push(value) { this.data.push(value); }',
      '  pop() {',
      '    if (this.isEmpty()) return null;',
      '    return this.data.pop();',
      '  }',
      '  peek()    { return this.data[this.data.length - 1]; }',
      '  isEmpty() { return this.data.length === 0; }',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Pushing'))    return [2]
      if (d.includes('top of the')) return [7]
      if (d.includes('Popping'))    return [3, 4, 5]
      if (d.includes('removed'))    return [5]
      return [1]
    },
  },
  queues: {
    lines: [
      'class Queue {',
      '  constructor() { this.data = []; }',
      '  enqueue(value) { this.data.push(value); }',
      '  dequeue() {',
      '    if (this.isEmpty()) return null;',
      '    return this.data.shift();',
      '  }',
      '  front()   { return this.data[0]; }',
      '  isEmpty() { return this.data.length === 0; }',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('nqueue')) return [2]
      if (d.includes('equeue')) return [3, 4, 5]
      if (d.includes('front') || d.includes('Front')) return [7]
      return [1]
    },
  },
  trees: {
    lines: [
      'class BSTNode {',
      '  constructor(v) { this.v=v; this.left=this.right=null; }',
      '}',
      'function insert(root, value) {',
      '  if (!root) return new BSTNode(value);',
      '  if (value < root.v)',
      '    root.left = insert(root.left, value);',
      '  else',
      '    root.right = insert(root.right, value);',
      '  return root;',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('left'))      return [5, 6]
      if (d.includes('right'))     return [7, 8]
      if (d.includes('root'))      return [4]
      if (d.includes('Comparing')) return [5]
      return [3]
    },
  },
  treetraversal: {
    lines: [
      '// In-order: Left → Root → Right',
      'function inOrder(node) {',
      '  if (!node) return;',
      '  inOrder(node.left);',
      '  visit(node.value);',
      '  inOrder(node.right);',
      '}',
    ],
    getHighlightLines(frame) {
      const states = frame?.elements?.map(e => e.state) ?? []
      if (states.includes('comparing')) return [3, 4, 5]
      return [1, 2]
    },
  },
  graphs: {
    lines: [
      'function bfs(graph, start) {',
      '  const visited = new Set([start]);',
      '  const queue = [start];',
      '  while (queue.length > 0) {',
      '    const node = queue.shift();',
      '    visit(node);',
      '    for (const nb of graph[node]) {',
      '      if (!visited.has(nb)) {',
      '        visited.add(nb);',
      '        queue.push(nb);',
      '      }',
      '    }',
      '  }',
      '}',
    ],
    getHighlightLines(frame) {
      const states = frame?.elements?.map(e => e.state) ?? []
      if (states.includes('comparing')) return [4, 5, 6, 7]
      if (states.includes('sorted'))    return [8, 9]
      return [3]
    },
  },

  // ── NEW ─────────────────────────────────────────────────────────────────────
  strings: {
    lines: [
      '// Naive pattern search O(n·m)',
      'function search(text, pattern) {',
      '  for (let i = 0; i <= text.length - pattern.length; i++) {',
      '    let match = true;',
      '    for (let j = 0; j < pattern.length; j++) {',
      '      if (text[i+j] !== pattern[j]) { match = false; break; }',
      '    }',
      '    if (match) return i;',
      '  }',
      '  return -1;',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('match') || d.includes('Match')) return [7]
      if (d.includes('Comparing'))                    return [4, 5]
      if (d.includes('window') || d.includes('start')) return [2, 3]
      return [2]
    },
  },
  bst: {
    lines: [
      'function search(root, target) {',
      '  if (!root) return null;',
      '  if (root.val === target) return root;',
      '  if (target < root.val)',
      '    return search(root.left, target);',
      '  return search(root.right, target);',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Found') || d.includes('found')) return [2]
      if (d.includes('left')  || d.includes('Left'))  return [3, 4]
      if (d.includes('right') || d.includes('Right')) return [5]
      return [1, 2]
    },
  },
  heaps: {
    lines: [
      'function heapify(arr, n, i) {',
      '  let largest = i;',
      '  const l = 2*i+1, r = 2*i+2;',
      '  if (l < n && arr[l] > arr[largest]) largest = l;',
      '  if (r < n && arr[r] > arr[largest]) largest = r;',
      '  if (largest !== i) {',
      '    [arr[i], arr[largest]] = [arr[largest], arr[i]];',
      '    heapify(arr, n, largest);',
      '  }',
      '}',
      'function buildHeap(arr) {',
      '  for (let i = Math.floor(arr.length/2)-1; i >= 0; i--)',
      '    heapify(arr, arr.length, i);',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Swap') || d.includes('swap')) return [6, 7]
      if (d.includes('largest') || d.includes('child')) return [3, 4]
      if (d.includes('heapif'))  return [0, 1]
      return [11, 12]
    },
  },
  hashtables: {
    lines: [
      'class HashTable {',
      '  constructor(size=7) { this.table = new Array(size); }',
      '  hash(key) { return key % this.table.length; }',
      '  set(key, value) {',
      '    const idx = this.hash(key);',
      '    this.table[idx] = value;   // open addressing',
      '  }',
      '  get(key) {',
      '    return this.table[this.hash(key)];',
      '  }',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('hash') || d.includes('bucket')) return [2, 4]
      if (d.includes('Insert') || d.includes('Inserting')) return [5]
      if (d.includes('collision'))    return [5]
      return [3]
    },
  },
  tries: {
    lines: [
      'class TrieNode {',
      '  constructor() { this.children={}; this.end=false; }',
      '}',
      'insert(word) {',
      '  let node = this.root;',
      '  for (const ch of word) {',
      '    if (!node.children[ch])',
      '      node.children[ch] = new TrieNode();',
      '    node = node.children[ch];',
      '  }',
      '  node.end = true;',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('new node') || d.includes('Creating')) return [6, 7]
      if (d.includes('Inserting') || d.includes('char'))    return [5, 8]
      if (d.includes('end') || d.includes('complete'))      return [10]
      return [4]
    },
  },
  insertionsort: {
    lines: [
      'function insertionSort(arr) {',
      '  for (let i = 1; i < arr.length; i++) {',
      '    const key = arr[i];',
      '    let j = i - 1;',
      '    while (j >= 0 && arr[j] > key) {',
      '      arr[j + 1] = arr[j];',
      '      j--;',
      '    }',
      '    arr[j + 1] = key;',
      '  }',
      '  return arr;',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Inserting') || d.includes('insert')) return [8]
      if (d.includes('Shifting')  || d.includes('shift'))  return [5, 6]
      if (d.includes('key') || d.includes('Picking'))      return [2, 3]
      if (d.includes('complete'))                          return [10]
      return [1]
    },
  },
  mergesort: {
    lines: [
      'function mergeSort(arr) {',
      '  if (arr.length <= 1) return arr;',
      '  const mid = Math.floor(arr.length / 2);',
      '  const left  = mergeSort(arr.slice(0, mid));',
      '  const right = mergeSort(arr.slice(mid));',
      '  return merge(left, right);',
      '}',
      'function merge(left, right) {',
      '  const result = [];',
      '  let i = 0, j = 0;',
      '  while (i < left.length && j < right.length) {',
      '    if (left[i] <= right[j]) result.push(left[i++]);',
      '    else result.push(right[j++]);',
      '  }',
      '  return [...result, ...left.slice(i), ...right.slice(j)];',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Merging') || d.includes('merge')) return [10, 11, 12]
      if (d.includes('Divid'))                          return [2, 3, 4]
      if (d.includes('complete'))                       return [14]
      return [1]
    },
  },
  heapsort: {
    lines: [
      'function heapSort(arr) {',
      '  const n = arr.length;',
      '  for (let i = Math.floor(n/2)-1; i >= 0; i--)',
      '    heapify(arr, n, i);           // build max-heap',
      '  for (let i = n-1; i > 0; i--) {',
      '    [arr[0], arr[i]] = [arr[i], arr[0]]; // extract max',
      '    heapify(arr, i, 0);           // re-heapify',
      '  }',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('extract') || d.includes('Extract')) return [5]
      if (d.includes('heapif'))                           return [6]
      if (d.includes('build') || d.includes('Build'))    return [2, 3]
      if (d.includes('complete'))                        return [8]
      return [3]
    },
  },
  linearsearch: {
    lines: [
      'function linearSearch(arr, target) {',
      '  for (let i = 0; i < arr.length; i++) {',
      '    if (arr[i] === target) return i;  // found',
      '  }',
      '  return -1;  // not found',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Found') || d.includes('found')) return [2]
      if (d.includes('Checking') || d.includes('Comparing')) return [1, 2]
      return [1]
    },
  },
  bfs: {
    lines: [
      'function bfs(graph, start) {',
      '  const visited = new Set([start]);',
      '  const queue = [start];',
      '  while (queue.length > 0) {',
      '    const node = queue.shift();',
      '    visit(node);',
      '    for (const nb of graph[node]) {',
      '      if (!visited.has(nb)) {',
      '        visited.add(nb); queue.push(nb);',
      '      }',
      '    }',
      '  }',
      '}',
    ],
    getHighlightLines(frame) {
      const states = frame?.elements?.map(e => e.state) ?? []
      if (states.includes('comparing')) return [4, 5, 6, 7]
      if (states.includes('sorted'))    return [8]
      return [3]
    },
  },
  dfs: {
    lines: [
      'function dfs(graph, start) {',
      '  const visited = new Set();',
      '  const stack = [start];',
      '  while (stack.length > 0) {',
      '    const node = stack.pop();',
      '    if (visited.has(node)) continue;',
      '    visited.add(node);',
      '    visit(node);',
      '    for (const nb of graph[node])',
      '      stack.push(nb);',
      '  }',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Visiting') || d.includes('visit')) return [6, 7]
      if (d.includes('neighbor') || d.includes('push'))  return [8, 9]
      if (d.includes('backtrack'))                       return [4, 5]
      return [3]
    },
  },
  dijkstra: {
    lines: [
      'function dijkstra(graph, src) {',
      '  const dist = {}; // dist[v] = shortest known',
      '  const visited = new Set();',
      '  dist[src] = 0;',
      '  while (visited.size < graph.nodes) {',
      '    const u = minDistNode(dist, visited);',
      '    visited.add(u);',
      '    for (const [v, w] of graph[u]) {',
      '      if (dist[u] + w < dist[v]) {',
      '        dist[v] = dist[u] + w;  // relax',
      '      }',
      '    }',
      '  }',
      '  return dist;',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('relax') || d.includes('Relax') || d.includes('shorter')) return [8, 9]
      if (d.includes('Visit') || d.includes('Processing'))                      return [5, 6]
      if (d.includes('neighbor'))                                               return [7]
      if (d.includes('final') || d.includes('complete'))                       return [13]
      return [4]
    },
  },
  bellmanford: {
    lines: [
      'function bellmanFord(graph, src) {',
      '  const dist = {}; // init all ∞',
      '  dist[src] = 0;',
      '  for (let i = 0; i < V-1; i++) {       // V-1 passes',
      '    for (const [u, v, w] of graph.edges) {',
      '      if (dist[u] + w < dist[v]) {',
      '        dist[v] = dist[u] + w;           // relax',
      '      }',
      '    }',
      '  }',
      '  // detect negative cycle',
      '  for (const [u, v, w] of graph.edges)',
      '    if (dist[u] + w < dist[v]) return null;',
      '  return dist;',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Relax') || d.includes('shorter'))  return [5, 6]
      if (d.includes('Pass') || d.includes('pass'))      return [3, 4]
      if (d.includes('negative') || d.includes('cycle')) return [11, 12]
      if (d.includes('complete'))                        return [13]
      return [4]
    },
  },
  prim: {
    lines: [
      'function prim(graph, start) {',
      '  const inMST = new Set([start]);',
      '  const edges = [];  // candidate edges',
      '  while (inMST.size < graph.nodes) {',
      '    // find min-weight edge crossing cut',
      '    const [u, v, w] = minEdge(inMST, graph);',
      '    inMST.add(v);',
      '    edges.push([u, v, w]);',
      '  }',
      '  return edges;',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Adding') || d.includes('selected')) return [6, 7]
      if (d.includes('Considering') || d.includes('candidate')) return [5]
      if (d.includes('complete'))                              return [9]
      return [3]
    },
  },
  kruskal: {
    lines: [
      'function kruskal(graph) {',
      '  const edges = graph.edges.sort((a,b) => a.w - b.w);',
      '  const uf = new UnionFind(graph.nodes);',
      '  const mst = [];',
      '  for (const [u, v, w] of edges) {',
      '    if (uf.find(u) !== uf.find(v)) {',
      '      uf.union(u, v);',
      '      mst.push([u, v, w]);',
      '    }  // else: skip — would form cycle',
      '  }',
      '  return mst;',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Accept') || d.includes('added')) return [6, 7]
      if (d.includes('cycle') || d.includes('Reject')) return [8]
      if (d.includes('Sorting') || d.includes('sort')) return [1]
      if (d.includes('Checking'))                      return [5]
      return [4]
    },
  },
  twopointers: {
    lines: [
      'function twoSum(arr, target) {',
      '  let left = 0, right = arr.length - 1;',
      '  while (left < right) {',
      '    const sum = arr[left] + arr[right];',
      '    if (sum === target) return [left, right];',
      '    else if (sum < target) left++;',
      '    else right--;',
      '  }',
      '  return null;',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Found') || d.includes('match')) return [4]
      if (d.includes('left')  || d.includes('small')) return [5]
      if (d.includes('right') || d.includes('large')) return [6]
      return [2, 3]
    },
  },
  slidingwindow: {
    lines: [
      'function maxSubarraySum(arr, k) {',
      '  let windowSum = arr.slice(0,k).reduce((a,b)=>a+b,0);',
      '  let maxSum = windowSum;',
      '  for (let i = k; i < arr.length; i++) {',
      '    windowSum += arr[i] - arr[i - k];',
      '    if (windowSum > maxSum) maxSum = windowSum;',
      '  }',
      '  return maxSum;',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('best') || d.includes('max'))  return [5]
      if (d.includes('Slide') || d.includes('window')) return [4]
      if (d.includes('Initial'))                    return [1]
      return [3]
    },
  },
  recursion: {
    lines: [
      'function factorial(n) {',
      '  if (n <= 1) return 1;     // base case',
      '  return n * factorial(n-1); // recursive call',
      '}',
      '// call stack (n=4):',
      '// factorial(4)',
      '// └─ factorial(3)',
      '//    └─ factorial(2)',
      '//       └─ factorial(1) → 1',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('base') || d.includes('Base'))   return [1]
      if (d.includes('return') || d.includes('Return')) return [2]
      if (d.includes('Call') || d.includes('call'))   return [2]
      return [0]
    },
  },
  backtracking: {
    lines: [
      'function nQueens(n) {',
      '  const board = Array(n).fill(-1);',
      '  solve(board, 0, n);',
      '}',
      'function solve(board, row, n) {',
      '  if (row === n) { record(board); return; }',
      '  for (let col = 0; col < n; col++) {',
      '    if (isSafe(board, row, col)) {',
      '      board[row] = col;         // place queen',
      '      solve(board, row+1, n);',
      '      board[row] = -1;          // backtrack',
      '    }',
      '  }',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Backtrack') || d.includes('remove')) return [10]
      if (d.includes('Place') || d.includes('place'))     return [7, 8]
      if (d.includes('safe') || d.includes('Try'))        return [6, 7]
      if (d.includes('Solution') || d.includes('found'))  return [5]
      return [4]
    },
  },
  greedy: {
    lines: [
      '// Activity Selection (greedy by end-time)',
      'function activitySelect(activities) {',
      '  activities.sort((a,b) => a.end - b.end);',
      '  const selected = [activities[0]];',
      '  let lastEnd = activities[0].end;',
      '  for (let i = 1; i < activities.length; i++) {',
      '    if (activities[i].start >= lastEnd) {',
      '      selected.push(activities[i]);',
      '      lastEnd = activities[i].end;',
      '    }',
      '  }',
      '  return selected;',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Select') || d.includes('selected')) return [7, 8]
      if (d.includes('Skip') || d.includes('overlap'))    return [6]
      if (d.includes('sort') || d.includes('Sort'))       return [2]
      return [5, 6]
    },
  },
  dp: {
    lines: [
      '// 0/1 Knapsack DP',
      'function knapsack(weights, values, W) {',
      '  const dp = Array(W+1).fill(0);',
      '  for (const [w, v] of zip(weights, values)) {',
      '    for (let cap = W; cap >= w; cap--) {',
      '      dp[cap] = Math.max(dp[cap], dp[cap-w]+v);',
      '    }',
      '  }',
      '  return dp[W];',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Update') || d.includes('dp[')) return [5]
      if (d.includes('item') || d.includes('Item'))  return [3, 4]
      if (d.includes('Init') || d.includes('init'))  return [2]
      if (d.includes('complete'))                    return [8]
      return [4]
    },
  },
  divideconquer: {
    lines: [
      '// Divide & Conquer — Binary Search',
      'function search(arr, target, lo, hi) {',
      '  if (lo > hi) return -1;',
      '  const mid = Math.floor((lo + hi) / 2);',
      '  if (arr[mid] === target) return mid;',
      '  if (arr[mid] < target)',
      '    return search(arr, target, mid+1, hi);',
      '  return search(arr, target, lo, mid-1);',
      '}',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('Found') || d.includes('found')) return [4]
      if (d.includes('right') || d.includes('Right')) return [5, 6]
      if (d.includes('left')  || d.includes('Left'))  return [7]
      if (d.includes('Divid'))                        return [3]
      return [2]
    },
  },
  bitmanipulation: {
    lines: [
      'const n = 42;   // 00101010',
      'n & mask        // AND  — clear bits',
      'n | mask        // OR   — set bits',
      'n ^ mask        // XOR  — toggle bits',
      'n << 1          // left  shift × 2',
      'n >> 1          // right shift ÷ 2',
      '~n              // NOT  — flip all bits',
      'n & (n-1)       // clear lowest set bit',
      'n & (-n)        // isolate lowest set bit',
    ],
    getHighlightLines(frame) {
      const d = frame?.description ?? ''
      if (d.includes('AND')   || d.includes('&'))   return [1]
      if (d.includes('OR')    || d.includes('|'))   return [2]
      if (d.includes('XOR')   || d.includes('^'))   return [3]
      if (d.includes('left')  || d.includes('<<'))  return [4]
      if (d.includes('right') || d.includes('>>'))  return [5]
      if (d.includes('NOT')   || d.includes('~'))   return [6]
      return [0]
    },
  },
}

export function getSnippet(topicId) {
  return SNIPPETS[topicId] ?? null
}
