import { Col, Image, Row } from 'antd'
import cssHome from 'views/Home/partials/Home.module.scss'

interface GalleryProps {
  contHeight: number
}

function SlideGallery(props: GalleryProps) {
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
            src="/images/dummy/dummy-gallery.png"
            height={height}
            preview={false}
          />
        </div>
      </Col>
    </Row>
  )
}

export default SlideGallery
