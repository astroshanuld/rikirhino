import { Col, Image, Row } from 'antd'
import cssHome from 'views/Home/partials/Home.module.scss'

interface KarakterProps {
  contHeight: number
}

function SlideKarakter(props: KarakterProps) {
  const { contHeight } = props
  const height = contHeight - 13
  return (
    <Row gutter={[0, 16]} style={{ height: contHeight }}>
      <Col
        xl={20}
        lg={20}
        md={20}
        sm={16}
        flex={1}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div className={cssHome.youtubeContainer}>
          <Image
            src="/images/dummy/dummy-karakter.png"
            height={height}
            preview={false}
          />
        </div>
      </Col>
    </Row>
  )
}

export default SlideKarakter
