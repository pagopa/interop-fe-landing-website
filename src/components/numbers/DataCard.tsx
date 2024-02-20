// import { MACROCATEGORIES_COLORS_MAP, colorMapChip } from '@/configs/constants.config'
import { MACROCATEGORIES_COLORS_MAP } from '@/configs/constants.config'
import { Box, Chip, Paper, Stack, Typography, useTheme } from '@mui/material'

type DataCardProps = {
  label: string
  value: string
  variation: {
    label: string
    percentage: number | string
    value?: number | string
  }
  color: string
}

export const DataCard: React.FC<DataCardProps> = ({ label, value, variation, color }) => {
  const colorMapChip = new Map<string, string>([
    ['Neutral', useTheme().palette.grey[100]],
    ['Positive', useTheme().palette.success.extraLight!],
    ['Negative', useTheme().palette.error.extraLight!],
  ])

  const variationValueParse = parseFloat(variation.value as string)
  const percentage = Number(variation.percentage)

  const chipColor =
    variation.percentage === 0 ? 'Neutral' : percentage > 0 ? 'Positive' : 'Negative'

  const absoluteVariationValue = variationValueParse >= 0 ? '+' : '-'

  const percentageVariationValue = ((percentage: number) => {
    if (percentage === 0) return ''
    return percentage >= 0 ? '+' : '-'
  })(percentage)

  let labelValue = ''
  if (variation.value) {
    labelValue = `${absoluteVariationValue}${
      variation.value
    } (${percentageVariationValue}${Math.abs(percentage)}%)`
  } else {
    labelValue = `(${Math.abs(percentage)}%)`
  }

  return (
    <Paper
      elevation={8}
      sx={{
        p: 3,
        borderRadius: 2,
        borderLeft: `8px solid ${MACROCATEGORIES_COLORS_MAP.get(color)}`,
      }}
    >
      <Typography variant="body2" component="h3" sx={{ fontWeight: '600', mb: 3 }}>
        {label}
      </Typography>
      <Stack sx={{ mt: 2 }} direction="column" alignItems="start" spacing={3}>
        <Typography
          sx={{ fontSize: 40, fontWeight: 700, lineHeight: '16px' }}
          component="span"
          color="text"
        >
          {value}
        </Typography>
        <Box sx={{ mt: { xs: 3, sm: 0 } }} display="flex" flexDirection="row">
          <Chip
            sx={{
              mr: 2,
              borderRadius: 1,
              bgcolor: colorMapChip.get(variation.value ? chipColor : 'Neutral'),
            }}
            label={labelValue}
            size="small"
          />{' '}
          <Typography component="p" variant="caption" sx={{ mt: 0.5 }}>
            {variation.label}
          </Typography>
        </Box>
      </Stack>
    </Paper>
  )
}
