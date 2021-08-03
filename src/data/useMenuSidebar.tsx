import DashboardOutlined from '@ant-design/icons/DashboardOutlined'
import SettingOutlined from '@ant-design/icons/SettingOutlined'
import SolutionOutlined from '@ant-design/icons/SolutionOutlined'

function useMenu() {
  const data = [
    // Menu yang tidak ada turunan
    {
      id: 'menu1',
      name: 'Dashboard',
      icon: <DashboardOutlined style={{ fontSize: 16 }} />,
      url: '/admin/dashboard',
    },
    {
      id: 'menu2',
      name: 'Product',
      icon: <SolutionOutlined style={{ fontSize: 16 }} />,
      submenus: [
        {
          id: '1',
          name: 'Insurance',
          url: '/admin/product/insurance',
        },
        {
          id: '2',
          name: 'Workshop',
          url: '/admin/product/workshop',
        },
      ],
    },
    // Menu yang ada turunan
    {
      id: 'menu3',
      name: 'Settings',
      icon: <SettingOutlined style={{ fontSize: 16 }} />,
      submenus: [
        {
          id: '3',
          name: 'Account',
          url: '/admin/settings/account',
        },
        {
          id: '4',
          name: 'Master Data',
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
