// src/data/staticQuestions.js

/** @type {Record<string, Array<{id:string, text:string, options:string[], correctIndex:number, explanation:string, isVisual:boolean}>>} */
export const STATIC_QUESTIONS = {
  arrays: [
    { id: 'arr-1', text: 'What is the time complexity of accessing an element in an array by index?', options: ['O(n)', 'O(log n)', 'O(1)', 'O(n²)'], correctIndex: 2, explanation: 'Array elements are stored in contiguous memory, so index access is O(1) — constant time.', isVisual: false },
    { id: 'arr-2', text: 'What is the time complexity of inserting an element at the beginning of an array?', options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'], correctIndex: 2, explanation: 'Inserting at the beginning requires shifting all existing elements one position to the right — O(n).', isVisual: false },
    { id: 'arr-3', text: 'Which of the following is NOT a characteristic of an array?', options: ['Fixed size (in most languages)', 'Elements stored in contiguous memory', 'Dynamic resizing by default', 'Random access in O(1)'], correctIndex: 2, explanation: 'Standard arrays have a fixed size. Dynamic resizing is a feature of dynamic arrays (like ArrayList), not basic arrays.', isVisual: false },
    { id: 'arr-4', text: 'What is the index of the last element in an array of size n?', options: ['n', 'n-1', 'n+1', '0'], correctIndex: 1, explanation: 'Arrays are zero-indexed. The first element is at index 0 and the last is at index n-1.', isVisual: false },
    { id: 'arr-5', text: 'What is the time complexity of searching for an element in an unsorted array?', options: ['O(1)', 'O(log n)', 'O(n log n)', 'O(n)'], correctIndex: 3, explanation: 'Linear search through an unsorted array requires checking each element — O(n) in the worst case.', isVisual: false },
  ],
  linkedlist: [
    { id: 'll-1', text: 'What is the time complexity of inserting a node at the head of a singly linked list?', options: ['O(n)', 'O(log n)', 'O(n²)', 'O(1)'], correctIndex: 3, explanation: 'Inserting at the head only requires updating the head pointer — O(1) constant time.', isVisual: false },
    { id: 'll-2', text: 'Which of the following requires O(n) time in a singly linked list?', options: ['Insert at head', 'Access element by index', 'Get head node value', 'Check if list is empty'], correctIndex: 1, explanation: 'To access an element by index, you must traverse from the head — O(n) time.', isVisual: false },
    { id: 'll-3', text: 'What does the "next" pointer of the last node in a singly linked list point to?', options: ['The head node', 'Itself', 'NULL / None', 'The previous node'], correctIndex: 2, explanation: 'The last node (tail) has its next pointer set to NULL to indicate the end of the list.', isVisual: false },
    { id: 'll-4', text: 'Compared to arrays, what is a key advantage of linked lists?', options: ['Faster random access', 'Less memory usage', 'Efficient insertion and deletion at head', 'Better cache performance'], correctIndex: 2, explanation: 'Linked lists allow O(1) insertion/deletion at the head without shifting elements, unlike arrays.', isVisual: false },
    { id: 'll-5', text: 'In a doubly linked list, each node contains:', options: ['Only a data field', 'Data and one pointer (next)', 'Data, a next pointer, and a previous pointer', 'Only two pointers'], correctIndex: 2, explanation: 'A doubly linked list node has data plus two pointers: one to the next node and one to the previous node.', isVisual: false },
  ],
  bubblesort: [
    { id: 'bs-1', text: 'What is the worst-case time complexity of Bubble Sort?', options: ['O(n)', 'O(log n)', 'O(n log n)', 'O(n²)'], correctIndex: 3, explanation: 'Bubble Sort has O(n²) worst-case time complexity due to its nested loops comparing adjacent elements.', isVisual: false },
    { id: 'bs-2', text: 'What is the best-case time complexity of an optimized Bubble Sort (with early exit)?', options: ['O(n²)', 'O(n log n)', 'O(n)', 'O(log n)'], correctIndex: 2, explanation: 'With the "swapped" flag optimization, an already-sorted array only requires one pass — O(n).', isVisual: false },
    { id: 'bs-3', text: 'After the first complete pass of Bubble Sort, what is guaranteed?', options: ['The entire array is sorted', 'The smallest element is at index 0', 'The largest element is at the last index', 'No swaps occurred'], correctIndex: 2, explanation: 'After each pass, the largest unsorted element "bubbles up" to its correct position at the end.', isVisual: false },
    { id: 'bs-4', text: 'How many comparisons does Bubble Sort make in the worst case for an array of 5 elements?', options: ['5', '10', '20', '25'], correctIndex: 1, explanation: 'For n=5: (n-1) + (n-2) + ... + 1 = 4+3+2+1 = 10 comparisons.', isVisual: false },
    { id: 'bs-5', text: 'Is Bubble Sort a stable sorting algorithm?', options: ['No, it swaps equal elements', 'Yes, equal elements maintain their relative order', 'It depends on the implementation', 'Only for integers'], correctIndex: 1, explanation: 'Bubble Sort is stable — it only swaps elements when one is strictly greater than the other, preserving the order of equal elements.', isVisual: false },
  ],
}

/**
 * Get fallback static questions for a given topic.
 * @param {string} topicId
 * @returns {Array}
 */
export function getStaticQuestions(topicId) {
  return STATIC_QUESTIONS[topicId] ?? STATIC_QUESTIONS.arrays
}
