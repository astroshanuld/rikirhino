import LeftCircleFilled from '@ant-design/icons/LeftCircleFilled'
import RightCircleFilled from '@ant-design/icons/RightCircleFilled'
import { Button, Col, Image, Row, Spin } from 'antd'
import firebase from 'layouts/routes/firebaseClient'
import React, { useEffect, useRef, useState } from 'react'
import Slider from 'react-slick'
import cssMobile from 'views/Home/partials/slides/mobile/Mobile.module.scss'

function SlidePosterMobile() {
  const [imgIndex] = useState(0)
  const [data, setData] = useState([{ id: '1', data: { imgUrl: '' } }])
  const [isLoading, setIsLoading] = useState(true)
  const sliderRef = useRef<Slider>(null)

  useEffect(() => {
    const getData = firebase
      .firestore()
      .collection('Poster')
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
  }, [imgIndex])

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
            style={{
              marginRight: 20,
              backgroundColor: '#fbb040',
              color: '#000',
            }}
          />
          <Button
            type="primary"
            icon={<RightCircleFilled />}
            onClick={() => nextButton()}
            size="large"
            style={{ backgroundColor: '#fbb040', color: '#000' }}
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
                      height: '50vh',
                      flexDirection: 'column',
                    }}
                  >
                    <Image src={item.data.imgUrl} width="55%" height="80%" />
                    <a
                      target="_blank"
                      href={item.data.imgUrl}
                      className={cssMobile.buttonDownload}
                      download
                      rel="noreferrer"
                    >
                      Download
                    </a>
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

export default SlidePosterMobile
