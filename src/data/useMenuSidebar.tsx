import DashboardOutlined from '@ant-design/icons/DashboardOutlined'
import SettingOutlined from '@ant-design/icons/SettingOutlined'
import SolutionOutlined from '@ant-design/icons/SolutionOutlined'

function useMenu() {
  const data = [
    // Menu yang tidak ada turunan
    // {
    //   id: 'menu1',
    //   name: 'Dashboard',
    //   icon: <DashboardOutlined style={{ fontSize: 16 }} />,
    //   url: '/admin/dashboard',
    // },
    {
      id: 'menu1',
      name: 'Edit Pages',
      icon: <SolutionOutlined style={{ fontSize: 16 }} />,
      submenus: [
        {
          id: '1',
          name: 'Home',
          url: '/admin/product/insurance',
        },
        {
          id: '2',
          name: 'Story',
          url: '/admin/product/workshop',
        },
        {
          id: '3',
          name: 'Karakter',
          url: '/admin/product/workshop',
        },
        {
          id: '4',
          name: 'Story',
          url: '/admin/product/workshop',
        },
        {
          id: '5',
          name: 'Story',
          url: '/admin/product/workshop',
        },
        {
          id: '6',
          name: 'Story',
          url: '/admin/product/workshop',
        },
        {
          id: '7',
          name: 'Story',
          url: '/admin/product/workshop',
        },
        {
          id: '8',
          name: 'Story',
          url: '/admin/product/workshop',
        },
        {
          id: '9',
          name: 'Story',
          url: '/admin/product/workshop',
        },
      ],
    },
    // Menu yang ada turunan
    {
      id: 'menu2',
      name: 'News',
      icon: <SettingOutlined style={{ fontSize: 16 }} />,
      submenus: [
        {
          id: '3',
          name: 'News List',
          url: '/admin/settings/account',
        },
        {
          id: '4',
          name: 'Create News',
          url: '/admin/settings/master-data',
        },
      ],
    },
  ]

  return {
    data,
    total: data.length,
  }
}

export default useMenu
