/* eslint-disable no-unused-vars */
import { Eyebrow } from './Title'
import { formations } from '../assets'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faLayerGroup, faBriefcase } from '@fortawesome/free-solid-svg-icons'
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
      <section id="filiere" className="bg-slate-100/70 py-16">
         <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col items-center">
         <Eyebrow>Nos formations</Eyebrow>
         <h2 className="mt-3 font-kaushan text-3xl md:text-5xl text-first text-center">Découvrez nos parcours</h2>
         <p className="text-gray-500 text-center mt-4 max-w-xl">Découvrez nos 5 parcours de formation spécialisés, pensés pour les secteurs qui recrutent.</p>

         <div className="w-full mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {formations.map((item, index) => (
               <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  className="group flex flex-col bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition overflow-hidden h-full p-3"
               >
                  <div className="overflow-hidden rounded-xl">
                     <img
                        className="w-full h-[220px] object-cover group-hover:scale-105 transition duration-300"
                        src={item.image}
                        alt={item.titre}
                     />
                  </div>

                  <div className="flex flex-col flex-1 px-2 pt-4 pb-2">
                     <div className="flex items-center gap-4 text-xs text-gray-500">
                        <span className="flex items-center gap-1.5"><FontAwesomeIcon className="text-second" icon={faLayerGroup} />{item.modules.length} modules</span>
                        <span className="flex items-center gap-1.5"><FontAwesomeIcon className="text-second" icon={faBriefcase} />{item.debouches.length} débouchés</span>
                     </div>
                     <h3 className="text-xl font-bold text-first mt-3">{item.titre}</h3>
                     <p className="text-gray-500 text-sm my-3 flex-1">{item.description}</p>
                     <button
                        onClick={() => {
                           setSelected(item.id)
                           setOpen(true)
                        }}
                        className="self-start text-sm font-semibold text-first hover:text-second transition cursor-pointer"
                     >
                        En savoir plus →
                     </button>
                  </div>
               </motion.div>
            ))}
         </div>
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
      </section>
   )
}

export default Formations
