import React from 'react'
import { Button, Stack, Typography, useTheme } from '@mui/material'
import LockIcon from '@mui/icons-material/Lock'

type HeaderSectionCardType = {
  message: string
  cta: {
    href: string
    label: string
  }
}

export const HeaderSectionCard: React.FC<HeaderSectionCardType> = ({ message, cta }) => {
  const theme = useTheme()

  return (
    <Stack
      color="text.secondary"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{
        flexShrink: 0,
        width: { xs: 'none', md: 281 },
        p: 3,
        borderRadius: 2,
        backgroundColor: theme.palette.primaryAction.selected,
        border: 1,
        borderColor: theme.palette.primaryAction.hover,
      }}
    >
      <Stack direction="column" alignItems="start" spacing={1}>
        <Typography color="text.secondary" variant="caption">
          {message}
        </Typography>
        <Button target="_blank" href={cta.href} title={cta.label} variant="naked" size="small">
          {cta.label}
        </Button>
      </Stack>
      <LockIcon color="inherit" fontSize="large" />
    </Stack>
  )
}
