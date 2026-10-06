/**
 * Generates frames for Tree Traversal (In-order).
 * @param {number[]} initialData 
 */
export function generateTreeTraversalFrames(initialData) {
  const frames = []
  
  class Node {
    constructor(value, x, y) {
      this.value = value
      this.x = x
      this.y = y
      this.left = null
      this.right = null
    }
  }

  const nodes = []
  let root = null

  function insert(value) {
    if (!root) { root = new Node(value, 0, 0); nodes.push(root); return }
    let curr = root
    let depth = 0
    while (curr) {
      if (value < curr.value) {
        if (!curr.left) { curr.left = new Node(value, curr.x - (4/Math.pow(2, depth)), (depth+1)*-1.5); nodes.push(curr.left); return }
        curr = curr.left
      } else {
        if (!curr.right) { curr.right = new Node(value, curr.x + (4/Math.pow(2, depth)), (depth+1)*-1.5); nodes.push(curr.right); return }
        curr = curr.right
      }
      depth++
    }
  }

  initialData.forEach(v => insert(v))

  const traversed = []
  function inorder(node) {
    if (!node) return
    
    recordFrame(`Visiting Left subtree of ${node.value}`, node)
    inorder(node.left)
    
    traversed.push(node.value)
    recordFrame(`Processed ${node.value}. Path: ${traversed.join(' → ')}`, node, true)
    
    recordFrame(`Visiting Right subtree of ${node.value}`, node)
    inorder(node.right)
  }

  function recordFrame(desc, highlightNode, isProcessed = false) {
    frames.push({
      elements: nodes.map(n => ({
        value: n.value,
        x: n.x,
        y: n.y,
        state: n === highlightNode ? (isProcessed ? 'sorted' : 'comparing') : (traversed.includes(n.value) ? 'sorted' : 'idle')
      })),
      description: desc,
      highlightIndices: highlightNode ? [nodes.indexOf(highlightNode)] : []
    })
  }

  frames.push({
    elements: nodes.map(n => ({ value: n.value, x: n.x, y: n.y, state: 'idle' })),
    description: 'Starting In-order Traversal (Left → Root → Right)',
    highlightIndices: []
  })

  inorder(root)

  frames.push({
    elements: nodes.map(n => ({ value: n.value, x: n.x, y: n.y, state: 'sorted' })),
    description: `In-order Traversal complete: ${traversed.join(', ')}`,
    highlightIndices: []
  })

  return frames
}
