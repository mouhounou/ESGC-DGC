import React, { useState } from 'react'
import Navbar from './component/Navbar'
import Hero from './component/Hero'
import About from './component/About'
import Parcours from './component/Parcours'
import CtaBanner from './component/CtaBanner'
import Why from './component/Why'
import Formations from './component/Formations'
import Debouches from './component/Debouches'
import JoinCta from './component/JoinCta'
import ContactSection from './component/ContactSection '
import Footer from './component/Footer'
import { ToastContainer } from 'react-toastify'

function App() {
  const [prefillEmail, setPrefillEmail] = useState('')

  return (
    <div className='bg-white overflow-x-hidden'>
      <ToastContainer/>
      <Navbar />
      <Hero />
      <About />
      <Parcours />
      <CtaBanner onEmail={setPrefillEmail} />
      <Why />
      <Formations />
      <Debouches />
      <JoinCta />
      <ContactSection prefillEmail={prefillEmail} />
      <Footer/>
    </div>
  )
}

export default App
