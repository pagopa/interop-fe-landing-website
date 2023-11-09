import { Box, Chip, Paper, Stack, Typography, useTheme } from '@mui/material'

type DataCardProps = {
  label: string
  value: React.ReactNode
  variation: {
    label: string
    percentage: number
    value: number | string
  }
}

export const DataCard: React.FC<DataCardProps> = ({ label, value, variation }) => {
  const mainDarkColor = useTheme().palette.primary.dark

  return (
    <Paper elevation={8} sx={{ p: 3, borderRadius: 2, borderLeft: `8px solid ${mainDarkColor}` }}>
      <Typography variant="body2" component="h3" sx={{ fontWeight: '600' }}>
        {label}
      </Typography>
      <Stack sx={{ mt: 2 }} direction={{ sm: 'row' }} spacing={3} alignItems="center">
        <Typography
          sx={{ fontSize: 50, fontWeight: 700, lineHeight: '30px' }}
          component="span"
          color="text"
        >
          {value}
        </Typography>
        <Box sx={{ mt: { xs: 3, sm: 0 } }}>
          <Chip
            sx={{ borderRadius: 1, bgcolor: '#E1F4E1' }}
            label={`+${variation.value} (+${variation.percentage}%)`}
            size="small"
          />
          <Typography component="p" variant="caption" sx={{ mt: 0.5 }}>
            {variation.label}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  )
}
