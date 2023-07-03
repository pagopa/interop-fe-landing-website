import { useTheme } from '@mui/material'
import React from 'react'

type TextHighlighterProps = {
  text: string
  indices?: ReadonlyArray<[number, number]>
}

export const TextHighlighter: React.FC<TextHighlighterProps> = ({ text, indices }) => {
  const theme = useTheme()
  const highlightStyle = {
    backgroundColor: theme.palette.warning.extraLight,
  }

  const parts = []
  let lastIndex = 0

  if (!indices) return text

  for (const [start, _end] of indices) {
    const end = _end + 1

    const before = text.slice(lastIndex, start)
    const match = text.slice(start, end)

    lastIndex = end

    parts.push(
      <React.Fragment key={start}>
        {before}
        <mark style={highlightStyle}>{match}</mark>
      </React.Fragment>
    )
  }

  parts.push(text.slice(lastIndex))

  return <>{parts}</>
}
