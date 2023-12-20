import {
  ICONS_PATH,
  IMAGES_PATH,
  INTEROP_ONBOARDING_GUIDE_URL,
  SITE_URL,
} from '@/configs/constants.config'
import { HeadMetaProps, PageBottomCtaProps } from '@/components'
import { Box } from '@mui/material'

const meta: HeadMetaProps = {
  title: 'Visualizza e-service | PDND Interoperabilità',
  description: 'La lista degli e-service presenti su PDND Interoperabilità',
  sitename: 'PDND Interoperabilità',
  url: `${SITE_URL}/catalogo`,
  imgFb: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_1200x630.jpg`,
  imgTw: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_800x418.jpg`,
}

/** PageBottomCta mocked data */
const pageBottomCta: PageBottomCtaProps = {
  // icon: <ExampleIcon style={{ width: 48, height: 48, color: 'white' }} />,
  icon: (
    <img
      width={120}
      height={120}
      src={`/${ICONS_PATH}/login.svg`}
      alt="Icona che rappresenta il login"
    />
  ),
  title: 'Come posso aderire?',
  subtitle: (
    <Box component="ol" sx={{ pl: { xs: 2, md: 2.5 } }}>
      <Box component="li" sx={{ mt: 0.25 }}>
        Un delegato dell’ente inserisce i dati richiesti
      </Box>
      <Box component="li" sx={{ mt: 0.25 }}>
        L’ente riceve l’accordo di adesione, standard per tutti
      </Box>
      <Box component="li" sx={{ mt: 0.25 }}>
        Il Legale Rappresentante dell’ente firma l’accordo
      </Box>
      <Box component="li" sx={{ mt: 0.25 }}>
        Un delegato dell’ente carica l’accordo firmato
      </Box>
    </Box>
  ),
  ctaLink: {
    label: 'Scopri i dettagli',
    ariaLabel: 'Scopri i dettagli',
    href: INTEROP_ONBOARDING_GUIDE_URL,
  },
}
/* ************************************** */

/** Application Data Mock */
export const itCatalogData = {
  meta,
  pageBottomCta,
}
