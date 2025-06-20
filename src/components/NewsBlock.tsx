import { Box, Grid, Link, Stack, Typography } from '@mui/material'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt'

export interface SingleNewsBlockProps {
  title: string
  date: {
    date: string
    // date: Date
    locale?: string
    options?: Intl.DateTimeFormatOptions
  }
  href: {
    label: string
    title?: string
    link: string
  }
}

export const NewsBlock = ({ news }: { news: Array<SingleNewsBlockProps> }) => {
  return (
    <Box bgcolor="background.default" py={8} px={{ xs: 2, md: 14 }}>
      <Typography variant="h4" component="h3" textAlign="center" pb={4}>
        Aggiornamenti
      </Typography>
      <Grid item md={9}>
        <Grid container spacing={3}>
          {news.map((n, i) => (
            <SingleNewsBlock key={i} {...n} />
          ))}
        </Grid>
      </Grid>
    </Box>
  )
}

const SingleNewsBlock = ({ title, date, href }: SingleNewsBlockProps) => {
  return (
    <Grid item md={4} my={2}>
      <Typography color="text.secondary" fontSize={16} fontWeight={400} mb={2}>
        {date.date}
      </Typography>
      <Typography variant="h6">{title}</Typography>
      <Stack mt={2} direction="row" alignItems="center" color="primary.main">
        <Link
          color="primary.main"
          underline="none"
          textTransform="capitalize"
          href={`news/${href.link}`}
          title={href.title}
          fontSize={14}
          fontWeight={400}
        >
          {href.label}
        </Link>
        <ArrowRightAltIcon sx={{ color: 'inherit', fontSize: 18 }} />
      </Stack>
    </Grid>
  )
}
