import React, { ReactNode, useContext, useEffect } from 'react'
import { Box, Stack } from '@mui/material'
import { HeaderAccount, Footer } from '@pagopa/mui-italia'
import { useRouter } from 'next/router'
import {
  companyLegalInfo,
  Locale,
  LANGUAGES,
  pagoPALink,
  postLoginLinks,
  preLoginLinks,
} from '../../lib/constants'
import NavigationBar from './NavigationBar'
import { ROUTES } from '../../lib/routes'
import LocaleContext from '../utils/LocaleContext'

interface Props {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  const { locale, setLocale } = useContext(LocaleContext)
  const router = useRouter()

  const handleAssistanceClick = () => {
    console.log('go to assistance')
  }

  const onLanguageChanged = (newLang: Locale) => {
    console.log({ newLang, ROUTES, p: router.pathname })

    const currentRoute = Object.values(ROUTES).find((route) =>
      Boolean(route[locale].href === router.pathname)
    )

    if (currentRoute) {
      // Push it
      router.push(currentRoute[newLang].href)
    }
  }

  useEffect(() => {
    console.log('q', router)
  }, [router])

  useEffect(() => {
    const pathBits = router.pathname.split('/').filter((b) => b)
    const isEng = pathBits[0] === 'en'
    setLocale(isEng ? 'en' : 'it')
  }, [router.pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box sx={{ height: '100vh' }}>
      <Stack
        direction="column"
        sx={{ minHeight: '100vh' }} // 100vh per sticky footer
      >
        <HeaderAccount
          enableLogin={false}
          rootLink={pagoPALink}
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
          onLanguageChanged={onLanguageChanged}
          languages={LANGUAGES}
        />
      </Stack>
    </Box>
  )
}

export default Layout
