import MenuOutlined from '@ant-design/icons/MenuOutlined'
import { Button } from 'antd'
import React, { useState } from 'react'

interface IMobile {
  setTab: (x) => void
}

const Mobile = (props: IMobile) => {
  const { setTab } = props
  const [menuDisplay, setMenuDisplay] = useState('none')

  const checkMenu = () => {
    if (menuDisplay === 'none') {
      setMenuDisplay('flex')
    }
    if (menuDisplay === 'flex') {
      setMenuDisplay('none')
    }
  }

  const onClickMenu = (x: string) => {
    setMenuDisplay('none')
    setTab(x)
  }

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end',
        }}
      >
        <Button
          shape="circle"
          size="large"
          icon={<MenuOutlined />}
          onClick={() => checkMenu()}
          style={{
            fontSize: 10,
            backgroundColor: '#fbb040',
            color: '#000',
          }}
        />
      </div>
      <div
        style={{
          position: 'absolute',
          display: menuDisplay,
          flexDirection: 'column',
          zIndex: 2,
          top: '13vh',
          left: 160,
        }}
      >
        <Button
          onClick={() => onClickMenu('1')}
          style={{
            fontFamily: 'LuckiestGuy',
            fontSize: 10,
            backgroundColor: '#fbb040',
            color: '#000',
          }}
        >
          Home
        </Button>
        <Button
          onClick={() => onClickMenu('2')}
          style={{
            fontFamily: 'LuckiestGuy',
            fontSize: 10,
            backgroundColor: '#fbb040',
            color: '#000',
          }}
        >
          Story
        </Button>
        <Button
          onClick={() => onClickMenu('3')}
          style={{
            fontFamily: 'LuckiestGuy',
            fontSize: 10,
            backgroundColor: '#fbb040',
            color: '#000',
          }}
        >
          Karakter
        </Button>
        <Button
          onClick={() => onClickMenu('4')}
          style={{
            fontFamily: 'LuckiestGuy',
            fontSize: 10,
            backgroundColor: '#fbb040',
            color: '#000',
          }}
        >
          Lokasi
        </Button>
        <Button
          onClick={() => onClickMenu('5')}
          style={{
            fontFamily: 'LuckiestGuy',
            fontSize: 10,
            backgroundColor: '#fbb040',
            color: '#000',
          }}
        >
          Gallery
        </Button>
        <Button
          onClick={() => onClickMenu('6')}
          style={{
            fontFamily: 'LuckiestGuy',
            fontSize: 10,
            backgroundColor: '#fbb040',
            color: '#000',
          }}
        >
          Games
        </Button>
        <Button
          onClick={() => onClickMenu('7')}
          style={{
            fontFamily: 'LuckiestGuy',
            fontSize: 10,
            backgroundColor: '#fbb040',
            color: '#000',
          }}
        >
          Poster
        </Button>
        <Button
          onClick={() => onClickMenu('8')}
          style={{
            fontFamily: 'LuckiestGuy',
            fontSize: 10,
            backgroundColor: '#fbb040',
            color: '#000',
          }}
        >
          Soundtrack
        </Button>
        <Button
          onClick={() => onClickMenu('9')}
          style={{
            fontFamily: 'LuckiestGuy',
            fontSize: 10,
            backgroundColor: '#fbb040',
            color: '#000',
          }}
        >
          Diary Beni
        </Button>
        <Button
          onClick={() => onClickMenu('10')}
          style={{
            fontFamily: 'LuckiestGuy',
            fontSize: 10,
            backgroundColor: '#fbb040',
            color: '#000',
          }}
        >
          News
        </Button>
      </div>
    </div>
  )
}

export default Mobile
