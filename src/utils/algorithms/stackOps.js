/**
 * Generates frames for Stack operations (Push and Pop).
 * @param {number[]} initialData 
 */
export function generateStackFrames(initialData) {
  const frames = []
  const stack = [...initialData]

  // Frame 0: Initial state
  frames.push({
    elements: stack.map((v) => ({ value: v, state: 'idle' })),
    description: `Current stack has ${stack.length} elements.`,
    highlightIndices: []
  })

  // Simulate Push
  const newVal = Math.floor(Math.random() * 100)
  frames.push({
    elements: [...stack.map(v => ({ value: v, state: 'idle' })), { value: newVal, state: 'swapping' }],
    description: `Pushing ${newVal} onto the stack.`,
    highlightIndices: [stack.length]
  })
  
  stack.push(newVal)
  frames.push({
    elements: stack.map(v => ({ value: v, state: 'idle' })),
    description: `${newVal} is now at the top of the stack.`,
    highlightIndices: [stack.length - 1]
  })

  // Simulate Pop
  if (stack.length > 0) {
    const popped = stack[stack.length - 1]
    frames.push({
      elements: stack.map((v, i) => ({ 
        value: v, 
        state: i === stack.length - 1 ? 'comparing' : 'idle' 
      })),
      description: `Popping element from the top: ${popped}.`,
      highlightIndices: [stack.length - 1]
    })
    
    stack.pop()
    frames.push({
      elements: stack.map(v => ({ value: v, state: 'idle' })),
      description: `${popped} removed. New top is ${stack.length > 0 ? stack[stack.length - 1] : 'none'}.`,
      highlightIndices: []
    })
  }

  return frames
}
