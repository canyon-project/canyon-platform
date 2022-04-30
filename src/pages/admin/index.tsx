import React, { useState } from 'react'
import {Avatar, Button, Input, List, message, Tabs} from 'antd'
import ProCard from '@ant-design/pro-card'
import './index.less'
import { SecurityTab } from './components/Security'
import {PageContainer} from "@ant-design/pro-layout";
import {copyToClipboard} from "../../utils/util";
import ChangePassword from "./components/ChangePassword";
const { TabPane } = Tabs;

const NaviBtn = (props: any) => {
  const { name, currentTab, setTab } = props
  return (
    <Button
      className={`userSettingBtn ${currentTab === name ? 'currentTab' : ''}`}
      block
      type="link"
      onClick={(e) => setTab(name)}
    >
      {name}
    </Button>
  )
}

export default function Admin() {
  const [currentTab, setTab] = useState('Security')

  const [tabActiveKey,setTabActiveKey] = useState('安全设置')

  // 生成当前页组件
  const generateContent = () => {
    switch (currentTab) {
      case 'Security':
        return <SecurityTab />
      case '123':
        return <div>123</div>
    }
  }
  const data = [
    'Racing car sprays burning fuel into crowd.',
  ];

  return (
    <div style={{backgroundColor:'white'}}>
      <Tabs activeKey={tabActiveKey} tabPosition={'left'} onChange={(key)=>{
        setTabActiveKey(key)
      }}>
        <TabPane tab="安全设置" key="安全设置">
          <div>
            {/*<h1>安全设置</h1>*/}
            <List
              size="large"
              header={<h3>安全设置</h3>}
              dataSource={data}
              renderItem={item => (
                <div>
                  {/*<List.Item actions={[<ChangePassword></ChangePassword>]}>*/}
                  {/*  <List.Item.Meta*/}
                  {/*    title={<span>账号密码</span>}*/}
                  {/*    description="在这里可以修改您的密码"*/}
                  {/*  />*/}
                  {/*</List.Item>*/}
                  <List.Item actions={[<a onClick={()=>{
                    copyToClipboard(localStorage.getItem('token')).then(res=>{
                      message.success('已经复制', 1)
                    })
                  }}>复制</a>]}>
                    <List.Item.Meta
                      title={<span>鉴权令牌</span>}
                      description={<div className={'ellipsis'}>{localStorage.getItem('token')}</div>}
                    />
                  </List.Item>
                </div>)}
            />
          </div>
        </TabPane>
      </Tabs>
    </div>
  )
}
