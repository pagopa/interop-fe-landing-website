import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { HOME_ROUTE, MAIN_NAV_ROUTES } from '../../lib/routes'
import LocaleContext from '../utils/LocaleContext'

function compareRoute(matchRoute: Array<string>, testRoute: Array<string>): Boolean {
  const passLengthCheck =
    matchRoute.length === testRoute.length ||
    (testRoute.length > 0 && matchRoute.length === testRoute.length + 1) // Might be a parent route
  const hasSameFragments = testRoute.every((b, i) => {
    // IF there is a dynamic bit, pass the check automatically
    if (b.includes('[')) {
      return true
    }

    return Boolean(b === matchRoute[i])
  })

  return passLengthCheck && hasSameFragments
}

const NavigationBar = () => {
  const { locale } = useContext(LocaleContext)
  const { pathname } = useRouter()
  const [index, setIndex] = useState<number | boolean>(0)

  function a11yProps(index: number) {
    return {
      id: `page-${index}`,
      'aria-controls': `page-${index}`,
    }
  }

  useEffect(() => {
    const pathnameBits = pathname.split('/').filter((b) => b)

    const index = Object.values(MAIN_NAV_ROUTES).findIndex((link) => {
      const path = link[locale].href.split('/').filter((b) => b)
      return compareRoute(pathnameBits, path)
    })

    setIndex(index < 0 ? false : index)
  }, [pathname, locale])

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }}>
        <Stack direction="row" alignItems="center" mx={3} my={2}>
          <Typography
            variant="h5"
            mr={2}
            component="a"
            href={HOME_ROUTE[locale].href}
            sx={{ textDecoration: 'none' }}
          >
            {HOME_ROUTE[locale].label}
          </Typography>
          <Chip label="Beta" size="small" color="primary" />
        </Stack>
        <Tabs value={index} component="nav">
          {Object.values(MAIN_NAV_ROUTES).map((link, i) => {
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
