import React, { useEffect, useState } from 'react'
import type { ProSettings } from '@ant-design/pro-layout'
import ProLayout, { SettingDrawer } from '@ant-design/pro-layout'
import { Outlet, useNavigate, useLocation } from 'react-router-dom'
import logoPng from '../../assets/img/light-logo.svg'
import './index.less'
import HelpButton from '../HelpButton'
import { useMount } from 'ahooks'
import { useTranslation } from 'react-i18next'
import { UserService } from '../../services/UserService'
import { useStore } from './../../store'

export default () => {
  // const userinfo: any = useSelector((state) => state)
  const userinfo = useStore((state) => state.userinfo)
  const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
    fixSiderbar: true,
  })
  const [pathname, setPathname] = useState('/')
  const navigate = useNavigate()
  const uLocation = useLocation()
  const { t } = useTranslation()
  const setUserinfo = useStore((state) => state.setUserinfo)

  useMount(() => {
    UserService.getuserinfo()
      .then((res) => {
        setUserinfo(res)
      })
      .catch((err) => {
        localStorage.clear()
        navigate('/welcome')
      })
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
            name: 'User Info',
            hideInMenu: true,
          },
          {
            path: '/:group/:repo',
            name: t('coverage') + ' ' + t('overview'),
            hideInMenu: true,
          },
          {
            path: '/:group/:repo/:commitSha',
            name: t('coverage') + ' ' + t('detail'),
            hideInMenu: true,
          },
        ]}
        location={{
          pathname,
        }}
        breadcrumbRender={(routers = []) => {
          if (routers[0]?.breadcrumbName === 'Coverage Overview') {
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
          navigate('/')
        }}
        menuItemRender={(item: any, dom) => {
          return (
            <a
              onClick={() => {
                navigate(item.path)
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
                navigate('/user')
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
                  borderRadius: '50%',
                }}
              />
            </a>
          )
        }}
        {...settings}
      >
        <div>
          {/*<div>{JSON.stringify(userinfo)}</div>*/}
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
