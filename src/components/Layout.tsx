import React, { ReactNode } from 'react'
import { Alert, Box, Stack, Typography } from '@mui/material'
import { ButtonNaked, Footer } from '@pagopa/mui-italia'
import { useRouter } from 'next/router'
import {
  companyLegalInfo,
  Locale,
  LANGUAGES,
  pagoPALink,
  postLoginLinks,
  preLoginLinks,
} from '@/configs/constants.config'
import { NavigationBar } from './NavigationBar'
import { useLocaleContext } from '@/contexts'
// import { getNewsData } from '@/static'
import { CustomLandingHeaderAccount } from './CustomLandingHeaderAccount'
import { COMPARE_ROUTES } from '@/configs/routes.config'
import { ExternalLink } from './ExternalLink'

interface Props {
  children?: ReactNode
}

// function findNewsInOtherLang(currentLocale: Locale, targetLocale: Locale, postSlug: string) {
//   const { news } = getNewsData(currentLocale)
//   const currentNews = news.find(({ slug }) => slug === postSlug)

//   if (!currentNews) {
//     return
//   }

//   const { news: newsOtherLang } = getNewsData(targetLocale)
//   const currentNewsInOtherLang = newsOtherLang.find(({ id }) => id === currentNews.id)
//   return currentNewsInOtherLang
// }

const Layout = ({ children }: Props) => {
  const { locale } = useLocaleContext()
  const router = useRouter()

  const onLanguageChanged = (newLang: Locale) => {
    // Handle dynamic route
    if (router.pathname.includes('[')) {
      // Handle news (this needs refactor)
      // if (router.pathname.includes('news')) {
      //   const newsInOtherLang = findNewsInOtherLang(
      //     locale,
      //     newLang,
      //     (router.query as { slug: string }).slug
      //   )
      // }
    } else {
      // Handle static route
      const currentRoute = Object.values(COMPARE_ROUTES).find((route) =>
        Boolean(route[locale].href === router.pathname)
      )

      if (currentRoute) {
        router.push(currentRoute[newLang].href)
      }
    }
  }

  // useEffect(() => {
  //   const pathBits = router.pathname.split('/').filter((b) => b)
  //   const isEng = pathBits[0] === 'en'
  //   setLocale(isEng ? 'en' : 'it')
  // }, [router.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ height: '100vh' }}>
      <Stack
        direction="column"
        sx={{ minHeight: '100vh' }} // 100vh per sticky footer
      >
        <CustomLandingHeaderAccount
          rootLink={pagoPALink}
          rootLinkAddition={
            <>
              {' '}
              <Typography
                component="span"
                variant="caption"
                lineHeight={1.25}
                sx={{ verticalAlign: 'middle' }}
              >
                per
              </Typography>{' '}
              <ButtonNaked
                component="a"
                size="small"
                aria-label="Vai al sito: Dipartimento per la trasformazione digitale"
                href="http://innovazione.gov.it/dipartimento"
                target="_blank"
                rel="noreferrer"
                title="Vai al sito: Dipartimento per la trasformazione digitale"
                sx={{ fontWeight: 'bold' }}
              >
                Dipartimento per la trasformazione digitale
              </ButtonNaked>
            </>
          }
        />
        <NavigationBar />
        <Stack alignItems="center">
          <Alert severity="error" sx={{ my: 1, mx: 3, maxWidth: 760 }}>
            PDND Interoperabilità sarà soggetta a{' '}
            <Typography fontSize="inherit" fontWeight={700} component="span">
              manutenzione programmata tra il 5 e il 6 ottobre 2024
            </Typography>
            . L’intervento interessa anche il servizio di erogazione dei voucher. Tutti gli
            aggiornamenti a{' '}
            <ExternalLink
              href="https://github.com/pagopa/pdnd-interop-frontend/issues/930"
              label="questo link"
            />
            .
          </Alert>
        </Stack>
        <Box sx={{ flexGrow: 1 }} component="main">
          {children}
        </Box>

        <Footer
          loggedUser={false}
          companyLink={{ ...pagoPALink, onClick: () => window.open(pagoPALink.href, '_blank') }}
          legalInfo={companyLegalInfo}
          postLoginLinks={postLoginLinks}
          preLoginLinks={preLoginLinks}
          currentLangCode={locale}
          //@ts-ignore
          onLanguageChanged={onLanguageChanged}
          //@ts-ignore
          languages={LANGUAGES}
        />
      </Stack>
    </Box>
  )
}

export default Layout
