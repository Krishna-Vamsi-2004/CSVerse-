/**
 * Generates FrameSnapshot[] for a linked list traversal visualization.
 * @param {number[]} nodes - Array of node values representing the linked list
 * @returns {Array<{elements: Array<{value:number, state:string}>, description:string, highlightIndices:number[]}>}
 */
export function generateLinkedListFrames(nodes) {
  const frames = []
  const n = nodes.length

  frames.push({
    elements: nodes.map((v) => ({ value: v, state: 'default' })),
    description: `Linked List created with ${n} node${n === 1 ? '' : 's'}: ${nodes.map((v, i) => `[${v}]${i < n - 1 ? ' → ' : ''}`).join('')}`,
    highlightIndices: [],
  })

  for (let i = 0; i < n; i++) {
    const isHead = i === 0
    const isTail = i === n - 1
    frames.push({
      elements: nodes.map((v, idx) => ({
        value: v,
        state: idx < i ? 'sorted' : idx === i ? 'comparing' : 'default',
      })),
      description: `Visiting node ${i + 1}${isHead ? ' (Head)' : isTail ? ' (Tail)' : ''}: value = ${nodes[i]}`,
      highlightIndices: [i],
    })

    if (!isTail) {
      frames.push({
        elements: nodes.map((v, idx) => ({
          value: v,
          state: idx <= i ? 'sorted' : idx === i + 1 ? 'comparing' : 'default',
        })),
        description: `Following pointer from node ${i + 1} → node ${i + 2}`,
        highlightIndices: [i, i + 1],
      })
    }
  }

  frames.push({
    elements: nodes.map((v) => ({ value: v, state: 'sorted' })),
    description: `Traversal complete. Visited all ${n} nodes. Reached end of list (NULL pointer).`,
    highlightIndices: [],
  })

  return frames
}
