const ResultCrd = ({ result, username1, username2, data1, data2 }) => {
  const winnerName = result?.winner || ''
  const isUser1Winner = winnerName.toLowerCase() === username1.toLowerCase()
  const winnerAvatar = isUser1Winner ? data1?.profile?.userAvatar : data2?.profile?.userAvatar

  // Handle various score formats from the API
  const getScores = () => {
    const score = result?.score || result?.scores || {}
    const s1 = score.user1 ?? score[username1] ?? score.player1 ?? Object.values(score)[0] ?? 'N/A'
    const s2 = score.user2 ?? score[username2] ?? score.player2 ?? Object.values(score)[1] ?? 'N/A'
    return { s1, s2 }
  }
  const { s1, s2 } = getScores()

  return (
    <div className="win95-window">
      {/* Title bar */}
      <div className="win95-titlebar">
        <span>🏆 Battle Results - WINNER ANNOUNCED!</span>
        <div className="win95-titlebar-buttons">
          <div className="win95-titlebar-btn">_</div>
          <div className="win95-titlebar-btn">□</div>
          <div className="win95-titlebar-btn">✕</div>
        </div>
      </div>

      <div className="win95-content-yellow text-center">
        {/* Construction stripe accent */}
        <div className="construction-stripes h-3 mb-4" />

        {/* Winner heading */}
        <h2 className="font-heading text-2xl sm:text-3xl uppercase text-rainbow text-3d mb-2">
          🏆 AND THE WINNER IS... 🏆
        </h2>

        {/* Winner avatar */}
        {winnerAvatar && (
          <div className="inline-block bevel-outset-deep p-2 my-3">
            <img
              src={winnerAvatar}
              alt={`${winnerName} profile`}
              className="h-24 w-24 object-cover"
            />
          </div>
        )}

        {/* Winner name */}
        <h3 className="font-heading text-3xl sm:text-4xl uppercase text-[#000080] text-3d-dark my-2">
          ★ {result.winner} ★
        </h3>

        <span className="badge-hot animate-pulse-glow">🔥 CHAMPION! 🔥</span>

        <div className="hr-groove" />

        {/* Reason */}
        <div className="bevel-inset bg-white p-4 text-left my-4">
          <p className="text-sm font-bold mb-1 text-[#000080]">📝 Judge&apos;s Analysis:</p>
          <p className="text-sm">{result.reason}</p>
        </div>

        <div className="hr-groove" />

        {/* Score Table */}
        <h4 className="font-heading text-lg uppercase text-3d mb-2">
          📊 FINAL SCORES
        </h4>

        <table className="table-90s w-full">
          <thead>
            <tr>
              <th>Player</th>
              <th className="text-center">Score</th>
              <th className="text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                <b>{username1}</b>
              </td>
              <td className="font-mono-retro font-bold text-center text-lg">
                {s1}
              </td>
              <td className="text-center">
                {isUser1Winner ? (
                  <span className="badge-hot" style={{ background: '#00aa00', borderColor: '#00ff00 #006600 #006600 #00ff00', fontSize: '10px' }}>
                    WINNER!
                  </span>
                ) : (
                  <span className="text-[#808080] text-sm">—</span>
                )}
              </td>
            </tr>
            <tr>
              <td>
                <b>{username2}</b>
              </td>
              <td className="font-mono-retro font-bold text-center text-lg">
                {s2}
              </td>
              <td className="text-center">
                {!isUser1Winner ? (
                  <span className="badge-hot" style={{ background: '#00aa00', borderColor: '#00ff00 #006600 #006600 #00ff00', fontSize: '10px' }}>
                    WINNER!
                  </span>
                ) : (
                  <span className="text-[#808080] text-sm">—</span>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Construction stripe accent */}
        <div className="construction-stripes h-3 mt-4" />
      </div>
    </div>
  )
}

export default ResultCrd
