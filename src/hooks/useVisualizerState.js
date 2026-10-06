// src/hooks/useVisualizerState.js
import { useState, useCallback, useEffect, useRef } from 'react'
import { useAudioNarrator } from '../context/AudioNarratorContext'

import { generateBubbleSortFrames }    from '../utils/algorithms/bubbleSort'
import { generateArrayFrames }         from '../utils/algorithms/arrayOps'
import { generateLinkedListFrames }    from '../utils/algorithms/linkedList'
import { generateStackFrames }         from '../utils/algorithms/stackOps'
import { generateQueueFrames }         from '../utils/algorithms/queueOps'
import { generateTreeFrames }          from '../utils/algorithms/treeOps'
import { generateSelectionSortFrames } from '../utils/algorithms/selectionSort'
import { generateQuickSortFrames }     from '../utils/algorithms/quickSort'
import { generateBinarySearchFrames }  from '../utils/algorithms/binarySearch'
import { generateTreeTraversalFrames } from '../utils/algorithms/treeTraversal'
import { generateGraphFrames }         from '../utils/algorithms/graphOps'
import { generateStringFrames }        from '../utils/algorithms/strings'
import { generateBSTFrames }           from '../utils/algorithms/bst'
import { generateHeapFrames }          from '../utils/algorithms/heaps'
import { generateHashTableFrames }     from '../utils/algorithms/hashtables'
import { generateTrieFrames }          from '../utils/algorithms/tries'
import { generateInsertionSortFrames } from '../utils/algorithms/insertionsort'
import { generateMergeSortFrames }     from '../utils/algorithms/mergesort'
import { generateHeapSortFrames }      from '../utils/algorithms/heapsort'
import { generateLinearSearchFrames }  from '../utils/algorithms/linearSearch'
import { generateDFSFrames }           from '../utils/algorithms/dfs'
import { generateDijkstraFrames }      from '../utils/algorithms/dijkstra'
import { generateBellmanFordFrames }   from '../utils/algorithms/bellmanford'
import { generatePrimFrames }          from '../utils/algorithms/prim'
import { generateKruskalFrames }       from '../utils/algorithms/kruskal'
import { generateTwoPointersFrames }   from '../utils/algorithms/twoPointers'
import { generateSlidingWindowFrames } from '../utils/algorithms/slidingWindow'
import { generateRecursionFrames }     from '../utils/algorithms/recursion'
import { generateBacktrackingFrames }  from '../utils/algorithms/backtracking'
import { generateGreedyFrames }        from '../utils/algorithms/greedy'
import { generateDPFrames }            from '../utils/algorithms/dp'
import { generateDivideConquerFrames } from '../utils/algorithms/divideConquer'
import { generateBitManipulationFrames } from '../utils/algorithms/bitManipulation'

const DEFAULT_ARRAYS = {
  bubblesort:     [5, 3, 8, 1, 9, 2, 7, 4, 6],
  arrays:         [10, 20, 30, 40, 50],
  linkedlist:     [1, 2, 3, 4, 5],
  stacks:         [10, 20, 30],
  queues:         [10, 20, 30],
  trees:          [50, 30, 70, 20, 40, 60, 80],
  selectionsort:  [29, 10, 14, 37, 13],
  quicksort:      [38, 27, 43, 3, 9, 82, 10],
  binarysearch:   [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  treetraversal:  [50, 30, 70, 20, 40, 60, 80],
  strings:        [],
  bst:            [50, 30, 70, 20, 40, 60, 80],
  heaps:          [3, 9, 2, 1, 4, 5, 8, 7, 6],
  hashtables:     [12, 25, 7, 43, 18, 31],
  tries:          [],
  insertionsort:  [12, 11, 13, 5, 6],
  mergesort:      [38, 27, 43, 3, 9, 82, 10],
  heapsort:       [4, 10, 3, 5, 1],
  linearsearch:   [10, 20, 30, 40, 50, 60, 70],
  bfs:            [],
  dfs:            [],
  dijkstra:       [],
  bellmanford:    [],
  prim:           [],
  kruskal:        [],
  twopointers:    [1, 3, 5, 7, 9, 11, 13],
  slidingwindow:  [2, 1, 5, 1, 3, 2, 4, 1],
  recursion:      [5],
  backtracking:   [],
  greedy:         [3, 1, 4, 1, 5, 9, 2, 6],
  dp:             [2, 3, 4, 5],
  divideconquer:  [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
  bitmanipulation:[42],
}

function buildFrames(topicId, input) {
  const arr = (input && input.length > 0) ? input : (DEFAULT_ARRAYS[topicId] ?? [1, 2, 3, 4, 5])
  switch (topicId) {
    case 'bubblesort':     return generateBubbleSortFrames(arr)
    case 'linkedlist':     return generateLinkedListFrames(arr)
    case 'stacks':         return generateStackFrames(arr)
    case 'queues':         return generateQueueFrames(arr)
    case 'trees':          return generateTreeFrames(arr)
    case 'selectionsort':  return generateSelectionSortFrames(arr)
    case 'quicksort':      return generateQuickSortFrames(arr)
    case 'binarysearch':   return generateBinarySearchFrames(arr)
    case 'treetraversal':  return generateTreeTraversalFrames(arr)
    case 'graphs':         return generateGraphFrames(arr)
    case 'bfs':            return generateGraphFrames(arr)
    case 'strings':        return generateStringFrames(arr)
    case 'bst':            return generateBSTFrames(arr)
    case 'heaps':          return generateHeapFrames(arr)
    case 'hashtables':     return generateHashTableFrames(arr)
    case 'tries':          return generateTrieFrames(arr)
    case 'insertionsort':  return generateInsertionSortFrames(arr)
    case 'mergesort':      return generateMergeSortFrames(arr)
    case 'heapsort':       return generateHeapSortFrames(arr)
    case 'linearsearch':   return generateLinearSearchFrames(arr)
    case 'dfs':            return generateDFSFrames(arr)
    case 'dijkstra':       return generateDijkstraFrames(arr)
    case 'bellmanford':    return generateBellmanFordFrames(arr)
    case 'prim':           return generatePrimFrames(arr)
    case 'kruskal':        return generateKruskalFrames(arr)
    case 'twopointers':    return generateTwoPointersFrames(arr)
    case 'slidingwindow':  return generateSlidingWindowFrames(arr)
    case 'recursion':      return generateRecursionFrames(arr)
    case 'backtracking':   return generateBacktrackingFrames(arr)
    case 'greedy':         return generateGreedyFrames(arr)
    case 'dp':             return generateDPFrames(arr)
    case 'divideconquer':  return generateDivideConquerFrames(arr)
    case 'bitmanipulation':return generateBitManipulationFrames(arr)
    case 'arrays':
    default:               return generateArrayFrames(arr)
  }
}

export function useVisualizerState(topicId = 'arrays', playSpeedMs = 1500) {
  const [input, setInputArr]            = useState(DEFAULT_ARRAYS[topicId] ?? [1, 2, 3, 4, 5])
  const [steps, setSteps]               = useState(() => buildFrames(topicId, DEFAULT_ARRAYS[topicId]))
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying]       = useState(false)
  const [isComplete, setIsComplete]     = useState(false)

  const { isNarratorEnabled, speak, cancel, supported } = useAudioNarrator()

  // Keep playSpeedMs in a ref so the autoplay effect always uses the latest value
  const playSpeedMsRef = useRef(playSpeedMs)
  useEffect(() => { playSpeedMsRef.current = playSpeedMs }, [playSpeedMs])

  // Keep a stable ref to steps.length so autoplay effect doesn't need steps in deps
  const stepsLenRef = useRef(steps.length)
  useEffect(() => { stepsLenRef.current = steps.length }, [steps.length])

  // Reset everything when topicId changes
  useEffect(() => {
    cancel()
    const defaultArr = DEFAULT_ARRAYS[topicId] ?? [1, 2, 3, 4, 5]
    const newSteps   = buildFrames(topicId, defaultArr)
    setInputArr(defaultArr)
    setSteps(newSteps)
    stepsLenRef.current = newSteps.length
    setCurrentIndex(0)
    setIsPlaying(false)
    setIsComplete(false)
  }, [topicId]) // eslint-disable-line react-hooks/exhaustive-deps

  const currentFrame = steps[currentIndex] ?? steps[0]

  // ── stable callbacks — none of these should ever appear in the autoplay effect deps
  const nextStep = useCallback(() => {
    setCurrentIndex(prev => {
      if (prev >= stepsLenRef.current - 1) {
        setIsComplete(true)
        setIsPlaying(false)
        return prev
      }
      return prev + 1
    })
  }, []) // intentionally empty — uses ref

  const prevStep = useCallback(() => {
    // Cancel speech + stop autoplay on manual step
    cancel()
    setIsPlaying(false)
    setCurrentIndex(prev => {
      setIsComplete(false)
      return prev <= 0 ? 0 : prev - 1
    })
  }, [cancel])

  const play = useCallback(() => {
    if (isComplete) return
    setIsPlaying(true)
  }, [isComplete])

  const pause = useCallback(() => {
    cancel()
    setIsPlaying(false)
  }, [cancel])

  const reset = useCallback(() => {
    cancel()
    setCurrentIndex(0)
    setIsPlaying(false)
    setIsComplete(false)
  }, [cancel])

  const setInput = useCallback((newArr) => {
    cancel()
    const frames = buildFrames(topicId, newArr)
    setInputArr(newArr)
    setSteps(frames)
    stepsLenRef.current = frames.length
    setCurrentIndex(0)
    setIsPlaying(false)
    setIsComplete(false)
  }, [topicId, cancel])

  // ── Autoplay effect — only re-runs when currentIndex or isPlaying changes ──
  // Does NOT depend on speak/cancel/nextStep to avoid re-triggering on each step
  const speakRef    = useRef(speak)
  const cancelRef   = useRef(cancel)
  const narratorRef = useRef(isNarratorEnabled)
  const supportedRef = useRef(supported)
  useEffect(() => { speakRef.current    = speak },          [speak])
  useEffect(() => { cancelRef.current   = cancel },         [cancel])
  useEffect(() => { narratorRef.current = isNarratorEnabled }, [isNarratorEnabled])
  useEffect(() => { supportedRef.current = supported },     [supported])

  useEffect(() => {
    cancelRef.current()
    if (!isPlaying || isComplete) return

    const description = currentFrame?.description || ''

    if (narratorRef.current && supportedRef.current && description) {
      speakRef.current(description, () => {
        const timer = setTimeout(() => nextStep(), 300)
        return () => clearTimeout(timer)
      })
    } else {
      // Timer-based autoplay — uses the speed ref so changes take effect immediately
      const delay = playSpeedMsRef.current
      const timer = setTimeout(() => nextStep(), delay)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, isPlaying, isComplete]) // eslint-disable-line react-hooks/exhaustive-deps

  // Manual next: cancel speech, stop autoplay, advance once
  const manualNext = useCallback(() => {
    cancel()
    setIsPlaying(false)
    setCurrentIndex(prev => {
      if (prev >= stepsLenRef.current - 1) {
        setIsComplete(true)
        return prev
      }
      return prev + 1
    })
  }, [cancel])

  return {
    steps, currentIndex, currentFrame, isPlaying, isComplete,
    play, pause,
    nextStep: manualNext,   // manual button uses debounced single-step version
    prevStep,
    reset, setInput, input,
  }
}

export default useVisualizerState
