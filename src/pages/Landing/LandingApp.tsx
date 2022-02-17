import React, { Suspense } from 'react'
import { HashRouter } from 'react-router-dom'
import { Spin } from 'antd'
import './LandingApp.less'
import LandingHeader from './layout/LandingHeader'
import LandingFooter from './layout/LandingFooter'
export default function LandingApp(props: any) {
  return (
    <div className={'landing-app'}>
      <Suspense
        fallback={
          <div
            style={{
              width: '100%',
              height: '100%',
              textAlign: 'center',
              paddingTop: '60px',
            }}
          >
            <Spin />
          </div>
        }
      >
        <LandingHeader />
        <LandingFooter />
      </Suspense>
    </div>
  )
}
