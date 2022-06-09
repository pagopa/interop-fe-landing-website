import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import Link from '../../components/Link'

const AboutPage = () => {
  const { t } = useTranslation(['common'])

  return (
    <>
      <main>
        <Header heading={t('h1-about')} title={t('title')} />
        <Link href='/'>
          <button type='button'>{t('back-to-home')}</button>
        </Link>
      </main>
      <Footer />
    </>
  )
}

export default AboutPage

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }