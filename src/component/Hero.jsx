/* eslint-disable no-unused-vars */
import { motion } from 'framer-motion'
import { assets } from '../assets'


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
   <div id='home' className="relative w-full lg:h-[80vh] bg-first text-white rounded-md flex flex-col lg:flex-row justify-between items-end px-[2.5%] pt-[3rem]">
      <div className="w-full lg:flex-2 mb-[4rem] text-center sm:text-start pt-[3.7rem] md:pt-0 flex flex-col items-center md:items-start justify-center">
         <motion.h1
            className="font-kaushan text-3xl sm:text-3xl  lg:text-7xl font-bold"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={1}
         >
            École Supérieure de <br className='hidden lg:block' /> Commerce et de <br className='hidden lg:block' /> Gestion
         </motion.h1>

         <motion.p
            className="text-sm sm:text-base mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, duration: 0.6 }}
            variants={fadeUp}
            custom={2}
         >
            Nous formons des étudiants ambitieux, prêts à relever les défis du monde <br className='hidden lg:block' />
            professionnel à travers une pédagogie pratique et innovante
         </motion.p>

         <motion.div
            className="flex flex-row items-start gap-3 font-semibold mt-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, duration: 0.6 }}
            variants={fadeUp}
            custom={4}
         >
            <a
               href="#filiere"
               className="px-2 md:px-4 py-2 bg-second rounded-md hover:opacity-90 transition"
            >
               Découvrir nos formations
            </a>
            <a
               href="#contact"
               className="px-4 py-2 border rounded-md hover:bg-white hover:text-first transition"
            >
               Contactez-nous
            </a>
         </motion.div>
      </div>

      <motion.div
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.6, ease: 'easeOut' }}
         viewport={{ once: false }}
         className="w-full lg:flex-1 relative bottom-0 flex justify-center items-center lg:mt-0 overflow-visible"
         >
         <div className="absolute bottom-34 lg: bottom-0 lg:-top-[25rem] w-[16rem] h-[16rem] md:w-[22rem] md:h-[20rem] bg-second z-10 blur-3xl bottom-0 right-16 lg:right-0"></div>

         <img
            className="lg:absolute bottom-0 right-9 w-[80%] max-w-lg lg:w-[92%] lg:max-w-none z-30 pointer-events-none"
            src={assets.accueil}
            alt="Illustration informatique"
         />
      </motion.div>

   </div>
)
}

export default Hero
