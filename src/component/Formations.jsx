/* eslint-disable no-unused-vars */
import Title from './Title'
import { formations } from '../assets'
import { useState, useEffect } from 'react'

function Formations() {
   const [selected, setSelected] = useState('')
   const [detail, setDetail] = useState(null)
   const [open, setOpen] = useState(false)

   useEffect(() => {
      const filtered = formations.find((item) => item.id === selected)
      setDetail(filtered)
   }, [selected])

   return (
      <div id="filiere" className="w-full px-[1%] py-[3rem] bg-gradient-to-r from-first/75 to-first rounded-md flex flex-col items-center gap-4">
         <Title titre="Nos formations" styles="text-white" />
         <p className="text-white text-center">Découvrez nos 5 parcours de formation spécialisés</p>

         <div className="w-full mt-[3rem] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {formations.map((item, index) => (
               <div
                  key={index}
                  className="flex flex-col bg-white shadow-md rounded-md overflow-hidden h-full"
               >
                  <div className="relative">
                     <img
                        className="w-full h-[240px] object-cover"
                        src={item.image}
                        alt={item.titre}
                     />
                     <div className="absolute top-0 left-0 w-full h-full bg-first/25" />
                  </div>

                  <div className="flex flex-col flex-1 px-4 py-3">
                     <h1 className="text-2xl font-bold text-first">{item.titre}</h1>
                     <p className="text-gray-700 my-4 flex-1">{item.description}</p>
                     <button
                        onClick={() => {
                           setSelected(item.id)
                           setOpen(true)
                        }}
                        className="w-full text-center py-2 cursor-pointer hover:scale-75 bg-second rounded-md font-semibold text-white mt-auto"
                     >
                        En savoir plus
                     </button>
                  </div>
               </div>
            ))}
         </div>

         {/* Modale */}
         {open && detail && (
            <div className="fixed top-0 left-0 w-full h-screen bg-black/60 z-50 flex items-center justify-center">
               <div className=" w-[90%] md:w-[70%] h-[90%] bg-white rounded-xl shadow-xl  p-4">
                  
                  <div className = "flex items-center justify-between">
                     <span></span>
                     <button
                        onClick={() => setOpen(false)}
                        className=" text-gray-600 hover:text-black cursor-pointer hover:scale-75 transition-all from-neutral-200 font-bold text-xl"
                     >
                        ✕
                     </button>
                  </div>

                  <div className='w-full h-full overflow-y-auto pt-[1rem] flex flex-col gap-3'>
                     <img className='w-full h-[300px] rounded-md object-cover' src={detail.image} alt="" />
                     <h1 className="text-3xl font-bold text-first">{detail.titre}</h1>
                     <p className="text-gray-700">{detail.description}</p>
                     
                  </div>
               </div>
            </div>
         )}
      </div>
   )
}

export default Formations
