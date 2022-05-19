import React from 'react'
import logoSvg from '../assets/img/logo.svg'

export default function Logo(props: any) {
  return (
    <>
      <a
        style={{
          color: '#333',
          display: 'flex',
          alignItems: 'center',
          paddingLeft: '20px',
        }}
        href={'/'}
      >
        <img style={{ width: '30px' }} src={logoSvg} alt="" />
        <span style={{ fontSize: '16px', marginLeft: '8px' }}>Canyon</span>
      </a>
    </>
  )
}
