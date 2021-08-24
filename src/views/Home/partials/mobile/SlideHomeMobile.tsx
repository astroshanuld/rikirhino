import LeftCircleFilled from '@ant-design/icons/LeftCircleFilled'
import RightCircleFilled from '@ant-design/icons/RightCircleFilled'
import { Button, Col, Row, Spin } from 'antd'
import firebase from 'layouts/routes/firebaseClient'
import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import cssHome from 'views/Home/partials/Home.module.scss'

function SlideHomeMobile() {
  const [data, setData] = useState([{ id: '1', data: { url: 'xubu' } }])
  const [ytbIndex] = useState(0)
  const [isLoading, setIsLoading] = useState(true)
  const sliderRef = useRef<Slider>(null)

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
    setIsLoading(false)
  }, [ytbIndex])

  const settings = {
    ref: sliderRef,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  }

  const prevButton = () => {
    sliderRef.current.slickPrev()
  }

  const nextButton = () => {
    sliderRef.current.slickNext()
  }

  if (isLoading) {
    return <Spin size="large" />
  }

  return (
    <React.Fragment>
      <Row gutter={[0, 16]} style={{ marginTop: '10vh' }}>
        <Col
          flex={1}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Button
            type="primary"
            icon={<LeftCircleFilled />}
            onClick={() => prevButton()}
            size="large"
            style={{ marginRight: 20 }}
            className={cssHome.buttonSwitch}
          />
          <Button
            type="primary"
            icon={<RightCircleFilled />}
            onClick={() => nextButton()}
            size="large"
            className={cssHome.buttonSwitch}
          />
        </Col>
      </Row>
      <Row gutter={[0, 16]} style={{ marginTop: '5vh' }}>
        <Col style={{ height: '30vh' }}>
          <Slider {...settings}>
            {data.map((item) => {
              return (
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '30vh',
                    }}
                  >
                    {/* <Text>{item.data.url}</Text> */}
                    <iframe
                      title="Youtube Embed"
                      src={`https://www.youtube.com/embed/${item.data.url}`}
                      height="90%"
                      width="90%"
                    />
                  </div>
                </div>
              )
            })}
          </Slider>
        </Col>
      </Row>
    </React.Fragment>
  )
}

export default SlideHomeMobile
