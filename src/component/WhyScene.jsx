/* eslint-disable no-unused-vars */
import { Component, lazy, Suspense, useRef } from 'react'
import { motion } from 'framer-motion'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { ChevronLeft, ChevronRight, Minus, Move3d, Plus, RotateCcw } from 'lucide-react'

// three.js n'est téléchargé qu'à l'approche de la section
const Why3D = lazy(() => import('./why3d/Why3D'))

const WEBGL = (() => {
   try {
      const canvas = document.createElement('canvas')
      return !!(canvas.getContext('webgl2') || canvas.getContext('webgl'))
   } catch {
      return false
   }
})()

// Si la 3D échoue (WebGL indisponible, module non chargé), on affiche le repli
// au lieu de faire tomber toute la page
class Secours extends Component {
   state = { erreur: false }
   static getDerivedStateFromError() {
      return { erreur: true }
   }
   render() {
      return this.state.erreur ? this.props.repli : this.props.children
   }
}

function Attente() {
   return (
      <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
         <span className="w-14 h-14 rounded-full border-2 border-white/15 border-t-second animate-spin" />
      </div>
   )
}

// Sans WebGL : les atouts disposés en cercle, l'actif mis en avant
function Repli({ items, active, onSelect }) {
   return (
      <div className="absolute inset-0 flex items-center justify-center">
         <div className="relative h-[78%] aspect-square">
            {items.map((item, i) => {
               const a = (i / items.length) * 2 * Math.PI
               return (
                  <button
                     key={item.titre}
                     type="button"
                     onClick={() => onSelect(i)}
                     style={{ left: `${50 + Math.sin(a) * 42}%`, top: `${50 + Math.cos(a) * 42}%` }}
                     className={`absolute -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-2xl flex items-center justify-center transition cursor-pointer ${i === active ? 'bg-second text-white scale-110' : 'bg-white/10 text-white/80 hover:bg-white/20'}`}
                     aria-label={item.titre}
                  >
                     <FontAwesomeIcon icon={item.icone} />
                  </button>
               )
            })}
         </div>
      </div>
   )
}

// Carte 3D de la section « Pourquoi choisir ESGC ? »
function WhyScene({ items, active, onSelect, charger, visible, reducedMotion }) {
   const api = useRef(null)
   const item = items[active]
   const pas = (d) => onSelect((active + d + items.length) % items.length)
   const repli = <Repli items={items} active={active} onSelect={onSelect} />
   // fond sombre : les boutons restent lisibles quand on zoome sur le plateau clair
   const btn =
      'w-9 h-9 shrink-0 rounded-xl bg-deep/60 border border-white/15 backdrop-blur text-white flex items-center justify-center hover:bg-white hover:text-first transition cursor-pointer'

   return (
      <div className="relative rounded-3xl bg-gradient-to-b from-first to-deep text-white overflow-hidden shadow-xl shadow-deep/20">
         {/* décor */}
         <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full border border-white/5" />
            <div className="absolute top-10 -right-28 w-96 h-96 rounded-full border border-white/5" />
            <div className="absolute -right-10 -top-10 w-64 h-64 bg-second/30 blur-3xl rounded-full" />
         </div>

         <div className="relative aspect-[4/3]">
            {!WEBGL ? (
               repli
            ) : charger ? (
               <Secours repli={repli}>
                  <Suspense fallback={<Attente />}>
                     <Why3D active={active} onSelect={onSelect} visible={visible} reducedMotion={reducedMotion} api={api} fallback={repli} />
                  </Suspense>
               </Secours>
            ) : (
               <Attente />
            )}

            {/* aide et zoom : seulement quand la scène 3D est disponible */}
            {WEBGL && (
               <>
                  <p className="pointer-events-none absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-deep/60 border border-white/15 backdrop-blur text-[11px] font-medium text-white/85">
                     <Move3d className="w-3.5 h-3.5 text-second" />
                     <span className="sm:hidden">Glissez pour pivoter</span>
                     <span className="hidden sm:inline">Glissez pour pivoter · cliquez sur un objet</span>
                  </p>

                  <div className="absolute top-4 right-4 flex flex-col gap-2">
                     <button type="button" className={btn} onClick={() => api.current?.zoomBy(1.25)} aria-label="Zoomer">
                        <Plus className="w-4 h-4" />
                     </button>
                     <button type="button" className={btn} onClick={() => api.current?.zoomBy(0.8)} aria-label="Dézoomer">
                        <Minus className="w-4 h-4" />
                     </button>
                     <button type="button" className={btn} onClick={() => api.current?.reset()} aria-label="Revenir à la vue initiale">
                        <RotateCcw className="w-4 h-4" />
                     </button>
                  </div>
               </>
            )}
         </div>

         {/* atout mis en avant dans la scène */}
         <div className="relative flex items-center gap-3 sm:gap-4 mx-3 sm:mx-4 mb-3 sm:mb-4 p-2.5 sm:p-3 rounded-2xl bg-white/10 border border-white/10 backdrop-blur">
            <span className="w-11 h-11 shrink-0 rounded-xl bg-second flex items-center justify-center shadow-lg shadow-second/30">
               <FontAwesomeIcon icon={item.icone} />
            </span>
            <motion.span key={active} className="flex-1 min-w-0" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
               <span className="block text-[11px] font-semibold tracking-[0.2em] text-white/50">
                  {String(active + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
               </span>
               <span className="block font-bold leading-snug">{item.titre}</span>
            </motion.span>
            <button type="button" className={btn} onClick={() => pas(-1)} aria-label="Atout précédent">
               <ChevronLeft className="w-4 h-4" />
            </button>
            <button type="button" className={btn} onClick={() => pas(1)} aria-label="Atout suivant">
               <ChevronRight className="w-4 h-4" />
            </button>
         </div>
      </div>
   )
}

export default WhyScene
