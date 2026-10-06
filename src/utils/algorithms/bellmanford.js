/**
 * Generates frames for Bellman-Ford Shortest Path Algorithm.
 * 4-node graph with one negative-weight edge.
 */
export function generateBellmanFordFrames(arr) {
  const frames = []

  // Nodes: A, B, C, D
  const nodes = [
    { id: 'A', x: -3, y: 0   },
    { id: 'B', x: 0,  y: 1.5 },
    { id: 'C', x: 0,  y: -1.5},
    { id: 'D', x: 3,  y: 0   },
  ]
  const nodeIds = nodes.map((n) => n.id)

  // Edges (including one negative edge B→C = -2)
  const edges = [
    { from: 'A', to: 'B', w: 6  },
    { from: 'A', to: 'C', w: 7  },
    { from: 'B', to: 'C', w: -2 },
    { from: 'B', to: 'D', w: 5  },
    { from: 'C', to: 'D', w: 3  },
  ]

  const connections = edges.map((e) => ({ from: e.from, to: e.to, weight: e.w }))

  const dist = { A: 0, B: Infinity, C: Infinity, D: Infinity }
  const relaxed = new Set()

  function recordFrame(desc, active = null, updated = null) {
    const distStr = nodeIds.map((id) => `${id}:${dist[id] === Infinity ? '∞' : dist[id]}`).join('  ')
    frames.push({
      elements: nodes.map((n) => ({
        id: n.id,
        value: n.id,
        x: n.x,
        y: n.y,
        dist: dist[n.id] === Infinity ? '∞' : dist[n.id],
        state: n.id === updated
          ? 'swapping'
          : n.id === active
          ? 'comparing'
          : relaxed.has(n.id)
          ? 'sorted'
          : 'idle',
      })),
      description: `${desc} | Distances: [${distStr}]`,
      highlightIndices: active ? [nodes.findIndex((n) => n.id === active)] : [],
      connections,
    })
  }

  // Initial frame
  recordFrame('Bellman-Ford from source A. Initialize: dist[A]=0, all others=∞.')

  // Relax all edges |V|-1 times
  const V = nodeIds.length
  let anyUpdate = false

  for (let pass = 1; pass <= V - 1; pass++) {
    anyUpdate = false
    recordFrame(`Pass ${pass} of ${V - 1}: relaxing all ${edges.length} edges.`)

    for (const edge of edges) {
      const { from, to, w } = edge

      recordFrame(
        `Pass ${pass}: Relax edge ${from}→${to} (weight ${w}). dist[${from}]=${dist[from] === Infinity ? '∞' : dist[from]}, candidate=${dist[from] === Infinity ? '∞' : dist[from] + w}`,
        from
      )

      if (dist[from] !== Infinity && dist[from] + w < dist[to]) {
        const old = dist[to]
        dist[to] = dist[from] + w
        anyUpdate = true
        relaxed.add(to)
        recordFrame(
          `Update dist[${to}]: ${old === Infinity ? '∞' : old} → ${dist[to]} (via ${from} with weight ${w})`,
          from,
          to
        )
      } else {
        recordFrame(`No update: dist[${to}]=${dist[to] === Infinity ? '∞' : dist[to]} already optimal.`)
      }
    }

    if (!anyUpdate) {
      recordFrame(`Pass ${pass}: No updates this pass — algorithm converged early!`)
      break
    }
  }

  // Check for negative cycles
  recordFrame('Checking for negative-weight cycles (one more relaxation pass)...')
  let hasNegCycle = false
  for (const edge of edges) {
    const { from, to, w } = edge
    if (dist[from] !== Infinity && dist[from] + w < dist[to]) {
      hasNegCycle = true
      break
    }
  }

  // Mark all nodes stable
  for (const id of nodeIds) relaxed.add(id)
  const resultStr = nodeIds.map((id) => `${id}=${dist[id] === Infinity ? '∞' : dist[id]}`).join(', ')
  recordFrame(
    hasNegCycle
      ? `Negative cycle detected! Shortest paths may not be reliable.`
      : `Bellman-Ford complete. No negative cycles. Shortest distances from A: [${resultStr}]`
  )

  return frames
}
