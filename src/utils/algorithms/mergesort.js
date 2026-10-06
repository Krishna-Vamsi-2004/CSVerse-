/**
 * Generates frames for Merge Sort.
 * Shows divide and merge phases on a flat array.
 */
export function generateMergeSortFrames(arr) {
  const frames = []
  const a = arr.length > 0 ? [...arr] : [6, 3, 8, 1, 5, 2, 7, 4]
  const n = a.length

  // Track states per index
  let states = Array(n).fill('default')

  function recordFrame(desc, highlight = []) {
    frames.push({
      elements: a.map((v, idx) => ({ value: v, state: states[idx] })),
      description: desc,
      highlightIndices: highlight,
    })
  }

  // Initial frame
  recordFrame(`Starting Merge Sort on [${a.join(', ')}]`)

  function merge(left, mid, right) {
    const leftArr = a.slice(left, mid + 1)
    const rightArr = a.slice(mid + 1, right + 1)
    let i = 0, j = 0, k = left

    recordFrame(
      `Merging [${leftArr.join(', ')}] and [${rightArr.join(', ')}] (indices ${left}..${mid} and ${mid + 1}..${right})`,
      Array.from({ length: right - left + 1 }, (_, x) => left + x)
    )

    while (i < leftArr.length && j < rightArr.length) {
      // Mark both candidates as comparing
      for (let x = left; x <= right; x++) states[x] = 'comparing'
      recordFrame(
        `Comparing ${leftArr[i]} (left) vs ${rightArr[j]} (right)`,
        [left + i, mid + 1 + j]
      )

      if (leftArr[i] <= rightArr[j]) {
        a[k] = leftArr[i]
        states[k] = 'swapping'
        recordFrame(`${leftArr[i]} ≤ ${rightArr[j]} — place ${leftArr[i]} at position ${k}`, [k])
        i++
      } else {
        a[k] = rightArr[j]
        states[k] = 'swapping'
        recordFrame(`${rightArr[j]} < ${leftArr[i]} — place ${rightArr[j]} at position ${k}`, [k])
        j++
      }
      k++
    }

    while (i < leftArr.length) {
      a[k] = leftArr[i]
      states[k] = 'swapping'
      recordFrame(`Placing remaining left element ${leftArr[i]} at position ${k}`, [k])
      i++; k++
    }

    while (j < rightArr.length) {
      a[k] = rightArr[j]
      states[k] = 'swapping'
      recordFrame(`Placing remaining right element ${rightArr[j]} at position ${k}`, [k])
      j++; k++
    }

    // Mark merged range as sorted
    for (let x = left; x <= right; x++) states[x] = 'sorted'
    recordFrame(
      `Merged range [${left}..${right}]: [${a.slice(left, right + 1).join(', ')}]`,
      Array.from({ length: right - left + 1 }, (_, x) => left + x)
    )
  }

  function mergeSort(left, right, depth) {
    if (left >= right) {
      states[left] = 'sorted'
      recordFrame(`Base case: single element a[${left}]=${a[left]} is trivially sorted.`, [left])
      return
    }

    const mid = Math.floor((left + right) / 2)

    // Mark dividing range as comparing
    for (let x = left; x <= right; x++) states[x] = 'comparing'
    recordFrame(
      `Divide [${a.slice(left, right + 1).join(', ')}] → left half [${left}..${mid}] and right half [${mid + 1}..${right}]`,
      Array.from({ length: right - left + 1 }, (_, x) => left + x)
    )

    mergeSort(left, mid, depth + 1)
    mergeSort(mid + 1, right, depth + 1)
    merge(left, mid, right)
  }

  mergeSort(0, n - 1, 0)

  // Final frame
  frames.push({
    elements: a.map((v) => ({ value: v, state: 'sorted' })),
    description: `Merge Sort complete! Sorted array: [${a.join(', ')}]`,
    highlightIndices: [],
  })

  return frames
}
