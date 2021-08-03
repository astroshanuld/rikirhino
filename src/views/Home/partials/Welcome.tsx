import Text from '@nexys/components/Typography/Text'
import Title from '@nexys/components/Typography/Title'
import { Button, Col, Row } from 'antd'
import Link from 'next/link'
import React from 'react'

function Welcome() {
  return (
    <Row gutter={[10, 0]}>
      <Col xs={24} style={{ alignSelf: 'center' }}>
        <Row gutter={[0, 10]}>
          <Col xs={24}>
            <Title size={30} noMargin>
              Hello Team!
            </Title>
          </Col>
          <Col xs={24}>
            <Text size={24}>
              Mulai pelajari cara mudah mengembangkan Front-End menggunakan
              Framework Next.js
            </Text>
          </Col>
          <Col xs={24}>
            <Link href={'/#whatWillLearn'}>
              <a>
                <Button size={'large'} type={'primary'}>
                  <Text>PELAJARI</Text>
                </Button>
              </a>
            </Link>
          </Col>
        </Row>
      </Col>
    </Row>
  )
}

export default Welcome
