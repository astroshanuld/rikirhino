import DashboardOutlined from '@ant-design/icons/DashboardOutlined'
import FileTextOutlined from '@ant-design/icons/FileTextOutlined'
import FormOutlined from '@ant-design/icons/FormOutlined'

function useMenu() {
  const data = [
    // Menu yang tidak ada turunan
    {
      id: 'menu1',
      name: 'Home Page',
      icon: <DashboardOutlined style={{ fontSize: 16 }} />,
      url: '/',
    },
    {
      id: 'menu2',
      name: 'Edit Pages',
      icon: <FormOutlined style={{ fontSize: 16 }} />,
      url: '',
      submenus: [
        {
          id: '1',
          name: 'Home',
          url: '/admin/pages/Home',
        },
        {
          id: '2',
          name: 'Story',
          url: '/admin/pages/Story',
        },
        {
          id: '3',
          name: 'Character',
          url: '/admin/pages/Karakter',
        },
        {
          id: '4',
          name: 'Journey',
          url: '/admin/pages/Lokasi',
        },
        // {
        //   id: '5',
        //   name: 'Gallery',
        //   url: '/admin/pages/Gallery',
        // },
        // {
        //   id: '6',
        //   name: 'Games',
        //   url: '/admin/pages/Games',
        // },
        {
          id: '7',
          name: 'Poster',
          url: '/admin/pages/Poster',
        },
        {
          id: '8',
          name: 'Soundtrack',
          url: '/admin/pages/Soundtrack',
        },
        // {
        //   id: '9',
        //   name: 'Diary Beni',
        //   url: '/admin/pages/Diary',
        // },
      ],
    },
    // Menu yang ada turunan
    {
      id: 'menu3',
      name: 'News',
      icon: <FileTextOutlined style={{ fontSize: 16 }} />,
      url: '',
      submenus: [
        {
          id: '1',
          name: 'News List',
          url: '/admin/news/',
        },
        {
          id: '2',
          name: 'Create News',
          url: '/admin/news/compose',
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
