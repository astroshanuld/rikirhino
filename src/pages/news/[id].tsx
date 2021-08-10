import { NextPageContext } from 'next'
import News from 'views/News/News'

export const getServerSideProps = async (ctx: NextPageContext) => {
  return {
    props: {
      query: ctx.query,
    },
  }
}

export default News
