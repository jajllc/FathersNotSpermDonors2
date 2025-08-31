import React from 'react';
import { Scale, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

export const Footer: React.FC = () => {
  const quickLinks = [
    { name: 'About Us', href: '#about' },
    { name: 'Statistics', href: '#facts' },
    { name: 'Petition', href: '#petition' },
    { name: 'Photo Gallery', href: '#gallery' },
    { name: 'Stories', href: '#stories' },
    { name: 'Take Action', href: '#action' }
  ];

  const resources = [
    { name: 'Legal Resources', href: '#' },
    { name: 'Support Groups', href: '#' },
    { name: 'Research Papers', href: '#' },
    { name: 'News & Updates', href: '#' },
    { name: 'FAQ', href: '#' }
  ];

  const socialLinks = [
    { icon: Facebook, href: '#', name: 'Facebook' },
    { icon: Twitter, href: '#', name: 'Twitter' },
    { icon: Instagram, href: '#', name: 'Instagram' },
    { icon: Linkedin, href: '#', name: 'LinkedIn' }
  ];

  return (
    <footer id="contact" className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo and Mission */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <Scale className="h-8 w-8 text-amber-400" />
              <span className="font-bold text-2xl">Equal Rights Coalition</span>
            </div>
            
            <p className="text-gray-200 text-lg mb-8 max-w-md leading-relaxed font-medium">
              Fighting for equal treatment of fathers in our legal system and 
              advocating for children's right to have both parents actively involved in their lives.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-amber-400" />
                <span className="text-gray-200 font-medium">info@fathersrights.org</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-amber-400" />
                <span className="text-gray-200 font-medium">1-800-FATHERS (1-800-328-4377)</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-amber-400" />
                <span className="text-gray-200 font-medium">Washington, DC</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-amber-400 tracking-wide">Quick Links</h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-gray-200 hover:text-white transition-colors duration-200 font-medium text-base"
                    onClick={(e) => {
                      e.preventDefault();
                      document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' });
                    }}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-6 text-amber-400 tracking-wide">Resources</h3>
            <ul className="space-y-4">
              {resources.map((resource) => (
                <li key={resource.name}>
                  <a
                    href={resource.href}
                    className="text-gray-200 hover:text-white transition-colors duration-200 font-medium text-base"
                  >
                    {resource.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Social Media and Bottom Section */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex space-x-6 mb-4 md:mb-0">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="text-gray-400 hover:text-amber-400 transition-colors duration-200"
                  aria-label={social.name}
                >
                  <social.icon className="h-6 w-6" />
                </a>
              ))}
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-gray-400 text-sm">
                © 2025 Equal Rights Coalition. All rights reserved.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                Fighting for fathers' rights and children's well-being nationwide.
              </p>
            </div>
          </div>
        </div>

        {/* Final Call to Action */}
        <div className="mt-12 bg-gradient-to-r from-blue-900/50 to-amber-900/50 rounded-2xl p-8 text-center border border-amber-400/20">
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-6 tracking-tight">
            Join the Fight for Equal Rights
          </h3>
          <p className="text-gray-200 mb-8 max-w-2xl mx-auto text-lg leading-relaxed font-medium">
            Together, we can create a legal system that recognizes fathers as equal parents 
            and ensures children have access to both parents' love and guidance.
          </p>
          <button
            onClick={() => document.getElementById('petition')?.scrollIntoView({ behavior: 'smooth' })}
            className="accessible-button bg-amber-500 hover:bg-amber-600 text-white font-bold py-4 px-8 rounded-lg transition-all duration-300 transform hover:scale-105 text-lg"
          >
            Sign the Petition Now
          </button>
        </div>
      </div>
    </footer>
  );
};