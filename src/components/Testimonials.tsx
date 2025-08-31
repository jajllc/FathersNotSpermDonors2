import React from 'react';
import { Quote, Star } from 'lucide-react';

export const Testimonials: React.FC = () => {
  const testimonials = [
    {
      name: "Michael Rodriguez",
      location: "Phoenix, AZ",
      quote: "I fought for three years to get equal custody of my daughter. The system treated me like I was asking for charity, not my basic rights as a father. This movement gives me hope for other dads going through the same struggle.",
      role: "Single Father of 1"
    },
    {
      name: "James Thompson",
      location: "Atlanta, GA",
      quote: "When my ex-wife moved across the country, I was told I should be 'grateful' for video calls twice a week. My son needs his father present in his life, not just as a voice on a screen.",
      role: "Father of 2"
    },
    {
      name: "Dr. Sarah Williams",
      location: "Child Psychologist",
      quote: "As a professional who works with children daily, I've seen firsthand how important fathers are to healthy development. The current legal bias hurts children more than anyone realizes.",
      role: "Child Development Expert"
    },
    {
      name: "Robert Chen",
      location: "Seattle, WA",
      quote: "I raised my kids as a single father after their mother left. Society constantly questioned my abilities and the courts made me prove myself over and over. Fathers deserve better.",
      role: "Single Father of 3"
    }
  ];

  return (
    <section id="stories" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            Real Stories from <span className="text-blue-800">Real Fathers</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            These are the voices of fathers who have experienced the inequality in our 
            legal system firsthand. Their stories drive our mission for change.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="flex items-center mb-4">
                <Quote className="h-8 w-8 text-blue-600 mr-3" />
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-current text-amber-400" />
                  ))}
                </div>
              </div>
              
              <blockquote className="text-gray-800 text-lg mb-8 leading-relaxed italic font-medium">
                "{testimonial.quote}"
              </blockquote>
              
              <div className="border-t pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900 text-lg tracking-wide">
                      {testimonial.name}
                    </div>
                    <div className="text-blue-700 font-medium text-base">
                      {testimonial.role}
                    </div>
                  </div>
                  <div className="text-gray-600 text-base font-medium">
                    {testimonial.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-blue-900 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight">
            Share Your Story
          </h3>
          <p className="text-blue-50 text-lg mb-10 max-w-3xl mx-auto leading-relaxed font-medium">
            Your experience matters. Help us build a stronger case for fathers' rights 
            by sharing your story with our community and lawmakers.
          </p>
          <button className="accessible-button bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg">
            Submit Your Story
          </button>
        </div>
      </div>
    </section>
  );
};