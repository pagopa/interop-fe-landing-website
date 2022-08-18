import type { NextPage } from 'next'
import { Hero } from '../src/components/Hero'
import InteropHead from '../src/components/InteropHead'
import NumberedInfoblocks from '../src/components/NumberedInfoblocks'
import Goals from '../src/components/Goals'
import LawSnippets from '../src/components/LawSnippets'
import PageBottomCta from '../src/components/PageBottomCta'
import { useContext } from 'react'
import LocaleContext from '../src/utils/LocaleContext'
import { getCommonData, getProjectData } from '../api'

const ProjectPage: NextPage = () => {
  const { locale } = useContext(LocaleContext)
  const data = getProjectData(locale)
  const commonData = getCommonData(locale)

  return (
    <>
      <InteropHead />
      <main>
        <Hero {...data.hero} />
        <NumberedInfoblocks {...data.numberedInfoblocks} />
        <Goals {...data.goals} />
        <LawSnippets {...data.lawSnippets} />
        <PageBottomCta {...commonData.pageBottomCta} />
      </main>
    </>
  )
}

export default ProjectPage
