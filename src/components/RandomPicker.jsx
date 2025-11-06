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
    <div className="bg-gradient-to-br from-amber-500 to-orange-600 rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-white mb-4">🎲 Pick Random Starter</h2>
      <p className="text-amber-100 text-sm mb-6">Click the dice to randomly select who starts the standup!</p>

      <div className="bg-white rounded-lg p-8 mb-6 min-h-24 flex items-center justify-center">
        {selectedMember ? (
          <div className="text-center">
            <p className="text-gray-600 text-sm font-semibold mb-2">Selected:</p>
            <p className="text-3xl font-bold text-orange-600">{selectedMember.name}</p>
            <p className="text-gray-500 text-sm mt-2">({selectedMember.tag})</p>
          </div>
        ) : (
          <p className="text-gray-400 text-center">Click the dice to pick a random starter</p>
        )}
      </div>

      <button
        onClick={pickRandom}
        disabled={members.length === 0 || isRolling}
        className={`w-full py-4 px-4 rounded-lg font-bold text-xl transition transform ${
          isRolling ? 'scale-110' : 'hover:scale-105'
        } ${
          members.length === 0
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
            : 'bg-white text-orange-600 hover:bg-amber-50 active:scale-95'
        }`}
      >
        {isRolling ? '🎲 Rolling...' : '🎲 Pick Random'}
      </button>

      {selectedMember && (
        <button
          onClick={() => {
            setSelectedMember(null)
            onSelectSpeaker(null)
          }}
          className="w-full mt-3 bg-white bg-opacity-20 hover:bg-opacity-30 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Clear Selection
        </button>
      )}
    </div>
  )
}

export default RandomPicker
