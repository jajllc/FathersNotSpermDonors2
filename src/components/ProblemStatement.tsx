import React from 'react';
import { AlertCircle, Gavel, Users, Heart } from 'lucide-react';

export const ProblemStatement: React.FC = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            The Problem We're <span className="text-red-600">FIGHTING</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed font-medium">
            Our current legal system perpetuates outdated stereotypes that treat fathers 
            as biological contributors rather than equal parents with legitimate rights and responsibilities.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="bg-red-50 border-l-4 border-red-500 p-6 mb-8">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-red-500 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-red-800 mb-3 tracking-wide">
                    Current System Bias
                  </h3>
                  <p className="text-red-800 leading-relaxed font-medium">
                    Family courts still operate under the assumption that mothers are 
                    naturally better caregivers, leading to systematic discrimination 
                    against fathers seeking custody or equal parenting time.
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-blue-600 border-l-4 border-blue-800 p-6 mb-8">
              <div className="flex items-start">
                <AlertCircle className="h-6 w-6 text-yellow-400 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-semibold text-yellow-300 mb-3 tracking-wide">
                    Current System Bias
                  </h3>
                  <p className="text-yellow-200 leading-relaxed font-medium">
                    Family courts still operate under the assumption that mothers are 
                    naturally better caregivers, leading to systematic discrimination 
                    against fathers seeking custody or equal parenting time.
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              {[
                {
                  icon: Gavel,
                  title: "Legal Inequality",
                  description: "Fathers face an uphill battle in family court, often receiving limited visitation rights rather than equal custody."
                },
                {
                  icon: Users,
                  title: "Social Stigma",
                  description: "Society often views single fathers with suspicion or assumes they're temporary caregivers until the 'real parent' returns."
                },
                {
                  icon: Heart,
                  title: "Emotional Impact",
                  description: "Children suffer when denied meaningful relationships with their fathers, affecting their development and well-being."
                }
              ].map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="p-3 bg-blue-100 rounded-lg">
                      <item.icon className="h-6 w-6 text-blue-600" />
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-3 tracking-wide">{item.title}</h4>
                    <p className="text-gray-700 leading-relaxed font-medium">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
            <h3 className="text-2xl sm:text-3xl font-bold mb-8 tracking-tight">What We Believe</h3>
            <div className="space-y-8">
              <div className="border-l-4 border-amber-500 pl-4">
                <h4 className="text-lg font-semibold mb-3 text-amber-100 tracking-wide">Equal Parenting Rights</h4>
                <p className="text-gray-200 leading-relaxed font-medium">
                  Both parents have equal rights and responsibilities to their children, 
                  regardless of gender.
                </p>
              </div>
              
              <div className="border-l-4 border-blue-500 pl-4">
                <h4 className="text-lg font-semibold mb-3 text-blue-100 tracking-wide">Children Come First</h4>
                <p className="text-gray-200 leading-relaxed font-medium">
                  Decisions should be based on the best interests of the child, 
                  not outdated gender stereotypes.
                </p>
              </div>
              
              <div className="border-l-4 border-green-500 pl-4">
                <h4 className="text-lg font-semibold mb-3 text-green-100 tracking-wide">Legal Reform</h4>
                <p className="text-gray-200 leading-relaxed font-medium">
                  Our laws must evolve to reflect modern family dynamics and 
                  equal parenting capabilities.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-8">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-amber-800 mb-6 tracking-tight">
              It's Time for Change
            </h3>
            <p className="text-amber-800 text-lg max-w-3xl mx-auto leading-relaxed font-medium">
              We're not asking for special treatment – we're demanding equal treatment. 
              Fathers are not sperm donors; they are parents with the same capacity 
              for love, care, and responsibility as mothers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};