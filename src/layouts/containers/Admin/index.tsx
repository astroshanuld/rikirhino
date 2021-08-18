import Content from '@nexys/components/Content/Content'
import { Layout, Spin } from 'antd'
import Footer from 'layouts/containers/Admin/Footer/Footer'
import Header from 'layouts/containers/Admin/Header'
import Sidebar from 'layouts/containers/Admin/Sidebar'
import { isEmpty } from 'lodash'
import router from 'next/router'
import { ReactComponentLike } from 'prop-types'
import React, { useContext, useEffect, useState } from 'react'

interface IProps {
  Component: ReactComponentLike
}

export const AdminContext = React.createContext<
  {
    stateLayoutLoading: [boolean, (loading: boolean) => void]
  } & any
>({
  stateLayoutLoading: [false, () => {}],
})

function AdminContainer(props: IProps) {
  const { Component } = props
  const stateLayoutLoading = useState(false)
  const [isLayoutLoading] = stateLayoutLoading
  const ctxAdmin = useContext(AdminContext)

  useEffect(() => {
    const [, setLayoutLoading] = ctxAdmin.stateLayoutLoading
    setLayoutLoading(true)
    const profile = sessionStorage.getItem('user')
    if (!isEmpty(profile)) {
      setLayoutLoading(false)
      return
    }
    router.push('/admin')
    // if (queryProfile.isLoading) {
    //   return
    // }
    // if (queryProfile.error?.response?.status !== 401) {
    //   return
    // }
    // queryProfile.remove()
    // Router.push('/')
  })

  // if (queryProfile.isLoading) {
  //   return <VerifyPage loading={queryProfile.isLoading} title="Loading..." />
  // }

  return (
    <AdminContext.Provider value={{ stateLayoutLoading }}>
      <Layout style={{ height: 'auto', minHeight: '100%' }}>
        <Spin spinning={isLayoutLoading} size="large" tip="Logging Out...">
          <Layout style={{ maxWidth: 1440, minHeight: '100vh' }}>
            <Sidebar />

            <Layout style={{ minHeight: '100vh', margin: 'auto' }}>
              <Header />

              <Content
                style={{
                  minHeight: '100vh',
                  background: '#f0f2f5',
                  height: '100%',
                  padding: 31,
                }}
                styleContainer={{ width: '100%' }}
              >
                <Component {...props} />
              </Content>

              <Footer />
            </Layout>
          </Layout>
        </Spin>
      </Layout>
    </AdminContext.Provider>
  )
}

export default AdminContainer
