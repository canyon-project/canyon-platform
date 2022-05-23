import React, { useState } from 'react'
import { Button, List, message, Tabs } from 'antd'
import './index.less'
import { PageContainer } from '@ant-design/pro-layout'
import { copyToClipboard } from '../../utils/util'

const { TabPane } = Tabs

export default function Admin() {
  const [tabActiveKey, setTabActiveKey] = useState('Security')
  const data = ['Racing car sprays burning fuel into crowd.']

  return (
    <PageContainer>
      <div style={{ position: 'absolute', right: 0, top: 0 }}>
        <Button
          type={'primary'}
          onClick={() => {
            localStorage.clear()
            window.location.reload()
          }}
        >
            Logout
        </Button>
      </div>
      <div style={{ backgroundColor: 'white' }}>
        <Tabs
          activeKey={tabActiveKey}
          tabPosition={'left'}
          onChange={(key) => {
            setTabActiveKey(key)
          }}
        >
          <TabPane tab="Security" key="Security">
            <div>
              <List
                size="large"
                header={<h3>Security</h3>}
                dataSource={data}
                renderItem={(item) => (
                  <div>
                    <List.Item
                      actions={[
                        <a
                          onClick={() => {
                            copyToClipboard(localStorage.getItem('token')).then(
                              (res) => {
                                message.success('Already copied', 1)
                              },
                            )
                          }}
                        >
                          Copy
                        </a>,
                      ]}
                    >
                      <List.Item.Meta
                        title={<span>Auth Tokens</span>}
                        description={
                          <div className={'ellipsis'}>
                            {localStorage.getItem('token')}
                          </div>
                        }
                      />
                    </List.Item>
                  </div>
                )}
              />
            </div>
          </TabPane>
        </Tabs>
      </div>
    </PageContainer>
  )
}
