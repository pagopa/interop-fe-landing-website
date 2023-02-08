import { ReactElement } from 'react'
import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { DEFAULT_LOCALE, Locale } from '../lib/constants'
// import Script from 'next/script'
// import { ONETRUST_DOMAIN_SCRIPT_ID } from '../src/utils/constants'

export default class MyDocument extends Document<{ lang: Locale }> {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps & { lang: Locale }> {
    const initialProps = await Document.getInitialProps(ctx)
    return { ...initialProps, lang: ctx.query?.lang as Locale }
  }

  render(): ReactElement {
    return (
      <Html lang={this.props.lang || DEFAULT_LOCALE}>
        <Head>
          <meta name="description" content="Abilita lo scambio di informazioni tra enti" />
          <link rel="icon" href="/favicon.svg" />
        </Head>

        <body>
          <Main />
          <NextScript />
          {/* <Script
            src="static/oneTrust_production/scripttemplates/otSDKStub.js"
            strategy="beforeInteractive"
            data-domain-script={ONETRUST_DOMAIN_SCRIPT_ID}
          /> */}
        </body>
      </Html>
    )
  }
}
