import { useState } from 'react'

// 全角を半角に変換し、無効な文字を除去する正規化関数
const normalizeToHalfWidth = (value: string): string => {
  return value
    // 全角数字を半角に変換
    .replace(/[０-９]/g, (digit) =>
      String.fromCharCode(digit.charCodeAt(0) - '０'.charCodeAt(0) + '0'.charCodeAt(0))
    )
    // 全角小数点を半角に
    .replace(/．/g, '.')
    // 各種マイナス記号を半角に統一
    .replace(/[ー−‒–—―﹣－]/g, '-')
    // 有効な文字のみ残す（数字、小数点、マイナス）
    .replace(/[^0-9.\-]/g, '')
}

// 数値に変換する関数
const parseNumber = (value: string): number => {
  return Number(value)
}

// 数値を日本のビジネス標準フォーマット（カンマ区切り）で表示
const formatNumber = (num: number): string => {
  if (isNaN(num)) return ''
  return num.toLocaleString('ja-JP')
}

function BusinessNumberMode() {
  const [value, setValue] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [savedItems, setSavedItems] = useState<string[]>([])

  // 表示用の値（フォーカス時はカンマなし、非フォーカス時はカンマあり）
  const displayValue = isFocused
    ? value
    : value ? formatNumber(parseNumber(value)) : ''

  const handleSave = () => {
    if (!value) return
    // 保存前に正規化
    const normalizedValue = normalizeToHalfWidth(value)
    // 無効な文字のみの場合は0として扱う
    const numericValue = normalizedValue ? parseNumber(normalizedValue) : 0
    setSavedItems([formatNumber(numericValue), ...savedItems])
    setValue('')
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // IMEの変換中はエンターキーで保存しない
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault()
      handleSave()
    }
  }

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    const normalizedValue = normalizeToHalfWidth(e.currentTarget.value)
    setValue(normalizedValue)
  }

  const handleFocus = () => {
    setIsFocused(true)
  }

  const handleBlur = () => {
    setIsFocused(false)
    // フォーカスを外した時に正規化
    setValue(normalizeToHalfWidth(value))
  }

  return (
    <div>
      <h2>ビジネス標準数字モード</h2>
      <p style={{ color: '#666', fontSize: '14px', marginBottom: '12px' }}>
        全角数字（０１２３）、全角小数点（．）、全角マイナス（－）も入力可能です
      </p>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type="text"
          value={displayValue}
          onChange={(e) => setValue(e.target.value.replace(/,/g, ''))}
          onKeyDown={handleKeyDown}
          onCompositionEnd={handleCompositionEnd}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="数字を入力... (例: 1234 or １２３４)"
          style={{
            padding: '8px',
            fontSize: '16px',
            width: '300px',
            textAlign: 'right',
          }}
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
                  backgroundColor: '#e8f4e8',
                  borderRadius: '4px',
                  textAlign: 'right',
                  fontFamily: 'monospace',
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

export default BusinessNumberMode
