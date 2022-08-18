import type { NextPage } from 'next'
import NumberedInfoblocks from '../../src/components/NumberedInfoblocks'
import Goals from '../../src/components/Goals'
import LawSnippets from '../../src/components/LawSnippets'
import PageBottomCta from '../../src/components/PageBottomCta'
import { useContext } from 'react'
import LocaleContext from '../../src/utils/LocaleContext'
import { getCommonData, getProjectData } from '../../api'
import { Hero } from '@pagopa/mui-italia'

const ProjectPage: NextPage = () => {
  const { locale } = useContext(LocaleContext)
  const data = getProjectData(locale)
  const commonData = getCommonData(locale)

  return (
    <>
      <Hero {...data.hero} />
      <NumberedInfoblocks {...data.numberedInfoblocks} />
      <Goals {...data.goals} />
      <LawSnippets {...data.lawSnippets} />
      <PageBottomCta {...commonData.pageBottomCta} />
    </>
  )
}

export default ProjectPage
