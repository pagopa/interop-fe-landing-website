import { HeadMetaProps } from '@/components'
import { IMAGES_PATH, SITE_URL } from '@/configs/constants.config'

const meta: HeadMetaProps = {
  title: 'I numeri della PDND | PDND Interoperabilità',
  description: 'Come sta andando PDND Interoperabilità',
  sitename: 'PDND Interoperabilità',
  url: `${SITE_URL}/numeri`,
  imgFb: `${SITE_URL}/${IMAGES_PATH}/social_interop_numeri_1200x630.png`,
  imgTw: `${SITE_URL}/${IMAGES_PATH}/social_interop_numeri_800x420.png`,
}

export const itNumbers = {
  title: 'I numeri della PDND',
  meta,
}
