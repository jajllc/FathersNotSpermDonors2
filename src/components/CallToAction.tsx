import React from 'react';
import { MessageSquare, Users, Megaphone, Mail } from 'lucide-react';

export const CallToAction: React.FC = () => {
  const actions = [
    {
      icon: MessageSquare,
      title: "Contact Your Representatives",
      description: "Write to your local lawmakers about fathers' rights reform",
      action: "Find Your Reps",
      color: "bg-blue-600 hover:bg-blue-700"
    },
    {
      icon: Users,
      title: "Join Support Groups",
      description: "Connect with other fathers facing similar challenges",
      action: "Find Groups",
      color: "bg-green-600 hover:bg-green-700"
    },
    {
      icon: Megaphone,
      title: "Spread Awareness",
      description: "Share our message on social media and with friends",
      action: "Share Now",
      color: "bg-purple-600 hover:bg-purple-700"
    },
    {
      icon: Mail,
      title: "Stay Updated",
      description: "Get the latest news on fathers' rights legislation",
      action: "Subscribe",
      color: "bg-amber-600 hover:bg-amber-700"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-8 leading-tight tracking-tight">
            Take Action <span className="text-amber-400">Today</span>
          </h2>
          <p className="text-lg sm:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-medium">
            Signing the petition is just the beginning. Here are more ways you can 
            help create lasting change for fathers' rights and children's well-being.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {actions.map((action, index) => (
            <div
              key={index}
              className="bg-white rounded-xl p-6 text-center hover:transform hover:-translate-y-2 transition-all duration-300 shadow-lg hover:shadow-2xl"
            >
              <div className="flex justify-center mb-4">
                <div className={`p-4 rounded-full ${action.color}`}>
                  <action.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-900 mb-4 tracking-wide">
                {action.title}
              </h3>
              
              <p className="text-gray-700 mb-6 leading-relaxed font-medium">
                {action.description}
              </p>
              
              <button className={`accessible-button w-full text-white font-semibold transition-all duration-300 ${action.color}`}>
                {action.action}
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-white/5 backdrop-blur-sm rounded-2xl p-8 md:p-12 text-center border border-white/10">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight">
            Every Voice Matters
          </h3>
          <p className="text-gray-200 text-lg mb-10 max-w-4xl mx-auto leading-relaxed font-medium">
            The fight for fathers' rights isn't just about individual cases – it's about 
            changing a system that affects millions of children and families. Your support, 
            your voice, and your action can help create a more equitable future for all parents.
          </p>
          
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <div>
              <div className="text-3xl font-bold text-amber-400 mb-3 tracking-tight">24M+</div>
              <div className="text-gray-200 font-medium">Single fathers in America</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-400 mb-3 tracking-tight">50K+</div>
              <div className="text-gray-200 font-medium">Signatures needed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-400 mb-3 tracking-tight">100%</div>
              <div className="text-gray-200 font-medium">Committed to change</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};