import React from 'react'
import Navbar from '../ui/Navbar'
import Footer from '../ui/Footer'

const MainLayout = ({ children }) => {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="flex-grow container mx-auto max-w-7xl">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default MainLayout
