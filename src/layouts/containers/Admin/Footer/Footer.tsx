import React from 'react'
import { Layout } from 'antd'

const { Footer: AntFooter } = Layout

function Footer() {
  const dateNow = new Date()
  const yearNow = dateNow.getFullYear()

  return (
    <React.Fragment>
      <AntFooter style={{ textAlign: 'center' }}>
        &copy; &nbsp;
        {yearNow}
        &nbsp; Created by &nbsp;
        <b>Sharaikios</b>
      </AntFooter>
    </React.Fragment>
  )
}

export default Footer
