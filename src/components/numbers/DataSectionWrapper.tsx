import { Box, Container, Stack, Typography } from '@mui/material'

type DataSectionWrapperProps = {
  title: string
  description: string
  background?: 'white' | 'grey'
  children: React.ReactNode
}

export const DataSectionWrapper: React.FC<DataSectionWrapperProps> = ({
  title,
  description,
  background = 'white',
  children,
}) => {
  return (
    <Box
      component="section"
      sx={{ backgroundColor: background === 'grey' ? 'background.default' : 'background.paper' }}
    >
      <Container sx={{ py: 6 }}>
        <Box sx={{ maxWidth: 620 }}>
          <Typography variant="h4" component="h2">
            {title}
          </Typography>
          <Typography sx={{ mt: 1 }} variant="body2" color="text.secondary">
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
