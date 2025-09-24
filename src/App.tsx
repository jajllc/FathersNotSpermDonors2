import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { Statistics } from './components/Statistics';
import { ProblemStatement } from './components/ProblemStatement';
import { PetitionForm } from './components/PetitionForm';
import { Testimonials } from './components/Testimonials';
import { CallToAction } from './components/CallToAction';
import { PictureGallery } from './components/PictureGallery';
import { Footer } from './components/Footer';
import { Chatbot } from './components/Chatbot';
import { StateResources } from './components/StateResources';

function App() {
  const [petitionSubmitted, setPetitionSubmitted] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'state-resources'>('home');

  useEffect(() => {
    const handleNavigateToStateResources = () => {
      setCurrentPage('state-resources');
    };

    window.addEventListener('navigate-to-state-resources', handleNavigateToStateResources);
    
    return () => {
      window.removeEventListener('navigate-to-state-resources', handleNavigateToStateResources);
    };
  }, []);

  if (currentPage === 'state-resources') {
    return (
      <div className="min-h-screen bg-white">
        <Header onNavigateHome={() => setCurrentPage('home')} />
        <StateResources />
        <Footer onNavigateToStateResources={() => setCurrentPage('state-resources')} />
        <Chatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header onNavigateHome={() => setCurrentPage('home')} />
      <Hero />
      <Statistics />
      <ProblemStatement />
      <PetitionForm 
        onSubmit={() => setPetitionSubmitted(true)} 
        submitted={petitionSubmitted}
      />
      <PictureGallery />
      <Testimonials />
      <CallToAction />
      <Footer onNavigateToStateResources={() => setCurrentPage('state-resources')} />
      <Chatbot />
    </div>
  );
}

export default App;