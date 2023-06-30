import { Stack, Typography } from '@mui/material'

export interface MainFaqProps {
  title: string | JSX.Element
  subtitle: string | JSX.Element
}

export const MainFaq = ({ title, subtitle }: MainFaqProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ color: 'common.white', bgcolor: 'primary.dark', py: 8, px: 4 }}
    >
      <Stack spacing={2} sx={{ textAlign: 'center', maxWidth: 610 }}>
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
