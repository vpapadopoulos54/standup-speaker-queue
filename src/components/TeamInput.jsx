import { useState } from 'react'

function TeamInput({ onAddMember, members, onRemoveMember, onUpdateTag }) {
  const [name, setName] = useState('')
  const [tag, setTag] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingTag, setEditingTag] = useState('')
  const [isListCollapsed, setIsListCollapsed] = useState(false)

  const handleAddMember = () => {
    onAddMember(name, tag)
    setName('')
    setTag('')
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAddMember()
    }
  }

  const startEditingTag = (member) => {
    setEditingId(member.id)
    setEditingTag(member.tag === 'untagged' ? '' : member.tag)
  }

  const saveTag = () => {
    if (editingId !== null) {
      onUpdateTag(editingId, editingTag)
      setEditingId(null)
      setEditingTag('')
    }
  }

  const handleEditKeyPress = (e) => {
    if (e.key === 'Enter') {
      saveTag()
    } else if (e.key === 'Escape') {
      setEditingId(null)
      setEditingTag('')
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-slate-100">
      <h2 className="text-lg font-semibold text-slate-900 mb-4">👥 Team Members</h2>

      <div className="space-y-2 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Add member..."
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Optional tag..."
          className="w-full px-4 py-2.5 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm"
        />
        <button
          onClick={handleAddMember}
          className="w-full bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 text-white font-bold py-2.5 px-4 rounded-lg transition transform hover:scale-105 active:scale-95 text-sm shadow-md hover:shadow-lg"
        >
          ➕ Add Member
        </button>
      </div>

      <div className="border-t border-slate-200 pt-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-slate-700 text-sm">
            List ({members.length})
          </h3>
          {members.length > 0 && (
            <button
              onClick={() => setIsListCollapsed(!isListCollapsed)}
              className="text-slate-500 hover:text-slate-700 transition"
            >
              {isListCollapsed ? '▶' : '▼'}
            </button>
          )}
        </div>
        {members.length === 0 ? (
          <p className="text-slate-400 text-sm">No members yet</p>
        ) : !isListCollapsed ? (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between bg-slate-50 p-3 rounded-lg group hover:bg-slate-100 transition"
              >
                <div className="flex-1">
                  <p className="font-medium text-slate-800 text-sm">{member.name}</p>
                </div>

                {editingId === member.id ? (
                  <div className="flex items-center gap-1 ml-2">
                    <input
                      type="text"
                      value={editingTag}
                      onChange={(e) => setEditingTag(e.target.value)}
                      onKeyPress={handleEditKeyPress}
                      placeholder="Tag..."
                      autoFocus
                      className="px-2 py-1 text-xs border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={saveTag}
                      className="text-green-600 hover:text-green-800 font-bold text-xs"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-slate-600 hover:text-slate-800 font-bold text-xs"
                    >
                      ✕
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => startEditingTag(member)}
                      className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-700 hover:bg-blue-200 rounded font-semibold transition opacity-0 group-hover:opacity-100"
                    >
                      {member.tag === 'untagged' ? 'Add' : member.tag}
                    </button>
                    <button
                      onClick={() => onRemoveMember(member.id)}
                      className="ml-1 text-red-600 hover:text-red-800 text-xs font-bold"
                    >
                      ✕
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-slate-400 text-sm">
            {members.length} member{members.length !== 1 ? 's' : ''} (collapsed)
          </p>
        )}
      </div>
    </div>
  )
}

export default TeamInput
