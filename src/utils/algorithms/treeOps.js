/**
 * Generates frames for BST Insertion.
 * @param {number[]} initialData 
 */
export function generateTreeFrames(initialData) {
  const frames = []
  const values = [...initialData]
  
  // Minimal tree node structure for visualization
  class Node {
    constructor(value, x, y, level) {
      this.value = value
      this.x = x
      this.y = y
      this.level = level
      this.left = null
      this.right = null
    }
  }

  const nodes = []
  let root = null

  function insert(value) {
    if (!root) {
      root = new Node(value, 0, 0, 0)
      nodes.push(root)
      recordFrame(`Inserted root node ${value}`)
      return
    }

    let curr = root
    let depth = 0
    while (curr) {
      recordFrame(`Comparing ${value} with ${curr.value}`, curr)
      if (value < curr.value) {
        if (!curr.left) {
          const xOffset = 4 / Math.pow(2, depth)
          curr.left = new Node(value, curr.x - xOffset, curr.y - 1.5, depth + 1)
          nodes.push(curr.left)
          recordFrame(`Inserted ${value} to the left of ${curr.value}`)
          return
        }
        curr = curr.left
      } else {
        if (!curr.right) {
          const xOffset = 4 / Math.pow(2, depth)
          curr.right = new Node(value, curr.x + xOffset, curr.y - 1.5, depth + 1)
          nodes.push(curr.right)
          recordFrame(`Inserted ${value} to the right of ${curr.value}`)
          return
        }
        curr = curr.right
      }
      depth++
    }
  }

  function recordFrame(desc, highlightNode = null) {
    frames.push({
      elements: nodes.map(n => ({
        value: n.value,
        x: n.x,
        y: n.y,
        state: n === highlightNode ? 'comparing' : 'idle'
      })),
      description: desc,
      highlightIndices: highlightNode ? [nodes.indexOf(highlightNode)] : []
    })
  }

  // Generate frames for each value insertion
  values.forEach(v => insert(v))

  return frames
}
