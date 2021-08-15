import { NextPageContext } from 'next'
import single from 'views/Admin/Pages/single'

export const getServerSideProps = async (ctx: NextPageContext) => {
  return {
    props: {
      query: ctx.query,
    },
  }
}

export default single
