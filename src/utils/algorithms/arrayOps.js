/**
 * Generates FrameSnapshot[] for an array traversal visualization.
 * @param {number[]} arr
 * @returns {Array<{elements: Array<{value:number, state:string}>, description:string, highlightIndices:number[]}>}
 */
export function generateArrayFrames(arr) {
  const frames = []
  const n = arr.length

  frames.push({
    elements: arr.map((v) => ({ value: v, state: 'default' })),
    description: `Array initialized with ${n} element${n === 1 ? '' : 's'}: [${arr.join(', ')}]`,
    highlightIndices: [],
  })

  for (let i = 0; i < n; i++) {
    frames.push({
      elements: arr.map((v, idx) => ({
        value: v,
        state: idx < i ? 'sorted' : idx === i ? 'comparing' : 'default',
      })),
      description: `Accessing index ${i}: value = ${arr[i]}`,
      highlightIndices: [i],
    })
  }

  frames.push({
    elements: arr.map((v) => ({ value: v, state: 'sorted' })),
    description: `Traversal complete. Visited all ${n} elements.`,
    highlightIndices: [],
  })

  return frames
}
