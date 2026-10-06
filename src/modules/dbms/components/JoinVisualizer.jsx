import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const TABLE_A = [
  { id: 1, name: 'Alice', course: 'CS' },
  { id: 2, name: 'Bob', course: 'Math' },
  { id: 3, name: 'Charlie', course: 'CS' },
]

const TABLE_B = [
  { student_id: 1, grade: 'A' },
  { student_id: 2, grade: 'B' },
  { student_id: 4, grade: 'A' }, // No match
]

export default function JoinVisualizer() {
  const [joinType, setJoinType] = useState('inner') // inner, left, right

  const getJoinedData = () => {
    if (joinType === 'inner') {
      return TABLE_A.flatMap(a => 
        TABLE_B.filter(b => b.student_id === a.id).map(b => ({ ...a, ...b }))
      )
    }
    if (joinType === 'left') {
      return TABLE_A.map(a => {
        const match = TABLE_B.find(b => b.student_id === a.id)
        return match ? { ...a, ...match } : { ...a, student_id: 'NULL', grade: 'NULL' }
      })
    }
    return [] // Simplified
  }

  const joinedData = getJoinedData()

  return (
    <div className="space-y-8 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-2xl border border-gray-200 dark:border-gray-700">
      <div className="flex justify-center gap-4">
        {['inner', 'left'].map((type) => (
          <button
            key={type}
            onClick={() => setJoinType(type)}
            className={`px-4 py-2 rounded-xl text-sm font-bold uppercase tracking-wider transition-all ${joinType === type ? 'bg-purple-600 text-white shadow-lg' : 'bg-white dark:bg-gray-800 text-gray-500'}`}
          >
            {type} Join
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Table A */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase">Table A (Students)</h3>
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500">
                <tr><th className="p-2">ID</th><th className="p-2">Name</th></tr>
              </thead>
              <tbody>
                {TABLE_A.map(row => (
                  <tr key={row.id} className="border-t border-gray-100 dark:border-gray-700">
                    <td className="p-2">{row.id}</td><td className="p-2">{row.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table B */}
        <div className="space-y-2">
          <h3 className="text-xs font-bold text-gray-400 uppercase">Table B (Grades)</h3>
          <div className="overflow-hidden rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
            <table className="w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700 text-gray-500">
                <tr><th className="p-2">S_ID</th><th className="p-2">Grade</th></tr>
              </thead>
              <tbody>
                {TABLE_B.map((row, i) => (
                  <tr key={i} className="border-t border-gray-100 dark:border-gray-700">
                    <td className="p-2">{row.student_id}</td><td className="p-2">{row.grade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Result Table */}
      <div className="space-y-2">
        <h3 className="text-sm font-bold text-purple-600 uppercase">Result (Joined Table)</h3>
        <div className="overflow-hidden rounded-2xl border-2 border-purple-200 dark:border-purple-900 bg-white dark:bg-gray-800 shadow-xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-purple-50 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300">
              <tr>
                <th className="p-3">ID</th><th className="p-3">Name</th>
                <th className="p-3">S_ID</th><th className="p-3">Grade</th>
              </tr>
            </thead>
            <motion.tbody layout>
              <AnimatePresence mode="popLayout">
                {joinedData.map((row, i) => (
                  <motion.tr
                    key={`${joinType}-${i}`}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="border-t border-gray-100 dark:border-gray-700"
                  >
                    <td className="p-3 font-medium">{row.id}</td>
                    <td className="p-3">{row.name}</td>
                    <td className="p-3 bg-purple-50/50 dark:bg-purple-900/20">{row.student_id}</td>
                    <td className="p-3 bg-purple-50/50 dark:bg-purple-900/20 font-bold text-purple-600">{row.grade}</td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </motion.tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
