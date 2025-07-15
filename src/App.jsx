import React from 'react'
import Navbar from './component/Navbar'
import Hero from './component/Hero'
import Why from './component/Why'
import Formations from './component/Formations'
import ContactSection from './component/ContactSection '
import Footer from './component/Footer'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    <div className=' bg-slate-50'>
      <ToastContainer/>
      <Navbar />
      <div className='px-[2%] md:px-[5%]'>
        <Hero />
        <Why />
        <Formations />
        <ContactSection />
        <Footer/>
      </div>
      {/* detaile de chaque formation */}
    </div>
  )
}

export default App