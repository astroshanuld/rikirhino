import { Col, Row } from 'antd'
import YouTube from 'react-youtube'
import cssHome from 'views/Home/partials/Home.module.scss'

function SlideHome() {
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
            className={cssHome.youtubeContainer2}
          />
        </div>
      </Col>
    </Row>
  )
}

export default SlideHome
