import { useState } from 'react'
import BattleCard from './BattleCard'
import fetchInfo from '../utils/fetchInfo'
import fetchResult from '../utils/fetchResults'
import ResultCrd from './ResultCrd'

const Battle = () => {
  const [username1, setUsername1] = useState('')
  const [username2, setUsername2] = useState('')
  const [startBattle, setStartBattle] = useState(false)
  const [data1, setData1] = useState(null)
  const [data2, setData2] = useState(null)
  const [showResults, setShowResults] = useState(false)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)

  const battleHandler = async () => {
    if (!username1 || !username2) {
      alert('Enter both usernames')
      return
    }

    setLoading(true)
    setStartBattle(false)
    setShowResults(false)

    try {
      const { userdata1, userdata2 } = await fetchInfo(username1, username2)
      setData1(userdata1)
      setData2(userdata2)
      setStartBattle(true)

      const result = await fetchResult(username1, username2)
      setResult(result)
      setShowResults(true)
    } catch {
      alert('Error fetching users')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      {/* ═══ Battle Input Window ═══ */}
      <div className="win95-window">
        <div className="win95-titlebar">
          <span>⚔️ Battle Setup - Enter Challengers</span>
          <div className="win95-titlebar-buttons">
            <div className="win95-titlebar-btn">_</div>
            <div className="win95-titlebar-btn">□</div>
            <div className="win95-titlebar-btn">✕</div>
          </div>
        </div>

        <div className="win95-content">
          <h2 className="font-heading text-xl uppercase text-3d mb-2">
            ⚡ ENTER USERNAMES ⚡
          </h2>
          <p className="text-sm mb-4 text-[#808080]">
            Type in two LeetCode usernames to begin the showdown...
          </p>

          <div className="hr-groove" />

          
          <div className="flex flex-col sm:flex-row items-end gap-4">
           
            <div className="flex-1 w-full">
              <label htmlFor="Username1" className="block text-sm font-bold mb-1">
                👤 Player 1:
              </label>
              <input
                type="text"
                placeholder="Enter username..."
                id="Username1"
                value={username1}
                onChange={(e) => setUsername1(e.target.value)}
                className="input-95"
              />
            </div>

            {/* VS */}
            <div className="flex-shrink-0 self-center sm:self-end sm:pb-1">
              <div className="vs-retro">VS</div>
            </div>

            {/* Player 2 */}
            <div className="flex-1 w-full">
              <label htmlFor="Username2" className="block text-sm font-bold mb-1">
                👤 Player 2:
              </label>
              <input
                type="text"
                placeholder="Enter username..."
                id="Username2"
                value={username2}
                onChange={(e) => setUsername2(e.target.value)}
                className="input-95"
              />
            </div>
          </div>

          <div className="hr-groove" />

          {/* Battle Button */}
          <div className="text-center">
            <button
              id="battle-btn"
              onClick={battleHandler}
              disabled={loading}
              className="btn-95 btn-95-green text-base px-10 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span>
                  ⏳ LOADING... PLEASE WAIT...
                </span>
              ) : (
                '⚔️ BATTLE NOW!! ⚔️'
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ═══ Battle Cards ═══ */}
      {startBattle && (
        <>
          <div className="hr-groove" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <BattleCard username={username1} userdata={data1} />
            <BattleCard username={username2} userdata={data2} />
          </div>
        </>
      )}

      {/* ═══ Results ═══ */}
      {startBattle ? (
        <>
          <div className="hr-groove" />
          {showResults ? (
            <ResultCrd
              result={result}
              username1={username1}
              username2={username2}
              data1={data1}
              data2={data2}
            />
          ) : (
            <div className="bevel-inset bg-white p-6 text-center">
              <p className="font-heading text-lg text-[#000080] blink">
                ⏳ CALCULATING RESULTS... PLEASE WAIT... ⏳
              </p>
              <p className="text-sm text-[#808080] mt-2">
                Our advanced AI is analyzing the profiles...
              </p>
            </div>
          )}
        </>
      ) : (
        <>
          <div className="hr-groove" />
          <div className="bevel-inset bg-[#ffffcc] p-4 text-center">
            <p className="text-sm">
              👆 Enter usernames above and click <b>BATTLE NOW!!</b> to start!
            </p>
          </div>
        </>
      )}
    </div>
  )
}

export default Battle
