import Icon from '@ant-design/icons/'
import { Button, Col, Image, Row } from 'antd'
import firebase from 'layouts/routes/firebaseClient'
import React, { useEffect, useState, useRef } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import cssHome from 'views/Home/partials/Home.module.scss'

interface PosterProps {
  contHeight: string
}

function SlidePoster(props: PosterProps) {
  const { contHeight } = props
  const [imgIndex] = useState(0)
  const [data, setData] = useState([])
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
  }, [imgIndex])

  const prevButton = () => {
    sliderRef.current.slickPrev()
  }

  const nextButton = () => {
    sliderRef.current.slickNext()
  }

  const settings = {
    ref: sliderRef,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
      <Col xl={20} lg={20} md={20} sm={20} style={{ height: '80vh' }}>
        <div style={{ height: '20%' }}>
          <React.Fragment />
        </div>
        <div
          style={{
            height: '60%',
          }}
        >
          <Slider {...settings}>
            {data.map((item) => (
              <div>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Image src={item.data.imgUrl} width="20vw" />
                  <a
                    target="_blank"
                    href={item.data.imgUrl}
                    className={cssHome.buttonDownload}
                    download
                    rel="noreferrer"
                  >
                    Download
                  </a>
                </div>
              </div>
            ))}
          </Slider>
        </div>
        <div style={{ height: '20%' }}>
          <React.Fragment />
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
          onClick={() => nextButton()}
          style={{ display: 'contents' }}
        />
      </Col>
    </Row>
  )
}

export default SlidePoster
