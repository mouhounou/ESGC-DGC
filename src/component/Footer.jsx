/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { ArrowUp, Clock, Mail, MapPin, Phone } from 'lucide-react'
import { assets, formations } from '../assets'
import { ecole } from '../data/content'
import { apparition } from '../lib/apparition'
import SocialLinks from './SocialLinks'

const navigation = [
   { href: '#home', label: 'Accueil' },
   { href: '#pourquoi', label: 'Pourquoi ESGC' },
   { href: '#filiere', label: 'Nos formations' },
   { href: '#debouches', label: 'Débouchés' },
   { href: '#candidature', label: 'Candidature' },
   { href: '#contact', label: 'Contact' },
]

// Les autres établissements du Groupe DGC-Formation
const groupe = [
   { href: 'https://www.dgc-congo.org', label: 'Groupe DGC' },
   { href: 'https://esit.dgc-congo.org', label: 'ESIT' },
   { href: 'http://esup.dgc-congo.org', label: 'ESUP' },
   { href: 'https://ccpm.dgc-congo.org', label: 'CCPM' },
]

const heure = (h) => `${Number(h.slice(0, 2))}h${h.slice(3)}`

const titre = 'text-xs font-bold uppercase tracking-[0.2em] text-white/40 mb-5'
const lien = 'group inline-flex items-center text-white/65 hover:text-white transition'

function Footer() {
   return (
      <footer className='relative overflow-hidden mt-12 rounded-t-[2.5rem] md:rounded-t-[3.5rem] bg-gradient-to-br from-deep to-[#0f2944] text-white'>
         {/* décor */}
         <div className='absolute inset-0 pointer-events-none' aria-hidden='true'>
            <div className='absolute -top-32 -left-24 w-[28rem] h-[28rem] rounded-full border border-white/5' />
            <div className='absolute top-1/3 -right-40 w-[34rem] h-[34rem] rounded-full border border-white/5' />
            <div className='absolute -top-16 right-1/4 w-80 h-64 bg-second/15 blur-3xl rounded-full' />
         </div>

         <motion.div className='relative max-w-7xl mx-auto px-6 sm:px-10 pt-14 pb-6' {...apparition('haut', 0, 0.8)}>
            <div className='grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.5fr_0.9fr_1.4fr_1.3fr] text-sm'>
               {/* identité */}
               <div className='col-span-2 lg:col-span-1'>
                  <div className='flex items-center gap-3'>
                     <img className='w-12 rounded-md' src={assets.logo} alt='logo ESGC' />
                     <span>
                        <span className='block font-kaushan text-3xl leading-none'>ESGC</span>
                        <span className='block text-[11px] text-white/50 mt-1'>Pointe-Noire · Congo</span>
                     </span>
                  </div>
                  <p className='mt-4 text-white/60 leading-relaxed max-w-xs'>
                     École Supérieure de Commerce et de Gestion : 21 ans à former les professionnels du commerce et de la gestion.
                  </p>
                  <div className='mt-5'>
                     <SocialLinks dark />
                  </div>
                  <p className='mt-6 text-[11px] font-semibold uppercase tracking-[0.18em] text-white/40'>Le Groupe DGC-Formation</p>
                  <div className='mt-2.5 flex flex-wrap gap-2'>
                     {groupe.map((g) => (
                        <a
                           key={g.label}
                           href={g.href}
                           target='_blank'
                           rel='noopener noreferrer'
                           className='px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs text-white/70 hover:bg-second hover:border-second hover:text-white transition'
                        >
                           {g.label}
                        </a>
                     ))}
                  </div>
               </div>

               {/* navigation */}
               <div>
                  <p className={titre}>Navigation</p>
                  <ul className='space-y-2.5'>
                     {navigation.map((n) => (
                        <li key={n.href}>
                           <a href={n.href} className={lien}>
                              <span className='w-0 group-hover:w-3 group-hover:mr-2 h-px bg-second transition-all' />
                              {n.label}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* formations */}
               <div>
                  <p className={titre}>Nos formations</p>
                  <ul className='space-y-2.5'>
                     {formations.map((f) => (
                        <li key={f.id}>
                           <a href='#filiere' className={lien}>
                              <span className='w-0 group-hover:w-3 group-hover:mr-2 h-px bg-second transition-all' />
                              {f.titre}
                           </a>
                        </li>
                     ))}
                  </ul>
               </div>

               {/* contact */}
               <div className='col-span-2 lg:col-span-1'>
                  <p className={titre}>Contact</p>
                  <ul className='space-y-3.5 text-white/65'>
                     {ecole.telephones.map((t) => (
                        <li key={t.tel}>
                           <a href={`tel:${t.tel}`} className='flex items-start gap-3 hover:text-white transition'>
                              <Phone className='w-4 h-4 mt-0.5 shrink-0 text-second' />
                              <span>
                                 <span className='block text-[11px] text-white/40'>{t.libelle}</span>
                                 {t.numero}
                              </span>
                           </a>
                        </li>
                     ))}
                     <li>
                        <a href={`mailto:${ecole.email}`} className='flex items-start gap-3 hover:text-white transition'>
                           <Mail className='w-4 h-4 mt-0.5 shrink-0 text-second' />
                           {ecole.email}
                        </a>
                     </li>
                     <li>
                        <a href={ecole.itineraire} target='_blank' rel='noopener noreferrer' className='flex items-start gap-3 hover:text-white transition'>
                           <MapPin className='w-4 h-4 mt-0.5 shrink-0 text-second' />
                           {ecole.adresse.rue}, {ecole.adresse.ville}
                        </a>
                     </li>
                     <li className='flex items-start gap-3'>
                        <Clock className='w-4 h-4 mt-0.5 shrink-0 text-second' />
                        <span>
                           {ecole.horaires.map((h) => (
                              <span key={h.jours} className='block'>
                                 {h.jours} : {heure(h.ouverture)} – {heure(h.fermeture)}
                              </span>
                           ))}
                        </span>
                     </li>
                  </ul>
               </div>
            </div>

            <div className='mt-12 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/50'>
               <p>© {new Date().getFullYear()} ESGC — Groupe DGC-Formation. Tous droits réservés.</p>
               <div className='flex items-center gap-5'>
                  <a className='hover:text-white transition' href='https://informatiky.com' target='_blank' rel='noopener noreferrer'>
                     Réalisé par informatiky.com
                  </a>
                  <a
                     href='#home'
                     aria-label='Revenir en haut de la page'
                     className='w-9 h-9 rounded-full bg-white/10 border border-white/15 text-white flex items-center justify-center hover:bg-second hover:border-second transition'
                  >
                     <ArrowUp size={16} />
                  </a>
               </div>
            </div>
         </motion.div>
      </footer>
   )
}

export default Footer
