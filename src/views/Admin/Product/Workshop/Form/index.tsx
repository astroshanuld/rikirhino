/* eslint-disable react/jsx-curly-newline */
import {
  Button,
  Col,
  Divider,
  Image,
  notification,
  PageHeader,
  Row,
  Space,
  Spin,
} from 'antd'
import LoadingForm from '@nexys/components/Loading/partials/LoadingForm'
import FInput from '@nexys/fields/FInput/FInput'
import { Form, Formik } from 'formik'
import Router from 'next/router'
import React from 'react'
import { useMutation } from 'react-query'
import ApiCall from 'services/ApiCall'
import cssContent from '@nexys/components/Content/Content.module.scss'
import ActionForm from '@nexys/components/ActionForm/ActionForm'
import { get } from 'lodash'
import FUpload from '@nexys/fields/FUpload/FUpload'
import UploadOutlined from '@ant-design/icons/UploadOutlined'
import { BASE_API_URL } from 'constant'
import FQuill from '@nexys/fields/FQuill/FQuill'
import workshopProductSchema from 'validations/product/workshopProductSchema'
import useWorkshopProductById from 'data/useWorkshopProductById'

export interface IWorkshopProductPost {
  name: string
  description: string
  workshopProductImage?: string | null
  benefit: string
}

interface AbstractFormProps {
  initialValues: any
  validationSchema: any
  isEdit?: boolean
  pageProps?: any
  mutation: ReturnType<typeof useMutation>
}

function AbstractForm(props: AbstractFormProps) {
  const {
    initialValues,
    validationSchema,
    isEdit = false,
    mutation,
    pageProps,
  } = props

  const baseUrlApi = BASE_API_URL.replace('/v1', '')
  const baseUrl = '/admin/product/workshop'
  const redirectUrl = get(pageProps, 'query.redirectUrl', baseUrl)

  // Mutation Delete
  const forceDelete = useMutation((id: string) =>
    ApiCall.WorkshopProduct.forceDelete(id),
  )

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div id={cssContent.customPageHeader}>
        <PageHeader
          title="Product"
          onBack={() => Router.push(baseUrl)}
          subTitle={`${isEdit ? 'Edit' : 'Add'} Workshop`}
        />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const newFormData = {
              ...values,
              workshopProductImage: get(values, 'workshopProductImage.[0]', ''),
            }

            const response = await mutation.mutateAsync(newFormData)
            const message = get(response, 'data.message', '')
            notification.success({
              message,
            })
            Router.push(redirectUrl)
          } catch (error) {
            const description = error?.response?.data?.message
            notification.error({ message: 'Error', description })
          } finally {
            setSubmitting(false)
          }
        }}
      >
        {(formikProps) => {
          const { handleSubmit, isSubmitting } = formikProps
          return (
            <Spin spinning={isSubmitting} size="large">
              <Form onSubmit={handleSubmit}>
                <Row gutter={16}>
                  <Col md={16} xs={24}>
                    <div className={cssContent.contentForm}>
                      <Space
                        direction="vertical"
                        style={{ width: '100%' }}
                        size="large"
                      >
                        <FInput
                          title="Name"
                          name="name"
                          placeholder="input name"
                          required
                        />

                        <FQuill
                          title="Description"
                          name="description"
                          placeholder="input description"
                        />

                        <FInput
                          title="Benefit"
                          name="benefit"
                          placeholder="input benefit"
                          required
                        />

                        <FUpload
                          title="Product Image"
                          name="workshopProductImage"
                        >
                          <Button icon={<UploadOutlined />}>Choose File</Button>
                        </FUpload>

                        {initialValues?.picturePath ? (
                          <React.Fragment>
                            <Divider />
                            <Image
                              width={200}
                              src={`${baseUrlApi}${initialValues?.picturePath}`}
                            />
                          </React.Fragment>
                        ) : (
                          <React.Fragment />
                        )}
                      </Space>
                    </div>
                  </Col>

                  <Col md={8} xs={24}>
                    <ActionForm
                      isEdit={isEdit}
                      initialValues={initialValues}
                      formikProps={formikProps}
                      redirectUrl={redirectUrl}
                      mutationDelete={forceDelete}
                    />
                  </Col>
                </Row>
              </Form>
            </Spin>
          )
        }}
      </Formik>
    </Space>
  )
}

function FormAdd() {
  const createData = useMutation((data: IWorkshopProductPost) =>
    ApiCall.WorkshopProduct.create(data),
  )

  return (
    <AbstractForm
      initialValues={{
        name: '',
        description: '',
        workshopProductImage: '',
        benefit: '',
      }}
      validationSchema={workshopProductSchema.create}
      mutation={createData}
    />
  )
}

function FormEdit(props: any) {
  const { pageProps } = props
  const id = pageProps?.query?.id
  const isEdit = Boolean(id)

  const queryWorkshopProductById = useWorkshopProductById(id)
  const { isLoading, remove, data } = queryWorkshopProductById

  const updateData = useMutation(
    (data: IWorkshopProductPost) => ApiCall.WorkshopProduct.update(id, data),
    {
      onSettled() {
        remove()
      },
    },
  )

  if (isLoading) {
    return <LoadingForm />
  }

  return (
    <AbstractForm
      initialValues={{
        ...data,
        workshopProductImage: '',
      }}
      validationSchema={workshopProductSchema.update}
      isEdit={isEdit}
      mutation={updateData}
      pageProps={pageProps}
    />
  )
}

export { FormAdd, FormEdit }
