import { NextPage } from 'next'

const CatalogPage: NextPage = () => {
  return <div>Catalog Page</div>
}

export const getStaticProps = async () => {
  return {
    props: {},
  }
}

export default CatalogPage
