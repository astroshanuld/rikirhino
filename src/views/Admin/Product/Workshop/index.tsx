/* eslint-disable react/jsx-curly-newline */
import {
  Button,
  Checkbox,
  Col,
  Image,
  Input,
  Modal,
  notification,
  PageHeader,
  Popconfirm,
  Row,
  Space,
} from 'antd'
import cssContent from '@nexys/components/Content/Content.module.scss'
import Paginations, { getNumber } from '@nexys/helpers/Paginations'
import { get, isEmpty } from 'lodash'
import EyeTwoTone from '@ant-design/icons/EyeTwoTone'
import EditTwoTone from '@ant-design/icons/EditTwoTone'
import DeleteOutlined from '@ant-design/icons/DeleteOutlined'
import PlusOutlined from '@ant-design/icons/PlusOutlined'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Table from '@nexys/components/Table/Table'
import MyPagination from '@nexys/components/MyPagination/MyPagination'
import useDebounce from '@nexys/hooks/useDebounce/useDebounce'
import useToggle from '@nexys/hooks/useToggle'
import ApiCall from 'services/ApiCall'
import { useMutation } from 'react-query'
import { BASE_API_URL } from 'constant'
import useWorkshopProduct from 'data/useWorkshopProduct'
import DetailWorkshopProduct from 'views/Admin/Product/Workshop/Detail'

function WorkshopProduct(props: any) {
  const defaultPage = get(props, 'router.query.page', 1)
  const defaultPageSize = 10
  const baseUrlPage = `/admin/product/workshop`

  const baseUrlApi = BASE_API_URL.replace('/v1', '')

  const [checked, setChecked] = useState([])
  const [isCheckedkAll, setIsCheckedkAll] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const [title, setTitle] = useState(undefined)
  const debouncedTitle = useDebounce(title, 500)

  const initialToggle = false
  const stateToggle = useToggle({
    initialToggle,
    initialState: {
      visible: false,
      data: {
        id: null,
        name: null,
        description: null,
        picturePath: null,
        benefit: null,
        createdAt: null,
        updatedAt: null,
        deletedAt: null,
      },
    },
  })

  const queryWorkshopProduct = useWorkshopProduct({
    query: {
      defaultValue: {
        page: Number(defaultPage),
        pageSize: defaultPageSize,
      },
    },
  })
  const {
    data,
    refetch,
    helpers,
    isLoading: queryLoading,
  } = queryWorkshopProduct

  useEffect(() => {
    refetch()

    helpers.setQuery((helper) => {
      helper.query.set('page', undefined)
      helper.filtered.set('name', debouncedTitle)
    })
  }, [debouncedTitle])

  function handleMultiCheck(e) {
    let selected = [...checked]
    const isCheck = e.target.checked

    for (let i = 0; i < data.length; i += 1) {
      const item = data[i]
      // checked or unchecked
      if (isCheck) {
        selected.push(item.id)
      } else {
        selected = []
      }
    }

    // pick unique item array
    const uniqSelected = [...new Set(selected)]

    setIsCheckedkAll(!isCheckedkAll)
    setChecked(uniqSelected)
  }

  function handleSingleCheck(id: string) {
    // index dari id yg dipilih didalam array checked
    // if key index >= 0 splice index else push ke checked
    const selected = [...checked]
    const keyIndex = selected.indexOf(id)

    if (keyIndex > -1) {
      selected.splice(keyIndex, 1)
    } else {
      selected.push(id)
    }
    setChecked(selected)
  }

  // Mutation Delete
  const multipleDelete = useMutation((listChecked: string | string[]) =>
    ApiCall.WorkshopProduct.multipleForceDelete({ ids: listChecked }),
  )
  async function handleDelete(listChecked: string[]) {
    if (!isEmpty(listChecked)) {
      setIsLoading(true)

      try {
        const response = await multipleDelete.mutateAsync(listChecked)
        const message = get(response, 'data.message', '')
        notification.success({
          message,
        })
      } catch (error) {
        console.log(error?.response?.data?.message)
      } finally {
        // refetch after delete data
        refetch()
        setIsCheckedkAll(false)
        setIsLoading(false)
        setChecked([])
        setIsVisible(false)
      }
    } else {
      setIsVisible(false)
      notification.warning({
        message: 'Select a data / record to be deleted',
      })
    }
  }

  const columns = [
    {
      Header: () => (
        <Checkbox
          onChange={(e) => handleMultiCheck(e)}
          checked={isCheckedkAll}
        />
      ),
      accessor: 'id',
      width: 70,
      Cell: (row) => {
        const { value } = row
        return (
          <Checkbox
            checked={checked.includes(value)}
            onChange={() => handleSingleCheck(value)}
          />
        )
      },
    },
    {
      Header: 'No.',
      accessor: 'no',
      width: 70,
      Cell: (row) => {
        const { index, pageSize } = row
        const page = helpers.getQueryById('page')
        return getNumber(page, pageSize, index)
      },
    },
    {
      Header: 'Picture',
      accessor: 'picturePath',
      width: 200,
      Cell: (row) => {
        const { value, original } = row
        return (
          <Image
            width={200}
            src={`${baseUrlApi}${value}`}
            alt={original?.name}
          />
        )
      },
    },
    {
      Header: 'Name',
      accessor: 'name',
      width: 200,
    },
    {
      Header: 'Benefit',
      accessor: 'benefit',
    },
    {
      Header: 'Detail',
      accessor: 'detail',
      width: 70,
      Cell: (row) => {
        const { original } = row
        return (
          <Button
            onClick={() =>
              stateToggle.toggle({
                visible: !initialToggle,
                data: original,
              })
            }
            type="link"
            icon={<EyeTwoTone twoToneColor="#52c41a" />}
          />
        )
      },
    },
    {
      Header: 'Edit',
      accessor: 'edit',
      width: 70,
      Cell: (row) => {
        const { original } = row
        const page = helpers.getQueryById('page') || 1

        return (
          <Link
            href={`${baseUrlPage}/edit/${original?.id}?redirectUrl=${baseUrlPage}?page=${page}`}
          >
            <a>
              <Button type="link" icon={<EditTwoTone />} />
            </a>
          </Link>
        )
      },
    },
  ]

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <div id={cssContent.customPageHeader}>
        <PageHeader title="Product" subTitle={'Workshop'} />
      </div>

      <div className={cssContent.contentPage}>
        <Row gutter={[16, 16]}>
          <Col>
            <Input
              placeholder="Search Name"
              onChange={(e) => {
                setTitle(e.target.value)
              }}
              value={title}
            />
          </Col>

          <Col flex="auto">
            <Popconfirm
              visible={isVisible}
              title="Are you sure you want to delete this data ?"
              onConfirm={() => handleDelete(checked)}
              onCancel={() => setIsVisible(!isVisible)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                danger
                icon={<DeleteOutlined />}
                loading={isLoading}
                onClick={() => setIsVisible(true)}
              >
                Delete
              </Button>
            </Popconfirm>
          </Col>

          <Col flex="auto" />

          <Col>
            <Link href={`${baseUrlPage}/add`}>
              <a>
                <Button type="primary" icon={<PlusOutlined />}>
                  Add
                </Button>
              </a>
            </Link>
          </Col>

          <Col xs={24}>
            <Table
              columns={columns}
              data={data}
              defaultPageSize={defaultPageSize}
              className="-highlight"
              loading={queryLoading}
            />
          </Col>

          <Col xs={24} style={{ textAlign: 'right' }}>
            <MyPagination
              {...Paginations.getPaginationProps(queryWorkshopProduct)}
            />
          </Col>
        </Row>

        <Modal
          title="Workshop Product Detail"
          onCancel={() => stateToggle.toggle({ visible: initialToggle })}
          width={700}
          footer={null}
          className={cssContent.contentModalHeader}
          {...stateToggle.state}
        >
          <DetailWorkshopProduct data={stateToggle.state.data} />
        </Modal>
      </div>
    </Space>
  )
}

export default WorkshopProduct
