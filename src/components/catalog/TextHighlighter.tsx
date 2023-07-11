import { useTheme } from '@mui/material'
import React from 'react'

type TextHighlighterProps = {
  text: string
  indices?: ReadonlyArray<[number, number]>
}

function mergeIntervals(intervals: ReadonlyArray<[number, number]>) {
  if (!intervals.length) return intervals
  const result = [...intervals]
  result.sort((a, b) => (a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]))
  let prev = result[0]
  const res = [prev]
  for (const curr of result) {
    if (curr[0] <= prev[1]) {
      prev[1] = Math.max(prev[1], curr[1])
    } else {
      res.push(curr)
      prev = curr
    }
  }
  return res
}

export const TextHighlighter: React.FC<TextHighlighterProps> = ({ text, indices }) => {
  const theme = useTheme()
  const highlightStyle = {
    backgroundColor: theme.palette.warning.extraLight,
  }

  // sospensione multi versione - con

  const parts = []
  let lastIndex = 0

  if (!indices || indices.length === 0) return text

  const mergedIndices = mergeIntervals(indices)

  for (const [start, _end] of mergedIndices) {
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
