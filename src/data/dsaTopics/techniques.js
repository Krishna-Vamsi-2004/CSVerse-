/**
 * DSA ALGORITHMIC TECHNIQUES LEARNING CONTENT
 * Contains theory, visual patterns, and practice questions for:
 * twopointers, slidingwindow, recursion, backtracking, greedy, dp, divideconquer, bitmanipulation
 */

export const TECHNIQUES_CONTENT = {
  twopointers: {
    theory: {
      title: "Two Pointers Technique",
      sections: [
        {
          heading: "What is the Two Pointers Technique?",
          content: `The Two Pointers technique is an algorithmic pattern where two pointer variables iterate through a data structure (usually an array or string) simultaneously to solve problems with lower time complexity.

Instead of brute-force nested loops ($O(n^2)$), two pointers reduce processing time to $O(n)$ linear time.`,
        },
        {
          heading: "Common Pointer Configurations",
          content: `1. Opposite Direction (Converging):
   • Left pointer starts at index 0, Right pointer starts at $n - 1$.
   • Move pointers inwards based on condition.
   • Used for: Target pair sums in sorted arrays, reversing arrays, palindrome verification.

2. Same Direction (Fast & Slow / Reader & Writer):
   • Both pointers start at beginning and move right at different speeds or conditions.
   • Used for: Removing duplicates in-place, linked list cycle detection, happy numbers.

3. Two Arrays / Lists:
   • One pointer per array to merge or intersect datasets.`,
        },
        {
          heading: "Prerequisites",
          content: `Opposite-direction two pointers usually require the input array to be SORTED so that moving left rightward INCREASES the sum and moving right leftward DECREASES the sum.`,
        },
        {
          heading: "Complexity Analysis",
          content: `• Time Complexity: O(n) (Each pointer moves at most n steps)
• Space Complexity: O(1) in-place operations`,
        },
      ],
    },
    patterns: [
      {
        name: "Two Sum II (Sorted Array)",
        description: "Find pair indices adding up to target in sorted array",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `function twoSumSorted(numbers, target) {
  let left = 0, right = numbers.length - 1;
  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum === target) return [left + 1, right + 1];
    else if (sum < target) left++;
    else right--;
  }
  return [];
}`,
        useCases: ["Pair target sum", "3Sum / 4Sum subproblem", "Trapping rainwater"],
      },
      {
        name: "Remove Duplicates from Sorted Array",
        description: "In-place duplicate removal using fast & slow pointers",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `function removeDuplicates(nums) {
  if (nums.length === 0) return 0;
  let slow = 0;
  for (let fast = 1; fast < nums.length; fast++) {
    if (nums[fast] !== nums[slow]) {
      slow++;
      nums[slow] = nums[fast];
    }
  }
  return slow + 1;
}`,
        useCases: ["In-place compaction", "Stream filtering", "Array cleanup"],
      },
    ],
    questions: [
      {
        id: "tp-q1",
        difficulty: "Easy",
        question: "What is the main advantage of using the Two Pointers technique over nested loops?",
        options: [
          "Reduces time complexity from O(n²) to O(n)",
          "Reduces memory space to O(n²)",
          "Eliminates conditional statements",
          "Allows sorting in O(1) time"
        ],
        correct: 0,
        explanation: "Two Pointers processes the array in a single linear pass, cutting O(n²) brute force down to O(n).",
      },
      {
        id: "tp-q2",
        difficulty: "Medium",
        question: "Why must an array usually be sorted for opposite-direction (left/right) Two Pointers pair sum lookup?",
        options: [
          "Sorting guarantees that incrementing left increases the pair sum and decrementing right decreases it",
          "Unsorted arrays cause syntax errors",
          "Two pointers cannot access odd indices",
          "Pointers can only move right"
        ],
        correct: 0,
        explanation: "Sorted order gives monotonic feedback: if sum < target, left++ increases sum; if sum > target, right-- decreases sum.",
      },
      {
        id: "tp-q3",
        difficulty: "Medium",
        question: "How does the Fast & Slow pointer pattern detect a cycle in a linked list?",
        options: [
          "Fast moves 2 steps, slow moves 1 step; if a cycle exists, fast will eventually overlap slow",
          "Slow pointer deletes nodes",
          "Fast pointer counts total nodes",
          "Both pointers move at equal speed"
        ],
        correct: 0,
        explanation: "Floyd's Cycle Finding algorithm proves fast will catch up to slow within the loop if a cycle exists.",
      },
      {
        id: "tp-q4",
        difficulty: "Hard",
        question: "How does the 3Sum problem (find 3 numbers adding to 0) use Two Pointers to achieve O(n²) time complexity?",
        options: [
          "Sort array, fix first number with loop `i`, then run Two Pointers on remaining subarray `(i+1, n-1)`",
          "Use 3 nested while loops",
          "Use a 3D hash table",
          "Run binary search on all pairs"
        ],
        correct: 0,
        explanation: "Sorting takes O(n log n). Fixing element i takes n iterations, and each subarray Two Pointers takes O(n), giving O(n²) total.",
      },
    ],
  },

  slidingwindow: {
    theory: {
      title: "Sliding Window Pattern",
      sections: [
        {
          heading: "What is the Sliding Window Pattern?",
          content: `The Sliding Window technique is used to perform required operations on a specific window size of a given array or linked list, such as finding the longest subarray containing all 1s.

A "window" is formed by a range of elements defined by two indices. The window then "slides" over the data structure step by step.`,
        },
        {
          heading: "Types of Sliding Windows",
          content: `1. Fixed-Size Window:
   • Window length $k$ is constant.
   • Slide right by adding element $i$ and removing element $i - k$.
   • Example: Max sum subarray of size $k$.

2. Variable-Size Dynamic Window:
   • Expand right pointer to satisfy problem condition.
   • Shrink left pointer when condition is violated until valid again.
   • Example: Longest substring without repeating characters, Smallest subarray with sum $\\ge S$.`,
        },
        {
          heading: "Why it Runs in O(n) Amortized Time",
          content: `Even though a variable sliding window has a nested \`while\` loop for shrinking the left boundary, both \`right\` and \`left\` pointers only move forward from $0 \\to n-1$. Each element enters and exits the window at most ONCE, ensuring $O(n)$ linear time.`,
        },
      ],
    },
    patterns: [
      {
        name: "Max Sum Subarray of Size K (Fixed Window)",
        description: "Find max contiguous subarray sum of length K",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `function maxSubarraySum(arr, k) {
  if (arr.length < k) return 0;
  let windowSum = 0;
  for (let i = 0; i < k; i++) windowSum += arr[i];
  let maxSum = windowSum;
  for (let i = k; i < arr.length; i++) {
    windowSum += arr[i] - arr[i - k];
    maxSum = Math.max(maxSum, windowSum);
  }
  return maxSum;
}`,
        useCases: ["Fixed length moving average", "Max traffic throughput in time window"],
      },
      {
        name: "Longest Substring Without Repeating Characters (Dynamic Window)",
        description: "Variable size window with hash set tracking distinct chars",
        timeComplexity: "O(n)",
        spaceComplexity: "O(min(n, m))",
        code: `function lengthOfLongestSubstring(s) {
  const set = new Set();
  let left = 0, maxLen = 0;
  for (let right = 0; right < s.length; right++) {
    while (set.has(s[right])) {
      set.delete(s[left]);
      left++;
    }
    set.add(s[right]);
    maxLen = Math.max(maxLen, right - left + 1);
  }
  return maxLen;
}`,
        useCases: ["Distinct substring search", "Subsegment filtering", "DNA motif matching"],
      },
    ],
    questions: [
      {
        id: "sw-q1",
        difficulty: "Easy",
        question: "What problem domain is the Sliding Window pattern specifically designed for?",
        options: [
          "Contiguous subarrays or substrings in linear data structures",
          "Binary tree depth calculations",
          "Graph topological sorting",
          "Matrix multiplication"
        ],
        correct: 0,
        explanation: "Sliding window works on contiguous sequences (subarrays or substrings) by maintaining boundary windows.",
      },
      {
        id: "sw-q2",
        difficulty: "Medium",
        question: "Why is a variable-size sliding window algorithm with a nested while loop still O(n) time complexity?",
        options: [
          "Because each element is added by `right` once and removed by `left` once, totaling at most 2n operations",
          "Because the inner loop runs in O(log n)",
          "Because array lookups take zero time",
          "It is not O(n); it is O(n²)"
        ],
        correct: 0,
        explanation: "Both left and right pointers only move forward. Total pointer increments across the entire execution are bounded by 2n = O(n).",
      },
      {
        id: "sw-q3",
        difficulty: "Medium",
        question: "In a fixed window of size K, how do you update the window sum when sliding right by 1 index?",
        options: [
          "Add new element `arr[i]` and subtract leaving element `arr[i - k]`",
          "Re-sum all K elements from scratch",
          "Multiply current sum by K",
          "Divide current sum by 2"
        ],
        correct: 0,
        explanation: "Incremental update `sum = sum + new_item - old_item` calculates new window sum in O(1) constant time.",
      },
      {
        id: "sw-q4",
        difficulty: "Hard",
        question: "Which data structure enables finding the MAXIMUM element in a sliding window in O(1) amortized time?",
        options: [
          "Monotonic Double-Ended Queue (Monotonic Deque)",
          "Min-Heap",
          "Singly Linked List",
          "Hash Set"
        ],
        correct: 0,
        explanation: "A Monotonic Deque stores elements in decreasing order, allowing window maximum query in O(1) amortized time.",
      },
    ],
  },

  recursion: {
    theory: {
      title: "Recursion - Problem Reduction & Call Stack",
      sections: [
        {
          heading: "What is Recursion?",
          content: `Recursion is a programming technique where a function calls itself directly or indirectly to solve a problem by breaking it down into smaller, self-similar subproblems.`,
        },
        {
          heading: "Anatomy of a Recursive Function",
          content: `Every valid recursive function MUST contain two parts:
1. Base Case: The condition that terminates recursion and returns a explicit value directly without further recursive calls.
2. Recursive Case: The logic that reduces the problem size and invokes the function recursively towards the Base Case.

⚠️ Missing base cases lead to Infinite Recursion and **StackOverflowError**!`,
        },
        {
          heading: "Call Stack Mechanics",
          content: `Each recursive invocation creates a new activation frame on the Call Stack storing local variables and return addresses.
Space complexity is determined by the MAXIMUM RECURSION DEPTH $O(d)$.`,
        },
        {
          heading: "Tail Call Optimization (TCO)",
          content: `A recursive call is a **Tail Call** if it is the VERY LAST execution statement in the function. Modern compilers optimize tail calls into simple loops, reusing the same stack frame ($O(1)$ stack space!).`,
        },
      ],
    },
    patterns: [
      {
        name: "Factorial with Recursion",
        description: "Classic linear recursive function",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n) call stack",
        code: `function factorial(n) {
  if (n <= 1) return 1; // Base case
  return n * factorial(n - 1); // Recursive step
}`,
        useCases: ["Permutation counting", "Combinatorics", "Math formulas"],
      },
      {
        name: "Fibonacci (Memoized Recursive / Top-Down)",
        description: "Optimized recursion with memoization cache",
        timeComplexity: "O(n)",
        spaceComplexity: "O(n)",
        code: `function fib(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}`,
        useCases: ["Dynamic programming starter", "Overlapping subproblems", "Tree recursion optimization"],
      },
    ],
    questions: [
      {
        id: "rec-q1",
        difficulty: "Easy",
        question: "What occurs if a recursive function lacks a valid base case?",
        options: [
          "Infinite recursion causing stack overflow error",
          "Returns 0 automatically",
          "Compiles to loop",
          "Memory leak in heap"
        ],
        correct: 0,
        explanation: "Without a base case, the function calls itself indefinitely until available call stack memory is exhausted.",
      },
      {
        id: "rec-q2",
        difficulty: "Medium",
        question: "What is the time complexity of naive un-memoized recursive Fibonacci `fib(n) = fib(n-1) + fib(n-2)`?",
        options: ["O(n)", "O(n log n)", "O(2ⁿ)", "O(n²)"],
        correct: 2,
        explanation: "Each call branches into 2 further calls, forming a binary call tree of height n with total exponential O(2ⁿ) nodes.",
      },
      {
        id: "rec-q3",
        difficulty: "Medium",
        question: "What is Tail Recursion?",
        options: [
          "A recursive call where the function call is the final operation performed by the function",
          "A function that calls itself twice",
          "A loop disguised as recursion",
          "Recursion operating on linked lists"
        ],
        correct: 0,
        explanation: "Tail recursion has no remaining computation after the recursive call, enabling compilers to reuse stack frames.",
      },
      {
        id: "rec-q4",
        difficulty: "Hard",
        question: "According to the Master Theorem $T(n) = a T(n/b) + f(n)$, what is the complexity when $f(n) = O(n)$ with $a = 2, b = 2$?",
        options: ["O(n log n)", "O(n)", "O(n²)", "O(log n)"],
        correct: 0,
        explanation: "Here $\\log_b a = \\log_2 2 = 1$. Since $f(n) = \\Theta(n^1)$, Case 2 of Master Theorem applies: $T(n) = \\Theta(n \\log n)$ (same as Merge Sort!).",
      },
    ],
  },

  backtracking: {
    theory: {
      title: "Backtracking & State Space Exploration",
      sections: [
        {
          heading: "What is Backtracking?",
          content: `Backtracking is a refined Depth-First Search strategy for solving combinatorial problems by incrementally building candidate solutions and abandoning ("backtracking" from) candidates as soon as it determines they cannot lead to a valid final solution.`,
        },
        {
          heading: "The Backtracking Template",
          content: `Every backtracking problem follows a 3-step decision blueprint:
1. Choose: Make a decision (add element to path / place item).
2. Explore: Recursively solve subproblem.
3. Unchoose (Backtrack!): Undo the choice to restore state for next branch exploration!

\`\`\`js
function backtrack(path, options) {
  if (isGoal(path)) { result.push([...path]); return; }
  for (let opt of options) {
    if (isValid(opt)) {
      path.push(opt);           // 1. Choose
      backtrack(path, options);  // 2. Explore
      path.pop();                // 3. Unchoose (Backtrack)
    }
  }
}
\`\`\``,
        },
        {
          heading: "Pruning",
          content: `Pruning is the act of checking constraints early to discard invalid decision branches before wasting CPU cycles exploring deep invalid subtrees.`,
        },
        {
          heading: "Applications",
          content: `✓ N-Queens Problem
✓ Sudoku Solver
✓ Subsets & Permutations generation
✓ Subset Sum / Combination Sum
✓ Knight's Tour / Maze pathfinding`,
        },
      ],
    },
    patterns: [
      {
        name: "Generate Permutations",
        description: "Backtracking template for generating array permutations",
        timeComplexity: "O(n * n!)",
        spaceComplexity: "O(n)",
        code: `function permute(nums) {
  const result = [];
  function backtrack(currentPath, used) {
    if (currentPath.length === nums.length) {
      result.push([...currentPath]);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (used[i]) continue;
      used[i] = true;
      currentPath.push(nums[i]);       // Choose
      backtrack(currentPath, used);   // Explore
      currentPath.pop();               // Backtrack
      used[i] = false;
    }
  }
  backtrack([], new Array(nums.length).fill(false));
  return result;
}`,
        useCases: ["Permutation listing", "Travelling Salesperson brute search", "Anagram generation"],
      },
    ],
    questions: [
      {
        id: "bt-q1",
        difficulty: "Easy",
        question: "What is the defining step in Backtracking that sets it apart from standard DFS?",
        options: [
          "Undoing the choice (unchoosing/popping state) after recursive call to restore original state for next branch",
          "Using a queue",
          "Sorting array ascending",
          "Deleting root node"
        ],
        correct: 0,
        explanation: "Backtracking explicitly resets state (e.g. path.pop()) so subsequent candidate branches explore clean states.",
      },
      {
        id: "bt-q2",
        difficulty: "Medium",
        question: "What is 'Pruning' in the context of backtracking algorithms?",
        options: [
          "Cutting off invalid decision tree branches early to avoid exploring useless subtrees",
          "Deleting comments from source code",
          "Reducing array length to 0",
          "Formatting output JSON"
        ],
        correct: 0,
        explanation: "Pruning evaluates constraints immediately; if violated, it returns without exploring deeper children.",
      },
      {
        id: "bt-q3",
        difficulty: "Medium",
        question: "How many total permutations exist for N distinct elements?",
        options: ["N!", "2ᴺ", "N²", "N log N"],
        correct: 0,
        explanation: "There are N choices for 1st spot, N-1 for 2nd, ..., giving N × (N-1) × ... × 1 = N! total permutations.",
      },
      {
        id: "bt-q4",
        difficulty: "Hard",
        question: "How can column collisions be checked in O(1) time during N-Queens placement?",
        options: [
          "Maintain boolean arrays `cols[c]`, `diag1[r+c]`, `diag2[r-c+n]` tracking occupied lines",
          "Iterate over all placed queens using nested loops",
          "Sort queen positions",
          "Use a min heap"
        ],
        correct: 0,
        explanation: "Boolean lookup arrays map row/col coordinates into constant index checks: r+c for anti-diagonals, r-c+n for main diagonals.",
      },
    ],
  },

  greedy: {
    theory: {
      title: "Greedy Method & Optimization",
      sections: [
        {
          heading: "What is the Greedy Method?",
          content: `The Greedy Method is an algorithmic paradigm that builds up a solution piece by piece, always choosing the next piece that offers the most immediate (local) benefit.

It makes locally optimal choices at each step with the hope of finding a globally optimal solution.`,
        },
        {
          heading: "Required Properties for Greedy Validity",
          content: `Greedy choice is ONLY valid if the problem exhibits:
1. Greedy Choice Property: A globally optimal solution can be arrived at by making locally optimal (greedy) choices without backtracking.
2. Optimal Substructure: An optimal solution to the problem contains optimal solutions to its subproblems.`,
        },
        {
          heading: "Greedy vs Dynamic Programming",
          content: `• Greedy: Makes ONE choice at each step (never reconsiders). Faster and lower memory.
• Dynamic Programming: Examines ALL choices at each step and picks best. Works when greedy choices fail!`,
        },
        {
          heading: "Classic Greedy Algorithms",
          content: `✓ Activity Selection / Interval Scheduling (Sort by end time)
✓ Fractional Knapsack (Sort by value/weight ratio)
✓ Huffman Coding (Min-Heap frequency combining)
✓ Dijkstra's & Prim's / Kruskal's MST Algorithms`,
        },
      ],
    },
    patterns: [
      {
        name: "Activity Selection (Interval Scheduling)",
        description: "Select max non-overlapping intervals by sorting finish times",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(1)",
        code: `function maxActivities(activities) {
  // activities = [[start, end], ...]
  // Sort by finish time ascending
  activities.sort((a, b) => a[1] - b[1]);
  
  let count = 1;
  let lastEndTime = activities[0][1];
  
  for (let i = 1; i < activities.length; i++) {
    if (activities[i][0] >= lastEndTime) {
      count++;
      lastEndTime = activities[i][1];
    }
  }
  return count;
}`,
        useCases: ["Meeting room scheduling", "CPU task execution", "Resource allocation"],
      },
    ],
    questions: [
      {
        id: "grd-q1",
        difficulty: "Easy",
        question: "Does the Greedy Method guarantee finding the global optimum for ALL optimization problems?",
        options: [
          "No, Greedy only works if the problem satisfies Greedy Choice Property and Optimal Substructure",
          "Yes, Greedy always yields global optimum",
          "Only for numbers under 100",
          "Only if written in C++"
        ],
        correct: 0,
        explanation: "Greedy fails on problems like 0/1 Knapsack where local choices lead to sub-optimal global results.",
      },
      {
        id: "grd-q2",
        difficulty: "Medium",
        question: "Why does Greedy work for Fractional Knapsack but FAIL for 0/1 Knapsack?",
        options: [
          "Fractional allows taking fractions of items by value/weight ratio; 0/1 requires taking whole items or leaving them",
          "0/1 Knapsack has no weights",
          "Fractional Knapsack requires O(N!) time",
          "Greedy cannot sort ratios"
        ],
        correct: 0,
        explanation: "Fractional knapsack capacity can be completely filled with highest ratio items; 0/1 items leave unused capacity gaps.",
      },
      {
        id: "grd-q3",
        difficulty: "Medium",
        question: "In Interval Scheduling / Activity Selection, what property should intervals be sorted by to maximize non-overlapping count?",
        options: ["Finish time ascending", "Start time ascending", "Interval duration descending", "Start time descending"],
        correct: 0,
        explanation: "Sorting by finish time frees up the resource as early as possible for subsequent activities.",
      },
      {
        id: "grd-q4",
        difficulty: "Hard",
        question: "What formal proof technique is most commonly used to prove the correctness of a Greedy choice algorithm?",
        options: ["Exchange Argument (Greedy Stays Ahead)", "Truth tables", "Master Theorem", "P vs NP proof"],
        correct: 0,
        explanation: "Exchange argument shows that replacing any optimal solution choice with the greedy choice maintains equal or better solution quality.",
      },
    ],
  },

  dp: {
    theory: {
      title: "Dynamic Programming (DP)",
      sections: [
        {
          heading: "What is Dynamic Programming?",
          content: `Dynamic Programming (DP) is an algorithmic optimization technique used for solving complex problems by breaking them down into overlapping subproblems, solving each subproblem ONCE, and storing their answers in a lookup table (memoization array).`,
        },
        {
          heading: "Two Core Prerequisites for DP",
          content: `1. Overlapping Subproblems: The problem can be broken down into subproblems which are reused several times.
2. Optimal Substructure: An optimal solution to the problem can be constructed from optimal solutions of its subproblems.`,
        },
        {
          heading: "Two Approaches to DP",
          content: `1. Top-Down (Memoization):
   • Recursive approach.
   • Solve problem recursively and cache results in Map/Array.
   • Computes only required subproblems.

2. Bottom-Up (Tabulation):
   • Iterative approach.
   • Build table starting from smallest base case subproblems up to target $N$.
   • Avoids recursion stack overhead and enables space optimization!`,
        },
        {
          heading: "Classic DP Patterns",
          content: `✓ 0/1 Knapsack (Subset selection with capacity bound)
✓ Unbounded Knapsack / Coin Change
✓ Longest Common Subsequence (LCS) / Edit Distance
✓ Longest Increasing Subsequence (LIS)
✓ Matrix Chain Multiplication`,
        },
      ],
    },
    patterns: [
      {
        name: "Coin Change (Bottom-Up Tabulation)",
        description: "Find minimum coins to make target amount",
        timeComplexity: "O(amount * coins.length)",
        spaceComplexity: "O(amount)",
        code: `function coinChange(coins, amount) {
  const dp = new Array(amount + 1).fill(Infinity);
  dp[0] = 0; // Base case
  
  for (let i = 1; i <= amount; i++) {
    for (let coin of coins) {
      if (i - coin >= 0) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
}`,
        useCases: ["Currency change optimization", "Minimum steps to reach goal", "Unbounded knapsack"],
      },
    ],
    questions: [
      {
        id: "dp-q1",
        difficulty: "Easy",
        question: "What two properties MUST a problem possess to be solvable using Dynamic Programming?",
        options: [
          "Overlapping Subproblems and Optimal Substructure",
          "Sorted input and positive numbers",
          "Graph cycles and tree leaves",
          "Odd length and prime factors"
        ],
        correct: 0,
        explanation: "Overlapping subproblems allow caching; optimal substructure allows building main answers from subproblem answers.",
      },
      {
        id: "dp-q2",
        difficulty: "Medium",
        question: "What is the difference between Top-Down Memoization and Bottom-Up Tabulation?",
        options: [
          "Memoization is recursive with caching; Tabulation is iterative building base cases up",
          "Memoization uses O(1) memory",
          "Tabulation only works on trees",
          "Memoization runs in O(N!) time"
        ],
        correct: 0,
        explanation: "Memoization starts from target N and recurses down; Tabulation starts from 0 base cases and loops up to N.",
      },
      {
        id: "dp-q3",
        difficulty: "Medium",
        question: "What is the time complexity of 0/1 Knapsack DP with N items and capacity W?",
        options: ["O(N)", "O(W)", "O(N × W)", "O(2ᴺ)"],
        correct: 2,
        explanation: "The 2D DP table size is (N + 1) × (W + 1), taking O(N × W) time and space (pseudo-polynomial time).",
      },
      {
        id: "dp-q4",
        difficulty: "Hard",
        question: "How can space complexity of 0/1 Knapsack DP be reduced from O(N × W) to O(W)?",
        options: [
          "By maintaining only 1D array of size W+1 and iterating capacity backwards from W down to weight",
          "By running binary search",
          "By using a hash set",
          "By deleting past values"
        ],
        correct: 0,
        explanation: "Each row $i$ only depends on row $i-1$. Iterating capacity backwards prevents overwriting values needed in current step.",
      },
    ],
  },

  divideconquer: {
    theory: {
      title: "Divide and Conquer Strategy",
      sections: [
        {
          heading: "What is Divide and Conquer?",
          content: `Divide and Conquer is an algorithmic design paradigm based on multi-branched recursion. It works by breaking down a problem into two or more subproblems of the same or related type, until these become simple enough to be solved directly.`,
        },
        {
          heading: "The 3 Steps",
          content: `1. Divide: Break original problem into smaller non-overlapping subproblems.
2. Conquer: Solve subproblems recursively (or directly if base case reached).
3. Combine: Merge subproblem solutions into global solution for original problem.`,
        },
        {
          heading: "Divide & Conquer vs Dynamic Programming",
          content: `• Divide & Conquer: Subproblems are INDEPENDENT and disjoint (e.g. left vs right subarray in Merge Sort). No overlapping work!
• Dynamic Programming: Subproblems OVERLAP and repeat (e.g. Fibonacci subproblems).`,
        },
        {
          heading: "Famous Applications",
          content: `✓ Merge Sort & Quick Sort ($O(n \\log n)$)
✓ Binary Search ($O(\\log n)$)
✓ Strassen's Matrix Multiplication ($O(n^{2.81})$ vs $O(n^3)$ naive)
✓ Closest Pair of Points in 2D Plane ($O(n \\log n)$)
✓ Karatsuba Integer Multiplication ($O(n^{1.58})$)`,
        },
      ],
    },
    patterns: [
      {
        name: "Maximum Subarray Sum (Divide & Conquer)",
        description: "Find max subarray sum dividing across midpoint",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(log n)",
        code: `function maxSubArrayDC(nums, left = 0, right = nums.length - 1) {
  if (left === right) return nums[left];
  const mid = Math.floor((left + right) / 2);
  
  const leftMax = maxSubArrayDC(nums, left, mid);
  const rightMax = maxSubArrayDC(nums, mid + 1, right);
  const crossMax = maxCrossingSum(nums, left, mid, right);
  
  return Math.max(leftMax, rightMax, crossMax);
}

function maxCrossingSum(nums, left, mid, right) {
  let sum = 0, leftSum = -Infinity;
  for (let i = mid; i >= left; i--) {
    sum += nums[i];
    leftSum = Math.max(leftSum, sum);
  }
  sum = 0; let rightSum = -Infinity;
  for (let i = mid + 1; i <= right; i++) {
    sum += nums[i];
    rightSum = Math.max(rightSum, sum);
  }
  return leftSum + rightSum;
}`,
        useCases: ["Cross boundary max sum", "Closest pair of points", "Stock buy-sell max profit"],
      },
    ],
    questions: [
      {
        id: "dc-q1",
        difficulty: "Easy",
        question: "How do subproblems in Divide and Conquer differ from subproblems in Dynamic Programming?",
        options: [
          "Divide and Conquer subproblems are non-overlapping / independent; Dynamic Programming subproblems overlap",
          "Divide and Conquer uses more space",
          "Divide and Conquer cannot use recursion",
          "Dynamic Programming runs in O(1) time"
        ],
        correct: 0,
        explanation: "Divide and Conquer divides data into independent partitions (like left and right array halves) with no shared work.",
      },
      {
        id: "dc-q2",
        difficulty: "Medium",
        question: "What is the time complexity of Strassen's matrix multiplication algorithm compared to naive matrix multiplication?",
        options: [
          "O(n²ˑ⁸¹) vs O(n³) naive",
          "O(n log n) vs O(n²)",
          "O(n) vs O(n log n)",
          "O(2ⁿ) vs O(n³)"
        ],
        correct: 0,
        explanation: "Strassen's algorithm reduces 8 recursive 2x2 matrix multiplications down to 7, achieving O(n^log₂ 7) = O(n²ˑ⁸¹).",
      },
      {
        id: "dc-q3",
        difficulty: "Medium",
        question: "According to the Master Theorem $T(n) = a T(n/b) + f(n)$, what is $T(n)$ for recurrence $T(n) = 4 T(n/2) + O(n)$?",
        options: ["O(n²)", "O(n log n)", "O(n)", "O(n³)"],
        correct: 0,
        explanation: "$\\log_b a = \\log_2 4 = 2$. Since $f(n) = O(n^1) < n^2$, Case 1 of Master Theorem applies: $T(n) = \\Theta(n^2)$.",
      },
      {
        id: "dc-q4",
        difficulty: "Hard",
        question: "How does Divide and Conquer solve the 2D Closest Pair of Points problem in O(n log n) time?",
        options: [
          "Divides points by median x-coordinate, solves left and right halves, and inspects a strip of width 2δ across center in linear time",
          "Checks all n(n-1)/2 pairs",
          "Converts points to 3D sphere",
          "Uses Dijkstra algorithm"
        ],
        correct: 0,
        explanation: "Points in center strip of width 2δ only need comparison with at most 6 nearby points, making combine step linear O(n).",
      },
    ],
  },

  bitmanipulation: {
    theory: {
      title: "Bit Manipulation & Bitmasking",
      sections: [
        {
          heading: "What is Bit Manipulation?",
          content: `Bit Manipulation operates directly on the binary bit representations (0s and 1s) of integers using bitwise operators for ultra-high execution speed and zero memory overhead.`,
        },
        {
          heading: "Essential Bitwise Operators",
          content: `• Bitwise AND (\`&\`): 1 if BOTH bits are 1.
• Bitwise OR (\`|\`): 1 if AT LEAST ONE bit is 1.
• Bitwise XOR (\`^\`): 1 if bits are DIFFERENT. ($x \\oplus x = 0$, $x \\oplus 0 = x$).
• Bitwise NOT (\`~\`): Inverts all bits (1s complement).
• Left Shift (\`<<\`): Shifts bits left, multiplying by $2^k$.
• Right Shift (\`>>\`): Shifts bits right, dividing by $2^k$.`,
        },
        {
          heading: "Must-Know Bit Magic Formulas",
          content: `1. Check if $k$-th bit is set: \`(n & (1 << k)) !== 0\`
2. Set $k$-th bit: \`n | (1 << k)\`
3. Clear $k$-th bit: \`n & ~(1 << k)\`
4. Toggle $k$-th bit: \`n ^ (1 << k)\`
5. Clear lowest set bit (Kernighan's Trick): \`n & (n - 1)\`
6. Check if $n$ is power of 2: \`(n > 0) && ((n & (n - 1)) === 0)\`
7. Isolate lowest set bit: \`n & (-n)\``,
        },
        {
          heading: "Bitmasking",
          content: `A **Bitmask** uses integer bits as a compact boolean array to represent subset combinations of size up to 32/64 ($O(1)$ space subset encoding!).`,
        },
      ],
    },
    patterns: [
      {
        name: "Single Number (XOR Property)",
        description: "Find non-repeating element in array where all others appear twice",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `function singleNumber(nums) {
  let result = 0;
  for (let num of nums) {
    result ^= num; // x ^ x = 0, x ^ 0 = x
  }
  return result;
}`,
        useCases: ["Missing number detection", "Checksum validation", "Duplicate cancellation"],
      },
      {
        name: "Count Set Bits (Brian Kernighan's Algorithm)",
        description: "Count total 1s in binary representation",
        timeComplexity: "O(number of set bits)",
        spaceComplexity: "O(1)",
        code: `function countSetBits(n) {
  let count = 0;
  while (n > 0) {
    n = n & (n - 1); // Clears lowest set bit
    count++;
  }
  return count;
}`,
        useCases: ["Hamming weight", "Population count (popcount)", "Bitmask set size"],
      },
    ],
    questions: [
      {
        id: "bm-q1",
        difficulty: "Easy",
        question: "What does `n & (n - 1)` evaluate to for an integer n?",
        options: [
          "Clears the lowest set (1) bit in n",
          "Doubles value of n",
          "Sets all bits to 1",
          "Returns n squared"
        ],
        correct: 0,
        explanation: "Subtracting 1 flips all bits after and including the lowest set bit. ANDing with n clears that lowest set bit.",
      },
      {
        id: "bm-q2",
        difficulty: "Medium",
        question: "How can XOR `^` swap two variables a and b without using temporary storage?",
        options: [
          "`a = a ^ b; b = a ^ b; a = a ^ b;`",
          "`a = a & b; b = a | b;`",
          "`a = a << b; b = b >> a;`",
          "Not possible using XOR"
        ],
        correct: 0,
        explanation: "XOR properties $x \\oplus x = 0$ and $x \\oplus 0 = x$ allow swapping values without temporary space.",
      },
      {
        id: "bm-q3",
        difficulty: "Medium",
        question: "How do you check if a positive integer n is an exact power of 2 in O(1) time?",
        options: [
          "`(n & (n - 1)) === 0`",
          "`n % 2 === 0`",
          "`n >> 1 === 1`",
          "`Math.sqrt(n) === 0`"
        ],
        correct: 0,
        explanation: "Powers of 2 have exactly one '1' bit (e.g., 8 is 1000₂). `n & (n - 1)` clears that single 1 bit, resulting in 0.",
      },
      {
        id: "bm-q4",
        difficulty: "Hard",
        question: "How to iterate over all subsets of a set of N elements using bitmasking?",
        options: [
          "Loop integer `mask` from `0` to `(1 << N) - 1`, where bit `i` set means element `i` is in subset",
          "Use a 2D array of size N × N",
          "Run DFS on binary tree",
          "Sort array descending"
        ],
        correct: 0,
        explanation: "An integer mask from 0 to 2ⁿ - 1 represents all 2ⁿ possible subsets of N elements in O(1) space per subset.",
      },
    ],
  },
};
