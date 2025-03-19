import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > window.innerHeight * 0.5);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Início', href: '#home' },
    { name: 'Sobre', href: '#about' },
    { name: 'Serviços', href: '#services' },
    { name: 'Projetos', href: '#projects' },
    { name: 'Contato', href: '#contact' }
  ];

  return (
    <motion.nav 
      initial={{ opacity: 0, y: -100 }}
      animate={{ 
        opacity: scrolled ? 1 : 0,
        y: scrolled ? 0 : -100,
        pointerEvents: scrolled ? 'auto' : 'none'
      }}
      transition={{ duration: 0.4 }}
      className="fixed w-full z-50 bg-black/95 backdrop-blur-sm py-4"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <a href="#home" className="flex items-center group">
            <span className="text-xl md:text-2xl font-bold tracking-tight flex items-center">
              <span className="text-white">
                BENEDITO
              </span>
              <span className="ml-2 font-serif italic text-base bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-orange-500 via-yellow-500 via-green-500 via-blue-500 via-indigo-500 to-violet-500">
                estúdio
              </span>
            </span>
          </a>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 md:space-x-6">
            {navItems.map((item) => (
              <motion.a
                key={item.name}
                href={item.href}
                className="relative text-sm text-white/60 hover:text-white font-medium tracking-wide group"
                whileHover="hover"
                initial="rest"
                animate="rest"
              >
                <motion.span 
                  variants={{
                    rest: { 
                      scale: 1,
                      backgroundColor: 'rgba(255,255,255,0)'
                    },
                    hover: { 
                      scale: 1.05,
                      backgroundColor: 'rgba(255,255,255,0.05)'
                    }
                  }}
                  transition={{ duration: 0.3 }}
                  className="relative z-10 px-2 py-1 rounded-md"
                >
                  {item.name}
                </motion.span>
                <motion.span 
                  variants={{
                    rest: { width: 0 },
                    hover: { width: '100%' }
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-violet-500 to-orange-500"
                />
              </motion.a>
            ))}
            
            <motion.a
              href="#contact"
              className="ml-4 relative group"
              whileHover="hover"
              initial="rest"
            >
              <motion.div
                variants={{
                  rest: { 
                    width: '0%',
                    left: '50%'
                  },
                  hover: { 
                    width: '100%',
                    left: '0%'
                  }
                }}
                transition={{ duration: 0.3 }}
                className="absolute bottom-0 h-0.5 bg-gradient-to-r from-violet-500 to-orange-500"
              />
              <motion.div
                variants={{
                  rest: { 
                    backgroundColor: 'transparent',
                    borderColor: 'rgba(255,255,255,0.2)'
                  },
                  hover: { 
                    backgroundColor: 'rgba(255,255,255,0.05)',
                    borderColor: 'rgba(255,255,255,0.3)'
                  }
                }}
                transition={{ duration: 0.3 }}
                className="px-4 md:px-6 py-2 border rounded-md"
              >
                <span className="text-white text-xs md:text-sm font-medium tracking-wide">
                  Fale Conosco
                </span>
              </motion.div>
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative w-6 h-5 focus:outline-none"
              aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
            >
              <motion.span 
                className="absolute top-0 w-full h-0.5 bg-white"
                animate={{ 
                  rotate: isOpen ? 45 : 0,
                  translateY: isOpen ? 6 : 0
                }}
              />
              <motion.span 
                className="absolute top-1/2 w-full h-0.5 bg-white"
                animate={{ 
                  opacity: isOpen ? 0 : 1
                }}
              />
              <motion.span 
                className="absolute bottom-0 w-full h-0.5 bg-white"
                animate={{ 
                  rotate: isOpen ? -45 : 0,
                  translateY: isOpen ? -6 : 0
                }}
              />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-black/95"
          >
            <div className="px-4 py-6 space-y-2">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-3 text-base text-white/60 hover:text-white border-b border-white/10 relative group"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 h-0.5 w-0 bg-white group-hover:w-full transition-all duration-300" />
                </a>
              ))}
              <a
                href="#contact"
                className="block py-3 mt-4 border border-white/20 text-white text-center relative group"
                onClick={() => setIsOpen(false)}
              >
                Fale Conosco
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;