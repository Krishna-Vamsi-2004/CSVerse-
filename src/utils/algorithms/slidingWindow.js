/**
 * Generates frames for Sliding Window Maximum Subarray Sum (window size k=3).
 */
export function generateSlidingWindowFrames(arr) {
  const frames = []
  const a = arr.length >= 3 ? [...arr] : [2, 1, 5, 1, 3, 2, 7, 4]
  const n = a.length
  const k = 3

  // Initial frame
  frames.push({
    elements: a.map((v) => ({ value: v, state: 'default' })),
    description: `Sliding Window: find max subarray sum of size k=${k} in [${a.join(', ')}]`,
    highlightIndices: [],
  })

  // Compute first window
  let windowSum = a.slice(0, k).reduce((s, v) => s + v, 0)
  let maxSum = windowSum
  let bestStart = 0

  frames.push({
    elements: a.map((v, idx) => ({
      value: v,
      state: idx < k ? 'comparing' : 'default',
    })),
    description: `First window [${a.slice(0, k).join(', ')}]: sum = ${windowSum}.`,
    highlightIndices: Array.from({ length: k }, (_, i) => i),
  })

  for (let i = k; i < n; i++) {
    // Slide the window: remove leftmost, add new element
    const removed = a[i - k]
    const added = a[i]
    const prevSum = windowSum
    windowSum = windowSum - removed + added

    frames.push({
      elements: a.map((v, idx) => ({
        value: v,
        state:
          idx === i - k
            ? 'swapping'                         // leaving window
            : idx > i - k && idx <= i
            ? 'comparing'                        // in window
            : 'default',
      })),
      description: `Slide window: remove ${removed} (index ${i - k}), add ${added} (index ${i}). New sum = ${prevSum} - ${removed} + ${added} = ${windowSum}.`,
      highlightIndices: Array.from({ length: k }, (_, j) => i - k + 1 + j),
    })

    if (windowSum > maxSum) {
      maxSum = windowSum
      bestStart = i - k + 1

      frames.push({
        elements: a.map((v, idx) => ({
          value: v,
          state: idx >= bestStart && idx < bestStart + k ? 'sorted' : 'default',
        })),
        description: `New maximum sum ${maxSum} found! Window [${a.slice(bestStart, bestStart + k).join(', ')}] at indices ${bestStart}–${bestStart + k - 1}.`,
        highlightIndices: Array.from({ length: k }, (_, j) => bestStart + j),
      })
    }
  }

  // Final frame — highlight best window
  frames.push({
    elements: a.map((v, idx) => ({
      value: v,
      state: idx >= bestStart && idx < bestStart + k ? 'sorted' : 'default',
    })),
    description: `Sliding Window complete. Maximum sum = ${maxSum} from window [${a.slice(bestStart, bestStart + k).join(', ')}] at index ${bestStart}.`,
    highlightIndices: Array.from({ length: k }, (_, j) => bestStart + j),
  })

  return frames
}
