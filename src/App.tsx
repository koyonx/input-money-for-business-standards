import { useState } from 'react'

function App() {
  const [text, setText] = useState('')

  return (
    <div style={{ padding: '20px' }}>
      <h1>React Input</h1>
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="テキストを入力..."
        style={{ padding: '8px', fontSize: '16px', width: '300px' }}
      />
      <p>入力値: {text}</p>
    </div>
  )
}

export default App
