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
import useProductCategory from 'data/useProductCategory'
import Lists from '@nexys/helpers/Lists'
import FSelect from '@nexys/fields/FSelect/FSelect'
import useWorkshopProduct from 'data/useWorkshopProduct'
import insuranceProductSchema from 'validations/product/insuranceProductSchema'
import useInsuranceProductById from 'data/useInsuranceProductById'

export interface IInsuranceProductPost {
  name: string
  description: string
  ProductCategoryId: string
  WorkshopProductId: string
  insuranceProductImage?: string | null
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

  const queryWorkshopProduct = useWorkshopProduct({
    query: {
      defaultValue: {
        pageSize: 9999,
      },
    },
  })

  const queryProductCategory = useProductCategory({
    query: {
      defaultValue: {
        pageSize: 9999,
      },
    },
  })

  const optWorkshopProduct = Lists.transform(
    queryWorkshopProduct.data,
    'name',
    'id',
  )

  const optProductCategory = Lists.transform(
    queryProductCategory.data,
    'name',
    'id',
  )

  const baseUrlApi = BASE_API_URL.replace('/v1', '')
  const baseUrl = '/admin/product/insurance'
  const redirectUrl = get(pageProps, 'query.redirectUrl', baseUrl)

  // Mutation Delete
  const forceDelete = useMutation((id: string) =>
    ApiCall.InsuranceProduct.forceDelete(id),
  )

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div id={cssContent.customPageHeader}>
        <PageHeader
          title="Product"
          onBack={() => Router.push(baseUrl)}
          subTitle={`${isEdit ? 'Edit' : 'Add'} Insurance`}
        />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const newFormData = {
              ...values,
              insuranceProductImage: get(
                values,
                'insuranceProductImage.[0]',
                '',
              ),
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
                        <FSelect
                          title="Choose Product Category"
                          name="ProductCategoryId"
                          options={optProductCategory}
                          placeholder="choose product category"
                          style={{ width: '100%' }}
                        />

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

                        <FSelect
                          title="Choose Workshop Product"
                          name="WorkshopProductId"
                          options={optWorkshopProduct}
                          placeholder="choose workshop product"
                          style={{ width: '100%' }}
                        />

                        <FUpload
                          title="Product Image"
                          name="insuranceProductImage"
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
  const createData = useMutation((data: IInsuranceProductPost) =>
    ApiCall.InsuranceProduct.create(data),
  )

  return (
    <AbstractForm
      initialValues={{
        name: '',
        description: '',
        ProductCategoryId: '',
        WorkshopProductId: '',
        insuranceProductImage: '',
        benefit: '',
      }}
      validationSchema={insuranceProductSchema.create}
      mutation={createData}
    />
  )
}

function FormEdit(props: any) {
  const { pageProps } = props
  const id = pageProps?.query?.id
  const isEdit = Boolean(id)

  const queryInsuranceProductById = useInsuranceProductById(id)
  const { isLoading, remove, data } = queryInsuranceProductById

  const updateData = useMutation(
    (data: IInsuranceProductPost) => ApiCall.InsuranceProduct.update(id, data),
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
        insuranceProductImage: '',
      }}
      validationSchema={insuranceProductSchema.update}
      isEdit={isEdit}
      mutation={updateData}
      pageProps={pageProps}
    />
  )
}

export { FormAdd, FormEdit }
