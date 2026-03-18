import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, Activity, PlayCircle, Settings, MapPin, Gauge } from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';

export default function Dashboard({ 
  congestionLevel, 
  setCongestionLevel 
}: { 
  congestionLevel: number, 
  setCongestionLevel: (level: number) => void 
}) {
  const [data, setData] = useState<{time: string, congestion: number}[]>([]);
  const [anomaly, setAnomaly] = useState<string | null>(null);

  useEffect(() => {
    // Generate mock historical data
    const mockData = Array.from({length: 20}).map((_, i) => {
      const d = new Date();
      d.setMinutes(d.getMinutes() - (20 - i) * 5);
      return {
        time: d.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}),
        congestion: Math.max(0, Math.min(100, (congestionLevel * 100) + (Math.random() * 20 - 10)))
      }
    });
    setData(mockData);
  }, [congestionLevel]);

  const triggerAnomaly = () => {
    const anomalies = [
      "Heavy Flooding & Waterlogging: GPS speeds reduced to 5km/h",
      "VIP Convoy Movement: Hosur Road block active",
      "Accident near BTM Flyover: 60% Lane Blockage"
    ];
    setAnomaly(anomalies[Math.floor(Math.random() * anomalies.length)]);
    setCongestionLevel(0.95);
    setTimeout(() => {
      setAnomaly(null);
      setCongestionLevel(0.4);
    }, 8000);
  };

  const getStatusColor = (level: number) => {
    if (level < 0.4) return 'text-emerald-400';
    if (level < 0.7) return 'text-amber-400';
    return 'text-rose-500';
  }

  const getStatusText = (level: number) => {
    if (level < 0.4) return 'Optimal Flow';
    if (level < 0.7) return 'Moderate Congestion';
    return 'Severe Jam';
  }

  return (
    <div className={`absolute inset-0 pointer-events-none p-6 flex flex-col justify-between transition-all duration-700 ${anomaly ? 'bg-rose-900/10 shadow-[inset_0_0_150px_rgba(225,29,72,0.4)] border-4 border-rose-500/40' : 'border-4 border-transparent'}`}>
      {/* Top Bar */}
      <header className="flex justify-between items-start">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900/80 backdrop-blur-md border border-slate-700 p-4 rounded-xl flex items-center shadow-2xl pointer-events-auto"
        >
          <div className="p-3 bg-indigo-500/20 rounded-lg mr-4">
            <Activity className="text-indigo-400 w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-white tracking-wide">NexusAI Traffic Controller</h1>
            <p className="text-slate-400 text-sm flex items-center gap-1">
              <MapPin className="w-3 h-3"/> Silk Board Junction, Bangalore
            </p>
          </div>
        </motion.div>

        <AnimatePresence>
          {anomaly && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="bg-rose-500/20 backdrop-blur-md border border-rose-500 p-4 rounded-xl flex items-center shadow-rose-500/20 shadow-2xl pointer-events-auto"
            >
              <AlertCircle className="text-rose-400 w-6 h-6 mr-3 animate-pulse" />
              <div>
                <h3 className="text-rose-100 font-bold text-sm">Anomaly Detected</h3>
                <p className="text-rose-300 text-xs">{anomaly}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Side Panels */}
      <div className="flex justify-between items-end gap-6 h-full mt-6 pb-2">
        {/* Left Panel - Analytics */}
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-80 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-5 rounded-xl shadow-2xl flex flex-col gap-6 pointer-events-auto"
        >
          <div>
            <h3 className="text-slate-300 font-semibold mb-1 text-sm flex items-center gap-2">
              <Gauge className="w-4 h-4 text-slate-400"/>
              Current Status
            </h3>
            <div className={`text-3xl font-bold tracking-tight ${getStatusColor(congestionLevel)}`}>
               {getStatusText(congestionLevel)}
            </div>
            <div className="mt-2 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                <motion.div 
                    className={`h-full ${congestionLevel > 0.7 ? 'bg-rose-500' : congestionLevel > 0.4 ? 'bg-amber-400' : 'bg-emerald-400'}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${congestionLevel * 100}%` }}
                    transition={{ duration: 0.5 }}
                />
            </div>
          </div>

          <div className="h-48">
             <h3 className="text-slate-300 font-semibold mb-3 text-sm">Predicted Flow (LSTM/XGBoost)</h3>
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={data} margin={{ top: 0, left: -20, right: 0, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorCongestion" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor={congestionLevel > 0.7 ? '#ef4444' : '#3b82f6'} stopOpacity={0.8}/>
                     <stop offset="95%" stopColor={congestionLevel > 0.7 ? '#ef4444' : '#3b82f6'} stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                 <XAxis dataKey="time" stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                 <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} axisLine={false} />
                 <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '0.5rem' }}
                 />
                 <Area 
                    type="monotone" 
                    dataKey="congestion" 
                    stroke={congestionLevel > 0.7 ? '#ef4444' : '#3b82f6'} 
                    fillOpacity={1} 
                    fill="url(#colorCongestion)" 
                 />
               </AreaChart>
             </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Right Panel - Controls */}
        <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="w-72 bg-slate-900/80 backdrop-blur-md border border-slate-700 p-5 rounded-xl shadow-2xl pointer-events-auto"
        >
          <h3 className="text-slate-300 font-semibold mb-4 text-sm flex items-center gap-2">
            <Settings className="w-4 h-4 text-slate-400"/> Ensure Realism & Constraints 
          </h3>
          
          <div className="space-y-4">
              <div>
                  <label className="text-xs text-slate-400 mb-1 block">Simulation Time</label>
                  <div className="flex gap-2">
                      <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs py-2 rounded-lg transition-colors">Morning</button>
                      <button className="flex-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs py-2 rounded-lg transition-colors">Rush Hour</button>
                      <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs py-2 rounded-lg transition-colors">Night</button>
                  </div>
              </div>

              <button 
                onClick={triggerAnomaly}
                className="w-full bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 py-3 rounded-xl font-medium text-sm transition-all flex items-center justify-center gap-2"
              >
                  <PlayCircle className="w-4 h-4"/>
                  Inject Traffic Anomaly
              </button>

              <div className="pt-4 border-t border-slate-700">
                  <h4 className="text-xs text-slate-400 mb-2">Explainable AI Insights & Optimization</h4>
                  <ul className="space-y-2">
                      <li className="text-sm bg-slate-800/50 p-2 rounded border border-slate-800 text-slate-300 flex items-start gap-2">
                          <span className="text-amber-400 mt-0.5">•</span>
                          [Insight] High density GPS clusters detected entering from Hosur Road.
                      </li>
                      <li className="text-sm bg-slate-800/50 p-2 rounded border border-slate-800 text-slate-300 flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          [Action] Increase ORR green light duration by 25s.
                      </li>
                      <li className="text-sm bg-slate-800/50 p-2 rounded border border-slate-800 text-slate-300 flex items-start gap-2">
                          <span className="text-emerald-400 mt-0.5">•</span>
                          [Action] Suggest rerouting App cabs via HSR Layout.
                      </li>
                  </ul>
              </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
