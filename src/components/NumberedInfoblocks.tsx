import { Grid, Stack, Typography } from '@mui/material'
import { NumberedInfoblocksProps } from '../../api/model'

const NumberedInfoblocks = ({ title, blocks }: NumberedInfoblocksProps) => {
  return (
    <Stack spacing={8} alignItems="center" sx={{ py: 8 }} bgcolor="background.default">
      <Typography variant="h4">{title}</Typography>

      <Grid container>
        {blocks.map(({ title, subtitle }, i) => {
          const borderColor = i < blocks.length - 1 ? 'divider' : 'transparent'

          return (
            <Grid item xs={12} md={6} lg={12 / blocks.length} key={i}>
              <Stack
                key={i}
                sx={{
                  height: '100%',
                  px: { xs: 2, md: 8 },
                  my: 2,
                  borderStyle: 'solid',
                  borderTop: 0,
                  borderLeft: 0,
                  borderBottom: 0,
                  borderRightWidth: { xs: 0, lg: 1 },
                  borderRightColor: borderColor,
                }}
              >
                <Typography variant="h6" color="primary.main">{`0${i + 1}`}</Typography>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {title}
                </Typography>
                <Typography variant="body2">{subtitle}</Typography>
              </Stack>
            </Grid>
          )
        })}
      </Grid>
    </Stack>
  )
}

export default NumberedInfoblocks
