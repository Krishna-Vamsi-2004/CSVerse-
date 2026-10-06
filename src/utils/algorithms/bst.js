/**
 * Generates frames for Binary Search Tree (BST) Search.
 * Builds a BST from arr then searches for a value.
 */
export function generateBSTFrames(arr) {
  const frames = []
  const values = arr.length > 0 ? [...arr] : [50, 30, 70, 20, 40, 60, 80]

  class BSTNode {
    constructor(value, x, y) {
      this.value = value
      this.x = x
      this.y = y
      this.left = null
      this.right = null
    }
  }

  const nodeList = []
  let root = null

  function insert(value) {
    if (!root) {
      root = new BSTNode(value, 0, 0)
      nodeList.push(root)
      return
    }
    let curr = root
    let depth = 0
    while (curr) {
      if (value < curr.value) {
        if (!curr.left) {
          const xOff = 4 / Math.pow(2, depth)
          curr.left = new BSTNode(value, curr.x - xOff, curr.y - 1.5)
          nodeList.push(curr.left)
          return
        }
        curr = curr.left
      } else {
        if (!curr.right) {
          const xOff = 4 / Math.pow(2, depth)
          curr.right = new BSTNode(value, curr.x + xOff, curr.y - 1.5)
          nodeList.push(curr.right)
          return
        }
        curr = curr.right
      }
      depth++
    }
  }

  // Build the BST silently
  values.forEach((v) => insert(v))

  // Pick a search target — prefer a leaf node to generate more traversal frames
  const target = values[values.length - 1]
  const foundSet = new Set()

  function recordFrame(desc, current = null, done = false) {
    frames.push({
      elements: nodeList.map((n) => ({
        value: n.value,
        x: n.x,
        y: n.y,
        state: foundSet.has(n.value)
          ? 'sorted'
          : n === current
          ? done ? 'sorted' : 'comparing'
          : 'idle',
      })),
      description: desc,
      highlightIndices: current ? [nodeList.indexOf(current)] : [],
    })
  }

  // Initial frame
  recordFrame(`BST built from [${values.join(', ')}]. Now searching for ${target}.`)

  // Search traversal
  let curr = root
  let depth = 0
  while (curr) {
    if (curr.value === target) {
      foundSet.add(curr.value)
      recordFrame(`Found ${target} at this node! Search complete.`, curr, true)
      break
    } else if (target < curr.value) {
      recordFrame(`${target} < ${curr.value} → go LEFT`, curr)
      curr = curr.left
    } else {
      recordFrame(`${target} > ${curr.value} → go RIGHT`, curr)
      curr = curr.right
    }
    depth++
    if (curr) {
      recordFrame(`Arrived at node ${curr.value} — comparing with target ${target}`, curr)
    }
  }

  if (!curr) {
    recordFrame(`${target} not found in the BST.`)
  }

  // Final state frame
  frames.push({
    elements: nodeList.map((n) => ({
      value: n.value,
      x: n.x,
      y: n.y,
      state: foundSet.has(n.value) ? 'sorted' : 'idle',
    })),
    description: `BST Search complete. Target ${target} was ${foundSet.size > 0 ? 'found' : 'not found'}.`,
    highlightIndices: [],
  })

  return frames
}
