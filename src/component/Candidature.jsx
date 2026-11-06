/* eslint-disable no-unused-vars */
import { etapes } from '../assets'
import { ecole } from '../data/content'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { ArrowRight, Phone } from 'lucide-react'
import { Eyebrow } from './Title'
import EtapeScene from './EtapeScenes'
import { apparition } from '../lib/apparition'

const recrutement = ecole.telephones.find((t) => t.libelle === 'Recrutement') ?? ecole.telephones[0]

// Parcours de candidature (même section que sur le site de l'ESIT) :
// une carte par étape, chacune avec une scène animée
function Candidature() {
   return (
      <section id='candidature' className='max-w-7xl mx-auto px-4 md:px-8 py-16'>
         <motion.div className='max-w-3xl mx-auto text-center' {...apparition('flou')}>
            <Eyebrow>Candidature et admission</Eyebrow>
            <h2 className='mt-3 font-kaushan text-3xl md:text-5xl text-first leading-tight'>3 étapes simples pour intégrer l'ESGC</h2>
            <p className='mt-4 text-gray-500'>Découvrez les étapes pour rejoindre l'une de nos filières.</p>
         </motion.div>

         <ol className='mt-12 grid md:grid-cols-3 gap-5'>
            {etapes.map((e, i) => (
               <motion.li key={e.titre} className='h-full' {...apparition('haut', i * 0.12)}>
                  <div className='group relative h-full bg-white rounded-3xl border border-gray-100 p-3 shadow-sm hover:shadow-xl hover:shadow-first/10 hover:-translate-y-1 transition-all flex flex-col'>
                     {/* scène animée */}
                     <div className='rounded-2xl bg-gradient-to-b from-slate-50 to-[#e8eff7] overflow-hidden'>
                        <EtapeScene index={i} label={e.titre} />
                     </div>
                     <div className='px-3 pt-5 pb-3'>
                        <span className='inline-flex items-center gap-1.5 pl-1 pr-3 py-1 rounded-full bg-slate-100 text-xs font-bold text-deep'>
                           <span className={`w-6 h-6 rounded-full flex items-center justify-center text-white text-[11px] ${i === 0 ? 'bg-second' : 'bg-gradient-to-br from-first to-deep'}`}>
                              <FontAwesomeIcon icon={e.icon} />
                           </span>
                           Étape {i + 1}
                        </span>
                        <h3 className='mt-3 font-bold text-deep text-lg'>{e.titre}</h3>
                        <p className='mt-2 text-sm text-gray-500 leading-relaxed'>{e.description}</p>
                     </div>
                  </div>
               </motion.li>
            ))}
         </ol>

         {/* Appel à l'action */}
         <motion.div className='mt-12 flex flex-wrap items-center justify-center gap-3' {...apparition('haut')}>
            <a
               href='#contact'
               className='group inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-second text-white font-semibold shadow-lg shadow-second/30 hover:bg-first hover:shadow-first/30 transition-all'
            >
               Nous contacter
               <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
            </a>
            <a
               href={`tel:${recrutement.tel}`}
               className='inline-flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-white border border-gray-200 text-deep font-semibold hover:border-first hover:text-first transition'
            >
               <span className='w-9 h-9 rounded-full bg-first/10 text-first flex items-center justify-center'>
                  <Phone size={16} />
               </span>
               <span className='text-left leading-tight'>
                  <span className='block text-[11px] font-medium text-gray-500'>{recrutement.libelle}</span>
                  {recrutement.numero}
               </span>
            </a>
         </motion.div>
      </section>
   )
}

export default Candidature
