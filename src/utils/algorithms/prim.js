/**
 * Generates frames for Prim's Minimum Spanning Tree Algorithm.
 * 5-node undirected weighted graph.
 */
export function generatePrimFrames(arr) {
  const frames = []

  const nodes = [
    { id: 'A', x: 0,    y: 0    },
    { id: 'B', x: -2,   y: -1.5 },
    { id: 'C', x: 2,    y: -1.5 },
    { id: 'D', x: -1,   y: -3   },
    { id: 'E', x: 1,    y: -3   },
  ]
  const nodeIds = nodes.map((n) => n.id)

  // Undirected weighted edges
  const allEdges = [
    { u: 'A', v: 'B', w: 2 },
    { u: 'A', v: 'C', w: 3 },
    { u: 'B', v: 'C', w: 1 },
    { u: 'B', v: 'D', w: 4 },
    { u: 'C', v: 'E', w: 5 },
    { u: 'D', v: 'E', w: 6 },
  ]

  const mstEdges = []
  const inMST = new Set()

  function getConnections() {
    return allEdges.map((e) => {
      const isMST = mstEdges.some(
        (m) => (m.u === e.u && m.v === e.v) || (m.u === e.v && m.v === e.u)
      )
      return { from: e.u, to: e.v, weight: e.w, mst: isMST }
    })
  }

  function recordFrame(desc, activeNodes = [], updatingNodes = []) {
    frames.push({
      elements: nodes.map((n) => ({
        id: n.id,
        value: n.id,
        x: n.x,
        y: n.y,
        state: updatingNodes.includes(n.id)
          ? 'swapping'
          : activeNodes.includes(n.id)
          ? 'comparing'
          : inMST.has(n.id)
          ? 'sorted'
          : 'idle',
      })),
      description: desc,
      highlightIndices: activeNodes.map((id) => nodes.findIndex((n) => n.id === id)).filter((i) => i >= 0),
      connections: getConnections(),
    })
  }

  // Start from node A
  inMST.add('A')
  recordFrame('Prim\'s MST: Start from node A (added to MST). Finding minimum cost edges to expand MST.', ['A'])

  while (inMST.size < nodeIds.length) {
    // Find minimum weight edge connecting MST to non-MST vertex
    let minEdge = null
    let minWeight = Infinity

    for (const edge of allEdges) {
      const uInMST = inMST.has(edge.u)
      const vInMST = inMST.has(edge.v)
      if (uInMST !== vInMST) {
        // One endpoint in MST, other is not
        recordFrame(
          `Candidate edge ${edge.u}–${edge.v} (weight ${edge.w}): connects MST to non-MST vertex.`,
          [edge.u, edge.v]
        )
        if (edge.w < minWeight) {
          minWeight = edge.w
          minEdge = edge
        }
      }
    }

    if (!minEdge) break

    // Add the minimum edge to MST
    const newNode = inMST.has(minEdge.u) ? minEdge.v : minEdge.u
    recordFrame(
      `Selected minimum edge ${minEdge.u}–${minEdge.v} (weight ${minEdge.w}). Adding ${newNode} to MST.`,
      [minEdge.u, minEdge.v],
      [newNode]
    )

    mstEdges.push(minEdge)
    inMST.add(newNode)
    recordFrame(
      `Node ${newNode} added to MST. MST nodes: [${[...inMST].join(', ')}]. MST edges: ${mstEdges.length}.`,
      [],
      [...inMST]
    )
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
    description: `Prim's MST complete. MST edges: [${edgeStr}]. Total weight: ${totalWeight}.`,
    highlightIndices: [],
    connections: getConnections(),
  })

  return frames
}
