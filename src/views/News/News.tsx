import ClockCircleFilled from '@ant-design/icons/ClockCircleFilled'
import FacebookOutlined from '@ant-design/icons/FacebookOutlined'
import InstagramOutlined from '@ant-design/icons/InstagramOutlined'
import TwitterOutlined from '@ant-design/icons/TwitterOutlined'
import { Affix, Button, Card, Col, Image, Layout, Row, Tabs } from 'antd'
import 'antd/dist/antd.css'
import Meta from 'antd/lib/card/Meta'
import _ from 'lodash'
import { withRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import cssHome from 'views/Home/partials/Home.module.scss'
import firebase from 'layouts/routes/firebaseClient'
import Link from 'next/link'

const { Content, Footer } = Layout
const { TabPane } = Tabs

function Home(props: any) {
  const idNews = _.get(props, 'query.id', null)

  const [tabIndex, setTabIndex] = useState('2')
  const [styleMenu, setStyleMenu] = useState({})
  const [width, setWidth] = useState('')
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [thumb, setThumb] = useState('')
  const [date, setDate] = useState({ seconds: 0 })
  const [isLoadingCard, setIsLoadingCard] = useState(true)
  //   console.log({ id, idNews })

  const screenXxl = useMediaQuery({ query: '(min-width: 1600px)' })
  const screenXl = useMediaQuery({ query: '(min-width: 1200px)' })
  const screenLg = useMediaQuery({ query: '(min-width: 992px)' })
  const screenMd = useMediaQuery({ query: '(min-width: 768px)' })
  const screenSm = useMediaQuery({ query: '(min-width: 576px)' })

  const extraButton = (
    <div style={{ marginRight: 10 }}>
      <Button
        type="dashed"
        shape="circle"
        icon={<InstagramOutlined />}
        style={{ margin: '0px 5px' }}
      />
      <Button
        type="dashed"
        shape="circle"
        icon={<TwitterOutlined />}
        style={{ margin: '0px 5px' }}
      />
      <Button
        type="dashed"
        shape="circle"
        icon={<FacebookOutlined />}
        style={{ margin: '0px 5px' }}
      />
    </div>
  )

  useEffect(() => {
    const getData = firebase
      .firestore()
      .collection('Posts')
      .doc(idNews)
    getData.onSnapshot(async (querySnapShot) => {
      setTitle(querySnapShot.get('title'))
      setDesc(querySnapShot.get('description'))
      setThumb(querySnapShot.get('thumbnail'))
      setDate(querySnapShot.get('createdDate'))
      setIsLoadingCard(false)
    })
    if (screenXxl) {
      setWidth('80vw')
    } else if (screenXl) {
      setWidth('80vw')
    } else if (screenLg) {
      setWidth('80vw')
    } else if (screenMd) {
      setWidth('80vw')
    } else if (screenSm) {
      setWidth('80vw')
    }
  })

  return (
    <div>
      <Layout className="layout">
        <Content className={cssHome.baseContent}>
          <Affix
            onChange={(affixed) => {
              if (affixed) {
                setStyleMenu({ background: 'rgba(0,0,0,0.8)' })
              } else {
                setStyleMenu({})
              }
            }}
          >
            <Row gutter={[0, 16]} style={styleMenu}>
              <Col xl={1} lg={3} md={4} sm={5} style={{ zIndex: 1 }}>
                <Image
                  preview={false}
                  width={120}
                  src="./../../../../images/logo-1.png"
                />
              </Col>
              <Col xl={22} lg={20} md={19} sm={18}>
                <div style={{ marginTop: 30 }}>
                  <Tabs
                    centered
                    tabBarStyle={{
                      background: '#fbb040',
                    }}
                    activeKey={tabIndex}
                    onChange={(data) => {
                      setTabIndex(data)
                    }}
                    tabBarExtraContent={extraButton}
                  >
                    <TabPane
                      tab={
                        <span className={cssHome.menuText}>
                          <Link href="/">Home</Link>
                        </span>
                      }
                      key="1"
                    />
                    <TabPane
                      tab={<span className={cssHome.menuText}>News</span>}
                      key="2"
                    />
                  </Tabs>
                </div>
              </Col>
            </Row>
          </Affix>
          <Row gutter={[0, 16]}>
            <Col
              xl={24}
              lg={24}
              md={24}
              sm={24}
              flex={1}
              style={{
                display: 'grid',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Card loading={isLoadingCard} style={{ width, marginBottom: 20 }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: 73,
                  }}
                >
                  <Image src={thumb} width="70%" />
                </div>
                <div>
                  <Meta
                    title={<h2>{title}</h2>}
                    description={
                      <span>
                        <ClockCircleFilled />
                        &nbsp;
                        {new Date(date.seconds * 1000).toLocaleDateString(
                          'en-IN',
                          {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit',
                          },
                        )}
                      </span>
                    }
                    style={{ marginBottom: 10 }}
                  />
                  {desc}
                </div>
              </Card>
            </Col>
          </Row>
        </Content>
        <Footer style={{ padding: '5px 5px', backgroundColor: '#000000' }}>
          <Row justify="center">
            <Col>
              <Image
                src="/images/sponsors/batavia.png"
                width={90}
                preview={false}
              />
            </Col>
            <Col>
              <Image
                src="/images/sponsors/sponsor1.png"
                width={90}
                preview={false}
              />
            </Col>
            <Col>
              <Image
                src="/images/sponsors/sponsor2.png"
                width={90}
                preview={false}
              />
            </Col>
            <Col>
              <Image
                src="/images/sponsors/sponsor2.png"
                width={90}
                preview={false}
              />
            </Col>
          </Row>
        </Footer>
      </Layout>
    </div>
  )
}

export default withRouter(Home)
