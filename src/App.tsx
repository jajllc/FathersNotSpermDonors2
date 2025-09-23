import React, { useState } from 'react';
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

  if (currentPage === 'state-resources') {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <StateResources />
        <Footer />
        <Chatbot />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
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
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;