import React from 'react'

// Petit libellé au-dessus des titres de section
export function Eyebrow({ children, styles }) {
   return (
      <p className={`text-xs font-semibold uppercase tracking-widest text-second ${styles ? styles : ""}`}>{children}</p>
   )
}

function Title({titre, styles}) {
   return (
      <>
         <h1 className={`text-3xl font-kaushan font-semibold ${styles? styles : ""} `}>{titre}</h1>
      </>
   )
}

export default Title
