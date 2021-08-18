import LockOutlined from '@ant-design/icons/LockFilled'
import UserOutlined from '@ant-design/icons/UserOutlined'
import Text from '@nexys/components/Typography/Text'
import Title from '@nexys/components/Typography/Title'
import cssFont from '@nexys/css/cssFont.scss'
import FInput from '@nexys/fields/FInput/FInput'
import { Button, Col, message, Row, Space, Spin } from 'antd'
import cx from 'classnames'
import { Form, Formik } from 'formik'
import firebase from 'layouts/routes/firebaseClient'
import { get, isEmpty } from 'lodash'
import router from 'next/router'
import React, { useEffect, useState } from 'react'
import loginSchema from 'validations/auth/loginSchema'
import cssLogin from 'views/Login/Login.module.scss'
// import Image from 'next/image'

// export interface LoginAttributes {
//   email: string
//   password: string
// }

function Login() {
  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    const profile = sessionStorage.getItem('user')
    if (!isEmpty(profile)) {
      router.push('/admin/pages/Home')
    } else {
      setIsLoading(false)
    }
  })

  return (
    <Spin spinning={isLoading}>
      <Row
        className={cx(cssLogin.container, cssFont.normal)}
        align="middle"
        justify="center"
        gutter={[0, 16]}
      >
        <Col xs={24} sm={12} md={12} lg={10}>
          <Formik
            initialValues={{
              email: '',
              password: '',
            }}
            validationSchema={loginSchema.validation}
            onSubmit={async (values, { setSubmitting }) => {
              const { email, password } = values

              try {
                firebase
                  .auth()
                  .signInWithEmailAndPassword(email, password)
                  .then((userCredential) => {
                    // console.log(userCredential.user.email)
                    sessionStorage.setItem('user', userCredential.user.email)
                    router.push('/admin/pages/Home')
                  })
                  .catch((error) => {
                    if (error.code === 'auth/user-not-found') {
                      message.error('The username or password is not correct!')
                    } else {
                      message.error(error.message)
                    }
                  })
              } catch (error) {
                const description = get(error, 'response.data.message', '')
                message.error(description)
              } finally {
                setSubmitting(false)
              }
            }}
          >
            {({ handleSubmit }) => {
              return (
                <Form onSubmit={handleSubmit}>
                  <Row gutter={[12, 12]} align="middle" justify="center">
                    <Col xs={16}>
                      <Row justify="center" gutter={[0, 14]}>
                        <Col style={{ marginBottom: '10px' }}>
                          <Space direction="vertical" align="center">
                            <Title>Riki Rhino</Title>
                            <Text size={14}>Log in to your account</Text>
                          </Space>
                        </Col>

                        <Col xs={24}>
                          <FInput
                            title="Email"
                            name="email"
                            type="email"
                            placeholder="input email"
                            size="large"
                            prefix={<UserOutlined color="primary" />}
                          />
                        </Col>

                        <Col xs={24}>
                          <FInput
                            title="Password"
                            name="password"
                            type="password"
                            placeholder="input password"
                            size="large"
                            prefix={<LockOutlined />}
                          />
                        </Col>

                        <Col xs={24}>
                          <Button
                            type="primary"
                            size="large"
                            block
                            htmlType="submit"
                          >
                            Log In
                          </Button>
                        </Col>
                        {/* <Col>
                        <Space
                          direction="vertical"
                          align="center"
                          style={{ width: '100%' }}
                        >
                          <Link href="/">
                            <a>Forgot password ?</a>
                          </Link>
                        </Space>
                      </Col> */}
                      </Row>
                    </Col>
                  </Row>
                </Form>
              )
            }}
          </Formik>
        </Col>
      </Row>
    </Spin>
  )
}

export default Login
