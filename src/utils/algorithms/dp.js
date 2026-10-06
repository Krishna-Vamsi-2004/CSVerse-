/**
 * Generates frames for 0/1 Knapsack Dynamic Programming.
 * Uses up to 5 items derived from arr (or defaults).
 * Shows DP table filling cell by cell.
 */
export function generateDPFrames(arr) {
  const frames = []

  // Build items: weight = value, profit = value * 1.5 (rounded)
  const rawVals = arr.length > 0 ? arr.slice(0, 5) : [2, 3, 4, 5, 1]
  const items = rawVals.map((v, i) => ({
    name: `Item${i + 1}`,
    weight: Math.max(1, v % 6 === 0 ? 1 : v % 6),
    profit: Math.max(1, Math.round(v * 1.5)),
  }))

  const capacity = 8
  const n = items.length

  // dp[i][w] = max profit using first i items with capacity w
  const dp = Array.from({ length: n + 1 }, () => Array(capacity + 1).fill(0))

  // Flatten DP table into elements: row i * (capacity+1) + w
  function flatElements(activeI = -1, activeW = -1, filledUpTo = { i: 0, w: -1 }) {
    const elems = []
    for (let i = 0; i <= n; i++) {
      for (let w = 0; w <= capacity; w++) {
        const isActive = i === activeI && w === activeW
        const isFilled =
          i < filledUpTo.i ||
          (i === filledUpTo.i && w <= filledUpTo.w)

        elems.push({
          value: dp[i][w],
          label: `dp[${i}][${w}]`,
          row: i,
          col: w,
          state: isActive ? 'comparing' : isFilled ? 'sorted' : 'idle',
        })
      }
    }
    return elems
  }

  // Initial frame — show empty table
  frames.push({
    elements: flatElements(),
    description: `0/1 Knapsack DP. Items: [${items.map((it) => `${it.name}(w=${it.weight},p=${it.profit})`).join(', ')}]. Capacity=${capacity}. Building ${n + 1}×${capacity + 1} DP table.`,
    highlightIndices: [],
  })

  // Fill the DP table
  for (let i = 1; i <= n; i++) {
    const item = items[i - 1]

    frames.push({
      elements: flatElements(-1, -1, { i: i - 1, w: capacity }),
      description: `Processing ${item.name} (weight=${item.weight}, profit=${item.profit}). Filling row ${i} of DP table.`,
      highlightIndices: [],
    })

    for (let w = 0; w <= capacity; w++) {
      if (item.weight > w) {
        // Cannot include item
        dp[i][w] = dp[i - 1][w]
        frames.push({
          elements: flatElements(i, w, { i, w: w - 1 }),
          description: `dp[${i}][${w}]: ${item.name} (weight ${item.weight}) > capacity ${w}. Cannot include → dp[${i}][${w}] = dp[${i - 1}][${w}] = ${dp[i][w]}.`,
          highlightIndices: [i * (capacity + 1) + w],
        })
      } else {
        // Choose max of including or excluding
        const exclude = dp[i - 1][w]
        const include = dp[i - 1][w - item.weight] + item.profit
        dp[i][w] = Math.max(exclude, include)
        frames.push({
          elements: flatElements(i, w, { i, w: w - 1 }),
          description: `dp[${i}][${w}]: exclude=${exclude}, include=dp[${i-1}][${w - item.weight}]+${item.profit}=${include}. Max → dp[${i}][${w}] = ${dp[i][w]}.`,
          highlightIndices: [i * (capacity + 1) + w],
        })
      }
    }
  }

  // Final frame — highlight optimal value
  const optimal = dp[n][capacity]
  frames.push({
    elements: flatElements(-1, -1, { i: n, w: capacity }),
    description: `Knapsack DP complete! Maximum profit = ${optimal} (dp[${n}][${capacity}]).`,
    highlightIndices: [n * (capacity + 1) + capacity],
  })

  return frames
}
