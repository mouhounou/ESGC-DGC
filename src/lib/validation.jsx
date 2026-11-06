import { toast } from 'react-toastify'

// Validation des formulaires (même logique que le site du CCPM) : champ en rouge,
// message d'aide sous le champ, notification récapitulative et défilement
// jusqu'au premier champ à corriger.

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
const TELEPHONE = /^\+?[0-9 ]{8,}$/

// Vérifications communes
export const verifEmail = (v) =>
   !v.trim() ? 'Indiquez votre adresse email.' : !EMAIL.test(v.trim()) ? 'Adresse email invalide (ex : nom@domaine.com).' : undefined
export const verifTelephone = (v) =>
   !v.trim()
      ? 'Indiquez votre numéro de téléphone.'
      : !TELEPHONE.test(v.trim())
        ? 'Numéro invalide : chiffres, espaces et + uniquement, 8 caractères minimum.'
        : undefined

// Ajoute le style d'erreur à la classe d'un champ
export const champClasse = (base, erreur) =>
   erreur ? `${base} border-red-400! bg-red-50/50! focus:border-red-500! focus:ring-red-500/15!` : base

// Attributs d'accessibilité d'un champ (lecteurs d'écran)
export const ariaChamp = (id, erreur) => ({
   'aria-invalid': erreur ? true : undefined,
   'aria-describedby': erreur ? `${id}-erreur` : undefined,
})

let derniereNotification = null

// Notification récapitulative + défilement vers le premier champ à corriger.
// `ordre` liste les champs dans l'ordre d'affichage, avec l'id de l'élément à cibler.
export function signalerErreurs(erreurs, ordre) {
   const aCorriger = ordre.filter((o) => erreurs[o.cle])
   if (aCorriger.length === 0) return

   const contenu = (
      <div className="text-sm">
         <p className="font-bold text-deep">
            {aCorriger.length === 1 ? 'Un champ est à compléter' : `${aCorriger.length} champs sont à compléter`}
         </p>
         <ul className="mt-1.5 space-y-1 text-gray-600">
            {aCorriger.map((o) => (
               <li key={o.cle} className="flex gap-1.5">
                  <span className="text-red-500">•</span>
                  {erreurs[o.cle]}
               </li>
            ))}
         </ul>
         <p className="mt-2 text-xs text-gray-500">Les champs concernés sont signalés en rouge.</p>
      </div>
   )
   // une seule notification à la fois : l'ancienne se ferme, une nouvelle la remplace
   if (derniereNotification !== null) toast.dismiss(derniereNotification)
   derniereNotification = toast.error(contenu, { autoClose: 8000 })

   const el = document.getElementById(aCorriger[0].cible)
   el?.scrollIntoView({ behavior: 'smooth', block: 'center' })
   el?.focus({ preventScroll: true })
}
