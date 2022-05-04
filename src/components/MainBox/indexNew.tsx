import React, {useEffect, useState} from 'react'
import {DownOutlined} from "@ant-design/icons";
import type { ProSettings } from '@ant-design/pro-layout'
import ProLayout, { PageContainer, SettingDrawer } from '@ant-design/pro-layout'
import {Outlet, useNavigate, Link, useLocation} from 'react-router-dom'
import logoPng from "../../assets/img/light-logo.svg";
import {useDispatch, useSelector} from "react-redux";
import './index.less'
import HelpButton from "../HelpButton";
import {Avatar, Dropdown, Menu} from 'antd';
import {useMount} from "ahooks";
import {UserService} from "../../services/UserService";
import { set } from '../../redux/action/userinfo'

export default () => {
  const userinfo: any = useSelector((state) => state)
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  })
  const [pathname, setPathname] = useState('/')
  const history = useNavigate()
  const uLocation = useLocation()
  const dispatch = useDispatch()

  const RightMenu = (
    <Menu>
      <Menu.Item key={'logout'}>
        <a onClick={()=>{
          localStorage.clear()
          window.location.reload()
        }}>
          退出登录
        </a>
      </Menu.Item>
    </Menu>
  );

  useMount(() => {
    UserService.getuserinfo().then((res) => {
      dispatch(set(res))
    }).catch(err=>{
      localStorage.clear()
      history('/welcome')
    })
  });

  useEffect(() => {
    setPathname(uLocation.pathname)
    console.log(uLocation,'uLocation')
  }, [uLocation.pathname])

  return (
    <div
      id="main-box">
      <ProLayout
          collapsed
        title={'Canyon'}
        logo={logoPng}
        menuDataRender={() => [
          {
            path: '/user',
            name: '个人信息',
              hideInMenu:true
          },
          {
            path: '/:p/:o',
            name: '存储库',
            hideInMenu:true
          },
        ]}
        location={{
          pathname,
        }}
        // breadcrumbProps={{
        //   itemRender,
        // }}
        breadcrumbRender={(routers = []) => {
          console.log(routers,'123')
          if (routers[0]?.breadcrumbName === '存储库'){
            return [
              // {
              //   path: '/',
              //   breadcrumbName: '主页',
              // },
              {
                path: '/',
                breadcrumbName: 'Dashboard',
              },
              ...routers,
            ]
          } else {
            return [
              // {
              //   path: '/',
              //   breadcrumbName: '主页',
              // },
              // {
              //   path: '/',
              //   breadcrumbName: '测试页',
              // },
              ...routers,
            ]
          }

        }}
        onMenuHeaderClick={(e) => {
          history('/')
        }}
        menuItemRender={(item: any, dom) => {
          return (
            <a
              onClick={() => {
                history(item.path)
              }}
            >
              {dom}
            </a>
          )
        }}
        rightContentRender={() => (
            <div></div>
        )}
          menuFooterRender={(props) => {
            return (
                <a
                    style={{
                      lineHeight: '48rpx',
                      display: 'flex',
                      height: 48,
                      color: 'rgba(255, 255, 255, 0.65)',
                      alignItems: 'center',
                    }}
                    onClick={()=>{
                      history('/user')
                    }}
                    target="_blank"
                    rel="noreferrer"
                >
                  <img
                      alt="pro-logo"
                      src={userinfo.avatar}
                      style={{
                        width: 24,
                        height: 24,
                        margin: '0 12px',
                        borderRadius:'50%'
                      }}
                  />
                </a>
            );
          }}
        {...settings}
      >


        <div>
          <Outlet />
          <HelpButton/>
        </div>
      </ProLayout>
      <SettingDrawer
        pathname={pathname}
        getContainer={() => document.getElementById('test-pro-layout')}
        settings={settings}
        onSettingChange={(changeSetting) => {
          setSetting(changeSetting)
        }}
        disableUrlParams
      />
    </div>
  )
}
