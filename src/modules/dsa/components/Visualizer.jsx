// src/modules/dsa/components/Visualizer.jsx
import ErrorBoundary from '../../../components/ErrorBoundary'

// ── Shared constants ──────────────────────────────────────────────────────────
// Fixed square container used by every viz type — 2D and 3D are the same size
const VIZ_H = 280   // px — single source of truth for the square height

const isActive = (state) => state === 'comparing' || state === 'swapping'

// Active node: lift slightly — reduced so it never clips at the top
const activeBorder = 'border-red-500'
const liftStyle = (active) =>
  active
    ? { transform: 'translateY(-4px)', transition: 'transform 0.2s ease' }
    : { transition: 'transform 0.2s ease' }

function nodeColor(state) {
  if (state === 'comparing') return 'bg-cyan-400 text-white'
  if (state === 'swapping')  return 'bg-orange-400 text-white'
  if (state === 'sorted')    return 'bg-green-400 text-white'
  return 'bg-blue-400 text-white'
}
function barColor(state) {
  if (state === 'comparing') return 'bg-cyan-400'
  if (state === 'swapping')  return 'bg-orange-400'
  if (state === 'sorted')    return 'bg-green-400'
  return 'bg-blue-400'
}

// ── Wrapper that every viz sits inside — fixed square, clips overflow ──────────
function VizBox({ children }) {
  return (
    <div
      className="relative w-full rounded-xl flex items-center justify-center"
      style={{
        height: VIZ_H,
        overflow: 'visible',
        paddingTop: 12,
        background: 'linear-gradient(135deg, #f0f7ff 0%, #f5f0ff 50%, #f0faf5 100%)',
        border: '1px solid #e2e8f0',
      }}
    >
      {children}
    </div>
  )
}

// ── BAR viz ───────────────────────────────────────────────────────────────────
function BarViz({ frame }) {
  const els = frame.elements
  const max = Math.max(...els.map(e => Number(e.value) || 0), 1)
  const barH = VIZ_H - 32   // leave room for labels + padding
  return (
    <div className="flex items-end justify-center gap-px w-full px-3" style={{ height: barH }}>
      {els.map((el, idx) => {
        const h  = Math.max((Number(el.value) / max) * (barH - 18), 4)
        const ac = isActive(el.state)
        return (
          <div key={idx} className="flex flex-col items-center flex-1 min-w-0" style={liftStyle(ac)}>
            {els.length <= 20 && (
              <span className={`text-[8px] leading-none mb-px ${ac ? 'text-white font-bold' : 'text-gray-400'}`}>
                {el.value}
              </span>
            )}
            <div
              className={`w-full rounded-t-sm transition-all duration-200 ${barColor(el.state)}
                ${ac ? `border-2 ${activeBorder}` : ''}`}
              style={{ height: h }}
            />
          </div>
        )
      })}
    </div>
  )
}

// ── ARRAY viz ─────────────────────────────────────────────────────────────────
function ArrayViz({ frame }) {
  const n  = frame.elements.length
  const sz = n > 18 ? 'w-7 h-7 text-[9px]' : n > 12 ? 'w-9 h-9 text-xs' : 'w-11 h-11 text-sm'
  return (
    <div className="flex items-center justify-center gap-1.5 flex-wrap px-3 overflow-hidden w-full">
      {frame.elements.map((el, idx) => {
        const ac = isActive(el.state)
        return (
          <div key={idx} className="flex flex-col items-center gap-0.5" style={liftStyle(ac)}>
            <div className={`${sz} rounded-lg flex items-center justify-center font-bold border-2 transition-all duration-200
              ${ac ? activeBorder : 'border-transparent'}
              ${nodeColor(el.state)}`}>
              {el.value}
            </div>
            {n <= 20 && <span className="text-[8px] text-gray-400">[{idx}]</span>}
          </div>
        )
      })}
    </div>
  )
}

// ── LINKED LIST viz ───────────────────────────────────────────────────────────
function LinkedListViz({ frame }) {
  const n  = frame.elements.length
  const sz = n > 10 ? 'w-9 h-9 text-xs' : 'w-11 h-11 text-sm'
  return (
    <div className="flex items-center justify-center gap-1 flex-wrap px-3 overflow-hidden w-full">
      {frame.elements.map((el, idx) => {
        const ac = isActive(el.state)
        return (
          <div key={idx} className="flex items-center gap-1">
            <div className={`${sz} rounded-full flex items-center justify-center font-bold border-2 transition-all duration-200
              ${ac ? activeBorder : 'border-gray-300 dark:border-gray-600'}
              ${nodeColor(el.state)}`}
              style={liftStyle(ac)}>
              {el.value}
            </div>
            {idx < frame.elements.length - 1 && <span className="text-gray-400 font-mono text-xs">→</span>}
          </div>
        )
      })}
      <span className="text-gray-400 font-mono text-xs ml-1">NULL</span>
    </div>
  )
}

// ── STACK viz ─────────────────────────────────────────────────────────────────
function StackViz({ frame }) {
  const els = [...frame.elements].reverse()
  const maxH = VIZ_H - 24
  return (
    <div className="flex flex-col-reverse items-center gap-1 w-28 overflow-hidden"
      style={{ maxHeight: maxH }}>
      <div className="w-full border-x-4 border-b-4 border-gray-400 dark:border-gray-500 rounded-b-xl flex flex-col-reverse gap-1 p-1" style={{ maxHeight: maxH }}>
        {els.map((el, idx) => {
          const ac   = isActive(el.state)
          const isTop = idx === 0
          return (
            <div key={idx}
              className={`w-full py-1.5 px-3 rounded-md text-center font-bold text-sm transition-all duration-200 border-2
                ${isTop ? 'ring-1 ring-blue-300' : ''}
                ${ac ? activeBorder : 'border-transparent'}
                ${nodeColor(el.state)}`}
              style={liftStyle(ac)}>
              {el.value}
              {isTop && <span className="block text-[9px] opacity-70 uppercase tracking-tighter">Top</span>}
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── QUEUE viz ─────────────────────────────────────────────────────────────────
function QueueViz({ frame }) {
  const n  = frame.elements.length
  const sz = n > 8 ? 'w-9 h-9 text-xs' : 'w-11 h-11 text-sm'
  return (
    <div className="flex items-center justify-center px-3 overflow-hidden w-full">
      <div className="flex bg-gray-100 dark:bg-gray-700/50 p-2 rounded-xl border-y-2 border-gray-300 dark:border-gray-600 gap-1 flex-wrap justify-center">
        {frame.elements.map((el, idx) => {
          const isFront = idx === 0, isRear = idx === frame.elements.length - 1
          const ac = isActive(el.state)
          return (
            <div key={idx} className="flex flex-col items-center gap-0.5">
              <div className={`${sz} rounded-lg flex flex-col items-center justify-center font-bold border-2 transition-all duration-200
                ${ac ? activeBorder : 'border-transparent'}
                ${nodeColor(el.state)}`}
                style={liftStyle(ac)}>
                {el.value}
              </div>
              <div className="h-3 flex items-center">
                {isFront && <span className="text-[9px] text-blue-400 font-bold">F</span>}
                {isRear  && <span className="text-[9px] text-orange-400 font-bold">R</span>}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── TREE / TRIE viz ──────────────────────────────────────────────────────────
// Uses SVG for both edges and nodes — guaranteed to fit inside the container.
function TreeViz({ frame }) {
  const els = frame.elements
  if (!els.length) return <p className="text-gray-400 text-sm">No data</p>

  const W = 100, H = 100   // SVG viewBox units (%)

  const xs = els.map(e => e.x ?? 0)
  const ys = els.map(e => e.y ?? 0)   // y may be negative (root at top)
  const xMin = Math.min(...xs), xMax = Math.max(...xs)
  const yMin = Math.min(...ys), yMax = Math.max(...ys)
  const xRange = Math.max(xMax - xMin, 1)
  const yRange = Math.max(yMax - yMin, 1)

  const pad = 8   // % padding on all sides
  const toX = (x) => pad + ((x - xMin) / xRange) * (W - pad * 2)
  const toY = (y) => pad + ((y - yMin) / yRange) * (H - pad * 2)

  // Radius scaled to fit without overlap
  const r = Math.max(2, Math.min(5, 40 / Math.max(els.length, 1)))

  const findParent = (node) => {
    // parent = closest node that is one level up (y smaller for downward trees or y larger for upward)
    const upward = yMin < 0  // y goes negative downward in algorithm coords
    const candidates = upward
      ? els.filter(p => p.y > node.y)
      : els.filter(p => p.y < node.y)
    if (!candidates.length) return null
    // Among candidates at the nearest y level
    const nearest = candidates.reduce((a, b) =>
      Math.abs(a.y - node.y) < Math.abs(b.y - node.y) ? a : b)
    const sameLevel = candidates.filter(p => Math.abs(p.y - nearest.y) < 0.1)
    return sameLevel.reduce((a, b) =>
      Math.abs(a.x - node.x) < Math.abs(b.x - node.x) ? a : b)
  }

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ maxHeight: VIZ_H - 16 }}>
      {/* edges */}
      {els.map((el, idx) => {
        const parent = findParent(el)
        if (!parent) return null
        return (
          <line key={`e${idx}`}
            x1={toX(parent.x ?? 0)} y1={toY(parent.y ?? 0)}
            x2={toX(el.x ?? 0)}    y2={toY(el.y ?? 0)}
            stroke="#94a3b8" strokeWidth="0.5" />
        )
      })}
      {/* nodes */}
      {els.map((el, idx) => {
        const ac  = isActive(el.state)
        const cx  = toX(el.x ?? 0)
        const cy  = toY(el.y ?? 0)
        const fill =
          el.state === 'comparing' ? '#22d3ee' :
          el.state === 'swapping'  ? '#fb923c' :
          el.state === 'sorted'    ? '#4ade80' : '#60a5fa'
        return (
          <g key={`n${idx}`} style={{ transform: ac ? `translateY(-${r * 0.4}px)` : 'none', transition: 'transform 0.2s' }}>
            <circle cx={cx} cy={cy} r={r} fill={fill} />
            {ac && <circle cx={cx} cy={cy} r={r + 1} fill="none" stroke="#ef4444" strokeWidth="0.8" />}
            <text x={cx} y={cy + r * 0.4} textAnchor="middle" fontSize={r * 0.9}
              fill="white" fontWeight="bold" className="select-none">
              {String(el.value).slice(0, 3)}
            </text>
          </g>
        )
      })}
    </svg>
  )
}

// ── GRAPH viz ─────────────────────────────────────────────────────────────────
function GraphViz({ frame }) {
  const nodes = frame.elements
  const conns = frame.connections || []
  if (!nodes.length) return <p className="text-gray-400 text-sm">No data</p>

  const W = 100, H = 100
  const xs = nodes.map(n => n.x ?? 0)
  const ys = nodes.map(n => n.y ?? 0)
  const xMin = Math.min(...xs), xMax = Math.max(...xs)
  const yMin = Math.min(...ys), yMax = Math.max(...ys)
  const xRange = Math.max(xMax - xMin, 1)
  const yRange = Math.max(yMax - yMin, 1)
  const pad = 10
  const toX = (x) => pad + ((x - xMin) / xRange) * (W - pad * 2)
  const toY = (y) => pad + ((y - yMin) / yRange) * (H - pad * 2)
  const r = Math.max(3, Math.min(6, 50 / Math.max(nodes.length, 1)))

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full" style={{ maxHeight: VIZ_H - 16 }}>
      {/* edges */}
      {conns.map((conn, idx) => {
        const from = nodes.find(n => n.id === conn.from)
        const to   = nodes.find(n => n.id === conn.to)
        if (!from || !to) return null
        const mx = (toX(from.x ?? 0) + toX(to.x ?? 0)) / 2
        const my = (toY(from.y ?? 0) + toY(to.y ?? 0)) / 2
        return (
          <g key={idx}>
            <line
              x1={toX(from.x ?? 0)} y1={toY(from.y ?? 0)}
              x2={toX(to.x   ?? 0)} y2={toY(to.y   ?? 0)}
              stroke="#94a3b8" strokeWidth="0.5" strokeDasharray="2 1" />
            {conn.weight != null && (
              <text x={mx} y={my - 1} textAnchor="middle" fontSize="2.5" fill="#94a3b8">{conn.weight}</text>
            )}
          </g>
        )
      })}
      {/* nodes */}
      {nodes.map((el, idx) => {
        const ac  = isActive(el.state)
        const cx  = toX(el.x ?? 0)
        const cy  = toY(el.y ?? 0)
        const fill =
          el.state === 'comparing' ? '#22d3ee' :
          el.state === 'swapping'  ? '#fb923c' :
          el.state === 'sorted'    ? '#4ade80' : '#60a5fa'
        return (
          <g key={idx}>
            <circle cx={cx} cy={cy} r={r} fill={fill} />
            {ac && <circle cx={cx} cy={cy} r={r + 1.2} fill="none" stroke="#ef4444" strokeWidth="0.8" />}
            <text x={cx} y={cy + r * 0.35} textAnchor="middle" fontSize={r * 0.85}
              fill="white" fontWeight="bold" className="select-none">
              {el.id || String(el.value).slice(0, 2)}
            </text>
            {el.dist != null && (
              <text x={cx} y={cy + r + 3} textAnchor="middle" fontSize="2" fill="#fbbf24">{el.dist}</text>
            )}
          </g>
        )
      })}
    </svg>
  )
}

// ── STRING viz ────────────────────────────────────────────────────────────────
function StringViz({ frame }) {
  const n  = frame.elements.length
  const sz = n > 16 ? 'w-7 h-7 text-[9px]' : n > 10 ? 'w-8 h-8 text-xs' : 'w-9 h-9 text-sm'
  return (
    <div className="flex items-center justify-center gap-1 flex-wrap px-3 overflow-hidden w-full">
      {frame.elements.map((el, idx) => {
        const ac = isActive(el.state)
        return (
          <div key={idx} className="flex flex-col items-center gap-0.5" style={liftStyle(ac)}>
            <div className={`${sz} rounded-md flex items-center justify-center font-bold font-mono border-2 transition-all duration-200
              ${ac ? activeBorder : 'border-gray-300 dark:border-gray-600'}
              ${nodeColor(el.state)}`}>
              {el.value}
            </div>
            <span className="text-[8px] text-gray-400">{idx}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── HASH TABLE viz ────────────────────────────────────────────────────────────
function HashTableViz({ frame }) {
  return (
    <div className="flex items-center justify-center gap-1.5 flex-wrap px-3 overflow-hidden w-full">
      {frame.elements.map((el, idx) => {
        const ac     = isActive(el.state)
        const filled = el.label && el.label !== 'empty'
        return (
          <div key={idx} className="flex flex-col items-center" style={liftStyle(ac)}>
            <div className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center font-bold text-xs border-2 transition-all duration-200
              ${ac ? activeBorder : 'border-gray-300 dark:border-gray-600'}
              ${el.state === 'sorted' ? 'bg-green-400 text-white' : el.state === 'comparing' ? 'bg-cyan-400 text-white' : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200'}`}>
              <span className="text-[9px] opacity-60">#{idx}</span>
              <span>{filled ? el.label : '—'}</span>
            </div>
          </div>
        )
      })}
    </div>
  )
}

// ── RECURSION viz ─────────────────────────────────────────────────────────────
function RecursionViz({ frame }) {
  if (!frame.elements.length)
    return <p className="text-gray-400 text-sm italic">Building call stack…</p>
  return (
    <div className="flex flex-col-reverse items-center gap-1 w-56 overflow-hidden" style={{ maxHeight: VIZ_H - 24 }}>
      <div className="w-full border-b-2 border-gray-300 dark:border-gray-600 mb-1" />
      {frame.elements.map((el, idx) => {
        const ac = isActive(el.state)
        return (
          <div key={idx}
            className={`w-full py-1.5 px-3 rounded-lg text-center text-xs font-mono font-bold border-2 transition-all duration-200
              ${ac ? activeBorder : 'border-gray-300 dark:border-gray-600'}
              ${nodeColor(el.state)}`}
            style={liftStyle(ac)}>
            {el.label || `fact(${el.value})`}
            {el.result != null && <span className="ml-1.5 opacity-80">= {el.result}</span>}
          </div>
        )
      })}
    </div>
  )
}

// ── BACKTRACKING (N-Queens) viz ───────────────────────────────────────────────
function BacktrackingViz({ frame }) {
  const N = frame.elements.length || 4
  const cell = Math.min(36, Math.floor((VIZ_H - 24) / N))
  return (
    <div className="flex flex-col items-center gap-0.5">
      {frame.elements.map((el, row) => {
        const col = el.value
        const ac  = isActive(el.state)
        return (
          <div key={row} className="flex gap-0.5">
            {Array.from({ length: N }).map((_, c) => {
              const isQ = c === col
              return (
                <div key={c}
                  className={`flex items-center justify-center font-bold border transition-all duration-150 rounded-sm
                    ${(row + c) % 2 === 0 ? 'bg-gray-200 dark:bg-gray-700' : 'bg-gray-50 dark:bg-gray-800'}
                    ${isQ && ac        ? `border-red-500 border-2` : 'border-transparent'}
                    ${isQ && el.state === 'sorted'   ? 'bg-green-400 text-white border-green-500' : ''}
                    ${isQ && el.state === 'swapping' ? 'bg-orange-400 text-white' : ''}`}
                  style={{ width: cell, height: cell, fontSize: cell * 0.55 }}>
                  {isQ ? '♛' : ''}
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}

// ── GREEDY / label-bar viz ────────────────────────────────────────────────────
function LabelBarViz({ frame }) {
  const n = frame.elements.length
  const rowH = Math.min(32, Math.floor((VIZ_H - 16) / Math.max(n, 1)))
  return (
    <div className="flex flex-col gap-0.5 w-full px-3 overflow-hidden" style={{ maxHeight: VIZ_H - 16 }}>
      {frame.elements.map((el, idx) => {
        const ac = isActive(el.state)
        return (
          <div key={idx}
            className={`flex items-center gap-2 px-2 rounded-lg font-semibold text-xs border-2 transition-all duration-200
              ${ac ? activeBorder : 'border-transparent'}
              ${nodeColor(el.state)}`}
            style={{ height: rowH, ...liftStyle(ac) }}>
            <span className="opacity-60 w-4 shrink-0">{idx}</span>
            <span className="truncate">{el.label || el.value}</span>
          </div>
        )
      })}
    </div>
  )
}

// ── DP TABLE viz ──────────────────────────────────────────────────────────────
function DPTableViz({ frame }) {
  const els = frame.elements
  if (!els.length) return null
  const maxRow = Math.max(...els.map(e => e.row ?? 0))
  const maxCol = Math.max(...els.map(e => e.col ?? 0))
  const rows = maxRow + 1, cols = maxCol + 1
  const cellSize = Math.max(18, Math.min(28, Math.floor((VIZ_H - 32) / rows)))
  const grid = Array.from({ length: rows }, (_, r) =>
    Array.from({ length: cols }, (_, c) =>
      els.find(e => e.row === r && e.col === c) ?? { value: 0, state: 'idle' }
    )
  )
  return (
    <div className="overflow-auto w-full" style={{ maxHeight: VIZ_H - 8 }}>
      <table className="mx-auto border-collapse text-[10px]">
        <thead>
          <tr>
            <th className="text-gray-400 pr-1" style={{ width: cellSize }}></th>
            {Array.from({ length: cols }, (_, c) => (
              <th key={c} className="text-gray-400 font-normal text-center" style={{ width: cellSize, height: cellSize }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {grid.map((row, r) => (
            <tr key={r}>
              <td className="text-gray-400 text-center pr-1 font-semibold">{r}</td>
              {row.map((cell, c) => {
                const ac = isActive(cell.state)
                return (
                  <td key={c}
                    className={`text-center font-bold border border-gray-200 dark:border-gray-700 transition-all duration-150
                      ${ac ? 'bg-cyan-400 text-white outline outline-2 outline-red-500' : ''}
                      ${cell.state === 'sorted' && !ac ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300' : ''}
                      ${cell.state === 'idle' ? 'text-gray-300 dark:text-gray-700' : ''}`}
                    style={{ width: cellSize, height: cellSize }}>
                    {cell.value}
                  </td>
                )
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// ── BIT MANIPULATION viz ──────────────────────────────────────────────────────
function BitsViz({ frame }) {
  return (
    <div className="flex flex-col items-center gap-3">
      <div className="flex items-center gap-1">
        {frame.elements.map((el, idx) => {
          const ac = isActive(el.state)
          return (
            <div key={idx} className="flex flex-col items-center gap-0.5" style={liftStyle(ac)}>
              <div className={`w-9 h-9 rounded-md flex items-center justify-center font-bold font-mono text-base border-2 transition-all duration-200
                ${ac ? activeBorder : 'border-gray-300 dark:border-gray-600'}
                ${el.value === 1
                  ? el.state === 'sorted' ? 'bg-green-400 text-white' : 'bg-blue-500 text-white'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-300'}`}>
                {el.value}
              </div>
              <span className="text-[8px] text-gray-400">{el.bitPos ?? (7 - idx)}</span>
            </div>
          )
        })}
      </div>
      <p className="text-xs text-gray-400 font-mono">
        = {frame.elements.map(e => e.value).join('')}₂
      </p>
    </div>
  )
}

// ── ROUTER ────────────────────────────────────────────────────────────────────
const SORT_TOPICS  = new Set(['bubblesort','selectionsort','quicksort','insertionsort','mergesort','heapsort','heaps'])
const TREE_TOPICS  = new Set(['trees','treetraversal','bst','tries'])
const GRAPH_TOPICS = new Set(['graphs','bfs','dfs','dijkstra','bellmanford','prim','kruskal'])
const ARRAY_TOPICS = new Set(['arrays','binarysearch','linearsearch','twopointers','slidingwindow','divideconquer'])

function pickViz(topicId, frame) {
  if (SORT_TOPICS.has(topicId))      return <BarViz frame={frame} />
  if (topicId === 'linkedlist')      return <LinkedListViz frame={frame} />
  if (topicId === 'stacks')          return <StackViz frame={frame} />
  if (topicId === 'queues')          return <QueueViz frame={frame} />
  if (TREE_TOPICS.has(topicId))      return <TreeViz frame={frame} />
  if (GRAPH_TOPICS.has(topicId))     return <GraphViz frame={frame} />
  if (topicId === 'strings')         return <StringViz frame={frame} />
  if (topicId === 'hashtables')      return <HashTableViz frame={frame} />
  if (topicId === 'recursion')       return <RecursionViz frame={frame} />
  if (topicId === 'backtracking')    return <BacktrackingViz frame={frame} />
  if (topicId === 'greedy')          return <LabelBarViz frame={frame} />
  if (topicId === 'dp')              return <DPTableViz frame={frame} />
  if (topicId === 'bitmanipulation') return <BitsViz frame={frame} />
  if (ARRAY_TOPICS.has(topicId))     return <ArrayViz frame={frame} />
  return <ArrayViz frame={frame} />
}

export default function Visualizer({ frame, topicId, isComplete }) {
  if (!frame) return null
  return (
    <ErrorBoundary>
      <div className="w-full rounded-2xl border border-slate-200 shadow-sm p-3"
        style={{ background: 'linear-gradient(135deg, #f8fbff 0%, #faf8ff 50%, #f6fdfb 100%)' }}>
        <VizBox>
          {pickViz(topicId, frame)}
        </VizBox>
        <p className="text-sm text-center text-slate-600 mt-2 min-h-[1.25rem] leading-snug px-2" aria-live="polite">
          {isComplete ? '✅ Visualization complete!' : frame.description}
        </p>
      </div>
    </ErrorBoundary>
  )
}
