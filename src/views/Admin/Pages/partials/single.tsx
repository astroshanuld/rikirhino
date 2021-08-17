/* eslint-disable no-param-reassign */
import RedoOutlined from '@ant-design/icons/RedoOutlined'
import cssContent from '@nexys/components/Content/Content.module.scss'
import { Button, Image, message, PageHeader, Row, Spin, Upload } from 'antd'
import firebase from 'layouts/routes/firebaseClient'
import React, { useEffect, useState } from 'react'

interface SingleProps {
  id: string
}

function Single(props: SingleProps) {
  const { id } = props
  const storage = firebase.storage()
  const [isLoading, setIsLoading] = useState(true)
  const [imgUrl, setImgUrl] = useState('')
  const [urlPath, setUrlPath] = useState('')

  useEffect(() => {
    const getData = firebase
      .firestore()
      .collection('Pages')
      .doc(id)
    getData.onSnapshot(async (querySnapShot) => {
      setImgUrl(querySnapShot.get('imgUrl'))
      setUrlPath(querySnapShot.get('urlPath'))
      setIsLoading(false)
    })
  }, [id])

  const propsImage = {
    name: 'file',
    showUploadList: false,
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload(info) {
      if (info.type !== 'image/png') {
        message.error('Only PNG format allowed!')
      }
      return info.type === 'image/png' ? true : Upload.LIST_IGNORE
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info)
        setIsLoading(true)
        storage
          .ref()
          .child(urlPath)
          .delete()
          .then(() => {
            storage
              .ref('images')
              .child(info.file.uid)
              .put(info.fileList[0].originFileObj)
              .then((snapshot) => {
                snapshot.ref.getDownloadURL().then((url) => {
                  const push = {
                    imgUrl: url,
                    urlPath: `/images/${info.file.uid}`,
                    createdDate: firebase.firestore.Timestamp.now(),
                  }
                  firebase
                    .firestore()
                    .collection('Pages')
                    .doc(id)
                    .set(push)
                  message.success('Image has been changed successfully!')
                  setIsLoading(false)
                })
              })
          })
        info.file.status = 'done'
      }
      if (info.file.status === 'done') {
        // storage
        //   .ref('images')
        //   .child(info.file.name)
        //   .put(info.fileList[0].originFileObj)
        // message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  return (
    <div>
      <div id={cssContent.customPageHeader}>
        <PageHeader title="Pages" subTitle={id} />
      </div>
      <Spin spinning={isLoading}>
        {/* <Button onClick={() => console.log(id)}>DEV MAGIC BUTTON</Button> */}
        <Row justify="center">
          <Image src={imgUrl} height={360} />
        </Row>
        <Row justify="center">
          <Upload {...propsImage}>
            <Button
              type="primary"
              icon={<RedoOutlined />}
              style={{ marginTop: 30 }}
            >
              Change Picture
            </Button>
          </Upload>
        </Row>
      </Spin>
    </div>
  )
}

export default Single
