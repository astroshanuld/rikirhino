/* eslint-disable react/destructuring-assignment */
import DeleteFilled from '@ant-design/icons/DeleteFilled'
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined'
import EyeFilled from '@ant-design/icons/EyeFilled'
import cssContent from '@nexys/components/Content/Content.module.scss'
import {
  Button,
  Col,
  Input,
  message,
  Modal,
  PageHeader,
  Row,
  Space,
  Table,
  Typography,
} from 'antd'
import firebase from 'layouts/routes/firebaseClient'
import _ from 'lodash'
import React, { useEffect, useRef, useState } from 'react'
import YouTube from 'react-youtube'
import cssPages from 'views/Admin/Pages/Pages.module.scss'

const { Text, Title } = Typography
const { confirm } = Modal

interface IYoutube {
  id: string
}

function Youtube(props: IYoutube) {
  const { id } = props
  const [data, setData] = useState([])
  const [dataItem, setDataItem] = useState([])
  const lastData = useRef([])
  const [isLoadingTable, setIsLoadingTable] = useState(true)
  const [isViewYoutubeVisible, setIsViewYoutubeVisible] = useState(false)
  const [isAddNewVisible, setIsAddNewVisible] = useState(false)
  const [videoUrl, setVideoUrl] = useState('')
  const [addVideoTitle, setAddVideoTitle] = useState('')
  const [addVideoId, setAddVideoId] = useState('')

  const getData = firebase.firestore().collection(id)

  const getDataItem = () => {
    if (!_.isEmpty(data)) {
      const z = []
      data.forEach((x, index) => {
        const y = {
          key: index + 1,
          id: `${x.id}|${x.data.url}`,
          title: x.data.title,
          url: x.data.url,
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

  function setDelete(x: string) {
    setIsLoadingTable(true)
    const y = x.split('|')
    confirm({
      title: 'Delete YouTube Video',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to delete this video?',
      onOk() {
        getData
          .doc(y[0])
          .delete()
          .then(() => message.success('Video has been deleted!'))
      },
      onCancel() {
        message.info('Delete cancelled!')
      },
    })
  }

  const viewButton = (x: string) => {
    const y = x.split('|')
    setVideoUrl(y[1])
    setIsViewYoutubeVisible(true)
  }

  const closeAdd = () => {
    setAddVideoId('')
    setAddVideoTitle('')
    setIsAddNewVisible(false)
  }

  const goAdd = async () => {
    setIsLoadingTable(true)
    setIsAddNewVisible(false)
    getData
      .add({
        title: addVideoTitle,
        url: addVideoId,
        createdDate: firebase.firestore.Timestamp.now(),
      })
      .then(() => {
        setAddVideoId('')
        setAddVideoTitle('')
        message.success('Video has been added!')
      })
  }

  const columns = [
    {
      title: <Text strong>Title</Text>,
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => <Text>{text}</Text>,
    },
    {
      title: <Text strong>Video ID</Text>,
      key: 'url',
      dataIndex: 'url',
      render: (url: string) => <Text>{url}</Text>,
    },
    {
      title: <Text strong>Action</Text>,
      key: 'action',
      dataIndex: 'id',
      render: (x: string) => (
        <Space size="middle">
          <Button
            type="primary"
            icon={<EyeFilled />}
            onClick={() => viewButton(x)}
          />
          <Button
            type="primary"
            danger
            onClick={() => setDelete(x)}
            icon={<DeleteFilled />}
          />
        </Space>
      ),
    },
  ]

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <div id={cssContent.customPageHeader}>
        <PageHeader title="Pages" subTitle="Home" />
      </div>
      <Row gutter={16} justify="end">
        <Col>
          <Button type="primary" onClick={() => setIsAddNewVisible(true)}>
            Add New Video
          </Button>
        </Col>
      </Row>
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

      <Modal // Modal for displaying YouTube videos
        visible={isViewYoutubeVisible}
        cancelButtonProps={{ style: { display: 'none' } }}
        onOk={() => setIsViewYoutubeVisible(false)}
        okText="Close"
        width={720}
        destroyOnClose
        centered
        closable={false}
      >
        <div className={cssPages.youtubeDivContainer}>
          <YouTube videoId={videoUrl} className={cssPages.youtubeContainer} />
        </div>
      </Modal>

      <Modal
        visible={isAddNewVisible}
        onCancel={() => closeAdd()}
        onOk={() => goAdd()}
      >
        <Title level={3}>Add New Video</Title>
        <Input
          placeholder="Video ID"
          value={addVideoId}
          onChange={(e) => setAddVideoId(e.target.value)}
          maxLength={11}
        />
        <p>
          Example: youtube.com/watch?v=
          <strong>BG5NPjW7r4U (copy and paste this ID)</strong>
        </p>
        <Input
          placeholder="Title"
          value={addVideoTitle}
          onChange={(e) => setAddVideoTitle(e.target.value)}
        />
        <br />
      </Modal>
    </Space>
  )
}

export default Youtube
