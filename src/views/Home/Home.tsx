import { Col, Image, Layout, Row } from 'antd'
import 'antd/dist/antd.css'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import cssHome from 'views/Home/partials/Home.module.scss'
import Desktop from 'views/Home/partials/menus/Desktop'
import Mobile from 'views/Home/partials/menus/Mobile'
import SlideDiaryMobile from 'views/Home/partials/slides/mobile/SlideDiaryMobile'
import SlideGalleryMobile from 'views/Home/partials/slides/mobile/SlideGalleryMobile'
import SlideGamesMobile from 'views/Home/partials/slides/mobile/SlideGamesMobile'
import SlideHomeMobile from 'views/Home/partials/slides/mobile/SlideHomeMobile'
import SlideKarakterMobile from 'views/Home/partials/slides/mobile/SlideKarakterMobile'
import SlideLokasiMobile from 'views/Home/partials/slides/mobile/SlideLokasiMobile'
import SlideNewsMobile from 'views/Home/partials/slides/mobile/SlideNewsMobile'
import SlidePosterMobile from 'views/Home/partials/slides/mobile/SlidePosterMobile'
import SlideSoundtrackMobile from 'views/Home/partials/slides/mobile/SlideSoundtrackMobile'
import SlideStoryMobile from 'views/Home/partials/slides/mobile/SlideStoryMobile'
import SlideDiary from 'views/Home/partials/slides/SlideDiary'
import SlideGallery from 'views/Home/partials/slides/SlideGallery'
import SlideGames from 'views/Home/partials/slides/SlideGames'
import SlideHome from 'views/Home/partials/slides/SlideHome'
import SlideKarakter from 'views/Home/partials/slides/SlideKarakter'
import SlideLokasi from 'views/Home/partials/slides/SlideLokasi'
import SlideNews from 'views/Home/partials/slides/SlideNews'
import SlidePoster from 'views/Home/partials/slides/SlidePoster'
import SlideSoundtrack from 'views/Home/partials/slides/SlideSoundtrack'
import SlideStory from 'views/Home/partials/slides/SlideStory'

const { Content, Footer } = Layout

function Home() {
  const [height, setHeight] = useState('65vh')
  const [tabIndex, setTabIndex] = useState('1')
  const [styleMenu, setStyleMenu] = useState({})
  const [render, setRender] = useState(null)
  const [renderMenu, setRenderMenu] = useState(null)

  const screenXxl = useMediaQuery({ query: '(min-width: 1600px)' })
  const screenXl = useMediaQuery({ query: '(min-width: 1200px)' })
  const screenLg = useMediaQuery({ query: '(min-width: 992px)' })
  const screenMd = useMediaQuery({ query: '(min-width: 768px)' })
  const screenSm = useMediaQuery({ query: '(min-width: 576px)' })
  const screenSsm = useMediaQuery({ query: '(max-width: 576px)' })

  const checkSlide = () => {
    if (tabIndex === '1') {
      if (screenSsm) {
        setRender(<SlideHomeMobile />)
        setRenderMenu(<Mobile setTab={setTabIndex} />)
      } else {
        setRenderMenu(
          <Desktop
            setTab={setTabIndex}
            setStyle={setStyleMenu}
            tabIndex={tabIndex}
          />,
        )
        setRender(<SlideHome />)
      }
    }
    if (tabIndex === '2') {
      if (screenSsm) {
        setRender(<SlideStoryMobile />)
        setRenderMenu(<Mobile setTab={setTabIndex} />)
      } else {
        setRenderMenu(
          <Desktop
            setTab={setTabIndex}
            setStyle={setStyleMenu}
            tabIndex={tabIndex}
          />,
        )
        setRender(<SlideStory contHeight={height} />)
      }
    }
    if (tabIndex === '3') {
      if (screenSsm) {
        setRender(<SlideKarakterMobile />)
        setRenderMenu(<Mobile setTab={setTabIndex} />)
      } else {
        setRenderMenu(
          <Desktop
            setTab={setTabIndex}
            setStyle={setStyleMenu}
            tabIndex={tabIndex}
          />,
        )
        setRender(<SlideKarakter contHeight={height} />)
      }
    }
    if (tabIndex === '4') {
      if (screenSsm) {
        setRender(<SlideLokasiMobile />)
        setRenderMenu(<Mobile setTab={setTabIndex} />)
      } else {
        setRenderMenu(
          <Desktop
            setTab={setTabIndex}
            setStyle={setStyleMenu}
            tabIndex={tabIndex}
          />,
        )
        setRender(<SlideLokasi contHeight={height} />)
      }
    }
    if (tabIndex === '5') {
      if (screenSsm) {
        setRender(<SlideGalleryMobile />)
        setRenderMenu(<Mobile setTab={setTabIndex} />)
      } else {
        setRenderMenu(
          <Desktop
            setTab={setTabIndex}
            setStyle={setStyleMenu}
            tabIndex={tabIndex}
          />,
        )
        setRender(<SlideGallery contHeight={height} />)
      }
    }
    if (tabIndex === '6') {
      if (screenSsm) {
        setRender(<SlideGamesMobile />)
        setRenderMenu(<Mobile setTab={setTabIndex} />)
      } else {
        setRenderMenu(
          <Desktop
            setTab={setTabIndex}
            setStyle={setStyleMenu}
            tabIndex={tabIndex}
          />,
        )
        setRender(<SlideGames contHeight={height} />)
      }
    }
    if (tabIndex === '7') {
      if (screenSsm) {
        setRender(<SlidePosterMobile />)
        setRenderMenu(<Mobile setTab={setTabIndex} />)
      } else {
        setRenderMenu(
          <Desktop
            setTab={setTabIndex}
            setStyle={setStyleMenu}
            tabIndex={tabIndex}
          />,
        )
        setRender(<SlidePoster contHeight={height} />)
      }
    }
    if (tabIndex === '8') {
      if (screenSsm) {
        setRender(<SlideSoundtrackMobile />)
        setRenderMenu(<Mobile setTab={setTabIndex} />)
      } else {
        setRenderMenu(
          <Desktop
            setTab={setTabIndex}
            setStyle={setStyleMenu}
            tabIndex={tabIndex}
          />,
        )
        setRender(<SlideSoundtrack contHeight={height} />)
      }
    }
    if (tabIndex === '9') {
      if (screenSsm) {
        setRender(<SlideDiaryMobile />)
        setRenderMenu(<Mobile setTab={setTabIndex} />)
      } else {
        setRenderMenu(
          <Desktop
            setTab={setTabIndex}
            setStyle={setStyleMenu}
            tabIndex={tabIndex}
          />,
        )
        setRender(<SlideDiary contHeight={height} />)
      }
    }
    if (tabIndex === '10') {
      if (screenSsm) {
        setRender(<SlideNewsMobile />)
        setRenderMenu(<Mobile setTab={setTabIndex} />)
      } else {
        setRenderMenu(
          <Desktop
            setTab={setTabIndex}
            setStyle={setStyleMenu}
            tabIndex={tabIndex}
          />,
        )
        setRender(<SlideNews />)
      }
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
        style={tabIndex !== '10' ? { height: '100vh' } : { height: '100vh' }}
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
              {renderMenu}
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
