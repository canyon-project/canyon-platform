import React, { useEffect, useState } from 'react'
import type { ProSettings } from '@ant-design/pro-layout'
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import logoPng from '../../assets/img/light-logo.svg'
import './index.less'
import HelpButton from '../HelpButton'
import { useMount } from 'ahooks'

export default () => {
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  })
  const [pathname, setPathname] = useState('/')
  const history = useNavigate()
  const uLocation = useLocation()

  useMount(() => {
  })

  useEffect(() => {
    setPathname(uLocation.pathname)
    console.log(uLocation, 'uLocation')
  }, [uLocation.pathname])

  return (
    <div id="main-box">
      <ProLayout
        collapsed
        title={'Canyon'}
        logo={logoPng}
        menuDataRender={() => [
          {
            path: '/user',
            name: '个人信息',
            hideInMenu: true,
          },
          {
            path: '/:p/:o',
            name: '覆盖率概览',
            hideInMenu: true,
          },
          {
            path: '/:p/:o/:commit',
            name: '覆盖率详情',
            hideInMenu: true,
          },
        ]}
        location={{
          pathname,
        }}
        breadcrumbRender={(routers = []) => {
          console.log(routers, '123')
          if (routers[0]?.breadcrumbName === '覆盖率概览') {
            return [
              {
                path: '/',
                breadcrumbName: 'Dashboard',
              },
              ...routers,
            ]
          } else {
            return [...routers]
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
        rightContentRender={() => <div></div>}
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
              onClick={() => {
                history('/user')
              }}
              target="_blank"
              rel="noreferrer"
            >
            </a>
          )
        }}
        {...settings}
      >
        <div>
          <Outlet />
          <HelpButton />
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
