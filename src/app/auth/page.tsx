"use client"

import React from 'react'
import Header from '@/components/ui/header/Header'
import { useSearchParams } from 'next/navigation'
import LoginComponent from '@/components/ui/auth/LoginComponent'
import RegisterComponent from '@/components/ui/auth/RegisterComponent'

function AuthPage() {
    const searchParam = useSearchParams()
    const type = searchParam.get("type")

  return (
    <div>
        <Header />

        <div className="">
          {
            type == "login" ?
              <LoginComponent />
            :
              <RegisterComponent />
          }
        </div>
    </div>
  )
}

export default AuthPage