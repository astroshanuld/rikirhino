import { NextPageContext } from 'next'
import Pages from 'views/Admin/Pages'

export const getServerSideProps = async (ctx: NextPageContext) => {
  return {
    props: {
      query: ctx.query,
    },
  }
}

export default Pages
