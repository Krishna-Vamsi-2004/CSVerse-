/**
 * Generates frames for N-Queens Backtracking (N=4).
 * Each frame: 4 elements (one per row), value = column placement (-1 = empty).
 * States: comparing = trying, sorted = placed, swapping = backtracking.
 */
export function generateBacktrackingFrames(arr) {
  const frames = []
  const N = 4
  const board = Array(N).fill(-1)

  function isSafe(row, col) {
    for (let r = 0; r < row; r++) {
      if (board[r] === col) return false
      if (Math.abs(board[r] - col) === Math.abs(r - row)) return false
    }
    return true
  }

  function recordFrame(desc, activeRow = -1, mode = 'default') {
    frames.push({
      elements: board.map((col, row) => ({
        value: col,
        label: col === -1 ? `Row ${row}: empty` : `Row ${row}: Q at col ${col}`,
        state:
          row === activeRow
            ? mode === 'try'
              ? 'comparing'
              : mode === 'place'
              ? 'sorted'
              : mode === 'backtrack'
              ? 'swapping'
              : 'default'
            : col !== -1
            ? 'sorted'
            : 'idle',
      })),
      description: desc,
      highlightIndices: activeRow >= 0 ? [activeRow] : [],
    })
  }

  let solutionFound = false

  // Initial frame
  recordFrame('N-Queens (N=4): Place 4 queens so none attack each other. Board is empty.')

  function solve(row) {
    if (row === N) {
      solutionFound = true
      recordFrame(
        `Solution found! Queens at columns: [${board.join(', ')}]. All queens safe.`,
        -1
      )
      return true
    }

    for (let col = 0; col < N; col++) {
      recordFrame(
        `Row ${row}: Try placing queen at column ${col}.`,
        row,
        'try'
      )

      if (isSafe(row, col)) {
        board[row] = col
        recordFrame(
          `Row ${row}: column ${col} is safe! Placed queen at (${row}, ${col}). Board: [${board.map((c) => (c === -1 ? '_' : c)).join(', ')}]`,
          row,
          'place'
        )

        if (solve(row + 1)) return true

        // Backtrack
        recordFrame(
          `Backtrack: removing queen from row ${row}, column ${col}. No solution found down this path.`,
          row,
          'backtrack'
        )
        board[row] = -1
        recordFrame(
          `Row ${row} cleared. Trying next column...`,
          row,
          'default'
        )
      } else {
        recordFrame(
          `Column ${col} in row ${row} is UNSAFE (conflict with existing queen). Skipping.`,
          row,
          'try'
        )
      }
    }

    return false
  }

  solve(0)

  if (!solutionFound) {
    recordFrame('No solution exists for this N-Queens configuration.')
  }

  return frames
}
