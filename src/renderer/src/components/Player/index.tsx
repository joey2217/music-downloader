import {
  CaretRightOutlined,
  CloseOutlined,
  MenuOutlined,
  PauseOutlined,
  VerticalLeftOutlined,
  VerticalRightOutlined,
} from '@ant-design/icons'
import { Button, Progress } from 'antd'
import React, { memo, useState } from 'react'
import PlayList from './PlayList'
import SongInfo from './SongInfo'

const Player: React.FC = () => {
  const [show, setShow] = useState(false)
  return (
    <>
      <section className="flex h-full px-4 py-4">
        <div className="flex">
          <SongInfo />
        </div>
        <div className="flex items-center justify-center flex-col flex-1 ">
          <div className="flex items-center">
            <Button
              size="small"
              shape="circle"
              icon={<VerticalRightOutlined />}
            />
            <Button
              shape="circle"
              icon={<CaretRightOutlined />}
              className="mx-4"
            />
            {/* <Button size="large" shape="circle" icon={<PauseOutlined/> } className="mx-4" /> */}
            <Button
              size="small"
              shape="circle"
              icon={<VerticalLeftOutlined />}
            />
          </div>
          <div className="flex items-start w-96">
            <span className="leading-6 px-2">00:00</span>
            <Progress percent={50} showInfo={false} strokeWidth={4} />
            <span className="leading-6 px-2">00:00</span>
          </div>
        </div>
        <div>
          <div
            className="fixed bottom-20 right-0 transition-transform bg-black"
            style={{
              height: 'calc(100vh - 127px)',
              transform: show ? 'none' : 'translateX(100vw)',
            }}
          >
            <div className="flex items-center justify-between p-2 text-lg">
              <div className="font-medium">当前播放</div>
              <CloseOutlined onClick={() => setShow(false)}/>
            </div>
            <PlayList />
          </div>
          <Button
            icon={<MenuOutlined />}
            onClick={() => setShow((s) => !s)}
          ></Button>
        </div>
      </section>
    </>
  )
}

export default memo(Player)
