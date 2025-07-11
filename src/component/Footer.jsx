import React from 'react';
import { footerSections } from '../assets';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faLinkedinIn, faYoutube } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <footer className=" py-10">
      <div className='w-full bg-gradient-to-r from-first to-first/70  rounded-lg'>
        <div className="w-full flex flex-col items-center justify-center sm:grid sm:grid-cols-2 lg:grid-cols-4 justify-items-center gap-10  text-slate-200 p-8 ">

          {footerSections.map((item, id) => (
            <div key={id} className="flex flex-col justify-center items-center">
              <h2 className="text-lg md:text-xl font-semibold mb-4 hover:scale-95 transition duration-200 cursor-pointer">{item.title}</h2>
              <ul className="space-y-2">
                {item.items.map((it, idx) => (
                  <li key={idx} className="text-sm">{it}</li>
                ))}
              </ul>
            </div>
          ))}

          <div className="w-[100%] sm:w-auto flex flex-col justify-center items-center sm:items-start">
            <h2 className="text-xl font-semibold mb-4">Suivez-nous sur</h2>
            <div className="w-[90%] sm:w-auto flex justify-between sm:gap-7 text-white">
              <a href="https://www.facebook.com/share/1C9VGo2zxn/" className="hover:text-third hover:scale-110 transition">
                <FontAwesomeIcon icon={faFacebook} size="lg" />
              </a>
              <a href="#" className="hover:text-third hover:scale-110 transition">
                <FontAwesomeIcon icon={faInstagram} size="lg" />
              </a>
              <a href="https://www.linkedin.com/in/lincoln-immo-services-072733319?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app" className="hover:text-third hover:scale-110 transition">
                <FontAwesomeIcon icon={faLinkedinIn} size="lg" />
              </a>
              <a href="#" className="hover:text-third hover:scale-110 transition">
                <FontAwesomeIcon icon={faYoutube} size="lg" />
              </a>
            </div>
          </div>
        </div>

        <div className='w-full  mt-3 flex justify-center  items-center'>
          <div className='w-[70%] flex justify-center items-center border-t border-t-slate-300'>
            <a href="https://informatiky.com"  rel="noopener" aria-label="Visitez le site du développeur Informatiky" target='_blank' className='pb-2.5 pt-1.5 text-sm text-slate-300'>Réalisé par : informatiky.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
