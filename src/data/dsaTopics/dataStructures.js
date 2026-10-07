/**
 * DSA DATA STRUCTURES LEARNING CONTENT
 * Contains theory, visual patterns, and practice questions for:
 * arrays, strings, linkedlist, stacks, queues, trees, bst, heaps, graphs, hashtables, tries
 */

export const DATA_STRUCTURES_CONTENT = {
  arrays: {
    theory: {
      title: "Arrays - Contiguous Memory Storage",
      sections: [
        {
          heading: "What is an Array?",
          content: `An array is a fundamental data structure that stores elements of the same type in contiguous memory locations. Each element can be accessed directly using its index, making arrays extremely efficient for random access operations.

Arrays are zero-indexed in most programming languages, meaning the first element is at index 0, the second at index 1, and so on.`,
        },
        {
          heading: "Memory Layout",
          content: `Arrays are stored in continuous blocks of memory. If an integer array starts at memory address 1000 and each integer takes 4 bytes, then:
- arr[0] is at address 1000
- arr[1] is at address 1004
- arr[2] is at address 1008
- and so on...

This contiguous layout enables O(1) access time using pointer arithmetic: address = base_address + (index × element_size)`,
        },
        {
          heading: "Time Complexity",
          content: `• Access: O(1) - Direct index calculation
• Search: O(n) - Must check each element
• Insertion (at end): O(1) amortized
• Insertion (at position): O(n) - Requires shifting
• Deletion (at end): O(1)
• Deletion (at position): O(n) - Requires shifting`,
        },
        {
          heading: "Advantages & Disadvantages",
          content: `**Advantages:**
✓ Fast random access O(1)
✓ Cache-friendly due to locality of reference
✓ Simple and efficient memory usage
✓ Supports binary search when sorted

**Disadvantages:**
✗ Fixed size (in static arrays)
✗ Insertion/deletion at arbitrary positions is expensive
✗ Wasted space if array capacity is not fully utilized`,
        },
      ],
    },
    patterns: [
      {
        name: "Two Pointers",
        description: "Use two pointers moving from opposite ends or same direction",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `function twoSum(arr, target) {
  let left = 0, right = arr.length - 1;
  while (left < right) {
    const sum = arr[left] + arr[right];
    if (sum === target) return [left, right];
    else if (sum < target) left++;
    else right--;
  }
  return null;
}`,
        useCases: ["Finding pairs with given sum", "Removing duplicates", "Reversing arrays"],
      },
      {
        name: "Sliding Window",
        description: "Maintain a window that slides through the array",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `function maxSumSubarray(arr, k) {
  let maxSum = 0, windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];
  maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum = windowSum - arr[i - k] + arr[i];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`,
        useCases: ["Maximum sum subarray", "Longest substring problems", "Fixed-size window problems"],
      },
      {
        name: "Prefix Sum",
        description: "Precompute cumulative sums for range queries",
        timeComplexity: "O(n) preprocessing, O(1) query",
        spaceComplexity: "O(n)",
        code: `function buildPrefixSum(arr) {
  const prefix = [arr[0]];
  for (let i = 1; i < arr.length; i++) {
    prefix[i] = prefix[i - 1] + arr[i];
  }
  return prefix;
}

function rangeSum(prefix, left, right) {
  if (left === 0) return prefix[right];
  return prefix[right] - prefix[left - 1];
}`,
        useCases: ["Range sum queries", "Subarray sum problems", "Equilibrium index"],
      },
    ],
    questions: [
      {
        id: "q1",
        difficulty: "Easy",
        question: "Find the maximum element in an array",
        options: [
          "Iterate through array keeping track of max",
          "Sort the array and take last element",
          "Use recursion to find max",
          "All of the above work"
        ],
        correct: 3,
        explanation: "All approaches work, but iteration is most efficient with O(n) time and O(1) space. Sorting takes O(n log n).",
      },
      {
        id: "q2",
        difficulty: "Medium",
        question: "What is the time complexity of inserting an element at the beginning of an array of size n?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 2,
        explanation: "Inserting at the beginning requires shifting all n elements one position to the right, taking O(n) time.",
      },
      {
        id: "q3",
        difficulty: "Medium",
        question: "Which technique is best for finding a subarray with maximum sum?",
        options: [
          "Brute force with nested loops",
          "Kadane's Algorithm",
          "Divide and Conquer",
          "Both B and C are efficient"
        ],
        correct: 3,
        explanation: "Kadane's Algorithm (O(n)) and Divide & Conquer (O(n log n)) are both efficient. Kadane's is optimal for this problem.",
      },
      {
        id: "q4",
        difficulty: "Hard",
        question: "In a rotated sorted array, what is the best time complexity to find an element?",
        options: ["O(n)", "O(log n)", "O(n log n)", "O(1)"],
        correct: 1,
        explanation: "Modified binary search can find elements in O(log n) by determining which half is sorted at each step.",
      },
    ],
  },

  strings: {
    theory: {
      title: "Strings - Sequence Processing & Encoding",
      sections: [
        {
          heading: "What is a String?",
          content: `A string is a sequence of characters stored in memory. In languages like JavaScript, Java, and Python, strings are immutable, meaning once created, their contents cannot be altered directly. Any manipulation creates a new string in memory.

Characters in strings are encoded using standards like ASCII (8-bit) or UTF-8 / UTF-16 (Unicode), mapping numerical character codes to human-readable symbols.`,
        },
        {
          heading: "Memory & Immutability",
          content: `Because strings are immutable:
• Concatenating strings in a loop using \`+\` creates temporary strings, resulting in O(n²) total time.
• Using string builders or array joining (\`arr.join('')\`) avoids allocation overhead and achieves O(n) time complexity.
• Strings can be safely shared across threads without synchronization locks.`,
        },
        {
          heading: "Time Complexity of String Operations",
          content: `• Character Access by Index: O(1)
• String Length Lookup: O(1)
• Search (Substring / Naive): O(n × m)
• Pattern Matching (KMP / Rabin-Karp): O(n + m)
• Concatenation (2 strings of length n & m): O(n + m)
• Substring Extraction: O(k) where k is substring length`,
        },
        {
          heading: "Common Algorithms & Applications",
          content: `✓ Anagram Checking (Frequency Map / Array)
✓ Palindrome Detection (Two Pointers)
✓ Substring Search (Knuth-Morris-Pratt, Rabin-Karp)
✓ Longest Common Subsequence (Dynamic Programming)
✓ Text Parsing & Lexical Analysis in Compilers`,
        },
      ],
    },
    patterns: [
      {
        name: "Valid Palindrome (Two Pointers)",
        description: "Check if string reads same backwards and forwards ignoring alphanumeric filters",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `function isPalindrome(s) {
  let left = 0, right = s.length - 1;
  while (left < right) {
    while (left < right && !/[a-zA-Z0-9]/.test(s[left])) left++;
    while (left < right && !/[a-zA-Z0-9]/.test(s[right])) right--;
    if (s[left].toLowerCase() !== s[right].toLowerCase()) return false;
    left++;
    right--;
  }
  return true;
}`,
        useCases: ["Palindrome validation", "DNA sequence alignment", "Symmetric token check"],
      },
      {
        name: "Valid Anagram (Frequency Counter)",
        description: "Verify if two strings contain identical character counts",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1) (fixed 26 alphabet size)",
        code: `function isAnagram(s, t) {
  if (s.length !== t.length) return false;
  const count = new Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    count[s.charCodeAt(i) - 97]++;
    count[t.charCodeAt(i) - 97]--;
  }
  return count.every(c => c === 0);
}`,
        useCases: ["Anagram detection", "Permutation verification", "Word games"],
      },
    ],
    questions: [
      {
        id: "str-q1",
        difficulty: "Easy",
        question: "Why does string concatenation inside a loop using '+' often result in O(n²) time complexity?",
        options: [
          "Strings are stored as linked lists",
          "Strings are immutable, requiring a new string copy on each step",
          "Character encoding takes exponential time",
          "Array bounds checking slows down loops"
        ],
        correct: 1,
        explanation: "Immutability forces a fresh copy of all characters on every concatenation step, creating 1 + 2 + ... + n = O(n²) work.",
      },
      {
        id: "str-q2",
        difficulty: "Medium",
        question: "What is the worst-case time complexity of the Knuth-Morris-Pratt (KMP) pattern matching algorithm for text of length N and pattern of length M?",
        options: ["O(N × M)", "O(N log M)", "O(N + M)", "O(N²)"],
        correct: 2,
        explanation: "KMP uses a precomputed Prefix Table (LPS) to avoid re-checking matched characters, achieving linear O(N + M) time.",
      },
      {
        id: "str-q3",
        difficulty: "Medium",
        question: "Which data structure is optimal for storing character frequencies for ASCII strings?",
        options: ["Fixed-size array of size 256", "Binary Search Tree", "Max-Heap", "Linked List"],
        correct: 0,
        explanation: "An array of length 256 allows O(1) index access using character codes with minimal memory overhead.",
      },
      {
        id: "str-q4",
        difficulty: "Hard",
        question: "What is the worst-case time complexity of Rabin-Karp algorithm when hash collisions occur frequently?",
        options: ["O(N + M)", "O(N log M)", "O(N × M)", "O(2ᴺ)"],
        correct: 2,
        explanation: "When hash collisions occur constantly, Rabin-Karp degrades to comparing character by character at every position: O(N × M).",
      },
    ],
  },

  linkedlist: {
    theory: {
      title: "Linked Lists - Dynamic Linear Data Structure",
      sections: [
        {
          heading: "What is a Linked List?",
          content: `A linked list is a linear data structure where elements (called nodes) are not stored in contiguous memory locations. Each node contains:
1. Data - The actual value
2. Pointer/Reference - Address of the next node

Unlike arrays, linked lists don't need continuous memory and can grow/shrink dynamically.`,
        },
        {
          heading: "Types of Linked Lists",
          content: `**Singly Linked List:** Each node points to the next node. Last node points to NULL.

**Doubly Linked List:** Each node has two pointers - one to next and one to previous node.

**Circular Linked List:** Last node points back to the first node, forming a circle.`,
        },
        {
          heading: "Time Complexity",
          content: `• Access: O(n) - Must traverse from head
• Search: O(n) - Linear scan required
• Insertion (at head): O(1) - Just update pointers
• Insertion (at tail): O(n) without tail pointer, O(1) with tail pointer
• Insertion (at position): O(n) - Must traverse to position
• Deletion (at head): O(1)
• Deletion (at position): O(n)`,
        },
        {
          heading: "Advantages vs Arrays",
          content: `**Advantages:**
✓ Dynamic size - no need to specify size upfront
✓ Efficient insertion/deletion at beginning - O(1)
✓ No wasted space
✓ Easy to implement stacks and queues

**Disadvantages:**
✗ No random access - must traverse from head
✗ Extra memory for storing pointers
✗ Not cache-friendly
✗ Cannot use binary search directly`,
        },
      ],
    },
    patterns: [
      {
        name: "Fast & Slow Pointers (Floyd's Cycle Detection)",
        description: "Use two pointers moving at different speeds to detect cycles",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `function hasCycle(head) {
  if (!head) return false;
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
}`,
        useCases: ["Cycle detection", "Finding middle element", "Detecting loop start"],
      },
      {
        name: "Reverse Linked List",
        description: "Reverse the links between nodes iteratively",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `function reverseList(head) {
  let prev = null, current = head;
  while (current) {
    let nextNode = current.next;
    current.next = prev;
    prev = current;
    current = nextNode;
  }
  return prev;
}`,
        useCases: ["Reversing entire list", "Reversing in groups", "Palindrome checking"],
      },
      {
        name: "Merge Two Sorted Lists",
        description: "Merge two sorted linked lists into one",
        timeComplexity: "O(n + m)",
        spaceComplexity: "O(1)",
        code: `function mergeTwoLists(l1, l2) {
  const dummy = new ListNode(0);
  let current = dummy;
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      current.next = l1;
      l1 = l1.next;
    } else {
      current.next = l2;
      l2 = l2.next;
    }
    current = current.next;
  }
  current.next = l1 || l2;
  return dummy.next;
}`,
        useCases: ["Merge sort for linked lists", "Combining sorted data", "List operations"],
      },
    ],
    questions: [
      {
        id: "ll-q1",
        difficulty: "Easy",
        question: "What is the time complexity to find the nth node from the end in a singly linked list?",
        options: ["O(1)", "O(n)", "O(log n)", "O(n²)"],
        correct: 1,
        explanation: "We need to traverse the list to count nodes or use two-pointer technique, both requiring O(n) time.",
      },
      {
        id: "ll-q2",
        difficulty: "Medium",
        question: "How can you detect if a linked list has a cycle efficiently?",
        options: [
          "Use a hash set to store visited nodes",
          "Use Floyd's cycle detection (fast & slow pointers)",
          "Traverse and count nodes",
          "Both A and B work efficiently"
        ],
        correct: 3,
        explanation: "Both methods work. Hash set uses O(n) space, while Floyd's algorithm uses O(1) space. Floyd's is preferred.",
      },
      {
        id: "ll-q3",
        difficulty: "Medium",
        question: "To reverse a linked list, what is the minimum number of pointers needed?",
        options: ["1", "2", "3", "4"],
        correct: 2,
        explanation: "You need 3 pointers: previous, current, and next to reverse the links while traversing.",
      },
      {
        id: "ll-q4",
        difficulty: "Hard",
        question: "What is the most efficient way to find the middle element of a linked list in one pass?",
        options: [
          "Count nodes first, then traverse to middle",
          "Use fast and slow pointers",
          "Convert to array first",
          "Use recursion"
        ],
        correct: 1,
        explanation: "Fast & slow pointers (tortoise and hare) technique finds the middle in one pass with O(n) time and O(1) space.",
      },
    ],
  },

  stacks: {
    theory: {
      title: "Stacks - LIFO Data Structure",
      sections: [
        {
          heading: "What is a Stack?",
          content: `A stack is a linear data structure that follows the Last-In-First-Out (LIFO) principle. The last element added to the stack is the first one to be removed. Think of it like a stack of plates - you add and remove plates from the top.

Key operations:
• Push - Add element to top
• Pop - Remove element from top
• Peek/Top - View top element without removing
• isEmpty - Check if stack is empty`,
        },
        {
          heading: "Implementation",
          content: `Stacks can be implemented using:

**Arrays:** Simple and cache-friendly, but fixed capacity or dynamic resizing cost
**Linked Lists:** Dynamic size without capacity limits, extra pointer overhead

Both implementations support O(1) push and pop operations.`,
        },
        {
          heading: "Time Complexity",
          content: `• Push: O(1)
• Pop: O(1)
• Peek: O(1)
• Search: O(n)
• Space: O(n)`,
        },
        {
          heading: "Real-World Applications",
          content: `✓ Function call stack in programming languages
✓ Undo/Redo functionality in text editors
✓ Browser history (Back button)
✓ Expression evaluation (Postfix / Infix)
✓ Backtracking algorithms (DFS, Maze solving)`,
        },
      ],
    },
    patterns: [
      {
        name: "Valid Parentheses",
        description: "Check if brackets are balanced using stack",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        code: `function isValid(s) {
  const stack = [];
  const pairs = { '(': ')', '{': '}', '[': ']' };
  for (let char of s) {
    if (char in pairs) {
      stack.push(char);
    } else {
      const top = stack.pop();
      if (pairs[top] !== char) return false;
    }
  }
  return stack.length === 0;
}`,
        useCases: ["Bracket matching", "Expression validation", "Compiler syntax checking"],
      },
      {
        name: "Min Stack",
        description: "Stack with O(1) getMin operation",
        timeComplexity: "O(1) all operations",
        spaceComplexity: "O(n)",
        code: `class MinStack {
  constructor() {
    this.stack = [];
    this.minStack = [];
  }
  push(val) {
    this.stack.push(val);
    const min = this.minStack.length === 0 ? val : Math.min(val, this.getMin());
    this.minStack.push(min);
  }
  pop() {
    this.stack.pop();
    this.minStack.pop();
  }
  top() { return this.stack[this.stack.length - 1]; }
  getMin() { return this.minStack[this.minStack.length - 1]; }
}`,
        useCases: ["Stock span problems", "Tracking minimums", "Range queries"],
      },
    ],
    questions: [
      {
        id: "stk-q1",
        difficulty: "Easy",
        question: "What principle does a stack follow?",
        options: ["FIFO", "LIFO", "Random Access", "Priority-based"],
        correct: 1,
        explanation: "Stack follows LIFO (Last-In-First-Out). The last element pushed is the first to be popped.",
      },
      {
        id: "stk-q2",
        difficulty: "Medium",
        question: "Which operation is NOT typically O(1) in a stack?",
        options: ["Push", "Pop", "Peek", "Search"],
        correct: 3,
        explanation: "Search requires O(n) time as you may need to check all elements. Push, Pop, and Peek are all O(1).",
      },
      {
        id: "stk-q3",
        difficulty: "Medium",
        question: "How would you reverse a string using a stack?",
        options: [
          "Push all characters, then pop all",
          "Use two stacks",
          "Sort the stack",
          "Not possible with stack"
        ],
        correct: 0,
        explanation: "Push all characters onto stack, then pop them. Due to LIFO, they come out in reverse order.",
      },
      {
        id: "stk-q4",
        difficulty: "Hard",
        question: "What data structure is used by compilers for function call management?",
        options: ["Queue", "Call Stack", "Heap", "Hash Table"],
        correct: 1,
        explanation: "The call stack stores function calls. When a function returns, it's popped from the stack (LIFO).",
      },
    ],
  },

  queues: {
    theory: {
      title: "Queues - FIFO Data Structure",
      sections: [
        {
          heading: "What is a Queue?",
          content: `A queue is a linear data structure that follows the First-In-First-Out (FIFO) principle. The first element added is the first one to be removed. Think of it like a line at a ticket counter.

Key operations:
• Enqueue - Add element to rear
• Dequeue - Remove element from front
• Front/Peek - View front element
• Rear - View rear element
• isEmpty - Check if queue is empty`,
        },
        {
          heading: "Types of Queues",
          content: `**Simple Queue:** Standard FIFO queue
**Circular Queue:** Last position connects back to first, enabling efficient space reuse
**Priority Queue:** Elements have priorities; highest priority dequeued first
**Deque (Double-ended Queue):** Insert/delete from both ends`,
        },
        {
          heading: "Time Complexity",
          content: `• Enqueue: O(1)
• Dequeue: O(1)
• Front/Rear: O(1)
• Search: O(n)
• Space: O(n)`,
        },
        {
          heading: "Applications",
          content: `✓ CPU & Disk task scheduling
✓ Print job spooling
✓ Breadth-First Search (BFS) in graphs/trees
✓ Request handling in web servers
✓ Message queues (Kafka, RabbitMQ)`,
        },
      ],
    },
    patterns: [
      {
        name: "Queue using Two Stacks",
        description: "Implement queue using two stacks",
        timeComplexity: "O(1) amortized",
        spaceComplexity: "O(n)",
        code: `class QueueUsingStacks {
  constructor() {
    this.stack1 = [];
    this.stack2 = [];
  }
  enqueue(x) { this.stack1.push(x); }
  dequeue() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) this.stack2.push(this.stack1.pop());
    }
    return this.stack2.pop();
  }
  peek() {
    if (this.stack2.length === 0) {
      while (this.stack1.length > 0) this.stack2.push(this.stack1.pop());
    }
    return this.stack2[this.stack2.length - 1];
  }
}`,
        useCases: ["Stack-based queue implementation", "Interview problems", "Resource management"],
      },
      {
        name: "Circular Queue",
        description: "Efficient queue with circular array",
        timeComplexity: "O(1) all operations",
        spaceComplexity: "O(n)",
        code: `class CircularQueue {
  constructor(k) {
    this.queue = new Array(k);
    this.size = k;
    this.front = -1;
    this.rear = -1;
  }
  enqueue(value) {
    if (this.isFull()) return false;
    if (this.isEmpty()) this.front = 0;
    this.rear = (this.rear + 1) % this.size;
    this.queue[this.rear] = value;
    return true;
  }
  dequeue() {
    if (this.isEmpty()) return false;
    if (this.front === this.rear) {
      this.front = -1; this.rear = -1;
    } else {
      this.front = (this.front + 1) % this.size;
    }
    return true;
  }
  isEmpty() { return this.front === -1; }
  isFull() { return (this.rear + 1) % this.size === this.front; }
}`,
        useCases: ["Buffer management", "CPU scheduling", "Memory management"],
      },
    ],
    questions: [
      {
        id: "q-q1",
        difficulty: "Easy",
        question: "What principle does a queue follow?",
        options: ["LIFO", "FIFO", "Random", "Sorted"],
        correct: 1,
        explanation: "Queue follows FIFO (First-In-First-Out). First element added is first to be removed.",
      },
      {
        id: "q-q2",
        difficulty: "Medium",
        question: "In a circular queue of size 5, if front=2 and rear=4, how many elements are present?",
        options: ["2", "3", "4", "5"],
        correct: 1,
        explanation: "Elements are at positions 2, 3, and 4. Total = 3 elements.",
      },
      {
        id: "q-q3",
        difficulty: "Medium",
        question: "Which traversal uses a queue?",
        options: ["Depth-First Search", "Breadth-First Search", "In-order", "Pre-order"],
        correct: 1,
        explanation: "BFS uses a queue to explore nodes level by level. DFS uses a stack.",
      },
      {
        id: "q4",
        difficulty: "Hard",
        question: "What is the amortized time complexity of dequeue in a queue implemented with two stacks?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 0,
        explanation: "Though worst case is O(n), amortized time is O(1) as each element is moved at most twice.",
      },
    ],
  },

  trees: {
    theory: {
      title: "Binary Trees & Hierarchical Structures",
      sections: [
        {
          heading: "What is a Binary Tree?",
          content: `A Binary Tree is a hierarchical non-linear data structure in which each node has at most two children, referred to as the left child and the right child.

Key terminology:
• Root: Topmost node of the tree
• Leaf: Node with no children
• Height: Number of edges on the longest path from root to leaf
• Depth: Number of edges from root to a specific node`,
        },
        {
          heading: "Tree Types",
          content: `• Full Binary Tree: Every node has 0 or 2 children.
• Complete Binary Tree: All levels filled except possibly the last, which is filled left to right.
• Perfect Binary Tree: All internal nodes have 2 children and all leaves are at the same level (Total nodes = 2ʰ⁺¹ - 1).
• Balanced Binary Tree: Height of left and right subtrees differ by at most 1 for every node.`,
        },
        {
          heading: "Tree Traversals",
          content: `1. Depth-First Traversals:
   • Pre-Order (Root → Left → Right): Copying trees, expression tree prefix evaluation
   • In-Order (Left → Root → Right): Gives sorted order in Binary Search Trees
   • Post-Order (Left → Right → Root): Deleting trees, bottom-up calculations
2. Breadth-First Traversal:
   • Level-Order (BFS using Queue): Level-by-level processing`,
        },
        {
          heading: "Time & Space Complexity",
          content: `• Search: O(n)
• Traversal (all nodes): O(n)
• Space Complexity: O(h) where h is tree height (O(log n) for balanced, O(n) for skewed tree call stack)`,
        },
      ],
    },
    patterns: [
      {
        name: "Maximum Depth of Binary Tree (DFS)",
        description: "Recursively calculate height of tree",
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
        code: `function maxDepth(root) {
  if (!root) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
}`,
        useCases: ["Height calculation", "Tree balance checking", "Depth-bound limits"],
      },
      {
        name: "Level Order Traversal (BFS)",
        description: "Traverse binary tree level by level using Queue",
        timeComplexity: "O(n)",
        spaceComplexity: "O(w) where w is max tree width",
        code: `function levelOrder(root) {
  if (!root) return [];
  const result = [], queue = [root];
  while (queue.length > 0) {
    const levelSize = queue.length;
    const currentLevel = [];
    for (let i = 0; i < levelSize; i++) {
      const node = queue.shift();
      currentLevel.push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
    result.push(currentLevel);
  }
  return result;
}`,
        useCases: ["Level-by-level printing", "Finding shortest path in tree", "Zigzag traversal"],
      },
    ],
    questions: [
      {
        id: "tree-q1",
        difficulty: "Easy",
        question: "What is the maximum number of nodes in a binary tree of height h (where root is at height 0)?",
        options: ["2ʰ", "2ʰ⁺¹ - 1", "2ʰ - 1", "2ʰ⁺¹"],
        correct: 1,
        explanation: "A perfect binary tree of height h has 1 + 2 + 4 + ... + 2ʰ = 2ʰ⁺¹ - 1 total nodes.",
      },
      {
        id: "tree-q2",
        difficulty: "Medium",
        question: "Which traversal sequence visits the root node LAST?",
        options: ["Pre-Order", "In-Order", "Post-Order", "Level-Order"],
        correct: 2,
        explanation: "Post-Order traversal processes Left child, Right child, and finally the Root node.",
      },
      {
        id: "tree-q3",
        difficulty: "Medium",
        question: "In a binary tree with N nodes, how many null pointers exist in total?",
        options: ["N", "N - 1", "N + 1", "2N"],
        correct: 2,
        explanation: "Each node has 2 pointers (2N total). N-1 edges connect internal nodes, leaving 2N - (N-1) = N + 1 null pointers.",
      },
      {
        id: "tree-q4",
        difficulty: "Hard",
        question: "What is the worst-case space complexity of recursive DFS traversal on a binary tree with N nodes?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N²)"],
        correct: 2,
        explanation: "In a completely skewed tree (degenerate tree), the call stack height is N, leading to O(N) space complexity.",
      },
    ],
  },

  bst: {
    theory: {
      title: "Binary Search Trees (BST) & Balanced Trees",
      sections: [
        {
          heading: "What is a Binary Search Tree?",
          content: `A Binary Search Tree (BST) is a node-based binary tree data structure with the BST Property:
• The left subtree of a node contains only nodes with keys LESS than the node's key.
• The right subtree of a node contains only nodes with keys GREATER than the node's key.
• Both left and right subtrees must also be binary search trees.

An In-Order traversal of a BST yields keys in strictly ascending sorted order!`,
        },
        {
          heading: "Core Operations",
          content: `• Search: Compare target with root; go left if target < root, go right if target > root.
• Insert: Search for location and attach new node as a leaf.
• Delete:
  - Case 1 (Leaf): Remove node directly.
  - Case 2 (One Child): Replace node with its child.
  - Case 3 (Two Children): Replace node value with In-Order Successor (smallest node in right subtree), then delete successor.`,
        },
        {
          heading: "Time & Space Complexity",
          content: `• Search / Insert / Delete (Balanced BST): O(log n)
• Search / Insert / Delete (Skewed BST): O(n) worst case
• In-Order Traversal: O(n) time, O(h) space`,
        },
        {
          heading: "Self-Balancing Trees",
          content: `To prevent BST degradation to O(n) linked lists, self-balancing BSTs (AVL Trees, Red-Black Trees) automatically rotate nodes during insertions and deletions to guarantee O(log n) operations.`,
        },
      ],
    },
    patterns: [
      {
        name: "Validate Binary Search Tree",
        description: "Check if tree satisfies BST property using min/max range bounds",
        timeComplexity: "O(n)",
        spaceComplexity: "O(h)",
        code: `function isValidBST(root, min = -Infinity, max = Infinity) {
  if (!root) return true;
  if (root.val <= min || root.val >= max) return false;
  return isValidBST(root.left, min, root.val) && 
         isValidBST(root.right, root.val, max);
}`,
        useCases: ["BST validation", "Range verification", "Tree audit"],
      },
      {
        name: "Lowest Common Ancestor in BST",
        description: "Find LCA of two nodes using BST property",
        timeComplexity: "O(h)",
        spaceComplexity: "O(1) iterative",
        code: `function lowestCommonAncestor(root, p, q) {
  let curr = root;
  while (curr) {
    if (p.val < curr.val && q.val < curr.val) {
      curr = curr.left;
    } else if (p.val > curr.val && q.val > curr.val) {
      curr = curr.right;
    } else {
      return curr;
    }
  }
  return null;
}`,
        useCases: ["Ancestor lookups", "Hierarchical queries", "Git merge base"],
      },
    ],
    questions: [
      {
        id: "bst-q1",
        difficulty: "Easy",
        question: "Which traversal of a Binary Search Tree produces elements in sorted ascending order?",
        options: ["Pre-Order", "In-Order", "Post-Order", "Level-Order"],
        correct: 1,
        explanation: "In-Order traversal processes left < node < right, which outputs all keys in ascending sorted order.",
      },
      {
        id: "bst-q2",
        difficulty: "Medium",
        question: "What is the worst-case time complexity for searching an element in an unbalanced BST of size N?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correct: 2,
        explanation: "If elements are inserted in sorted order, the BST becomes a skewed line (linked list) leading to O(N) search time.",
      },
      {
        id: "bst-q3",
        difficulty: "Medium",
        question: "When deleting a node with two children from a BST, which node can replace it?",
        options: [
          "In-order predecessor (max of left subtree)",
          "In-order successor (min of right subtree)",
          "Either A or B",
          "Any leaf node"
        ],
        correct: 2,
        explanation: "Replacing with either the In-order predecessor or In-order successor maintains the valid BST property.",
      },
      {
        id: "bst-q4",
        difficulty: "Hard",
        question: "What is the height balance property requirement in an AVL tree?",
        options: [
          "Left and right subtrees must have equal node count",
          "Balance factor |height(left) - height(right)| ≤ 1 for every node",
          "Tree height must be exactly log₂ N",
          "All leaf nodes must be at the exact same level"
        ],
        correct: 1,
        explanation: "An AVL tree maintains height balance by ensuring the height difference between left and right subtrees is at most 1 for every node.",
      },
    ],
  },

  heaps: {
    theory: {
      title: "Heaps & Priority Queues",
      sections: [
        {
          heading: "What is a Heap?",
          content: `A Heap is a specialized complete binary tree-based data structure that satisfies the Heap Property:
• Max-Heap: The key at the root must be maximum among all keys present in the heap. The same property holds recursively for all subtrees.
• Min-Heap: The key at the root must be minimum among all keys present in the heap.

Because heaps are complete binary trees, they can be stored space-efficiently as flat contiguous arrays!`,
        },
        {
          heading: "Array Index Mapping",
          content: `For a zero-indexed array storing a binary heap:
• Parent of node at index \`i\`: \`Math.floor((i - 1) / 2)\`
• Left Child of node at index \`i\`: \`2 * i + 1\`
• Right Child of node at index \`i\`: \`2 * i + 2\``,
        },
        {
          heading: "Core Heap Operations",
          content: `• Insert (Push): Append element to end of array and perform \`siftUp\` / \`bubbleUp\` (O(log n)).
• Extract Min/Max (Pop): Swap root with last element, pop array end, perform \`siftDown\` / \`heapify\` (O(log n)).
• Peek: Return root element at array[0] (O(1)).
• Build-Heap (from array): Bottom-up heapification in O(n) linear time!`,
        },
        {
          heading: "Priority Queue Applications",
          content: `✓ Dijkstra's Shortest Path Algorithm
✓ Prim's Minimum Spanning Tree Algorithm
✓ Heap Sort (O(n log n) in-place sort)
✓ Top K Elements / Median Maintenance in Streaming Data`,
        },
      ],
    },
    patterns: [
      {
        name: "Min-Heap Class",
        description: "Complete array-based Min-Heap implementation",
        timeComplexity: "Insert O(log n), Extract O(log n), Peek O(1)",
        spaceComplexity: "O(n)",
        code: `class MinHeap {
  constructor() { this.heap = []; }
  peek() { return this.heap[0] ?? null; }
  insert(val) {
    this.heap.push(val);
    this.bubbleUp(this.heap.length - 1);
  }
  bubbleUp(i) {
    while (i > 0) {
      let p = Math.floor((i - 1) / 2);
      if (this.heap[i] >= this.heap[p]) break;
      [this.heap[i], this.heap[p]] = [this.heap[p], this.heap[i]];
      i = p;
    }
  }
  extractMin() {
    if (this.heap.length === 0) return null;
    const min = this.heap[0];
    const end = this.heap.pop();
    if (this.heap.length > 0) {
      this.heap[0] = end;
      this.sinkDown(0);
    }
    return min;
  }
  sinkDown(i) {
    const len = this.heap.length;
    while (true) {
      let left = 2 * i + 1, right = 2 * i + 2, smallest = i;
      if (left < len && this.heap[left] < this.heap[smallest]) smallest = left;
      if (right < len && this.heap[right] < this.heap[smallest]) smallest = right;
      if (smallest === i) break;
      [this.heap[i], this.heap[smallest]] = [this.heap[smallest], this.heap[i]];
      i = smallest;
    }
  }
}`,
        useCases: ["Priority queue", "Task scheduling", "Event simulation"],
      },
      {
        name: "K-th Largest Element using Min-Heap",
        description: "Maintain heap of size K to find K-th largest in O(N log K)",
        timeComplexity: "O(N log K)",
        spaceComplexity: "O(K)",
        code: `function findKthLargest(nums, k) {
  const heap = new MinHeap();
  for (let num of nums) {
    heap.insert(num);
    if (heap.heap.length > k) heap.extractMin();
  }
  return heap.peek();
}`,
        useCases: ["Top K elements", "Kth largest/smallest stream", "Leaderboards"],
      },
    ],
    questions: [
      {
        id: "heap-q1",
        difficulty: "Easy",
        question: "What is the time complexity of looking up the minimum element in a Min-Heap?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correct: 0,
        explanation: "The minimum element in a Min-Heap is always at the root (index 0), taking O(1) time.",
      },
      {
        id: "heap-q2",
        difficulty: "Medium",
        question: "What is the time complexity to build a Min-Heap from an unsorted array of N elements?",
        options: ["O(1)", "O(N)", "O(N log N)", "O(N²)"],
        correct: 1,
        explanation: "Using bottom-up heapify (Build-Heap), the mathematical sum of heights bounds complexity to O(N) time.",
      },
      {
        id: "heap-q3",
        difficulty: "Medium",
        question: "In a zero-indexed array representation of a heap, where is the right child of node at index i located?",
        options: ["2i", "2i + 1", "2i + 2", "i / 2"],
        correct: 2,
        explanation: "Left child is at 2i + 1 and Right child is at 2i + 2.",
      },
      {
        id: "heap-q4",
        difficulty: "Hard",
        question: "Why is an array representation preferred over explicit node pointers for binary heaps?",
        options: [
          "Arrays consume less memory (no pointer overhead) and provide superior CPU cache locality",
          "Pointers take O(N log N) time to update",
          "Arrays make searching random elements O(1)",
          "Binary heaps cannot be represented using tree node objects"
        ],
        correct: 0,
        explanation: "Because a heap is a complete binary tree, array storage has zero pointer space overhead and optimal cache line utilization.",
      },
    ],
  },

  graphs: {
    theory: {
      title: "Graph Data Structures & Representations",
      sections: [
        {
          heading: "What is a Graph?",
          content: `A Graph is a non-linear data structure consisting of a set of vertices (or nodes) $V$ and a set of edges $E$ connecting pairs of vertices: $G = (V, E)$.

Graph Classifications:
• Directed vs Undirected: Edges have one-way direction or bidirectional connection.
• Weighted vs Unweighted: Edges carry values (costs, distances) or unweighted connections.
• Cyclic vs Acyclic: Contains paths starting and ending at the same node or no cycles.`,
        },
        {
          heading: "Graph Representations",
          content: `1. Adjacency Matrix:
   • $V \\times V$ 2D boolean/weight array.
   • Space: $O(V^2)$. Edge lookup $(u, v)$: $O(1)$.
   • Best for dense graphs.

2. Adjacency List:
   • Array/Map of lists where \`adj[u]\` contains neighbors of vertex \`u\`.
   • Space: $O(V + E)$. Edge lookup: $O(\\text{deg}(u))$.
   • Best for sparse graphs (most real-world networks).`,
        },
        {
          heading: "Key Graph Metrics",
          content: `• Degree (Undirected): Number of edges connected to vertex $v$.
• Indegree / Outdegree (Directed): Incoming / outgoing edge count.
• Handshaking Lemma: $\\sum_{v \\in V} \\text{deg}(v) = 2|E|$ for undirected graphs.`,
        },
        {
          heading: "Applications",
          content: `✓ Social Networks (Friends / Follower connections)
✓ Navigation & Maps (GPS shortest path routing)
✓ Web Page Ranking (Google PageRank graph algorithms)
✓ Dependency Graphs (Package managers, build pipelines)`,
        },
      ],
    },
    patterns: [
      {
        name: "Graph Adjacency List",
        description: "Undirected Graph class with Adjacency List representation",
        timeComplexity: "Add Edge O(1), Neighbors Lookup O(1)",
        spaceComplexity: "O(V + E)",
        code: `class Graph {
  constructor() { this.adjList = new Map(); }
  addVertex(v) {
    if (!this.adjList.has(v)) this.adjList.set(v, []);
  }
  addEdge(u, v) {
    this.addVertex(u); this.addVertex(v);
    this.adjList.get(u).push(v);
    this.adjList.get(v).push(u); // Undirected
  }
  getNeighbors(v) { return this.adjList.get(v) || []; }
}`,
        useCases: ["Graph modeling", "Network topology", "Social graph"],
      },
    ],
    questions: [
      {
        id: "grp-q1",
        difficulty: "Easy",
        question: "What is the space complexity of an Adjacency Matrix for a graph with V vertices?",
        options: ["O(V)", "O(E)", "O(V + E)", "O(V²)"],
        correct: 3,
        explanation: "An Adjacency Matrix uses a V × V 2D grid, consuming O(V²) space regardless of edge count.",
      },
      {
        id: "grp-q2",
        difficulty: "Medium",
        question: "According to the Handshaking Lemma, what is the sum of degrees of all vertices in an undirected graph with E edges?",
        options: ["E", "2E", "E²", "V + E"],
        correct: 1,
        explanation: "Each edge contributes 2 to the total degree count (1 for each endpoint vertex), making total sum = 2E.",
      },
      {
        id: "grp-q3",
        difficulty: "Medium",
        question: "What is the maximum number of edges in a simple undirected graph with V vertices?",
        options: ["V", "V - 1", "V(V - 1) / 2", "V²"],
        correct: 2,
        explanation: "Each of the V vertices can connect to V-1 other vertices without self-loops: V(V-1)/2 total edges.",
      },
      {
        id: "grp-q4",
        difficulty: "Hard",
        question: "Why is Adjacency List preferred over Adjacency Matrix for sparse graphs?",
        options: [
          "Adjacency List uses O(V + E) space instead of O(V²), saving massive memory when E ≪ V²",
          "Adjacency List makes edge lookup O(1)",
          "Adjacency Matrix cannot store edge weights",
          "Adjacency List requires less CPU time for all operations"
        ],
        correct: 0,
        explanation: "Sparse graphs have few edges (E ≪ V²). Adjacency list only stores actual edges, allocating memory proportional to V + E.",
      },
    ],
  },

  hashtables: {
    theory: {
      title: "Hash Tables & Hashing Mechanics",
      sections: [
        {
          heading: "What is a Hash Table?",
          content: `A Hash Table (or Hash Map) is a data structure that implements an associative array abstract data type, mapping keys to values.

It uses a Hash Function to compute an integer index into an array of buckets from which the desired value can be found in average $O(1)$ constant time!`,
        },
        {
          heading: "Hash Functions & Properties",
          content: `A good hash function must:
1. Be Deterministic: Equal keys MUST produce equal hash values.
2. Be Fast: Compute index in $O(1)$ time.
3. Uniform Distribution: Distribute keys uniformly across buckets to minimize collisions.`,
        },
        {
          heading: "Collision Resolution Techniques",
          content: `When two distinct keys hash to the same bucket index (Collision):

1. Separate Chaining (Open Hashing):
   • Each bucket holds a linked list (or balanced BST) of colliding key-value entries.
2. Open Addressing (Closed Hashing):
   • Linear Probing: Check index \`(h + i) % M\`
   • Quadratic Probing: Check index \`(h + i²) % M\`
   • Double Hashing: Check index \`(h1 + i * h2) % M\``,
        },
        {
          heading: "Load Factor & Dynamic Resizing",
          content: `Load Factor $\\alpha = \\frac{N}{M}$ (where $N$ = elements stored, $M$ = bucket capacity).
When $\\alpha$ exceeds threshold (e.g. 0.75), table size doubles ($M \\to 2M$) and all keys are rehashed ($O(n)$ amortized $O(1)$).`,
        },
      ],
    },
    patterns: [
      {
        name: "Two Sum (Hash Map Lookup)",
        description: "Find array indices adding up to target in single O(n) pass",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        code: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const diff = target - nums[i];
    if (map.has(diff)) return [map.get(diff), i];
    map.set(nums[i], i);
  }
  return [];
}`,
        useCases: ["Pair sum lookup", "Complement search", "Database key matching"],
      },
      {
        name: "Hash Table with Chaining",
        description: "Simple bucket-chained Hash Map",
        timeComplexity: "O(1) average lookup",
        spaceComplexity: "O(n)",
        code: `class HashTable {
  constructor(size = 53) {
    this.buckets = new Array(size).fill(null).map(() => []);
  }
  _hash(key) {
    let total = 0;
    for (let char of key) total = (total * 31 + char.charCodeAt(0)) % this.buckets.length;
    return total;
  }
  set(key, value) {
    const idx = this._hash(key);
    for (let pair of this.buckets[idx]) {
      if (pair[0] === key) { pair[1] = value; return; }
    }
    this.buckets[idx].push([key, value]);
  }
  get(key) {
    const idx = this._hash(key);
    for (let pair of this.buckets[idx]) {
      if (pair[0] === key) return pair[1];
    }
    return undefined;
  }
}`,
        useCases: ["Custom dictionary", "Symbol table", "Caching"],
      },
    ],
    questions: [
      {
        id: "ht-q1",
        difficulty: "Easy",
        question: "What is the average-case time complexity for searching a key in a well-distributed Hash Table?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N²)"],
        correct: 0,
        explanation: "Direct hash index lookup yields O(1) average constant time complexity.",
      },
      {
        id: "ht-q2",
        difficulty: "Medium",
        question: "What is the worst-case search time complexity in a Hash Table using separate chaining if all keys collide into a single bucket?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N log N)"],
        correct: 2,
        explanation: "If all N keys hash to the same bucket, the chain degrades to a linked list requiring O(N) linear search time.",
      },
      {
        id: "ht-q3",
        difficulty: "Medium",
        question: "What is 'Primary Clustering' in Open Addressing with Linear Probing?",
        options: [
          "Long contiguous blocks of occupied buckets forming, increasing search times for adjacent hashes",
          "Memory leak in hash buckets",
          "Stack overflow during rehashing",
          "Rehashing keys into negative indices"
        ],
        correct: 0,
        explanation: "Linear probing tends to build contiguous occupied runs (clusters), which causes new collisions to join the same cluster.",
      },
      {
        id: "ht-q4",
        difficulty: "Hard",
        question: "When a Hash Table automatically doubles its capacity during dynamic resizing, what happens to existing elements?",
        options: [
          "They remain at their original indices without changes",
          "All elements are rehashed into the new table size, taking O(N) time amortized over insertions",
          "Only colliding elements are moved",
          "Old elements are discarded to free memory"
        ],
        correct: 1,
        explanation: "Because bucket index depends on table size (hash % M), all elements must be rehashed into the new array capacity.",
      },
    ],
  },

  tries: {
    theory: {
      title: "Tries & Prefix Trees",
      sections: [
        {
          heading: "What is a Trie?",
          content: `A Trie (pronounced "try", stemming from "retrieval"), also called a Prefix Tree, is a tree-like data structure used to store a dynamic set or associative array of strings.

Unlike binary trees, nodes in a Trie do not store their own key. Instead, a node's position in the tree defines the key with which it is associated! All descendants of a node share a common prefix.`,
        },
        {
          heading: "Node Structure",
          content: `A typical Trie Node contains:
1. \`children\`: Map or fixed array of child node pointers (e.g., array of size 26 for lowercase English letters).
2. \`isEndOfWord\`: Boolean flag indicating if the node marks the termination of a valid word.`,
        },
        {
          heading: "Time & Space Complexity",
          content: `• Insert Word of length $L$: $O(L)$
• Search Word of length $L$: $O(L)$
• Search Prefix of length $L$: $O(L)$
• Space Complexity: $O(\\Sigma \\times L \\times N)$ where $\\Sigma$ is alphabet size, $L$ is max length, and $N$ is word count.`,
        },
        {
          heading: "Why Use Tries over Hash Tables?",
          content: `✓ Prefix Search / StartsWith in $O(L)$ time (Hash Tables require scanning all keys).
✓ Autocomplete suggestions and dictionary lookups.
✓ Alphabetically sorted output traversal.`,
        },
      ],
    },
    patterns: [
      {
        name: "Trie Implementation",
        description: "Complete Trie with insert, search, and startsWith",
        timeComplexity: "O(L) all operations",
        spaceComplexity: "O(N * L)",
        code: `class TrieNode {
  constructor() {
    this.children = {};
    this.isEndOfWord = false;
  }
}

class Trie {
  constructor() { this.root = new TrieNode(); }
  insert(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr.children[char]) curr.children[char] = new TrieNode();
      curr = curr.children[char];
    }
    curr.isEndOfWord = true;
  }
  search(word) {
    let curr = this.root;
    for (let char of word) {
      if (!curr.children[char]) return false;
      curr = curr.children[char];
    }
    return curr.isEndOfWord;
  }
  startsWith(prefix) {
    let curr = this.root;
    for (let char of prefix) {
      if (!curr.children[char]) return false;
      curr = curr.children[char];
    }
    return true;
  }
}`,
        useCases: ["Autocomplete", "Spell checker", "Prefix routing"],
      },
    ],
    questions: [
      {
        id: "trie-q1",
        difficulty: "Easy",
        question: "What is the time complexity to search for a word of length L in a Trie?",
        options: ["O(1)", "O(L)", "O(N)", "O(N log L)"],
        correct: 1,
        explanation: "Trie operations depend strictly on word length L, making lookup O(L) regardless of how many words N are stored in the Trie.",
      },
      {
        id: "trie-q2",
        difficulty: "Medium",
        question: "Why are Tries superior to Hash Tables for implementing search bar autocomplete?",
        options: [
          "Tries allow instantaneous lookup of all words sharing a common prefix in O(L) time",
          "Tries use less memory than Hash Tables",
          "Hash Tables cannot store strings",
          "Tries sort strings in descending order automatically"
        ],
        correct: 0,
        explanation: "Hash Tables lose prefix relationship, requiring scanning all keys. Tries navigate directly to the prefix node in O(L) steps.",
      },
      {
        id: "trie-q3",
        difficulty: "Medium",
        question: "In a Trie storing lowercase English letters ('a'-'z'), what is the child pointer array size per node?",
        options: ["2", "10", "26", "256"],
        correct: 2,
        explanation: "There are 26 lowercase English letters, so each node has up to 26 child references.",
      },
      {
        id: "trie-q4",
        difficulty: "Hard",
        question: "What is a Compressed Trie (Radix Tree / Patricia Trie)?",
        options: [
          "A Trie where single-child node paths are merged into single edges to save space",
          "A Trie stored inside a Min-Heap",
          "A Trie that encodes strings using Huffman coding",
          "A Trie restricted to height 2"
        ],
        correct: 0,
        explanation: "Radix Trees optimize memory by compressing non-branching node chains (single child nodes) into single multi-character edges.",
      },
    ],
  },
};
