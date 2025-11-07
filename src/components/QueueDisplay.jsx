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

      {/* Current Speaker Card - PROMINENT */}
      <style>{`
        @keyframes pulse-ring {
          0% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0.7);
          }
          50% {
            box-shadow: 0 0 0 10px rgba(139, 92, 246, 0);
          }
          100% {
            box-shadow: 0 0 0 0 rgba(139, 92, 246, 0);
          }
        }

        @keyframes slide-shine {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        .pulse-ring {
          animation: pulse-ring 2s infinite;
        }

        .shine-effect {
          position: relative;
          overflow: hidden;
        }

        .shine-effect::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          animation: slide-shine 3s infinite;
        }
      `}</style>

      <div className="pulse-ring bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-600 rounded-3xl shadow-2xl p-8 border-2 border-purple-300 relative">
        <div className="shine-effect rounded-2xl">
          <p className="text-white text-xs font-black uppercase tracking-widest mb-2 animate-pulse">
            🎙️ LIVE - NOW SPEAKING
          </p>
          <h2 className="text-6xl font-black text-white mb-2 drop-shadow-lg">
            {currentSpeakerName ? currentSpeakerName : 'WAITING...'}
          </h2>
          {currentSpeakerName && (
            <>
              <p className="text-purple-100 text-sm mb-6 capitalize font-bold">
                📍 {getMemberTag(currentSpeaker)}
              </p>
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-xl p-3 mb-6 border border-purple-200">
                <p className="text-white text-xs font-semibold text-center">
                  ✨ This is who's speaking right now! Keep time and pay attention ✨
                </p>
              </div>
            </>
          )}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onNextSpeaker}
            disabled={queue.length === 0}
            className="flex-1 bg-gradient-to-r from-amber-400 to-orange-500 hover:from-amber-300 hover:to-orange-400 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-amber-950 font-black py-3.5 px-4 rounded-xl transition transform hover:scale-110 active:scale-95 text-sm shadow-2xl hover:shadow-3xl disabled:shadow-none border-2 border-amber-600"
          >
            🎲 Next
          </button>
          <button
            onClick={onMarkAsSpeaker}
            disabled={!currentSpeaker}
            className="flex-1 bg-gradient-to-r from-emerald-400 to-green-500 hover:from-emerald-300 hover:to-green-400 disabled:from-gray-400 disabled:to-gray-400 disabled:cursor-not-allowed text-emerald-950 font-black py-3.5 px-4 rounded-xl transition transform hover:scale-110 active:scale-95 text-sm shadow-2xl hover:shadow-3xl disabled:shadow-none border-2 border-emerald-600"
          >
            ✓ Done
          </button>
        </div>
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
