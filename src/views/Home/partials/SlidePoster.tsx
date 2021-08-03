import Icon from '@ant-design/icons/'
import { Button, Col, Image, Row } from 'antd'
import cssHome from 'views/Home/partials/Home.module.scss'

interface PosterProps {
  contHeight: string
}

function SlidePoster(props: PosterProps) {
  const { contHeight } = props
  return (
    <Row gutter={[0, 16]} style={{ height: contHeight }}>
      <Col
        xl={2}
        lg={2}
        md={2}
        sm={4}
        className={cssHome.leftButton}
        style={{ display: 'flex' }}
      >
        <Button
          type="link"
          icon={
            <Icon
              component={() => (
                <img
                  src="./../../../../images/left-button.png"
                  width={50}
                  alt="."
                />
              )}
            />
          }
        />
      </Col>
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
            src="/images/dummy/dummy-poster.png"
            height={contHeight}
            preview={false}
          />
        </div>
      </Col>
      <Col
        xl={2}
        lg={2}
        md={2}
        sm={4}
        className={cssHome.rightButton}
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <Button
          type="link"
          icon={
            <Icon
              component={() => (
                <img
                  src="./../../../../images/right-button.png"
                  width={50}
                  alt="."
                />
              )}
            />
          }
          style={{ display: 'contents' }}
        />
      </Col>
    </Row>
  )
}

export default SlidePoster
