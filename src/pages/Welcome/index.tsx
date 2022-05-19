import React, { useState, useTransition } from 'react'
import WelcomeSvg from '../../assets/img/sss.svg'
import logoSvg from '../../assets/img/logo.svg'
import './index.less'
import { Button } from 'antd'
import { useTranslation } from 'react-i18next'
const Welcome = () => {
  const { t } = useTranslation()
  function fn() {}

  return (
    <div className={'welcome'}>
      <div className={'left-box'}>
        <div className="login-form">
          <div className="logo">
            <img src={logoSvg} alt="" />
            <span>CANYON</span>
          </div>
          <h1 className={'title'}>
            {t('Hello')}，
            <br />
            欢迎来到Canyon。
          </h1>
          <p className={'desc'}>您将被重定向到源代码管理系统进行身份验证。</p>
          <Button
            type={'primary'}
            style={{ width: '100%' }}
            size={'large'}
            onClick={() => fn()}
          >
            继续
          </Button>
        </div>
      </div>
      <div className={'right-box'}>
        <div
          className={'img-wrap'}
          style={{ backgroundImage: `url(${WelcomeSvg})` }}
        >
          {/*<img src={WelcomeSvg}/>*/}
        </div>
      </div>
    </div>
  )
}

export default Welcome
