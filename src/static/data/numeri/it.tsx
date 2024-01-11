import { IMAGES_PATH, SITE_URL } from '@/configs/constants.config'
import { HeadMetaProps } from '@/components'

const meta: HeadMetaProps = {
  title: 'I numeri della PDND | PDND Interoperabilità',
  description: 'Come sta andando PDND Interoperabilità',
  sitename: 'PDND Interoperabilità',
  url: `${SITE_URL}/numeri`,
  imgFb: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_1200x630.jpg`,
  imgTw: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_800x418.jpg`,
}

export const itNumbers = {
  title: 'I numeri della PDND',
  meta,
}
