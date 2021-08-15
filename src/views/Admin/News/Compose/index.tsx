/* eslint-disable react/jsx-curly-newline */
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
  Spin,
  Upload,
} from 'antd'
import { Formik } from 'formik'
import firebase from 'layouts/routes/firebaseClient'
import _ from 'lodash'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import 'react-quill/dist/quill.snow.css'
import * as Yup from 'yup'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

interface ComposeProps {
  initialValues: any
  onSubmit: (values: object, actions, image: object, imageName: string) => void
  isEdit?: boolean
  isLoading: boolean
}

function Compose(props: ComposeProps) {
  const { initialValues, onSubmit, isEdit, isLoading } = props
  const [image, setImage] = useState({})
  const [imageName, setImageName] = useState('')

  const propsImage = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info)
      }
      if (info.file.status === 'done') {
        // const storage = firebase.storage()
        // storage
        //   .ref('images')
        //   .child(info.file.name)
        //   .put(info.fileList[0].originFileObj)
        const image = info.fileList[0].originFileObj
        const imageName = info.file.name
        setImage(image)
        setImageName(imageName)
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  const FormValidation = Yup.object().shape({
    title: Yup.string()
      .min(2, 'Too Short!')
      .required('Required'),
    description: Yup.string()
      .min(2, 'Too Short!')
      .required('Required'),
  })

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <div id={cssContent.customPageHeader}>
        <PageHeader
          title="News"
          subTitle={isEdit ? 'Edit News' : 'Compose New News'}
        />
      </div>
      <Spin spinning={isLoading}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={FormValidation}
          onSubmit={(values, actions) =>
            onSubmit(values, actions, image, imageName)
          }
        >
          {(formikProps) => (
            <div>
              <Row gutter={16}>
                <Col xs={24} sm={24} md={24} lg={12}>
                  <div
                    className={cssContent.contentPage}
                    style={{ marginTop: 8, marginBottom: 8 }}
                  >
                    <h3>Title</h3>
                    {/* <Button onClick={() => console.log(imageName)}>
                      DEV MAGIC BUTTON
                    </Button> */}
                    <Input
                      size="large"
                      placeholder="Input title here ..."
                      value={formikProps.values.title}
                      onChange={formikProps.handleChange('title')}
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
                      value={formikProps.values.description}
                      onChange={formikProps.handleChange('description')}
                    />
                    <br />
                  </div>
                  <div>
                    <Button
                      type="primary"
                      onClick={() => formikProps.handleSubmit()}
                    >
                      Submit
                    </Button>
                  </div>
                </Col>
              </Row>
            </div>
          )}
        </Formik>
      </Spin>
    </Space>
  )
}

function FormAdd() {
  const getData = firebase.firestore().collection('Posts')
  const storage = firebase.storage()
  const router = useRouter()

  const goSubmit = (values, actions, image, imageName) => {
    actions.resetForm()
    if (!_.isEmpty(image)) {
      storage
        .ref('images')
        .child(imageName)
        .put(image)
        .then((snapshot) => {
          snapshot.ref.getDownloadURL().then((url) => {
            // console.log(url)
            getData.add({
              title: values.title,
              description: values.description,
              thumbnail: url,
              thumbPath: `/images/${imageName}`,
              status: values.status,
              createdDate: firebase.firestore.Timestamp.now(),
            })
          })
        })
    } else {
      getData.add({
        title: values.title,
        description: values.description,
        thumbnail: values.thumbnail,
        thumbPath: '',
        status: values.status,
        createdDate: firebase.firestore.Timestamp.now(),
      })
    }
    router.push('/admin/news')
  }

  return (
    <Compose
      initialValues={{
        title: '',
        description: '',
        thumbnail: '/images/default-image.png',
        status: 'Draft',
      }}
      onSubmit={(values, actions, image, imageName) =>
        goSubmit(values, actions, image, imageName)
      }
      isLoading={false}
    />
  )
}

function FormEdit(props: any) {
  const { pageProps } = props
  const [editTitle, setEditTitle] = useState('')
  const [editDesc, setEditDesc] = useState('')
  const [editStat, setEditStat] = useState('Draft')
  const [isLoading, setIsLoading] = useState(true)

  const getData = firebase.firestore().collection('Posts')
  const router = useRouter()
  const id = pageProps?.query?.id
  const takeData = getData.doc(id)

  useEffect(() => {
    takeData.onSnapshot(async (querySnapShot) => {
      setEditTitle(querySnapShot.get('title'))
      setEditDesc(querySnapShot.get('description'))
      setEditStat(querySnapShot.get('status'))
      setIsLoading(false)
    })
  })

  const goSubmit = (values, actions) => {
    actions.resetForm()
    const data = {
      title: values.title,
      description: values.description,
      status: values.status,
      thumbnail: values.thumbnail,
      createdDate: firebase.firestore.Timestamp.now(),
    }
    takeData.set(data)
    router.push('/admin/news')
    message.success('Success edit News')
  }

  return (
    <Compose
      initialValues={{
        title: editTitle,
        description: editDesc,
        thumbnail: '/images/default-image.png',
        status: editStat,
      }}
      isEdit
      onSubmit={(values, actions) => goSubmit(values, actions)}
      isLoading={isLoading}
    />
  )
}

export { FormAdd, FormEdit }
