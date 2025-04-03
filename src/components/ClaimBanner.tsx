import React, { useState } from 'react'
import { Paper, Typography, Button, Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

export const ClaimBanner = () => {
  const [isBannerVisible, setBannerVisible] = useState(true)

  const handleClose = () => {
    setBannerVisible(false)
  }

  if (!isBannerVisible) return null

  return (
    <Paper
      elevation={3}
      sx={{
        background: 'red',
        position: 'fixed',
        bottom: 16,
        left: 16,
        p: 4,
        zIndex: 10,
      }}
    >
      <Box display="flex" justifyContent="flex-end">
        <IconButton size="small" onClick={handleClose} sx={{ padding: 0 }}>
          <CloseIcon fontSize="small" />
        </IconButton>
      </Box>

      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        text here
      </Typography>

      <Box display="flex" justifyContent="flex-end">
        <Button color="primary" sx={{ textTransform: 'none' }}>
          Scopri di più
        </Button>
      </Box>
    </Paper>
  )
}
