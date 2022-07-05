import { GetStaticPaths, GetStaticProps } from 'next'
import Link from 'next/link'
import { LOCALES } from '../../lib/constants'
import useLocale from '../../src/i18n/useLocale'
import { QueryParams } from '../../src/types/global'

const About = () => {
  const { t, lang } = useLocale()

  return (
    <div>
      {t('common.about')}
      <br />
      <Link href={`/${lang}`}>{t('common.toHome')}</Link>
    </div>
  )
}

export default About

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
