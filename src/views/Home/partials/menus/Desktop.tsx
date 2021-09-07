/* eslint-disable react/jsx-curly-newline */
import FacebookOutlined from '@ant-design/icons/FacebookOutlined'
import InstagramOutlined from '@ant-design/icons/InstagramOutlined'
import { Affix, Button, Tabs } from 'antd'
import React from 'react'
import cssHome from 'views/Home/partials/Home.module.scss'

const { TabPane } = Tabs

interface IDesktop {
  setTab: (x) => void
  setStyle: (x) => void
  tabIndex: string
}

const Desktop = (props: IDesktop) => {
  const { setStyle, setTab, tabIndex } = props

  const extraButton = (
    <div style={{ marginRight: 10 }}>
      <Button
        type="dashed"
        shape="circle"
        icon={<InstagramOutlined />}
        onClick={() =>
          window.open('https://www.instagram.com/rikirhino.movie/', '_blank')
        }
        style={{ margin: '0px 5px' }}
      />
      {/* <Button
        type="dashed"
        shape="circle"
        icon={<TwitterOutlined />}
        onClick={() =>
          router.push('https://www.instagram.com/rikirhino.movie/')
        }
        style={{ margin: '0px 5px' }}
      /> */}
      <Button
        type="dashed"
        shape="circle"
        icon={<FacebookOutlined />}
        onClick={() =>
          window.open('https://www.facebook.com/RikiRhinoMovie/', '_blank')
        }
        style={{ margin: '0px 5px' }}
      />
    </div>
  )

  return (
    <Affix
      onChange={(affixed) => {
        if (affixed) {
          setStyle({ background: 'rgba(0,0,0,0.8)' })
        } else {
          setStyle({})
        }
      }}
    >
      <div style={{ marginTop: 30 }}>
        <Tabs
          centered
          tabBarStyle={{
            background: '#fbb040',
          }}
          activeKey={tabIndex}
          onChange={(data) => {
            setTab(data)
          }}
          tabBarExtraContent={extraButton}
        >
          <TabPane
            tab={<span className={cssHome.menuText}>Home</span>}
            key="1"
          />
          <TabPane
            tab={<span className={cssHome.menuText}>Story</span>}
            key="2"
          />
          <TabPane
            tab={<span className={cssHome.menuText}>Character</span>}
            key="3"
          />
          <TabPane
            tab={<span className={cssHome.menuText}>Journey</span>}
            key="4"
          />
          {/* <TabPane
            tab={<span className={cssHome.menuText}>Gallery</span>}
            key="5"
          /> */}
          {/* <TabPane
            tab={<span className={cssHome.menuText}>Games</span>}
            key="6"
          /> */}
          <TabPane
            tab={<span className={cssHome.menuText}>Poster</span>}
            key="7"
          />
          <TabPane
            tab={<span className={cssHome.menuText}>Soundtrack</span>}
            key="8"
          />
          {/* <TabPane
            tab={<span className={cssHome.menuText}>Diary Beni</span>}
            key="9"
          /> */}
          <TabPane
            tab={<span className={cssHome.menuText}>News</span>}
            key="10"
          />
        </Tabs>
      </div>
    </Affix>
  )
}

export default Desktop
