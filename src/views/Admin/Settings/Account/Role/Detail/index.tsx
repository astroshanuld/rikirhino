import { Descriptions } from 'antd'
import React from 'react'
import cssContent from '@nexys/components/Content/Content.module.scss'
import { UseRoleData } from 'data/useRole'

interface DetailRoleProps {
  data: UseRoleData
}

function DetailRole(props: DetailRoleProps) {
  const { data } = props
  return (
    <div className={cssContent.contentModal}>
      <Descriptions bordered size="small">
        <Descriptions.Item label="Name">
          <b>{data?.name}</b>
        </Descriptions.Item>
      </Descriptions>
    </div>
  )
}

export default DetailRole
