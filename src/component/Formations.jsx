/* eslint-disable no-unused-vars */
import Title from './Title'
import { formations } from '../assets'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

function Formations() {
   const [selected, setSelected] = useState('')
   const [detail, setDetail] = useState(null)
   const [open, setOpen] = useState(false)

   useEffect(() => {
      const filtered = formations.find((item) => item.id === selected)
      setDetail(filtered)
   }, [selected])

   return (
      <div id="filiere" className="w-full px-[1%] mb-[3rem] py-[3rem] bg-gradient-to-r from-first/75 to-first rounded-md flex flex-col items-center gap-4">
         <Title titre="Nos formations" styles="text-white" />
         <p className="text-white text-center">Découvrez nos 5 parcours de formation spécialisés</p>

         <div className="w-full mt-[3rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {formations.map((item, index) => (
               <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="flex flex-col bg-white shadow-md rounded-md overflow-hidden h-full"
               >
                  <div className="relative">
                     <img
                        className="w-full h-[240px] object-cover"
                        src={item.image}
                        alt={item.titre}
                     />
                     <div className="absolute top-0 left-0 w-full h-full bg-first/25" />
                  </div>

                  <div className="flex flex-col flex-1 px-4 py-3">
                     <h1 className="text-2xl font-bold text-first">{item.titre}</h1>
                     <p className="text-gray-700 my-4 flex-1">{item.description}</p>
                     <button
                        onClick={() => {
                           setSelected(item.id)
                           setOpen(true)
                        }}
                        className="w-full text-center py-2 transition-all duration-150 cursor-pointer hover:scale-75 bg-second rounded-md font-semibold text-white mt-auto"
                     >
                        En savoir plus
                     </button>
                  </div>
               </motion.div>
            ))}
         </div>

         {/* Modale animée */}
         <AnimatePresence>
            {open && detail && (
               <motion.div
                  className="fixed top-0 left-0 w-full h-screen bg-black/60 z-50 flex items-center justify-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
               >
                  <motion.div
                     className="w-[90%] md:w-[70%] h-[94%] bg-white rounded-xl shadow-xl p-4"
                     initial={{ scale: 0.8, opacity: 0 }}
                     animate={{ scale: 1, opacity: 1 }}
                     exit={{ scale: 0.8, opacity: 0 }}
                     transition={{ duration: 0.3 }}
                  >
                     <div className="flex items-center justify-between">
                        <span></span>
                        <button
                           onClick={() => setOpen(false)}
                           className="text-gray-600 hover:text-black cursor-pointer hover:scale-75 transition-all font-bold text-xl"
                        >
                           ✕
                        </button>
                     </div>

                     <div className='w-full h-[calc(100%-30px)] overflow-y-auto py-[1rem] flex flex-col gap-3'>
                        <img className='w-full h-[300px] rounded-md object-cover' src={detail.image} alt="" />
                        <h1 className="text-3xl font-bold text-first">{detail.titre}</h1>
                        <p className="text-gray-700">{detail.description}</p>

                        {detail.modules.map((item, id) => (
                           <motion.div
                              className='flex items-center gap-2 text-gray-700'
                              key={id}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: id * 0.05 }}
                           >
                              <FontAwesomeIcon icon={faCircleCheck} />
                              <p>{item}</p>
                           </motion.div>
                        ))}

                        <h3 className='text-2xl font-semibold text-first'>Postes accessibles</h3>
                        <div className='pl-1.5 flex flex-col gap-1'>
                           {detail.debouches.map((item, id) => (
                              <motion.div
                                 className='flex items-center gap-2 text-gray-700'
                                 key={id}
                                 initial={{ opacity: 0, y: -10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: id * 0.05 }}
                              >
                                 <FontAwesomeIcon icon={faCircleCheck} />
                                 <p>{item}</p>
                              </motion.div>
                           ))}
                        </div>

                        <h3 className='text-2xl font-semibold text-first'>Employeurs potentiels</h3>
                        <div className='pl-1.5 flex flex-col gap-1 pb-[2rem]'>
                           {detail.secteurs_employeurs.map((item, id) => (
                              <motion.div
                                 className='flex items-center gap-2 text-gray-700'
                                 key={id}
                                 initial={{ opacity: 0, y: -10 }}
                                 animate={{ opacity: 1, y: 0 }}
                                 transition={{ delay: id * 0.05 }}
                              >
                                 <FontAwesomeIcon icon={faCircleCheck} />
                                 <p>{item}</p>
                              </motion.div>
                           ))}
                        </div>
                     </div>
                  </motion.div>
               </motion.div>
            )}
         </AnimatePresence>
      </div>
   )
}

export default Formations
