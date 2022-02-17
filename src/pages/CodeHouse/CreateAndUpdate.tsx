import React, { useRef } from 'react'
import { message } from 'antd'
import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm, {
  ProFormText,
} from '@ant-design/pro-form'
import { CodeHouseService } from '../../services/CodeHouseService'
import { useParams } from "react-router-dom";


const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true)
    }, time)
  })
}

export default (props: any) => {
  const params = useParams();
  const formRef:any = useRef<
    ProFormInstance<{
      gitUrl?: string
      apiVersion?: string
      token?: string
    }>
  >()
  return (
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <ProForm<{
        apiVersion?: string
        company?: string
        useMode?: string
      }>
        onFinish={async (values) => {
          await waitTime(100)
          const val2 =
            await formRef.current?.validateFieldsReturnFormatValue?.()
          if (params.id === '-1') {
            await CodeHouseService.createACodeHouse({
              ...val2,
            })
            message.success('创建成功')
          } else {
            await CodeHouseService.updateACodeHouse({
              ...val2,
              id: params.id,
            })
            message.success('更新')
          }
        }}
        formRef={formRef}
        formKey="base-form-use-demo"
        request={async () => {
          let retrieveACodeHouseRes: any = {}
          if (params.id === '-1') {
            retrieveACodeHouseRes = {
              apiVersion: '',
              gitUrl: '',
              token: '',
            }
            await waitTime(100)
          } else {
            retrieveACodeHouseRes =
              await CodeHouseService.retrieveACodeHouse({
                id: params.id,
              })
          }
          return retrieveACodeHouseRes
        }}
        autoFocusFirstInput
      >
        <ProForm.Group>
          <ProFormText
            width="md"
            name="gitUrl"
            label="源地址"
            placeholder="请输入源地址"
          />
          <ProFormText
            width="md"
            name="apiVersion"
            label="源名称"
            placeholder="请输入源名称"
          />
        </ProForm.Group>
        <ProForm.Group>
          <ProFormText
            width="md"
            name="token"
            label="token"
            placeholder="请输入token"
          />
        </ProForm.Group>
      </ProForm>
    </div>
  )
}
