import { HeroProps, ShowcaseProps } from '@pagopa/mui-italia'
import { InfoblockProps } from '@pagopa/mui-italia'

export interface DtdProps {
  description: JSX.Element
  logo: JSX.Element
}
export interface CommonProps {
  assistance: ILinkData
  dtd: DtdProps
  pageBottomCta: PageBottomCtaProps
}
export interface PageBottomCtaProps {
  icon: JSX.Element
  title: string
  subtitle: string
  ctaLink: ILinkData
}

export interface MainFaqProps {
  title: string | JSX.Element
  subtitle: string | JSX.Element
}

export interface ILinkData {
  label: string
  ariaLabel: string
  href: string
}

export interface Meta {
  title: string
  description: string
  sitename: string
  url: string
  imgFb: string
  imgTw: string
}

export interface HomeProps {
  title: string
  meta: Meta
  hero: HeroProps
  infoblocks: Array<InfoblockProps>
  showcase: ShowcaseProps
  mainFaq: MainFaqProps
}

export interface NumberedInfoblockProps {
  title: string
  subtitle: string
}

export interface NumberedInfoblocksProps {
  title: string
  blocks: Array<NumberedInfoblockProps>
}

export interface GoalProps {
  icon: JSX.Element
  title: string
  subtitle: string
}

export interface GoalsProps {
  title: string
  blocks: Array<GoalProps>
}

export interface LawSnippet {
  title?: string
  content: string | JSX.Element
}

export interface LawSnippetsProps {
  title: string
  subtitle?: string
  snippets: Array<LawSnippet>
}

export interface ProjectProps {
  title: string
  meta: Meta
  hero: HeroProps
  numberedInfoblocks: NumberedInfoblocksProps
  goals: GoalsProps
  lawSnippets: LawSnippetsProps
}

export interface NewsPostProps {
  id: number
  slug: string
  title: string
}

export interface NewsProps {
  titles: {
    h1: string
    backLink: {
      href: string
      label: string
    }
  }
  news: Array<NewsPostProps>
}