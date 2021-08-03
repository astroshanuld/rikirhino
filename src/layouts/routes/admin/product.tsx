import dynamic from 'next/dynamic'

const AdminContainer = dynamic(() => import('layouts/containers/Admin'))

const routes = [
  {
    path: '/admin/product/insurance',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/product/insurance/add',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/product/insurance/edit/:id',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/product/workshop',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/product/workshop/add',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/product/workshop/edit/:id',
    layout: AdminContainer,
    exact: true,
  },
]

export default routes
