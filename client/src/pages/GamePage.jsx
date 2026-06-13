import { useEffect } from 'react';

export default function GamePage() {
  useEffect(() => {
    // Load CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/style.css';
    document.head.appendChild(link);

    // Load scripts in order (each depends on the previous)
    const srcs = ['/worldmap.js', '/battlemap.js', '/game.js'];
    const scripts = [];
    srcs.forEach((src, i) => {
      const s = document.createElement('script');
      s.src = src;
      s.async = false;
      document.body.appendChild(s);
      scripts.push(s);
    });

    return () => {
      scripts.forEach(s => document.body.removeChild(s));
      document.head.removeChild(link);
    };
  }, []);

  return (
    <>
      <canvas id="map-canvas" />

      <div id="event-panel" style={{ display: 'none' }}>
        <div id="event-placeholder">Take a step to discover what lies ahead...</div>
        <div id="current-event" style={{ display: 'none' }}>
          <div className="event-header">
            <span id="event-badge" className="event-badge"></span>
            <span id="event-biome-tag" className="event-biome-tag"></span>
          </div>
          <div id="event-title" className="event-title"></div>
          <div id="event-desc" className="event-desc"></div>
        </div>
        <div id="event-log-section" style={{ display: 'none' }}>
          <div className="event-log-divider"></div>
          <div id="event-log-list"></div>
        </div>
      </div>

      <div id="players-panel" style={{ display: 'none' }}>
        <h3>Party</h3>
        <div id="party-list"></div>
      </div>

      <div id="hud">
        <span id="player-count"></span>
        <span id="world-time"></span>
        <span id="current-biome"></span>
        <span id="step-count"></span>
        <span id="vote-status"></span>
        <span id="status"></span>
        <button id="gm-toggle" style={{ display: 'none', marginLeft: 20, padding: '5px 10px', background: '#555', color: '#fff', border: '1px solid #888', borderRadius: 3, cursor: 'pointer' }}>GM View: OFF</button>
        <button id="new-game-btn" style={{ display: 'none', marginLeft: 8, padding: '5px 10px', background: '#3a2a4a', color: '#fff', border: '1px solid #888', borderRadius: 3, cursor: 'pointer' }}>New Game</button>
      </div>

      <div id="hex-tooltip"></div>
      <div id="settlement-card"></div>

      <div id="mode-select">
        <div id="mode-select-box">
          <h1>Hexcrawl</h1>
          <p className="mode-subtitle">Choose your path</p>
          <div id="mode-grid">
            <div className="mode-card" data-mode="expedition">
              <span className="mode-icon">🗺️</span>
              <span className="mode-name">Expedition</span>
              <span className="mode-desc">The world is forged around you. Explore procedurally generated lands, discover settlements, and face the unknown.</span>
            </div>
            <div className="mode-card" data-mode="creative">
              <span className="mode-icon">✍️</span>
              <span className="mode-name">Creative</span>
              <span className="mode-desc">Shape the world as Dungeon Master. Place settlements, design hex maps, and craft your story.</span>
            </div>
          </div>
        </div>
      </div>

      <div id="lobby" style={{ display: 'none' }}>
        <div id="lobby-box">
          <p className="lobby-label">Your Name</p>
          <input
            type="text"
            id="player-name"
            maxLength={20}
            placeholder="Enter adventurer name..."
            autoComplete="off"
          />
          <p className="lobby-label">Choose Your Class</p>
          <div id="class-grid">
            <div className="class-card" data-class="warrior">
              <span className="class-icon">⚔️</span>
              <span className="class-name">Warrior</span>
              <span className="class-desc">Hardy fighter and shield-bearer of the realm</span>
            </div>
            <div className="class-card" data-class="ranger">
              <span className="class-icon">🏹</span>
              <span className="class-name">Ranger</span>
              <span className="class-desc">Scout, archer, wilderness survivalist</span>
            </div>
            <div className="class-card" data-class="mage">
              <span className="class-icon">🔮</span>
              <span className="class-name">Mage</span>
              <span className="class-desc">Arcane power, keeper of ancient spells</span>
            </div>
            <div className="class-card" data-class="rogue">
              <span className="class-icon">🗡️</span>
              <span className="class-name">Rogue</span>
              <span className="class-desc">Stealthy, cunning, strikes from shadows</span>
            </div>
          </div>
          <div id="lobby-error"></div>
          <button id="join-btn" disabled>Enter the Realm</button>
        </div>
      </div>
    </>
  );
}
