import { useState } from 'react'
import SimpleInputMode from './components/SimpleInputMode'
import BusinessNumberMode from './components/BusinessNumberMode'

type Mode = 'simple' | 'business'

function App() {
  const [mode, setMode] = useState<Mode>('simple')

  return (
    <div style={{ padding: '20px' }}>
      <h1>React Input</h1>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ marginRight: '16px' }}>
          <input
            type="radio"
            name="mode"
            value="simple"
            checked={mode === 'simple'}
            onChange={() => setMode('simple')}
          />
          {' '}単純入力モード
        </label>
        <label>
          <input
            type="radio"
            name="mode"
            value="business"
            checked={mode === 'business'}
            onChange={() => setMode('business')}
          />
          {' '}ビジネス標準数字モード
        </label>
      </div>

      {mode === 'simple' ? <SimpleInputMode /> : <BusinessNumberMode />}
    </div>
  )
}

export default App
