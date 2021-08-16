/* eslint-disable no-param-reassign */
import LeftCircleFilled from '@ant-design/icons/LeftCircleFilled'
import DeleteFilled from '@ant-design/icons/DeleteFilled'
import PlusCircleFilled from '@ant-design/icons/PlusCircleFilled'
import cssContent from '@nexys/components/Content/Content.module.scss'
import {
  Button,
  Col,
  Image,
  message,
  PageHeader,
  Row,
  Spin,
  Upload,
} from 'antd'
import React, { useEffect, useState } from 'react'
import RightCircleFilled from '@ant-design/icons/RightCircleFilled'
import firebase from 'layouts/routes/firebaseClient'
import renderIf from 'layouts/renderIf'

interface MultipleProps {
  id: string
}

function Multiple(props: MultipleProps) {
  const { id } = props
  const [isLoading, setIsLoading] = useState(true)
  const [data, setData] = useState([])
  const [dataIndex, setDataIndex] = useState(0)

  useEffect(() => {
    const getData = firebase.firestore().collection(id)
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
      setIsLoading(false)
    })
  }, [id])

  const propsImage = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info)
        info.file.status = 'done'
      }
      if (info.file.status === 'done') {
        // const storage = firebase.storage()
        // storage
        //   .ref('images')
        //   .child(info.file.name)
        //   .put(info.fileList[0].originFileObj)
        message.success(`${info.file.name} file uploaded successfully`)
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} file upload failed.`)
      }
    },
  }

  function RenderMiddle(imgUrl) {
    return (
      <div>
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
          }}
        >
          <Image src={imgUrl.imgUrl} height={360} />
        </div>
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Upload {...propsImage}>
            <Button
              type="primary"
              icon={<PlusCircleFilled />}
              style={{ marginTop: 30 }}
            >
              Add New Picture
            </Button>
          </Upload>
          <Button
            type="primary"
            icon={<DeleteFilled />}
            danger
            style={{ marginTop: 10 }}
            onClick={() => console.log(imgUrl.imgUrl)}
          >
            Delete This Picture
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <div id={cssContent.customPageHeader}>
        <PageHeader title="Pages" subTitle={id} />
      </div>
      <Spin spinning={isLoading}>
        {/* <Button onClick={() => console.log(id)}>DEV MAGIC BUTTON</Button> */}
        <Row justify="center" gutter={[0, 16]}>
          <Col
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
            xs={4}
            sm={4}
            lg={4}
            xl={4}
          >
            <Button icon={<LeftCircleFilled />} shape="circle" size="large" />
          </Col>
          <Col xs={16} sm={16} lg={16} xl={16}>
            {data.map((item, index) => (
              <div>
                {renderIf(index === dataIndex)(
                  <RenderMiddle imgUrl={item.data.imgUrl} />,
                )}
              </div>
            ))}
          </Col>
          <Col
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              display: 'flex',
            }}
            xs={4}
            sm={4}
            lg={4}
            xl={4}
          >
            <Button icon={<RightCircleFilled />} shape="circle" size="large" />
          </Col>
        </Row>
      </Spin>
    </div>
  )
}

export default Multiple
