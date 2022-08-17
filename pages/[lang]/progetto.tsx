import type { NextPage } from 'next'
import { useGetCommonData, useGetProjectData } from '../../api'
import { Hero } from '../../src/components/Hero'
import InteropHead from '../../src/components/InteropHead'
import NumberedInfoblocks from '../../src/components/NumberedInfoblocks'
import Goals from '../../src/components/Goals'
import LawSnippets from '../../src/components/LawSnippets'
import PageBottomCta from '../../src/components/PageBottomCta'

const ProjectPage: NextPage = () => {
  const data = useGetProjectData()
  const commonData = useGetCommonData()

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
