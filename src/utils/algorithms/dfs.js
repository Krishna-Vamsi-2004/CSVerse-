/**
 * Generates frames for Graph DFS (Depth-First Search).
 * Uses the same graph structure as graphOps.js (nodes A-F).
 * Stack-based DFS visualization.
 */
export function generateDFSFrames(arr) {
  const frames = []

  // Same graph as graphOps.js
  const graph = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F'],
    D: [],
    E: ['F'],
    F: [],
  }

  const connections = Object.entries(graph).flatMap(([u, vs]) =>
    vs.map((v) => ({ from: u, to: v }))
  )

  const nodes = [
    { id: 'A', x: 0,    y: 0    },
    { id: 'B', x: -2,   y: -1.5 },
    { id: 'C', x: 2,    y: -1.5 },
    { id: 'D', x: -3,   y: -3   },
    { id: 'E', x: -1,   y: -3   },
    { id: 'F', x: 1.5,  y: -3.2 },
  ]

  const visited = new Set()
  const stack = []
  const visitOrder = []

  function recordFrame(desc, current = null, inStack = []) {
    frames.push({
      elements: nodes.map((n) => ({
        id: n.id,
        value: n.id,
        x: n.x,
        y: n.y,
        state: n.id === current
          ? 'swapping'           // currently visiting
          : visitOrder.includes(n.id)
          ? 'sorted'             // fully visited/backtracked
          : inStack.includes(n.id)
          ? 'comparing'          // in the stack (pending)
          : 'idle',
      })),
      description: desc,
      highlightIndices: current ? [nodes.findIndex((n) => n.id === current)] : [],
      connections,
    })
  }

  // Initial frame
  recordFrame('Starting DFS from node A. Stack: []')

  // Iterative DFS using explicit stack
  stack.push('A')
  recordFrame(`Push A onto stack. Stack: [${stack.join(', ')}]`, null, [...stack])

  while (stack.length > 0) {
    const u = stack[stack.length - 1]

    if (!visited.has(u)) {
      visited.add(u)
      recordFrame(`Visit node ${u}. Stack: [${stack.join(', ')}] | Visited: ${[...visited].join(' → ')}`, u, [...stack])
      visitOrder.push(u)

      // Push unvisited neighbors in reverse order so we explore in original order
      const neighbors = [...graph[u]].reverse()
      let pushed = []
      for (const v of neighbors) {
        if (!visited.has(v)) {
          stack.push(v)
          pushed.push(v)
        }
      }
      if (pushed.length > 0) {
        recordFrame(
          `Push neighbors of ${u}: [${pushed.join(', ')}] onto stack. Stack: [${stack.join(', ')}]`,
          u,
          [...stack]
        )
      }
    } else {
      // Backtrack — pop already visited
      stack.pop()
      recordFrame(
        `Backtrack: ${u} already visited. Pop from stack. Stack: [${stack.join(', ')}]`,
        u,
        [...stack]
      )
    }
  }

  // Final frame
  frames.push({
    elements: nodes.map((n) => ({
      id: n.id,
      value: n.id,
      x: n.x,
      y: n.y,
      state: 'sorted',
    })),
    description: `DFS complete. Traversal order: ${visitOrder.join(' → ')}`,
    highlightIndices: [],
    connections,
  })

  return frames
}
