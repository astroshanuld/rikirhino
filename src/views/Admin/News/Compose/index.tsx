/* eslint-disable react/prop-types */
import UploadOutlined from '@ant-design/icons/UploadOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import cssContent from '@nexys/components/Content/Content.module.scss'
import {
  Button,
  Col,
  Input,
  message,
  PageHeader,
  Row,
  Space,
  Upload,
} from 'antd'
import { Formik } from 'formik'
import firebase from 'layouts/routes/firebaseClient'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React from 'react'
import 'react-quill/dist/quill.snow.css'
import * as Yup from 'yup'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

function Compose() {
  const getData = firebase.firestore().collection('Posts')
  const router = useRouter()

  const propsImage = {
    name: 'file',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList)
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const FormValidation = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Too Short!')
      .max(50, 'Too Long!')
      .required('Required'),
    description: Yup.string()
      .min(2, 'Too Short!')
      .required('Required'),
  })

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <div id={cssContent.customPageHeader}>
        <PageHeader title="News" subTitle="Compose New News" />
      </div>
      <Formik
        initialValues={{
          title: '',
          description: '',
          thumbnail: '/images/default-image.png',
          status: 'Draft',
        }}
        validationSchema={FormValidation}
        onSubmit={(values, actions) => {
          actions.resetForm()
          getData.add({
            title: values.title,
            description: values.description,
            thumbnail: values.thumbnail,
            status: values.status,
          })
          router.push('/admin/news')
        }}
      >
        {(props) => (
          <div>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={24} lg={12}>
                <div
                  className={cssContent.contentPage}
                  style={{ marginTop: 8, marginBottom: 8 }}
                >
                  <h3>Title</h3>
                  <Input
                    size="large"
                    placeholder="Input title here ..."
                    value={props.values.title}
                    onChange={props.handleChange('title')}
                    prefix={<UserOutlined />}
                  />
                  <br />
                </div>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <div
                  className={cssContent.contentPage}
                  style={{ marginTop: 8, marginBottom: 8 }}
                >
                  <h3>Thumbnail</h3>
                  <Upload {...propsImage}>
                    <Button icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                  <br />
                </div>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col xs={24} sm={24} md={24} lg={24}>
                <div
                  className={cssContent.contentPage}
                  style={{ marginTop: 8, marginBottom: 8 }}
                >
                  <h3>Compose post ...</h3>
                  <ReactQuill
                    value={props.values.description}
                    onChange={props.handleChange('description')}
                  />
                  <br />
                </div>
                <div>
                  <Button type="primary" onClick={() => props.handleSubmit()}>
                    Submit
                  </Button>
                </div>
              </Col>
            </Row>
          </div>
        )}
      </Formik>
    </Space>
  )
}

export default Compose
