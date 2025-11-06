function QueueDisplay({
  members,
  queue,
  spoken,
  currentSpeaker,
  onMarkAsSpeaker,
  tags,
  selectedTag,
  onSelectTag,
}) {
  const getMemberName = (id) => {
    return members.find(m => m.id === id)?.name || 'Unknown'
  }

  const getMemberTag = (id) => {
    return members.find(m => m.id === id)?.tag || 'untagged'
  }

  const currentSpeakerName = currentSpeaker ? getMemberName(currentSpeaker) : null
  const remaining = queue.filter(id => !spoken.includes(id))

  return (
    <div className="space-y-6">
      {/* Filter Section */}
      <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
        <h3 className="text-sm font-semibold text-slate-700 mb-3">Filter</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className={`px-3 py-1.5 rounded-lg font-semibold transition text-sm ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              {tag === 'all' ? 'All' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Current Speaker Card */}
      <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl shadow-xl p-8">
        <p className="text-blue-100 text-xs font-semibold uppercase tracking-wider mb-3">Now Speaking</p>
        <h2 className="text-5xl font-bold text-white mb-6">
          {currentSpeakerName ? currentSpeakerName : '—'}
        </h2>
        {currentSpeakerName && (
          <p className="text-blue-100 text-sm mb-6 capitalize">
            {getMemberTag(currentSpeaker)}
          </p>
        )}
        <button
          onClick={onMarkAsSpeaker}
          disabled={!currentSpeaker}
          className="w-full bg-white text-blue-600 hover:bg-blue-50 disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed font-semibold py-3 px-4 rounded-lg transition transform hover:scale-105 active:scale-95"
        >
          Mark as Done
        </button>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-2xl shadow-md p-5 border border-slate-100">
          <p className="text-slate-600 text-xs font-semibold uppercase">Spoke</p>
          <p className="text-3xl font-bold text-slate-900 mt-2">{spoken.length}</p>
        </div>
        <div className="bg-white rounded-2xl shadow-md p-5 border border-slate-100">
          <p className="text-slate-600 text-xs font-semibold uppercase">Remaining</p>
          <p className="text-3xl font-bold text-blue-600 mt-2">{remaining.length}</p>
        </div>
      </div>

      {/* Queue Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Already Spoke */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Spoken</h3>
          {spoken.length === 0 ? (
            <p className="text-slate-400 text-sm">No one has spoken yet</p>
          ) : (
            <div className="space-y-2">
              {spoken.map((id, index) => (
                <div key={id} className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-100">
                  <span className="flex-shrink-0 w-7 h-7 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">{getMemberName(id)}</p>
                    <p className="text-xs text-slate-500 capitalize">{getMemberTag(id)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Still to Speak */}
        <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
          <h3 className="text-sm font-semibold text-slate-700 mb-4">Queue</h3>
          {remaining.length === 0 ? (
            <p className="text-slate-400 text-sm">
              {queue.length === 0 ? 'Add team members to start' : 'Everyone has spoken!'}
            </p>
          ) : (
            <div className="space-y-2">
              {remaining.map((id, index) => (
                <div
                  key={id}
                  className={`flex items-center gap-3 p-3 rounded-lg transition ${
                    currentSpeaker === id
                      ? 'bg-blue-100 border-2 border-blue-500'
                      : 'bg-slate-50 border border-slate-200'
                  }`}
                >
                  <span className="flex-shrink-0 w-7 h-7 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xs">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-slate-800 text-sm">{getMemberName(id)}</p>
                    <p className="text-xs text-slate-500 capitalize">{getMemberTag(id)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default QueueDisplay
