import {
  Box,
  IconButton,
  List,
  ListItemButton,
  Stack,
  SwipeableDrawer,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from '@mui/material'
import React from 'react'
import { useRouter } from 'next/router'
import MenuIcon from '@mui/icons-material/Menu'
import { HOME_ROUTE, MAIN_NAV_ROUTES } from '@/config/routes'
import { useLocaleContext } from '../contexts/LocaleContext'

function compareRoute(matchRoute: Array<string>, testRoute: Array<string>): boolean {
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

export const NavigationBar = () => {
  const { locale } = useLocaleContext()
  const { pathname } = useRouter()

  function a11yProps(index: number) {
    return {
      id: `page-${index}`,
      'aria-controls': `page-${index}`,
    }
  }

  const index = React.useMemo(() => {
    const pathnameBits = pathname.split('/').filter((b) => b)

    const index = Object.values(MAIN_NAV_ROUTES).findIndex((link) => {
      const path = link[locale].href.split('/').filter((b) => b)
      return compareRoute(pathnameBits, path)
    })

    return index < 0 ? false : index
  }, [pathname, locale])

  return (
    <Box>
      <Stack
        direction="row"
        justifyContent={{ xs: 'space-between', md: 'start' }}
        alignItems="center"
      >
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
          {/* <Chip label="Beta" size="small" color="primary" /> */}
        </Stack>
        <Box display={{ xs: 'none', md: 'block' }}>
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
        </Box>
        <Box display={{ xs: 'block', md: 'none' }} sx={{ mr: 2 }}>
          <MobileSideNav />
        </Box>
      </Stack>
    </Box>
  )
}

export function MobileSideNav() {
  const [isOpen, setIsOpen] = React.useState(false)
  const { locale } = useLocaleContext()
  const { pathname } = useRouter()
  const theme = useTheme()
  const mdBreakpoint = theme.breakpoints.values.md

  function a11yProps(index: number) {
    return {
      id: `page-${index}`,
      'aria-controls': `page-${index}`,
    }
  }

  const toggleSideNav = (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' ||
        (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return
    }

    setIsOpen((prev) => !prev)
  }

  React.useEffect(() => {
    function handleResize() {
      if (window.innerWidth >= mdBreakpoint) {
        setIsOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [mdBreakpoint])

  const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent)

  return (
    <div>
      <IconButton onClick={toggleSideNav}>
        <MenuIcon aria-label="TEST" />
      </IconButton>
      <SwipeableDrawer
        sx={{ pt: 4 }}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        anchor="left"
        open={isOpen}
        onClose={toggleSideNav}
        onOpen={toggleSideNav}
      >
        <List component="nav">
          {Object.values(MAIN_NAV_ROUTES).map((link, i) => {
            const { href, target, label, key } = link[locale]
            const isActualPage = pathname === href

            const props = isActualPage
              ? {
                  component: 'span',
                  sx: {
                    pointerEvents: 'none',
                    borderRight: 3,
                    borderColor: '#0073E6',
                  },
                }
              : { component: 'a', href, target }

            return (
              <ListItemButton key={key} {...props} {...a11yProps(i)}>
                <Typography
                  sx={{ mr: 6 }}
                  fontWeight={isActualPage ? 600 : 500}
                  color={isActualPage ? 'primary' : 'text.secondary'}
                >
                  {label}
                </Typography>
              </ListItemButton>
            )
          })}
        </List>
      </SwipeableDrawer>
    </div>
  )
}
