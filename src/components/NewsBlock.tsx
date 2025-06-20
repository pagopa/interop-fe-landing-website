import { getLocalizedValue } from '@/utils/common.utils'
import { Link, Stack, Typography } from '@mui/material'

export interface SingleNewsBlockProps {
  title: string
  content: JSX.Element
  link: string
}

export const NewsBlock = ({ news }: { news: Array<SingleNewsBlockProps> }) => {
  return news.map((n: SingleNewsBlockProps, i: number) => <SingleNewsBlock key={i} {...n} />)
}

const SingleNewsBlock = ({ title, content, link }: SingleNewsBlockProps) => {
  return (
    <Stack direction="column" alignItems="center" sx={{ py: 4, px: 4 }}>
      <Typography variant="body2" textAlign="center">
        {title} - {link}
      </Typography>
      {content}
      <Link href={`/news/${link}`} underline="always" variant="body2">
        {getLocalizedValue({
          it: 'Leggi di più',
          en: 'Read more',
        })}
      </Link>
    </Stack>
  )
}
