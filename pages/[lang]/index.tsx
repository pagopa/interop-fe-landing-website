import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { LOCALES, ROUTES } from '../../lib/constants'
import useLocale from '../../src/i18n/useLocale'
import { QueryParams } from '../../src/types/global'

const Home = () => {
  const { t, lang } = useLocale()

  return (
    <div>
      {t('common.home')}
      <br />
      <Link href={lang ? ROUTES.ABOUT.PATH[lang] : ''}>{t('common.toAbout')}</Link>
    </div>
  )
}

export default Home

export const getStaticProps: GetStaticProps<{}, QueryParams> = async () => {
  return { props: {} }
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: LOCALES.map((lang) => ({
      params: { lang },
    })),
    fallback: false,
  }
}
