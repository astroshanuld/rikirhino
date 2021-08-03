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
import { get } from 'lodash'
import Router from 'next/router'
import React from 'react'
import { useMutation } from 'react-query'
import ApiCall from 'services/ApiCall'
import cssContent from '@nexys/components/Content/Content.module.scss'
import ActionForm from '@nexys/components/ActionForm/ActionForm'
import useProviderById from 'data/useProviderById'
import FTextArea from '@nexys/fields/FTextArea/FTextArea'
import Text from '@nexys/components/Typography/Text'
import FUpload from '@nexys/fields/FUpload/FUpload'
import UploadOutlined from '@ant-design/icons/UploadOutlined'
import { BASE_API_URL } from 'constant'
import providerSchema from 'validations/provider/providerSchema'

export interface IProviderPost {
  fullName: string
  email: string
  phone: string
  address: string
  name: string
  legalEntity: string
  providerImage: string
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
  const baseUrl = '/admin/settings/account/provider'
  const redirectUrl = get(pageProps, 'query.redirectUrl', baseUrl)

  // Mutation Delete
  const forceDelete = useMutation((id: string) =>
    ApiCall.Provider.forceDelete(id),
  )

  return (
    <Space direction="vertical" style={{ width: '100%' }}>
      <div id={cssContent.customPageHeader}>
        <PageHeader
          title="Account"
          onBack={() => Router.push(baseUrl)}
          subTitle={`${isEdit ? 'Edit' : 'Add'} Provider`}
        />
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values, { setSubmitting }) => {
          try {
            const response = await mutation.mutateAsync(values)
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
                        <Text size={18} bold>
                          Account
                        </Text>
                        <div id={cssContent.customDivider}>
                          <Divider />
                        </div>

                        <FInput
                          title="Full Name"
                          name="fullName"
                          placeholder="input full name"
                          required
                        />

                        <FInput
                          title="Email"
                          type="email"
                          name="email"
                          placeholder="input email"
                          disabled={isEdit}
                          required
                        />

                        <FInput
                          title="Phone"
                          name="phone"
                          placeholder="input phone"
                          disabled={isEdit}
                          required
                        />

                        <FTextArea
                          title="Address"
                          name="address"
                          placeholder="input address"
                          autoSize={{ minRows: 3, maxRows: 6 }}
                        />

                        <div style={{ marginTop: '1rem' }}>
                          <Text size={18} bold>
                            Provider
                          </Text>
                        </div>
                        <div id={cssContent.customDivider}>
                          <Divider />
                        </div>

                        <FInput
                          title="Name"
                          name="name"
                          placeholder="input provider name"
                          required
                        />

                        <FInput
                          title="Legal Entity ( Badan Hukum )"
                          name="legalEntity"
                          placeholder="input legal entity"
                          required
                        />

                        <FUpload title="Provider Image" name="providerImage">
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
  const createData = useMutation((data: IProviderPost) =>
    ApiCall.Provider.create(data),
  )

  return (
    <AbstractForm
      initialValues={{
        fullName: '',
        email: '',
        phone: '',
        address: '',
        name: '',
        legalEntity: '',
        providerImage: '',
      }}
      validationSchema={providerSchema.create}
      mutation={createData}
    />
  )
}

function FormEdit(props: any) {
  const { pageProps } = props
  const id = pageProps?.query?.id
  const isEdit = Boolean(id)

  const queryProviderById = useProviderById(id)
  const { isLoading, remove, data } = queryProviderById

  const updateData = useMutation(
    (data: IProviderPost) => ApiCall.Provider.update(id, data),
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
        fullName: data?.User?.fullName,
        email: data?.User?.email,
        phone: data?.User?.phone,
        address: data?.User?.address,
        providerImage: '',
      }}
      validationSchema={providerSchema.update}
      isEdit={isEdit}
      mutation={updateData}
      pageProps={pageProps}
    />
  )
}

export { FormAdd, FormEdit }
