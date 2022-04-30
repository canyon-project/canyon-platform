import React, {useEffect, useState} from 'react'
import {DownOutlined} from "@ant-design/icons";
import type { ProSettings } from '@ant-design/pro-layout'
import ProLayout, { PageContainer, SettingDrawer } from '@ant-design/pro-layout'
import defaultProps from './_defaultProps'
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

  function itemRender(route: any, params: any, routes: any, paths: any) {
    const last = routes.indexOf(route) === routes.length - 1
    return last ? (
      <span>{route.breadcrumbName}</span>
    ) : (
      <Link to={paths.join('/')}>{route.breadcrumbName}</Link>
    )
  }

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
  }, [uLocation.pathname])

  return (
    <div
      id="main-box">
      <ProLayout
        title={'Canyon'}
        logo={logoPng}
        {...defaultProps}
        location={{
          pathname,
        }}
        breadcrumbProps={{
          itemRender,
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
          <div>
            <Dropdown overlay={RightMenu}>
              <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
                <Avatar src={userinfo.avatar} style={{marginRight:'14px'}} />
                {userinfo.username} <DownOutlined />
              </a>
            </Dropdown>
          </div>
        )}
        {...settings}
      >
        <PageContainer
        >
          <div>
            <Outlet />
            <HelpButton/>
          </div>
        </PageContainer>
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
