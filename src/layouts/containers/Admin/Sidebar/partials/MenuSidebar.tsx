/* eslint-disable array-callback-return */
import PoweroffOutlined from '@ant-design/icons/PoweroffOutlined'
import { Menu } from 'antd'
import useMenuSidebar from 'data/useMenuSidebar'
import { AdminContext } from 'layouts/containers/Admin'
import cssMenuSidebar from 'layouts/containers/Admin/Sidebar/partials/MenuSidebar.module.scss'
import firebase from 'layouts/routes/firebaseClient'
import { isEmpty } from 'lodash'
import Link from 'next/link'
import Router, { NextRouter, withRouter } from 'next/router'
import { useContext, useEffect, useState } from 'react'

const { SubMenu } = Menu

interface IRouterProps {
  router: NextRouter
}

function MenuSidebar(props: IRouterProps) {
  const { router } = props
  const { pathname } = router
  const { data } = useMenuSidebar()
  const ctxAdmin = useContext(AdminContext)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const [, setLayoutLoading] = ctxAdmin.stateLayoutLoading
    setLayoutLoading(isLoading)
  }, [isLoading])

  async function handleLogout() {
    setIsLoading(true)
    try {
      firebase
        .auth()
        .signOut()
        .then(() => {
          sessionStorage.removeItem('user')
          Router.push('/')
          setIsLoading(false)
        })
    } catch (error) {
      console.log(error?.response?.data?.message)
    } finally {
      console.log('done')
    }
  }

  function getSelected() {
    for (let i = 0; i < data.length; i += 1) {
      const { submenus } = data[i]

      if (!isEmpty(submenus)) {
        for (let j = 0; j < submenus.length; j += 1) {
          if (pathname.includes(submenus[j].url)) return [submenus[j].id]
        }
      }
    }
  }
  return (
    <Menu
      theme="dark"
      mode="inline"
      defaultSelectedKeys={['1']}
      // defaultOpenKeys={['menu2', 'menu3']}
      style={{ height: '100%', borderRight: 0 }}
      // className={cssMenuSidebar.customSidebar}
      selectedKeys={getSelected()}
    >
      {data.map((menu) => {
        const { id, name, submenus, icon, url } = menu
        let newSubMenu = []

        if (!isEmpty(url)) {
          return (
            <Menu.Item
              key={id}
              icon={icon}
              style={{ borderRadius: 8 }}
              className={cssMenuSidebar.fontBold}
            >
              <Link href={url}>
                <a>{name}</a>
              </Link>
            </Menu.Item>
          )
        }

        newSubMenu = submenus

        if (!isEmpty(submenus)) {
          return (
            <SubMenu key={id} title={name} icon={icon} style={{ padding: 0 }}>
              {newSubMenu.map((sub) => {
                const { url, name, id, notShow } = sub
                let newUrl = ''

                // Modif url
                if (url === '/admin/settings/account') {
                  newUrl = '/admin/settings/account/users'
                } else if (url === '/admin/settings/master-data') {
                  newUrl = '/admin/settings/master-data/vehicle-rate'
                } else {
                  newUrl = url
                }

                if (!notShow)
                  return (
                    <Menu.Item key={id}>
                      <Link href={newUrl}>
                        <a>{name}</a>
                      </Link>
                    </Menu.Item>
                  )
              })}
            </SubMenu>
          )
        }
      })}

      <Menu.Item
        key="99"
        icon={<PoweroffOutlined style={{ fontWeight: 'bold' }} />}
        onClick={handleLogout}
      >
        Log out
      </Menu.Item>
    </Menu>
  )
}

export default withRouter(MenuSidebar)
