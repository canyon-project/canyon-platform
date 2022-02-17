import React, { useState } from 'react'
import {Button, Form, Input, message} from "antd";
import './index.less'
import {UserService} from "../../services/UserService";
import {useNavigate} from "react-router-dom";
import Logo from "../../components/Logo";

export default function Login() {
  const history = useNavigate()
  enum LoginStatusEnum {Init, LoginWithEmail, ResetPassword, SignUp};
  const [loginStatus,setLoginStatus] = useState<LoginStatusEnum>(LoginStatusEnum.Init)
  const [form] = Form.useForm();

  const onFinish = (values: any) => {
    console.log('Success:', values);
  };
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const isShow = (b:boolean)=>{
    if (b){
      return {}
    } else {
      return {display:'none'}
    }
  }
  return (
    <>
      <div className={'login'} style={{backgroundColor:'rgb(255, 254, 252)',width:'100vw',height:'100vh'}}>
        <div className="margin logo">
          <Logo></Logo>
        </div>
        <div className="middle-box margin">
          <div className={'form-wrap'}>
            {/*  五种状态*/}
            {/*  1.初始状态 Init*/}
            {/*  2.点击 "ContinueWithPassword" 检测到账号 CheckEmail*/}
            {/*  3.点击 "ContinueWithPassword" 未检测到账号 SignUp*/}
            {/*  4.点击忘记密码到 ResetPassword*/}
            {/*</p>*/}
            {/*<p>debug:{*/}
            {/*  JSON.stringify({*/}
            {/*    loginStatus*/}
            {/*  })*/}
            <h1>登录</h1>
            <Form
              style={{width:'300px'}}
              layout="vertical"
              name="basic"
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              autoComplete="off"
              form={form}
            >
              <Form.Item
                label="邮箱"
                name="email"
                rules={[{ required: true, message: '请输入邮箱' }]}
              >
                <Input placeholder={'输入你的邮箱地址'} />
              </Form.Item>
              <p style={{...isShow([LoginStatusEnum.SignUp].includes(loginStatus))}}>我们刚刚给您发送了一个临时注册代码。请检查您的收件箱并粘贴下面的注册代码。</p>

              <Form.Item
                style={{...isShow([LoginStatusEnum.LoginWithEmail].includes(loginStatus))}}
                label="密码"
                name="password"
              >
                <Input.Password placeholder={'输入你的密码'} />
              </Form.Item>

              <Form.Item
                style={{...isShow([LoginStatusEnum.SignUp].includes(loginStatus))}}
                label="注册码"
                name="signUpCode"
              >
                <Input placeholder={'输入你的注册码'} />
              </Form.Item>

              <Form.Item style={{...isShow([LoginStatusEnum.Init].includes(loginStatus))}}>
                <Button type="primary" onClick={()=>{
                  UserService.checkEmailType({email:form.getFieldValue('email')}).then(res=>{
                    if (res.hasAccount){
                      setLoginStatus(LoginStatusEnum.LoginWithEmail)
                    } else {
                      setLoginStatus(LoginStatusEnum.SignUp)
                    }
                  })
                }}>
                  用邮箱继续
                </Button>
              </Form.Item>

              <Form.Item style={{...isShow([LoginStatusEnum.LoginWithEmail].includes(loginStatus))}}>
                <Button type="primary" onClick={()=>{
                  UserService.login({username:form.getFieldValue('email'),password:form.getFieldValue('password')}).then(res=>{
                    if (res.token){
                      localStorage.setItem('token',res.token)
                      history('/')
                    }
                  })
                }}>
                  用密码继续
                </Button>
              </Form.Item>
              <Form.Item style={{...isShow([LoginStatusEnum.ResetPassword].includes(loginStatus))}}>
                <Button type="primary" onClick={()=>{
                  UserService.getActivatedAccountPassword({email:form.getFieldValue('email')}).then(res=>{
                    message.success('密码已发送至您的邮箱')
                  })
                }}>
                  发送密码到您的邮箱
                </Button>
              </Form.Item>
              <Form.Item>
                <a style={{...isShow([LoginStatusEnum.LoginWithEmail,LoginStatusEnum.Init].includes(loginStatus))}} onClick={()=>{
                  setLoginStatus(LoginStatusEnum.ResetPassword)
                }}>忘记密码？</a>
                <p style={{...isShow([LoginStatusEnum.ResetPassword,LoginStatusEnum.SignUp,LoginStatusEnum.LoginWithEmail].includes(loginStatus))}} onClick={()=>{
                  setLoginStatus(LoginStatusEnum.Init)
                }}>你也可以
                  <a>继续用邮箱</a>
                </p>
              </Form.Item>

              <Form.Item style={{...isShow([LoginStatusEnum.SignUp].includes(loginStatus))}}>
                <Button type="primary"  onClick={()=>{
                  UserService.sendTemporaryPassword({email:form.getFieldValue('email'),password: form.getFieldValue('signUpCode')}).then(res=>{
                    if (res.token){
                      localStorage.setItem('token',res.token)
                      history('/')
                    }

                  })
                }}>
                  创建一个账户
                </Button>
              </Form.Item>

              {/*sendTemporaryPassword*/}

            </Form>
          </div>
        </div>
      </div>
    </>
  )
}
