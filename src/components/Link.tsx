import React, { FunctionComponent, ReactNode } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { DEFAULT_LANG, LangCode } from 'lib/constants'

interface Props {
  children?: ReactNode
  skipLocaleHandling?: boolean
  href: string
}

const LinkComponent: FunctionComponent<Props> = ({ children, href }) => {
  const router = useRouter()
  const locale = (router.query.locale || DEFAULT_LANG) as LangCode
  const localizedHref = `/${locale}${href}`

  return (
    <>
      <Link href={localizedHref}>
        <a>{children}</a>
      </Link>
    </>
  )
}

export default LinkComponent
