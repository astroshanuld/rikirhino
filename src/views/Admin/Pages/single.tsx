/* eslint-disable prefer-destructuring */
import { Button, PageHeader, Space, Spin } from 'antd'
import React, { useState } from 'react'
import cssContent from '@nexys/components/Content/Content.module.scss'
import { withRouter } from 'next/router'

function single(props: any) {
  const [isLoading, setIsLoading] = useState(false)
  const id = props.query.id

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      <div id={cssContent.customPageHeader}>
        <PageHeader title="Pages" subTitle="Story" />
      </div>
      <Spin spinning={isLoading}>
        <Button onClick={() => console.log(id)}>DEV MAGIC BUTTON</Button>
      </Spin>
    </Space>
  )
}

export default withRouter(single)
