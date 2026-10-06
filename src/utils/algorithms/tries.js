/**
 * Generates frames for Trie Insertion.
 * Inserts words: ["CAT","CAR","CARD","CARE","BAT"]
 * Nodes have value (char), x, y for layout.
 */
export function generateTrieFrames(arr) {
  const frames = []
  const words = ['CAT', 'CAR', 'CARD', 'CARE', 'BAT']

  // Trie node structure
  const trieNodes = []
  const root = { char: 'ROOT', children: {}, id: 0, x: 0, y: 0 }
  trieNodes.push(root)
  let idCounter = 1

  // Layout parameters
  // We'll assign x positions as we insert; simple approach: track x offset per level
  const levelCounts = { 0: 1 }
  const levelOffset = { 0: 0 }

  function getNodeId(parent, char, depth) {
    // Check if child already exists
    if (parent.children[char]) return parent.children[char]

    // Assign x/y based on insertion order at this depth
    if (!levelCounts[depth]) levelCounts[depth] = 0
    const xPos = (levelCounts[depth] - 1.5) * 2.0
    levelCounts[depth]++

    const newNode = {
      char,
      children: {},
      id: idCounter++,
      x: xPos,
      y: -depth * 1.8,
      parent: parent.id,
    }
    parent.children[char] = newNode
    trieNodes.push(newNode)
    return newNode
  }

  function recordFrame(desc, activeNodeId = -1) {
    frames.push({
      elements: trieNodes.map((n) => ({
        value: n.char,
        x: n.x,
        y: n.y,
        state: n.id === activeNodeId ? 'comparing' : n.char !== 'ROOT' ? 'sorted' : 'idle',
      })),
      description: desc,
      highlightIndices: activeNodeId >= 0 ? [trieNodes.findIndex((n) => n.id === activeNodeId)] : [],
    })
  }

  // Initial frame — just root
  recordFrame('Trie initialized with root node. Ready to insert words: CAT, CAR, CARD, CARE, BAT.')

  for (const word of words) {
    let curr = root
    recordFrame(`Inserting word "${word}" into the trie.`, root.id)

    for (let i = 0; i < word.length; i++) {
      const ch = word[i]
      const depth = i + 1

      if (curr.children[ch]) {
        // Node exists — traverse
        curr = curr.children[ch]
        recordFrame(
          `"${word}" — character '${ch}' already exists at depth ${depth}. Following existing node.`,
          curr.id
        )
      } else {
        // Insert new node
        if (!levelCounts[depth]) levelCounts[depth] = 0
        const xPos = (levelCounts[depth] - 1.5) * 2.2
        levelCounts[depth]++

        const newNode = {
          char: ch,
          children: {},
          id: idCounter++,
          x: xPos,
          y: -depth * 1.8,
          parent: curr.id,
        }
        curr.children[ch] = newNode
        trieNodes.push(newNode)

        recordFrame(
          `"${word}" — inserting new node '${ch}' at depth ${depth} (child of '${curr.char}').`,
          newNode.id
        )
        curr = newNode
      }
    }

    // Mark end of word
    recordFrame(`Word "${word}" fully inserted into the trie.`, curr.id)
  }

  // Final frame — all nodes visible
  frames.push({
    elements: trieNodes.map((n) => ({
      value: n.char,
      x: n.x,
      y: n.y,
      state: n.char === 'ROOT' ? 'idle' : 'sorted',
    })),
    description: `Trie complete. Inserted all words: ${words.join(', ')}. Total nodes: ${trieNodes.length}.`,
    highlightIndices: [],
  })

  return frames
}
