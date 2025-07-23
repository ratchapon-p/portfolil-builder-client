'use client'
import React, { useState } from 'react'
import './header.css'
import { Button } from 'antd'
import Link from 'next/link'
import { MenuOutlined, CloseOutlined } from '@ant-design/icons'

const menuItem = [
  { title: 'Profile', path: '/account/profile' },
  { title: 'Education', path: '/account/education' },
  { title: 'Experience', path: '/account/experience' },
  { title: 'Skill', path: '/account/skill' },
  { title: 'Certificate', path: '/account/certificate' },
  { title: 'Contact', path: '/account/contact' },
]

function Header() {
  const [open, setOpen] = useState(false)

  return (
    <div className='main-header'>
      <div className="header-content">
        <h1 style={{ margin: 0 }}>PORTFOLIO BUILDER</h1>
        <div className="hamburger" onClick={() => setOpen(!open)}>
          {open ? <CloseOutlined /> : <MenuOutlined />}
        </div>
        <div className={`header-col ${open ? 'open' : ''}`}>
          {menuItem.map((x, index) => (
            <Link className='header-link' href={x.path} key={index} onClick={() => setOpen(false)}>
              <div className='header-selector-tab'>{x.title}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Header
