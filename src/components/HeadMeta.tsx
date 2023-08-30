export interface HeadMetaProps {
  title: string
  description: string
  sitename: string
  url: string
  imgFb: string
  imgTw: string
}

export const HeadMeta = ({ title, description, sitename, url, imgFb, imgTw }: HeadMetaProps) => {
  return (
    <>
      <meta key="twitter:card" name="twitter:card" content="summary_large_image" />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta key="twitter:description" name="twitter:description" content={description} />
      <meta key="twitter:image" name="twitter:image" content={imgTw} />
      <meta key="og:locale" property="og:locale" content="it_IT" />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:title" property="og:title" content={title} />
      <meta key="og:description" property="og:description" content={description} />
      <meta key="og:url" property="og:url" content={url} />
      <meta key="og:site_name" property="og:site_name" content={sitename} />
      <meta key="og:image" property="og:image" content={imgFb} />
    </>
  )
}
