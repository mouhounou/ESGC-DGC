/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons'
import { formations } from '../assets'
import { Eyebrow } from './Title'
import { apparition } from '../lib/apparition'

function Debouches() {
   return (
      <section id='debouches' className='max-w-7xl mx-auto px-4 md:px-8 py-16'>
         <motion.div className='max-w-2xl mx-auto text-center' {...apparition('flou')}>
            <Eyebrow>Après le diplôme</Eyebrow>
            <h2 className='mt-3 font-kaushan text-3xl md:text-5xl text-first leading-tight'>Des métiers qui vous attendent</h2>
            <p className='mt-4 text-gray-500'>
               Un service accompagne les étudiants après leur diplôme. Voici quelques-uns des postes accessibles à la sortie
               de chaque filière.
            </p>
         </motion.div>

         <div className='mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
            {formations.slice(0, 3).map((item, id) => (
               <motion.div
                  key={item.id}
                  {...apparition('haut', id * 0.12)}
                  className='bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all'
               >
                  <FontAwesomeIcon icon={faQuoteLeft} className='text-second text-2xl' />
                  <p className='mt-4 text-gray-700 font-medium flex-1'>
                     {item.debouches.slice(0, 3).join(', ')}…
                  </p>
                  <div className='mt-6 pt-4 border-t border-gray-100 flex items-center gap-3'>
                     <img src={item.image} alt={item.titre} className='w-11 h-11 rounded-full object-cover' />
                     <div>
                        <p className='text-sm font-semibold text-first'>{item.titre}</p>
                        <p className='text-xs text-gray-500'>{item.secteurs_employeurs[0]}</p>
                     </div>
                  </div>
               </motion.div>
            ))}
         </div>
      </section>
   )
}

export default Debouches
