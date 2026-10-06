/**
 * Generates frames for Dijkstra's Shortest Path Algorithm.
 * Small weighted graph: 5 nodes A-E with hardcoded edges and weights.
 */
export function generateDijkstraFrames(arr) {
  const frames = []

  // Graph: adjacency list with weights
  const graph = {
    A: [{ to: 'B', w: 4 }, { to: 'C', w: 2 }],
    B: [{ to: 'C', w: 1 }, { to: 'D', w: 5 }],
    C: [{ to: 'B', w: 1 }, { to: 'D', w: 8 }, { to: 'E', w: 10 }],
    D: [{ to: 'E', w: 2 }],
    E: [],
  }

  const connections = Object.entries(graph).flatMap(([u, edges]) =>
    edges.map((e) => ({ from: u, to: e.to, weight: e.w }))
  )

  const nodes = [
    { id: 'A', x: -3,  y: 0   },
    { id: 'B', x: 0,   y: 1.5 },
    { id: 'C', x: 0,   y: -1.5},
    { id: 'D', x: 3,   y: 1.5 },
    { id: 'E', x: 3,   y: -1.5},
  ]
  const nodeIds = nodes.map((n) => n.id)

  const dist = { A: 0, B: Infinity, C: Infinity, D: Infinity, E: Infinity }
  const finalized = new Set()
  const prev = {}

  function recordFrame(desc, active = null, updating = null) {
    const distStr = nodeIds.map((id) => `${id}:${dist[id] === Infinity ? '∞' : dist[id]}`).join('  ')
    frames.push({
      elements: nodes.map((n) => ({
        id: n.id,
        value: n.id,
        x: n.x,
        y: n.y,
        dist: dist[n.id] === Infinity ? '∞' : dist[n.id],
        state: finalized.has(n.id)
          ? 'sorted'
          : n.id === updating
          ? 'swapping'
          : n.id === active
          ? 'comparing'
          : 'idle',
      })),
      description: `${desc} | Distances: [${distStr}]`,
      highlightIndices: active ? [nodes.findIndex((n) => n.id === active)] : [],
      connections,
    })
  }

  // Initial frame
  recordFrame('Dijkstra from source A. All distances = ∞ except A = 0.', 'A')

  // Simple priority queue (sorted array)
  const unvisited = new Set(nodeIds)

  while (unvisited.size > 0) {
    // Pick node with minimum distance from unvisited
    let u = null
    let minDist = Infinity
    for (const id of unvisited) {
      if (dist[id] < minDist) {
        minDist = dist[id]
        u = id
      }
    }

    if (u === null || dist[u] === Infinity) break

    unvisited.delete(u)
    finalized.add(u)
    recordFrame(`Finalize node ${u} with distance ${dist[u]}. Exploring its neighbors...`, u)

    for (const edge of graph[u]) {
      const v = edge.to
      const newDist = dist[u] + edge.w

      recordFrame(
        `Relax edge ${u}→${v} (weight ${edge.w}): current dist[${v}]=${dist[v] === Infinity ? '∞' : dist[v]}, candidate=${newDist}`,
        u,
        null
      )

      if (newDist < dist[v]) {
        const oldDist = dist[v]
        dist[v] = newDist
        prev[v] = u
        recordFrame(
          `Update dist[${v}]: ${oldDist === Infinity ? '∞' : oldDist} → ${newDist} (via ${u})`,
          u,
          v
        )
      } else {
        recordFrame(`No update for ${v}: existing dist ${dist[v]} ≤ candidate ${newDist}.`, u)
      }
    }
  }

  // Final frame
  const pathStr = nodeIds.map((id) => `${id}=${dist[id] === Infinity ? '∞' : dist[id]}`).join(', ')
  frames.push({
    elements: nodes.map((n) => ({
      id: n.id,
      value: n.id,
      x: n.x,
      y: n.y,
      dist: dist[n.id] === Infinity ? '∞' : dist[n.id],
      state: 'sorted',
    })),
    description: `Dijkstra complete. Shortest distances from A: [${pathStr}]`,
    highlightIndices: [],
    connections,
  })

  return frames
}
