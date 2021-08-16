/* eslint-disable prefer-destructuring */
import { Space } from 'antd'
import router, { withRouter } from 'next/router'
import React, { useEffect } from 'react'
import Multiple from 'views/Admin/Pages/partials/multiple'
import Single from 'views/Admin/Pages/partials/single'

function Pages(props: any) {
  const { pageProps } = props
  const id = pageProps.query.id

  useEffect(() => {
    if (
      id !== 'Story' &&
      id !== 'Lokasi' &&
      id !== 'Games' &&
      id !== 'Soundtrack' &&
      id !== 'Diary' &&
      id !== 'Home' &&
      id !== 'Karakter' &&
      id !== 'Gallery' &&
      id !== 'Poster'
    ) {
      router.push('/admin/pages/Home')
    }
  }, [id])

  const checkTitle = () => {
    if (
      id === 'Story' ||
      id === 'Lokasi' ||
      id === 'Games' ||
      id === 'Soundtrack' ||
      id === 'Diary'
    ) {
      return <Single id={id} />
    }
    if (
      id === 'Home' ||
      id === 'Karakter' ||
      id === 'Gallery' ||
      id === 'Poster'
    ) {
      return <Multiple id={id} />
    }
  }

  return (
    <Space direction="vertical" style={{ width: '100%' }} size="middle">
      {checkTitle()}
    </Space>
  )
}

export default withRouter(Pages)
