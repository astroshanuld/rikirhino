/* eslint-disable react/jsx-curly-newline */
/* eslint-disable react/no-array-index-key */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
import ClockCircleFilled from '@ant-design/icons/ClockCircleFilled'
import { Card, Col, Row } from 'antd'
import firebase from 'layouts/routes/firebaseClient'
import router from 'next/router'
import { useEffect, useState } from 'react'

function SlideNewsMobile() {
  const [data, setData] = useState([])

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
          justifyContent: 'center',
        }}
      >
        <div style={{ overflowY: 'scroll', height: '70%' }}>
          {data.map((item, index) => (
            <Card
              hoverable
              style={{ width: '80vw', marginBottom: 10 }}
              onClick={() =>
                router.push(`/news/${encodeURIComponent(item.id)}`)
              }
              key={index}
            >
              <div style={{ display: 'flex', flexDirection: 'row' }}>
                <div
                  style={{
                    display: 'flex',
                    width: '30%',
                    height: '10vh',
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
                  <h4>{item.data.title}</h4>
                  <span style={{ color: '#a6a6a6', fontSize: 10 }}>
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
                  <div style={{ fontSize: 12 }}>
                    {`${item.data.description
                      .replace(/(<([^>]+)>)/gi, '')
                      .substring(0, 50)}...`}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Col>
    </Row>
  )
}

export default SlideNewsMobile
