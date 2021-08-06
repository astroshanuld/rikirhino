import cssContent from '@nexys/components/Content/Content.module.scss'
import { Col, PageHeader, Row, Space, Table, Tag } from 'antd'
import React from 'react'

function News() {
  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status) => {
        const color = status === 'Published' ? 'green' : 'volcano'
        return (
          <Tag color={color} key={status}>
            {status.toUpperCase()}
          </Tag>
        )
      },
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a>Edit</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ]

  const data = [
    {
      key: '1',
      title: 'Riki Rhino tayang perdana di New York, USA',
      status: 'Published',
    },
    {
      key: '2',
      title: 'Behind the Scene Riki Rhino',
      status: 'Draft',
    },
  ]

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <div id={cssContent.customPageHeader}>
        <PageHeader title="News" subTitle="All News" />
      </div>

      <Row gutter={16}>
        <Col xs={24} sm={24} md={24} lg={24}>
          <div
            className={cssContent.contentPage}
            style={{ marginTop: 8, marginBottom: 8 }}
          >
            <Table columns={columns} dataSource={data} />
          </div>
        </Col>
      </Row>
    </Space>
  )
}

export default News
