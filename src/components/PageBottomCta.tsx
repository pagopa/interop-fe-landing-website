import { Button, Stack, Typography } from '@mui/material'
import { PageBottomCtaProps } from '../../api/model'

const PageBottomCta = ({ icon, title, subtitle, ctaLink }: PageBottomCtaProps) => {
  return (
    <Stack
      direction="row"
      justifyContent="center"
      sx={{ color: 'common.white', bgcolor: 'primary.dark', py: 8, px: 4 }}
    >
      <Stack spacing={2} alignItems="center" sx={{ textAlign: 'center', maxWidth: 420 }}>
        {icon}
        <Typography variant="h6" component="p" color="inherit">
          {title}
        </Typography>
        <Typography variant="body1" component="p" color="inherit">
          {subtitle}
        </Typography>
        <Button
          color="negative"
          variant="outlined"
          component="a"
          href={ctaLink.href}
          title={ctaLink.ariaLabel}
          target="_blank"
        >
          {ctaLink.label}
        </Button>
      </Stack>
    </Stack>
  )
}

export default PageBottomCta
