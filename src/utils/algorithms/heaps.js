/**
 * Generates frames for Max-Heap Build (Heapify).
 * Visualizes the build-max-heap process on a flat array.
 */
export function generateHeapFrames(arr) {
  const frames = []
  const a = arr.length > 0 ? [...arr] : [4, 10, 3, 5, 1, 8, 7]
  const n = a.length
  const settled = new Set()

  function recordFrame(desc, comparingIndices = [], swappingIndices = []) {
    frames.push({
      elements: a.map((v, idx) => ({
        value: v,
        index: idx,
        state: settled.has(idx)
          ? 'sorted'
          : swappingIndices.includes(idx)
          ? 'swapping'
          : comparingIndices.includes(idx)
          ? 'comparing'
          : 'default',
      })),
      description: desc,
      highlightIndices: [...comparingIndices, ...swappingIndices],
    })
  }

  // Initial frame
  recordFrame(`Starting Max-Heap build on [${a.join(', ')}]. Will heapify from last non-leaf node.`)

  function heapify(size, root) {
    let largest = root
    const left = 2 * root + 1
    const right = 2 * root + 2

    recordFrame(
      `Heapify at index ${root} (value ${a[root]}). Checking children at [${left}, ${right}].`,
      [root, left < size ? left : -1, right < size ? right : -1].filter((i) => i >= 0)
    )

    if (left < size && a[left] > a[largest]) {
      recordFrame(
        `Left child a[${left}]=${a[left]} > a[${largest}]=${a[largest]} — new largest is index ${left}`,
        [largest, left]
      )
      largest = left
    }

    if (right < size && a[right] > a[largest]) {
      recordFrame(
        `Right child a[${right}]=${a[right]} > a[${largest}]=${a[largest]} — new largest is index ${right}`,
        [largest, right]
      )
      largest = right
    }

    if (largest !== root) {
      recordFrame(`Swapping a[${root}]=${a[root]} with a[${largest}]=${a[largest]}`, [], [root, largest])
      ;[a[root], a[largest]] = [a[largest], a[root]]
      recordFrame(`After swap: [${a.join(', ')}]`, [], [root, largest])
      heapify(size, largest)
    } else {
      settled.add(root)
      recordFrame(`a[${root}]=${a[root]} is already the largest — heap property satisfied at index ${root}.`, [root])
    }
  }

  // Build max heap: start from last non-leaf node
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i)
  }

  // Mark all as sorted (heap built)
  for (let k = 0; k < n; k++) settled.add(k)
  recordFrame(`Max-Heap built: [${a.join(', ')}]. Root ${a[0]} is the maximum element.`)

  return frames
}
