import Icon from '@ant-design/icons/'
import { Button, Col, Image, Row } from 'antd'
import { useState } from 'react'
import cssHome from 'views/Home/partials/Home.module.scss'

interface KarakterProps {
  contHeight: string
}

function SlideKarakter(props: KarakterProps) {
  const { contHeight } = props
  const [imgIndex, setImgIndex] = useState(1)

  const renderImg = () => {
    if (imgIndex === 1) {
      return (
        <Image
          src="/images/dummy/dummy-karakter.png"
          height={contHeight}
          preview={false}
        />
      )
    }
    if (imgIndex === 2) {
      return (
        <Image
          src="/images/dummy/dummy-karakter2.png"
          height={contHeight}
          preview={false}
        />
      )
    }
    if (imgIndex === 3) {
      return (
        <Image
          src="/images/dummy/dummy-karakter3.png"
          height={contHeight}
          preview={false}
        />
      )
    }
  }

  const prevButton = () => {
    if (imgIndex >= 2) {
      setImgIndex(imgIndex - 1)
    } else if (imgIndex === 1) {
      setImgIndex(3)
    }
  }

  const nextButton = () => {
    if (imgIndex <= 2) {
      setImgIndex(imgIndex + 1)
    } else if (imgIndex === 3) {
      setImgIndex(1)
    }
  }

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
          onClick={() => prevButton()}
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
        <div className={cssHome.youtubeContainer}>{renderImg()}</div>
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
          onClick={() => nextButton()}
        />
      </Col>
    </Row>
  )
}

export default SlideKarakter
