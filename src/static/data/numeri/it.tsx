import { HeadMetaProps } from '@/components'
import { IMAGES_PATH } from '@/configs/constants.config'

const SITE_URL_TEST = 'https://interop-dashboard.netlify.app'

const meta: HeadMetaProps = {
  title: 'I numeri della PDND | PDND Interoperabilità',
  description: 'Come sta andando PDND Interoperabilità',
  sitename: 'PDND Interoperabilità',
  url: `${SITE_URL_TEST}/numeri`,
  imgFb: `${SITE_URL_TEST}/${IMAGES_PATH}/social_interop_numeri_1200x630.png`,
  imgTw: `${SITE_URL_TEST}/${IMAGES_PATH}/social_interop_numeri_800x420.png`,
}

export const itNumbers = {
  title: 'I numeri della PDND',
  meta,
}
