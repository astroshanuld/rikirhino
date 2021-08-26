/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import ClockCircleFilled from '@ant-design/icons/ClockCircleFilled'
import { Card, Col, Row, Typography } from 'antd'
import Meta from 'antd/lib/card/Meta'
import firebase from 'layouts/routes/firebaseClient'
import router from 'next/router'
import { useEffect, useState } from 'react'
import { useMediaQuery } from 'react-responsive'

const { Title } = Typography

function SlideNews() {
  const [width, setWidth] = useState('')
  const [data, setData] = useState([])

  const screenXxl = useMediaQuery({ query: '(min-width: 1600px)' })
  const screenXl = useMediaQuery({ query: '(min-width: 1200px)' })
  const screenLg = useMediaQuery({ query: '(min-width: 992px)' })
  const screenMd = useMediaQuery({ query: '(min-width: 768px)' })
  const screenSm = useMediaQuery({ query: '(min-width: 576px)' })

  useEffect(() => {
    const getData = firebase
      .firestore()
      .collection('Posts')
      .orderBy('createdDate', 'desc')
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

    if (screenXxl) {
      setWidth('80vw')
    } else if (screenXl) {
      setWidth('80vw')
    } else if (screenLg) {
      setWidth('80vw')
    } else if (screenMd) {
      setWidth('80vw')
    } else if (screenSm) {
      setWidth('80vw')
    }
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
          display: 'grid',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {data.map((item, index) => (
          <Card
            hoverable
            style={{ width, marginBottom: 10 }}
            onClick={() => router.push(`/news/${encodeURIComponent(item.id)}`)}
            key={index}
          >
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div
                style={{
                  display: 'flex',
                  width: '30%',
                  height: '30vh',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginRight: '20px',
                }}
              >
                <img
                  alt="example"
                  src={item.data.thumbnail}
                  height="100%"
                  width="100%"
                />
              </div>
              <div
                style={{
                  width: '70%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                }}
              >
                <Meta
                  title={
                    <div>
                      <Title level={4}>{item.data.title}</Title>
                    </div>
                  }
                  description={
                    <span>
                      <ClockCircleFilled />
                      &nbsp;
                      {new Date(
                        item.data.createdDate.seconds * 1000,
                      ).toLocaleDateString('en-IN', {
                        year: 'numeric',
                        month: 'long',
                        day: '2-digit',
                      })}
                    </span>
                  }
                  style={{ marginBottom: 2 }}
                />
                <div>
                  {`${item.data.description
                    .replace(/(<([^>]+)>)/gi, '')
                    .substring(0, 290)}...`}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </Col>
    </Row>
  )
}

export default SlideNews
