import React, { useEffect, useState } from 'react'
import { Paper, Typography, Button, Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type ClaimBannerProps = {
  title?: string
  content: string
  buttonText?: string
  buttonLink?: string
}

export const ClaimBanner: React.FC<ClaimBannerProps> = ({
  title,
  content,
  buttonText,
  buttonLink,
}) => {
  const [isBannerVisible, setIsBannerVisible] = useState(true)
  const [isUpdatingState, setIsUpdatingState] = useState(true)

  useEffect(() => {
    const closedCard = sessionStorage.getItem('bannerClosed')
    if (closedCard === 'true') {
      setIsBannerVisible(false)
    }
    setIsUpdatingState(false)
  }, [])

  const handleClose = () => {
    sessionStorage.setItem('bannerClosed', 'true')
    setIsBannerVisible(false)
  }

  if (isUpdatingState) {
    return null
  }

  return (
    <>
      {isBannerVisible && (
        <Paper
          elevation={16}
          sx={{
            background: 'white',
            position: 'fixed',
            bottom: 16,
            left: 16,
            p: 4,
            zIndex: 10,
            width: 375,
          }}
        >
          <Box display="flex" justifyContent={title ? 'space-between' : 'flex-end'}>
            {title && (
              <Typography variant="body1" color="text" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
            )}
            <IconButton size="small" onClick={handleClose} sx={{ padding: 0 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography variant="body2" color="text.secondary" sx={{ mb: 2, mt: 2, fontWeight: 400 }}>
            {content}
          </Typography>

          <Box display="flex" justifyContent="flex-end">
            {buttonText && buttonLink && (
              <Button
                color="primary"
                sx={{ textTransform: 'none' }}
                target="_blank"
                href={buttonLink}
              >
                {buttonText}
              </Button>
            )}
          </Box>
        </Paper>
      )}
    </>
  )
}
