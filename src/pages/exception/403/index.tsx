import React from 'react'
import { Result, Button } from 'antd'

export default () => (
  <Result
    status="403"
    title="403"
    style={{
      background: 'none',
    }}
    subTitle="Sorry, you don't have access to this page."
    extra={
      <a>
        <Button type="primary">Back to home</Button>
      </a>
    }
  />
)
