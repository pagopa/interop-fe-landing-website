import React from 'react'
import { Hero, Infoblock, Showcase } from '@pagopa/mui-italia'
import { getCommonData, getHomeData } from '@/static'
import Head from 'next/head'
import { useLocaleContext } from '@/contexts/locale.context'
import { PageBottomCta, MainFaq, Dtd, NewsBlock } from '@/components'
import { NextPage } from 'next'

// const Banner = () => {
//   const theme = useTheme()
//   const [open, setOpen] = useState(true)

//   const close = () => {
//     setOpen(false)
//   }

//   if (!open) return null

//   return (
//     <Stack
//       direction="column"
//       gap={1.5}
//       sx={{
//         backgroundColor: theme.palette.primary.dark,
//         px: 3,
//         py: 2,
//       }}
//     >
//       <Box sx={{ position: 'relative' }}>
//         <Typography
//           fontSize={18}
//           lineHeight={1.33}
//           fontWeight={600}
//           color="primary.contrastText"
//           sx={{ pr: 3 }}
//         >
//           Titolo
//         </Typography>
//         <IconButton onClick={close} sx={{ position: 'absolute', right: -8, top: -8 }}>
//           <CloseIcon
//             sx={{ color: 'white' }}
//             aria-label={getLocalizedValue({ it: 'Chiudi banner', en: 'Close banner' })}
//           />
//         </IconButton>
//       </Box>

//       <Typography fontSize={14} lineHeight={1.28} color="primary.contrastText" sx={{ pr: 1 }}>
//         Contenuto
//       </Typography>
//     </Stack>
//   )
// }

const HomePage: NextPage = () => {
  const { locale } = useLocaleContext()
  const data = getHomeData(locale)
  const commonData = getCommonData(locale)

  return (
    <>
      <Head>
        <title>{data.title}</title>
        <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
        <meta key="twitter:title" name="twitter:title" content={data.meta.title} />
        <meta
          key="twitter:description"
          name="twitter:description"
          content={data.meta.description}
        />
        <meta key="twitter:image" name="twitter:image" content={data.meta.imgTw} />
        <meta key="og:locale" property="og:locale" content="it_IT" />
        <meta key="og:type" property="og:type" content="website" />
        <meta key="og:title" property="og:title" content={data.meta.title} />
        <meta key="og:description" property="og:description" content={data.meta.description} />
        <meta key="og:url" property="og:url" content={data.meta.url} />
        <meta key="og:site_name" property="og:site_name" content={data.meta.sitename} />
        <meta key="og:image" property="og:image" content={data.meta.imgFb} />
        {/* <HeadMeta {...data.meta} /> */}
      </Head>
      {/* <Banner /> */}
      <Hero {...data.hero} />
      <NewsBlock news={data.newsblock} />
      <Infoblock {...data.infoblocks[0]} />
      <Infoblock {...data.infoblocks[1]} />
      <Infoblock {...data.infoblocks[2]} />
      <MainFaq {...data.mainFaq} />
      <Showcase {...data.showcase} />
      <PageBottomCta {...commonData.pageBottomCta} />
      <Dtd {...commonData.dtd} />
    </>
  )
}

export default HomePage
