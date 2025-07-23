'use client'
import React, { useState } from 'react'
import './Header.css'
import { Button } from 'antd'
import Link from 'next/link'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'

const menuItem = [
  { title: 'Home', path: '/' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
  { title: 'Sign in', path: '/auth?type=login' },
  { title: 'Sign up', path: '/auth?type=register' }
]

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <div className='main-header'>
      <div className="header-content">
        <div className="">
          <h1 style={{ margin: 0 }}>PORTFOLIO BUILDER</h1>
        </div>
        <div className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <CloseOutlined /> : <MenuOutlined />}
        </div>
        <div className={`header-col ${open ? 'open' : ''}`}>
          {menuItem.map((x, index) => {
            const isAuth = ["Sign in", "Sign up"].includes(x.title)
            return (
              <Link className='header-link' href={x.path} key={index} onClick={() => setOpen(false)}>
                {isAuth ? (
                  <Button className='header-selector-tab' type={x.title === "Sign in" ? "primary" : "default"}>
                    {x.title}
                  </Button>
                ) : (
                  <div className='header-selector-tab'>{x.title}</div>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Header
