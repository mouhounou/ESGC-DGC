import { FaFacebookF, FaLinkedinIn, FaTiktok } from 'react-icons/fa'

const socials = [
   { href: 'https://www.facebook.com/DGCFormations', icon: FaFacebookF, label: 'Facebook', survol: 'hover:bg-[#1877f2] hover:border-[#1877f2]' },
   { href: 'https://www.linkedin.com/school/dgccongo/', icon: FaLinkedinIn, label: 'LinkedIn', survol: 'hover:bg-[#0a66c2] hover:border-[#0a66c2]' },
   { href: 'https://www.tiktok.com/@dgc.groupe', icon: FaTiktok, label: 'TikTok', survol: 'hover:bg-black hover:border-black' },
]

// Liens vers les réseaux sociaux : variante sombre (footer) ou claire (section contact)
function SocialLinks({ dark = false }) {
   return (
      <div className={`flex ${dark ? 'gap-3' : 'gap-2'}`}>
         {socials.map((s) => {
            const Icon = s.icon
            return (
               <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`ESGC sur ${s.label}`}
                  title={s.label}
                  className={
                     dark
                        ? 'w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-second transition'
                        : `w-9 h-9 rounded-full bg-white border border-gray-200 text-deep flex items-center justify-center hover:text-white transition-colors ${s.survol}`
                  }
               >
                  <Icon />
               </a>
            )
         })}
      </div>
   )
}

export default SocialLinks
