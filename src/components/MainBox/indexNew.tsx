import React, {useEffect, useState} from 'react'
import type {ProSettings} from '@ant-design/pro-layout'
import ProLayout, {SettingDrawer} from '@ant-design/pro-layout'
import {Outlet, useNavigate, useLocation} from 'react-router-dom'
import logoPng from "../../assets/img/light-logo.svg";
import {useDispatch, useSelector} from "react-redux";
import './index.less'
import HelpButton from "../HelpButton";
import {useMount} from "ahooks";
import {UserService} from "../../services/UserService";
import {set} from '../../redux/action/userinfo'

export default () => {
    const userinfo: any = useSelector((state) => state)
    const [settings, setSetting] = useState<Partial<ProSettings> | undefined>({
        fixSiderbar: true,
    })
    const [pathname, setPathname] = useState('/')
    const navigate = useNavigate()
    const uLocation = useLocation()
    const dispatch = useDispatch()
    useMount(() => {
        UserService.getuserinfo().then((res) => {
            dispatch(set(res))
        }).catch(err => {
            localStorage.clear()
            navigate('/welcome')
        })
    });
    useEffect(() => {
        setPathname(uLocation.pathname)
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
                        hideInMenu: true
                    },
                    {
                        path: '/:group/:repo',
                        name: '覆盖率概览',
                        hideInMenu: true
                    },
                    {
                        path: '/:group/:repo/:commitSha',
                        name: '覆盖率详情',
                        hideInMenu: true
                    },
                ]}
                location={{
                    pathname,
                }}
                breadcrumbRender={(routers = []) => {
                    if (routers[0]?.breadcrumbName === '覆盖率概览') {
                        return [
                            {
                                path: '/',
                                breadcrumbName: 'Dashboard',
                            },
                            ...routers,
                        ]
                    } else {
                        return [
                            ...routers,
                        ]
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
                                    borderRadius: '50%'
                                }}
                            />
                        </a>
                    );
                }}
                {...settings}
            >
                <div>
                    <Outlet/>
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
