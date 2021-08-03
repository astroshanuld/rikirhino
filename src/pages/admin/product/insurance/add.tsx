import { NextPageContext } from 'next'
import { FormAdd } from 'views/Admin/Product/Insurance/Form'

export const getServerSideProps = async (ctx: NextPageContext) => {
  return {
    props: {
      query: ctx.query,
    },
  }
}

export default FormAdd
