import React from 'react'
import { MotionConfig } from 'framer-motion'
import Navbar from './component/Navbar'
import Hero from './component/Hero'
import About from './component/About'
import Parcours from './component/Parcours'
import Why from './component/Why'
import Formations from './component/Formations'
import Debouches from './component/Debouches'
import Candidature from './component/Candidature'
import JoinCta from './component/JoinCta'
import ContactSection from './component/ContactSection '
import Footer from './component/Footer'
import { ToastContainer } from 'react-toastify'

function App() {
  return (
    // « réduire les animations » : les apparitions au défilement se limitent à un fondu
    <MotionConfig reducedMotion="user">
    <div className='bg-white overflow-x-hidden'>
      <ToastContainer/>
      <Navbar />
      <main>
      <Hero />
      <About />
      <Parcours />
      <Why />
      <Formations />
      <Debouches />
      <Candidature />
      <JoinCta />
      <ContactSection />
      </main>
      <Footer/>
    </div>
    </MotionConfig>
  )
}

export default App
