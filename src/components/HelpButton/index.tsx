import React, { useEffect, useState } from 'react'
import './index.less'
import { Dropdown, Menu, Tooltip } from 'antd'
import axios from 'axios'

const HelpButton = (props: any) => {
  const [visible, setVisible] = useState<boolean>(false)
  const [v, setV] = useState<string>('v0.0.0')
  const [docUrl, setDocUrl] = useState<string>('')
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <a href={docUrl} target={'_blank'} rel="noreferrer">
          使用文档
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" disabled={true}>
        Canyon {v}
      </Menu.Item>
    </Menu>
  )
  useEffect(() => {
    axios.get('/api/base').then(res=>{
      setV(res.data.version)
      setDocUrl('https://canyon-project.github.io/canyon.io/docs/get_started/first_coverage')
    })
  }, [])
  const dropdownBtn = <span className={'dropdown-btn'}>?</span>
  return (
    <div className={'help-button'}>
      <Dropdown
        visible={visible}
        placement={'topLeft'}
        overlay={menu}
        trigger={['click']}
        onVisibleChange={(val) => {
          setVisible(val)
        }}
      >
        <div>
          {!visible ? (
            <Tooltip title="帮助">{dropdownBtn}</Tooltip>
          ) : (
            dropdownBtn
          )}
        </div>
      </Dropdown>
    </div>
  )
}

export default HelpButton
