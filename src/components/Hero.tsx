import React from 'react';
import { Heart, Users, Shield } from 'lucide-react';

export const Hero: React.FC = () => {
  const scrollToPetition = () => {
    const element = document.getElementById('petition');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 overflow-hidden pt-20 md:pt-16">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4xIj48cGF0aCBkPSJtMzYgMzQgNi0xIDQgNSw0LTEwLTQtMTEtNi0xeiIvPjwvZz48L2c+PC9zdmc+')] bg-repeat"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-8 leading-tight tracking-tight">
            <span className="block text-white mb-2">
              FATHERS
            </span>
            <span className="flex flex-wrap items-center justify-center gap-4">
              <img 
                src="/images/not-graphic.png" 
                alt="Not"
                className="h-12 sm:h-16 md:h-20 lg:h-24 inline-block"
              />
              <span className="text-amber-400">Sperm Donors</span>
            </span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-blue-50 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
            We believe fathers are essential parents who deserve equal legal recognition, custody rights, and the opportunity to remain fully engaged in their children’s lives. Every child thrives when both parents are empowered to love, guide, and support them without barriers.
          </p>

          {/* Key Points */}
          <div className="grid md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            {[
              { icon: Heart, title: "Equal Love", desc: "Fathers provide the same unconditional love as mothers" },
              { icon: Users, title: "Active Parenting", desc: "Children benefit from both parents being involved" },
              { icon: Shield, title: "Legal Rights", desc: "Fair custody and decision-making equality" }
            ].map((item, index) => (
              <div key={index} className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all duration-300">
                <item.icon className="h-8 w-8 text-amber-400 mx-auto mb-3" />
                <h3 className="text-white font-semibold text-lg mb-3 tracking-wide">{item.title}</h3>
                <p className="text-blue-50 text-base leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={scrollToPetition}
              className="accessible-button bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-xl min-h-[56px]"
            >
              Sign Our Petition
            </button>
            <button
              onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
              className="accessible-button border-2 border-white text-white hover:bg-white hover:text-blue-900 font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300 min-h-[56px]"
            >
              Learn More
            </button>
          </div>

          {/* Hero Image */}
          <div className="mt-16">
            <div className="relative inline-block">
              <img 
                src="/images/FatherSon01.png" 
                alt="Father and son together"
                className="w-64 sm:w-80 md:w-96 h-auto rounded-2xl shadow-2xl mx-auto hover:scale-105 transition-transform duration-300"
              />
              {/* <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent rounded-2xl"></div> */}
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      {/* <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
        </div>
      </div> */}
    </section>
  );
};