import { useEffect, useState } from 'react'
import { assets } from '../assets'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [change, setChange] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setChange(window.scrollY > 40)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#home', label: 'Accueil' },
    { href: '#apropos', label: 'À propos' },
    { href: '#pourquoi', label: 'Pourquoi ESGC' },
    { href: '#filiere', label: 'Formations' },
    { href: '#debouches', label: 'Débouchés' },
    { href: '#faq', label: 'FAQ' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header
      className={`${change ? 'shadow-md' : ''} sticky top-0 w-full z-40 bg-white/95 backdrop-blur transition-shadow duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 flex items-center justify-between text-gray-700">
        <a href="#home" className="flex items-center gap-2">
          <img className="w-10 rounded-md" src={assets.logo} alt="logo" />
          <span className="font-kaushan text-2xl text-first">ESGC</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-1 text-sm font-medium">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-1.5 rounded-full hover:bg-first/10 hover:text-first transition-colors duration-150"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden lg:inline-flex items-center px-5 py-2 rounded-full bg-first text-white text-sm font-semibold hover:bg-second transition-colors duration-150"
        >
          S'inscrire
        </a>

        {/* Mobile Menu Icon */}
        <button onClick={() => setDrawerOpen(true)} className="lg:hidden bg-second p-2 cursor-pointer rounded-full hover:bg-second/75 transition-colors duration-150" aria-label="Ouvrir le menu">
          <Menu className="text-white" />
        </button>
      </div>

      {/* Drawer (Mobile Menu) */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-deep text-white z-50 transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-b-white/20">
          <img className="w-10 rounded-md" src={assets.logo} alt="logo" />
          <button className='cursor-pointer' onClick={() => setDrawerOpen(false)} aria-label="Fermer le menu">
            <X className="text-2xl" />
          </button>
        </div>

        <nav className="w-full flex flex-col items-center justify-center gap-4 px-6 py-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="text-lg w-full text-center py-2 rounded-full hover:bg-white/10 hover:text-second font-medium transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setDrawerOpen(false)}
            className="mt-4 px-6 py-2.5 rounded-full bg-second font-semibold"
          >
            S'inscrire
          </a>
        </nav>
      </div>
    </header>
  )
}

export default Navbar
