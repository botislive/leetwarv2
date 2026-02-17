import './App.css'
import { useState } from 'react'
import Battle from './components/Battle'

function App() {
  const [start, setStart] = useState(false)

  const buttonHandler = () => {
    setStart((prev) => !prev)
  }

  return (
    <div className="min-h-screen pb-8">
      {/* ═══ Marquee Announcement Bar ═══ */}
      <div className="marquee-bar overflow-hidden whitespace-nowrap">
        <div className="marquee-scroll inline-block">
          <span className="mx-8">⚔️ Welcome to LEETWAR - The Ultimate LeetCode Battle Arena!! ⚔️</span>
          <span className="mx-8 text-[#ffff00]">★★★ Compare profiles HEAD-TO-HEAD! ★★★</span>
          <span className="mx-8 text-[#00ff00]">{'>>>'} Now with AI-powered battle analysis! {'<<<'}</span>
          <span className="mx-8 text-[#ff0000]">!! HOT HOT HOT !!</span>
          <span className="mx-8">⚔️ Welcome to LEETWAR - The Ultimate LeetCode Battle Arena!! ⚔️</span>
          <span className="mx-8 text-[#ffff00]">★★★ Compare profiles HEAD-TO-HEAD! ★★★</span>
        </div>
      </div>

      {/* ═══ Main Container ═══ */}
      <div className="px-6 py-8">
        {/* ═══ Hero Window ═══ */}
        <div className="win95-window">
          <div className="win95-titlebar">
            <span>⚔️ LeetWar - Battle Arena</span>
            <div className="win95-titlebar-buttons">
              <div className="win95-titlebar-btn">_</div>
              <div className="win95-titlebar-btn">□</div>
              <div className="win95-titlebar-btn">✕</div>
            </div>
          </div>

          <div className="win95-content-yellow text-center">
            {/* Color squares decoration */}
            <div className="mb-4 flex justify-center gap-1">
              {['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'].map((c) => (
                <div key={c} className="color-square" style={{ background: c }} />
              ))}
            </div>

            {/* Rainbow Title */}
            <h1 className="font-heading text-rainbow text-5xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-3d">
              LEETWAR
            </h1>

            <p className="mt-2 text-lg font-bold text-[#000080]">
              ★ Who&apos;s got the better LeetCode profile? ★
            </p>

            {/* Groove divider */}
            <div className="hr-groove mx-auto w-3/4" />

            {/* Description */}
            <p className="text-sm mb-4">
              Enter the arena and find out who&apos;s the <b>REAL</b> coding champion!<br />
              Compare submissions, rankings, and more!
            </p>

            {/* Hot badge */}
            <span className="badge-hot animate-pulse-glow mr-2">🔥 HOT!</span>
            <span className="badge-hot" style={{ background: '#00aa00', borderColor: '#00ff00 #006600 #006600 #00ff00' }}>NEW!</span>

            {/* CTA Button */}
            <div className="mt-6 mb-4">
              <button
                onClick={buttonHandler}
                id="start-btn"
                className={`btn-95 btn-95-blue text-lg px-8 py-3 ${start ? 'btn-95-red' : ''}`}
              >
                {start ? '[ X ] CLOSE ARENA' : '[ >> ] ENTER THE ARENA'}
              </button>
            </div>

            {/* Built by */}
            <div className="mt-4 flex items-center justify-center gap-3">
              <span className="text-sm font-bold">Built with care by</span>
              <a href="https://github.com/botislive" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                <div className="bevel-outset p-0.5">
                  <img src="https://avatars.githubusercontent.com/u/205576067?v=4" alt="botislive" className="h-8 w-8 object-cover" />
                </div>
                <span className="font-bold">botislive</span>
              </a>
            </div>

            {/* Color squares bottom */}
            <div className="mt-4 flex justify-center gap-1">
              {['#00ffff', '#ff00ff', '#ffff00', '#0000ff', '#00ff00', '#ff0000'].map((c, i) => (
                <div key={i} className="color-square" style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>

        {/* Groove divider */}
        <div className="hr-groove" />

        {/* ═══ Battle Section ═══ */}
        {start && <Battle />}

        {/* ═══ Construction Stripe Footer ═══ */}
        <div className="mt-8">
          <div className="construction-stripes h-6" />
          <div className="bevel-outset bg-[#c0c0c0] p-4 text-center">
            <p className="font-mono-retro text-xs">
              © 1997-2026 LeetWar | Best viewed in <b>Netscape Navigator 4.0</b> at <b>800x600</b> |{' '}
              <a href="#">Sign my Guestbook!</a> |{' '}
              <span className="blink text-[#ff0000]">Under Construction!</span>
            </p>
          </div>
          <div className="construction-stripes h-6" />
        </div>
      </div>
    </div>
  )
}

export default App
