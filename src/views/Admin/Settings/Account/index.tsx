import React from 'react'
import { PageHeader, Space, Tabs } from 'antd'
import { capitalize, get } from 'lodash'
import Router, { NextRouter, withRouter } from 'next/router'
import cssSetting from 'views/Admin/Settings/Settings.module.scss'
import cssContent from '@nexys/components/Content/Content.module.scss'
import Users from 'views/Admin/Settings/Account/Users'
import Role from 'views/Admin/Settings/Account/Role'
import Provider from 'views/Admin/Settings/Account/Provider'
import Session from 'views/Admin/Settings/Account/Session'
import Garage from 'views/Admin/Settings/Account/Garage'

const { TabPane } = Tabs

interface SettingAccountProps {
  router: NextRouter
}

function Account(props: SettingAccountProps) {
  const { router } = props
  const { pathname } = router

  const defaultPage = get(props, 'router.query.page', 1)
  const getPathname = pathname.replace('/admin/settings/account/', '')
  const splitPathname = getPathname.split('-')
  const pageTabs = splitPathname.map((x) => capitalize(x)).join(' ')

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <div id={cssContent.customPageHeader}>
        <PageHeader title="Account" subTitle={pageTabs} />
      </div>

      <div id={cssSetting.customTabsCard}>
        <Tabs
          defaultActiveKey="/admin/settings/account/users"
          activeKey={pathname}
          onChange={(activeKey) => Router.push(activeKey)}
          type="card"
          size="middle"
        >
          <TabPane tab="Account" key="/admin/settings/account/users">
            <Users defaultPage={defaultPage} />
          </TabPane>
          <TabPane tab="Provider" key="/admin/settings/account/provider">
            <Provider defaultPage={defaultPage} />
          </TabPane>
          <TabPane tab="Garage" key="/admin/settings/account/garage">
            <Garage defaultPage={defaultPage} />
          </TabPane>
          <TabPane tab="Role" key="/admin/settings/account/role">
            <Role defaultPage={defaultPage} />
          </TabPane>
          <TabPane tab="Session Log" key="/admin/settings/account/session">
            <Session defaultPage={defaultPage} />
          </TabPane>
        </Tabs>
      </div>
    </Space>
  )
}

export default withRouter(Account)
