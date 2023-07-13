import { Box, Typography } from '@mui/material'

export const DetailsSection = ({
  title,
  children,
}: {
  title: React.ReactNode
  children?: React.ReactNode
}) => (
  <Box component="section" sx={{ borderRadius: 2, bgcolor: 'white', p: 3 }}>
    <Typography component="h2" variant="h6">
      {title}
    </Typography>
    <Box sx={{ mt: 1.5 }}>{children}</Box>
  </Box>
)
