import UploadOutlined from '@ant-design/icons/UploadOutlined'
import UserOutlined from '@ant-design/icons/UserOutlined'
import cssContent from '@nexys/components/Content/Content.module.scss'
import {
  Button,
  Col,
  Input,
  PageHeader,
  Row,
  Space,
  Upload,
  message,
} from 'antd'
import dynamic from 'next/dynamic'
import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css'

const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })

function Compose() {
  const [value, setValue] = useState('')
  const props = {
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

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <div id={cssContent.customPageHeader}>
        <PageHeader title="News" subTitle="Compose New News" />
      </div>

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
            <Upload {...props}>
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
            <ReactQuill value={value} onChange={setValue} />
            <br />
          </div>
        </Col>
      </Row>
    </Space>
  )
}

export default Compose
