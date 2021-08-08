/* eslint-disable react/jsx-one-expression-per-line */
import ClockCircleFilled from '@ant-design/icons/ClockCircleFilled'
import { Card, Col, Row } from 'antd'
import Meta from 'antd/lib/card/Meta'
import { useEffect, useState } from 'react'
import firebase from 'layouts/routes/firebaseClient'
import { useMediaQuery } from 'react-responsive'

interface StoryProps {
  contHeight: string
}

function SlideNews(props: StoryProps) {
  const { contHeight } = props
  const [width, setWidth] = useState('')
  const [data, setData] = useState([])

  const screenXxl = useMediaQuery({ query: '(min-width: 1600px)' })
  const screenXl = useMediaQuery({ query: '(min-width: 1200px)' })
  const screenLg = useMediaQuery({ query: '(min-width: 992px)' })
  const screenMd = useMediaQuery({ query: '(min-width: 768px)' })
  const screenSm = useMediaQuery({ query: '(min-width: 576px)' })

  useEffect(() => {
    const getData = firebase.firestore().collection('Posts')
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
          <Card hoverable style={{ width, marginBottom: 10 }}>
            <div style={{ display: 'flex', flexDirection: 'row' }}>
              <div style={{ width: '60%' }}>
                <Meta
                  title={item.data.title}
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
                {item.data.description}
              </div>
              <div
                style={{
                  display: 'flex',
                  width: '40%',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <img
                  alt="example"
                  src={item.data.thumbnail}
                  height="80%"
                  width="80%"
                />
              </div>
            </div>
          </Card>
        ))}
      </Col>
    </Row>
  )
}

export default SlideNews
