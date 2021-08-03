import { NextPageContext } from 'next'
import Workshop from 'views/Admin/Product/Workshop'

export const getServerSideProps = async (ctx: NextPageContext) => {
  return {
    props: {
      query: ctx.query,
    },
  }
}

export default Workshop
