import type { NextPage } from 'next'
import { useContext } from 'react'
import LocaleContext from '../../src/utils/LocaleContext'
import { getNewsData } from '../../api'
import { Typography } from '@mui/material'

const NewsPage: NextPage = () => {
  const { locale } = useContext(LocaleContext)
  const data = getNewsData(locale)

  return (
    <>
      <Typography>{data.titles.h1}</Typography>
    </>
  )
}

export default NewsPage
