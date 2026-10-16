import React from 'react';
import { assets, footerSections } from '../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedinIn, faYoutube } from "@fortawesome/free-brands-svg-icons";

const socials = [
  { href: "https://www.facebook.com/share/1C9VGo2zxn/", icon: faFacebook, label: "Facebook" },
  { href: "#", icon: faInstagram, label: "Instagram" },
  { href: "https://www.linkedin.com/in/lincoln-immo-services-072733319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", icon: faLinkedinIn, label: "LinkedIn" },
  { href: "#", icon: faYoutube, label: "YouTube" },
];

function Footer() {
  return (
    <footer className="bg-deep text-slate-300 mt-12">
      <div className="max-w-7xl mx-auto px-4 md:px-8 pt-14 pb-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2">
            <img className="w-11 rounded-md" src={assets.logo} alt="logo" />
            <span className="font-kaushan text-3xl text-white">ESGC</span>
          </div>
          <p className="mt-4 text-sm text-slate-400">
            École Supérieure de Commerce et de Gestion — Zone industrielle, en face du Lycée Victor Augagneur, Pointe-Noire.
          </p>
          <p className="mt-6 text-xs font-semibold uppercase tracking-widest text-white">Suivez-nous</p>
          <div className="mt-3 flex gap-3">
            {socials.map((s) => (
              <a key={s.label} href={s.href} aria-label={s.label} className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-white hover:bg-second transition">
                <FontAwesomeIcon icon={s.icon} />
              </a>
            ))}
          </div>
        </div>

        {footerSections.map((item, id) => (
          <div key={id}>
            <h2 className="text-white font-semibold mb-4">{item.title}</h2>
            <ul className="space-y-2">
              {item.items.map((it, idx) => (
                <li key={idx} className="text-sm hover:text-second transition"><a href="#filiere">{it}</a></li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="text-white font-semibold mb-4">Horaires</h2>
          <ul className="space-y-2 text-sm">
            <li>Lun - Ven : 8h00 - 17h00</li>
            <li>Samedi : 9h00 - 13h00</li>
            <li className="pt-2">+242 05 796 08 50</li>
            <li>contact@dgc-congo.org</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-400">
          <p>© {new Date().getFullYear()} ESGC — Tous droits réservés.</p>
          <a href="https://informatiky.com" rel="noopener" aria-label="Visitez le site du développeur Informatiky" target='_blank' className='hover:text-second transition'>Réalisé par : informatiky.com</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
