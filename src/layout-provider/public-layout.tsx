"use client";
import React from 'react'

function PublicLayout({children} : {
  children: React.ReactNode

}) {
  return (
    <div style={{marginTop:'75px'}}>
      {children}
    </div>
  )
}

export default PublicLayout