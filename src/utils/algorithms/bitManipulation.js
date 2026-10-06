/**
 * Generates frames for Bit Manipulation operations.
 * Shows 8-bit representation of a number and AND, OR, XOR, LEFT SHIFT operations.
 */
export function generateBitManipulationFrames(arr) {
  const frames = []
  const num = arr.length > 0 && arr[0] >= 0 ? arr[0] & 0xFF : 42
  const mask = 0b00001111  // 15 — lower nibble mask

  function toBits(value, bits = 8) {
    return Array.from({ length: bits }, (_, i) => (value >> (bits - 1 - i)) & 1)
  }

  function bitsToElements(bits, operandBits = null, resultBits = null, opIndices = []) {
    return bits.map((bit, idx) => ({
      value: bit,
      index: idx,
      bitPos: 7 - idx,
      operand: operandBits ? operandBits[idx] : null,
      result: resultBits ? resultBits[idx] : null,
      state: opIndices.includes(idx) ? 'comparing' : 'default',
    }))
  }

  const numBits = toBits(num)
  const maskBits = toBits(mask)

  // Initial frame — show original number's bits
  frames.push({
    elements: numBits.map((bit, idx) => ({
      value: bit,
      index: idx,
      bitPos: 7 - idx,
      state: 'default',
    })),
    description: `Bit Manipulation: number = ${num} (decimal) = ${num.toString(2).padStart(8, '0')} (binary). Showing 8-bit representation.`,
    highlightIndices: [],
  })

  // Show mask
  frames.push({
    elements: maskBits.map((bit, idx) => ({
      value: bit,
      index: idx,
      bitPos: 7 - idx,
      state: bit === 1 ? 'comparing' : 'idle',
    })),
    description: `Mask = ${mask} = ${mask.toString(2).padStart(8, '0')} (lower 4 bits set). Used for AND, OR, XOR operations.`,
    highlightIndices: maskBits.map((b, i) => b === 1 ? i : -1).filter((i) => i >= 0),
  })

  // AND operation
  const andResult = num & mask
  const andBits = toBits(andResult)
  frames.push({
    elements: numBits.map((bit, idx) => ({
      value: bit,
      index: idx,
      bitPos: 7 - idx,
      state: 'comparing',
    })),
    description: `AND operation: ${num} & ${mask} = ${andResult}. Rule: 1 AND 1 = 1, else 0.`,
    highlightIndices: Array.from({ length: 8 }, (_, i) => i),
  })
  frames.push({
    elements: andBits.map((bit, idx) => ({
      value: bit,
      index: idx,
      bitPos: 7 - idx,
      state: bit === 1 ? 'sorted' : 'idle',
    })),
    description: `AND result: ${num.toString(2).padStart(8,'0')} & ${mask.toString(2).padStart(8,'0')} = ${andResult.toString(2).padStart(8,'0')} (= ${andResult}). Keeps only bits set in mask.`,
    highlightIndices: andBits.map((b, i) => b === 1 ? i : -1).filter((i) => i >= 0),
  })

  // OR operation
  const orResult = num | mask
  const orBits = toBits(orResult)
  frames.push({
    elements: numBits.map((bit, idx) => ({
      value: bit,
      index: idx,
      bitPos: 7 - idx,
      state: 'comparing',
    })),
    description: `OR operation: ${num} | ${mask} = ${orResult}. Rule: 0 OR 0 = 0, else 1.`,
    highlightIndices: Array.from({ length: 8 }, (_, i) => i),
  })
  frames.push({
    elements: orBits.map((bit, idx) => ({
      value: bit,
      index: idx,
      bitPos: 7 - idx,
      state: bit === 1 ? 'sorted' : 'idle',
    })),
    description: `OR result: ${num.toString(2).padStart(8,'0')} | ${mask.toString(2).padStart(8,'0')} = ${orResult.toString(2).padStart(8,'0')} (= ${orResult}). Sets all bits that are 1 in either number.`,
    highlightIndices: orBits.map((b, i) => b === 1 ? i : -1).filter((i) => i >= 0),
  })

  // XOR operation
  const xorResult = num ^ mask
  const xorBits = toBits(xorResult)
  frames.push({
    elements: numBits.map((bit, idx) => ({
      value: bit,
      index: idx,
      bitPos: 7 - idx,
      state: 'comparing',
    })),
    description: `XOR operation: ${num} ^ ${mask} = ${xorResult}. Rule: same bits = 0, different bits = 1. Flips bits set in mask.`,
    highlightIndices: Array.from({ length: 8 }, (_, i) => i),
  })
  frames.push({
    elements: xorBits.map((bit, idx) => ({
      value: bit,
      index: idx,
      bitPos: 7 - idx,
      state: bit === 1 ? 'sorted' : 'idle',
    })),
    description: `XOR result: ${num.toString(2).padStart(8,'0')} ^ ${mask.toString(2).padStart(8,'0')} = ${xorResult.toString(2).padStart(8,'0')} (= ${xorResult}).`,
    highlightIndices: xorBits.map((b, i) => b === 1 ? i : -1).filter((i) => i >= 0),
  })

  // Left shift by 1
  const shiftResult = (num << 1) & 0xFF
  const shiftBits = toBits(shiftResult)
  frames.push({
    elements: numBits.map((bit, idx) => ({
      value: bit,
      index: idx,
      bitPos: 7 - idx,
      state: idx > 0 ? 'swapping' : 'comparing',
    })),
    description: `LEFT SHIFT: ${num} << 1. Each bit moves one position left (multiplies by 2). MSB is lost.`,
    highlightIndices: Array.from({ length: 8 }, (_, i) => i),
  })
  frames.push({
    elements: shiftBits.map((bit, idx) => ({
      value: bit,
      index: idx,
      bitPos: 7 - idx,
      state: bit === 1 ? 'sorted' : 'idle',
    })),
    description: `Left Shift result: ${num.toString(2).padStart(8,'0')} << 1 = ${shiftResult.toString(2).padStart(8,'0')} (= ${shiftResult}). Value doubled from ${num} to ${shiftResult}.`,
    highlightIndices: shiftBits.map((b, i) => b === 1 ? i : -1).filter((i) => i >= 0),
  })

  // Summary frame
  frames.push({
    elements: numBits.map((bit, idx) => ({
      value: bit,
      index: idx,
      bitPos: 7 - idx,
      state: 'sorted',
    })),
    description: `Bit Manipulation summary for ${num}: AND=${andResult}, OR=${orResult}, XOR=${xorResult}, LEFT_SHIFT=${shiftResult}.`,
    highlightIndices: [],
  })

  return frames
}
