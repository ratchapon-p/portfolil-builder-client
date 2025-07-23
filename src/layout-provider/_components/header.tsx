import React from 'react'
import './header.css'
import { Button } from 'antd'
import Link from 'next/link'

const menuItem = [
  {
    title: 'Profile',
    path: '/account/profile'
  },
  {
    title: 'Education',
    path: '/account/education'
  },
  {
    title: 'Experience',
    path: '/account/experience'
  },
  {
    title: 'Skill',
    path: '/account/skill'
  },
  {
    title: 'Contact',
    path: '/account/contact'
  },
  {
    title: 'Certificate',
    path: '/account/certificate'
  }
]

function Header() {

  

  return (
    <div className='main-header'>
      <div className="header-content">
        <div className=""><h1 style={{margin: 0}}>PORTFOLIO BUILDER</h1></div>
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