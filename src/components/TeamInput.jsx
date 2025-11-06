import { useState } from 'react'

function TeamInput({ onAddMember, members, onRemoveMember, onUpdateTag }) {
  const [name, setName] = useState('')
  const [tag, setTag] = useState('')
  const [editingId, setEditingId] = useState(null)
  const [editingTag, setEditingTag] = useState('')

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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">👥 Team Members</h2>

      <div className="space-y-3 mb-4">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter team member name..."
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="text"
          value={tag}
          onChange={(e) => setTag(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Tag/Project (optional)"
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleAddMember}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
        >
          Add Member
        </button>
      </div>

      <div className="border-t pt-4">
        <h3 className="font-semibold text-gray-700 mb-3">Team List</h3>
        {members.length === 0 ? (
          <p className="text-gray-400 text-sm">No team members added yet</p>
        ) : (
          <div className="space-y-2 max-h-96 overflow-y-auto">
            {members.map((member) => (
              <div
                key={member.id}
                className="flex items-center justify-between bg-gray-50 p-3 rounded-lg group hover:bg-gray-100 transition"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{member.name}</p>
                </div>

                {editingId === member.id ? (
                  <div className="flex items-center gap-2 ml-2">
                    <input
                      type="text"
                      value={editingTag}
                      onChange={(e) => setEditingTag(e.target.value)}
                      onKeyPress={handleEditKeyPress}
                      placeholder="Tag..."
                      autoFocus
                      className="px-2 py-1 text-sm border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button
                      onClick={saveTag}
                      className="text-green-600 hover:text-green-800 font-bold text-sm"
                    >
                      ✓
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-600 hover:text-gray-800 font-bold text-sm"
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
                      {member.tag === 'untagged' ? 'Add Tag' : `Tag: ${member.tag}`}
                    </button>
                    <button
                      onClick={() => onRemoveMember(member.id)}
                      className="ml-2 text-red-600 hover:text-red-800 text-sm font-semibold"
                    >
                      ×
                    </button>
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default TeamInput
