import React, { useRef } from 'react';
import { Button, message } from 'antd';
import type { ProFormInstance } from '@ant-design/pro-form';
import ProForm, {
  DrawerForm,
  ProFormText,
  ProFormDateRangePicker,
  ProFormSelect,
} from '@ant-design/pro-form';
import { PlusOutlined } from '@ant-design/icons';
import {useSelector} from "react-redux";
import {UserService} from "../../../services/UserService";

const waitTime = (time: number = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

export default () => {
  const formRef = useRef<ProFormInstance>();
  const userinfo: any = useSelector((state) => state)

  return (
    <DrawerForm<{
      name: string;
      company: string;
    }>
      title="修改密码"
      formRef={formRef}
      trigger={
        <a>修改</a>
      }
      autoFocusFirstInput
      drawerProps={{
        forceRender: true,
        destroyOnClose: true,
      }}
      onFinish={async (values) => {
        const params = values
        const res = await UserService.changePassword(params)
        if (res){
          message.success('修改成功')
        }
        return true;
      }}
    >
      <ProForm.Group>
        <ProFormText disabled={true} initialValue={userinfo.email} width="md" name="email" label="邮箱" placeholder="请输入邮箱" />
        <ProFormText width="md" name="oldPassword" label="旧密码" placeholder="请输入旧密码" />
      </ProForm.Group>
      <ProForm.Group>
        <ProFormText width="md" name="newPassword" label="新密码" placeholder="请输入新密码" />
      </ProForm.Group>
    </DrawerForm>
  );
};
