import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import LocaleContext from '../i18n/LocaleContext'
import { Locale } from '../../lib/constants'

type Link = {
  href: string
  target: '_self' | '_blank'
  key: string
  label: string
}

const homelink: Record<Locale, Link> = {
  it: {
    href: '/it',
    target: '_self',
    key: 'Interoperabilità',
    label: 'Interoperabilità',
  },
  en: {
    href: '/en',
    target: '_self',
    key: 'Interoperability',
    label: 'Interoperability',
  },
}

const links: Array<Record<Locale, Link>> = [
  {
    it: {
      href: '/it/progetto',
      target: '_self',
      key: 'Progetto',
      label: 'Progetto',
    },
    en: {
      href: '/en/progetto',
      target: '_self',
      key: 'Project',
      label: 'Project',
    },
  },
  {
    it: {
      href: 'https://docs.pagopa.it/interoperabilita-1',
      target: '_blank',
      key: 'Documentazione',
      label: 'Documentazione',
    },
    en: {
      href: 'https://docs.pagopa.it/interoperabilita-1',
      target: '_blank',
      key: 'Documentation',
      label: 'Documentation',
    },
  },
  {
    it: {
      href: '/it/news',
      target: '_self',
      key: 'News',
      label: 'News',
    },
    en: {
      href: '/en/news',
      target: '_self',
      key: 'News',
      label: 'News',
    },
  },
]

const NavigationBar = () => {
  const { locale } = useContext(LocaleContext)
  const { pathname } = useRouter()
  const [index, setIndex] = useState(0)

  function a11yProps(index: number) {
    return {
      id: `page-${index}`,
      'aria-controls': `page-${index}`,
    }
  }

  useEffect(() => {
    if (!locale) {
      return
    }

    const index = [homelink, ...links].findIndex((link) => link[locale].href === pathname)
    setIndex(index - 1)
  }, [pathname, locale])

  if (!locale) {
    return null
  }

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }}>
        <Stack direction="row" alignItems="center" mx={3} my={2}>
          <Typography
            variant="h5"
            mr={2}
            component="a"
            href={homelink[locale].href}
            sx={{ textDecoration: 'none' }}
          >
            {homelink[locale].label}
          </Typography>
          <Chip label="Beta" size="small" color="primary" />
        </Stack>
        <Tabs value={index} component="nav">
          {links.map((link, i) => {
            const { href, target, label, key } = link[locale]
            const props =
              pathname === href
                ? { component: 'span', sx: { pointerEvents: 'none' } }
                : { component: 'a', href, target }

            return (
              <Tab
                sx={{ paddingTop: 4, paddingBottom: 3 }}
                key={key}
                label={label}
                {...props}
                {...a11yProps(i)}
              />
            )
          })}
        </Tabs>
      </Stack>
    </Box>
  )
}

export default NavigationBar
