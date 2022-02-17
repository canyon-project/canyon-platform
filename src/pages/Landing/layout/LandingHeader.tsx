import React, { useEffect, useState, useRef, useReducer } from 'react'
import { Button, Dropdown, Menu } from 'antd'
import './LandingHeader.less'
import logoSvg from '../../../assets/img/logo.svg'
import languageSvg from '../../../assets/img/language.svg'
import { DownOutlined } from '@ant-design/icons'
import { useTranslation } from 'react-i18next'
import Logo from '../../../components/Logo'
import { useNavigate } from "react-router-dom";

export default function LandingHeader() {
  const { t, i18n } = useTranslation()
  const lang = localStorage.getItem('lang') || 'zh_CN'
  const history = useNavigate()

  const langMap = [
    {
      label: '🇨🇳 简体中文',
      value: 'zh_CN',
    },
    {
      label: '🇺🇸 English',
      value: 'en_US',
    },
  ]

  function setLang(value: string) {
    localStorage.setItem('lang', value)
    window.location.reload()
  }

  const menu = (
    <Menu>
      {langMap.map((item) => (
        <Menu.Item>
          <a
            onClick={() => {
              setLang(item.value)
            }}
          >
            {item.label}
          </a>
        </Menu.Item>
      ))}
    </Menu>
  )

  return (
    <div className={'landing-header'}>
      <div className="margin">
        <Logo />

        <div className={'right'}>
          <ul className={'nav-list'}>
            <li
            >
              {t('文档')}
            </li>
            <li>{t('登录')}</li>
          </ul>

          <Button
            onClick={() => history('/signup')}
            shape="round"
            type={'primary'}
          >
            {t('开始使用')}
          </Button>

          <Dropdown overlay={menu}>
            <div className={'language'}>
              {/*<img src={languageSvg} alt=""/>*/}
              <span>{langMap.find((item) => item.value === lang)?.label}</span>
              <DownOutlined />
            </div>
          </Dropdown>
        </div>
      </div>
    </div>
  )
}
