import dynamic from 'next/dynamic'

const AdminContainer = dynamic(() => import('layouts/containers/Admin'))

const routes = [
  {
    path: '/admin/pages/:id',
    layout: AdminContainer,
    exact: true,
  },
]

export default routes
