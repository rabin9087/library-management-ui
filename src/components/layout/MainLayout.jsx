import React from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

export const MainLayout = ({children}) => {
  return (
    <div>
      <Header/>
      <main className='main'>{children}</main>
      <Footer/>
    </div>
  )
}

