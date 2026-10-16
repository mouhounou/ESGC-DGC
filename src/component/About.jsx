/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { aboutImage, chiffres } from '../assets'
import { Eyebrow } from './Title'

function About() {
   return (
      <section id='apropos' className='bg-slate-100/70 py-16 mt-12'>
         <div className='max-w-7xl mx-auto px-4 md:px-8'>
            <div className='grid lg:grid-cols-2 gap-10 items-center'>
               <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
               >
                  <Eyebrow>À propos de l'ESGC</Eyebrow>
                  <h2 className='mt-3 font-kaushan text-3xl md:text-5xl text-first leading-tight'>
                     Apprendre en faisant, réussir en entreprise
                  </h2>
                  <p className='text-gray-500 mt-5'>
                     Choisir une école, c'est bien plus qu'une simple étape dans un parcours académique — c'est un engagement
                     envers son avenir. À l'ESGC, nous accompagnons les étudiants ambitieux à se préparer aux réalités du monde
                     professionnel grâce à une pédagogie moderne, ancrée dans la pratique.
                  </p>
                  <a href='#filiere' className='inline-block mt-6 px-6 py-2.5 rounded-full bg-first text-white font-semibold hover:bg-second transition'>
                     Voir nos formations
                  </a>
               </motion.div>

               <motion.img
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  src={aboutImage}
                  alt="Étudiants en cours"
                  className='w-full h-[280px] md:h-[340px] object-cover rounded-3xl'
               />
            </div>

            <div className='mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
               {chiffres.map((item, id) => (
                  <motion.div
                     key={id}
                     initial={{ opacity: 0, y: 20 }}
                     whileInView={{ opacity: 1, y: 0 }}
                     viewport={{ once: true }}
                     transition={{ delay: id * 0.1 }}
                     className='bg-white rounded-2xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition'
                  >
                     <div className='flex items-center gap-3'>
                        <div className='w-11 h-11 flex items-center justify-center rounded-full bg-second/15'>
                           <FontAwesomeIcon className='text-second' icon={item.icone} />
                        </div>
                        <h3 className='text-lg font-semibold text-first'>{item.titre}</h3>
                     </div>
                     <p className='text-gray-500 text-sm mt-3'>{item.description}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>
   )
}

export default About
