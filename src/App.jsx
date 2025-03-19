import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
// import PortfolioSection from './components/PortfolioSection';

const App = () => {
  return (
    <div className="min-h-screen bg-black text-white font-sans">
      <Navbar />
      <main>
        <Hero />
        <About />
        {/* <PortfolioSection /> */}
        {/* Aqui você pode adicionar as outras seções do site */}
        {/* <Services /> */}
        {/* <Portfolio /> */}
        {/* <Testimonials /> */}
        {/* <Contact /> */}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default App;