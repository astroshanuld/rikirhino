import dynamic from 'next/dynamic'

const AdminContainer = dynamic(() => import('layouts/containers/Admin'))

const routes = [
  {
    path: '/news/:id',
    exact: true,
  },
  {
    path: '/admin/news',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/news/compose',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/news/edit/:id',
    layout: AdminContainer,
    exact: true,
  },
]

export default routes
