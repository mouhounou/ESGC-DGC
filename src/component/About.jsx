/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { chiffres } from '../assets'
import ChiffreScene from './ChiffreScenes'
import { apparition } from '../lib/apparition'

// Repères clés de l'école, chacun avec un pictogramme animé
function About() {
   return (
      <section id='reperes' aria-label="L'ESGC en quelques repères" className='bg-slate-100/70 py-12 mt-12'>
         <ul className='max-w-7xl mx-auto px-4 md:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
            {chiffres.map((item, id) => (
               <motion.li
                  key={item.titre}
                  {...apparition('haut', id * 0.1)}
                  className='group bg-white rounded-3xl p-3 shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-1 transition-all'
               >
                  <div className='rounded-2xl bg-gradient-to-b from-first/10 to-second/5 overflow-hidden'>
                     <ChiffreScene index={id} label={item.titre} />
                  </div>
                  <div className='px-2 pt-4 pb-2'>
                     <h3 className='text-lg font-bold text-first'>{item.titre}</h3>
                     <p className='text-gray-500 text-sm mt-1.5 leading-relaxed'>{item.description}</p>
                  </div>
               </motion.li>
            ))}
         </ul>
      </section>
   )
}

export default About
