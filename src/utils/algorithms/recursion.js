/**
 * Generates frames for Factorial Recursion visualization.
 * Shows the call stack: push frame (comparing), base case (sorted), return/pop (swapping).
 */
export function generateRecursionFrames(arr) {
  const frames = []
  const n = arr.length > 0 && arr[0] > 0 ? Math.min(arr[0], 7) : 5

  // Call stack representation
  const callStack = []

  function recordFrame(desc, activeIdx = -1) {
    frames.push({
      elements: callStack.map((frame, idx) => ({
        value: frame.n,
        label: frame.label,
        result: frame.result,
        state:
          idx === activeIdx
            ? frame.result !== null
              ? frame.n === 0 || frame.n === 1
                ? 'sorted'  // base case
                : 'swapping' // returning
              : 'comparing' // being called
            : frame.result !== null
            ? 'sorted'
            : 'idle',
      })),
      description: desc,
      highlightIndices: activeIdx >= 0 ? [activeIdx] : [],
    })
  }

  // Initial frame
  frames.push({
    elements: [],
    description: `Factorial recursion: computing fact(${n}). Call stack starts empty.`,
    highlightIndices: [],
  })

  // Build up the call stack (recursive calls)
  for (let i = n; i >= 0; i--) {
    callStack.push({ n: i, label: `fact(${i})`, result: null })
    const idx = callStack.length - 1

    if (i === 0 || i === 1) {
      // Base case
      callStack[idx].result = 1
      recordFrame(
        `Base case reached: fact(${i}) = 1. Start returning up the call stack.`,
        idx
      )
    } else {
      recordFrame(
        `Call fact(${i}): push frame onto stack. Waiting for fact(${i - 1}) to return.`,
        idx
      )
    }
  }

  // Unwind the stack (return values)
  let result = 1
  for (let i = 1; i <= n; i++) {
    const stackIdx = callStack.length - 1 - i
    if (stackIdx < 0) break
    const prevResult = result
    result = callStack[callStack.length - i].n === 0 ? 1 : i * result
    callStack[stackIdx].result = result

    recordFrame(
      `Return from fact(${i}): fact(${i}) = ${i} × fact(${i - 1}) = ${i} × ${prevResult} = ${result}. Pop frame.`,
      stackIdx
    )
  }

  // Final answer
  const factorial = callStack[0] ? callStack[0].result : 1
  frames.push({
    elements: [{ value: n, label: `fact(${n})`, result: factorial, state: 'sorted' }],
    description: `Recursion complete! fact(${n}) = ${factorial}. All stack frames resolved.`,
    highlightIndices: [0],
  })

  return frames
}
