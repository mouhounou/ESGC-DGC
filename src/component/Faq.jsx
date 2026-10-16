import { faq } from '../data/content'
import { Eyebrow } from './Title'

// Questions fréquentes : <details> natifs, lisibles sans JavaScript et par les moteurs de réponse
function Faq() {
   return (
      <section id='faq' className='max-w-4xl mx-auto px-4 md:px-8 py-16'>
         <div className='text-center'>
            <Eyebrow>Questions fréquentes</Eyebrow>
            <h2 className='mt-3 font-kaushan text-3xl md:text-5xl text-first'>Vos questions sur l'ESGC</h2>
            <p className='mt-4 text-gray-500'>Les réponses aux questions que nous posent le plus souvent les futurs étudiants.</p>
         </div>

         <div className='mt-10 space-y-3'>
            {faq.map((item, i) => (
               <details
                  key={item.question}
                  open={i === 0}
                  className='group bg-white rounded-2xl border border-gray-100 shadow-sm open:shadow-md open:border-second/40 transition'
               >
                  <summary className='flex items-center justify-between gap-4 cursor-pointer list-none px-6 py-5 [&::-webkit-details-marker]:hidden'>
                     <h3 className='font-semibold text-gray-800 group-open:text-first transition-colors'>{item.question}</h3>
                     <span className='w-8 h-8 rounded-full bg-first/10 text-first flex items-center justify-center shrink-0 text-lg leading-none group-open:bg-second group-open:text-white group-open:rotate-45 transition'>+</span>
                  </summary>
                  <p className='px-6 pb-5 -mt-1 text-sm text-gray-600 leading-relaxed'>{item.reponse}</p>
               </details>
            ))}
         </div>
      </section>
   )
}

export default Faq
