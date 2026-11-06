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
      <section id='home'>
         {/* pleine largeur, le menu est posé dessus */}
         <div className="relative overflow-hidden rounded-b-[2.5rem] md:rounded-b-[3.5rem] min-h-[640px] lg:min-h-[720px] flex items-center">
            <img src={heroImage} alt="Étudiants de l'ESGC" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-deep from-30% via-deep/80 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-deep/60 to-transparent lg:hidden" />
            {/* assombrit le haut pour que le menu reste lisible sur la photo */}
            <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-deep/80 to-transparent" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 pt-32 pb-16 lg:pt-36 lg:pb-20">
               <div className="lg:w-[58%] text-white flex flex-col">
                  <motion.div
                     className="flex items-center gap-3 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-second"
                     initial="hidden" animate="visible" variants={fadeUp} custom={0}
                  >
                     <span className="w-8 h-[2px] bg-second" />
                     Bienvenue à l'ESGC
                  </motion.div>
   
                  <motion.h1
                     className="mt-5 font-kaushan text-4xl sm:text-5xl xl:text-6xl leading-[1.15]"
                     initial="hidden" animate="visible" variants={fadeUp} custom={1}
                  >
                     École Supérieure <br className="hidden sm:block" />
                     de Commerce <br className="hidden sm:block" />
                     et de <span className="text-second">Gestion</span>
                  </motion.h1>
   
                  <motion.p
                     className="mt-6 text-base sm:text-lg leading-relaxed text-white/85 max-w-md"
                     initial="hidden" animate="visible" variants={fadeUp} custom={2}
                  >
                     Nous formons des étudiants ambitieux, prêts à relever les défis du monde
                     professionnel à travers une pédagogie pratique et innovante.
                  </motion.p>
   
                  <motion.div
                     className="flex flex-wrap items-center gap-3 font-semibold mt-8"
                     initial="hidden" animate="visible" variants={fadeUp} custom={3}
                  >
                     <a href="#filiere" className="px-6 py-3 bg-second rounded-full shadow-lg shadow-second/30 hover:bg-white hover:text-first transition">
                        Découvrir nos formations
                     </a>
                     <a href="#contact" className="px-6 py-3 border border-white/60 rounded-full hover:bg-white hover:text-first transition">
                        Contactez-nous
                     </a>
                  </motion.div>
   
                  <motion.dl
                     className="mt-10 pt-6 border-t border-white/15 grid grid-cols-3 gap-4 max-w-md"
                     initial="hidden" animate="visible" variants={fadeUp} custom={4}
                  >
                     {[
                        ['21', "ans d'expérience"],
                        [formations.length, 'filières'],
                        ['Stages', 'en entreprise'],
                     ].map(([valeur, libelle]) => (
                        <div key={libelle}>
                           <dt className="sr-only">{libelle}</dt>
                           <dd className="text-xl sm:text-2xl font-bold text-white">{valeur}</dd>
                           <dd className="text-xs text-white/65">{libelle}</dd>
                        </div>
                     ))}
                  </motion.dl>
               </div>
            </div>
         </div>

         {/* Bandeau des filières qui défile en continu (pause au survol) */}
         <div className="max-w-7xl mx-auto px-4 md:px-8 mt-8 flex flex-col items-center gap-4">
            <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">Nos filières</p>
            <div className="defilement w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
               {/* deux copies identiques à la suite : la piste glisse d'une copie puis recommence */}
               <div className="defilement-piste flex w-max py-1">
                  {[0, 1].map((copie) =>
                     formations.map((item) => (
                        <a
                           key={`${copie}-${item.id}`}
                           href="#filiere"
                           aria-hidden={copie === 1 ? true : undefined}
                           tabIndex={copie === 1 ? -1 : undefined}
                           className="mr-3 shrink-0 inline-flex items-center gap-2 px-5 py-2 rounded-full border border-gray-200 bg-white text-sm font-medium text-gray-700 whitespace-nowrap hover:border-first hover:text-first transition"
                        >
                           <span className="w-1.5 h-1.5 rounded-full bg-second" />
                           {item.titre}
                        </a>
                     ))
                  )}
               </div>
            </div>
         </div>
      </section>
   )
}

export default Hero
