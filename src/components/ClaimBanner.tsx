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

  let isMobile = window.matchMedia('(max-width: 768px)').matches

  return (
    <>
      {isBannerVisible && (
        <Paper
          elevation={8}
          sx={{
            background: 'white',
            position: 'fixed',
            bottom: 16,
            left: 16,
            p: 4,
            zIndex: 10,
            maxWidth: isMobile ? '100%' : 424,
            right: 16,
            paddingTop: isMobile ? 1 : 4,
            paddingBottom: isMobile ? 1 : 4,
          }}
        >
          <Box display="flex" justifyContent={title ? 'space-between' : 'flex-end'}>
            {title && (
              <Typography variant="body1" color="text.primary" sx={{ fontWeight: 600 }}>
                {title}
              </Typography>
            )}
            <IconButton size="small" onClick={handleClose} sx={{ padding: 0 }}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Box>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 2, mt: isMobile ? 1 : 2, fontWeight: 400 }}
          >
            {content}
          </Typography>

          <Box display="flex" justifyContent="flex-start">
            {buttonText && buttonLink && (
              <Button
                variant="outlined"
                color="primary"
                sx={{ textTransform: 'none', mt: 1 }}
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
