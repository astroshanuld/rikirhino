import FacebookOutlined from '@ant-design/icons/FacebookOutlined'
import InstagramOutlined from '@ant-design/icons/InstagramOutlined'
import TwitterOutlined from '@ant-design/icons/TwitterOutlined'
import { Affix, Button, Col, Image, Layout, Row, Tabs } from 'antd'
import 'antd/dist/antd.css'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import cssHome from 'views/Home/partials/Home.module.scss'
import SlideDiary from 'views/Home/partials/SlideDiary'
import SlideGallery from 'views/Home/partials/SlideGallery'
import SlideGames from 'views/Home/partials/SlideGames'
import SlideHome from 'views/Home/partials/SlideHome'
import SlideHomeMobile from 'views/Home/partials/mobile/SlideHomeMobile'
import SlideKarakter from 'views/Home/partials/SlideKarakter'
import SlideLokasi from 'views/Home/partials/SlideLokasi'
import SlideNews from 'views/Home/partials/SlideNews'
import SlidePoster from 'views/Home/partials/SlidePoster'
import SlideSoundtrack from 'views/Home/partials/SlideSoundtrack'
import SlideStory from 'views/Home/partials/SlideStory'
import SlideStoryMobile from 'views/Home/partials/mobile/SlideStoryMobile'
import SlideKarakterMobile from 'views/Home/partials/mobile/SlideKarakterMobile'
import SlideLokasiMobile from 'views/Home/partials/mobile/SlideLokasiMobile'
import SlideGalleryMobile from 'views/Home/partials/mobile/SlideGalleryMobile'
import SlideGamesMobile from 'views/Home/partials/mobile/SlideGamesMobile'

const { Content, Footer } = Layout
const { TabPane } = Tabs

function Home() {
  const [height, setHeight] = useState('65vh')
  const [tabIndex, setTabIndex] = useState('1')
  const [styleMenu, setStyleMenu] = useState({})
  const [render, setRender] = useState(null)

  const screenXxl = useMediaQuery({ query: '(min-width: 1600px)' })
  const screenXl = useMediaQuery({ query: '(min-width: 1200px)' })
  const screenLg = useMediaQuery({ query: '(min-width: 992px)' })
  const screenMd = useMediaQuery({ query: '(min-width: 768px)' })
  const screenSm = useMediaQuery({ query: '(min-width: 576px)' })
  const screenSsm = useMediaQuery({ query: '(max-width: 576px)' })

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

  const checkSlide = () => {
    if (tabIndex === '1') {
      if (screenSsm) {
        setRender(<SlideHomeMobile />)
      } else {
        setRender(<SlideHome />)
      }
    }
    if (tabIndex === '2') {
      if (screenSsm) {
        setRender(<SlideStoryMobile />)
      } else {
        setRender(<SlideStory contHeight={height} />)
      }
    }
    if (tabIndex === '3') {
      if (screenSsm) {
        setRender(<SlideKarakterMobile />)
      } else {
        setRender(<SlideKarakter contHeight={height} />)
      }
    }
    if (tabIndex === '4') {
      if (screenSsm) {
        setRender(<SlideLokasiMobile />)
      } else {
        setRender(<SlideLokasi contHeight={height} />)
      }
    }
    if (tabIndex === '5') {
      if (screenSsm) {
        setRender(<SlideGalleryMobile />)
      } else {
        setRender(<SlideGallery contHeight={height} />)
      }
    }
    if (tabIndex === '6') {
      if (screenSsm) {
        setRender(<SlideGamesMobile />)
      } else {
        setRender(<SlideGames contHeight={height} />)
      }
    }
    if (tabIndex === '7') {
      setRender(<SlidePoster contHeight={height} />)
    }
    if (tabIndex === '8') {
      setRender(<SlideSoundtrack contHeight={height} />)
    }
    if (tabIndex === '9') {
      setRender(<SlideDiary contHeight={height} />)
    }
    if (tabIndex === '10') {
      setRender(<SlideNews />)
    }
  }

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
    } else if (screenSsm) {
      setHeight('50vh')
    }

    checkSlide()
  }, [tabIndex])

  return (
    <div>
      <Layout
        className="layout"
        style={tabIndex !== '10' ? { height: '100vh' } : {}}
      >
        <Content className={cssHome.baseContent}>
          <Row gutter={[0, 16]} style={styleMenu}>
            <Col xl={1} lg={3} md={4} sm={5} xs={6} style={{ zIndex: 1 }}>
              <Image
                preview={false}
                width={120}
                src="./../../../../images/logo-1.png"
              />
            </Col>
            <Col xl={22} lg={20} md={19} sm={18} xs={17}>
              {screenSsm ? (
                <div style={{ backgroundColor: '#000' }}>
                  <div>
                    <Button
                      type="primary"
                      onClick={() => setTabIndex('1')}
                      className={cssHome.menuTextMobile}
                    >
                      Home
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setTabIndex('2')}
                      className={cssHome.menuTextMobile}
                    >
                      Story
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setTabIndex('3')}
                      className={cssHome.menuTextMobile}
                    >
                      Karakter
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setTabIndex('4')}
                      className={cssHome.menuTextMobile}
                    >
                      Lokasi
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setTabIndex('5')}
                      className={cssHome.menuTextMobile}
                    >
                      Gallery
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setTabIndex('6')}
                      className={cssHome.menuTextMobile}
                    >
                      Games
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setTabIndex('7')}
                      className={cssHome.menuTextMobile}
                    >
                      Poster
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setTabIndex('8')}
                      className={cssHome.menuTextMobile}
                    >
                      Soundtrack
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setTabIndex('9')}
                      className={cssHome.menuTextMobile}
                    >
                      Diary Beni
                    </Button>
                    <Button
                      type="primary"
                      onClick={() => setTabIndex('10')}
                      className={cssHome.menuTextMobile}
                    >
                      News
                    </Button>
                  </div>
                </div>
              ) : (
                <Affix
                  onChange={(affixed) => {
                    if (affixed) {
                      setStyleMenu({ background: 'rgba(0,0,0,0.8)' })
                    } else {
                      setStyleMenu({})
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
                        tab={
                          <span className={cssHome.menuText}>Soundtrack</span>
                        }
                        key="8"
                      />
                      <TabPane
                        tab={
                          <span className={cssHome.menuText}>Diary Beni</span>
                        }
                        key="9"
                      />
                      <TabPane
                        tab={<span className={cssHome.menuText}>News</span>}
                        key="10"
                      />
                    </Tabs>
                  </div>
                </Affix>
              )}
            </Col>
          </Row>
          {render}
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

export default Home
