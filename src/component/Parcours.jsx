/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { formations } from '../assets'
import { Eyebrow } from './Title'
import { apparition } from '../lib/apparition'

// Trois filières mises en avant, façon galerie de portraits
const vedettes = formations.slice(0, 3)

function Parcours() {
   return (
      <section className='max-w-7xl mx-auto px-4 md:px-8 py-16'>
         <motion.div className='max-w-2xl mx-auto text-center' {...apparition('flou')}>
            <Eyebrow>Nos parcours</Eyebrow>
            <h2 className='mt-3 font-kaushan text-3xl md:text-5xl text-first leading-tight'>Des filières, mille ambitions</h2>
            <p className='mt-4 text-gray-500'>
               Comptabilité, RH, Banque, Digital, Logistique… des secteurs qui recrutent, avec des enseignants
               professionnels et proches des étudiants.
            </p>
         </motion.div>

         <div className='mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5'>
            {vedettes.map((item, id) => (
               <motion.a href='#filiere' key={item.id} {...apparition('haut', id * 0.12)} className='group block'>
                  <div className='overflow-hidden rounded-2xl'>
                     <img src={item.image} alt={item.titre} className='w-full h-[240px] object-cover group-hover:scale-105 transition duration-300' />
                  </div>
                  <h3 className='mt-3 font-semibold text-gray-800 group-hover:text-first transition'>{item.titre}</h3>
                  <p className='text-xs text-gray-500'>{item.modules.length} modules clés</p>
               </motion.a>
            ))}
         </div>

         <motion.div className='mt-8 text-center' {...apparition('haut', 0.2)}>
            <a href='#filiere' className='inline-block px-6 py-2.5 rounded-full bg-first text-white font-semibold hover:bg-second transition'>
               Voir toutes les filières
            </a>
         </motion.div>
      </section>
   )
}

export default Parcours
