import Icon from '@ant-design/icons/'
import { Button, Col, Row } from 'antd'
import renderIf from 'layouts/renderIf'
import firebase from 'layouts/routes/firebaseClient'
import React, { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'
import YouTube from 'react-youtube'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import cssHome from 'views/Home/partials/Home.module.scss'

function SlideHome() {
  const [ytbIndex, setYtbIndex] = useState(0)
  const [data, setData] = useState([])

  const screenXl = useMediaQuery({ query: '(min-width: 1200px)' })
  const screenLg = useMediaQuery({ query: '(min-width: 992px)' })
  const screenMd = useMediaQuery({ query: '(min-width: 768px)' })
  const screenSm = useMediaQuery({ query: '(min-width: 576px)' })
  const screenSsm = useMediaQuery({ query: '(max-width: 576px)' })

  useEffect(() => {
    const getData = firebase
      .firestore()
      .collection('Home')
      .orderBy('createdDate')
    getData.onSnapshot(async (querySnapshot) => {
      const item = []
      querySnapshot.forEach((doc) => {
        const datas = item
        datas.push({
          id: doc.id,
          data: doc.data(),
        })
      })
      setData(item)
    })
  }, [ytbIndex])

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
    if (screenSsm) {
      return cssHome.youtubeContainerSsm
    }
  }

  const prevButton = () => {
    if (ytbIndex > 0) {
      setYtbIndex(ytbIndex - 1)
    } else if (ytbIndex === 0) {
      setYtbIndex(data.length - 1)
    }
  }

  const nextButton = () => {
    if (ytbIndex < data.length - 1) {
      setYtbIndex(ytbIndex + 1)
    } else if (ytbIndex === data.length - 1) {
      setYtbIndex(0)
    }
  }

  return (
    <div>
      <Row gutter={[0, 16]}>
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
          <div>
            {data.map((item, index) => (
              <div>
                {renderIf(index === ytbIndex)(
                  <YouTube videoId={item.data.url} className={checkScreen()} />,
                )}
              </div>
            ))}
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
            onClick={() => nextButton()}
          />
        </Col>
      </Row>
    </div>
  )
}

export default SlideHome
