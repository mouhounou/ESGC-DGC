/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { assets, raisons } from '../assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'
import { Eyebrow } from './Title'

function Why() {
   const [active, setActive] = useState(0)

   return (
      <section id='pourquoi' className='max-w-7xl mx-auto px-4 md:px-8 py-16'>
         <div className='grid lg:grid-cols-3 gap-10 items-center'>
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ duration: 0.7, ease: 'easeOut' }}
               className='relative'
            >
               <div className='rounded-3xl bg-gradient-to-b from-first/15 to-second/20 overflow-hidden h-[360px] flex items-end justify-center'>
                  <img className='h-[340px] object-contain' src={assets.why} alt="Étudiante en réflexion" />
               </div>
               <div className='absolute left-4 bottom-6 bg-deep text-white rounded-2xl px-5 py-4 shadow-xl'>
                  <p className='text-xs text-white/70'>Une école reconnue</p>
                  <p className='text-3xl font-bold text-second'>20+ ans</p>
                  <p className='text-xs text-white/70'>d'expérience</p>
               </div>
            </motion.div>

            <div>
               <Eyebrow>Nos atouts</Eyebrow>
               <h2 className='mt-3 font-kaushan text-3xl md:text-5xl text-first leading-tight'>Pourquoi choisir ESGC ?</h2>
               <p className='text-gray-500 mt-5'>
                  Située à Pointe-Noire et forte de plus de 20 ans d'expérience, notre école est un espace d'apprentissage
                  dynamique, axé sur l'innovation, l'excellence et l'insertion professionnelle.
               </p>
            </div>

            {/* Accordéon des raisons */}
            <div className='flex flex-col gap-3'>
               {raisons.map((item, id) => {
                  const isOpen = active === id
                  return (
                     <div key={id} className={`rounded-xl border transition ${isOpen ? 'bg-deep border-deep text-white' : 'bg-white border-gray-200 text-gray-700'}`}>
                        <button
                           onClick={() => setActive(isOpen ? -1 : id)}
                           className='w-full flex items-center justify-between gap-3 px-4 py-3 text-left font-semibold text-sm cursor-pointer'
                        >
                           <span className='flex items-center gap-3'>
                              <FontAwesomeIcon className='text-second' icon={item.icone} />
                              {item.titre}
                           </span>
                           <FontAwesomeIcon icon={faChevronDown} className={`text-xs transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence initial={false}>
                           {isOpen && (
                              <motion.p
                                 initial={{ height: 0, opacity: 0 }}
                                 animate={{ height: 'auto', opacity: 1 }}
                                 exit={{ height: 0, opacity: 0 }}
                                 className='px-4 pb-4 text-sm text-white/80 overflow-hidden'
                              >
                                 {item.description}
                              </motion.p>
                           )}
                        </AnimatePresence>
                     </div>
                  )
               })}
            </div>
         </div>
      </section>
   )
}

export default Why
