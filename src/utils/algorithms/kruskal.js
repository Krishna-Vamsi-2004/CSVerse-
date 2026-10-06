/**
 * Generates frames for Kruskal's Minimum Spanning Tree Algorithm.
 * Sorts edges by weight, adds non-cycle edges greedily.
 */
export function generateKruskalFrames(arr) {
  const frames = []

  const nodes = [
    { id: 'A', x: 0,    y: 0    },
    { id: 'B', x: -2,   y: -1.5 },
    { id: 'C', x: 2,    y: -1.5 },
    { id: 'D', x: -1,   y: -3   },
    { id: 'E', x: 1,    y: -3   },
  ]
  const nodeIds = nodes.map((n) => n.id)

  // All edges
  const allEdges = [
    { u: 'A', v: 'B', w: 2 },
    { u: 'B', v: 'C', w: 1 },
    { u: 'A', v: 'C', w: 3 },
    { u: 'B', v: 'D', w: 4 },
    { u: 'C', v: 'E', w: 5 },
    { u: 'D', v: 'E', w: 6 },
  ]

  // Union-Find (Disjoint Set Union)
  const parent = {}
  const rank = {}
  nodeIds.forEach((id) => { parent[id] = id; rank[id] = 0 })

  function find(x) {
    if (parent[x] !== x) parent[x] = find(parent[x])
    return parent[x]
  }

  function union(x, y) {
    const px = find(x), py = find(y)
    if (px === py) return false
    if (rank[px] < rank[py]) parent[px] = py
    else if (rank[px] > rank[py]) parent[py] = px
    else { parent[py] = px; rank[px]++ }
    return true
  }

  const mstEdges = []
  const rejectedEdges = []

  function getConnections() {
    return [
      ...mstEdges.map((e) => ({ from: e.u, to: e.v, weight: e.w, mst: true })),
      ...rejectedEdges.map((e) => ({ from: e.u, to: e.v, weight: e.w, mst: false })),
    ]
  }

  function recordFrame(desc, active = [], accepted = []) {
    frames.push({
      elements: nodes.map((n) => ({
        id: n.id,
        value: n.id,
        x: n.x,
        y: n.y,
        state: accepted.includes(n.id)
          ? 'swapping'
          : active.includes(n.id)
          ? 'comparing'
          : mstEdges.some((e) => e.u === n.id || e.v === n.id)
          ? 'sorted'
          : 'idle',
      })),
      description: desc,
      highlightIndices: active.map((id) => nodes.findIndex((n) => n.id === id)).filter((i) => i >= 0),
      connections: getConnections(),
    })
  }

  // Sort edges by weight
  const sortedEdges = [...allEdges].sort((a, b) => a.w - b.w)

  recordFrame(
    `Kruskal's MST: Sort all edges by weight: [${sortedEdges.map((e) => `${e.u}-${e.v}(${e.w})`).join(', ')}]`
  )

  for (const edge of sortedEdges) {
    recordFrame(
      `Considering edge ${edge.u}–${edge.v} (weight ${edge.w}). Will it form a cycle?`,
      [edge.u, edge.v]
    )

    const accepted = union(edge.u, edge.v)

    if (accepted) {
      mstEdges.push(edge)
      recordFrame(
        `Edge ${edge.u}–${edge.v} accepted (no cycle). MST now has ${mstEdges.length} edge(s).`,
        [],
        [edge.u, edge.v]
      )
    } else {
      rejectedEdges.push(edge)
      recordFrame(
        `Edge ${edge.u}–${edge.v} rejected — would form a cycle! Skip it.`,
        [edge.u, edge.v]
      )
    }

    if (mstEdges.length === nodeIds.length - 1) break
  }

  const totalWeight = mstEdges.reduce((s, e) => s + e.w, 0)
  const edgeStr = mstEdges.map((e) => `${e.u}-${e.v}(${e.w})`).join(', ')

  frames.push({
    elements: nodes.map((n) => ({
      id: n.id,
      value: n.id,
      x: n.x,
      y: n.y,
      state: 'sorted',
    })),
    description: `Kruskal's MST complete. MST edges: [${edgeStr}]. Total weight: ${totalWeight}.`,
    highlightIndices: [],
    connections: getConnections(),
  })

  return frames
}
