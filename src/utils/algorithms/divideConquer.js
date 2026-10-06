/**
 * Generates frames for Binary Search via Divide and Conquer.
 * Shows the recursive divide-and-eliminate visualization.
 */
export function generateDivideConquerFrames(arr) {
  const frames = []
  const a = arr.length > 0 ? [...arr].sort((x, y) => x - y) : [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]
  const n = a.length

  // Target: pick a value that exists
  const target = a[Math.floor(n * 0.6)]

  // Track which indices are eliminated
  const eliminated = new Set()

  function recordFrame(desc, comparingIdx = -1, low = 0, high = n - 1) {
    frames.push({
      elements: a.map((v, idx) => ({
        value: v,
        state: eliminated.has(idx)
          ? 'sorted'     // grayed out (eliminated half)
          : idx === comparingIdx
          ? 'comparing'  // midpoint being checked
          : idx >= low && idx <= high
          ? 'default'    // active search space
          : 'idle',
      })),
      description: desc,
      highlightIndices: comparingIdx >= 0 ? [comparingIdx] : [],
    })
  }

  // Initial frame
  recordFrame(
    `Binary Search (Divide & Conquer): find ${target} in sorted array [${a.join(', ')}]. Search space: [0, ${n - 1}].`
  )

  function binarySearch(low, high, depth) {
    if (low > high) {
      recordFrame(`Search space empty — ${target} not found in array.`)
      return
    }

    const mid = Math.floor((low + high) / 2)

    recordFrame(
      `Divide: search space [${low}, ${high}]. Midpoint = index ${mid} (value ${a[mid]}).`,
      mid,
      low,
      high
    )

    if (a[mid] === target) {
      frames.push({
        elements: a.map((v, idx) => ({
          value: v,
          state: eliminated.has(idx) ? 'sorted' : idx === mid ? 'sorted' : 'default',
        })),
        description: `Found! a[${mid}]=${a[mid]} = target ${target}. Search complete in O(log n) steps.`,
        highlightIndices: [mid],
      })
      return
    } else if (target < a[mid]) {
      // Eliminate right half
      recordFrame(
        `${target} < a[${mid}]=${a[mid]}: eliminate RIGHT half [${mid}, ${high}]. Search left half [${low}, ${mid - 1}].`,
        mid,
        low,
        high
      )
      for (let i = mid; i <= high; i++) eliminated.add(i)
      recordFrame(
        `Right half eliminated (shown in gray). Recursing on left half [${low}, ${mid - 1}].`,
        -1,
        low,
        mid - 1
      )
      binarySearch(low, mid - 1, depth + 1)
    } else {
      // Eliminate left half
      recordFrame(
        `${target} > a[${mid}]=${a[mid]}: eliminate LEFT half [${low}, ${mid}]. Search right half [${mid + 1}, ${high}].`,
        mid,
        low,
        high
      )
      for (let i = low; i <= mid; i++) eliminated.add(i)
      recordFrame(
        `Left half eliminated (shown in gray). Recursing on right half [${mid + 1}, ${high}].`,
        -1,
        mid + 1,
        high
      )
      binarySearch(mid + 1, high, depth + 1)
    }
  }

  binarySearch(0, n - 1, 0)

  return frames
}
