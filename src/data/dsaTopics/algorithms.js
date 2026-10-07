/**
 * DSA ALGORITHMS LEARNING CONTENT
 * Contains theory, visual patterns, and practice questions for:
 * bubblesort, selectionsort, insertionsort, mergesort, quicksort, heapsort, linearsearch, binarysearch, bfs, dfs, dijkstra, bellmanford, prim, kruskal
 */

export const ALGORITHMS_CONTENT = {
  bubblesort: {
    theory: {
      title: "Bubble Sort - Simple Comparison-Based Sorting",
      sections: [
        {
          heading: "How Bubble Sort Works",
          content: `Bubble Sort is one of the simplest sorting algorithms. It repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. The pass through the list is repeated until the list is sorted.

The algorithm gets its name because smaller elements "bubble" to the top (beginning) of the list with each iteration.`,
        },
        {
          heading: "Algorithm Steps",
          content: `1. Start at the beginning of the array
2. Compare adjacent elements (arr[i] and arr[i+1])
3. If they are in wrong order, swap them
4. Move to the next pair
5. After each complete pass, the largest element reaches its correct position
6. Repeat the process for n-1 passes`,
        },
        {
          heading: "Complexity Analysis",
          content: `**Time Complexity:**
• Best Case: O(n) - Already sorted array with optimization
• Average Case: O(n²) - Random arrangement
• Worst Case: O(n²) - Reverse sorted array

**Space Complexity:** O(1) - Only uses a constant amount of extra space for swapping

**Number of Comparisons:** (n-1) + (n-2) + ... + 1 = n(n-1)/2`,
        },
        {
          heading: "Optimization",
          content: `Standard bubble sort can be optimized by adding a flag to detect if any swaps occurred in a pass. If no swaps occur, the array is already sorted and we can terminate early.`,
        },
      ],
    },
    patterns: [
      {
        name: "Optimized Bubble Sort",
        description: "Add early termination when array is sorted",
        timeComplexity: "O(n) best, O(n²) worst",
        spaceComplexity: "O(1)",
        code: `function bubbleSortOptimized(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}`,
        useCases: ["Nearly sorted data", "Small arrays", "Teaching sorting concepts"],
      },
    ],
    questions: [
      {
        id: "bs-q1",
        difficulty: "Easy",
        question: "After the first pass of Bubble Sort on array [5,2,8,1,9], where will the largest element be?",
        options: ["At index 0", "At index 2", "At index 4 (last position)", "Could be anywhere"],
        correct: 2,
        explanation: "After the first pass, the largest element (9) will 'bubble up' to the last position in the array.",
      },
      {
        id: "bs-q2",
        difficulty: "Medium",
        question: "What is the minimum number of swaps needed to sort [3,2,1] using Bubble Sort?",
        options: ["1", "2", "3", "4"],
        correct: 2,
        explanation: "Pass 1: [3,2,1] → [2,3,1] → [2,1,3] (2 swaps). Pass 2: [2,1,3] → [1,2,3] (1 swap). Total = 3 swaps.",
      },
      {
        id: "bs-q3",
        difficulty: "Medium",
        question: "How many passes are needed to sort an array of n elements using Bubble Sort?",
        options: ["n", "n-1", "n/2", "log n"],
        correct: 1,
        explanation: "Bubble Sort requires at most n-1 passes. After each pass, one element is placed in its correct position.",
      },
      {
        id: "bs-q4",
        difficulty: "Easy",
        question: "Is Bubble Sort a stable sorting algorithm?",
        options: [
          "Yes, equal elements maintain relative order",
          "No, equal elements may be reordered",
          "Only if optimized",
          "Depends on implementation"
        ],
        correct: 0,
        explanation: "Bubble Sort is stable because it only swaps adjacent elements when arr[i] > arr[i+1], never when they're equal.",
      },
    ],
  },

  selectionsort: {
    theory: {
      title: "Selection Sort - In-Place Comparison Sort",
      sections: [
        {
          heading: "How Selection Sort Works",
          content: `Selection Sort divides the input array into two parts: a sorted subarray built up from left to right, and an unsorted subarray occupying the remainder.

In each iteration, the algorithm finds (selects) the smallest element from the unsorted subarray and swaps it with the leftmost unsorted element.`,
        },
        {
          heading: "Algorithm Steps",
          content: `1. Set minIdx to 0.
2. Search through unsorted portion (i+1 to n-1) to find index of minimum value.
3. Swap arr[i] with arr[minIdx].
4. Move boundary of sorted subarray right by 1.
5. Repeat until array is sorted.`,
        },
        {
          heading: "Complexity Analysis",
          content: `• Best Case Time: O(n²)
• Average Case Time: O(n²)
• Worst Case Time: O(n²)
• Space Complexity: O(1) in-place
• Number of Swaps: Exactly O(n) swaps! (Very useful when memory writes are expensive).`,
        },
        {
          heading: "Key Distinction",
          content: `Unlike Bubble Sort or Insertion Sort, Selection Sort ALWAYS performs $O(n^2)$ comparisons regardless of initial array order because it must scan the entire unsorted segment to guarantee finding the true minimum.`,
        },
      ],
    },
    patterns: [
      {
        name: "Standard Selection Sort",
        description: "Classic in-place minimum selection sort",
        timeComplexity: "O(n²)",
        spaceComplexity: "O(1)",
        code: `function selectionSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n - 1; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      if (arr[j] < arr[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
  }
  return arr;
}`,
        useCases: ["Flash memory sorting (minimizing write operations)", "Small arrays"],
      },
    ],
    questions: [
      {
        id: "ss-q1",
        difficulty: "Easy",
        question: "How many total swaps does Selection Sort make in the worst case for an array of size N?",
        options: ["O(N²)", "At most N - 1 swaps", "O(N log N)", "0"],
        correct: 1,
        explanation: "Selection Sort performs at most N - 1 swaps in total (one swap per pass), making it optimal for minimizing memory writes.",
      },
      {
        id: "ss-q2",
        difficulty: "Medium",
        question: "What is the best-case time complexity of Selection Sort on an already sorted array?",
        options: ["O(N)", "O(N log N)", "O(N²)", "O(1)"],
        correct: 2,
        explanation: "Selection Sort does not check if array is sorted; it always performs N(N-1)/2 comparisons, resulting in O(N²) time in all cases.",
      },
      {
        id: "ss-q3",
        difficulty: "Medium",
        question: "Is standard array-based Selection Sort stable?",
        options: ["Yes, always", "No, long-distance swaps can change relative order of duplicate elements", "Only for even lengths", "Depends on pivot"],
        correct: 1,
        explanation: "Swapping elements across large distances can jump duplicate items past each other, making default Selection Sort unstable.",
      },
      {
        id: "ss-q4",
        difficulty: "Hard",
        question: "Why would Selection Sort be preferred over Bubble Sort when writing to EEPROM / Flash memory?",
        options: [
          "Selection Sort makes at most O(N) swaps, minimizing write wear on flash storage",
          "Selection Sort is faster in overall CPU execution",
          "Selection Sort requires zero comparisons",
          "Selection Sort uses extra temporary memory arrays"
        ],
        correct: 0,
        explanation: "Flash memory has limited write endurance. Selection Sort limits memory writes to O(N) swaps versus Bubble Sort's O(N²) potential swaps.",
      },
    ],
  },

  insertionsort: {
    theory: {
      title: "Insertion Sort - Adaptive Sorting",
      sections: [
        {
          heading: "How Insertion Sort Works",
          content: `Insertion Sort works similarly to the way you sort playing cards in your hands. The array is virtually split into a sorted and an unsorted part.

Values from the unsorted part are picked and inserted into the correct position in the sorted part by shifting larger elements one position to the right.`,
        },
        {
          heading: "Algorithm Steps",
          content: `1. Iterate from index 1 to n-1.
2. Select current element as \`key\`.
3. Compare \`key\` with preceding elements in sorted subarray.
4. Shift elements greater than \`key\` one position right.
5. Insert \`key\` at correct empty slot.`,
        },
        {
          heading: "Complexity Analysis",
          content: `• Best Case Time: O(n) (Already sorted array - linear scan with 0 shifts!)
• Average Case Time: O(n²)
• Worst Case Time: O(n²) (Reverse sorted array)
• Space Complexity: O(1) in-place
• Stable: Yes! Relative order of equals preserved.`,
        },
        {
          heading: "Why Insertion Sort is Widely Used",
          content: `Insertion sort is highly adaptive and has minimal overhead. It is used as the base case sorting algorithm inside hybrid production algorithms (such as Timsort in Python/Java and Introsort in C++ std::sort) for small subarrays (n ≤ 16).`,
        },
      ],
    },
    patterns: [
      {
        name: "Standard Insertion Sort",
        description: "Adaptive element insertion",
        timeComplexity: "O(n) best, O(n²) worst",
        spaceComplexity: "O(1)",
        code: `function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}`,
        useCases: ["Nearly sorted data", "Small subarrays in hybrid sorts", "Online sorting stream"],
      },
    ],
    questions: [
      {
        id: "is-q1",
        difficulty: "Easy",
        question: "What is the best-case time complexity of Insertion Sort?",
        options: ["O(1)", "O(N)", "O(N log N)", "O(N²)"],
        correct: 1,
        explanation: "When the input array is already sorted, the inner while loop terminates immediately on each step, running in O(N) linear time.",
      },
      {
        id: "is-q2",
        difficulty: "Medium",
        question: "Why is Insertion Sort preferred for small arrays (N < 16) inside hybrid algorithms like Timsort?",
        options: [
          "Low constant factor overhead and efficient cache usage with zero recursive calls",
          "Uses binary search to avoid comparisons",
          "Takes O(1) space and O(1) time",
          "Guarantees log N worst case"
        ],
        correct: 0,
        explanation: "Insertion Sort has negligible overhead and small constant factors, outperforming complex O(N log N) sorts for small N.",
      },
      {
        id: "is-q3",
        difficulty: "Medium",
        question: "Is Insertion Sort an online algorithm?",
        options: [
          "Yes, it can sort a list as it receives elements one at a time",
          "No, it requires the entire dataset upfront",
          "Only if network connected",
          "Only for floating-point numbers"
        ],
        correct: 0,
        explanation: "Insertion Sort can insert new incoming streaming elements into an existing sorted array on the fly.",
      },
      {
        id: "is-q4",
        difficulty: "Hard",
        question: "The number of swaps in Insertion Sort is equal to what property of the input array?",
        options: [
          "Number of inversions in the array",
          "Number of prime numbers",
          "Array length squared",
          "Number of distinct elements"
        ],
        correct: 0,
        explanation: "Each shift/swap in Insertion Sort resolves exactly one inversion (pair of elements out of order) in the array.",
      },
    ],
  },

  mergesort: {
    theory: {
      title: "Merge Sort - Divide and Conquer",
      sections: [
        {
          heading: "How Merge Sort Works",
          content: `Merge Sort is a divide-and-conquer algorithm that divides the array into two halves, recursively sorts them, and then merges the sorted halves back together.

Steps:
1. Divide: Split array into two halves
2. Conquer: Recursively sort both halves
3. Combine: Merge the two sorted halves into one sorted array`,
        },
        {
          heading: "The Merge Process",
          content: `Merging is the key operation where two sorted arrays are combined:
• Compare elements from both arrays
• Place smaller element in result array
• Move pointer forward in that array
• Repeat until all elements are merged in O(n) time.`,
        },
        {
          heading: "Complexity Analysis",
          content: `**Time Complexity:**
• Best / Average / Worst Case: O(n log n)
All cases are identical due to consistent division!

**Space Complexity:** O(n) - Requires auxiliary array for merging.
**Recurrence:** T(n) = 2T(n/2) + O(n)`,
        },
        {
          heading: "Advantages & Disadvantages",
          content: `**Advantages:**
✓ Guaranteed O(n log n) worst case
✓ Stable sort - maintains relative order of equal elements
✓ Predictable performance
✓ Ideal for linked lists & external sorting

**Disadvantages:**
✗ Requires O(n) extra space
✗ Slower than QuickSort for small arrays in RAM`,
        },
      ],
    },
    patterns: [
      {
        name: "Standard Merge Sort",
        description: "Classic recursive divide and conquer implementation",
        timeComplexity: "O(n log n)",
        spaceComplexity: "O(n)",
        code: `function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}

function merge(left, right) {
  const result = [];
  let i = 0, j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) result.push(left[i++]);
    else result.push(right[j++]);
  }
  return result.concat(left.slice(i)).concat(right.slice(j));
}`,
        useCases: ["General purpose sorting", "Linked list sorting", "External sorting"],
      },
    ],
    questions: [
      {
        id: "ms-q1",
        difficulty: "Easy",
        question: "What algorithmic paradigm does Merge Sort use?",
        options: ["Greedy", "Dynamic Programming", "Divide and Conquer", "Backtracking"],
        correct: 2,
        explanation: "Merge Sort uses divide and conquer: divide array, solve subproblems recursively, combine solutions.",
      },
      {
        id: "ms-q2",
        difficulty: "Medium",
        question: "What is the auxiliary space complexity of standard Merge Sort on arrays?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct: 2,
        explanation: "Merge Sort requires O(n) auxiliary space for the temporary array during the merge operation.",
      },
      {
        id: "ms-q3",
        difficulty: "Medium",
        question: "Is Merge Sort a stable sorting algorithm?",
        options: ["Yes, always", "No, never", "Only for integers", "Depends on pivot"],
        correct: 0,
        explanation: "Merge Sort is stable. When merging equal elements, taking from the left subarray first preserves relative order.",
      },
      {
        id: "ms-q4",
        difficulty: "Hard",
        question: "Why is Merge Sort preferred over QuickSort for sorting singly Linked Lists?",
        options: [
          "Merge Sort does not require O(N) extra array space for linked lists and can merge in O(1) extra space",
          "QuickSort cannot partition linked lists",
          "Merge Sort runs in O(N) time on linked lists",
          "Linked lists do not support recursion"
        ],
        correct: 0,
        explanation: "Linked lists allow merging by pointer rearrangement in O(1) space without creating temporary arrays.",
      },
    ],
  },

  quicksort: {
    theory: {
      title: "Quick Sort - High-Performance Partitioning",
      sections: [
        {
          heading: "How Quick Sort Works",
          content: `Quick Sort is a highly efficient Divide-and-Conquer sorting algorithm. It selects a "pivot" element from the array and partitions the other elements into two sub-arrays according to whether they are less than or greater than the pivot.

The sub-arrays are then sorted recursively.`,
        },
        {
          heading: "Partitioning Strategies",
          content: `1. Lomuto Partition Scheme:
   • Choice of last element as pivot.
   • Simpler to code, uses single index pointer \`i\`.
2. Hoare Partition Scheme:
   • Choice of first or middle element as pivot.
   • Uses two pointers moving inwards; makes 3x fewer swaps on average!`,
        },
        {
          heading: "Complexity Analysis",
          content: `• Best Case Time: O(n log n) (Balanced split every time)
• Average Case Time: O(n log n)
• Worst Case Time: O(n²) (Occurs when array is already sorted and bad pivot chosen)
• Space Complexity: O(log n) call stack
• Stability: Unstable by default due to long-distance swaps.`,
        },
        {
          heading: "Mitigating Worst Case",
          content: `To prevent O(n²) worst-case performance, modern implementations use **Randomized Pivot Selection** or **Median-of-Three Pivot Choice** (selecting median of first, middle, and last elements).`,
        },
      ],
    },
    patterns: [
      {
        name: "Quick Sort (Lomuto Partition)",
        description: "In-place divide and conquer sorting",
        timeComplexity: "O(n log n) avg, O(n²) worst",
        spaceComplexity: "O(log n) stack",
        code: `function quickSort(arr, low = 0, high = arr.length - 1) {
  if (low < high) {
    const pi = partition(arr, low, high);
    quickSort(arr, low, pi - 1);
    quickSort(arr, pi + 1, high);
  }
  return arr;
}

function partition(arr, low, high) {
  const pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] < pivot) {
      i++;
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
  }
  [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
  return i + 1;
}`,
        useCases: ["General in-memory sorting", "C++ std::sort core", "High performance systems"],
      },
    ],
    questions: [
      {
        id: "qs-q1",
        difficulty: "Easy",
        question: "What is the average time complexity of Quick Sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
        correct: 1,
        explanation: "Quick Sort averages O(n log n) performance with very low constant factors.",
      },
      {
        id: "qs-q2",
        difficulty: "Medium",
        question: "What causes the worst-case O(n²) time complexity in Quick Sort?",
        options: [
          "Picking the smallest or largest element as pivot consistently (e.g. sorted array with first element pivot)",
          "Running out of RAM memory",
          "Selecting median of three pivot",
          "Having duplicate elements"
        ],
        correct: 0,
        explanation: "Unbalanced 0 vs n-1 element splits at every recursive call result in n levels of recursive work: O(n²).",
      },
      {
        id: "qs-q3",
        difficulty: "Medium",
        question: "What is the space complexity of Quick Sort?",
        options: ["O(1)", "O(log n) call stack", "O(n)", "O(n log n)"],
        correct: 1,
        explanation: "Quick Sort operates in-place on data, but requires O(log n) recursion call stack space for balanced partitions.",
      },
      {
        id: "qs-q4",
        difficulty: "Hard",
        question: "How does the 'Median-of-Three' strategy choose a pivot?",
        options: [
          "Calculates mean of all array items",
          "Selects median value among first, middle, and last elements of array",
          "Picks three random items and sums them",
          "Sorts entire array first"
        ],
        correct: 1,
        explanation: "Median-of-Three evaluates arr[low], arr[mid], arr[high] and picks the median value as pivot, avoiding bad edge choices.",
      },
    ],
  },

  heapsort: {
    theory: {
      title: "Heap Sort - Heap-Based Guaranteed Sorting",
      sections: [
        {
          heading: "How Heap Sort Works",
          content: `Heap Sort is a comparison-based sorting algorithm that leverages a Max-Heap data structure to sort elements in-place in guaranteed $O(n \\log n)$ time.`,
        },
        {
          heading: "Algorithm Phases",
          content: `1. Build Max-Heap: Transform input array into a Max-Heap in $O(n)$ time using bottom-up heapification.
2. Extraction Loop:
   • Swap root (arr[0], max element) with current last element (arr[i]).
   • Reduce heap size boundary by 1.
   • Call \`heapify(0)\` on remaining elements to restore Max-Heap property.
   • Repeat for $i = n-1$ down to 1.`,
        },
        {
          heading: "Complexity Analysis",
          content: `• Best Case Time: O(n log n)
• Average Case Time: O(n log n)
• Worst Case Time: O(n log n)
• Space Complexity: O(1) completely in-place!
• Stability: Unstable.`,
        },
        {
          heading: "Comparison with QuickSort & MergeSort",
          content: `✓ Unlike QuickSort, Heap Sort guarantees $O(n \\log n)$ worst-case time (no $O(n^2)$ risk).
✓ Unlike MergeSort, Heap Sort uses $O(1)$ auxiliary space.
✗ Poor cache locality compared to QuickSort because heap jumps across distant array indices.`,
        },
      ],
    },
    patterns: [
      {
        name: "Standard Heap Sort",
        description: "In-place Max-Heap sort",
        timeComplexity: "O(n log n) all cases",
        spaceComplexity: "O(1)",
        code: `function heapSort(arr) {
  const n = arr.length;
  // 1. Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(arr, n, i);
  }
  // 2. Extract elements from heap
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];
    heapify(arr, i, 0);
  }
  return arr;
}

function heapify(arr, n, i) {
  let largest = i;
  let left = 2 * i + 1, right = 2 * i + 2;
  if (left < n && arr[left] > arr[largest]) largest = left;
  if (right < n && arr[right] > arr[largest]) largest = right;
  if (largest !== i) {
    [arr[i], arr[largest]] = [arr[largest], arr[i]];
    heapify(arr, n, largest);
  }
}`,
        useCases: ["Systems with strict memory bounds", "Security-critical sorting"],
      },
    ],
    questions: [
      {
        id: "hs-q1",
        difficulty: "Easy",
        question: "What is the worst-case space complexity of Heap Sort?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n log n)"],
        correct: 0,
        explanation: "Heap Sort operates directly in-place on the input array, consuming O(1) auxiliary space.",
      },
      {
        id: "hs-q2",
        difficulty: "Medium",
        question: "What is the worst-case time complexity of Heap Sort?",
        options: ["O(n)", "O(n log n)", "O(n²)", "O(2ⁿ)"],
        correct: 1,
        explanation: "Heap Sort guarantees O(n log n) time complexity in worst, average, and best cases.",
      },
      {
        id: "hs-q3",
        difficulty: "Medium",
        question: "Is Heap Sort a stable sorting algorithm?",
        options: ["Yes", "No", "Only for small datasets", "Depends on build heap"],
        correct: 1,
        explanation: "Heap operations swap root and leaf nodes across arbitrary distances, breaking equal item relative ordering.",
      },
      {
        id: "hs-q4",
        difficulty: "Hard",
        question: "Why is Heap Sort often slower than QuickSort in practice on modern hardware despite equal O(n log n) average complexity?",
        options: [
          "Heap Sort has poor spatial locality of reference, causing frequent CPU cache misses during index jumps",
          "Heap Sort uses extra thread locks",
          "QuickSort runs in O(N) time on average",
          "Heap Sort requires floating-point division"
        ],
        correct: 0,
        explanation: "Heap parent-child index access (2i+1, 2i+2) jumps across non-contiguous RAM locations, violating CPU cache locality.",
      },
    ],
  },

  linearsearch: {
    theory: {
      title: "Linear Search - Sequential Inspection",
      sections: [
        {
          heading: "What is Linear Search?",
          content: `Linear Search (or Sequential Search) is the simplest searching method. It checks every element in a dataset one by one from start to end until a match is found or the list ends.`,
        },
        {
          heading: "Algorithm Mechanics",
          content: `1. Start at index 0.
2. Compare \`arr[i]\` with \`target\`.
3. If \`arr[i] === target\`, return index \`i\`.
4. Increment \`i\` and repeat until end of array.
5. Return -1 if target not found.`,
        },
        {
          heading: "Complexity Analysis",
          content: `• Best Case Time: O(1) (Target is at first position index 0)
• Average Case Time: O(n) (Target is near middle)
• Worst Case Time: O(n) (Target is at last position or absent)
• Space Complexity: O(1)
• Requirement: NONE! Works on both sorted and unsorted data structures, including linked lists.`,
        },
      ],
    },
    patterns: [
      {
        name: "Standard Linear Search",
        description: "Sequential search across array",
        timeComplexity: "O(n)",
        spaceComplexity: "O(1)",
        code: `function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}`,
        useCases: ["Unsorted arrays", "Small datasets", "Singly linked lists"],
      },
    ],
    questions: [
      {
        id: "ls-q1",
        difficulty: "Easy",
        question: "What is the worst-case time complexity of Linear Search?",
        options: ["O(1)", "O(log n)", "O(n)", "O(n²)"],
        correct: 2,
        explanation: "Linear Search may inspect all N items if target is at end or absent, resulting in O(n) worst case time.",
      },
      {
        id: "ls-q2",
        difficulty: "Medium",
        question: "When is Linear Search preferred over Binary Search?",
        options: [
          "When the array is unsorted or small (e.g. n < 20)",
          "When the array has 1 million sorted items",
          "When searching balanced BSTs",
          "Always"
        ],
        correct: 0,
        explanation: "Sorting an unsorted array takes O(n log n), making linear search O(n) faster for one-off lookups or small data.",
      },
      {
        id: "ls-q3",
        difficulty: "Medium",
        question: "What is the average number of comparisons in Linear Search for a target present in array of size N?",
        options: ["1", "N / 2", "N", "log N"],
        correct: 1,
        explanation: "On average, the target is expected to be near the middle, requiring (N + 1) / 2 ≈ N / 2 comparisons.",
      },
      {
        id: "ls-q4",
        difficulty: "Hard",
        question: "What is Sentinel Linear Search?",
        options: [
          "Placing target at the end of array to eliminate the loop boundary condition check (i < n) per iteration",
          "Searching backwards using two threads",
          "A search that uses bitwise XOR",
          "Sorting array before searching"
        ],
        correct: 0,
        explanation: "By appending target as a sentinel at end, the inner loop only checks (arr[i] !== target), saving 50% of branch evaluations.",
      },
    ],
  },

  binarysearch: {
    theory: {
      title: "Binary Search - Divide and Conquer Search",
      sections: [
        {
          heading: "What is Binary Search?",
          content: `Binary Search is an efficient algorithm for finding a target value in a sorted array. It works by repeatedly dividing the search interval in half.

Prerequisite: The array MUST be sorted.`,
        },
        {
          heading: "Algorithm Steps",
          content: `1. Compare target with middle element (\`mid = floor((low + high) / 2)\`).
2. If \`arr[mid] === target\`, return \`mid\`.
3. If \`arr[mid] < target\`, search right half (\`low = mid + 1\`).
4. If \`arr[mid] > target\`, search left half (\`high = mid - 1\`).
5. Repeat while \`low <= high\`.`,
        },
        {
          heading: "Complexity Analysis",
          content: `• Best Case Time: O(1) (Middle item matches target)
• Average Case Time: O(log n)
• Worst Case Time: O(log n)
• Space Complexity: O(1) iterative, O(log n) recursive call stack`,
        },
        {
          heading: "Preventing Integer Overflow",
          content: `Calculating mid as \`mid = Math.floor((low + high) / 2)\` can cause integer overflow in languages like C++/Java when low + high > 2³¹ - 1.
Safe formula: \`mid = low + Math.floor((high - low) / 2)\`.`,
        },
      ],
    },
    patterns: [
      {
        name: "Standard Binary Search",
        description: "Find target index in sorted array",
        timeComplexity: "O(log n)",
        spaceComplexity: "O(1)",
        code: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    const mid = low + Math.floor((high - low) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}`,
        useCases: ["Sorted array lookups", "Search space reduction", "Sqrt computation"],
      },
    ],
    questions: [
      {
        id: "bsr-q1",
        difficulty: "Easy",
        question: "What is the mandatory prerequisite for Binary Search?",
        options: ["Array must be sorted", "Array must have even length", "Array must contain numbers only", "No prerequisite"],
        correct: 0,
        explanation: "Binary Search relies on sorted order to determine which half of the array contains the target.",
      },
      {
        id: "bsr-q2",
        difficulty: "Medium",
        question: "How many comparisons does Binary Search take in worst case for an array of 1,000,000 items?",
        options: ["~20 comparisons", "~100 comparisons", "~1000 comparisons", "1,000,000 comparisons"],
        correct: 0,
        explanation: "log₂ (1,000,000) ≈ 19.93, requiring at most 20 comparisons.",
      },
      {
        id: "bsr-q3",
        difficulty: "Medium",
        question: "Why does `mid = low + (high - low) / 2` avoid bugs compared to `(low + high) / 2`?",
        options: [
          "Prevents integer overflow when low + high exceeds maximum integer limit",
          "Calculates float precision",
          "Runs faster in hardware",
          "Handles negative array lengths"
        ],
        correct: 0,
        explanation: "Adding low + high can overflow 32-bit integer limits; subtracting high - low prevents large sums.",
      },
      {
        id: "bsr-q4",
        difficulty: "Hard",
        question: "Can Binary Search be implemented with O(log n) time complexity on a Singly Linked List?",
        options: [
          "No, because linked lists lack O(1) random access by index, making mid lookup O(n)",
          "Yes, using fast and slow pointers",
          "Yes, if list is sorted",
          "Only for doubly linked lists"
        ],
        correct: 0,
        explanation: "Without O(1) random access, finding mid takes O(n), causing total binary search time to degrade to O(n).",
      },
    ],
  },

  bfs: {
    theory: {
      title: "Breadth-First Search (BFS)",
      sections: [
        {
          heading: "What is BFS?",
          content: `Breadth-First Search (BFS) is a graph traversal algorithm that explores vertices level by level. It starts at a designated root node and explores all neighbor nodes at the current depth before moving to nodes at the next depth level.

Queue Data Structure (FIFO) is used to track unexplored nodes.`,
        },
        {
          heading: "Algorithm Mechanics",
          content: `1. Enqueue source node and mark as visited.
2. While queue is not empty:
   • Dequeue front node \`u\`.
   • Process node \`u\`.
   • For each unvisited neighbor \`v\` of \`u\`:
     - Mark \`v\` as visited.
     - Enqueue \`v\`.`,
        },
        {
          heading: "Complexity Analysis",
          content: `• Time Complexity: O(V + E) for Adjacency List, O(V²) for Adjacency Matrix.
• Space Complexity: O(V) for Queue and Visited array.`,
        },
        {
          heading: "Key BFS Property",
          content: `BFS guarantees finding the SHORTEST PATH (in terms of minimum number of edges) from source to target in any UNWEIGHTED graph!`,
        },
      ],
    },
    patterns: [
      {
        name: "Standard Graph BFS",
        description: "Level-order traversal using Queue",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        code: `function bfs(graph, start) {
  const visited = new Set([start]);
  const queue = [start];
  const order = [];
  while (queue.length > 0) {
    const node = queue.shift();
    order.push(node);
    for (let neighbor of graph[node] || []) {
      if (!visited.has(neighbor)) {
        visited.add(neighbor);
        queue.push(neighbor);
      }
    }
  }
  return order;
}`,
        useCases: ["Shortest path in unweighted graph", "Level order traversal", "Peer-to-peer search"],
      },
    ],
    questions: [
      {
        id: "bfs-q1",
        difficulty: "Easy",
        question: "Which data structure is essential for implementing Breadth-First Search?",
        options: ["Stack", "Queue", "Priority Queue", "Binary Search Tree"],
        correct: 1,
        explanation: "BFS processes nodes level-by-level in FIFO order using a Queue.",
      },
      {
        id: "bfs-q2",
        difficulty: "Medium",
        question: "What is the time complexity of BFS on a graph with V vertices and E edges represented using an Adjacency List?",
        options: ["O(V)", "O(E)", "O(V + E)", "O(V × E)"],
        correct: 2,
        explanation: "BFS visits each vertex once and checks each edge once: O(V + E) total time.",
      },
      {
        id: "bfs-q3",
        difficulty: "Medium",
        question: "Does BFS guarantee the shortest path in a weighted graph with positive weights?",
        options: [
          "No, BFS only guarantees shortest path in UNWEIGHTED graphs (or equal edge weights)",
          "Yes, BFS works for all weighted graphs",
          "Only if graph has no cycles",
          "Only for directed graphs"
        ],
        correct: 0,
        explanation: "BFS measures shortest path by edge count, not sum of edge weights. Weighted graphs require Dijkstra's algorithm.",
      },
      {
        id: "bfs-q4",
        difficulty: "Hard",
        question: "What is the worst-case space complexity of BFS on a tree with maximum branching factor b and depth d?",
        options: ["O(d)", "O(b)", "O(bᵈ)", "O(b × d)"],
        correct: 2,
        explanation: "The last level of a tree with branching factor b at depth d contains bᵈ leaf nodes, all residing in queue simultaneously.",
      },
    ],
  },

  dfs: {
    theory: {
      title: "Depth-First Search (DFS)",
      sections: [
        {
          heading: "What is DFS?",
          content: `Depth-First Search (DFS) is an algorithm for traversing or searching tree or graph data structures. It starts at a source node and explores as far as possible along each branch before backtracking.

DFS uses a Call Stack (Recursion) or explicit Stack (LIFO).`,
        },
        {
          heading: "Algorithm Mechanics",
          content: `1. Mark source node as visited.
2. For each unvisited neighbor \`v\` of current node \`u\`:
   • Recursively invoke \`DFS(v)\`.
3. Backtrack when current node has no remaining unvisited neighbors.`,
        },
        {
          heading: "Complexity Analysis",
          content: `• Time Complexity: O(V + E) for Adjacency List.
• Space Complexity: O(V) for visited set & call stack.`,
        },
        {
          heading: "Applications",
          content: `✓ Topological Sort (DAG dependency ordering)
✓ Cycle Detection in directed & undirected graphs
✓ Connected Components & Strong Components (Tarjan / Kosaraju)
✓ Maze generation and pathfinding`,
        },
      ],
    },
    patterns: [
      {
        name: "Recursive Graph DFS",
        description: "Branch exploration with backtracking",
        timeComplexity: "O(V + E)",
        spaceComplexity: "O(V)",
        code: `function dfs(graph, start, visited = new Set()) {
  visited.add(start);
  console.log("Visited:", start);
  for (let neighbor of graph[start] || []) {
    if (!visited.has(neighbor)) {
      dfs(graph, neighbor, visited);
    }
  }
  return visited;
}`,
        useCases: ["Cycle detection", "Connected components", "Topological sort"],
      },
    ],
    questions: [
      {
        id: "dfs-q1",
        difficulty: "Easy",
        question: "Which data structure is implicitly used by recursive Depth-First Search?",
        options: ["Queue", "Call Stack", "Heap", "Hash Map"],
        correct: 1,
        explanation: "Recursive function calls push activation frames onto the system Call Stack (LIFO).",
      },
      {
        id: "dfs-q2",
        difficulty: "Medium",
        question: "How can DFS detect a cycle in a directed graph?",
        options: [
          "If a node is encountered that is currently in the active recursion call stack (Back Edge)",
          "If queue length exceeds V",
          "If node count is odd",
          "If leaf node has zero neighbors"
        ],
        correct: 0,
        explanation: "Encountering a node currently in the active recursion stack indicates a cycle (Back Edge).",
      },
      {
        id: "dfs-q3",
        difficulty: "Medium",
        question: "What is the time complexity of DFS on a graph with V vertices and E edges?",
        options: ["O(V)", "O(E)", "O(V + E)", "O(V²)"],
        correct: 2,
        explanation: "DFS visits every vertex once and inspects every edge once: O(V + E).",
      },
      {
        id: "dfs-q4",
        difficulty: "Hard",
        question: "How does Topological Sorting use DFS?",
        options: [
          "By pushing vertices onto a stack as they FINISH their DFS recursive exploration, then popping stack",
          "By sorting vertices by indegree ascending",
          "By running BFS level by level",
          "By reversing all directed edges"
        ],
        correct: 0,
        explanation: "Nodes that finish DFS exploration last have no remaining outgoing dependencies, yielding correct topological reverse post-order.",
      },
    ],
  },

  dijkstra: {
    theory: {
      title: "Dijkstra's Algorithm - Single-Source Shortest Path",
      sections: [
        {
          heading: "What is Dijkstra's Algorithm?",
          content: `Dijkstra's Algorithm finds the shortest paths from a single source vertex to all other vertices in a weighted graph with NON-NEGATIVE edge weights.

It operates using a Greedy strategy with a Min-Priority Queue.`,
        },
        {
          heading: "Edge Relaxation Property",
          content: `For an edge $u \\to v$ with weight $w$:
If $\\text{dist}[u] + w < \\text{dist}[v]$, then update $\\text{dist}[v] = \\text{dist}[u] + w$.`,
        },
        {
          heading: "Algorithm Steps",
          content: `1. Set \`dist[source] = 0\` and \`dist[v] = Infinity\` for all other $v$.
2. Push \`(0, source)\` into Min-Priority Queue.
3. While Priority Queue not empty:
   • Extract minimum distance vertex \`u\`.
   • For each neighbor \`v\` with weight \`w\`:
     - If \`dist[u] + w < dist[v]\`, relax edge and push \`(dist[v], v)\` to Priority Queue.`,
        },
        {
          heading: "CRITICAL LIMITATION",
          content: `⚠️ Dijkstra's Algorithm FAILS when negative edge weights are present because its greedy assumption (that a finalized node distance cannot be improved later) is violated. Use Bellman-Ford for negative weights!`,
        },
      ],
    },
    patterns: [
      {
        name: "Dijkstra with Priority Queue",
        description: "Single-source shortest path algorithm",
        timeComplexity: "O((V + E) log V)",
        spaceComplexity: "O(V + E)",
        code: `function dijkstra(graph, source) {
  const dist = {};
  for (let node in graph) dist[node] = Infinity;
  dist[source] = 0;
  
  // Min-Priority Queue storing [distance, node]
  const pq = [[0, source]];
  
  while (pq.length > 0) {
    pq.sort((a, b) => a[0] - b[0]);
    const [d, u] = pq.shift();
    if (d > dist[u]) continue;
    
    for (let neighbor in graph[u]) {
      const weight = graph[u][neighbor];
      if (dist[u] + weight < dist[neighbor]) {
        dist[neighbor] = dist[u] + weight;
        pq.push([dist[neighbor], neighbor]);
      }
    }
  }
  return dist;
}`,
        useCases: ["GPS Route Navigation", "Network Routing Protocols (OSPF)", "Flight Cost Optimization"],
      },
    ],
    questions: [
      {
        id: "djk-q1",
        difficulty: "Easy",
        question: "What constraint MUST edge weights satisfy for Dijkstra's algorithm to work correctly?",
        options: [
          "All edge weights must be non-negative (≥ 0)",
          "All edge weights must be negative",
          "All edge weights must be integers",
          "Graph must be acyclic"
        ],
        correct: 0,
        explanation: "Negative edge weights break Dijkstra's greedy choice property, leading to incorrect shortest distance estimates.",
      },
      {
        id: "djk-q2",
        difficulty: "Medium",
        question: "What is the time complexity of Dijkstra's algorithm using a Min-Heap priority queue?",
        options: ["O(V²)", "O((V + E) log V)", "O(V × E)", "O(V log E)"],
        correct: 1,
        explanation: "Each vertex extract-min takes O(log V) and each edge relaxation decrease-key takes O(log V): O((V + E) log V) total.",
      },
      {
        id: "djk-q3",
        difficulty: "Medium",
        question: "What greedy choice does Dijkstra's algorithm make at each step?",
        options: [
          "Selects the unvisited vertex with the minimum tentative distance from source",
          "Selects the vertex with maximum neighbors",
          "Selects a random vertex",
          "Selects edge with highest weight"
        ],
        correct: 0,
        explanation: "At each step, Dijkstra extracts the unvisited vertex with smallest current tentative distance.",
      },
      {
        id: "djk-q4",
        difficulty: "Hard",
        question: "Why does Dijkstra's algorithm fail on graphs with negative edge weights?",
        options: [
          "Once a vertex is marked visited/finalized, Dijkstra assumes its shortest path is permanently determined and never re-inspects it, which negative edges can undermine",
          "Negative weights cause infinite loops in heap insert",
          "Priority queues cannot store negative numbers",
          "Adjacency lists crash on negative weights"
        ],
        correct: 0,
        explanation: "Greedy choice assumes path lengths only increase. A negative edge can later create a shorter path to an already finalized vertex.",
      },
    ],
  },

  bellmanford: {
    theory: {
      title: "Bellman-Ford Algorithm - Negative Weight Support",
      sections: [
        {
          heading: "What is Bellman-Ford?",
          content: `The Bellman-Ford algorithm computes single-source shortest paths in a weighted digraph. Unlike Dijkstra's algorithm, Bellman-Ford supports NEGATIVE edge weights and can DETECT negative weight cycles!`,
        },
        {
          heading: "Algorithm Mechanics",
          content: `1. Initialize \`dist[source] = 0\` and all other distances to \`Infinity\`.
2. Relax ALL edges $V - 1$ times.
3. Perform a $V$-th pass over all edges. If any edge can STILL be relaxed (\`dist[u] + weight < dist[v]\`), then a NEGATIVE WEIGHT CYCLE exists in the graph!`,
        },
        {
          heading: "Why V - 1 Iterations?",
          content: `A simple path in a graph with $V$ vertices contains at most $V - 1$ edges. Thus, relaxing all edges $V - 1$ times guarantees shortest paths propagate across all path lengths.`,
        },
        {
          heading: "Complexity Analysis",
          content: `• Time Complexity: O(V × E)
• Space Complexity: O(V)`,
        },
      ],
    },
    patterns: [
      {
        name: "Bellman-Ford Implementation",
        description: "Shortest path with negative cycle detection",
        timeComplexity: "O(V * E)",
        spaceComplexity: "O(V)",
        code: `function bellmanFord(edges, V, source) {
  const dist = new Array(V).fill(Infinity);
  dist[source] = 0;
  
  // Relax edges V-1 times
  for (let i = 1; i <= V - 1; i++) {
    for (let [u, v, w] of edges) {
      if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
        dist[v] = dist[u] + w;
      }
    }
  }
  
  // Check for negative weight cycles
  for (let [u, v, w] of edges) {
    if (dist[u] !== Infinity && dist[u] + w < dist[v]) {
      throw new Error("Graph contains negative weight cycle!");
    }
  }
  return dist;
}`,
        useCases: ["Distance Vector Routing (RIP protocol)", "Arbitrage detection in financial markets"],
      },
    ],
    questions: [
      {
        id: "bf-q1",
        difficulty: "Easy",
        question: "What key capability does Bellman-Ford have that Dijkstra's algorithm lacks?",
        options: [
          "Handles negative edge weights and detects negative weight cycles",
          "Runs faster in O(V) time",
          "Uses zero memory space",
          "Works on unweighted graphs only"
        ],
        correct: 0,
        explanation: "Bellman-Ford safely handles negative edge weights and detects negative weight cycles.",
      },
      {
        id: "bf-q2",
        difficulty: "Medium",
        question: "What is the time complexity of the Bellman-Ford algorithm on a graph with V vertices and E edges?",
        options: ["O(V + E)", "O((V + E) log V)", "O(V × E)", "O(V³)"],
        correct: 2,
        explanation: "Bellman-Ford relaxes all E edges for V-1 passes, taking O(V × E) time.",
      },
      {
        id: "bf-q3",
        difficulty: "Medium",
        question: "How does Bellman-Ford detect negative weight cycles?",
        options: [
          "By running a 1-extra (V-th) relaxation pass; if any distance can still decrease, a negative cycle exists",
          "By checking if total vertex count is even",
          "By sorting edge weights descending",
          "By checking if root distance becomes zero"
        ],
        correct: 0,
        explanation: "Distances stabilize after V-1 passes. If an edge relaxes on pass V, a negative cycle is trapping path values in -Infinity.",
      },
      {
        id: "bf-q4",
        difficulty: "Hard",
        question: "How is Bellman-Ford used in financial currency arbitrage detection?",
        options: [
          "Currency exchange rates are converted using -log(rate); a negative cycle in the graph represents a profitable arbitrage loop!",
          "It counts maximum coins",
          "It predicts future stock prices using linear regression",
          "It sorts bank account numbers"
        ],
        correct: 0,
        explanation: "Multiplying conversion rates $R_1 \\times R_2 > 1$ transforms via $-\\log(R)$ into a negative edge cycle $-\\log(R_1) - \\log(R_2) < 0$.",
      },
    ],
  },

  prim: {
    theory: {
      title: "Prim's Algorithm - Minimum Spanning Tree",
      sections: [
        {
          heading: "What is Prim's Algorithm?",
          content: `Prim's Algorithm is a Greedy algorithm that computes a Minimum Spanning Tree (MST) for a weighted, connected, undirected graph.

An MST is a subset of edges that connects all $V$ vertices together without cycles and with the MINIMUM total edge weight possible.`,
        },
        {
          heading: "Algorithm Mechanics",
          content: `1. Start with an arbitrary vertex in the MST set.
2. Maintain a Min-Priority Queue of edges connecting vertices inside the MST to vertices outside.
3. In each step:
   • Extract minimum weight edge $(u, v)$ from Priority Queue where $v$ is outside MST.
   • Add edge $(u, v)$ and vertex $v$ to MST.
   • Add all edges outgoing from $v$ to outside vertices into Priority Queue.
4. Repeat until MST contains $V - 1$ edges.`,
        },
        {
          heading: "Complexity Analysis",
          content: `• Time Complexity: O(E log V) with Min-Heap Priority Queue.
• Space Complexity: O(V + E).`,
        },
      ],
    },
    patterns: [
      {
        name: "Prim's MST Algorithm",
        description: "Greedy MST growth using Min-Heap",
        timeComplexity: "O(E log V)",
        spaceComplexity: "O(V + E)",
        code: `function primMST(graph, V) {
  const inMST = new Array(V).fill(false);
  const key = new Array(V).fill(Infinity);
  const parent = new Array(V).fill(-1);
  
  key[0] = 0; // Start at vertex 0
  
  for (let count = 0; count < V - 1; count++) {
    // Pick min key vertex not in MST
    let u = -1;
    for (let v = 0; v < V; v++) {
      if (!inMST[v] && (u === -1 || key[v] < key[u])) u = v;
    }
    
    inMST[u] = true;
    
    for (let [v, weight] of graph[u]) {
      if (!inMST[v] && weight < key[v]) {
        parent[v] = u;
        key[v] = weight;
      }
    }
  }
  return parent;
}`,
        useCases: ["LAN network cable layout", "Road grid construction", "Pipeline layout"],
      },
    ],
    questions: [
      {
        id: "prm-q1",
        difficulty: "Easy",
        question: "How many edges does a Minimum Spanning Tree (MST) contain for a connected graph with V vertices?",
        options: ["V", "V - 1", "V + 1", "E / 2"],
        correct: 1,
        explanation: "An MST connects all V vertices with no cycles, requiring exactly V - 1 edges.",
      },
      {
        id: "prm-q2",
        difficulty: "Medium",
        question: "What is the time complexity of Prim's algorithm using a Min-Heap priority queue?",
        options: ["O(V)", "O(E log V)", "O(V²)", "O(V × E)"],
        correct: 1,
        explanation: "Inserting and updating candidate edge keys in a Min-Heap takes O(E log V) total time.",
      },
      {
        id: "prm-q3",
        difficulty: "Medium",
        question: "What is the primary difference between Prim's and Kruskal's MST algorithms?",
        options: [
          "Prim's grows a single connected tree component vertex-by-vertex; Kruskal's sorts all global edges and merges forest components using DSU",
          "Prim's only works on directed graphs",
          "Kruskal's uses DFS queue",
          "Prim's produces maximum spanning trees"
        ],
        correct: 0,
        explanation: "Prim's grows one tree from a starting vertex; Kruskal's processes globally sorted edges across a forest.",
      },
      {
        id: "prm-q4",
        difficulty: "Hard",
        question: "What is the theoretical best time complexity achievable for Prim's algorithm using a Fibonacci Heap?",
        options: ["O(E + V log V)", "O(V²)", "O(E log E)", "O(V)"],
        correct: 0,
        explanation: "Fibonacci Heap supports decrease-key in O(1) amortized time, lowering Prim's bound to O(E + V log V).",
      },
    ],
  },

  kruskal: {
    theory: {
      title: "Kruskal's Algorithm - Disjoint Set MST",
      sections: [
        {
          heading: "What is Kruskal's Algorithm?",
          content: `Kruskal's Algorithm is a Greedy algorithm that finds a Minimum Spanning Tree (MST) for a connected weighted undirected graph.

Instead of growing a single tree, Kruskal's treats every vertex as an independent component and repeatedly connects components using the lightest available edge.`,
        },
        {
          heading: "Algorithm Mechanics",
          content: `1. Sort all edges in non-decreasing order of weight $O(E \\log E)$.
2. Initialize Disjoint Set Union (DSU / Union-Find) with $V$ singleton sets.
3. Iterate through sorted edges $(u, v, w)$:
   • Check if $u$ and $v$ belong to different sets using \`find(u) !== find(v)\`.
   • If true, add edge to MST and merge sets using \`union(u, v)\`.
4. Stop when MST has $V - 1$ edges.`,
        },
        {
          heading: "Disjoint Set Union (DSU) Efficiency",
          content: `With **Path Compression** and **Union by Rank/Size**, DSU operations run in near-constant $O(\\alpha(V))$ amortized time (where $\\alpha$ is the Inverse Ackermann Function, $\\alpha(V) < 5$).`,
        },
        {
          heading: "Complexity Analysis",
          content: `• Time Complexity: O(E log E) or O(E log V) dominated by edge sorting!
• Space Complexity: O(V + E) for DSU arrays and edge list.`,
        },
      ],
    },
    patterns: [
      {
        name: "Disjoint Set Union (Union-Find)",
        description: "DSU with Path Compression and Rank",
        timeComplexity: "O(α(N)) amortized",
        spaceComplexity: "O(N)",
        code: `class DSU {
  constructor(n) {
    this.parent = Array.from({ length: n }, (_, i) => i);
    this.rank = new Array(n).fill(0);
  }
  find(i) {
    if (this.parent[i] === i) return i;
    return this.parent[i] = this.find(this.parent[i]); // Path Compression
  }
  union(i, j) {
    let rootI = this.find(i), rootJ = this.find(j);
    if (rootI !== rootJ) {
      if (this.rank[rootI] < this.rank[rootJ]) [rootI, rootJ] = [rootJ, rootI];
      this.parent[rootJ] = rootI;
      if (this.rank[rootI] === this.rank[rootJ]) this.rank[rootI]++;
      return true;
    }
    return false;
  }
}`,
        useCases: ["Cycle detection", "Connected components", "Kruskal's MST"],
      },
    ],
    questions: [
      {
        id: "kr-q1",
        difficulty: "Easy",
        question: "What data structure is essential for implementing Kruskal's algorithm efficiently?",
        options: ["Disjoint Set Union (DSU / Union-Find)", "Min-Heap", "Stack", "Binary Search Tree"],
        correct: 0,
        explanation: "DSU checks if adding an edge forms a cycle in O(α(V)) time.",
      },
      {
        id: "kr-q2",
        difficulty: "Medium",
        question: "What operation dominates the overall time complexity of Kruskal's algorithm?",
        options: ["Sorting all graph edges by weight", "Finding minimum vertex", "Printing MST", "Initializing arrays"],
        correct: 0,
        explanation: "Sorting E edges takes O(E log E) time, which dominates the fast O(E α(V)) DSU processing loop.",
      },
      {
        id: "kr-q3",
        difficulty: "Medium",
        question: "How does Kruskal's algorithm avoid creating cycles when selecting edges?",
        options: [
          "It uses DSU find() to check if both endpoint vertices already belong to the same connected component",
          "It rejects all negative edge weights",
          "It processes vertices in topological order",
          "It only selects edges connected to root"
        ],
        correct: 0,
        explanation: "If find(u) === find(v), u and v are already connected, so adding edge (u, v) would form a cycle.",
      },
      {
        id: "kr-q4",
        difficulty: "Hard",
        question: "What is the Inverse Ackermann Function value α(N) for any practical real-world value of N (e.g. N = 10⁸⁰)?",
        options: ["α(N) < 5", "α(N) = log N", "α(N) = N", "α(N) = N²"],
        correct: 0,
        explanation: "Inverse Ackermann function grows extremely slowly: α(N) is strictly less than 5 for all physically possible universe sizes.",
      },
    ],
  },
};
