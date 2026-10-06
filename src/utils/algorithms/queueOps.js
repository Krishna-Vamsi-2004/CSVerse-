/**
 * Generates frames for Queue operations (Enqueue and Dequeue).
 * @param {number[]} initialData 
 */
export function generateQueueFrames(initialData) {
  const frames = []
  const queue = [...initialData]

  // Frame 0: Initial state
  frames.push({
    elements: queue.map((v) => ({ value: v, state: 'idle' })),
    description: `Current queue has ${queue.length} elements. Front is ${queue[0]}, Rear is ${queue[queue.length-1]}.`,
    highlightIndices: []
  })

  // Simulate Enqueue
  const newVal = Math.floor(Math.random() * 100)
  frames.push({
    elements: [...queue.map(v => ({ value: v, state: 'idle' })), { value: newVal, state: 'swapping' }],
    description: `Enqueuing ${newVal} at the rear.`,
    highlightIndices: [queue.length]
  })
  
  queue.push(newVal)
  frames.push({
    elements: queue.map(v => ({ value: v, state: 'idle' })),
    description: `${newVal} added. New rear is ${newVal}.`,
    highlightIndices: [queue.length - 1]
  })

  // Simulate Dequeue
  if (queue.length > 0) {
    const dequeued = queue[0]
    frames.push({
      elements: queue.map((v, i) => ({ 
        value: v, 
        state: i === 0 ? 'comparing' : 'idle' 
      })),
      description: `Dequeuing from the front: ${dequeued}.`,
      highlightIndices: [0]
    })
    
    queue.shift()
    frames.push({
      elements: queue.map(v => ({ value: v, state: 'idle' })),
      description: `${dequeued} removed. New front is ${queue.length > 0 ? queue[0] : 'none'}.`,
      highlightIndices: []
    })
  }

  return frames
}
