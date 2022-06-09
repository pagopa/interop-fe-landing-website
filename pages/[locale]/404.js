import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
import { Header } from '../../components/Header'
import { Footer } from '../../components/Footer'
import Link from '../../components/Link'

const FourOFour = () => {
  const { t } = useTranslation(['common'])

  return (
    <>
      <main>
        <Header heading={t('h1-404')} title={t('title')} />
        <div>
          <Link href='/'>
            <button type='button'>{t('back-to-home')}</button>
          </Link>
        </div>
      </main>
      <Footer />
    </>
  )
}

export default FourOFour

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }