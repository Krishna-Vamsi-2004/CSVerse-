/**
 * Generates frames for String Pattern Matching (Naive Algorithm).
 * @param {number[]} arr - char codes for a string in the format [textCharCodes..., 0, patternCharCodes...]
 *   If arr is empty or not provided, defaults to searching "LO" in "HELLO WORLD".
 *   InputPanel sends: text char codes joined by a special separator (charCode 0).
 *   If no separator is found, treats the whole arr as the text and uses default pattern "LO".
 */
export function generateStringFrames(arr) {
  const frames = []

  // Decode arr: if it contains a 0 separator, split into text and pattern
  let text, pattern
  const sepIdx = arr.indexOf(0)
  if (arr.length > 0 && sepIdx > 0) {
    text    = arr.slice(0, sepIdx).map(c => String.fromCharCode(c)).join('')
    pattern = arr.slice(sepIdx + 1).map(c => String.fromCharCode(c)).join('') || 'LO'
  } else if (arr.length > 0) {
    text    = arr.map(c => String.fromCharCode(c)).join('')
    pattern = 'LO'
  } else {
    text    = 'HELLO WORLD'
    pattern = 'LO'
  }

  const textChars = text.split('')
  const n = textChars.length
  const m = pattern.length

  if (m === 0 || n === 0) {
    frames.push({
      elements: [{ value: '?', state: 'idle' }],
      description: 'Enter a valid text to visualize.',
      highlightIndices: [],
    })
    return frames
  }

  frames.push({
    elements: textChars.map(ch => ({ value: ch, state: 'idle' })),
    description: `Naive pattern matching: searching for "${pattern}" in "${text}"`,
    highlightIndices: [],
  })

  const matchPositions = new Set()

  for (let i = 0; i <= n - m; i++) {
    frames.push({
      elements: textChars.map((ch, idx) => ({
        value: ch,
        state: matchPositions.has(idx) ? 'sorted' : (idx >= i && idx < i + m ? 'comparing' : 'default'),
      })),
      description: `Window at position ${i}: checking "${text.slice(i, i + m)}" vs "${pattern}"`,
      highlightIndices: Array.from({ length: m }, (_, k) => i + k),
    })

    let matched = true
    for (let j = 0; j < m; j++) {
      const isMatch = textChars[i + j] === pattern[j]
      frames.push({
        elements: textChars.map((ch, idx) => ({
          value: ch,
          state: matchPositions.has(idx)
            ? 'sorted'
            : idx === i + j
            ? (isMatch ? 'comparing' : 'swapping')
            : idx >= i && idx < i + m ? 'comparing' : 'default',
        })),
        description: isMatch
          ? `Match: '${textChars[i + j]}' == '${pattern[j]}'`
          : `Mismatch: '${textChars[i + j]}' != '${pattern[j]}' — shift window`,
        highlightIndices: [i + j],
      })
      if (!isMatch) { matched = false; break }
    }

    if (matched) {
      for (let k = i; k < i + m; k++) matchPositions.add(k)
      frames.push({
        elements: textChars.map((ch, idx) => ({
          value: ch,
          state: matchPositions.has(idx) ? 'sorted' : 'default',
        })),
        description: `Pattern "${pattern}" found at index ${i}!`,
        highlightIndices: Array.from({ length: m }, (_, k) => i + k),
      })
    }
  }

  frames.push({
    elements: textChars.map((ch, idx) => ({
      value: ch,
      state: matchPositions.has(idx) ? 'sorted' : 'default',
    })),
    description: matchPositions.size > 0
      ? `Search complete. "${pattern}" found ${matchPositions.size / m} time(s).`
      : `Search complete. "${pattern}" not found in "${text}".`,
    highlightIndices: [],
  })

  return frames
}
