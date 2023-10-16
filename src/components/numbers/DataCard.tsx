import { Box, Chip, Paper, Stack, Typography, useTheme } from '@mui/material'

type DataCardProps = {
  label: string
  value: React.ReactNode
  variation: {
    label: string
    value: string
  }
}

export const DataCard: React.FC<DataCardProps> = ({ label, value, variation }) => {
  const chipColor = useTheme().palette.primaryAction.selected

  return (
    <Paper elevation={8} sx={{ p: 3, borderRadius: 2 }}>
      <Typography variant="h6" component="h3">
        {label}
      </Typography>
      <Stack sx={{ mt: 2 }} direction={{ sm: 'row' }} justifyContent="space-between">
        <Typography
          sx={{ fontSize: 50, fontWeight: 700, lineHeight: '30px' }}
          component="span"
          color="primary"
        >
          {value}
        </Typography>
        <Box sx={{ mt: { xs: 3, sm: 0 } }}>
          <Chip sx={{ borderRadius: 1, bgcolor: chipColor }} label={variation.value} size="small" />
          <Typography component="p" variant="caption">
            {variation.label}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  )
}
