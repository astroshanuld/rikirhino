import { Button, Col, notification, Row, Space } from 'antd'
import React from 'react'
import cx from 'classnames'
import cssLogin from 'views/Login/Login.module.scss'
import Text from '@nexys/components/Typography/Text'
import { Formik, Form } from 'formik'
import FInput from '@nexys/fields/FInput/FInput'
import UserOutlined from '@ant-design/icons/UserOutlined'
import LockOutlined from '@ant-design/icons/LockFilled'
import Link from 'next/link'
import Router from 'next/router'
import cssFont from '@nexys/css/cssFont.scss'
import { useMutation } from 'react-query'
import ApiCall from 'services/ApiCall'
import useProfile from 'data/useProfile'
import { get, isEmpty } from 'lodash'
import loginSchema from 'validations/auth/loginSchema'
import Title from '@nexys/components/Typography/Title'
// import Image from 'next/image'

export interface LoginAttributes {
  email: string
  password: string
}

function Login() {
  const postLogin = useMutation((data: LoginAttributes) => ApiCall.login(data))

  // check kalo udah login
  const profile = useProfile()
  if (profile.isSuccess && !isEmpty(profile.data)) {
    Router.push('/admin/dashboard')
  }

  return (
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
              const response = await postLogin.mutateAsync({
                email,
                password,
              })
              const message = get(response, 'data.message', '')
              notification.success({
                message,
              })

              const accessToken = get(response, 'data.accessToken', {})
              localStorage.setItem('token_trasmi', accessToken)
              Router.push('/admin/dashboard')
            } catch (error) {
              const description = get(error, 'response.data.message', '')
              notification.error({
                message: 'Error!',
                description,
              })
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
                          {/* <Image
                            layout="fixed"
                            width={250}
                            height={40}
                            src="/static/images/logo-karcisbola-full.png"
                            alt="portal-sharaikios"
                          /> */}
                          <Title>Trasmi Insurance</Title>
                          <Text size={14}>
                            Log in to your Trasmi Insurance Account
                          </Text>
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
                      <Col>
                        <Space
                          direction="vertical"
                          align="center"
                          style={{ width: '100%' }}
                        >
                          <Link href="/">
                            <a>Forgot password ?</a>
                          </Link>
                        </Space>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Form>
            )
          }}
        </Formik>
      </Col>
    </Row>
  )
}

export default Login
