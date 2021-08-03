import { Avatar } from 'antd'
import React from 'react'
import cssVerifying from '@nexys/components/VerifyPage/VerifyPage.module.scss'
import cx from 'classnames'
import Text from '@nexys/components/Typography/Text'

interface VerifyPageProps {
  loading: boolean
  title: string
}

function VerifyPage(props: VerifyPageProps) {
  const { loading, title } = props

  return (
    <div className={cx(cssVerifying.container)}>
      <div className="App">
        <header className="App-header">
          <Avatar
            className={cx('App-logo', { anim: loading })}
            alt="logo"
            src={'/static/images/logo-karcisbola.png'}
            style={{ backgroundColor: '#fff' }}
          >
            Sharaikios
          </Avatar>
          <Text color={'white'} size={18}>
            {title}
          </Text>
        </header>
      </div>
    </div>
  )
}

export default VerifyPage
