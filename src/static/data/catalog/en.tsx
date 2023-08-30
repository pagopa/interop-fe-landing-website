import { IMAGES_PATH, SITE_URL } from '@/configs/constants.config'
import { HeadMetaProps } from '@/components'

const meta: HeadMetaProps = {
  title: 'E-Service Catalog | PDND Interoperabilità',
  description: 'The list of e-services available on PDND Interoperabilità',
  sitename: 'PDND Interoperabilità',
  url: `${SITE_URL}/catalogo`,
  imgFb: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_1200x630.jpg`,
  imgTw: `${SITE_URL}/${IMAGES_PATH}/social_interop_01_800x418.jpg`,
}

/** Application Data Mock */
export const enCatalogData = {
  meta,
}
