"use client";
import React, { useEffect, useState } from 'react'
import PrivateLayoutHeader from './_components/header'
import toast from 'react-hot-toast'
import { useRouter } from 'next/navigation'

function PrivateLayout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState<boolean>(true)
  const router = useRouter()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')

    if (!isLoggedIn) {
      toast.error('Please login first')
      router.push('/login')
    } else {
      setLoading(false)
    }
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    )
  }

  return (
    <div>
      <PrivateLayoutHeader  />
      <div className="" style={{padding: "20px 25px",marginTop:'75px'}}>
        {children}
      </div>
    </div>
  )
}

export default PrivateLayout
