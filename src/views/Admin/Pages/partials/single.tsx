/* eslint-disable no-param-reassign */
import RedoOutlined from '@ant-design/icons/RedoOutlined'
import { Button, Image, message, PageHeader, Row, Spin, Upload } from 'antd'
import React, { useState } from 'react'
import cssContent from '@nexys/components/Content/Content.module.scss'

interface SingleProps {
  id: string
}

function Single(props: SingleProps) {
  const { id } = props
  const [isLoading, setIsLoading] = useState(false)

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

  return (
    <div>
      <div id={cssContent.customPageHeader}>
        <PageHeader title="Pages" subTitle={id} />
      </div>
      <Spin spinning={isLoading}>
        {/* <Button onClick={() => console.log(id)}>DEV MAGIC BUTTON</Button> */}
        <Row justify="center">
          <Image src="/images/example.png" height={360} />
        </Row>
        <Row justify="center">
          <Upload {...propsImage}>
            <Button icon={<RedoOutlined />} style={{ marginTop: 30 }}>
              Change Picture
            </Button>
          </Upload>
        </Row>
      </Spin>
    </div>
  )
}

export default Single
