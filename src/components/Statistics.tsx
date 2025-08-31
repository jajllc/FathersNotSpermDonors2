import React from 'react';
import { TrendingUp, Users, AlertTriangle, Scale } from 'lucide-react';

export const Statistics: React.FC = () => {
  const stats = [
    {
      icon: Users,
      number: "24M",
      label: "Single Fathers",
      description: "fathers raising children in the US",
      color: "text-blue-600"
    },
    {
      icon: AlertTriangle,
      number: "83%",
      label: "Mother Custody",
      description: "of custody cases favor mothers",
      color: "text-red-600"
    },
    {
      icon: Scale,
      number: "17%",
      label: "Father Custody",
      description: "of fathers receive primary custody",
      color: "text-amber-600"
    },
    {
      icon: TrendingUp,
      number: "40%",
      label: "Better Outcomes",
      description: "children with involved fathers show better outcomes",
      color: "text-green-600"
    }
  ];

  return (
    <section id="facts" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-8 leading-tight tracking-tight">
            The Reality of <span className="text-blue-800">Father's Rights</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
            Current statistics reveal a significant disparity in how our legal system 
            treats fathers versus mothers in custody and parental rights cases.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="flex items-center justify-center mb-4">
                <div className={`p-3 rounded-full bg-gray-100 ${stat.color}`}>
                  <stat.icon className="h-8 w-8" />
                </div>
              </div>
              
              <div className="text-center">
                <div className={`text-3xl sm:text-4xl font-bold ${stat.color} mb-3 tracking-tight`}>
                  {stat.number}
                </div>
                <div className="text-lg font-semibold text-gray-900 mb-2 tracking-wide">
                  {stat.label}
                </div>
                <div className="text-base text-gray-700 leading-relaxed">
                  {stat.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white rounded-2xl p-8 md:p-12 shadow-lg">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-6 leading-tight tracking-tight">
                Children Need Both Parents
              </h3>
              <p className="text-gray-700 text-lg mb-8 leading-relaxed font-medium">
                Research consistently shows that children benefit immensely from having 
                both parents actively involved in their lives. Yet our legal system 
                continues to treat fathers as secondary caregivers.
              </p>
              <ul className="space-y-4">
                {[
                  "Better academic performance",
                  "Improved emotional stability",
                  "Lower risk of behavioral problems",
                  "Stronger social development"
                ].map((benefit, index) => (
                  <li key={index} className="flex items-center text-gray-800 text-lg leading-relaxed">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <img 
                src="/images/FatherSon01.png"
                alt="Father and son bonding"
                className="w-full h-96 object-contain rounded-xl shadow-lg bg-gray-100"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-xl"></div>
              <div className="absolute bottom-6 left-6 right-6 text-center text-white">
                <div className="text-3xl sm:text-4xl font-bold mb-2 tracking-tight">2x</div>
                <div className="text-lg font-semibold mb-2 tracking-wide">
                  More Likely to Graduate
                </div>
                <div className="text-sm leading-relaxed font-medium">
                  Children with involved fathers are twice as likely to graduate high school
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};