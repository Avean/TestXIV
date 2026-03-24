import React from 'react';
import { siteConfig } from '../../config/site';

export const Footer = () => {
  return (
    <footer className="bg-primary-900 py-12 border-t border-white/10 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="text-white font-serif text-xl font-bold tracking-wider">
          {siteConfig.name}
        </div>
        <p className="text-gray-400 text-sm text-center md:text-left">
          {siteConfig.copyright}
        </p>
        <div className="text-gray-400 text-sm">
          Last update: {siteConfig.lastUpdate}
        </div>
      </div>
    </footer>
  );
};
