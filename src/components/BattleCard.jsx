const BattleCard = ({ username, userdata }) => {
  if (!userdata) {
    return (
      <div className="bevel-inset bg-white p-6 text-center">
        <p className="font-heading text-lg text-[#000080] blink">
          ⏳ Loading {username}...
        </p>
        <p className="text-sm text-[#808080] mt-1">
          Fetching data from LeetCode servers...
        </p>
      </div>
    )
  }

  const stats = userdata.submitStats?.acSubmissionNum || []
  const total = stats.find((s) => s.difficulty === 'All')?.count || 1

  const difficultyConfig = {
    Easy: { color: '#00aa00', label: 'EASY' },
    Medium: { color: '#ff8000', label: 'MEDIUM' },
    Hard: { color: '#ff0000', label: 'HARD' },
  }

  return (
    <div className="win95-window">
      {/* Title bar */}
      <div className="win95-titlebar">
        <span>👤 {username} - Player Profile</span>
        <div className="win95-titlebar-buttons">
          <div className="win95-titlebar-btn">_</div>
          <div className="win95-titlebar-btn">□</div>
          <div className="win95-titlebar-btn">✕</div>
        </div>
      </div>

      <div className="win95-content">
        {/* Avatar & Info */}
        <div className="flex items-start gap-4 mb-4">
          <div className="flex-shrink-0">
            <div className="bevel-inset p-1">
              <img
                src={userdata.profile?.userAvatar}
                alt={`${username}'s avatar`}
                className="h-20 w-20 object-cover"
                style={{ imageRendering: 'auto' }}
              />
            </div>
          </div>
          <div className="flex-1">
            <h3 className="font-heading text-lg uppercase text-3d">
              {username}
            </h3>
            <p className="text-sm mt-1">
              📍 <b>Location:</b> {userdata.profile?.countryName || 'Unknown'}
            </p>
            <p className="text-sm">
              🏆 <b>Global Rank:</b>{' '}
              <span className="font-mono-retro text-[#000080] font-bold">
                #{userdata.profile?.ranking?.toLocaleString()}
              </span>
            </p>
          </div>
        </div>

        <div className="hr-groove" />

        {/* Stats Table */}
        <h4 className="font-heading text-sm uppercase mb-2 text-3d">
          📊 Submission Stats
        </h4>

        <div className="hit-counter mb-3 w-full text-center">
          Total Solved: {stats.find((s) => s.difficulty === 'All')?.count || 0}
        </div>

        <table className="table-90s">
          <thead>
            <tr>
              <th>Difficulty</th>
              <th>Solved</th>
              <th>Progress</th>
            </tr>
          </thead>
          <tbody>
            {stats
              .filter((s) => s.difficulty !== 'All')
              .map((stat) => {
                const percent = Math.min((stat.count / total) * 100, 100)
                const config = difficultyConfig[stat.difficulty]

                return (
                  <tr key={stat.difficulty}>
                    <td>
                      <b style={{ color: config.color }}>{config.label}</b>
                    </td>
                    <td className="font-mono-retro font-bold text-center">
                      {stat.count}
                    </td>
                    <td>
                      <div className="progress-bar-90s">
                        <div
                          className="progress-bar-90s-fill"
                          style={{
                            width: `${percent}%`,
                            background: config.color,
                          }}
                        />
                      </div>
                    </td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default BattleCard
