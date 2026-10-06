/**
 * Generates frames for Hash Table Insertion.
 * Uses a table of size 7, hash function: value % 7.
 */
export function generateHashTableFrames(arr) {
  const frames = []
  const values = arr.length > 0 ? arr.slice(0, 8) : [15, 7, 22, 3, 11, 30, 4]
  const TABLE_SIZE = 7

  // Table slots: indices 0-6
  const table = Array.from({ length: TABLE_SIZE }, (_, i) => ({
    value: i,       // bucket slot index used as 'value' for positioning
    label: 'empty',
    state: 'idle',
  }))

  function recordFrame(desc, highlightBucket = -1, insertedBucket = -1) {
    frames.push({
      elements: table.map((slot, idx) => ({
        value: slot.value,
        label: slot.label,
        state: idx === insertedBucket
          ? 'sorted'
          : idx === highlightBucket
          ? 'comparing'
          : slot.label !== 'empty'
          ? 'sorted'
          : 'idle',
      })),
      description: desc,
      highlightIndices: highlightBucket >= 0 ? [highlightBucket] : [],
    })
  }

  // Initial frame
  recordFrame('Hash Table of size 7 initialized. All buckets empty. Hash function: h(v) = v % 7')

  for (const v of values) {
    const bucket = v % TABLE_SIZE

    // Show hashing step
    recordFrame(`Hashing value ${v}: h(${v}) = ${v} % 7 = ${bucket} → target bucket ${bucket}`, bucket)

    // Handle collision (simple linear probing)
    let probe = bucket
    let attempts = 0
    while (table[probe].label !== 'empty' && attempts < TABLE_SIZE) {
      recordFrame(
        `Bucket ${probe} is occupied (${table[probe].label}). Probing next bucket with linear probing...`,
        probe
      )
      probe = (probe + 1) % TABLE_SIZE
      attempts++
    }

    if (table[probe].label === 'empty') {
      table[probe].label = String(v)
      recordFrame(`Inserted value ${v} into bucket ${probe}.`, -1, probe)
    } else {
      recordFrame(`Table full! Could not insert value ${v}.`, bucket)
    }
  }

  // Final state
  frames.push({
    elements: table.map((slot) => ({
      value: slot.value,
      label: slot.label,
      state: slot.label !== 'empty' ? 'sorted' : 'idle',
    })),
    description: `Hash Table insertion complete. ${values.length} value(s) inserted into ${TABLE_SIZE} buckets.`,
    highlightIndices: [],
  })

  return frames
}
