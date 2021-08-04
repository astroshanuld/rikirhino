import { Col, Row } from 'antd'
import { useMediaQuery } from 'react-responsive'
import YouTube from 'react-youtube'
import cssHome from 'views/Home/partials/Home.module.scss'

function SlideHome() {
  const screenXxl = useMediaQuery({ query: '(min-width: 1600px)' })
  const screenXl = useMediaQuery({ query: '(min-width: 1200px)' })
  const screenLg = useMediaQuery({ query: '(min-width: 992px)' })
  const screenMd = useMediaQuery({ query: '(min-width: 768px)' })
  const screenSm = useMediaQuery({ query: '(min-width: 576px)' })

  const checkScreen = () => {
    if (screenXl) {
      return cssHome.youtubeContainerXl
    }
    if (screenLg) {
      return cssHome.youtubeContainerLg
    }
    if (screenMd) {
      return cssHome.youtubeContainerMd
    }
    if (screenSm) {
      return cssHome.youtubeContainerSm
    }
  }

  return (
    <Row gutter={[0, 16]}>
      <Col
        xl={24}
        lg={24}
        md={24}
        sm={24}
        flex={1}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div>
          <YouTube
            videoId="BG5NPjW7r4U"
            // opts={opts}
            className={checkScreen()}
          />
        </div>
      </Col>
    </Row>
  )
}

export default SlideHome
