import { Col, Row } from 'antd'
import YouTube from 'react-youtube'
import cssHome from 'views/Home/partials/Home.module.scss'

interface HomeProps {
  height: number
}

function SlideHome(props: HomeProps) {
  const { height } = props
  const opts = {
    height: '255',
  }

  return (
    <Row gutter={[0, 16]} style={{ height }}>
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
            containerClassName={cssHome.youtubeContainer}
          />
        </div>
      </Col>
    </Row>
  )
}

export default SlideHome
