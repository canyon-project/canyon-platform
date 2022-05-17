import React, {useState} from 'react'
import {Button, List, message, Tabs} from 'antd'
import './index.less'
import {PageContainer} from "@ant-design/pro-layout";
import {copyToClipboard} from "../../utils/util";

const {TabPane} = Tabs;

export default function Admin() {
    const [tabActiveKey, setTabActiveKey] = useState('安全设置')
    const data = [
        'Racing car sprays burning fuel into crowd.',
    ];

    return (
        <PageContainer>
            <div style={{position: 'absolute', right: 0, top: 0}}>
                <Button type={'primary'}
                        onClick={() => {
                            localStorage.clear()
                            window.location.reload()
                        }}>登出</Button>
            </div>
            <div style={{backgroundColor: 'white'}}>
                <Tabs activeKey={tabActiveKey} tabPosition={'left'} onChange={(key) => {
                    setTabActiveKey(key)
                }}>
                    <TabPane tab="安全设置" key="安全设置">
                        <div>
                            <List
                                size="large"
                                header={<h3>安全设置</h3>}
                                dataSource={data}
                                renderItem={item => (
                                    <div>
                                        <List.Item actions={[<a onClick={() => {
                                            copyToClipboard(localStorage.getItem('token')).then(res => {
                                                message.success('已经复制', 1)
                                            })
                                        }}>复制</a>]}>
                                            <List.Item.Meta
                                                title={<span>鉴权令牌</span>}
                                                description={<div
                                                    className={'ellipsis'}>{localStorage.getItem('token')}</div>}
                                            />
                                        </List.Item>
                                    </div>)}
                            />
                        </div>
                    </TabPane>
                </Tabs>
            </div>
        </PageContainer>
    )
}
