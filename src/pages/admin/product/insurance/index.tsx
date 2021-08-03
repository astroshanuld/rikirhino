import { NextPageContext } from 'next'
import Insurance from 'views/Admin/Product/Insurance'

export const getServerSideProps = async (ctx: NextPageContext) => {
  return {
    props: {
      query: ctx.query,
    },
  }
}

export default Insurance
