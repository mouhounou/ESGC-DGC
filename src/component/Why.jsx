/* eslint-disable no-unused-vars */
import React from 'react'
import Title from './Title'
import { assets, raisons } from '../assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'


function Why() {
   return (
      <div id='pourquoi' className='my-[3rem] px-[2%] lg:px-[2.5%]'>
         <div className=' flex flex-col md:flex-row gap-[2.7%] items-center mt-[2rem]'>
            <motion.div
               initial={{ opacity: 0, y: 30 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ duration: 0.7, ease: 'easeOut' }}
               className='flex-1 relative'
            >
               <div className="absolute w-[7rem] h-[5rem] bg-first top-24  left-0 blur-3xl "></div>
               <div className="absolute w-[7rem] h-[5rem] bg-second opacity-25 bottom-26  right-16 blur-3xl "></div>
               <img className='w-full' src={assets.why} alt="" />
            </motion.div> 

            <div className='flex-1 flex flex-col gap-7 '>
               <div>
                  <Title titre="Pourquoi choisir ESGC ?" styles="text-start text-second text-4xl font-semibold " />
                  <p className='text-gray-500  mt-4'>
                     Choisir une école, c’est bien plus qu’une simple étape dans un parcours académique — c’est un engagement envers son avenir. À l’ESGC, nous accompagnons les étudiants ambitieux à se préparer aux réalités du monde professionnel grâce à une pédagogie moderne, ancrée dans la pratique. Située à Pointe-Noire et forte de plus de 20 ans d’expérience, notre école est un espace d’apprentissage dynamique, axé sur l’innovation, l’excellence et l’insertion professionnelle.
                  </p>
               </div>
               {
                  raisons.map((item, id) => (
                     <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: id * 0.2 }}
                        className='flex items-start gap-5'
                        key = {id}
                     >
                        <div className='w-14 h-14 flex   items-center justify-center bg-second/25 rounded-full'>
                           <FontAwesomeIcon className='text-second text-xl' icon={item.icone}/>
                        </div>
                           
                           <div>
                              <h1 className='text-xl text-gray-600 font-semibold'>{item.titre}</h1>
                              <p className='text-gray-500 text-sm'>{item.description}</p>
                           </div>
                     </motion.div>
                  ))
               }
            </div>
         </div>
      </div>
   )
}

export default Why