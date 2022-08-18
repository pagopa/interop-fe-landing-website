import { Box, Chip, Stack, Tab, Tabs, Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { ROUTES } from '../../lib/routes'
import LocaleContext from '../utils/LocaleContext'

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
    const index = Object.values(ROUTES).findIndex((link) => link[locale].href === pathname)
    setIndex(index - 1)
  }, [pathname, locale])

  const { HOME, ...OTHER_ROUTES } = ROUTES

  return (
    <Box>
      <Stack direction={{ xs: 'column', sm: 'row' }}>
        <Stack direction="row" alignItems="center" mx={3} my={2}>
          <Typography
            variant="h5"
            mr={2}
            component="a"
            href={HOME[locale].href}
            sx={{ textDecoration: 'none' }}
          >
            {HOME[locale].label}
          </Typography>
          <Chip label="Beta" size="small" color="primary" />
        </Stack>
        <Tabs value={index} component="nav">
          {Object.values(OTHER_ROUTES).map((link, i) => {
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
