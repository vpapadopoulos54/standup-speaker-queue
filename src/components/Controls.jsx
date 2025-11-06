function Controls({ onShuffle, onResetQueue, onClearAll, membersCount }) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">Controls</h2>

      <div className="space-y-2">
        <button
          onClick={onShuffle}
          disabled={membersCount === 0}
          className="w-full bg-slate-600 hover:bg-slate-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
        >
          Shuffle Order
        </button>
        <button
          onClick={onResetQueue}
          disabled={membersCount === 0}
          className="w-full bg-slate-500 hover:bg-slate-600 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
        >
          Reset Queue
        </button>
        <button
          onClick={onClearAll}
          disabled={membersCount === 0}
          className="w-full bg-red-600 hover:bg-red-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition text-sm"
        >
          Clear All
        </button>
      </div>
    </div>
  )
}

export default Controls
