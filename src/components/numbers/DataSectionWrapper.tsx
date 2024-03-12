import { Box, Container, Stack, Typography } from '@mui/material'
import { useEffect, useRef } from 'react'

type DataSectionWrapperProps = {
  title: string
  description: string
  background?: 'white' | 'grey'
  anchor: string
  children: React.ReactNode
}

export const DataSectionWrapper: React.FC<DataSectionWrapperProps> = ({
  title,
  description,
  background = 'white',
  anchor,
  children,
}) => {
  const containerRef = useRef(null)

  const optionsObs: IntersectionObserverInit = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  }
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        const hash = `#${entry?.target.id}`
        window.location.hash = hash
      }
    }, optionsObs)
    if (containerRef.current) observer.observe(containerRef.current)
    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [])

  return (
    <Box
      component="section"
      sx={{ backgroundColor: background === 'grey' ? 'background.default' : 'background.paper' }}
    >
      <Container sx={{ py: 6, maxWidth: 1340 }} maxWidth={false}>
        <Box>
          <Typography
            variant="h4"
            component="h2"
            ref={containerRef}
            id={anchor}
            sx={{ scrollMarginTop: '124px' }}
          >
            {title}
          </Typography>
          <Typography sx={{ mt: 1 }} variant="body1" color="text.primary">
            {description}
          </Typography>
        </Box>
        <Stack sx={{ mt: 3 }} spacing={3}>
          {children}
        </Stack>
      </Container>
    </Box>
  )
}
