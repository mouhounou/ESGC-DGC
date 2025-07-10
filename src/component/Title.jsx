import React from 'react'

function Title({titre, styles}) {
   return (
      <>
         <h1 className={`text-3xl font-kaushan font-semibold ${styles? styles : ""} `}>{titre}</h1>
      </>
   )
}

export default Title