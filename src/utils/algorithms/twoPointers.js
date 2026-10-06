/**
 * Generates frames for the Two Pointers technique.
 * Finds a pair in a sorted array that sums to a target.
 */
export function generateTwoPointersFrames(arr) {
  const frames = []
  // Ensure the array is sorted
  const a = arr.length > 1 ? [...arr].sort((x, y) => x - y) : [1, 2, 4, 6, 8, 9, 14, 15]
  const n = a.length
  // Pick a target that has a valid pair
  const target = a[1] + a[n - 2]

  // Initial frame
  frames.push({
    elements: a.map((v) => ({ value: v, state: 'default' })),
    description: `Two Pointers: sorted array [${a.join(', ')}]. Target sum = ${target}.`,
    highlightIndices: [],
  })

  let left = 0
  let right = n - 1
  let found = false

  frames.push({
    elements: a.map((v, idx) => ({
      value: v,
      state: idx === left || idx === right ? 'comparing' : 'default',
    })),
    description: `Initialize: left pointer at index 0 (value ${a[left]}), right pointer at index ${n - 1} (value ${a[right]}).`,
    highlightIndices: [left, right],
  })

  while (left < right) {
    const sum = a[left] + a[right]

    frames.push({
      elements: a.map((v, idx) => ({
        value: v,
        state:
          found && (idx === left || idx === right)
            ? 'sorted'
            : idx === left || idx === right
            ? 'comparing'
            : 'default',
      })),
      description: `a[${left}]=${a[left]} + a[${right}]=${a[right]} = ${sum}. Target = ${target}.`,
      highlightIndices: [left, right],
    })

    if (sum === target) {
      found = true
      frames.push({
        elements: a.map((v, idx) => ({
          value: v,
          state: idx === left || idx === right ? 'sorted' : 'default',
        })),
        description: `Found pair! a[${left}]=${a[left]} + a[${right}]=${a[right]} = ${target}. `,
        highlightIndices: [left, right],
      })
      break
    } else if (sum < target) {
      frames.push({
        elements: a.map((v, idx) => ({
          value: v,
          state: idx === left ? 'swapping' : idx === right ? 'comparing' : 'default',
        })),
        description: `${sum} < ${target} — sum too small. Move left pointer right: ${left} → ${left + 1}.`,
        highlightIndices: [left],
      })
      left++
    } else {
      frames.push({
        elements: a.map((v, idx) => ({
          value: v,
          state: idx === left ? 'comparing' : idx === right ? 'swapping' : 'default',
        })),
        description: `${sum} > ${target} — sum too large. Move right pointer left: ${right} → ${right - 1}.`,
        highlightIndices: [right],
      })
      right--
    }
  }

  if (!found) {
    frames.push({
      elements: a.map((v) => ({ value: v, state: 'default' })),
      description: `No pair found that sums to ${target}.`,
      highlightIndices: [],
    })
  }

  return frames
}
