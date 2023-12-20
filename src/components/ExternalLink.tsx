import { Link } from '@mui/material'
import LaunchIcon from '@mui/icons-material/Launch'

type ExternalLinkType = {
  href: string
  label: string
}

export const ExternalLink: React.FC<ExternalLinkType> = ({ href, label }) => {
  return (
    <Link
      underline="hover"
      href={href}
      target="_blank"
      sx={{ display: 'inline-flex', alignItems: 'center' }}
    >
      {label}
      <LaunchIcon fontSize="small" sx={{ pl: 0.5 }} />
    </Link>
  )
}
