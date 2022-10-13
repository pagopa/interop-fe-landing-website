import { Box, Button, Stack, Typography } from '@mui/material'
import { DtdProps, PageBottomCtaProps } from '../../api/model'

const Dtd = ({ logo, description }: DtdProps) => {
  return (
    <Stack direction="column" alignItems="center" sx={{ py: 4, px: 4 }}>
      <Typography variant="body2" textAlign="center">
        {description}
      </Typography>
      <Box sx={{ mt: 2.5 }}>{logo}</Box>
    </Stack>
  )
}

export default Dtd
