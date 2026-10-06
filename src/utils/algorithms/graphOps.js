/**
 * Generates frames for Graph BFS Traversal.
 */
export function generateGraphFrames(initialData) {
  const frames = []
  
  // Hardcoded graph structure for visualization
  const graph = {
    'A': ['B', 'C'],
    'B': ['D', 'E'],
    'C': ['F'],
    'D': [],
    'E': ['F'],
    'F': []
  }

  const nodes = [
    { id: 'A', x: 0, y: 0 },
    { id: 'B', x: -2, y: -1.5 },
    { id: 'C', x: 2, y: -1.5 },
    { id: 'D', x: -3, y: -3 },
    { id: 'E', x: -1, y: -3 },
    { id: 'F', x: 1.5, y: -3.2 }
  ]

  const visited = new Set()
  const queue = ['A']
  const processed = []

  function recordFrame(desc, current = null) {
    frames.push({
      elements: nodes.map(n => ({
        id: n.id,
        value: n.id,
        x: n.x,
        y: n.y,
        state: n.id === current ? 'comparing' : (processed.includes(n.id) ? 'sorted' : 'idle')
      })),
      description: desc,
      highlightIndices: nodes.findIndex(n => n.id === current) !== -1 ? [nodes.findIndex(n => n.id === current)] : [],
      connections: Object.entries(graph).flatMap(([u, vs]) => vs.map(v => ({ from: u, to: v })))
    })
  }

  frames.push({
    elements: nodes.map(n => ({ ...n, value: n.id, state: 'idle' })),
    description: 'Starting BFS from node A.',
    connections: Object.entries(graph).flatMap(([u, vs]) => vs.map(v => ({ from: u, to: v })))
  })

  visited.add('A')
  while (queue.length > 0) {
    const u = queue.shift()
    recordFrame(`Processing node ${u}. Exploring neighbors...`, u)
    
    for (const v of graph[u]) {
      if (!visited.has(v)) {
        visited.add(v)
        queue.push(v)
        recordFrame(`Found neighbor ${v} of ${u}, adding to queue.`, v)
      }
    }
    processed.push(u)
    recordFrame(`Finished node ${u}. Current visited order: ${processed.join(' → ')}`, u)
  }

  return frames
}
