import { useState } from 'react'

function App() {
  const [text, setText] = useState('')
  const [savedItems, setSavedItems] = useState<string[]>([])

  const handleSave = () => {
    if (text.trim()) {
      setSavedItems([text, ...savedItems])
      setText('')
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSave()
    }
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>React Input</h1>
      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="テキストを入力..."
          style={{ padding: '8px', fontSize: '16px', width: '300px' }}
        />
        <button
          onClick={handleSave}
          style={{ padding: '8px 16px', fontSize: '16px', cursor: 'pointer' }}
        >
          完了
        </button>
      </div>

      {savedItems.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>保存済み</h2>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {savedItems.map((item, index) => (
              <li
                key={index}
                style={{
                  padding: '8px',
                  marginBottom: '4px',
                  backgroundColor: '#f0f0f0',
                  borderRadius: '4px',
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
