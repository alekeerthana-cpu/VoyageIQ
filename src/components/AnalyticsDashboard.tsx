import React, { useState } from 'react';
import { BarChart3, TrendingUp, Compass, PieChart, DollarSign, Calendar, Users, Eye, Bookmark, Info } from 'lucide-react';
import { AnalyticsData } from '../types/travel';
import { INITIAL_ANALYTICS, BEHAVIORAL_INSIGHTS } from '../services/analyticsData';

interface AnalyticsDashboardProps {
  analytics?: AnalyticsData;
}

export const AnalyticsDashboard: React.FC<AnalyticsDashboardProps> = ({
  analytics = INITIAL_ANALYTICS
}) => {
  const [metricMode, setMetricMode] = useState<'saves' | 'views' | 'visits'>('saves');
  const [activeSegment, setActiveSegment] = useState<number | null>(null);

  // Maximum value for scaling the bar chart
  const maxBarValue = Math.max(...analytics.popularDestinations.map(d => d[metricMode]));

  return (
    <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-10">
      
      {/* Dashboard Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-200">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-1">
            <span>Travel Behavior & Intelligence</span>
            <span aria-hidden="true">·</span>
            <span>Empirical Analytics Engine</span>
            <span aria-hidden="true">·</span>
            <span className="text-emerald-700 font-bold">1,840 Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#102A43] tracking-tight">
            Traveler Preferences & Destination Intelligence
          </h1>
        </div>

        <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-100 p-1 rounded-xl">
          <button
            onClick={() => setMetricMode('saves')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              metricMode === 'saves' ? 'bg-white text-[#102A43] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Wishlist Saves
          </button>
          <button
            onClick={() => setMetricMode('views')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              metricMode === 'views' ? 'bg-white text-[#102A43] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Catalog Views
          </button>
          <button
            onClick={() => setMetricMode('visits')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition-colors ${
              metricMode === 'visits' ? 'bg-white text-[#102A43] shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Completed Trips
          </button>
        </div>
      </div>

      {/* KPI Stat Cards (Single-elevation, 1px border, tabular numerals) */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        
        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
            Catalog Destinations
          </span>
          <div className="text-2xl font-extrabold text-[#102A43] tabular-nums mt-1">
            {analytics.totalDestinations}
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Verified travel spots
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
            Analyzed Trips
          </span>
          <div className="text-2xl font-extrabold text-[#102A43] tabular-nums mt-1">
            {analytics.totalSavedTrips.toLocaleString()}
          </div>
          <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
            +18% this quarter
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
            Average Trip Budget
          </span>
          <div className="text-2xl font-extrabold text-[#102A43] tabular-nums mt-1">
            ₹{analytics.avgEstimatedBudgetInr.toLocaleString()}
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5">
            Median across all users
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
            Top Category
          </span>
          <div className="text-lg font-bold text-[#102A43] truncate mt-1">
            {analytics.topCategory}
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5 tabular-nums">
            38% of total interest
          </span>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 col-span-2 md:col-span-1">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block font-mono">
            Top Recommendation
          </span>
          <div className="text-base font-bold text-[#167D9A] truncate mt-1">
            Araku Valley & Borra
          </div>
          <span className="text-[11px] text-slate-500 block mt-0.5 tabular-nums">
            Highest multi-fit score
          </span>
        </div>

      </div>

      {/* Main Grid: Popular Destinations Bar Chart + Preferences Donut */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Popular Destinations Ranking Chart */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-[#102A43]">
                Destination Ranking by {metricMode === 'saves' ? 'Wishlist Saves' : metricMode === 'views' ? 'Page Views' : 'Trip Completions'}
              </h2>
              <span className="text-xs text-slate-500">
                Aggregated behavior frequency across recorded user sessions
              </span>
            </div>
            <BarChart3 className="w-4 h-4 text-[#167D9A]" />
          </div>

          <div className="space-y-3 pt-2">
            {analytics.popularDestinations.map((dest, idx) => {
              const val = dest[metricMode];
              const pct = Math.round((val / maxBarValue) * 100);

              return (
                <div key={dest.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="font-semibold text-slate-800">
                      <span className="font-mono text-slate-400 tabular-nums mr-2">0{idx + 1}.</span>
                      {dest.name}
                    </span>
                    <span className="font-mono font-bold text-slate-700 tabular-nums">
                      {val.toLocaleString()} {metricMode}
                    </span>
                  </div>
                  <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#102A43] to-[#167D9A] rounded-full transition-all duration-500"
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Category Breakdown & Donut Representation */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div>
                <h2 className="text-base font-bold text-[#102A43]">
                  Travel Interest Category Share
                </h2>
                <span className="text-xs text-slate-500">
                  Distribution of primary interests
                </span>
              </div>
              <PieChart className="w-4 h-4 text-[#167D9A]" />
            </div>

            {/* Visual Multi-segment Bar */}
            <div className="pt-4 pb-2">
              <div className="h-4 w-full flex rounded-full overflow-hidden">
                <div style={{ width: '38%' }} className="bg-[#102A43]" title="Nature (38%)" />
                <div style={{ width: '23%' }} className="bg-[#167D9A]" title="Adventure (23%)" />
                <div style={{ width: '19%' }} className="bg-sky-400" title="Coastal (19%)" />
                <div style={{ width: '13%' }} className="bg-[#F4B860]" title="Cultural (13%)" />
                <div style={{ width: '7%' }} className="bg-emerald-500" title="Relaxation (7%)" />
              </div>
            </div>

            {/* Category Breakdown List */}
            <div className="space-y-2.5 pt-2">
              {analytics.categoryDistribution.map((item, idx) => {
                const colors = ['bg-[#102A43]', 'bg-[#167D9A]', 'bg-sky-400', 'bg-[#F4B860]', 'bg-emerald-500'];
                return (
                  <div
                    key={item.category}
                    className="flex items-center justify-between text-xs py-1.5 px-2 rounded-lg hover:bg-slate-50 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <div className={`w-2.5 h-2.5 rounded-sm ${colors[idx % colors.length]}`} />
                      <span className="font-medium text-slate-700">{item.category}</span>
                    </div>
                    <div className="flex items-center gap-3 font-mono tabular-nums">
                      <span className="text-slate-500">{item.count} travelers</span>
                      <span className="font-bold text-slate-900">{item.percentage}%</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs text-slate-600">
            <span className="font-bold text-slate-800">Key takeaway:</span> Over 61% of travelers combine Nature & Adventure when planning holidays from Southern hubs.
          </div>
        </div>

      </div>

      {/* Seasonal Demand Trends & Budget Tier Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Seasonal Curve (SVG Line Chart) */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-[#102A43]">
                Monthly Travel Demand & Booking Index
              </h2>
              <span className="text-xs text-slate-500">
                12-month cyclical trends across searches and confirmed bookings
              </span>
            </div>
            <TrendingUp className="w-4 h-4 text-[#167D9A]" />
          </div>

          {/* SVG Line / Area Graph */}
          <div className="pt-4">
            <div className="h-48 w-full">
              <svg viewBox="0 0 600 180" className="w-full h-full overflow-visible">
                <defs>
                  <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#167D9A" stopOpacity="0.35" />
                    <stop offset="100%" stopColor="#167D9A" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Horizontal grid lines */}
                <line x1="0" y1="30" x2="600" y2="30" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="0" y1="80" x2="600" y2="80" stroke="#E2E8F0" strokeDasharray="3 3" />
                <line x1="0" y1="130" x2="600" y2="130" stroke="#E2E8F0" strokeDasharray="3 3" />

                {/* Area path */}
                <path
                  d={`M 25 ${160 - analytics.seasonalTrends[0].bookingsIndex * 1.2}
                      ${analytics.seasonalTrends.map((t, i) => `L ${25 + i * 50} ${160 - t.bookingsIndex * 1.2}`).join(' ')}
                      L 575 160 L 25 160 Z`}
                  fill="url(#areaGrad)"
                />

                {/* Main Curve Line */}
                <path
                  d={`M 25 ${160 - analytics.seasonalTrends[0].bookingsIndex * 1.2}
                      ${analytics.seasonalTrends.map((t, i) => `L ${25 + i * 50} ${160 - t.bookingsIndex * 1.2}`).join(' ')}`}
                  fill="none"
                  stroke="#167D9A"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />

                {/* Data Points */}
                {analytics.seasonalTrends.map((t, i) => {
                  const cx = 25 + i * 50;
                  const cy = 160 - t.bookingsIndex * 1.2;
                  return (
                    <g key={t.month}>
                      <circle
                        cx={cx}
                        cy={cy}
                        r="4"
                        fill="#102A43"
                        stroke="#FFFFFF"
                        strokeWidth="2"
                      />
                      <text
                        x={cx}
                        y="175"
                        textAnchor="middle"
                        fontSize="10"
                        fill="#64748B"
                        fontFamily="monospace"
                      >
                        {t.month}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
            <div className="flex items-center justify-between text-[11px] text-slate-500 pt-3 border-t border-slate-100">
              <span>Summer Hill Station Peak (May)</span>
              <span className="font-bold text-[#102A43]">Winter High Demand Season (Oct – Dec)</span>
            </div>
          </div>
        </div>

        {/* Budget Tiers Distribution */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-[#102A43]">
                Budget Tier Allocation
              </h2>
              <span className="text-xs text-slate-500">
                Trip budget expectations from traveler inquiries
              </span>
            </div>
            <DollarSign className="w-4 h-4 text-[#167D9A]" />
          </div>

          <div className="space-y-3 pt-2">
            {analytics.budgetTierDistribution.map((tier) => (
              <div key={tier.tier} className="space-y-1">
                <div className="flex justify-between text-xs">
                  <span className="font-medium text-slate-800">{tier.tier}</span>
                  <span className="font-mono font-bold text-[#102A43] tabular-nums">
                    {tier.percentage}% ({tier.count})
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#167D9A] rounded-full"
                    style={{ width: `${tier.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 bg-amber-50/70 border border-amber-200/60 rounded-xl text-xs text-amber-950 mt-4">
            <span className="font-bold">Budget Observation:</span> 66% of leisure planning centers below ₹20,000 for 3-day durations.
          </div>
        </div>

      </div>

      {/* Behavioral Insights Cards */}
      <div className="space-y-4">
        <h2 className="text-xl font-extrabold text-[#102A43] tracking-tight">
          Empirical Travel Behavior Findings
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {BEHAVIORAL_INSIGHTS.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-5 rounded-xl border border-slate-200 space-y-2 flex flex-col justify-between shadow-xs"
            >
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#167D9A] font-mono block">
                  Insight {idx + 1}
                </span>
                <h3 className="text-sm font-bold text-[#102A43] mt-0.5">
                  {item.title}
                </h3>
                <div className="text-base font-extrabold text-slate-900 tabular-nums my-1">
                  {item.stat}
                </div>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
