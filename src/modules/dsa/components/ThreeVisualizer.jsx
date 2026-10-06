import { Canvas } from '@react-three/fiber'
import { OrbitControls, Text } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'

// Same fixed height as 2D — single source of truth
const VIZ_H = 280

const isActive = (state) => state === 'comparing' || state === 'swapping'

function stateColor(state) {
  if (state === 'comparing') return '#22d3ee'
  if (state === 'swapping')  return '#fb923c'
  if (state === 'sorted')    return '#4ade80'
  return '#60a5fa'
}

// Red wireframe outline — replaces the yellow glow mess
function RedOutline({ shape, size }) {
  if (shape === 'box') {
    const s = size + 0.14
    return (
      <mesh>
        <boxGeometry args={[s, s, s]} />
        <meshBasicMaterial color="#ef4444" wireframe />
      </mesh>
    )
  }
  return (
    <mesh>
      <sphereGeometry args={[size + 0.12, 14, 14]} />
      <meshBasicMaterial color="#ef4444" wireframe />
    </mesh>
  )
}

// ── element types ─────────────────────────────────────────────────────────────

function BarEl({ value, index, total, state, maxValue }) {
  const h    = Math.max((Number(value) / maxValue) * 5, 0.3)
  const xPos = (index - total / 2) * 1.4
  const ac   = isActive(state)
  return (
    <group position={[xPos, h / 2, 0]}>
      <mesh>
        <boxGeometry args={[1.1, h, 1.1]} />
        <meshStandardMaterial color={stateColor(state)} />
      </mesh>
      {ac && (
        <mesh>
          <boxGeometry args={[1.24, h + 0.14, 1.24]} />
          <meshBasicMaterial color="#ef4444" wireframe />
        </mesh>
      )}
      <Text position={[0, h / 2 + 0.45, 0]} fontSize={0.38} color="#111827" anchorX="center" anchorY="middle">
        {String(value).slice(0, 4)}
      </Text>
    </group>
  )
}

function BoxEl({ value, position, state, label }) {
  const ac = isActive(state)
  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={stateColor(state)} />
      </mesh>
      {ac && <RedOutline shape="box" size={1} />}
      <Text position={[0, 0, 0.51]} fontSize={0.38} color="white" anchorX="center" anchorY="middle">{value}</Text>
      {label && <Text position={[0, -0.75, 0]} fontSize={0.22} color="#94a3b8" anchorX="center" anchorY="middle">{label}</Text>}
    </group>
  )
}

function SphereEl({ value, position, state, r = 0.45, label }) {
  const ac = isActive(state)
  return (
    <group position={position}>
      <mesh>
        <sphereGeometry args={[r, 28, 28]} />
        <meshStandardMaterial color={stateColor(state)} />
      </mesh>
      {ac && <RedOutline shape="sphere" size={r} />}
      <Text position={[0, 0, r + 0.08]} fontSize={0.28} color="white" anchorX="center" anchorY="middle">{String(value).slice(0, 3)}</Text>
      {label && <Text position={[0, -(r + 0.3), 0]} fontSize={0.18} color="#94a3b8" anchorX="center" anchorY="middle">{label}</Text>}
    </group>
  )
}

function FlatBoxEl({ value, index, total, state }) {
  const xPos = (index - total / 2) * 1.35
  const ac   = isActive(state)
  return (
    <group position={[xPos, 0, 0]}>
      <mesh>
        <boxGeometry args={[1.1, 1.1, 0.3]} />
        <meshStandardMaterial color={stateColor(state)} />
      </mesh>
      {ac && (
        <mesh>
          <boxGeometry args={[1.24, 1.24, 0.44]} />
          <meshBasicMaterial color="#ef4444" wireframe />
        </mesh>
      )}
      <Text position={[0, 0, 0.18]} fontSize={0.38} color="white" anchorX="center" anchorY="middle">
        {String(value).length > 3 ? String(value).slice(0, 3) : value}
      </Text>
      <Text position={[0, -0.8, 0]} fontSize={0.2} color="#94a3b8" anchorX="center" anchorY="middle">{index}</Text>
    </group>
  )
}

// ── scene layout builders ─────────────────────────────────────────────────────

const SORT_TOPICS  = new Set(['bubblesort','selectionsort','quicksort','insertionsort','mergesort','heapsort','heaps'])
const TREE_TOPICS  = new Set(['trees','treetraversal','bst','tries'])
const GRAPH_TOPICS = new Set(['graphs','bfs','dfs','dijkstra','bellmanford','prim','kruskal'])
const ARRAY_TOPICS = new Set(['arrays','binarysearch','linearsearch','twopointers','slidingwindow','divideconquer','strings','bitmanipulation'])

function buildScene(topicId, elements, maxValue) {
  if (SORT_TOPICS.has(topicId)) {
    return elements.map((el, i) => (
      <BarEl key={i} value={el.value} index={i} total={elements.length} state={el.state} maxValue={maxValue} />
    ))
  }

  if (topicId === 'linkedlist') {
    const n = elements.length
    return elements.map((el, i) => {
      const ac = isActive(el.state)
      return (
        <group key={i} position={[(i - n / 2) * 2, 0, 0]}>
          <mesh><sphereGeometry args={[0.55, 28, 28]} /><meshStandardMaterial color={stateColor(el.state)} /></mesh>
          {ac && <RedOutline shape="sphere" size={0.55} />}
          <Text position={[0, 0, 0.65]} fontSize={0.38} color="white">{el.value}</Text>
          {i < n - 1 && (
            <mesh position={[1, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
              <cylinderGeometry args={[0.04, 0.04, 0.8]} />
              <meshStandardMaterial color="#94a3b8" />
            </mesh>
          )}
        </group>
      )
    })
  }

  if (topicId === 'stacks') {
    return elements.map((el, i) => (
      <BoxEl key={i} value={el.value} position={[0, i * 1.15, 0]} state={el.state}
        label={i === elements.length - 1 ? 'TOP' : null} />
    ))
  }

  if (topicId === 'queues') {
    return elements.map((el, i) => (
      <BoxEl key={i} value={el.value} position={[(i - elements.length / 2) * 1.4, 0, 0]} state={el.state}
        label={i === 0 ? 'F' : i === elements.length - 1 ? 'R' : null} />
    ))
  }

  if (TREE_TOPICS.has(topicId)) {
    // Normalize coordinates to fit the scene
    const xs = elements.map(e => e.x ?? 0)
    const ys = elements.map(e => e.y ?? 0)
    const xMin = Math.min(...xs), xMax = Math.max(...xs)
    const yMin = Math.min(...ys), yMax = Math.max(...ys)
    const xRange = Math.max(xMax - xMin, 1)
    const yRange = Math.max(yMax - yMin, 1)
    const sceneW = Math.min(elements.length * 1.2, 10)
    const sceneH = Math.min(elements.length * 0.8, 6)
    const toX = (x) => ((x - xMin) / xRange - 0.5) * sceneW
    const toY = (y) => ((y - yMin) / yRange - 0.5) * sceneH
    const r = Math.max(0.3, Math.min(0.5, 3 / Math.max(elements.length, 1)))

    return elements.map((el, i) => (
      <SphereEl key={i} value={el.value} position={[toX(el.x ?? 0), toY(el.y ?? 0), 0]} state={el.state} r={r} />
    ))
  }

  if (GRAPH_TOPICS.has(topicId)) {
    const xs = elements.map(e => e.x ?? 0)
    const ys = elements.map(e => e.y ?? 0)
    const xMin = Math.min(...xs), xMax = Math.max(...xs)
    const yMin = Math.min(...ys), yMax = Math.max(...ys)
    const xRange = Math.max(xMax - xMin, 1)
    const yRange = Math.max(yMax - yMin, 1)
    const toX = (x) => ((x - xMin) / xRange - 0.5) * 8
    const toY = (y) => ((y - yMin) / yRange - 0.5) * 5

    return elements.map((el, i) => {
      const ac = isActive(el.state)
      return (
        <group key={i} position={[toX(el.x ?? 0), toY(el.y ?? 0), 0]}>
          <mesh><sphereGeometry args={[0.4, 24, 24]} /><meshStandardMaterial color={stateColor(el.state)} /></mesh>
          {ac && <RedOutline shape="sphere" size={0.4} />}
          <Text position={[0, 0, 0.5]} fontSize={0.28} color="white" anchorX="center" anchorY="middle">
            {el.id || String(el.value).slice(0, 2)}
          </Text>
          {el.dist != null && (
            <Text position={[0, -0.55, 0.5]} fontSize={0.2} color="#fbbf24" anchorX="center" anchorY="middle">{el.dist}</Text>
          )}
        </group>
      )
    })
  }

  if (ARRAY_TOPICS.has(topicId)) {
    return elements.map((el, i) => (
      <FlatBoxEl key={i} value={el.value} index={i} total={elements.length} state={el.state} />
    ))
  }

  if (topicId === 'hashtables') {
    return elements.map((el, i) => {
      const ac     = isActive(el.state)
      const filled = el.label && el.label !== 'empty'
      return (
        <group key={i} position={[(i - elements.length / 2) * 1.6, 0, 0]}>
          <mesh>
            <boxGeometry args={[1.3, 1.3, 0.3]} />
            <meshStandardMaterial color={stateColor(el.state)} opacity={filled ? 1 : 0.3} transparent />
          </mesh>
          {ac && (
            <mesh><boxGeometry args={[1.44, 1.44, 0.44]} /><meshBasicMaterial color="#ef4444" wireframe /></mesh>
          )}
          <Text position={[0, 0.22, 0.2]} fontSize={0.22} color="white" anchorX="center" anchorY="middle">#{i}</Text>
          <Text position={[0, -0.18, 0.2]} fontSize={0.26} color="white" anchorX="center" anchorY="middle">
            {filled ? el.label : '—'}
          </Text>
        </group>
      )
    })
  }

  if (topicId === 'recursion') {
    return elements.map((el, i) => {
      const ac   = isActive(el.state)
      const text = el.result != null ? `${el.label}=${el.result}` : (el.label || `f(${el.value})`)
      return (
        <group key={i} position={[0, i * 1.25, 0]}>
          <mesh><boxGeometry args={[3.5, 1, 0.3]} /><meshStandardMaterial color={stateColor(el.state)} /></mesh>
          {ac && <mesh><boxGeometry args={[3.64, 1.14, 0.44]} /><meshBasicMaterial color="#ef4444" wireframe /></mesh>}
          <Text position={[0, 0, 0.2]} fontSize={0.3} color="white" anchorX="center" anchorY="middle">{text}</Text>
        </group>
      )
    })
  }

  if (topicId === 'backtracking') {
    const N = elements.length || 4
    return elements.map((el, row) => {
      const col = el.value
      return Array.from({ length: N }).map((_, c) => {
        const isQ   = c === col
        const ac    = isActive(el.state)
        const tile  = (row + c) % 2 === 0 ? '#e2e8f0' : '#64748b'
        const xPos  = (c - N / 2 + 0.5) * 1.15
        const yPos  = (row - N / 2 + 0.5) * 1.15
        return (
          <group key={`${row}-${c}`} position={[xPos, yPos, 0]}>
            <mesh>
              <boxGeometry args={[1.05, 1.05, 0.2]} />
              <meshStandardMaterial color={isQ && el.state === 'sorted' ? '#4ade80' : isQ && ac ? '#22d3ee' : tile} />
            </mesh>
            {isQ && ac && <mesh><boxGeometry args={[1.19, 1.19, 0.34]} /><meshBasicMaterial color="#ef4444" wireframe /></mesh>}
            {isQ && <Text position={[0, 0, 0.13]} fontSize={0.5} color="white" anchorX="center" anchorY="middle">♛</Text>}
          </group>
        )
      })
    })
  }

  if (topicId === 'greedy') {
    const n = elements.length
    return elements.map((el, i) => {
      const ac   = isActive(el.state)
      const text = el.label ? el.label.slice(0, 14) : String(el.value)
      const yPos = (n / 2 - i - 0.5) * 1.2
      return (
        <group key={i} position={[0, yPos, 0]}>
          <mesh><boxGeometry args={[5, 1, 0.3]} /><meshStandardMaterial color={stateColor(el.state)} /></mesh>
          {ac && <mesh><boxGeometry args={[5.14, 1.14, 0.44]} /><meshBasicMaterial color="#ef4444" wireframe /></mesh>}
          <Text position={[0, 0, 0.2]} fontSize={0.28} color="white" anchorX="center" anchorY="middle">{text}</Text>
        </group>
      )
    })
  }

  if (topicId === 'dp') {
    const maxCol   = Math.max(...elements.map(e => e.col ?? 0))
    const totalCols = maxCol + 1
    return elements.map((el, i) => {
      const ac   = isActive(el.state)
      const xPos = (el.col - totalCols / 2 + 0.5) * 1.1
      const yPos = -(el.row ?? 0) * 1.1
      return (
        <group key={i} position={[xPos, yPos, 0]}>
          <mesh>
            <boxGeometry args={[1, 1, 0.2]} />
            <meshStandardMaterial color={stateColor(el.state)} opacity={el.state === 'idle' ? 0.15 : 1} transparent />
          </mesh>
          {ac && <mesh><boxGeometry args={[1.14, 1.14, 0.34]} /><meshBasicMaterial color="#ef4444" wireframe /></mesh>}
          <Text position={[0, 0, 0.13]} fontSize={0.28} color="white" anchorX="center" anchorY="middle">{el.value}</Text>
        </group>
      )
    })
  }

  // fallback bars
  return elements.map((el, i) => (
    <BarEl key={i} value={el.value} index={i} total={elements.length} state={el.state} maxValue={maxValue} />
  ))
}

// ── Camera presets ────────────────────────────────────────────────────────────
function cameraFor(topicId, elementCount) {
  if (topicId === 'dp')           return [0, -2, elementCount * 0.8 + 8]
  if (topicId === 'backtracking') return [0, 0, 9]
  if (topicId === 'recursion')    return [0, elementCount * 0.6, 12]
  if (topicId === 'greedy')       return [0, 0, 11]
  if (SORT_TOPICS.has(topicId))   return [0, 3, Math.max(12, elementCount * 0.9)]
  return [0, 2, 11]
}

// ── Main component ────────────────────────────────────────────────────────────
export default function ThreeVisualizer({ frame, topicId }) {
  const [ready, setReady] = useState(false)
  const containerRef = useRef(null)

  // Give the browser two frames to paint the container before mounting Canvas
  // This prevents the "white flash then lag" on first 3D switch
  useEffect(() => {
    let raf1, raf2
    setReady(false)
    raf1 = requestAnimationFrame(() => {
      raf2 = requestAnimationFrame(() => setReady(true))
    })
    return () => { cancelAnimationFrame(raf1); cancelAnimationFrame(raf2) }
  }, [])   // intentionally [] — only do this once; topicId changes just update scene

  if (!frame) return null

  const elements = frame.elements || []
  const nums     = elements.map(e => Number(e.value)).filter(v => !isNaN(v))
  const maxValue = nums.length > 0 ? Math.max(...nums) : 1
  const camPos   = cameraFor(topicId, elements.length)

  const noFloor  = new Set(['dp','backtracking','recursion','greedy'])

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl overflow-hidden relative"
      style={{
        height: VIZ_H,
        background: 'linear-gradient(135deg, #f0f7ff 0%, #f5f0ff 50%, #f0faf5 100%)',
        border: '1px solid #e2e8f0',
      }}
    >
      {/* Loading placeholder — shown until Canvas is ready */}
      {!ready && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
          <div className="w-6 h-6 border-2 border-blue-400 border-t-transparent rounded-full animate-spin" />
          <span className="text-xs text-slate-400 font-medium">Initializing 3D…</span>
        </div>
      )}

      {/* Canvas — always mounted so WebGL context is created once */}
      <div className={ready ? 'opacity-100' : 'opacity-0'} style={{ height: VIZ_H }}>
        <Canvas
          camera={{ position: camPos, fov: 45 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: 'transparent' }}
          onCreated={({ scene }) => {
            scene.background = null  // transparent — shows container gradient bg
          }}
        >
          <color attach="background" args={['#f8fbff']} />
          <ambientLight intensity={0.9} />
          <pointLight position={[8, 8, 8]} intensity={1} />
          <spotLight position={[-8, 8, 8]} angle={0.2} penumbra={1} intensity={0.5} />

          <group>
            {buildScene(topicId, elements, maxValue)}

            {!noFloor.has(topicId) && (
              <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -3, 0]}>
                <planeGeometry args={[24, 12]} />
                <meshStandardMaterial color="#e8edf5" opacity={0.7} transparent />
              </mesh>
            )}
          </group>

          <OrbitControls makeDefault minPolarAngle={0} maxPolarAngle={Math.PI / 1.5} />
        </Canvas>
      </div>

      {/* 3D badge */}
      <div className="absolute top-2 left-2 pointer-events-none">
        <span className="px-2 py-0.5 bg-white/80 backdrop-blur-sm rounded-full text-[10px] font-semibold text-blue-600 border border-blue-100 shadow-sm">
          3D
        </span>
      </div>
    </div>
  )
}
