/**
 * Generates frames for Selection Sort.
 * @param {number[]} initialData 
 */
export function generateSelectionSortFrames(initialData) {
  const frames = []
  const arr = [...initialData]
  const n = arr.length

  const getElements = () => arr.map((v) => ({ value: v, state: 'idle' }))

  frames.push({
    elements: getElements(),
    description: 'Starting Selection Sort: Find the minimum element in the unsorted part.',
    highlightIndices: []
  })

  for (let i = 0; i < n - 1; i++) {
    let minIdx = i
    frames.push({
      elements: arr.map((v, idx) => ({ 
        value: v, 
        state: idx === i ? 'comparing' : (idx < i ? 'sorted' : 'idle') 
      })),
      description: `New pass: Assume index ${i} is the minimum.`,
      highlightIndices: [i]
    })

    for (let j = i + 1; j < n; j++) {
      frames.push({
        elements: arr.map((v, idx) => ({ 
          value: v, 
          state: idx === j ? 'comparing' : (idx === minIdx ? 'swapping' : (idx < i ? 'sorted' : 'idle'))
        })),
        description: `Comparing elements at index ${minIdx} and ${j}.`,
        highlightIndices: [minIdx, j]
      })

      if (arr[j] < arr[minIdx]) {
        minIdx = j
        frames.push({
          elements: arr.map((v, idx) => ({ 
            value: v, 
            state: idx === minIdx ? 'swapping' : (idx < i ? 'sorted' : 'idle')
          })),
          description: `New minimum found: ${arr[minIdx]} at index ${minIdx}.`,
          highlightIndices: [minIdx]
        })
      }
    }

    if (minIdx !== i) {
      frames.push({
        elements: arr.map((v, idx) => ({ 
          value: v, 
          state: (idx === i || idx === minIdx) ? 'swapping' : (idx < i ? 'sorted' : 'idle')
        })),
        description: `Swapping ${arr[i]} and ${arr[minIdx]}.`,
        highlightIndices: [i, minIdx]
      })
      const temp = arr[i]
      arr[i] = arr[minIdx]
      arr[minIdx] = temp
    }

    frames.push({
      elements: arr.map((v, idx) => ({ 
        value: v, 
        state: idx <= i ? 'sorted' : 'idle' 
      })),
      description: `Index ${i} is now sorted.`,
      highlightIndices: [i]
    })
  }

  frames.push({
    elements: arr.map(v => ({ value: v, state: 'sorted' })),
    description: 'Selection Sort complete!',
    highlightIndices: []
  })

  return frames
}
