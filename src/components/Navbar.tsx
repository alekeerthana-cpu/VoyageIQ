import React from 'react';
import { Compass, Bookmark, Map, Route, Sparkles, BarChart3, ChevronRight } from 'lucide-react';

export type ActiveTab = 'home' | 'explore' | 'planner' | 'journey' | 'insights' | 'wishlist' | 'destinations' | 'recommendations' | 'analytics';

interface NavbarProps {
  activeTab: string;
  onSelectTab: (tab: ActiveTab) => void;
  savedCount: number;
  tripsCount?: number;
  onOpenAbout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  onSelectTab,
  savedCount,
  tripsCount = 0,
  onOpenAbout
}) => {
  const isTabActive = (tab: string) => {
    if (activeTab === tab) return true;
    if (tab === 'explore' && activeTab === 'destinations') return true;
    if (tab === 'insights' && activeTab === 'analytics') return true;
    if (tab === 'planner' && activeTab === 'recommendations') return true;
    return false;
  };

  return (
    <header className="sticky top-0 z-40 bg-[#0B132B]/95 backdrop-blur-md border-b border-slate-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-6">
        
        {/* Brand Wordmark & Concept Identity */}
        <button
          onClick={() => onSelectTab('home')}
          className="flex items-center gap-3 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-500 rounded cursor-pointer"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#167D9A] to-[#102A43] flex items-center justify-center text-white shadow-md border border-cyan-500/20">
            <Compass className="w-5 h-5 text-[#F4B860]" />
          </div>
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <span className="text-xl font-extrabold tracking-tight text-white whitespace-nowrap leading-none font-sans">
                Voyage<span className="text-[#38BDF8]">IQ</span>
              </span>
              <span className="hidden sm:inline-block text-[9px] uppercase tracking-widest font-bold px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-800/40">
                India Travel Discovery
              </span>
            </div>
            <span className="text-[11px] text-slate-400 font-medium tracking-tight mt-1">
              Explore · Plan · Discover
            </span>
          </div>
        </button>

        {/* Navigation Links (Desktop: clean typography, elegant underline) */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('home')}
            className={`whitespace-nowrap pb-1 transition-all cursor-pointer ${
              isTabActive('home')
                ? 'text-white font-semibold border-b-2 border-[#38BDF8]'
                : 'hover:text-white'
            }`}
          >
            Home
          </button>
          
          <button
            onClick={() => onSelectTab('explore')}
            className={`whitespace-nowrap pb-1 transition-all flex items-center gap-1.5 cursor-pointer ${
              isTabActive('explore')
                ? 'text-white font-semibold border-b-2 border-[#38BDF8]'
                : 'hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5 text-cyan-400" />
            <span>Explore India</span>
          </button>

          <button
            onClick={() => onSelectTab('planner')}
            className={`whitespace-nowrap pb-1 transition-all flex items-center gap-1.5 cursor-pointer ${
              isTabActive('planner')
                ? 'text-white font-semibold border-b-2 border-[#38BDF8]'
                : 'hover:text-white'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F4B860]" />
            <span>Smart Trip Planner</span>
          </button>

          <button
            onClick={() => onSelectTab('journey')}
            className={`whitespace-nowrap pb-1 transition-all flex items-center gap-1.5 cursor-pointer ${
              isTabActive('journey')
                ? 'text-white font-semibold border-b-2 border-[#38BDF8]'
                : 'hover:text-white'
            }`}
          >
            <Route className="w-3.5 h-3.5 text-emerald-400" />
            <span>My Journey</span>
            {tripsCount > 0 && (
              <span className="text-[10px] bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-1.5 rounded-full font-mono">
                {tripsCount}
              </span>
            )}
          </button>

          <button
            onClick={() => onSelectTab('insights')}
            className={`whitespace-nowrap pb-1 transition-all flex items-center gap-1.5 cursor-pointer ${
              isTabActive('insights')
                ? 'text-white font-semibold border-b-2 border-[#38BDF8]'
                : 'hover:text-white'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5 text-purple-400" />
            <span>Travel Insights</span>
          </button>

          <button
            onClick={() => onSelectTab('wishlist')}
            className={`whitespace-nowrap pb-1 transition-all flex items-center gap-1.5 cursor-pointer ${
              isTabActive('wishlist')
                ? 'text-white font-semibold border-b-2 border-[#38BDF8]'
                : 'hover:text-white'
            }`}
          >
            <Bookmark className="w-3.5 h-3.5 text-amber-400" />
            <span>My Wishlist</span>
            {savedCount > 0 && (
              <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-500/30 px-1.5 rounded-full font-mono">
                {savedCount}
              </span>
            )}
          </button>
        </nav>

        {/* Primary CTA Button */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onSelectTab('planner')}
            className="flex items-center gap-2 px-4 py-2 text-xs font-bold text-[#0B132B] bg-gradient-to-r from-[#F4B860] to-[#E0A045] hover:brightness-105 rounded-xl transition-all shadow-md cursor-pointer tracking-tight"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#0B132B]" />
            <span>Plan My Trip</span>
            <ChevronRight className="w-3 h-3 text-[#0B132B]" />
          </button>

          <button
            onClick={onOpenAbout}
            className="hidden sm:inline-block text-xs font-medium text-slate-400 hover:text-slate-200 transition-colors"
          >
            Architecture
          </button>
        </div>

      </div>

      {/* Mobile Navigation Bar */}
      <div className="lg:hidden flex items-center justify-around border-t border-slate-800/80 py-2.5 px-1 bg-[#0B132B] text-[11px] overflow-x-auto scrollbar-none">
        <button
          onClick={() => onSelectTab('home')}
          className={`py-1 px-2 whitespace-nowrap font-medium ${isTabActive('home') ? 'text-[#38BDF8] font-bold' : 'text-slate-400'}`}
        >
          Home
        </button>
        <button
          onClick={() => onSelectTab('explore')}
          className={`py-1 px-2 whitespace-nowrap font-medium ${isTabActive('explore') ? 'text-[#38BDF8] font-bold' : 'text-slate-400'}`}
        >
          Explore
        </button>
        <button
          onClick={() => onSelectTab('planner')}
          className={`py-1 px-2 whitespace-nowrap font-medium ${isTabActive('planner') ? 'text-[#38BDF8] font-bold' : 'text-slate-400'}`}
        >
          Planner
        </button>
        <button
          onClick={() => onSelectTab('journey')}
          className={`py-1 px-2 whitespace-nowrap font-medium ${isTabActive('journey') ? 'text-[#38BDF8] font-bold' : 'text-slate-400'}`}
        >
          My Journey
        </button>
        <button
          onClick={() => onSelectTab('insights')}
          className={`py-1 px-2 whitespace-nowrap font-medium ${isTabActive('insights') ? 'text-[#38BDF8] font-bold' : 'text-slate-400'}`}
        >
          Insights
        </button>
        <button
          onClick={() => onSelectTab('wishlist')}
          className={`py-1 px-2 whitespace-nowrap font-medium ${isTabActive('wishlist') ? 'text-[#38BDF8] font-bold' : 'text-slate-400'}`}
        >
          Wishlist ({savedCount})
        </button>
      </div>
    </header>
  );
};
