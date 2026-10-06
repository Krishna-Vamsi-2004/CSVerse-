/**
 * Generates an array of FrameSnapshot objects representing each step of Bubble Sort.
 * @param {number[]} arr - Input array
 * @returns {Array<{elements: Array<{value:number, state:string}>, description:string, highlightIndices:number[]}>}
 */
export function generateBubbleSortFrames(arr) {
  const frames = []
  const a = [...arr]
  const n = a.length

  // Initial frame — show the unsorted array
  frames.push({
    elements: a.map((v) => ({ value: v, state: 'default' })),
    description: `Starting Bubble Sort on [${a.join(', ')}]`,
    highlightIndices: [],
  })

  const sortedIndices = new Set()

  for (let pass = 0; pass < n - 1; pass++) {
    let swapped = false
    for (let j = 0; j < n - 1 - pass; j++) {
      // Comparing frame
      frames.push({
        elements: a.map((v, idx) => ({
          value: v,
          state: sortedIndices.has(idx)
            ? 'sorted'
            : idx === j || idx === j + 1
            ? 'comparing'
            : 'default',
        })),
        description: `Pass ${pass + 1}: Comparing ${a[j]} and ${a[j + 1]}`,
        highlightIndices: [j, j + 1],
      })

      if (a[j] > a[j + 1]) {
        // Swap
        ;[a[j], a[j + 1]] = [a[j + 1], a[j]]
        swapped = true

        frames.push({
          elements: a.map((v, idx) => ({
            value: v,
            state: sortedIndices.has(idx)
              ? 'sorted'
              : idx === j || idx === j + 1
              ? 'swapping'
              : 'default',
          })),
          description: `Pass ${pass + 1}: Swapped ${a[j + 1]} and ${a[j]} → [${a.join(', ')}]`,
          highlightIndices: [j, j + 1],
        })
      } else {
        frames.push({
          elements: a.map((v, idx) => ({
            value: v,
            state: sortedIndices.has(idx) ? 'sorted' : 'default',
          })),
          description: `Pass ${pass + 1}: ${a[j]} ≤ ${a[j + 1]}, no swap needed`,
          highlightIndices: [],
        })
      }
    }

    // Mark the last unsorted element as sorted after each pass
    sortedIndices.add(n - 1 - pass)

    if (!swapped) {
      // Mark all remaining as sorted
      for (let k = 0; k < n - pass - 1; k++) sortedIndices.add(k)
      frames.push({
        elements: a.map((v) => ({ value: v, state: 'sorted' })),
        description: `Array is sorted! Final result: [${a.join(', ')}]`,
        highlightIndices: [],
      })
      break
    }
  }

  // Ensure final frame shows everything sorted
  if (sortedIndices.size < n) {
    for (let k = 0; k < n; k++) sortedIndices.add(k)
    frames.push({
      elements: a.map((v) => ({ value: v, state: 'sorted' })),
      description: `Bubble Sort complete! Sorted array: [${a.join(', ')}]`,
      highlightIndices: [],
    })
  }

  return frames
}
