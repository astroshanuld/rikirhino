import { Descriptions, Image } from 'antd'
import React from 'react'
import cssContent from '@nexys/components/Content/Content.module.scss'
import { BASE_API_URL } from 'constant'
import { UseWorkshopProductData } from 'data/useWorkshopProduct'

interface DetailWorkshopProductProps {
  data: UseWorkshopProductData
}

function DetailWorkshopProduct(props: DetailWorkshopProductProps) {
  const { data } = props
  const baseUrlApi = BASE_API_URL.replace('/v1', '')

  return (
    <div className={cssContent.contentModal}>
      <Descriptions bordered size="small">
        <Descriptions.Item label="Name">
          <b>{data?.name}</b>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions bordered size="small">
        <Descriptions.Item label="Description">
          <b>{data?.description}</b>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions bordered size="small">
        <Descriptions.Item label="Benefit">
          <b>{data?.benefit}</b>
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

export default DetailWorkshopProduct
