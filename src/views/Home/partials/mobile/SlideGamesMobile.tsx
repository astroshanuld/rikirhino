import { Col, Image, Row } from 'antd'
import renderIf from 'layouts/renderIf'
import firebase from 'layouts/routes/firebaseClient'
import { useEffect, useState } from 'react'

function SlideGamesMobile() {
  const [imgUrl, setImgUrl] = useState('')

  useEffect(() => {
    const getData = firebase
      .firestore()
      .collection('Pages')
      .doc('Games')
    getData.onSnapshot(async (querySnapShot) => {
      setImgUrl(querySnapShot.get('imgUrl'))
    })
  })

  return (
    <Row gutter={[0, 16]}>
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
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: '20vh',
          }}
        >
          {renderIf(imgUrl !== '')(
            <Image src={imgUrl} height="100%" width="90%" preview={false} />,
          )}
        </div>
      </Col>
    </Row>
  )
}

export default SlideGamesMobile
