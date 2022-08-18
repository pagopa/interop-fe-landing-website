import { Grid, Paper, Typography } from '@mui/material'
import { LawSnippet, LawSnippetsProps } from '../../api/model'

const LawSnippets = ({ title, subtitle, snippets }: LawSnippetsProps) => {
  const _snippets = [...snippets]
  const firstColumn = [_snippets.shift(), _snippets.shift()] as Array<LawSnippet>
  const secondColumn = [..._snippets] as Array<LawSnippet>

  const Item = ({ title, content }: LawSnippet) => {
    return (
      <Paper elevation={1} sx={{ p: 2, ml: { xs: 2, md: 0 }, mr: 2, mb: 2 }}>
        {title && (
          <Typography variant="h6" color="primary" sx={{ mb: 2 }}>
            {title}
          </Typography>
        )}
        <Typography variant="body1">{content}</Typography>
      </Paper>
    )
  }

  return (
    <Grid sx={{ py: 8 }} container justifyContent="center" bgcolor="background.default">
      <Grid item sx={{ maxWidth: 1280 }}>
        <Grid container spacing={8}>
          <Grid
            item
            xs={12}
            lg={4}
            sx={{ textAlign: { xs: 'center', lg: 'left' } }}
            color="primary.main"
          >
            <Typography variant="h4" color="inherit">
              {title}
            </Typography>
            {subtitle && (
              <Typography variant="body1" color="inherit" sx={{ mt: 1 }}>
                {subtitle}
              </Typography>
            )}
          </Grid>
          <Grid item xs={12} lg={8}>
            <Grid container sx={{ maxWidth: 600, margin: '0 auto' }}>
              <Grid item xs={12} md={6}>
                {firstColumn.map((s, i) => (
                  <Item {...s} key={i} />
                ))}
              </Grid>
              <Grid item xs={12} md={6} sx={{ mt: { md: 4 } }}>
                {secondColumn.map((s, i) => (
                  <Item {...s} key={i} />
                ))}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default LawSnippets
