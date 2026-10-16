/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { formations, heroImage } from '../assets'

const fadeUp = {
   hidden: { opacity: 0, y: 40 },
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

const Hero = () => {
   return (
      <section id='home' className="max-w-7xl mx-auto px-4 md:px-8 pt-4">
         <div className="relative overflow-hidden rounded-3xl min-h-[460px] lg:min-h-[560px] flex items-center">
            <img src={heroImage} alt="Étudiants de l'ESGC" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-deep via-deep/85 to-first/30" />

            <div className="relative z-10 px-6 sm:px-10 lg:px-14 py-14 max-w-3xl text-white">
               <motion.p
                  className="inline-block text-xs font-semibold uppercase tracking-widest bg-white/10 border border-white/20 rounded-full px-3 py-1"
                  initial="hidden" animate="visible" variants={fadeUp} custom={0}
               >
                  Pointe-Noire · Plus de 20 ans d'expérience
               </motion.p>

               <motion.h1
                  className="mt-5 font-kaushan text-4xl sm:text-5xl lg:text-7xl leading-tight"
                  initial="hidden" animate="visible" variants={fadeUp} custom={1}
               >
                  École Supérieure de Commerce et de <span className="text-second">Gestion</span>
               </motion.h1>

               <motion.p
                  className="text-sm sm:text-base mt-6 text-white/85 max-w-xl"
                  initial="hidden" animate="visible" variants={fadeUp} custom={2}
               >
                  Nous formons des étudiants ambitieux, prêts à relever les défis du monde
                  professionnel à travers une pédagogie pratique et innovante.
               </motion.p>

               <motion.div
                  className="flex flex-wrap items-center gap-3 font-semibold mt-8"
                  initial="hidden" animate="visible" variants={fadeUp} custom={3}
               >
                  <a href="#filiere" className="px-6 py-2.5 bg-second rounded-full hover:bg-white hover:text-first transition">
                     Découvrir nos formations
                  </a>
                  <a href="#contact" className="px-6 py-2.5 border border-white/70 rounded-full hover:bg-white hover:text-first transition">
                     Contactez-nous
                  </a>
               </motion.div>
            </div>
         </div>

         {/* Bandeau des filières (façon logos partenaires) */}
         <div className="mt-6 flex flex-col md:flex-row md:items-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500 shrink-0">Nos filières</p>
            <div className="flex flex-wrap gap-2">
               {formations.map((item) => (
                  <a
                     key={item.id}
                     href="#filiere"
                     className="px-4 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 hover:border-first hover:text-first transition"
                  >
                     {item.titre}
                  </a>
               ))}
            </div>
         </div>
      </section>
   )
}

export default Hero
