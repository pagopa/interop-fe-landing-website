import { Typography } from '@mui/material'
import React from 'react'

type PageTitleProps = {
  children?: React.ReactNode
}

export const PageTitle: React.FC<PageTitleProps> = ({ children }) => {
  return (
    <Typography sx={{ textAlign: 'center', pt: 8, pb: 8, mt: 8 }} variant="h1">
      {children}
    </Typography>
  )
}
