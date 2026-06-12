import React, { useState } from 'react';
import './CSS/VSCodePorfolio.css';
import VSCodeExplorerPortfolio from './component/VSCodeExplorerPortfolio';
import BootSequence from './component/BootSequence';
import ParticleBackground from './component/ParticleBackground';
import CursorGlow from './component/CursorGlow';

function App() {
  const [booted, setBooted] = useState(false);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh', overflow: 'hidden' }}>
      {/* Boot Sequence */}
      {!booted && <BootSequence onComplete={() => setBooted(true)} />}

      {/* Background effects (always rendered, visible after boot) */}
      {booted && (
        <>
          <ParticleBackground />
          <CursorGlow />
        </>
      )}

      {/* Main IDE */}
      {booted && (
        <div style={{ position: 'relative', zIndex: 5, width: '100%', height: '100%' }}
          className="animate-fade-in">
          <VSCodeExplorerPortfolio />
        </div>
      )}
    </div>
  );
}

export default App;
