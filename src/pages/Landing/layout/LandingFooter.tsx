// <GithubOutlined />
import { GithubOutlined } from '@ant-design/icons'
import React from 'react'
import Logo from '../../../components/Logo'
import './LandingFooter.less'

export default function LandingFooter(props: any) {
  return (
    <div className={'landing-footer'}>
      <div className="margin">
        <div className={'left'}>
          <div className={'list'}>
            <div
              onClick={() => window.open('https://github.com/islin999/islin')}
              className={'list-item'}
            >
              <GithubOutlined />
              <span>GITHUB</span>
            </div>
          </div>

          <p>© 2021 Produced by zhangtao25</p>
        </div>

        <div className={'right'}>
          <Logo></Logo>
        </div>
      </div>
    </div>
  )
}
