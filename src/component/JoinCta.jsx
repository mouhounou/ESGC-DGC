/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { FaWhatsapp } from 'react-icons/fa'
import { ArrowRight, Clock, Phone } from 'lucide-react'
import { ecole } from '../data/content'
import { apparition } from '../lib/apparition'

const recrutement = ecole.telephones.find((t) => t.libelle === 'Recrutement') ?? ecole.telephones[0]
const heure = (h) => `${Number(h.slice(0, 2))}h${h.slice(3)}`

// Appel à l'action pleine largeur, sur le même fond que le footer
function JoinCta() {
   return (
      <section className='relative overflow-hidden bg-gradient-to-br from-deep to-[#0f2944] text-white'>
         {/* décor repris du footer */}
         <div className='absolute inset-0 pointer-events-none' aria-hidden='true'>
            <div className='absolute -top-40 -left-32 w-[30rem] h-[30rem] rounded-full border border-white/5' />
            <div className='absolute -bottom-48 -right-40 w-[36rem] h-[36rem] rounded-full border border-white/5' />
            <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-64 bg-second/15 blur-3xl rounded-full' />
         </div>

         <div className='relative max-w-7xl mx-auto px-4 md:px-8 py-16 md:py-24 flex flex-col items-center text-center'>
            <motion.div className='max-w-4xl' {...apparition('flou')}>
               <p className='inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.2em] text-second'>
                  <span className='w-8 h-[2px] bg-second' />
                  Rejoignez-nous
                  <span className='w-8 h-[2px] bg-second' />
               </p>
               <h2 className='mt-5 font-kaushan text-4xl md:text-6xl leading-[1.15]'>
                  Prêt à rejoindre l'ESGC&nbsp;?
                  <span className='block mt-1 text-3xl md:text-5xl text-second'>Construisez votre avenir dès maintenant</span>
               </h2>
               <p className='mt-6 text-white/75 max-w-xl mx-auto'>
                  Inscriptions, informations sur nos filières : notre secrétariat vous répond du lundi au samedi.
               </p>
            </motion.div>

            <motion.div className='mt-9 flex flex-wrap items-center justify-center gap-3' {...apparition('haut', 0.15)}>
               <a
                  href='#contact'
                  className='group inline-flex items-center gap-2 pl-6 pr-2 py-2 rounded-full bg-second font-semibold shadow-lg shadow-second/30 hover:bg-white hover:text-first transition'
               >
                  Nous contacter
                  <span className='w-9 h-9 rounded-full bg-white/20 flex items-center justify-center group-hover:translate-x-0.5 transition-transform'>
                     <ArrowRight size={16} />
                  </span>
               </a>
               <a
                  href={ecole.whatsapp.lien}
                  target='_blank'
                  rel='noopener noreferrer'
                  className='inline-flex items-center gap-2 px-6 py-3 rounded-full bg-white/10 border border-white/15 font-semibold hover:bg-[#25D366] hover:border-[#25D366] transition'
               >
                  <FaWhatsapp className='w-5 h-5' />
                  WhatsApp
               </a>
               <a
                  href={`tel:${recrutement.tel}`}
                  className='inline-flex items-center gap-3 pl-2 pr-5 py-1.5 rounded-full bg-white/10 border border-white/15 hover:bg-white hover:text-first transition'
               >
                  <span className='w-9 h-9 rounded-full bg-white/15 flex items-center justify-center'>
                     <Phone size={16} />
                  </span>
                  <span className='text-left leading-tight'>
                     <span className='block text-[11px] opacity-70'>{recrutement.libelle}</span>
                     <span className='font-semibold'>{recrutement.numero}</span>
                  </span>
               </a>
            </motion.div>

            <motion.ul className='mt-8 flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm text-white/60' {...apparition('haut', 0.25)}>
               {ecole.horaires.map((h) => (
                  <li key={h.jours} className='inline-flex items-center gap-2'>
                     <Clock className='w-4 h-4 text-second' />
                     {h.jours} : {heure(h.ouverture)} – {heure(h.fermeture)}
                  </li>
               ))}
            </motion.ul>
         </div>
      </section>
   )
}

export default JoinCta
