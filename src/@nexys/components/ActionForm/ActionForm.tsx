import React, { useState } from 'react'
import cssContent from '@nexys/components/Content/Content.module.scss'
import {
  Button,
  Col,
  Descriptions,
  Divider,
  notification,
  Popconfirm,
  Row,
} from 'antd'
import Text from '@nexys/components/Typography/Text'
import { useMutation } from 'react-query'
import { get } from 'lodash'
import Router from 'next/router'
import { FormikProps } from 'formik'

interface withPublishedProps {
  id: string
  value: any
}

interface ActionFormProps {
  initialValues: any
  isEdit?: boolean
  redirectUrl?: string
  formikProps?: FormikProps<any>
  withPublished?: withPublishedProps[]
  mutationDelete?: ReturnType<typeof useMutation>
}

function ActionForm(props: ActionFormProps) {
  const {
    isEdit = false,
    initialValues,
    withPublished,
    redirectUrl,
    formikProps,
    mutationDelete,
  } = props

  const [isLoading, setIsLoading] = useState(false)
  const [isVisible, setIsVisible] = useState(false)

  const { id } = initialValues

  async function handleDelete() {
    setIsLoading(true)

    try {
      const response = await mutationDelete.mutateAsync(id)
      const message = get(response, 'data.message', '')
      notification.success({
        message,
      })
      Router.push(redirectUrl)
    } catch (error) {
      console.log(error?.response?.data?.message)
    } finally {
      setIsLoading(false)
      setIsVisible(false)
    }
  }

  return (
    <div className={cssContent.contentForm}>
      {withPublished && (
        <div style={{ marginBottom: '1rem' }}>
          <Text size={16}>Info</Text>
          <div id={cssContent.customDividerAction}>
            <Divider />
          </div>

          {withPublished &&
            withPublished.map((item) => {
              return (
                <Descriptions bordered size="small">
                  <Descriptions.Item label={item.id}>
                    <b>{item.value}</b>
                  </Descriptions.Item>
                </Descriptions>
              )
            })}
        </div>
      )}

      <Text size={16}>Action</Text>
      <div id={cssContent.customDividerAction}>
        <Divider />
      </div>

      <Row gutter={[16, 16]} style={{ marginTop: '5px' }}>
        <Col xs={12}>
          <Button
            style={{
              width: '100%',
            }}
            type="primary"
            htmlType="button"
            loading={formikProps.isSubmitting}
            onClick={() => {
              formikProps.handleSubmit()
            }}
          >
            Save
          </Button>
        </Col>

        {isEdit && mutationDelete ? (
          <Col xs={12}>
            <Popconfirm
              visible={isVisible}
              placement="topRight"
              title="Are you sure you want to delete this data ?"
              onConfirm={handleDelete}
              onCancel={() => setIsVisible(!isVisible)}
              okText="Yes"
              cancelText="No"
            >
              <Button
                danger
                style={{
                  width: '100%',
                }}
                onClick={() => setIsVisible(true)}
                loading={isLoading}
              >
                Delete
              </Button>
            </Popconfirm>
          </Col>
        ) : (
          <React.Fragment />
        )}
      </Row>
    </div>
  )
}

export default ActionForm
