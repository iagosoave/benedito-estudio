import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';
import batman from './batman.png';

const AboutSection = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.2 });
  const photoRef = useRef(null);
  const photoInView = useInView(photoRef, { once: false });
  const contentRef = useRef(null);
  const contentInView = useInView(contentRef, { once: false, amount: 0.3 });
  
  // Estados para interações
  const [textReveal, setTextReveal] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  
  // Revelar texto após a seção estar visível
  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => {
        setTextReveal(true);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isInView]);
  
  // Animação de texto sequencial
  useEffect(() => {
    if (textReveal && textIndex < 2) {
      const timer = setTimeout(() => {
        setTextIndex(prev => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [textReveal, textIndex]);
  
  // Efeito de parallax
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });
  
  const bgParallax = useTransform(scrollYProgress, [0, 1], ['0%', '20%']);
  const contentOpacity = useTransform(scrollYProgress, [0.1, 0.3], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.1, 0.3], [50, 0]);
  
  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-screen overflow-hidden"
      style={{ marginTop: '-1px', marginBottom: '-1px' }}
    >
      {/* Imagem em destaque - MANTIDA EXATAMENTE COMO NO ORIGINAL */}
      <motion.div 
        ref={photoRef}
        className="w-full relative"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div className="relative w-full overflow-hidden" style={{ height: "70vh" }}>
          {/* Imagem com efeito de escala */}
          <motion.div
            className="absolute inset-0"
            initial={{ scale: 1.2 }}
            animate={photoInView ? { scale: 1.05 } : { scale: 1.2 }}
            transition={{ duration: 2.5, ease: [0.25, 0.1, 0.25, 1.0] }}
          >
            <img 
              src={batman} 
              alt="Produção cinematográfica"
              className="w-full h-full object-cover"
              style={{ filter: 'contrast(1.1) brightness(0.8) saturate(1.2)' }}
            />
          </motion.div>
          
          {/* Overlays e efeitos na imagem */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"
            initial={{ opacity: 0 }}
            animate={photoInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2 }}
          />
          
          {/* Vinheta para profundidade */}
          <div className="absolute inset-0" 
               style={{ boxShadow: "inset 0 0 200px rgba(0,0,0,0.8)" }}></div>
          
          {/* Grades de composição */}
          <div className="absolute inset-0 grid grid-cols-12 opacity-30">
            {[...Array(11)].map((_, i) => (
              <div key={i} className="border-r border-white/20"></div>
            ))}
          </div>
          
          <div className="absolute inset-0 grid grid-rows-6 opacity-30">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="border-b border-white/20"></div>
            ))}
          </div>
          
          {/* Detalhe decorativo - canto superior */}
          <motion.div
            className="absolute top-4 left-4 md:top-12 md:left-12 w-12 h-12 md:w-20 md:h-20 border-t-2 border-l-2 border-white/40"
            initial={{ opacity: 0, x: -20, y: -20 }}
            animate={photoInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -20, y: -20 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
          
          {/* Detalhe decorativo - canto inferior */}
          <motion.div
            className="absolute bottom-4 right-4 md:bottom-12 md:right-12 w-12 h-12 md:w-20 md:h-20 border-b-2 border-r-2 border-white/40"
            initial={{ opacity: 0, x: 20, y: 20 }}
            animate={photoInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: 20, y: 20 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </div>
      </motion.div>
      
      {/* Seção "Sobre" com design minimalista - Apenas texto */}
      <motion.div 
        className="bg-white w-full relative"
        style={{ opacity: contentOpacity, y: contentY }}
        ref={contentRef}
      >
        <div className="container mx-auto px-4 sm:px-6 py-16 md:py-24 max-w-screen-xl">
          {/* Layout responsivo para mobile */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Título - para mobile aparece acima do conteúdo, para desktop aparece na lateral */}
            <motion.div 
              className="mb-8 md:mb-0 col-span-1 md:col-span-2 lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              animate={contentInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-gray-900 md:hidden">
                SOBRE
              </h2>
              <div className="hidden md:block transform -rotate-90 origin-top-left h-0 mt-48">
                <h2 className="text-4xl font-bold tracking-wide text-gray-900 whitespace-nowrap">SOBRE</h2>
              </div>
            </motion.div>
            
            {/* Conteúdo principal */}
            <motion.div 
              className="col-span-1 md:col-span-10 lg:col-span-11 md:pl-12 lg:pl-24"
              initial={{ opacity: 0 }}
              animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
            >
              {/* Nome do estúdio em destaque, com ESTUDIO abaixo de BENEDITO */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={contentInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="mb-10 md:mb-16"
              >
                <div className="flex flex-col">
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-gray-900">
                    BENEDITO
                  </h1>
                  <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 -mt-1 sm:-mt-2 md:-mt-3">
                    ESTÚDIO
                  </h1>
                </div>
                
                <div className="flex items-center space-x-3 mt-3 md:mt-4">
                  <motion.div 
                    className="h-[2px] bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500"
                    initial={{ width: 0 }}
                    animate={contentInView ? { width: "40px" } : { width: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                  />
                  <motion.p 
                    className="text-gray-600 uppercase tracking-widest text-xs sm:text-sm"
                    initial={{ opacity: 0 }}
                    animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.7 }}
                  >
                    Estúdio Audiovisual
                  </motion.p>
                </div>
              </motion.div>
              
              {/* Texto principal - Alinhado à Esquerda - TEXTO RESUMIDO */}
              <div className="text-left max-w-3xl">
                {/* Parágrafos com animação sequencial */}
                <AnimatePresence>
                  {textIndex >= 0 && (
                    <motion.p 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      className="text-lg sm:text-xl text-gray-800 leading-relaxed mb-6 md:mb-8"
                    >
                      O Benedito Estúdio, fundado em 2018, é um espaço dedicado à produção cinematográfica de alta qualidade, nascido da paixão pela linguagem visual.
                    </motion.p>
                  )}
                </AnimatePresence>
                
                <AnimatePresence>
                  {textIndex >= 1 && (
                    <motion.p 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.7 }}
                      className="text-base sm:text-lg text-gray-700 leading-relaxed mb-12 md:mb-16"
                    >
                      Nossa equipe multidisciplinar equilibra sensibilidade artística e rigor técnico, transformando visões em realidades visuais que inspiram e emocionam.
                    </motion.p>
                  )}
                </AnimatePresence>
                
                {/* Sublinhado decorativo para encerrar a seção - alinhado à esquerda */}
                <AnimatePresence>
                  {textIndex >= 1 && (
                    <motion.div 
                      className="h-px w-10 md:w-16 bg-gradient-to-r from-purple-600 via-pink-500 to-orange-500 my-6 md:my-8"
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "40px", opacity: 1 }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default AboutSection;