import React, { useEffect, useState } from 'react'
import { Paper, Typography, Button, Box, IconButton, useMediaQuery, useTheme } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

type AppBannerProps = {
  title: string
  content: string
  button: {
    label: string
    link: string
  }
}

export const AppBanner: React.FC<AppBannerProps> = ({ title, content, button }) => {
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

  const isMobile = useMediaQuery(useTheme().breakpoints.down('sm'))

  if (isUpdatingState) {
    return null
  }

  return (
    <>
      {isBannerVisible && (
        <Paper
          elevation={8}
          sx={{
            background: 'white',
            position: 'fixed',
            bottom: isMobile ? 0 : 16,
            left: 16,
            p: 4,
            zIndex: 10,
            maxWidth: isMobile ? '100%' : 424,
            right: 16,
            paddingTop: isMobile ? 2 : 4,
            paddingBottom: isMobile ? 2 : 4,
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
            {button && (
              <Button
                variant="outlined"
                color="primary"
                sx={{ textTransform: 'none', mt: 1 }}
                target="_blank"
                href={button.link}
              >
                {button.label}
              </Button>
            )}
          </Box>
        </Paper>
      )}
    </>
  )
}
