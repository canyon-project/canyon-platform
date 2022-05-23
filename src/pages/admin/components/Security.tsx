import React from 'react'
import ProCard from '@ant-design/pro-card'
import { Button, Input, message, Tooltip } from 'antd'
import { CopyOutlined } from '@ant-design/icons'
import { copyToClipboard } from '../../../utils/util'

export const SecurityTab = () => {
  const token = localStorage.getItem('token') ?? ''
  return (
    <>
      <ProCard colSpan="24" layout="center" title="个人Token" bordered>
        <Input
          prefix="Token"
          suffix={
            <Tooltip title="copy git url">
              <Button
                icon={<CopyOutlined />}
                onClick={async () => {
                  await copyToClipboard(token)
                  message.success('已经复制', 1)
                }}
              />
            </Tooltip>
          }
          disabled
          value={token}
        />
      </ProCard>
    </>
  )
}
