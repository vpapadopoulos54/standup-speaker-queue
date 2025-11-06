import { useState } from 'react'

function RandomPicker({ members, onSelectSpeaker }) {
  const [selectedMember, setSelectedMember] = useState(null)
  const [isRolling, setIsRolling] = useState(false)

  const pickRandom = () => {
    if (members.length === 0) return

    setIsRolling(true)

    // Animate the dice roll
    let rollCount = 0
    const rollInterval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * members.length)
      setSelectedMember(members[randomIndex])
      rollCount++

      if (rollCount > 15) {
        clearInterval(rollInterval)
        const finalIndex = Math.floor(Math.random() * members.length)
        const finalMember = members[finalIndex]
        setSelectedMember(finalMember)
        setIsRolling(false)
        onSelectSpeaker(finalMember.id)
      }
    }, 50)
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">🎲 Random Starter</h2>

      {selectedMember ? (
        <div className="bg-gradient-to-br from-violet-100 via-purple-100 to-pink-100 rounded-xl p-6 mb-4 border border-purple-200">
          <p className="text-purple-600 text-xs font-semibold uppercase tracking-wider mb-2">Selected</p>
          <p className="text-3xl font-bold text-purple-900">{selectedMember.name}</p>
          <p className="text-purple-600 text-sm mt-2 capitalize font-medium">{selectedMember.tag}</p>
        </div>
      ) : (
        <p className="text-slate-400 text-sm mb-4">Roll the dice to pick a random starter</p>
      )}

      <button
        onClick={pickRandom}
        disabled={members.length === 0 || isRolling}
        className={`w-full py-3 px-4 rounded-xl font-bold text-sm transition transform shadow-lg hover:shadow-xl ${
          isRolling ? 'scale-110' : 'hover:scale-105'
        } ${
          members.length === 0
            ? 'bg-slate-200 text-slate-500 cursor-not-allowed shadow-none'
            : 'bg-gradient-to-r from-violet-500 to-purple-600 text-white hover:from-violet-600 hover:to-purple-700 active:scale-95'
        }`}
      >
        {isRolling ? '🎲 Rolling...' : '🎲 Roll Dice'}
      </button>

      {selectedMember && (
        <button
          onClick={() => {
            setSelectedMember(null)
            onSelectSpeaker(null)
          }}
          className="w-full mt-2 bg-gradient-to-r from-slate-200 to-slate-300 hover:from-slate-300 hover:to-slate-400 text-slate-700 font-semibold py-2.5 px-4 rounded-lg transition text-sm shadow-sm"
        >
          Clear
        </button>
      )}
    </div>
  )
}

export default RandomPicker
