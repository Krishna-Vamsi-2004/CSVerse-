/**
 * Generates frames for Quick Sort (Lomuto Partition).
 * @param {number[]} initialData 
 */
export function generateQuickSortFrames(initialData) {
  const frames = []
  const arr = [...initialData]

  function recordFrame(desc, low, high, pivotIdx, i, j) {
    frames.push({
      elements: arr.map((v, idx) => {
        let state = 'idle'
        if (idx === pivotIdx) state = 'swapping' // Pivot color
        else if (idx === i || idx === j) state = 'comparing'
        else if (idx >= low && idx <= high) state = 'idle'
        else state = 'sorted' // Simplified: nodes outside current range are "sorted" for visual focus
        return { value: v, state }
      }),
      description: desc,
      highlightIndices: [i, j, pivotIdx].filter(x => x !== -1)
    })
  }

  async function quickSort(low, high) {
    if (low < high) {
      const pi = await partition(low, high)
      await quickSort(low, pi - 1)
      await quickSort(pi + 1, high)
    } else if (low === high) {
      // mark as sorted
    }
  }

  async function partition(low, high) {
    const pivot = arr[high]
    recordFrame(`Choosing pivot: ${pivot} at index ${high}`, low, high, high, -1, -1)
    let i = low - 1

    for (let j = low; j < high; j++) {
      recordFrame(`Comparing ${arr[j]} with pivot ${pivot}`, low, high, high, i, j)
      if (arr[j] < pivot) {
        i++
        const temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
        recordFrame(`Swapping ${arr[i]} and ${arr[j]} (element < pivot)`, low, high, high, i, j)
      }
    }
    const temp = arr[i + 1]
    arr[i + 1] = arr[high]
    arr[high] = temp
    recordFrame(`Placing pivot at its correct position (index ${i+1})`, low, high, i+1, -1, -1)
    return i + 1
  }

  // Need to use a non-async version for synchronous frame generation
  function quickSortSync(low, high) {
    if (low < high) {
      const pivot = arr[high]
      recordFrame(`Sub-array [${low}...${high}]: choosing pivot ${pivot}`, low, high, high, -1, -1)
      
      let i = low - 1
      for (let j = low; j < high; j++) {
        recordFrame(`Comparing ${arr[j]} with pivot ${pivot}`, low, high, high, i, j)
        if (arr[j] < pivot) {
          i++
          const temp = arr[i]
          arr[i] = arr[j]
          arr[j] = temp
          recordFrame(`${arr[i]} < ${pivot}, swapping to index ${i}`, low, high, high, i, j)
        }
      }
      const temp = arr[i + 1]
      arr[i + 1] = arr[high]
      arr[high] = temp
      recordFrame(`Pivot ${pivot} moved to final position ${i+1}`, low, high, i+1, -1, -1)
      
      quickSortSync(low, i)
      quickSortSync(i + 2, high)
    }
  }

  quickSortSync(0, arr.length - 1)
  
  frames.push({
    elements: arr.map(v => ({ value: v, state: 'sorted' })),
    description: 'Quick Sort complete!',
    highlightIndices: []
  })

  return frames
}
