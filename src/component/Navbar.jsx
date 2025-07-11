import { useEffect, useState } from 'react'
import { assets } from '../assets'
import { Menu, X } from 'lucide-react'

function Navbar() {
  const [change, setChange] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [open, setOpen] = useState(false)
  const [drawerOpen, setDrawerOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setChange(window.scrollY > 260)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const links = [
    { href: '#home', label: 'Accueil' },
    { href: '#pourquoi', label: 'Pourquoi ESGC' },
    { href: '#filiere', label: 'Formations' },
    // { href: '#valeur', label: 'Valeurs' },
    // { href: '#condidature', label: 'candidature' },
    { href: '#contact', label: 'contact' },
  ]

  return (
    <header
      className={`${
        change ? 'fixed' : 'scroll'
      } px-[5%] py-2 text-white bg-slate-50 font-semibold -top-1 w-full z-40 transition-colors duration-300`}
    >
      <div className="flex items-center justify-between text-gray-700">
        <a href="#home">
          <img className="w-11 rounded-md" src={assets.logo} alt="logo" />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-1.5 py-1 rounded-md border border-transparent hover:border-b-white hover:bg-second  transition-all duration-150 hover:text-white"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Mobile Menu Icon */}
        <button onClick={() => setDrawerOpen(true)} className="md:hidden bg-second p-2 cursor-pointer rounded-md hover:bg-second/75 transition-colors duration-150">
          <Menu className="text-white" />
        </button>
      </div>

      {/* Drawer (Mobile Menu) */}
      <div
        className={`fixed top-0 left-0 w-full h-full bg-first text-white z-50 transition-transform duration-300 ${
          drawerOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b border-b-gray-400">
          <img className="w-10 rounded-md" src={assets.logo} alt="logo" />
          <button className='cursor-pointer' onClick={() => setDrawerOpen(false)}>
            <X className="text-2xl" />
          </button>
        </div>

        <nav className="w-full flex flex-col items-center justify-center gap-4 px-6 py-8">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setDrawerOpen(false)}
              className="text-lg w-full text-center py-2 border-b hover:border-b-white hover:bg-first/35 hover:text-second border-transparent font-medium  transition-colors"
            >
              {link.label}
            </a>
          ))}
          
        </nav>
      </div>
    </header>
  )
}

export default Navbar
