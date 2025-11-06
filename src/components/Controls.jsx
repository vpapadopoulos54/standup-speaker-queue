function Controls({ onShuffle, onResetQueue, onClearAll, membersCount }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">⚙️ Controls</h2>

      <div className="space-y-2">
        <button
          onClick={onShuffle}
          disabled={membersCount === 0}
          className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-2.5 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 text-sm shadow-md hover:shadow-lg"
        >
          🔀 Shuffle
        </button>
        <button
          onClick={onResetQueue}
          disabled={membersCount === 0}
          className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-2.5 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 text-sm shadow-md hover:shadow-lg"
        >
          ↩️ Reset
        </button>
        <button
          onClick={onClearAll}
          disabled={membersCount === 0}
          className="w-full bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 disabled:from-slate-200 disabled:to-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-bold py-2.5 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 text-sm shadow-md hover:shadow-lg"
        >
          🗑️ Clear All
        </button>
      </div>
    </div>
  )
}

export default Controls
