import { Result, Button } from 'antd'
import React from 'react'
export default () => (
  <Result
    status="404"
    title="404"
    style={{
      background: 'none',
    }}
    subTitle="Sorry, the page you visited does not exist."
    extra={
      <a>
        <Button type="primary">Back Home</Button>
      </a>
    }
  />
)
