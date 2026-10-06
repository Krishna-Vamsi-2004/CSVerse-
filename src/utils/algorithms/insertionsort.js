/**
 * Generates frames for Insertion Sort.
 * Shows: pick element (comparing), shift right (swapping), insert (sorted grows).
 */
export function generateInsertionSortFrames(arr) {
  const frames = []
  const a = arr.length > 0 ? [...arr] : [5, 3, 8, 1, 9, 2, 7]
  const n = a.length

  // Initial frame
  frames.push({
    elements: a.map((v) => ({ value: v, state: 'default' })),
    description: `Starting Insertion Sort on [${a.join(', ')}]`,
    highlightIndices: [],
  })

  // First element is trivially sorted
  frames.push({
    elements: a.map((v, idx) => ({ value: v, state: idx === 0 ? 'sorted' : 'default' })),
    description: `Element a[0]=${a[0]} is trivially sorted (single element).`,
    highlightIndices: [0],
  })

  for (let i = 1; i < n; i++) {
    const key = a[i]

    // Pick up element
    frames.push({
      elements: a.map((v, idx) => ({
        value: v,
        state: idx < i ? 'sorted' : idx === i ? 'comparing' : 'default',
      })),
      description: `Pick up a[${i}]=${key}. Will insert it into sorted portion [${a.slice(0, i).join(', ')}].`,
      highlightIndices: [i],
    })

    let j = i - 1
    while (j >= 0 && a[j] > key) {
      // Compare and shift
      frames.push({
        elements: a.map((v, idx) => ({
          value: v,
          state: idx === j ? 'comparing' : idx === j + 1 ? 'swapping' : idx < i ? 'sorted' : 'default',
        })),
        description: `a[${j}]=${a[j]} > ${key} — shift a[${j}] one position right.`,
        highlightIndices: [j, j + 1],
      })

      a[j + 1] = a[j]

      frames.push({
        elements: a.map((v, idx) => ({
          value: v,
          state: idx === j + 1 ? 'swapping' : idx < i ? 'sorted' : 'default',
        })),
        description: `Shifted ${a[j + 1]} to position ${j + 1}. Array: [${a.join(', ')}]`,
        highlightIndices: [j + 1],
      })

      j--
    }

    // Insert key at correct position
    a[j + 1] = key

    frames.push({
      elements: a.map((v, idx) => ({
        value: v,
        state: idx <= i ? 'sorted' : 'default',
      })),
      description: `Inserted ${key} at position ${j + 1}. Sorted portion: [${a.slice(0, i + 1).join(', ')}]`,
      highlightIndices: [j + 1],
    })
  }

  // Final frame
  frames.push({
    elements: a.map((v) => ({ value: v, state: 'sorted' })),
    description: `Insertion Sort complete! Sorted array: [${a.join(', ')}]`,
    highlightIndices: [],
  })

  return frames
}
