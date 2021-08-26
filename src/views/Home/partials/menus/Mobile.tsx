import MenuOutlined from '@ant-design/icons/MenuOutlined'
import { Button } from 'antd'
import React, { useState } from 'react'
import cssMenu from 'views/Home/partials/menus/Menu.module.scss'

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
          className={cssMenu.menuTextMobile}
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
          className={cssMenu.menuTextMobile}
        >
          Home
        </Button>
        <Button
          onClick={() => onClickMenu('2')}
          className={cssMenu.menuTextMobile}
        >
          Story
        </Button>
        <Button
          onClick={() => onClickMenu('3')}
          className={cssMenu.menuTextMobile}
        >
          Karakter
        </Button>
        <Button
          onClick={() => onClickMenu('4')}
          className={cssMenu.menuTextMobile}
        >
          Lokasi
        </Button>
        <Button
          onClick={() => onClickMenu('5')}
          className={cssMenu.menuTextMobile}
        >
          Gallery
        </Button>
        <Button
          onClick={() => onClickMenu('6')}
          className={cssMenu.menuTextMobile}
        >
          Games
        </Button>
        <Button
          onClick={() => onClickMenu('7')}
          className={cssMenu.menuTextMobile}
        >
          Poster
        </Button>
        <Button
          onClick={() => onClickMenu('8')}
          className={cssMenu.menuTextMobile}
        >
          Soundtrack
        </Button>
        <Button
          onClick={() => onClickMenu('9')}
          className={cssMenu.menuTextMobile}
        >
          Diary Beni
        </Button>
        <Button
          onClick={() => onClickMenu('10')}
          className={cssMenu.menuTextMobile}
        >
          News
        </Button>
      </div>
    </div>
  )
}

export default Mobile
