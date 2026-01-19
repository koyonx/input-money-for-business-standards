# input-money-for-business-standards

日本のビジネス向け数字入力に対応したReactアプリケーションです。

## 使用方法

### インストール

```bash
npm install
```

### 開発サーバー起動

```bash
npm run dev
```

### ビルド

```bash
npm run build
```

## 機能

このアプリケーションには2つの入力モードがあります。

### 1. 単純入力モード

テキストをそのまま入力・保存するシンプルなモードです。

### 2. ビジネス標準数字モード

日本のビジネス環境で使用される数字入力に対応したモードです。

#### 対応している入力形式

| 入力 | 変換後 |
|------|--------|
| 全角数字（０１２３４５６７８９） | 半角数字（0123456789） |
| 全角小数点（．） | 半角小数点（.） |
| 全角マイナス（－、ー、−など） | 半角マイナス（-） |

#### 機能詳細

- **IME対応**: 日本語入力（IME）での変換確定時に自動で半角に正規化
- **カンマ表示**: フォーカスを外すとカンマ区切りで表示（例: `1234567` → `1,234,567`）
- **編集時**: フォーカスするとカンマなしで編集可能
- **無効文字の除去**: 数字・小数点・マイナス以外の文字は自動で除去
- **ゼロ変換**: 無効な文字のみの入力は `0` として保存

## ビジネス標準数字入力の実装方法

### 正規化関数

全角文字を半角に変換し、無効な文字を除去する関数です。

```typescript
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
```

### IME変換確定時の処理

`onCompositionEnd`イベントで変換確定時に正規化を実行します。

```typescript
const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
  const normalizedValue = normalizeToHalfWidth(e.currentTarget.value)
  setValue(normalizedValue)
}
```

### IME変換中のEnterキー処理

変換確定のためのEnterと保存のためのEnterを区別します。

```typescript
const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
  // IMEの変換中はエンターキーで保存しない
  if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
    e.preventDefault()
    handleSave()
  }
}
```

### フォーカス時のカンマ表示切替

```typescript
const [isFocused, setIsFocused] = useState(false)

// 表示用の値（フォーカス時はカンマなし、非フォーカス時はカンマあり）
const displayValue = isFocused
  ? value
  : value ? formatNumber(parseNumber(value)) : ''

const handleFocus = () => setIsFocused(true)
const handleBlur = () => {
  setIsFocused(false)
  setValue(normalizeToHalfWidth(value))
}
```

### 数値フォーマット関数

```typescript
const formatNumber = (num: number): string => {
  if (isNaN(num)) return ''
  return num.toLocaleString('ja-JP')
}
```

## 参考

- [Handling Japanese Numeric UX in React with React Hook Form & Zod](https://global.moneyforward-dev.jp/2025/07/31/handling-japanese-numeric-ux-in-react-with-react-hook-form-zod/)
