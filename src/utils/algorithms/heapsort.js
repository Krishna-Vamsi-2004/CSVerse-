/**
 * Generates frames for Heap Sort.
 * Phase 1: Build max heap. Phase 2: Extract max repeatedly.
 */
export function generateHeapSortFrames(arr) {
  const frames = []
  const a = arr.length > 0 ? [...arr] : [4, 10, 3, 5, 1, 8, 7]
  const n = a.length
  const sortedIndices = new Set()

  function recordFrame(desc, comparing = [], swapping = []) {
    frames.push({
      elements: a.map((v, idx) => ({
        value: v,
        state: sortedIndices.has(idx)
          ? 'sorted'
          : swapping.includes(idx)
          ? 'swapping'
          : comparing.includes(idx)
          ? 'comparing'
          : 'default',
      })),
      description: desc,
      highlightIndices: [...comparing, ...swapping],
    })
  }

  // Initial frame
  recordFrame(`Starting Heap Sort on [${a.join(', ')}]. Step 1: Build Max Heap.`)

  function heapify(size, root) {
    let largest = root
    const left = 2 * root + 1
    const right = 2 * root + 2

    if (left < size && a[left] > a[largest]) largest = left
    if (right < size && a[right] > a[largest]) largest = right

    recordFrame(
      `Heapify at root=${root} (val=${a[root]}): largest is index ${largest} (val=${a[largest]})`,
      [root, left < size ? left : -1, right < size ? right : -1].filter((i) => i >= 0)
    )

    if (largest !== root) {
      recordFrame(`Swap a[${root}]=${a[root]} ↔ a[${largest}]=${a[largest]}`, [], [root, largest])
      ;[a[root], a[largest]] = [a[largest], a[root]]
      recordFrame(`After swap: [${a.join(', ')}]`, [], [root, largest])
      heapify(size, largest)
    }
  }

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i)
  }
  recordFrame(`Max Heap built: [${a.join(', ')}]. Root ${a[0]} is maximum. Step 2: Extract max repeatedly.`)

  // Extract elements from heap
  for (let end = n - 1; end > 0; end--) {
    recordFrame(`Extract max: swap root a[0]=${a[0]} with last unsorted a[${end}]=${a[end]}`, [], [0, end])
    ;[a[0], a[end]] = [a[end], a[0]]
    sortedIndices.add(end)
    recordFrame(
      `${a[end]} placed at sorted position ${end}. Heap size reduced to ${end}. Re-heapifying...`,
      [],
      [0, end]
    )
    heapify(end, 0)
    recordFrame(`Heap after re-heapify: [${a.slice(0, end).join(', ')}] | Sorted: [${a.slice(end).join(', ')}]`)
  }

  sortedIndices.add(0)
  frames.push({
    elements: a.map((v) => ({ value: v, state: 'sorted' })),
    description: `Heap Sort complete! Sorted array: [${a.join(', ')}]`,
    highlightIndices: [],
  })

  return frames
}
