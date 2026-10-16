/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { formations } from '../assets'
import { Eyebrow } from './Title'

// Trois filières mises en avant, façon galerie de portraits
const vedettes = formations.slice(0, 3)

function Parcours() {
   return (
      <section className='max-w-7xl mx-auto px-4 md:px-8 py-16'>
         <div className='grid lg:grid-cols-[2fr_1fr] gap-10 items-center'>
            <div className='grid grid-cols-1 sm:grid-cols-3 gap-5'>
               {vedettes.map((item, id) => (
                  <motion.a
                     href='#filiere'
                     key={item.id}
                     initial={{ opacity: 0, y: 30 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: id * 0.15 }}
                     className='group block'
                  >
                     <div className='overflow-hidden rounded-2xl'>
                        <img src={item.image} alt={item.titre} className='w-full h-[220px] object-cover group-hover:scale-105 transition duration-300' />
                     </div>
                     <h3 className='mt-3 font-semibold text-gray-800 group-hover:text-first transition'>{item.titre}</h3>
                     <p className='text-xs text-gray-500'>{item.modules.length} modules clés</p>
                  </motion.a>
               ))}
            </div>

            <div>
               <Eyebrow>Nos parcours</Eyebrow>
               <h2 className='mt-3 font-kaushan text-3xl md:text-5xl text-first leading-tight'>
                  Des filières, mille ambitions
               </h2>
               <p className='text-gray-500 mt-5'>
                  Comptabilité, RH, Banque, Digital, Logistique… des secteurs qui recrutent, avec des enseignants
                  professionnels et proches des étudiants.
               </p>
               <a href='#filiere' className='inline-block mt-6 px-6 py-2.5 rounded-full bg-first text-white font-semibold hover:bg-second transition'>
                  Voir tout
               </a>
            </div>
         </div>
      </section>
   )
}

export default Parcours
