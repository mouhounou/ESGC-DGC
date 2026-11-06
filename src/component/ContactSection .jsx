/* eslint-disable no-unused-vars */
import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import { FaWhatsapp } from 'react-icons/fa'
import { AlertCircle, CheckCircle, Clock, Mail, MapPin, Navigation, Phone, Send } from 'lucide-react'
import { ecole } from '../data/content'
import { ariaChamp, champClasse, signalerErreurs, verifEmail, verifTelephone } from '../lib/validation'
import { apparition } from '../lib/apparition'
import { Eyebrow } from './Title'
import SocialLinks from './SocialLinks'
import Turnstile from './Turnstile'

// Même organisation que la page Contact du CCPM : formulaire validé à gauche ;
// carte, WhatsApp, réseaux et coordonnées à droite.

const API = 'https://api.dgc.informatiky.com/api/mail/mailler'

const vide = { nom: '', telephone: '', email: '', objet: '', message: '' }

const objets = [
   'Informations sur une filière',
   'Candidature / inscription',
   'Frais de scolarité et modalités de paiement',
   'Stages et insertion professionnelle',
   'Autre demande',
]
const exemples = {
   'Informations sur une filière': 'Filière qui vous intéresse, votre niveau d’études actuel…',
   'Candidature / inscription': 'Filière visée, niveau d’entrée, questions sur le dossier…',
   'Stages et insertion professionnelle': 'Votre filière, le type de stage ou de poste recherché…',
}

const inputClass =
   'w-full px-4 py-3 border-2 border-gray-200 rounded-xl bg-white text-gray-800 focus:border-first focus:ring-4 focus:ring-first/10 focus:outline-none transition-all placeholder:text-gray-400'
const labelClass = 'block text-sm font-semibold text-gray-700 mb-2'

const heure = (h) => `${Number(h.slice(0, 2))}h${h.slice(3)}`
const coordonnees = [
   { icon: Phone, titre: 'Téléphone', lignes: ecole.telephones.map((t) => t.numero), href: `tel:${ecole.telephones[0].tel}` },
   { icon: Mail, titre: 'Email', lignes: [ecole.email], href: `mailto:${ecole.email}` },
   { icon: MapPin, titre: 'Adresse', lignes: [ecole.adresse.rue, `${ecole.adresse.ville}, ${ecole.adresse.paysNom}`], href: ecole.itineraire },
   {
      icon: Clock,
      titre: 'Horaires',
      lignes: ecole.horaires.map((h) => `${h.jours.replace('Lundi - Vendredi', 'Lun – Ven')} : ${heure(h.ouverture)} – ${heure(h.fermeture)}`),
   },
]

// Ordre d'affichage des champs (notification et défilement vers le premier à corriger)
const ORDRE = [
   { cle: 'nom', cible: 'contact-nom' },
   { cle: 'telephone', cible: 'contact-telephone' },
   { cle: 'email', cible: 'contact-email' },
   { cle: 'objet', cible: 'contact-objet' },
   { cle: 'message', cible: 'contact-message' },
]

function valider(d) {
   return {
      nom: d.nom.trim() ? undefined : 'Indiquez votre nom complet.',
      telephone: verifTelephone(d.telephone),
      email: verifEmail(d.email),
      objet: d.objet ? undefined : "Choisissez l'objet de votre message.",
      message: d.message.trim() ? undefined : 'Écrivez votre message.',
   }
}
const aDesErreurs = (e) => Object.values(e).some(Boolean)

// Message d'aide affiché sous un champ en erreur
function ChampErreur({ id, message }) {
   if (!message) return null
   return (
      <p id={`${id}-erreur`} className="mt-1.5 flex items-start gap-1.5 text-xs font-medium text-red-600 animate-[apparition_0.2s_ease-out]">
         <AlertCircle className="w-3.5 h-3.5 shrink-0 mt-px" />
         {message}
      </p>
   )
}

const ContactSection = () => {
   const [form, setForm] = useState(vide)
   const [envoi, setEnvoi] = useState(false)
   const [captcha, setCaptcha] = useState('') // jeton Cloudflare Turnstile
   const turnstile = useRef(null)
   const [envoye, setEnvoye] = useState(false)
   const [erreurs, setErreurs] = useState({})
   const [tente, setTente] = useState(false) // une soumission a déjà été tentée

   const handleChange = (e) => {
      const suivant = { ...form, [e.target.name]: e.target.value }
      setForm(suivant)
      // après une tentative, le rouge disparaît dès que le champ est corrigé
      if (tente) setErreurs(valider(suivant))
   }

   const handleSubmit = async (e) => {
      e.preventDefault()
      const verif = valider(form)
      setTente(true)
      setErreurs(verif)
      if (aDesErreurs(verif)) {
         signalerErreurs(verif, ORDRE)
         return
      }
      if (!captcha) {
         toast.error("Merci de confirmer que vous n'êtes pas un robot.")
         return
      }
      setEnvoi(true)
      try {
         const res = await fetch(API, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
               name: form.nom,
               phone: form.telephone,
               email: form.email,
               subject: form.objet,
               message: form.message,
               site: 'esgc', // e-mails envoyés au nom de l'ESGC
               turnstileToken: captcha, // vérifié par l'API auprès de Cloudflare
            }),
         })
         const data = await res.json().catch(() => ({}))
         if (res.ok && data.success) {
            toast.success('Message envoyé avec succès ! Nous vous contacterons très bientôt')
            setForm(vide)
            setTente(false)
            setErreurs({})
            setEnvoye(true)
         } else {
            toast.error(data.message || 'Une erreur est survenue. Veuillez réessayer dans un instant')
         }
      } catch {
         toast.error('Une erreur est survenue. Veuillez réessayer dans un instant')
      } finally {
         setEnvoi(false)
         turnstile.current?.reset() // un jeton ne sert qu'une fois
      }
   }

   // props communes d'un champ
   const champ = (cle) => ({
      id: `contact-${cle}`,
      name: cle,
      value: form[cle],
      onChange: handleChange,
      ...ariaChamp(`contact-${cle}`, erreurs[cle]),
   })

   return (
      <section id='contact' className="max-w-7xl mx-auto px-4 md:px-8 py-16 text-gray-700">
         <motion.div className="max-w-2xl mx-auto text-center" {...apparition('flou')}>
            <Eyebrow>Contact</Eyebrow>
            <h2 className="mt-3 font-kaushan text-3xl md:text-5xl text-first">Contactez-nous</h2>
            <p className="mt-4 text-gray-500 max-w-md mx-auto">Une question sur nos filières, les admissions ou les inscriptions&nbsp;? Notre équipe vous répond rapidement.</p>
         </motion.div>

         <div className="mt-10 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-8 items-stretch">
            {/* Formulaire */}
            <motion.div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 md:p-9 min-w-0" {...apparition('gauche', 0.1)}>
               {envoye ? (
                  <div className="text-center py-10">
                     <div className="w-16 h-16 mx-auto rounded-full bg-green-100 flex items-center justify-center">
                        <CheckCircle className="w-9 h-9 text-green-600" />
                     </div>
                     <h3 className="mt-5 text-2xl font-bold text-deep">Message envoyé !</h3>
                     <p className="mt-2 text-gray-500">Merci, nous revenons vers vous très rapidement.</p>
                     <button
                        type="button"
                        onClick={() => setEnvoye(false)}
                        className="mt-6 px-6 py-3 rounded-full bg-first text-white font-semibold cursor-pointer hover:bg-second transition-all"
                     >
                        Envoyer un autre message
                     </button>
                  </div>
               ) : (
                  <>
                     <p className="text-xs font-bold uppercase tracking-[0.18em] text-second">Formulaire</p>
                     <h3 className="text-2xl md:text-3xl font-bold text-deep mt-2 mb-7">Envoyez-nous un message</h3>

                     <form onSubmit={handleSubmit} noValidate className="space-y-5">
                        <div className="grid md:grid-cols-2 gap-5">
                           <div>
                              <label htmlFor="contact-nom" className={labelClass}>Nom complet *</label>
                              <input type="text" required autoComplete="name" placeholder="Ex : Grâce Mabiala" className={champClasse(inputClass, erreurs.nom)} {...champ('nom')} />
                              <ChampErreur id="contact-nom" message={erreurs.nom} />
                           </div>
                           <div>
                              <label htmlFor="contact-telephone" className={labelClass}>Téléphone *</label>
                              <input type="tel" required autoComplete="tel" placeholder="Ex : +242 06 123 45 67" className={champClasse(inputClass, erreurs.telephone)} {...champ('telephone')} />
                              <ChampErreur id="contact-telephone" message={erreurs.telephone} />
                           </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-5">
                           <div>
                              <label htmlFor="contact-email" className={labelClass}>Email *</label>
                              <input type="email" required autoComplete="email" placeholder="votre@email.com" className={champClasse(inputClass, erreurs.email)} {...champ('email')} />
                              <ChampErreur id="contact-email" message={erreurs.email} />
                           </div>
                           <div>
                              <label htmlFor="contact-objet" className={labelClass}>Objet *</label>
                              <select required className={champClasse(`${inputClass} cursor-pointer`, erreurs.objet)} {...champ('objet')}>
                                 <option value="">Choisissez un objet</option>
                                 {objets.map((o) => (
                                    <option key={o} value={o}>{o}</option>
                                 ))}
                              </select>
                              <ChampErreur id="contact-objet" message={erreurs.objet} />
                           </div>
                        </div>

                        <div>
                           <label htmlFor="contact-message" className={labelClass}>Message *</label>
                           <textarea
                              required
                              rows={6}
                              placeholder={exemples[form.objet] || 'Décrivez votre demande…'}
                              className={champClasse(`${inputClass} resize-none`, erreurs.message)}
                              {...champ('message')}
                           />
                           <ChampErreur id="contact-message" message={erreurs.message} />
                        </div>

                        <Turnstile ref={turnstile} onToken={setCaptcha} action="contact" />

                        <button
                           type="submit"
                           disabled={envoi}
                           className="w-full cursor-pointer bg-gradient-to-r from-first to-deep text-white font-semibold py-4 rounded-2xl shadow-lg shadow-first/25 hover:from-second hover:to-[#c97c0c] hover:shadow-second/30 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-wait"
                        >
                           {envoi ? (
                              <>
                                 <span className="w-5 h-5 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                                 Envoi en cours…
                              </>
                           ) : (
                              <>
                                 <Send className="w-5 h-5" />
                                 Envoyer le message
                              </>
                           )}
                        </button>
                     </form>
                  </>
               )}
            </motion.div>

            {/* Carte + WhatsApp + coordonnées : la carte remplit la hauteur restante */}
            <motion.div className="flex flex-col gap-4 min-w-0" {...apparition('droite', 0.2)}>
               <div className="relative rounded-3xl overflow-hidden flex-1 min-h-64 bg-gray-200 border border-gray-100 shadow-sm">
                  <iframe
                     title="Localisation de l'ESGC à Pointe-Noire"
                     src={ecole.carte}
                     width="100%"
                     height="100%"
                     className="absolute inset-0 border-0"
                     allowFullScreen
                     loading="lazy"
                     referrerPolicy="no-referrer-when-downgrade"
                  />
                  <a
                     href={ecole.itineraire}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="absolute bottom-4 left-4 inline-flex items-center gap-2 px-4 py-2.5 rounded-full bg-white text-deep text-sm font-semibold shadow-lg hover:bg-gray-50 transition-colors"
                  >
                     <Navigation className="w-4 h-4 text-second" />
                     Itinéraire
                  </a>
               </div>

               {/* WhatsApp + réseaux sociaux */}
               <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
                  <a href={ecole.whatsapp.lien} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-4 min-w-0">
                     <span className="w-11 h-11 rounded-2xl bg-green-100 text-green-600 flex items-center justify-center shrink-0 group-hover:bg-green-500 group-hover:text-white transition-colors">
                        <FaWhatsapp className="w-5 h-5" />
                     </span>
                     <span className="min-w-0">
                        <span className="block font-bold text-deep group-hover:text-green-600 transition-colors">Plus rapide : WhatsApp</span>
                        <span className="block text-sm text-gray-500">Écrivez-nous au <span className="whitespace-nowrap">{ecole.whatsapp.numero}</span></span>
                     </span>
                  </a>
                  <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100">
                     <span className="text-xs font-bold uppercase tracking-widest text-gray-400">Suivez-nous</span>
                     <SocialLinks />
                  </div>
               </div>

               {/* Coordonnées */}
               <ul className="grid sm:grid-cols-2 gap-px bg-gray-100 rounded-3xl border border-gray-100 shadow-sm overflow-hidden">
                  {coordonnees.map(({ icon: Icon, titre, lignes, href }) => {
                     const content = (
                        <>
                           <Icon className="w-5 h-5 text-second shrink-0 mt-0.5" />
                           <span className="min-w-0">
                              <span className="block text-xs font-bold uppercase tracking-widest text-gray-400">{titre}</span>
                              {lignes.map((l) => (
                                 <span key={l} className="block text-sm text-deep">{l}</span>
                              ))}
                           </span>
                        </>
                     )
                     const cls = 'flex items-start gap-4 px-5 py-4'
                     return (
                        <li key={titre} className="bg-white">
                           {href ? (
                              <a
                                 href={href}
                                 target={href.startsWith('http') ? '_blank' : undefined}
                                 rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                                 className={`${cls} h-full hover:bg-gray-50 transition-colors`}
                              >
                                 {content}
                              </a>
                           ) : (
                              <div className={cls}>{content}</div>
                           )}
                        </li>
                     )
                  })}
               </ul>
            </motion.div>
         </div>
      </section>
   )
}

export default ContactSection
