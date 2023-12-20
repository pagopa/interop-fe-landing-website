import { Link, SxProps } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'

type ExternalLinkType = {
  href: string
  label: string
  sx?: SxProps
}

export const ExternalLink: React.FC<ExternalLinkType> = ({ href, label, sx }) => {
  return (
    <Link
      underline="hover"
      href={href}
      target="_blank"
      sx={{ display: 'inline-flex', alignItems: 'center', ...sx }}
      title={label}
    >
      {label}
      <LaunchIcon fontSize="small" sx={{ pl: 0.5 }} />
    </Link>
  )
}
