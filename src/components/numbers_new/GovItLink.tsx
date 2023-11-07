import { Link, Typography } from '@mui/material'

const GovItLink = ({ href = 'https://dati.gov.it' }) => {
  return (
    <Typography variant="body2">
      Fonte:{' '}
      <Link href={href} target="_blank">
        dati.gov.it
      </Link>
    </Typography>
  )
}

export default GovItLink
