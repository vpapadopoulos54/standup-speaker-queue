import { useState, useEffect } from 'react'
import TeamInput from './components/TeamInput'
import Controls from './components/Controls'
import RandomPicker from './components/RandomPicker'
import QueueDisplay from './components/QueueDisplay'
import './App.css'

function App() {
  const [members, setMembers] = useState([])
  const [queue, setQueue] = useState([])
  const [spoken, setSpoken] = useState([])
  const [currentSpeaker, setCurrentSpeaker] = useState(null)
  const [selectedTag, setSelectedTag] = useState('all')

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('standupMembers')
    if (saved) {
      const parsedMembers = JSON.parse(saved)
      setMembers(parsedMembers)
      setQueue(parsedMembers.map(m => m.id))
    }
  }, [])

  // Save to localStorage whenever members change
  useEffect(() => {
    localStorage.setItem('standupMembers', JSON.stringify(members))
  }, [members])

  const addMember = (name, tag) => {
    if (name.trim()) {
      const newMember = {
        id: Date.now(),
        name: name.trim(),
        tag: tag.trim() || 'untagged',
      }
      setMembers([...members, newMember])
      setQueue([...queue, newMember.id])
    }
  }

  const removeMember = (id) => {
    setMembers(members.filter(m => m.id !== id))
    setQueue(queue.filter(memberId => memberId !== id))
    setSpoken(spoken.filter(memberId => memberId !== id))
    if (currentSpeaker === id) {
      setCurrentSpeaker(null)
    }
  }

  const shuffle = () => {
    const remaining = queue.filter(id => !spoken.includes(id))
    const shuffled = [...remaining].sort(() => Math.random() - 0.5)
    const newQueue = [...spoken, ...shuffled]
    setQueue(newQueue)
    setCurrentSpeaker(null)
  }

  const nextSpeaker = () => {
    const remaining = queue.filter(id => !spoken.includes(id))
    if (remaining.length > 0) {
      const nextId = remaining[0]
      setCurrentSpeaker(nextId)
    }
  }

  const markAsSpeaker = () => {
    if (currentSpeaker && !spoken.includes(currentSpeaker)) {
      setSpoken([...spoken, currentSpeaker])
      // Move to next speaker
      const remaining = queue.filter(id => !spoken.includes(id) && id !== currentSpeaker)
      if (remaining.length > 0) {
        setCurrentSpeaker(remaining[0])
      } else {
        setCurrentSpeaker(null)
      }
    }
  }

  const resetQueue = () => {
    setSpoken([])
    setCurrentSpeaker(null)
  }

  const clearAll = () => {
    if (confirm('Are you sure you want to clear all team members?')) {
      setMembers([])
      setQueue([])
      setSpoken([])
      setCurrentSpeaker(null)
    }
  }

  // Get filtered members based on selected tag
  const filteredMembers = selectedTag === 'all'
    ? members
    : members.filter(m => m.tag === selectedTag)

  const filteredQueue = queue.filter(id =>
    filteredMembers.some(m => m.id === id)
  )

  const filteredSpoken = spoken.filter(id =>
    filteredMembers.some(m => m.id === id)
  )

  const allTags = ['all', ...new Set(members.map(m => m.tag))]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">🎤 Standup Speaker Queue</h1>
          <p className="text-gray-600">Manage your daily standup order</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Input and Controls */}
          <div className="lg:col-span-1 space-y-6">
            <TeamInput onAddMember={addMember} members={members} onRemoveMember={removeMember} />
            <RandomPicker members={members} onSelectSpeaker={setCurrentSpeaker} />
            <Controls
              onShuffle={shuffle}
              onResetQueue={resetQueue}
              onClearAll={clearAll}
              membersCount={filteredMembers.length}
            />
          </div>

          {/* Right Column: Queue Display */}
          <div className="lg:col-span-2">
            <QueueDisplay
              members={members}
              queue={filteredQueue}
              spoken={filteredSpoken}
              currentSpeaker={currentSpeaker}
              onNextSpeaker={nextSpeaker}
              onMarkAsSpeaker={markAsSpeaker}
              tags={allTags}
              selectedTag={selectedTag}
              onSelectTag={setSelectedTag}
            />
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-600">
          <p>Made for distributed teams 💙</p>
        </footer>
      </div>
    </div>
  )
}

export default App
