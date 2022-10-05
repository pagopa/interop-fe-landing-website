import { Box, Stack, Typography } from '@mui/material'
import { MainFaqProps } from '../../api/model'

const MainFaq = ({ title, subtitle }: MainFaqProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ color: 'common.white', bgcolor: 'primary.dark', py: 8, px: 4 }}
    >
      <Stack spacing={2} sx={{ textAlign: 'center', maxWidth: 680 }}>
        <Typography variant="h4" component="p" color="inherit">
          {title}
        </Typography>
        <Typography variant="body1" component="p" color="inherit">
          {subtitle}
        </Typography>
      </Stack>
    </Stack>
  )
}

export default MainFaq
