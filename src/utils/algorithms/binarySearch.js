/**
 * Generates frames for Binary Search.
 * @param {number[]} initialData 
 */
export function generateBinarySearchFrames(initialData) {
  const frames = []
  // Sort data first as binary search requires sorted array
  const arr = [...initialData].sort((a, b) => a - b)
  const target = arr[Math.floor(Math.random() * arr.length)]

  let low = 0
  let high = arr.length - 1

  frames.push({
    elements: arr.map(v => ({ value: v, state: 'idle' })),
    description: `Binary Search: Searching for ${target} in sorted array.`,
    highlightIndices: []
  })

  while (low <= high) {
    const mid = Math.floor((low + high) / 2)
    frames.push({
      elements: arr.map((v, idx) => ({
        value: v,
        state: idx === mid ? 'comparing' : (idx >= low && idx <= high ? 'idle' : 'sorted')
      })),
      description: `Target ${target} vs Mid ${arr[mid]} (at index ${mid}). range: [${low}, ${high}]`,
      highlightIndices: [low, mid, high]
    })

    if (arr[mid] === target) {
      frames.push({
        elements: arr.map((v, idx) => ({
          value: v,
          state: idx === mid ? 'sorted' : 'idle'
        })),
        description: `Found ${target} at index ${mid}!`,
        highlightIndices: [mid]
      })
      break
    } else if (arr[mid] < target) {
      const oldLow = low
      low = mid + 1
      frames.push({
        elements: arr.map((v, idx) => ({
          value: v,
          state: (idx < low) ? 'sorted' : (idx > high ? 'sorted' : 'idle')
        })),
        description: `${arr[mid]} < ${target}, narrowing search to Right half [${low}, ${high}]`,
        highlightIndices: [low, high]
      })
    } else {
      const oldHigh = high
      high = mid - 1
      frames.push({
        elements: arr.map((v, idx) => ({
          value: v,
          state: (idx < low) ? 'sorted' : (idx > high ? 'sorted' : 'idle')
        })),
        description: `${arr[mid]} > ${target}, narrowing search to Left half [${low}, ${high}]`,
        highlightIndices: [low, high]
      })
    }
  }

  return frames
}
