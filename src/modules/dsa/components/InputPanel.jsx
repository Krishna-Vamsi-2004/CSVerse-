// src/modules/dsa/components/InputPanel.jsx
import { useState, useEffect } from 'react'
import { HiCheck } from 'react-icons/hi'

// Topics that accept free text instead of comma-separated numbers
const TEXT_TOPICS = new Set(['strings'])
// Topics with fully hardcoded inputs — hide the panel
const FIXED_TOPICS = new Set([
  'graphs','bfs','dfs','dijkstra','bellmanford','prim','kruskal',
  'backtracking','dp','bitmanipulation','tries',
])

const NUM_PLACEHOLDERS = {
  bubblesort:    '5,3,8,1,9,2',
  selectionsort: '29,10,14,37,13',
  quicksort:     '38,27,43,3,9',
  insertionsort: '12,11,13,5,6',
  mergesort:     '38,27,43,3,9',
  heapsort:      '4,10,3,5,1',
  arrays:        '10,20,30,40,50',
  linkedlist:    '1,2,3,4,5',
  stacks:        '10,20,30',
  queues:        '10,20,30',
  trees:         '50,30,70,20,40',
  bst:           '50,30,70,20,40',
  treetraversal: '50,30,70,20,40',
  heaps:         '3,9,2,1,4,5',
  hashtables:    '12,25,7,43,18',
  binarysearch:  '10,20,30,40,50,60',
  linearsearch:  '10,20,30,40,50',
  twopointers:   '1,3,5,7,9,11',
  slidingwindow: '2,1,5,1,3,2,4',
  recursion:     '5',
  greedy:        '3,1,4,1,5,9',
  divideconquer: '10,20,30,40,50',
}

export default function InputPanel({ onSetInput, topicId }) {
  const [value,   setValue]   = useState('')
  const [error,   setError]   = useState('')
  const [applied, setApplied] = useState(false)

  // Clear field whenever topic changes
  useEffect(() => {
    setValue('')
    setError('')
    setApplied(false)
  }, [topicId])

  if (FIXED_TOPICS.has(topicId)) return null

  const isText = TEXT_TOPICS.has(topicId)

  const placeholder = isText
    ? 'text:pattern  e.g.  ABCABC:BC'
    : (NUM_PLACEHOLDERS[topicId] ?? '1,2,3,4,5')

  function handleSubmit(e) {
    e.preventDefault()
    const raw = value.trim()
    if (!raw) { setError('Enter a value.'); return }

    if (isText) {
      // Format: "TEXT:PATTERN"  or just "TEXT" (pattern defaults to first 2 chars)
      const colonIdx = raw.indexOf(':')
      let text, pattern
      if (colonIdx > 0) {
        text    = raw.slice(0, colonIdx).toUpperCase().trim()
        pattern = raw.slice(colonIdx + 1).toUpperCase().trim()
      } else {
        text    = raw.toUpperCase().trim()
        pattern = text.slice(0, 2) // default pattern = first 2 chars
      }
      if (!text) { setError('Enter text before the colon.'); return }
      if (!pattern) { setError('Enter a search pattern after the colon.'); return }
      if (pattern.length > text.length) { setError('Pattern cannot be longer than text.'); return }

      // Encode: [textCharCodes, 0, patternCharCodes]
      const encoded = [
        ...text.split('').map(c => c.charCodeAt(0)),
        0,
        ...pattern.split('').map(c => c.charCodeAt(0)),
      ]
      setError('')
      onSetInput(encoded)
      setValue('')       // clear field
      setApplied(true)
      setTimeout(() => setApplied(false), 1500)
      return
    }

    // Numeric input
    const parts = raw.split(',').map(s => s.trim())
    const nums  = parts.map(Number)
    if (nums.some(isNaN)) { setError('Use comma-separated numbers.'); return }
    if (nums.length < 1)  { setError('Enter at least 1 value.'); return }
    if (nums.length > 20) { setError('Maximum 20 values.'); return }
    setError('')
    onSetInput(nums)
    setValue('')         // clear field
    setApplied(true)
    setTimeout(() => setApplied(false), 1500)
  }

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 items-center w-full">
      <div className="flex-1 min-w-0">
        <input
          type="text"
          value={value}
          onChange={e => { setValue(e.target.value); setError('') }}
          placeholder={placeholder}
          className="w-full px-2.5 py-1.5 text-xs rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Custom input"
        />
        {error && <p className="text-[10px] text-red-500 mt-0.5" role="alert">{error}</p>}
      </div>
      <button
        type="submit"
        title="Apply"
        className={`p-1.5 rounded-lg text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 shrink-0
          ${applied ? 'bg-green-500 text-white' : 'bg-blue-600 hover:bg-blue-700 text-white'}`}
      >
        {applied
          ? <HiCheck className="text-base" />
          : <span className="text-xs px-1">Apply</span>}
      </button>
    </form>
  )
}
