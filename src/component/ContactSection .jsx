/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from 'react-icons/fa'
import GoogleMapEmbed from './GoogleMapEmbed'
import { toast } from 'react-toastify'
import axios from 'axios'
import {HashLoader} from 'react-spinners'
import { useEffect, useState } from 'react'
import { Eyebrow } from './Title'


const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
}

const ContactSection = ({ prefillEmail }) => {

  
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [subject, setSubject] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    // email saisi dans le bandeau d'appel à l'action
    useEffect(() => {
      if (prefillEmail) setEmail(prefillEmail)
    }, [prefillEmail])
  
    const toSubmit = async(e) => {
      e.preventDefault()
      setLoading(true)
  
      try {
        
        if (!name || !phone || !email || !subject || !message) { 
          toast.error('Remplissez tous les champs de texte')
          setLoading(false)
          return
        }
  
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
          toast.error('Adresse email invalide')
          setLoading(false)
          return
        }
  
        const res = await axios.post('https://api-q0vq.onrender.com/api/mail/mailler', { name, phone, email, subject, message })
        console.log('====================================');
        console.log(res.data);
        console.log('====================================');
        
        if (res.data.success) {
          toast.success('Le mail a été envoyé avec succès')
          setEmail('')
          setName('')
          setPhone('')
          setSubject('')
          setMessage('')
          setLoading(false)
        } else {
          toast.error(res.data.message)
          setLoading(false)
        }
  
      } catch (err) {
        toast.error(err.message)
        setLoading(false)
        console.log('====================================');
        console.log(err.message);
        console.log('====================================');
      }
    } 
  return (
    <section id='contact' className="max-w-7xl mx-auto py-16 text-gray-700 px-4 md:px-8 w-full flex flex-col items-center justify-center gap-5">
      <motion.div
        className="flex flex-col items-center justify-center gap-2 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, duration: 0.6 }}
        variants={fadeInUp}
        custom={1}
      >
        <Eyebrow>Contact</Eyebrow>
        <h2 className="font-kaushan text-3xl md:text-5xl text-first">Contactez-nous</h2>
        <p className="text-gray-500">Pour plus d'informations sur nos formations et inscriptions</p>
      </motion.div>

      <div className="w-full mx-auto flex flex-col md:flex-row gap-8 mt-6">
        {/* Bloc Gauche – Informations */}
        <motion.div
            className="md:w-1/2  bg-white border border-gray-100 shadow-sm rounded-2xl overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, duration: 0.6 }}
            variants={fadeInUp}
            custom={2}
        >
         <div className="p-6 space-y-5">
            <div className="flex items-start gap-3">
              <FaMapMarkerAlt className="text-second text-3xl mt-1" />
              <div>
                <p className="font-medium">Adresse</p>
                <p>
                  Zone industrielle, en face du Lycée Victor Augagneur<br />
                  Pointe-Noire, République du Congo
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <FaPhoneAlt className="text-second text-3xl mt-1" />
              <div>
                <p className="font-medium">Sécrétariat</p>
                <p>+242 05 796 08 50</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
               <FaPhoneAlt className="text-second text-3xl mt-1" />
               <div>
                  <p className="font-medium">Recrutement</p>
                  <p>+242 05 092 74 23</p>
               </div>
            </div>

            <div className="flex items-start gap-3">
              <FaEnvelope className="text-second text-3xl mt-1" />
              <div>
                <p className="font-medium">Email</p>
                <p>contact@dgc-congo.org</p>
              </div>
            </div>

            <div>
              <p className="font-medium">Horaires d'ouverture</p>
              <p>
                Lundi - Vendredi: 8h00 - 17h00<br />
                Samedi: 9h00 - 13h00
              </p>
            </div>
          </div>
          <GoogleMapEmbed/>
        </motion.div>

        {/* Bloc Droite – Formulaire */}
        <motion.div
          className="md:w-1/2"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, duration: 0.6 }}
          variants={fadeInUp}
          custom={3}
        >
          <form onSubmit={toSubmit} className="bg-white border border-gray-100 shadow-sm rounded-2xl p-6 space-y-4">
            <div>
              <label htmlFor="name" className="block font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                type="text"
                id="name"
                className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:border-first" />
            </div>

            <div>
              <label htmlFor="email" className="block font-medium text-gray-700 mb-1">
                Adresse email
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                type="email" id="email" className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:border-first" />
            </div>

            <div>
              <label htmlFor="phone" className="block font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
                required
                type="tel" id="phone" className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:border-first" />
            </div>

            <div>
              <label htmlFor="subject" className="block font-medium text-gray-700 mb-1">
                Sujet
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                id="subject" className="cursor-pointer w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:border-first">
                <option value="">Choisissez un sujet</option>
                <option value="formation">Formation</option>
                <option value="inscription">Inscription</option>
                <option value="autre">Autre</option>
              </select>
            </div>

            <div>
              <label htmlFor="message" className="block font-medium text-gray-700 mb-1">
                Message
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
                id="message" rows="4" className="w-full border border-gray-200 rounded-xl p-2.5 outline-none focus:border-first" />
            </div>
            {
              loading ? 
                <div className='w-full py-3 flex items-center justify-center'>
                  <HashLoader color='#2e659e' />
                </div>
                
                :
                <button
                  type="submit"
                  className="w-full bg-first hover:bg-second transition cursor-pointer text-white font-semibold py-2.5 rounded-full"
                >
                  Envoyer
              </button>
            }
          </form>
        </motion.div>
      </div>
    </section>
  )
}

export default ContactSection
