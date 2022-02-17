import React from 'react'
import { Alert, message } from 'antd'
import './LandingSignup.less'
import ProForm, { ProFormText } from '@ant-design/pro-form'

export default function LandingSignup() {
  return (
    <div className="landing-signup">
      <Alert
        message={
          <div className={'margin'}>
            Warning Text Warning Text Warning TextW arning Text Warning Text
            Warning TextWarning Text
          </div>
        }
        type="warning"
        closable
      />

      <div className="middle-part">
        <div className="bg">
          <div className="content">
            <div className="margin">
              <div className={'left-desc'}>
                <h1>Start Monitoring today.</h1>

                <p>
                  Sentry helps over 1M developers and 80K organizations see what
                  actually matters, solve errors and performance issues quicker,
                  and learn continuously about their application health - from
                  the frontend to the backend.
                </p>
              </div>

              <div className={'right-form'}>
                <p className={'title'}>Track in seconds</p>

                <ProForm
                  onFinish={async () => {
                    message.success('提交成功')
                  }}
                  syncToUrl={(values, type) => {
                    if (type === 'get') {
                      // 为了配合 transform
                      // startTime 和 endTime 拼成 createTimeRanger
                      return {
                        ...values,
                        createTimeRanger:
                          values.startTime || values.endTime
                            ? [values.startTime, values.endTime]
                            : undefined,
                      }
                    }
                    // expirationTime 不同步到 url
                    return {
                      ...values,
                      expirationTime: undefined,
                    }
                  }}
                  initialValues={{
                    name: '蚂蚁设计有限公司',
                    useMode: 'chapter',
                    organization: 't',
                  }}
                  autoFocusFirstInput
                >
                  <ProForm.Group>
                    <ProFormText width="sm" name="useMode" label="Name" />
                    <ProFormText
                      width="sm"
                      name="organization"
                      disabled
                      label="Organization"
                    />
                  </ProForm.Group>
                  <ProForm.Group>
                    <ProFormText width="sm" name="useMode" label="Email" />
                    <ProFormText width="sm" name="useMode" label="Password" />
                  </ProForm.Group>
                </ProForm>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
