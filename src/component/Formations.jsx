/* eslint-disable no-unused-vars */
import { Eyebrow } from './Title'
import { formations } from '../assets'
import { useState, useEffect, useRef } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faLayerGroup, faBriefcase, faBuilding, faXmark } from '@fortawesome/free-solid-svg-icons'
import { motion, AnimatePresence } from 'framer-motion'

function Formations() {
   const [selected, setSelected] = useState('')
   const [detail, setDetail] = useState(null)
   const [open, setOpen] = useState(false)
   const scrollRef = useRef(null)

   useEffect(() => {
      const filtered = formations.find((item) => item.id === selected)
      setDetail(filtered)
      scrollRef.current?.scrollTo({ top: 0 })
   }, [selected])

   // Fermeture avec Échap et blocage du défilement de la page
   useEffect(() => {
      if (!open) return
      const onKey = (e) => e.key === 'Escape' && setOpen(false)
      document.addEventListener('keydown', onKey)
      document.body.style.overflow = 'hidden'
      return () => {
         document.removeEventListener('keydown', onKey)
         document.body.style.overflow = ''
      }
   }, [open])

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

         {/* Modale animée : fiche détaillée d'une formation */}
         <AnimatePresence>
            {open && detail && (
               <motion.div
                  className="fixed inset-0 bg-deep/70 backdrop-blur-sm z-50 flex items-center justify-center p-3 sm:p-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setOpen(false)}
               >
                  <motion.div
                     role="dialog"
                     aria-modal="true"
                     aria-label={detail.titre}
                     className="w-full max-w-5xl max-h-full bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
                     initial={{ scale: 0.92, opacity: 0, y: 20 }}
                     animate={{ scale: 1, opacity: 1, y: 0 }}
                     exit={{ scale: 0.92, opacity: 0, y: 20 }}
                     transition={{ duration: 0.3 }}
                     onClick={(e) => e.stopPropagation()}
                  >
                     <div ref={scrollRef} className="overflow-y-auto">
                        {/* En-tête image */}
                        <div className="relative min-h-[240px] sm:min-h-[280px] flex items-end">
                           <img className="absolute inset-0 w-full h-full object-cover" src={detail.image} alt="" />
                           <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/75 to-deep/20" />
                           <button
                              onClick={() => setOpen(false)}
                              aria-label="Fermer"
                              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/15 border border-white/30 text-white hover:bg-white hover:text-first transition cursor-pointer"
                           >
                              <FontAwesomeIcon icon={faXmark} />
                           </button>
                           <div className="relative z-10 p-6 sm:p-10 text-white">
                              <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-second">
                                 <span className="w-8 h-[2px] bg-second" /> Formation
                              </p>
                              <h2 className="mt-3 font-kaushan text-3xl sm:text-5xl leading-tight">{detail.titre}</h2>
                              <p className="mt-3 text-white/85 max-w-2xl">{detail.description}</p>
                              <div className="mt-5 flex flex-wrap gap-2 text-xs font-medium">
                                 <span className="px-3 py-1.5 rounded-full bg-white/15 border border-white/20"><FontAwesomeIcon className="text-second mr-1.5" icon={faLayerGroup} />{detail.modules.length} modules</span>
                                 <span className="px-3 py-1.5 rounded-full bg-white/15 border border-white/20"><FontAwesomeIcon className="text-second mr-1.5" icon={faBriefcase} />{detail.debouches.length} débouchés</span>
                                 <span className="px-3 py-1.5 rounded-full bg-white/15 border border-white/20"><FontAwesomeIcon className="text-second mr-1.5" icon={faBuilding} />{detail.secteurs_employeurs.length} secteurs</span>
                              </div>
                           </div>
                        </div>

                        <div className="p-6 sm:p-10 flex flex-col gap-10">
                           {/* Modules */}
                           <div>
                              <h3 className="text-xl font-bold text-first">Ce que vous allez apprendre</h3>
                              <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                 {detail.modules.map((item, id) => (
                                    <motion.div
                                       key={id}
                                       initial={{ opacity: 0, y: 10 }}
                                       animate={{ opacity: 1, y: 0 }}
                                       transition={{ delay: 0.1 + id * 0.05 }}
                                       className="rounded-2xl bg-slate-50 border border-gray-100 p-4"
                                    >
                                       <span className="text-2xl font-bold text-second">{String(id + 1).padStart(2, '0')}</span>
                                       <p className="mt-2 font-semibold text-gray-700">{item}</p>
                                    </motion.div>
                                 ))}
                              </div>
                           </div>

                           <div className="grid md:grid-cols-2 gap-6">
                              {/* Postes accessibles */}
                              <div className="rounded-2xl border border-gray-100 p-6">
                                 <h3 className="text-xl font-bold text-first">Postes accessibles</h3>
                                 <ul className="mt-4 flex flex-col gap-3">
                                    {detail.debouches.map((item, id) => (
                                       <li key={id} className="flex items-start gap-3 text-gray-700">
                                          <FontAwesomeIcon className="text-second mt-1" icon={faCircleCheck} />
                                          {item}
                                       </li>
                                    ))}
                                 </ul>
                              </div>

                              {/* Employeurs potentiels */}
                              <div className="rounded-2xl bg-deep text-white p-6">
                                 <h3 className="text-xl font-bold">Employeurs potentiels</h3>
                                 <div className="mt-4 flex flex-wrap gap-2">
                                    {detail.secteurs_employeurs.map((item, id) => (
                                       <span key={id} className="px-3 py-2 rounded-full bg-white/10 border border-white/15 text-sm">{item}</span>
                                    ))}
                                 </div>
                              </div>
                           </div>

                           {/* Appel à l'action */}
                           <div className="rounded-2xl bg-gradient-to-r from-first/10 to-second/15 p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                              <div>
                                 <p className="font-kaushan text-2xl text-first">Cette formation vous intéresse ?</p>
                                 <p className="text-sm text-gray-500">Notre secrétariat vous renseigne sur les inscriptions.</p>
                              </div>
                              <a
                                 href="#contact"
                                 onClick={() => setOpen(false)}
                                 className="self-start sm:self-auto px-6 py-3 rounded-full bg-first text-white font-semibold hover:bg-second transition"
                              >
                                 S'inscrire
                              </a>
                           </div>

                           {/* Autres formations */}
                           <div>
                              <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Autres formations</p>
                              <div className="mt-3 flex flex-wrap gap-2">
                                 {formations.filter((f) => f.id !== detail.id).map((f) => (
                                    <button
                                       key={f.id}
                                       onClick={() => setSelected(f.id)}
                                       className="px-4 py-2 rounded-full border border-gray-200 text-sm text-gray-700 hover:border-first hover:text-first transition cursor-pointer"
                                    >
                                       {f.titre}
                                    </button>
                                 ))}
                              </div>
                           </div>
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
