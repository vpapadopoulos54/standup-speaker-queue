function Controls({ onShuffle, onResetQueue, onClearAll, membersCount }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">🎮 Controls</h2>

      <div className="space-y-3">
        <button
          onClick={onShuffle}
          disabled={membersCount === 0}
          className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition"
        >
          🎲 Shuffle Order
        </button>
        <button
          onClick={onResetQueue}
          disabled={membersCount === 0}
          className="w-full bg-orange-600 hover:bg-orange-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition"
        >
          ↩️ Reset Queue
        </button>
        <button
          onClick={onClearAll}
          disabled={membersCount === 0}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-3 px-4 rounded-lg transition"
        >
          🗑️ Clear All
        </button>
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <p className="text-sm text-gray-700">
          <span className="font-semibold">Tip:</span> Click "Shuffle Order" to randomize speaking order, then use "Next Speaker" to advance through the queue.
        </p>
      </div>
    </div>
  )
}

export default Controls
