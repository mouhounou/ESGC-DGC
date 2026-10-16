import { useState } from 'react'
import { toast } from 'react-toastify'
import { assets } from '../assets'

// Bandeau sombre : l'email saisi pré-remplit le formulaire de contact
function CtaBanner({ onEmail }) {
   const [email, setEmail] = useState('')

   const toSubmit = (e) => {
      e.preventDefault()
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
         toast.error('Adresse email invalide')
         return
      }
      onEmail(email)
      setEmail('')
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
   }

   return (
      <section className='max-w-7xl mx-auto px-4 md:px-8'>
         <div className='relative overflow-hidden rounded-3xl bg-deep text-white px-6 sm:px-12 pt-12 lg:py-14 flex flex-col lg:flex-row items-center gap-8'>
            <div className='absolute -right-10 -top-10 w-72 h-72 bg-second/40 blur-3xl rounded-full' />
            <div className='relative z-10 flex-1 lg:pr-72'>
               <h2 className='font-kaushan text-3xl md:text-5xl leading-tight'>
                  Quelle formation est faite pour vous ? <span className='text-second'>Parlons-en.</span>
               </h2>
               <p className='mt-4 text-white/75 max-w-xl'>
                  Laissez-nous votre adresse email : nos conseillers vous accompagnent dans le choix de votre filière et
                  votre inscription.
               </p>
               <form onSubmit={toSubmit} className='mt-6 flex w-full max-w-md bg-white/10 border border-white/20 rounded-full p-1'>
                  <input
                     type='email'
                     value={email}
                     onChange={(e) => setEmail(e.target.value)}
                     placeholder='Votre adresse email'
                     aria-label='Votre adresse email'
                     className='flex-1 min-w-0 bg-transparent px-4 text-sm placeholder:text-white/60 outline-none'
                  />
                  <button type='submit' className='px-5 py-2 rounded-full bg-second font-semibold text-sm hover:bg-white hover:text-first transition cursor-pointer'>
                     Être contacté
                  </button>
               </form>
            </div>
            <img src={assets.accueil} alt='Étudiante ESGC' className='relative z-10 w-56 lg:w-72 lg:absolute lg:right-12 lg:bottom-0 lg:h-[115%] lg:w-auto object-contain object-bottom pointer-events-none' />
         </div>
      </section>
   )
}

export default CtaBanner
