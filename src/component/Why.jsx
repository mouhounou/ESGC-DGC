/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState, useSyncExternalStore } from 'react'
import { raisons } from '../assets'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { motion } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { Eyebrow } from './Title'
import WhyScene from './WhyScene'
import { apparition } from '../lib/apparition'

// Durée d'affichage de chaque atout en lecture automatique
const DUREE = 4000

const REDUIT = '(prefers-reduced-motion: reduce)'
const abonnerReduit = (cb) => {
   const mq = window.matchMedia(REDUIT)
   mq.addEventListener('change', cb)
   return () => mq.removeEventListener('change', cb)
}

// Campus 3D à gauche, atouts à droite : survoler ou choisir un atout le met en avant dans la scène
function Why() {
   const scene = useRef(null)
   const [active, setActive] = useState(0)
   const [auto, setAuto] = useState(true) // coupée dès que l'utilisateur choisit un atout
   const [survol, setSurvol] = useState(false) // pause tant que la souris est sur la section
   const [charger, setCharger] = useState(false)
   const [visible, setVisible] = useState(false)
   const reduit = useSyncExternalStore(abonnerReduit, () => window.matchMedia(REDUIT).matches, () => false)

   // three.js se charge à l'approche de la section, et le rendu se met en pause hors écran
   useEffect(() => {
      const el = scene.current
      const proche = new IntersectionObserver(([e]) => e.isIntersecting && setCharger(true), { rootMargin: '400px' })
      const vu = new IntersectionObserver(([e]) => setVisible(e.isIntersecting))
      proche.observe(el)
      vu.observe(el)
      return () => {
         proche.disconnect()
         vu.disconnect()
      }
   }, [])

   // Lecture automatique : la scène présente les atouts l'un après l'autre
   const lecture = auto && visible && !survol && !reduit
   useEffect(() => {
      if (!lecture) return
      const id = setTimeout(() => setActive((a) => (a + 1) % raisons.length), DUREE)
      return () => clearTimeout(id)
   }, [lecture, active])

   const choisir = (i) => {
      setActive(i)
      setAuto(false)
   }

   return (
      <section
         id='pourquoi'
         onPointerEnter={(e) => e.pointerType === 'mouse' && setSurvol(true)}
         onPointerLeave={() => setSurvol(false)}
         className='max-w-7xl mx-auto px-4 md:px-8 py-16'
      >
         <motion.div className='max-w-2xl mx-auto text-center' {...apparition('flou')}>
            <Eyebrow>Nos atouts</Eyebrow>
            <h2 className='mt-3 font-kaushan text-3xl md:text-5xl text-first leading-tight'>Pourquoi choisir ESGC ?</h2>
            <p className='mt-4 text-gray-500'>
               Située à Pointe-Noire et forte de 21 ans d'expérience, notre école est un espace d'apprentissage
               dynamique, axé sur l'innovation, l'excellence et l'insertion professionnelle.
            </p>
         </motion.div>

         <div className='mt-10 grid grid-cols-1 lg:grid-cols-[1.15fr_1fr] gap-8 items-center'>
            <motion.div ref={scene} className='min-w-0' {...apparition('zoom', 0.1)}>
               <WhyScene items={raisons} active={active} onSelect={choisir} charger={charger} visible={visible} reducedMotion={reduit} />
            </motion.div>

            <ul className='flex flex-col gap-3'>
               {raisons.map((item, id) => {
                  const on = id === active
                  return (
                     <motion.li key={item.titre} className='relative' {...apparition('droite', id * 0.06)}>
                        <button
                           type='button'
                           onMouseEnter={() => setActive(id)}
                           onClick={() => choisir(id)}
                           aria-pressed={on}
                           className={`group w-full text-left flex items-center gap-4 px-4 py-4 rounded-2xl border overflow-hidden relative cursor-pointer transition-colors ${
                              on ? 'bg-deep border-deep text-white shadow-lg shadow-deep/20' : 'bg-white border-gray-200 text-gray-700 hover:border-first/40'
                           }`}
                        >
                           <span className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 transition-colors ${on ? 'bg-second text-white' : 'bg-second/15 text-second'}`}>
                              <FontAwesomeIcon icon={item.icone} />
                           </span>
                           <span className='flex-1'>
                              <span className={`block font-semibold ${on ? 'text-white' : 'text-gray-800'}`}>{item.titre}</span>
                              <span className={`block mt-1 text-sm leading-relaxed ${on ? 'text-white/75' : 'text-gray-500'}`}>{item.description}</span>
                           </span>
                           <ChevronRight className={`shrink-0 transition-transform ${on ? 'text-second translate-x-1' : 'text-gray-400 group-hover:translate-x-1'}`} />
                           {/* progression de la lecture automatique */}
                           {on && lecture && (
                              <span
                                 key={active}
                                 className='absolute left-0 right-0 bottom-0 h-1 bg-second origin-left'
                                 style={{ animation: `remplir ${DUREE}ms linear forwards` }}
                                 aria-hidden='true'
                              />
                           )}
                        </button>
                     </motion.li>
                  )
               })}
            </ul>
         </div>
      </section>
   )
}

export default Why
