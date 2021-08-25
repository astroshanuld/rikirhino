import ClockCircleFilled from '@ant-design/icons/ClockCircleFilled'
import HomeFilled from '@ant-design/icons/HomeFilled'
import { Button, Card, Col, Image, Layout, Row } from 'antd'
import 'antd/dist/antd.css'
import firebase from 'layouts/routes/firebaseClient'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import cssHome from 'views/Home/partials/Home.module.scss'

const { Content, Footer } = Layout

interface MobileProp {
  idNews: string
}

function Mobile(props: MobileProp) {
  const { idNews } = props
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [thumb, setThumb] = useState('')
  const [date, setDate] = useState({ seconds: 0 })
  const [isLoadingCard, setIsLoadingCard] = useState(true)

  useEffect(() => {
    const getData = firebase
      .firestore()
      .collection('Posts')
      .doc(idNews)
    getData.onSnapshot(async (querySnapShot) => {
      setTitle(querySnapShot.get('title'))
      setDesc(querySnapShot.get('description'))
      setThumb(querySnapShot.get('thumbnail'))
      setDate(querySnapShot.get('createdDate'))
      setIsLoadingCard(false)
    })
  })

  return (
    <Layout className="layout" style={{ height: '100vh' }}>
      <Content className={cssHome.baseContent}>
        <Row gutter={[0, 16]}>
          <Col xs={2} style={{ zIndex: 1 }}>
            <Image preview={false} width={120} src="/images/logo-1.png" />
          </Col>
          <Col xs={21}>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-end',
              }}
            >
              <Button
                shape="circle"
                size="large"
                icon={<HomeFilled />}
                style={{ backgroundColor: '#fbb040' }}
                onClick={() => router.push('/')}
              />
            </div>
          </Col>
        </Row>
        <Row
          gutter={[0, 16]}
          style={{
            maxHeight: '70%',
            display: 'grid',
            justifyContent: 'center',
          }}
        >
          <Col
            style={{
              overflowY: 'scroll',
              height: '73vh',
            }}
          >
            <Card loading={isLoadingCard} style={{ width: '80vw' }}>
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  marginBottom: 73,
                }}
              >
                <h3 style={{ textAlign: 'center' }}>{title}</h3>
                <span
                  style={{
                    textAlign: 'center',
                    fontSize: 12,
                    color: '#a6a6a6',
                  }}
                >
                  <ClockCircleFilled />
                  &nbsp;
                  {new Date(date.seconds * 1000).toLocaleDateString('en-IN', {
                    year: 'numeric',
                    month: 'long',
                    day: '2-digit',
                  })}
                </span>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  marginBottom: 73,
                }}
              >
                <Image src={thumb} width="90%" />
              </div>
              <div>
                <div dangerouslySetInnerHTML={{ __html: desc }} />
              </div>
            </Card>
          </Col>
        </Row>
      </Content>
      <Footer style={{ padding: '5px 5px', backgroundColor: '#000000' }}>
        <Row justify="center">
          <Col>
            <Image
              src="/images/sponsors/batavia.png"
              width={90}
              preview={false}
            />
          </Col>
          <Col>
            <Image
              src="/images/sponsors/sponsor1.png"
              width={90}
              preview={false}
            />
          </Col>
          <Col>
            <Image
              src="/images/sponsors/sponsor2.png"
              width={90}
              preview={false}
            />
          </Col>
          <Col>
            <Image
              src="/images/sponsors/sponsor2.png"
              width={90}
              preview={false}
            />
          </Col>
        </Row>
      </Footer>
    </Layout>
  )
}

export default Mobile
