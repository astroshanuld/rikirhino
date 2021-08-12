/* eslint-disable react/destructuring-assignment */
import cssContent from '@nexys/components/Content/Content.module.scss'
import {
  Alert,
  Button,
  Col,
  message,
  PageHeader,
  Row,
  Space,
  Table,
  Tag,
} from 'antd'
import firebase from 'layouts/routes/firebaseClient'
import _ from 'lodash'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'

function News() {
  const [data, setData] = useState([])
  const [dataItem, setDataItem] = useState([])
  const lastData = useRef([])
  const [isLoadingTable, setIsLoadingTable] = useState(true)
  const [idDelete, setIdDelete] = useState('')
  const [titleDelete, setTitleDelete] = useState('')

  const getData = firebase.firestore().collection('Posts')
  const router = useRouter()

  const getDataItem = () => {
    if (!_.isEmpty(data)) {
      const z = []
      data.forEach((x, index) => {
        const y = {
          key: index + 1,
          id: `${x.id}|${x.data.title}`,
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

  const alertClose = () => {
    setTitleDelete('')
    setIdDelete('')
  }

  const setDelete = (id: string) => {
    const idExp = id.split('|')
    setIdDelete(idExp[0])
    setTitleDelete(idExp[1])
  }

  const setEdit = (id: string) => {
    const idExp = id.split('|')
    router.push(`/admin/news/compose/${idExp[0]}`)
  }

  const doDelete = async () => {
    await getData
      .doc(idDelete)
      .delete()
      .then(() => {
        setIdDelete('')
        setTitleDelete('')
        setIsLoadingTable(true)
        message.success('News has been deleted!')
      })
  }

  const columns = [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <a>{text}</a>,
    },
    {
      title: 'Status',
      key: 'status',
      dataIndex: 'status',
      render: (status: string) => {
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
      dataIndex: 'id',
      render: (x: string) => (
        <Space size="middle">
          <Button type="link" onClick={() => setEdit(x)}>
            Edit
          </Button>
          <Button type="link" onClick={() => setDelete(x)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ]

  const renderActions = () => {
    if (idDelete !== '' && titleDelete !== '') {
      const desc = `Are you sure to delete news entitled ${titleDelete} ?`
      return (
        <Alert
          message="Delete News"
          description={desc}
          type="error"
          action={
            <Space direction="vertical">
              <Button size="small" type="primary" onClick={() => doDelete()}>
                Delete
              </Button>
              <Button
                size="small"
                danger
                type="ghost"
                onClick={() => alertClose()}
              >
                Decline
              </Button>
            </Space>
          }
        />
      )
    }
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <div id={cssContent.customPageHeader}>
        <PageHeader title="News" subTitle="All News" />
      </div>
      {renderActions()}
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
