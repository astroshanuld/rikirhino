import { Descriptions, Image } from 'antd'
import React from 'react'
import cssContent from '@nexys/components/Content/Content.module.scss'
import { UseProviderData } from 'data/useProvider'
import { BASE_API_URL } from 'constant'

interface DetailProviderProps {
  data: UseProviderData
}

function DetailProvider(props: DetailProviderProps) {
  const { data } = props
  const baseUrlApi = BASE_API_URL.replace('/v1', '')

  return (
    <div className={cssContent.contentModal}>
      <Descriptions bordered size="small">
        <Descriptions.Item label="Full Name">
          <b>{data?.User?.fullName}</b>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions bordered size="small">
        <Descriptions.Item label="Email">
          <b>{data?.User?.email}</b>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions bordered size="small">
        <Descriptions.Item label="Phone">
          <b>{data?.User?.phone}</b>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions bordered size="small">
        <Descriptions.Item label="Address">
          <b>{data?.User?.address}</b>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions bordered size="small">
        <Descriptions.Item label="Name">
          <b>{data?.name}</b>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions bordered size="small">
        <Descriptions.Item label="Legal Entity ( Badan Hukum )">
          <b>{data?.legalEntity}</b>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions bordered size="small">
        <Descriptions.Item label="Picture">
          <Image
            width={200}
            src={`${baseUrlApi}${data?.picturePath}`}
            alt={data?.name}
          />
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default DetailProvider
