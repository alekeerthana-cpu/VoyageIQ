import React from 'react';
import { X, Database, Cpu, Sparkles, Compass, Check, BookOpen, Layers } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 sm:p-6">
      <div 
        className="bg-white rounded-2xl max-w-3xl w-full shadow-2xl overflow-hidden border border-slate-200 relative my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#167D9A] mb-1">
              <span>Project Specification & Architecture</span>
              <span aria-hidden="true">·</span>
              <span>College Portfolio Documentation</span>
            </div>
            <h2 className="text-xl font-extrabold text-[#102A43] tracking-tight">
              VoyageIQ System Architecture & Engineering
            </h2>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8 max-h-[70vh] overflow-y-auto space-y-6 text-xs text-slate-700">
          
          {/* Executive Overview */}
          <div>
            <h3 className="text-sm font-bold text-[#102A43] mb-2">
              1. Platform Overview & Problem Statement
            </h3>
            <p className="leading-relaxed">
              VoyageIQ is an AI-powered travel behavior and intelligence platform designed to move beyond basic tourist directories. It evaluates traveler preferences, financial budgets, pace constraints, and regional origin transit to compute deterministic, transparent recommendation rankings and dynamic itineraries.
            </p>
          </div>

          {/* Mathematical Formulation */}
          <div className="p-4 bg-slate-50 border border-slate-200 rounded-xl space-y-3">
            <h3 className="text-sm font-bold text-[#102A43] flex items-center gap-2">
              <Cpu className="w-4 h-4 text-[#167D9A]" />
              <span>2. Multi-Criteria Scoring Formulation</span>
            </h3>
            <div className="font-mono text-sm font-bold text-[#102A43] bg-white p-3 rounded-lg border border-slate-200 tabular-nums">
              S = 0.35B + 0.30I + 0.20D + 0.15T
            </div>
            <p className="leading-relaxed text-slate-600">
              Each component is normalized from 0 to 100:
            </p>
            <ul className="space-y-1.5 pl-3 list-disc text-slate-600">
              <li><strong className="text-slate-800">B (Budget Suitability, 35%):</strong> Evaluates duration-scaled estimated expense versus target budget ceiling with smooth decay penalties for budget overages.</li>
              <li><strong className="text-slate-800">I (Interest Match, 30%):</strong> Jaccard-weighted intersection of user selected tags with destination primary category and activity markers.</li>
              <li><strong className="text-slate-800">D (Trip Duration, 20%):</strong> Compares planned duration against destination ideal stay duration without rushed schedules.</li>
              <li><strong className="text-slate-800">T (Travel Style, 15%):</strong> Categorical alignment for budget-friendly, moderate, luxury, backpacker, and family travel modes.</li>
            </ul>
          </div>

          {/* Database Schema */}
          <div>
            <h3 className="text-sm font-bold text-[#102A43] mb-2 flex items-center gap-2">
              <Database className="w-4 h-4 text-[#167D9A]" />
              <span>3. Relational Database Schema Design</span>
            </h3>
            <div className="border border-slate-200 rounded-xl overflow-hidden">
              <table className="w-full text-left border-collapse text-[11px]">
                <thead className="bg-slate-100 text-slate-700 font-mono">
                  <tr>
                    <th className="p-2.5 border-b border-slate-200">Table Name</th>
                    <th className="p-2.5 border-b border-slate-200">Primary Columns</th>
                    <th className="p-2.5 border-b border-slate-200">System Purpose</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="p-2 font-mono font-bold text-slate-900">users</td>
                    <td className="p-2 font-mono text-slate-600">user_id, name, email, password_hash</td>
                    <td className="p-2 text-slate-600">User accounts & session management</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold text-slate-900">destinations</td>
                    <td className="p-2 font-mono text-slate-600">id, name, country, category, estimated_cost</td>
                    <td className="p-2 text-slate-600">Curated destination catalog</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold text-slate-900">user_preferences</td>
                    <td className="p-2 font-mono text-slate-600">pref_id, user_id, interests, budget, style</td>
                    <td className="p-2 text-slate-600">Traveler profile parameters</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold text-slate-900">trips</td>
                    <td className="p-2 font-mono text-slate-600">trip_id, user_id, destination_id, dates, budget</td>
                    <td className="p-2 text-slate-600">Saved and scheduled itineraries</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold text-slate-900">itinerary_items</td>
                    <td className="p-2 font-mono text-slate-600">item_id, trip_id, day_number, activity, cost</td>
                    <td className="p-2 text-slate-600">Granular daily activities & expenses</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold text-slate-900">saved_destinations</td>
                    <td className="p-2 font-mono text-slate-600">user_id, destination_id</td>
                    <td className="p-2 text-slate-600">Wishlist favorites collection</td>
                  </tr>
                  <tr>
                    <td className="p-2 font-mono font-bold text-slate-900">travel_events</td>
                    <td className="p-2 font-mono text-slate-600">event_id, user_id, event_type, created_at</td>
                    <td className="p-2 text-slate-600">Behavioral analytics tracking & log</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* AI Intelligence Layer */}
          <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-xl space-y-2">
            <h3 className="text-sm font-bold text-[#102A43] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#167D9A]" />
              <span>4. AI Intelligence Layer (Google Gemini 3.8 Flash)</span>
            </h3>
            <p className="leading-relaxed text-slate-600">
              The application couples deterministic algorithms with Google GenAI SDK (<code className="font-mono text-slate-800">gemini-3.8-flash</code>) on server-side endpoints:
            </p>
            <ul className="space-y-1 pl-3 list-disc text-slate-600">
              <li><strong className="text-slate-800">Behavioral Explanation:</strong> Generates data-driven reasoning for destination fit based on traveler origin (e.g. Vijayawada), budget, and duration constraints.</li>
              <li><strong className="text-slate-800">Dynamic Itinerary Synthesis:</strong> Generates realistic morning, afternoon, and evening schedules with localized cost models and insider advice.</li>
            </ul>
          </div>

        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 text-right">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors"
          >
            Close Documentation
          </button>
        </div>
      </div>
    </div>
  );
};
