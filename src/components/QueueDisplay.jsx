function QueueDisplay({
  members,
  queue,
  spoken,
  currentSpeaker,
  onNextSpeaker,
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
      <div className="bg-white rounded-lg shadow-lg p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-3">Filter by Tag</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <button
              key={tag}
              onClick={() => onSelectTag(tag)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                selectedTag === tag
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
              }`}
            >
              {tag === 'all' ? 'All' : tag}
            </button>
          ))}
        </div>
      </div>

      {/* Current Speaker Card */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-8">
        <p className="text-green-100 text-sm font-semibold mb-2">CURRENT SPEAKER</p>
        <h2 className="text-4xl font-bold text-white mb-6">
          {currentSpeakerName ? `🎤 ${currentSpeakerName}` : '—'}
        </h2>
        <p className="text-green-100 text-sm mb-4">
          {currentSpeakerName ? `(${getMemberTag(currentSpeaker)})` : 'No one selected yet'}
        </p>
        <div className="flex gap-3">
          <button
            onClick={onNextSpeaker}
            disabled={remaining.length === 0}
            className="flex-1 bg-white text-green-600 hover:bg-green-50 disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed font-bold py-3 px-4 rounded-lg transition"
          >
            Next Speaker
          </button>
          <button
            onClick={onMarkAsSpeaker}
            disabled={!currentSpeaker}
            className="flex-1 bg-white text-green-600 hover:bg-green-50 disabled:bg-gray-400 disabled:text-gray-600 disabled:cursor-not-allowed font-bold py-3 px-4 rounded-lg transition"
          >
            ✓ Done Speaking
          </button>
        </div>
      </div>

      {/* Queue Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm font-semibold">Spoke</p>
          <p className="text-3xl font-bold text-gray-800">{spoken.length}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-gray-600 text-sm font-semibold">Remaining</p>
          <p className="text-3xl font-bold text-blue-600">{remaining.length}</p>
        </div>
      </div>

      {/* Queue Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Already Spoke */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">✅ Already Spoke</h3>
          {spoken.length === 0 ? (
            <p className="text-gray-400">No one has spoken yet</p>
          ) : (
            <div className="space-y-2">
              {spoken.map((id, index) => (
                <div key={id} className="flex items-center gap-3 bg-green-50 p-3 rounded-lg">
                  <span className="flex-shrink-0 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{getMemberName(id)}</p>
                    <p className="text-xs text-gray-500">{getMemberTag(id)}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Still to Speak */}
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">⏳ Still to Speak</h3>
          {remaining.length === 0 ? (
            <p className="text-gray-400">
              {queue.length === 0 ? 'Add team members to start' : 'Everyone has spoken!'}
            </p>
          ) : (
            <div className="space-y-2">
              {remaining.map((id, index) => (
                <div
                  key={id}
                  className={`flex items-center gap-3 p-3 rounded-lg ${
                    currentSpeaker === id
                      ? 'bg-yellow-100 border-2 border-yellow-500'
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <span className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{getMemberName(id)}</p>
                    <p className="text-xs text-gray-500">{getMemberTag(id)}</p>
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
