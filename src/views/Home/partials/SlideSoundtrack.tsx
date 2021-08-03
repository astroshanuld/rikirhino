import { Col, Image, Row } from 'antd'
import cssHome from 'views/Home/partials/Home.module.scss'

interface SoundtrackProps {
  contHeight: number
}

function SlideSoundtrack(props: SoundtrackProps) {
  const { contHeight } = props
  const height = contHeight - 13
  return (
    <Row gutter={[0, 16]} style={{ height: contHeight }}>
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
        <div className={cssHome.youtubeContainer}>
          <Image
            src="/images/dummy/dummy-soundtrack.png"
            height={height}
            preview={false}
          />
        </div>
      </Col>
    </Row>
  )
}

export default SlideSoundtrack
