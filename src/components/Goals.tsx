import { Box, Stack, Typography } from '@mui/material'
import { GoalsProps } from '../../api/model'

const Goals = ({ title, blocks }: GoalsProps) => {
  return (
    <Stack spacing={8} alignItems="center" sx={{ py: 8 }}>
      <Typography variant="h4">{title}</Typography>

      <Stack sx={{ maxWidth: 730, px: 2 }} spacing={4}>
        {blocks.map(({ title, subtitle, icon }, i) => {
          return (
            <Stack
              key={i}
              direction="row"
              alignItems="flex-start"
              spacing={2}
              sx={{
                pb: 2,
                borderBottom: 1,
                borderColor: i < blocks.length - 1 ? 'divider' : 'transparent',
              }}
            >
              <Box sx={{ width: 60 }}>{icon}</Box>
              <Stack>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {title}
                </Typography>
                <Typography variant="body1">{subtitle}</Typography>
              </Stack>
            </Stack>
          )
        })}
      </Stack>
    </Stack>
  )
}

export default Goals
