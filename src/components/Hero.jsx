import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Play, Pause, Menu } from 'lucide-react';
import trailerVideo from './trailer.mp4';
import logo from './logo.png';

const Hero = () => {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const [videoElement, setVideoElement] = useState(null);

  // Ocultar indicador de scroll quando rolar a página
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowScrollIndicator(false);
      } else {
        setShowScrollIndicator(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Controle de play/pause do vídeo
  useEffect(() => {
    if (videoElement) {
      if (isPlaying) {
        videoElement.play();
      } else {
        videoElement.pause();
      }
    }
  }, [isPlaying, videoElement]);

  // Referência para o elemento de vídeo
  const handleVideoRef = (element) => {
    setVideoElement(element);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Vídeo de fundo em tela cheia */}
      <div className="absolute inset-0 bg-black">
        <video
          ref={handleVideoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute w-full h-full object-cover opacity-70"
          src={trailerVideo}
        ></video>
        
        {/* Gradiente de sobreposição para textura e profundidade */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/90"></div>
        
        {/* Padrão de grade sutil */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNMzAgMzBoMzB2MzBIMzB6TTAgMGgzMHYzMEgweiIgZmlsbD0icmdiYSgyNTUsMjU1LDI1NSwwLjAzKSIvPjwvZz48L3N2Zz4=')] opacity-30"></div>
      </div>

      {/* Header móvel responsivo */}
      <div className="absolute top-0 left-0 right-0 z-10 flex justify-between items-center p-4 md:p-6">
        <div className="md:hidden">
          <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 text-white/90">
            <Menu size={20} />
          </button>
        </div>
        
        {/* Controle de vídeo - reposicionado */}
        <div className="md:absolute md:top-8 md:right-8">
          <motion.button
            onClick={() => setIsPlaying(!isPlaying)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20 text-white/90"
          >
            {isPlaying ? <Pause size={18} /> : <Play size={18} />}
          </motion.button>
        </div>
      </div>

      {/* Conteúdo centralizado */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-4 sm:px-6 text-center">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.5, type: "spring", stiffness: 100 }}
          className="mb-6 md:mb-8"
        >
          <img 
            src={logo} 
            alt="Benedito Estudio Logo" 
            className="w-36 sm:w-40 md:w-48 h-auto object-contain"
          />
        </motion.div>

        {/* Texto principal com efeito */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-bold max-w-4xl mb-4 md:mb-6 tracking-tight leading-none"
        >
          <motion.span 
            className="block mb-2 md:mb-4 relative"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <span className="
              bg-clip-text text-transparent
              bg-gradient-to-r from-white via-amber-100 to-white
              relative z-10
            ">
              BENEDITO
            </span>
            {/* Linha animada sob o texto */}
            <motion.span 
              className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-orange-500 to-violet-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 1.5, delay: 1.8 }}
            />
          </motion.span>
          <motion.span 
            className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-light opacity-90 block mt-1 md:mt-2"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.5 }}
          >
            <span className="font-serif italic">estúdio</span>
          </motion.span>
        </motion.h1>

        {/* Texto secundário */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.8 }}
          className="max-w-xs sm:max-w-sm md:max-w-md mx-auto"
        >
          <motion.p
            className="text-base md:text-lg text-white/70 mb-4 md:mb-6 font-light tracking-wide"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 2 }}
          >
            Transformamos narrativas em experiências visuais extraordinárias.
          </motion.p>
          
          {/* Palavras-chave - versão responsiva */}
          <motion.div 
            className="hidden sm:flex justify-center space-x-6 text-sm tracking-widest opacity-70 font-light"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            <span>CRIATIVIDADE</span>
            <span className="w-1 h-1 rounded-full bg-white/50 self-center"></span>
            <span>IMPACTO</span>
            <span className="w-1 h-1 rounded-full bg-white/50 self-center"></span>
            <span>EMOÇÃO</span>
          </motion.div>
          
          {/* Palavras-chave - versão mobile */}
          <motion.div 
            className="flex flex-col sm:hidden space-y-1 text-xs tracking-widest opacity-70 font-light"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.2 }}
          >
            <div className="flex justify-center space-x-3">
              <span>CRIATIVIDADE</span>
              <span className="w-1 h-1 rounded-full bg-white/50 self-center"></span>
              <span>IMPACTO</span>
            </div>
            <span>EMOÇÃO</span>
          </motion.div>
        </motion.div>

        {/* Indicador de scroll */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: showScrollIndicator ? 1 : 0,
            y: showScrollIndicator ? 0 : 20
          }}
          transition={{ duration: 0.5 }}
          className="absolute bottom-8 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center"
        >
          <span className="text-xs text-white/60 mb-2 tracking-widest font-light">DESCUBRA</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, repeatType: 'loop' }}
            className="bg-white/10 backdrop-blur-sm rounded-full p-1.5 sm:p-2 border border-white/20"
          >
            <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4 text-white/80" />
          </motion.div>
        </motion.div>
      </div>

      {/* Detalhes estéticos adicionais */}
      <div className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 bg-gradient-to-t from-black to-transparent"></div>
      
      {/* Elementos gráficos modernos */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
      
      {/* Círculos decorativos - escondidos em telas muito pequenas */}
      <motion.div 
        className="absolute top-1/3 right-1/4 w-32 sm:w-48 md:w-64 h-32 sm:h-48 md:h-64 rounded-full border border-white/5 opacity-30 hidden xs:block"
        animate={{ 
          scale: [1, 1.05, 1], 
          rotate: 360 
        }}
        transition={{ 
          scale: { duration: 8, repeat: Infinity, repeatType: 'reverse' },
          rotate: { duration: 40, repeat: Infinity, ease: "linear" }
        }}
      ></motion.div>
      
      <motion.div 
        className="absolute bottom-1/4 left-1/5 w-24 sm:w-32 md:w-40 h-24 sm:h-32 md:h-40 rounded-full border border-white/5 opacity-20 hidden xs:block"
        animate={{ 
          scale: [1, 1.1, 1], 
          rotate: -360 
        }}
        transition={{ 
          scale: { duration: 6, repeat: Infinity, repeatType: 'reverse' },
          rotate: { duration: 30, repeat: Infinity, ease: "linear" }
        }}
      ></motion.div>
    </div>
  );
};

export default Hero;