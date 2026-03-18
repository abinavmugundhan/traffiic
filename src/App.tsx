import React, { useState, useEffect } from 'react';
import CityModel from './components/CityModel';
import Dashboard from './components/Dashboard';

function App() {
  const [congestionLevel, setCongestionLevel] = useState(0.3); // 0.0 to 1.0

  return (
    <div className="relative w-full h-screen bg-slate-950 text-white overflow-hidden">
      {/* 3D Smart City Environment */}
      <CityModel congestionLevel={congestionLevel} />
      
      {/* HUD overlay */}
      <Dashboard congestionLevel={congestionLevel} setCongestionLevel={setCongestionLevel} />
    </div>
  );
}

export default App;
