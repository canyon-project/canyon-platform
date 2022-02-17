import React, { useRef } from 'react'
import { message } from 'antd'
import type { ProFormInstance } from '@ant-design/pro-form'
import ProForm, {
  ProFormText,
} from '@ant-design/pro-form'
import { ProjectService } from '../../services/ProjectService'
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
  const formRef: any = useRef<
    ProFormInstance<{
      repoId?: string
      codeHouseId?: number
    }>
  >()
  return (
    <div style={{ backgroundColor: 'white', padding: '20px' }}>
      <ProForm<{
        company?: string
        useMode?: string
      }>
        onFinish={async () => {
          await waitTime(100)
          const val2 =
            await formRef.current?.validateFieldsReturnFormatValue?.()
          if (params.id === '-1') {
            await ProjectService.createAProject({
              ...val2,
            })
            message.success('创建成功')
          } else {
            await ProjectService.updateAProject({
              ...val2,
              id: params.id,
            })
            message.success('更新')
          }
        }}
        formRef={formRef}
        params={{ id: '100' }}
        formKey="base-form-use-demo"
        request={async () => {
          let retrieveACodeHouseRes: any = {}
          if (params.id === '-1') {
            retrieveACodeHouseRes = {
              repoId: '',
              codeHouseId: '',
            }
            await waitTime(100)
          } else {
            retrieveACodeHouseRes = await ProjectService.retrieveAProject({
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
            name="repoId"
            label="仓库ID"
            placeholder="请输入仓库ID"
          />
          <ProFormText
            width="md"
            name="codeHouseId"
            label="源ID"
            placeholder="请输入源ID"
          />
        </ProForm.Group>
      </ProForm>
    </div>
  )
}
