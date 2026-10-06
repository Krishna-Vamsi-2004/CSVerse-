/**
 * Generates frames for the Greedy Activity Selection Problem.
 * Creates activities from arr as durations, assigns start/end times,
 * selects max non-overlapping activities sorted by end time.
 */
export function generateGreedyFrames(arr) {
  const frames = []

  // Build activities: use arr as durations (or use defaults)
  const durations = arr.length > 0 ? arr.slice(0, 7) : [3, 2, 4, 1, 3, 5, 2]

  // Assign start times (staggered so activities overlap in interesting ways)
  const starts = [0, 1, 2, 4, 5, 6, 8]
  const activities = durations.map((dur, i) => ({
    id: i,
    name: `A${i + 1}`,
    start: starts[i] !== undefined ? starts[i] : i * 2,
    end: (starts[i] !== undefined ? starts[i] : i * 2) + dur,
  }))

  // Initial frame — show unsorted activities
  frames.push({
    elements: activities.map((act) => ({
      value: act.id,
      label: `${act.name}[${act.start}-${act.end}]`,
      state: 'default',
    })),
    description: `Activity Selection: ${activities.length} activities. Each shown as [start–end]. Goal: select max non-overlapping activities.`,
    highlightIndices: [],
  })

  // Sort by end time
  const sorted = [...activities].sort((a, b) => a.end - b.end)

  // Show sorting step
  frames.push({
    elements: sorted.map((act) => ({
      value: act.id,
      label: `${act.name}[${act.start}-${act.end}]`,
      state: 'swapping',
    })),
    description: `Sort activities by end time: [${sorted.map((a) => `${a.name}(end=${a.end})`).join(', ')}]. Greedy choice: always pick earliest finishing activity.`,
    highlightIndices: sorted.map((_, i) => i),
  })

  const selected = []
  let lastEnd = -1

  for (let i = 0; i < sorted.length; i++) {
    const act = sorted[i]

    // Show consideration
    frames.push({
      elements: sorted.map((a, idx) => ({
        value: a.id,
        label: `${a.name}[${a.start}-${a.end}]`,
        state: selected.some((s) => s.id === a.id)
          ? 'sorted'
          : idx === i
          ? 'comparing'
          : 'default',
      })),
      description: `Considering ${act.name} [${act.start}–${act.end}]. Last selected activity ends at ${lastEnd}. Start ${act.start} ${act.start >= lastEnd ? '≥' : '<'} ${lastEnd}?`,
      highlightIndices: [i],
    })

    if (act.start >= lastEnd) {
      selected.push(act)
      lastEnd = act.end

      frames.push({
        elements: sorted.map((a) => ({
          value: a.id,
          label: `${a.name}[${a.start}-${a.end}]`,
          state: selected.some((s) => s.id === a.id) ? 'sorted' : 'default',
        })),
        description: `Selected ${act.name} [${act.start}–${act.end}]! No overlap. Total selected: ${selected.length} — [${selected.map((s) => s.name).join(', ')}]`,
        highlightIndices: [sorted.findIndex((a) => a.id === act.id)],
      })
    } else {
      frames.push({
        elements: sorted.map((a) => ({
          value: a.id,
          label: `${a.name}[${a.start}-${a.end}]`,
          state: selected.some((s) => s.id === a.id) ? 'sorted' : 'default',
        })),
        description: `Skipped ${act.name}: overlaps with last selected activity (starts at ${act.start} < lastEnd ${lastEnd}).`,
        highlightIndices: [],
      })
    }
  }

  // Final frame
  frames.push({
    elements: sorted.map((a) => ({
      value: a.id,
      label: `${a.name}[${a.start}-${a.end}]`,
      state: selected.some((s) => s.id === a.id) ? 'sorted' : 'default',
    })),
    description: `Activity Selection complete. Selected ${selected.length} activities: [${selected.map((s) => s.name).join(', ')}].`,
    highlightIndices: [],
  })

  return frames
}
