import React from 'react'
import './Header.css'
import { Button } from 'antd'
import Link from 'next/link'

const menuItem = [
  {
    title: 'Home',
    path: '/'
  },
  {
    title: 'About',
    path: '/about'
  },
  {
    title: 'Contact',
    path: '/contact'
  },
  {
    title: 'Sign in',
    path: '/auth?type=login'
  },
  {
    title: 'Sign up',
    path: '/auth?type=register'
  }
]

function Header() {

  return (
    <div className='main-header'>
      <div className="header-content">
        <div className=""><h1>PORTFOLIO BUILDER</h1></div>
        <div className="header-col">
          {menuItem.map((x,index) =>{
            if (["Sign in","Sign up"].includes(x.title)) {
              return (
                <Link className='header-link' href={x.path} key={index}>
                  {
                    x.title == "Sign in" ? 
                    <Button key={index} className='header-selector-tab' type='primary'>{x.title}</Button>
                    :
                    <Button key={index} className='header-selector-tab' type='default'>{x.title}</Button>
                  }
                </Link>
              )

            }else{
              return (
                <Link className='header-link' href={x.path} key={index}>
                  <div className='header-selector-tab' style={{display:'flex', alignItems:'center'}} key={index}>{x.title}</div>
                </Link>
              )
            }
          })}
        </div>
      </div>
    </div>
  )
}

export default Header