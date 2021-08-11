/* eslint-disable react/destructuring-assignment */
import cssContent from '@nexys/components/Content/Content.module.scss'
import { Col, PageHeader, Row, Space, Table, Tag } from 'antd'
import firebase from 'layouts/routes/firebaseClient'
import _ from 'lodash'
import React, { useEffect, useRef, useState } from 'react'

function News() {
  const [data, setData] = useState([])
  const [dataItem, setDataItem] = useState([])
  const lastData = useRef([])
  const [isLoadingTable, setIsLoadingTable] = useState(true)

  const getDataItem = () => {
    if (!_.isEmpty(data)) {
      const z = []
      data.forEach((x, index) => {
        const y = {
          key: index + 1,
          title: x.data.title,
          status: x.data.status,
        }
        z.push(y)
      })
      setDataItem(z)
      setIsLoadingTable(false)
    }
  }

  useEffect(() => {
    if (data !== lastData.current) {
      const getData = firebase.firestore().collection('Posts')
      getData.onSnapshot(async (querySnapshot) => {
        const item = []
        querySnapshot.forEach((doc) => {
          const datas = item
          datas.push({
            id: doc.id,
            data: doc.data(),
          })
        })
        lastData.current = item
        setData(item)
      })
    }
    setTimeout(() => {
      getDataItem()
    }, 5000)
  }, [data, dataItem])

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
            {/* <Button onClick={() => console.log(dataItem)}>
              DEV MAGIC BUTTON
            </Button> */}
            <Table
              columns={columns}
              dataSource={dataItem}
              loading={isLoadingTable}
            />
          </div>
        </Col>
      </Row>
    </Space>
  )
}

export default News
