import { useState } from 'react'

function SimpleInputMode() {
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
    <div>
      <h2>単純入力モード</h2>
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
          <h3>保存済み</h3>
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

export default SimpleInputMode
