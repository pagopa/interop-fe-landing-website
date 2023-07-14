import { deepmerge } from '@mui/utils'
import { createTheme } from '@mui/material'
import { theme as muiItaliaTheme } from '@pagopa/mui-italia'

import { Titillium_Web } from 'next/font/google'

const titilliumWeb = Titillium_Web({ subsets: ['latin'], weight: ['300', '400', '600', '700'] })
const fontFamily = titilliumWeb.style.fontFamily

/**
 * It is based on the `@pagopa/mui-italia` theme.
 * It overrides some of the default values.
 */
export const theme = createTheme(
  deepmerge(muiItaliaTheme, {
    typography: {
      fontFamily,
      h1: {
        fontFamily,
      },
      h2: {
        fontFamily,
      },
      h3: {
        fontFamily,
      },
      h4: {
        fontFamily,
      },
      h5: {
        fontFamily,
      },
      h6: {
        fontFamily,
      },
      subtitle1: {
        fontFamily,
      },
      subtitle2: {
        fontFamily,
      },
      body1: {
        fontFamily,
      },
      body2: {
        fontFamily,
      },
      button: {
        fontFamily,
      },
      caption: {
        fontFamily,
      },
      overline: {
        fontFamily,
      },
    },
    components: {
      MuiTypography: {
        styleOverrides: { root: { wordBreak: 'break-word' } },
      },
    },
  })
)

console.log(theme)
