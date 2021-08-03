import dynamic from 'next/dynamic'

const AdminContainer = dynamic(() => import('layouts/containers/Admin'))

const routes = [
  {
    path: '/admin/settings/account/users',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/account/users/add',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/account/users/edit/:id',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/account/provider',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/account/provider/add',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/account/provider/edit/:id',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/account/garage',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/account/garage/add',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/account/garage/edit/:id',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/account/role',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/account/role/add',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/account/role/edit/:id',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/account/session',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/account/session/add',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/account/session/edit/:id',
    layout: AdminContainer,
    exact: true,
  },
  // Master Data
  {
    path: '/admin/settings/master-data/vehicle-rate',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/master-data/vehicle-rate/add',
    layout: AdminContainer,
    exact: true,
  },
  {
    path: '/admin/settings/master-data/vehicle-rate/edit/:id',
    layout: AdminContainer,
    exact: true,
  },
]

export default routes
