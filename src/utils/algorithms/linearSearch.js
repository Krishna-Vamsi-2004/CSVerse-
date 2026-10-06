/**
 * Generates frames for Linear Search.
 * Searches for a random target in arr.
 */
export function generateLinearSearchFrames(arr) {
  const frames = []
  const a = arr.length > 0 ? [...arr] : [5, 3, 8, 1, 9, 2, 7, 4]
  const n = a.length

  // Pick a target that exists in the array
  const target = a[Math.floor(n / 2)]

  // Initial frame
  frames.push({
    elements: a.map((v) => ({ value: v, state: 'default' })),
    description: `Linear Search: looking for target value ${target} in [${a.join(', ')}]`,
    highlightIndices: [],
  })

  let foundIdx = -1

  for (let i = 0; i < n; i++) {
    // Comparing current element
    frames.push({
      elements: a.map((v, idx) => ({
        value: v,
        state: idx < i ? 'default' : idx === i ? 'comparing' : 'default',
      })),
      description: `Checking a[${i}]=${a[i]} — is it equal to target ${target}?`,
      highlightIndices: [i],
    })

    if (a[i] === target) {
      foundIdx = i
      frames.push({
        elements: a.map((v, idx) => ({
          value: v,
          state: idx === i ? 'sorted' : 'default',
        })),
        description: `Found! a[${i}]=${a[i]} equals target ${target}. Search complete at index ${i}.`,
        highlightIndices: [i],
      })
      break
    } else {
      frames.push({
        elements: a.map((v, idx) => ({
          value: v,
          state: idx < i ? 'default' : 'default',
        })),
        description: `a[${i}]=${a[i]} ≠ ${target}. Move to next element.`,
        highlightIndices: [],
      })
    }
  }

  if (foundIdx === -1) {
    frames.push({
      elements: a.map((v) => ({ value: v, state: 'default' })),
      description: `Target ${target} not found in the array after checking all ${n} elements.`,
      highlightIndices: [],
    })
  }

  return frames
}
