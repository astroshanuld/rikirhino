import { Col, Image, Row } from 'antd'
import cssHome from 'views/Home/partials/Home.module.scss'
import renderIf from 'layouts/renderIf'
import firebase from 'layouts/routes/firebaseClient'
import { useEffect, useState } from 'react'

interface DiaryProps {
  contHeight: string
}

function SlideDiary(props: DiaryProps) {
  const { contHeight } = props
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    const getData = firebase
      .firestore()
      .collection('Pages')
      .doc('Diary')
    getData.onSnapshot(async (querySnapShot) => {
      setImgUrl(querySnapShot.get('imgUrl'))
    })
  })

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
          {renderIf(imgUrl !== '')(
            <Image src={imgUrl} height={contHeight} preview={false} />,
          )}
        </div>
      </Col>
    </Row>
  )
}

export default SlideDiary
