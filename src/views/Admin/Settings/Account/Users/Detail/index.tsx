import { Checkbox, Descriptions } from 'antd'
import React from 'react'
import cssContent from '@nexys/components/Content/Content.module.scss'
import { UseUserData } from 'data/useUser'

interface DetailUserProps {
  data: UseUserData
}

function DetailUser(props: DetailUserProps) {
  const { data } = props
  return (
    <div className={cssContent.contentModal}>
      <Descriptions bordered size="small">
        <Descriptions.Item label="Full Name">
          <b>{data?.fullName}</b>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions bordered size="small">
        <Descriptions.Item label="Email">
          <b>{data?.email}</b>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions bordered size="small">
        <Descriptions.Item label="Phone">
          <b>{data?.phone}</b>
        </Descriptions.Item>
      </Descriptions>

      <Descriptions bordered size="small">
        <Descriptions.Item label="Active">
          <Checkbox checked={data?.isActive} />
        </Descriptions.Item>
      </Descriptions>

      <Descriptions bordered size="small">
        <Descriptions.Item label="Role">
          <b>{data?.Role?.name}</b>
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default DetailUser
