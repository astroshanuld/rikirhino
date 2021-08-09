import ClockCircleFilled from '@ant-design/icons/ClockCircleFilled'
import CommentOutlined from '@ant-design/icons/CommentOutlined'
import FacebookOutlined from '@ant-design/icons/FacebookOutlined'
import InstagramOutlined from '@ant-design/icons/InstagramOutlined'
import TwitterOutlined from '@ant-design/icons/TwitterOutlined'
import { Affix, Button, Card, Col, Image, Input, Layout, Row, Tabs } from 'antd'
import 'antd/dist/antd.css'
import Meta from 'antd/lib/card/Meta'
import TextArea from 'antd/lib/input/TextArea'
import Modal from 'antd/lib/modal/Modal'
import _ from 'lodash'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import cssHome from 'views/Home/partials/Home.module.scss'
import SlideDiary from 'views/Home/partials/SlideDiary'
import SlideGallery from 'views/Home/partials/SlideGallery'
import SlideGames from 'views/Home/partials/SlideGames'
import SlideHome from 'views/Home/partials/SlideHome'
import SlideKarakter from 'views/Home/partials/SlideKarakter'
import SlideLokasi from 'views/Home/partials/SlideLokasi'
import SlideNews from 'views/Home/partials/SlideNews'
import SlidePoster from 'views/Home/partials/SlidePoster'
import SlideSoundtrack from 'views/Home/partials/SlideSoundtrack'
import SlideStory from 'views/Home/partials/SlideStory'

const { Content, Footer } = Layout
const { TabPane } = Tabs

function Home() {
  const [height, setHeight] = useState('65vh')
  const [tabIndex, setTabIndex] = useState('1')
  const [styleMenu, setStyleMenu] = useState({})
  const [modalVisible, setModalVisible] = useState(false)
  const [isLoadingModal, setIsLoadingModal] = useState(true)
  const [modalWidth, setModalWidth] = useState('')
  const [modalTitle, setModalTitle] = useState('')
  const [modalDesc, setModalDesc] = useState('')
  const [modalThumb, setModalThumb] = useState('')
  const [modalTime, setModalTime] = useState({ seconds: 0 })
  const [modalComments, setModalComments] = useState([])

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
        onClick={() => console.log(modalComments)}
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
    if (screenXxl) {
      setHeight('65vh')
    } else if (screenXl) {
      setHeight('65vh')
    } else if (screenLg) {
      setHeight('65vh')
    } else if (screenMd) {
      setHeight('50vh')
    } else if (screenSm) {
      setHeight('50vh')
    }
  })

  const checkSlide = () => {
    if (tabIndex === '1') {
      return <SlideHome />
    }
    if (tabIndex === '2') {
      return <SlideStory contHeight={height} />
    }
    if (tabIndex === '3') {
      return <SlideKarakter contHeight={height} />
    }
    if (tabIndex === '4') {
      return <SlideLokasi contHeight={height} />
    }
    if (tabIndex === '5') {
      return <SlideGallery contHeight={height} />
    }
    if (tabIndex === '6') {
      return <SlideGames contHeight={height} />
    }
    if (tabIndex === '7') {
      return <SlidePoster contHeight={height} />
    }
    if (tabIndex === '8') {
      return <SlideSoundtrack contHeight={height} />
    }
    if (tabIndex === '9') {
      return <SlideDiary contHeight={height} />
    }
    if (tabIndex === '10') {
      return (
        <SlideNews
          setModalVisible={setModalVisible}
          setModalWidth={setModalWidth}
          setModalTitle={setModalTitle}
          setModalDesc={setModalDesc}
          setModalThumb={setModalThumb}
          setModalTime={setModalTime}
          setIsLoadingModal={setIsLoadingModal}
          setModalComments={setModalComments}
        />
      )
    }
  }

  function RenderComments() {
    if (modalComments.length !== 0) {
      modalComments.map((item, index) => (
        <Card style={{ margin: '5px 0px ' }}>
          <h4>{item.data.name}</h4>
          <p>{item.data.comment}</p>
        </Card>
      ))
    }
  }

  return (
    <div>
      <Layout
        className="layout"
        style={tabIndex !== '10' ? { height: '100vh' } : {}}
      >
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
                      tab={<span className={cssHome.menuText}>Home</span>}
                      key="1"
                    />
                    <TabPane
                      tab={<span className={cssHome.menuText}>Story</span>}
                      key="2"
                    />
                    <TabPane
                      tab={<span className={cssHome.menuText}>Karakter</span>}
                      key="3"
                    />
                    <TabPane
                      tab={<span className={cssHome.menuText}>Lokasi</span>}
                      key="4"
                    />
                    <TabPane
                      tab={<span className={cssHome.menuText}>Gallery</span>}
                      key="5"
                    />
                    <TabPane
                      tab={<span className={cssHome.menuText}>Games</span>}
                      key="6"
                    />
                    <TabPane
                      tab={<span className={cssHome.menuText}>Poster</span>}
                      key="7"
                    />
                    <TabPane
                      tab={<span className={cssHome.menuText}>Soundtrack</span>}
                      key="8"
                    />
                    <TabPane
                      tab={<span className={cssHome.menuText}>Diary Beni</span>}
                      key="9"
                    />
                    <TabPane
                      tab={<span className={cssHome.menuText}>News</span>}
                      key="10"
                    />
                  </Tabs>
                </div>
              </Col>
            </Row>
          </Affix>
          {checkSlide()}
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

      <Modal
        centered
        visible={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={modalWidth}
      >
        <div style={{ margin: 20 }}>
          <Card loading={isLoadingModal} style={{ marginBottom: 5 }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginBottom: 73,
              }}
            >
              <Image src={modalThumb} width="70%" />
            </div>
            <div>
              <Meta
                title={<h2>{modalTitle}</h2>}
                description={
                  <span>
                    <CommentOutlined />
                    &nbsp;9,999&nbsp;&nbsp;
                    <ClockCircleFilled />
                    &nbsp;
                    {new Date(modalTime.seconds * 1000).toLocaleDateString(
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
              {modalDesc}
            </div>
          </Card>
          <Card>
            <h3>Comments...</h3>
            {!_.isEmpty(modalComments) ? (
              modalComments.map((item) => {
                return (
                  <Card style={{ margin: '5px 0px ' }} key={item.name}>
                    <h4>{item.data.name}</h4>
                    <p>{item.data.comment}</p>
                  </Card>
                )
              })
            ) : (
              <React.Fragment />
            )}
            <h3 style={{ marginTop: 50 }}>Add comments...</h3>
            <Input placeholder="Your name..." />
            <TextArea
              showCount
              maxLength={100}
              placeholder="Your comments..."
              style={{ marginTop: 10 }}
            />
            <Button type="primary" shape="round" style={{ marginTop: 20 }}>
              Sent
            </Button>
          </Card>
        </div>
      </Modal>
    </div>
  )
}

export default Home
