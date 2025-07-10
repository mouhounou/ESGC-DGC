import React from 'react'
import Navbar from './component/Navbar'
import Hero from './component/Hero'
import Why from './component/Why'
import Formations from './component/Formations'


function App() {
  return (
    <div className='bg-slate-50'>
      <Navbar />
      <div className='px-[5%]'>
        <Hero />
        <Why />
        <Formations/>
      </div>
    </div>
  )
}

export default App