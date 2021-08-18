/* eslint-disable no-param-reassign */
/* eslint-disable react/destructuring-assignment */
import DeleteFilled from '@ant-design/icons/DeleteFilled'
import ExclamationCircleOutlined from '@ant-design/icons/ExclamationCircleOutlined'
import UploadOutlined from '@ant-design/icons/UploadOutlined'
import cssContent from '@nexys/components/Content/Content.module.scss'
import {
  Button,
  Col,
  Image,
  message,
  Modal,
  PageHeader,
  Row,
  Space,
  Table,
  Typography,
  Upload,
} from 'antd'
import firebase from 'layouts/routes/firebaseClient'
import _ from 'lodash'
import React, { useEffect, useRef, useState } from 'react'

const { Text, Title } = Typography
const { confirm } = Modal

interface MultipleProps {
  id: string
}

function Multiple(props: MultipleProps) {
  const { id } = props
  const [data, setData] = useState([])
  const [dataItem, setDataItem] = useState([])
  const lastData = useRef([])
  const lastId = useRef('')
  const [isLoadingTable, setIsLoadingTable] = useState(true)
  const [isAddNewVisible, setIsAddNewVisible] = useState(false)
  const [addVideoTitle, setAddVideoTitle] = useState('')
  const [addVideoId, setAddVideoId] = useState('')

  const getData = firebase.firestore().collection(id)

  const getDataItem = () => {
    if (!_.isEmpty(data)) {
      const z = []
      let a = 1
      data.forEach((x, index) => {
        const y = {
          key: index + 1,
          id: x.id,
          num: a,
          url: x.data.imgUrl,
        }
        z.push(y)
        a += 1
      })
      setDataItem(z)
    }
    setIsLoadingTable(false)
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
    if (id !== lastId.current) {
      setIsLoadingTable(true)
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
        lastId.current = id
        setData(item)
      })
    }
    setTimeout(() => {
      getDataItem()
    }, 2000)
  }, [id, data, dataItem])

  function setDelete(x: string) {
    setIsLoadingTable(true)
    confirm({
      title: 'Delete Picture',
      icon: <ExclamationCircleOutlined />,
      content: 'Are you sure to delete this picture?',
      onOk() {
        getData
          .doc(x)
          .delete()
          .then(() => message.success('Picture has been deleted!'))
      },
      onCancel() {
        message.info('Delete cancelled!')
      },
    })
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
      title: <Text strong>URL</Text>,
      dataIndex: 'url',
      key: 'url',
      render: (url: string) => <Text>{url}</Text>,
    },
    {
      title: <Text strong>Picture</Text>,
      key: 'picture',
      dataIndex: 'url',
      render: (url: string) => <Image src={url} width={100} />,
    },
    {
      title: <Text strong>Action</Text>,
      key: 'action',
      dataIndex: 'id',
      render: (x: string) => (
        <Space size="middle">
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

  const propsImage = {
    name: 'file',
    headers: {
      authorization: 'authorization-text',
    },
    beforeUpload(info) {
      if (id !== 'Poster') {
        if (info.type !== 'image/png') {
          message.error('Only PNG format allowed!')
        }
        return info.type === 'image/png' ? true : Upload.LIST_IGNORE
      }
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        // console.log(info)
        setIsLoadingTable(true)
        const storage = firebase.storage()
        storage
          .ref('images')
          .child(info.file.uid)
          .put(info.fileList[0].originFileObj)
          .then((snapshot) => {
            snapshot.ref.getDownloadURL().then((url) => {
              getData.add({
                imgUrl: url,
                createdDate: firebase.firestore.Timestamp.now(),
              })
              setIsAddNewVisible(false)
            })
          })
        info.file.status = 'done'
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
        <PageHeader title="Pages" subTitle={id} />
      </div>
      <Row gutter={16} justify="end">
        <Col>
          <Button type="primary" onClick={() => setIsAddNewVisible(true)}>
            Add New Picture
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

      <Modal
        visible={isAddNewVisible}
        onCancel={() => closeAdd()}
        onOk={() => goAdd()}
        destroyOnClose
      >
        <Title level={3}>Add New Picture</Title>
        <Upload {...propsImage}>
          <Button icon={<UploadOutlined />}>Upload File Here</Button>
        </Upload>
      </Modal>
    </Space>
  )
}

export default Multiple
