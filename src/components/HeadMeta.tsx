import { Meta } from '../../api/model'

export const HeadMeta = ({ title, description, sitename, url, imgFb, imgTw }: Meta) => {
  return (
    <>
      <meta property="og:locale" content="it_IT" />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:site_name" content={sitename} />
      <meta property="og:image" content={imgFb} />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imgTw} />
    </>
  )
}
