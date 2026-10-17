import React from 'react';
import { Compass } from 'lucide-react';
import { ActiveTab } from './Navbar';

interface FooterProps {
  onSelectTab: (tab: ActiveTab) => void;
  onOpenAbout: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectTab, onOpenAbout }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 text-xs py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-8 border-b border-slate-800">
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-[#167D9A] flex items-center justify-center text-white">
              <Compass className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="text-base font-bold text-white tracking-tight">
                Voyage<span className="text-[#167D9A]">IQ</span>
              </span>
              <p className="text-[11px] text-slate-400 mt-0.5">
                AI-Powered Travel Behavior & Intelligence Platform
              </p>
            </div>
          </div>

          <nav className="flex flex-wrap items-center gap-6 text-slate-300 font-medium">
            <button
              onClick={() => onSelectTab('home')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Home
            </button>
            <button
              onClick={() => onSelectTab('explore')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Explore India
            </button>
            <button
              onClick={() => onSelectTab('planner')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Smart Trip Planner
            </button>
            <button
              onClick={() => onSelectTab('journey')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              My Journey
            </button>
            <button
              onClick={() => onSelectTab('insights')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Travel Insights
            </button>
            <button
              onClick={() => onSelectTab('wishlist')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              My Wishlist
            </button>
            <button
              onClick={onOpenAbout}
              className="text-[#F4B860] hover:text-amber-300 transition-colors cursor-pointer"
            >
              Architecture & Specs
            </button>
          </nav>

        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <p>
            VoyageIQ — Engineering & Data Intelligence Portfolio Project. Built with React, Tailwind CSS, Express, and Google GenAI.
          </p>
          <div className="flex items-center gap-4">
            <span>Formula: S = 0.35B + 0.30I + 0.20D + 0.15T</span>
            <span aria-hidden="true">·</span>
            <span>Version 1.0</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
