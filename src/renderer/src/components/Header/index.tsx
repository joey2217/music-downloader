import { Menu, Button } from 'antd'
import React, { memo } from 'react'

const items = [
  { label: 'search', key: 'item-1' } // 菜单项务必填写 key
]

const Header: React.FC = () => {
  return (
    <header className='flex items-center'>
      <div>
        LOGO
      </div>
      <Menu items={items} mode="horizontal"/>
      <div className='ml-auto'>
        <Button type='text' onClick={window.electronAPI && window.electronAPI.toggleMainWindowDevtools}>devtools</Button>
      </div>
    </header>
  )
}

export default memo(Header)
