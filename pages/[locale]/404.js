import React from 'react'
import { useTranslation } from 'next-i18next'
import { getStaticPaths, makeStaticProps } from '../../lib/getStatic'
import Link from '../../src/components/Link'

const FourOFour = () => {
  const { t } = useTranslation(['common'])

  return (
    <>
      <div>
        <Link href="/">
          <button type="button">{t('back-to-home')}</button>
        </Link>
      </div>
    </>
  )
}

export default FourOFour

const getStaticProps = makeStaticProps(['common'])
export { getStaticPaths, getStaticProps }
