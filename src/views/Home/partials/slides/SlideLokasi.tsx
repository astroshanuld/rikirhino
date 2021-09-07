import Icon from '@ant-design/icons/'
import { Button, Col, Image, Row } from 'antd'
import renderIf from 'layouts/renderIf'
import firebase from 'layouts/routes/firebaseClient'
import { useEffect, useState } from 'react'
import cssHome from 'views/Home/partials/Home.module.scss'

interface LokasiProps {
  contHeight: string
}

function SlideLokasi(props: LokasiProps) {
  const { contHeight } = props
  const [imgIndex, setImgIndex] = useState(0)
  const [data, setData] = useState([])

  useEffect(() => {
    const getData = firebase
      .firestore()
      .collection('Lokasi')
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
    if (imgIndex > 0) {
      setImgIndex(imgIndex - 1)
    } else if (imgIndex === 0) {
      setImgIndex(data.length - 1)
    }
  }

  const nextButton = () => {
    if (imgIndex < data.length - 1) {
      setImgIndex(imgIndex + 1)
    } else if (imgIndex === data.length - 1) {
      setImgIndex(0)
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
        {data.map((item, index) => (
          <div className={cssHome.youtubeContainer}>
            {renderIf(index === imgIndex)(
              <Image
                src={item.data.imgUrl}
                height={contHeight}
                preview={false}
              />,
            )}
          </div>
        ))}
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

export default SlideLokasi
