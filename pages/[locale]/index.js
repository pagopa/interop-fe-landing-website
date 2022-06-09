import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import Link from '../../components/Link'

const Homepage = () => {
  const { t } = useTranslation(['common'])

  return (
    <>
      <main>
        <Header heading={t('h1-home')} title={t('title')} />
        <div>
          <Link href='/about'>
            <button type='button'>{t('to-about')}</button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default Homepage

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }