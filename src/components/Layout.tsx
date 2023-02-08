import React, { ReactNode, useContext, useEffect } from 'react'
import { Box, Stack, Typography } from '@mui/material'
import { ButtonNaked, Footer } from '@pagopa/mui-italia'
import { useRouter } from 'next/router'
import {
  companyLegalInfo,
  Locale,
  LANGUAGES,
  pagoPALink,
  postLoginLinks,
  preLoginLinks,
  documentationLink,
} from '../../lib/constants'
import NavigationBar from './NavigationBar'
import { COMPARE_ROUTES } from '../../lib/routes'
import LocaleContext from '../utils/LocaleContext'
import { getNewsData } from '../../api'
import { NewsPostProps } from '../../api/model'
import { HeaderAccount } from './HeaderAccount'

interface Props {
  children?: ReactNode
}

function findNewsInOtherLang(
  currentLocale: Locale,
  targetLocale: Locale,
  postSlug: string
): NewsPostProps | undefined {
  const { news } = getNewsData(currentLocale)
  const currentNews = news.find(({ slug }) => slug === postSlug)

  if (!currentNews) {
    return
  }

  const { news: newsOtherLang } = getNewsData(targetLocale)
  const currentNewsInOtherLang = newsOtherLang.find(({ id }) => id === currentNews.id)
  return currentNewsInOtherLang
}

const Layout = ({ children }: Props) => {
  const { locale, setLocale } = useContext(LocaleContext)
  const router = useRouter()

  const handleAssistanceClick = () => {
    window.open(documentationLink, '_blank')
  }

  const onLanguageChanged = (newLang: Locale) => {
    // Handle dynamic route
    if (router.pathname.includes('[')) {
      // Handle news (this needs refactor)
      if (router.pathname.includes('news')) {
        const newsInOtherLang = findNewsInOtherLang(
          locale,
          newLang,
          (router.query as { slug: string }).slug
        )
      }
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
        <HeaderAccount
          enableAssistanceButton={false}
          enableLogin={false}
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
                aria-label="Vai al sito: Dipartimento per la Trasformazione Digitale"
                href="http://innovazione.gov.it/dipartimento"
                target="_blank"
                rel="noreferrer"
                title="Vai al sito: Dipartimento per la Trasformazione Digitale"
                sx={{ fontWeight: 'bold' }}
              >
                Dipartimento per la Trasformazione Digitale
              </ButtonNaked>
            </>
          }
          onAssistanceClick={handleAssistanceClick}
        />
        <NavigationBar />
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
