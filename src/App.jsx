import { useState, useEffect } from "react";

const CONTRACTS = [
  { round: 1, name: "Two Sets",            desc: "2 sets of 3" },
  { round: 2, name: "One Set + One Run",   desc: "1 set of 3 + 1 run of 4" },
  { round: 3, name: "Two Runs",            desc: "2 runs of 4" },
  { round: 4, name: "Three Sets",          desc: "3 sets of 3" },
  { round: 5, name: "Two Sets + One Run",  desc: "2 sets of 3 + 1 run of 4" },
  { round: 6, name: "One Set + Two Runs",  desc: "1 set of 3 + 2 runs of 4" },
  { round: 7, name: "Three Runs",          desc: "3 runs of 4 (no discard)" },
];

const DEFAULT_NAMES = ["Player 1", "Player 2", "Player 3", "Player 4", "Player 5"];

const STORAGE_KEY = "liverpool-rummy-state";

const defaultState = () => ({
  phase: "setup",
  names: [...DEFAULT_NAMES],
  scores: Array(5).fill(null).map(() => []),
  currentRound: 0,
});

function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : defaultState();
  } catch {
    return defaultState();
  }
}

function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
}

export default function LiverpoolRummy() {
  const [phase, setPhase] = useState(() => loadState().phase);
  const [names, setNames] = useState(() => loadState().names);
  const [scores, setScores] = useState(() => loadState().scores);
  const [currentRound, setCurrentRound] = useState(() => loadState().currentRound);
  const [inputs, setInputs] = useState(Array(5).fill(""));
  const [showContract, setShowContract] = useState(true);

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveState({ phase, names, scores, currentRound });
  }, [phase, names, scores, currentRound]);

  const totalScore = (playerIdx) =>
    scores[playerIdx].reduce((a, b) => a + b, 0);

  const handleNameChange = (i, val) => {
    const n = [...names];
    n[i] = val;
    setNames(n);
  };

  const handleStart = () => {
    setPhase("game");
    setShowContract(true);
  };

  const handleInputChange = (i, val) => {
    const arr = [...inputs];
    arr[i] = val;
    setInputs(arr);
  };

  const handleSubmitRound = () => {
    const newScores = scores.map((s, i) => {
      const val = parseInt(inputs[i], 10);
      return [...s, isNaN(val) ? 0 : val];
    });
    setScores(newScores);
    setInputs(Array(5).fill(""));
    if (currentRound + 1 >= CONTRACTS.length) {
      setPhase("end");
    } else {
      setCurrentRound(currentRound + 1);
      setShowContract(true);
    }
  };

  const handleRestart = () => {
    const fresh = defaultState();
    setPhase(fresh.phase);
    setNames(fresh.names);
    setScores(fresh.scores);
    setCurrentRound(fresh.currentRound);
    setInputs(Array(5).fill(""));
    setShowContract(true);
    localStorage.removeItem(STORAGE_KEY);
  };

  const getRanking = () => {
    return [...names]
      .map((name, i) => ({ name, total: totalScore(i) }))
      .sort((a, b) => a.total - b.total);
  };

  const contract = CONTRACTS[currentRound];

  return (
    <div style={{
      minHeight: "100vh",
      background: "#0f1117",
      fontFamily: "'Georgia', serif",
      color: "#e8dfc8",
      padding: "0",
      margin: "0",
    }}>

      {/* Header */}
      <div style={{
        background: "linear-gradient(135deg, #1a1f2e 0%, #0f1117 100%)",
        borderBottom: "1px solid #2a3040",
        padding: "20px 24px 16px",
        textAlign: "center",
        position: "sticky",
        top: 0,
        zIndex: 10,
      }}>
        <div style={{ fontSize: 11, letterSpacing: 4, color: "#6b7a99", textTransform: "uppercase", marginBottom: 4 }}>
          Card Game Tracker
        </div>
        <div style={{ fontSize: 26, fontWeight: "bold", color: "#e8dfc8", letterSpacing: 1 }}>
          Liverpool Rummy
        </div>
        {phase === "game" && (
          <div style={{ fontSize: 13, color: "#8891a8", marginTop: 4 }}>
            Round {currentRound + 1} of {CONTRACTS.length}
          </div>
        )}
      </div>

      <div style={{ maxWidth: 560, margin: "0 auto", padding: "24px 16px" }}>

        {/* ── SETUP ── */}
        {phase === "setup" && (
          <div>
            <div style={{ fontSize: 13, color: "#6b7a99", letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>
              Enter Player Names
            </div>
            {names.map((name, i) => (
              <div key={i} style={{ marginBottom: 10 }}>
                <input
                  value={name}
                  onChange={e => handleNameChange(i, e.target.value)}
                  placeholder={`Player ${i + 1}`}
                  style={{
                    width: "100%",
                    background: "#1a1f2e",
                    border: "1px solid #2a3040",
                    borderRadius: 8,
                    color: "#e8dfc8",
                    fontSize: 15,
                    padding: "12px 14px",
                    outline: "none",
                    boxSizing: "border-box",
                    fontFamily: "'Georgia', serif",
                  }}
                />
              </div>
            ))}
            <button
              onClick={handleStart}
              style={{
                marginTop: 20,
                width: "100%",
                background: "linear-gradient(135deg, #c9a84c, #e8c96d)",
                color: "#0f1117",
                border: "none",
                borderRadius: 10,
                padding: "15px",
                fontSize: 16,
                fontWeight: "bold",
                cursor: "pointer",
                letterSpacing: 1,
                fontFamily: "'Georgia', serif",
              }}
            >
              Start Game
            </button>
          </div>
        )}

        {/* ── GAME ── */}
        {phase === "game" && (
          <div>
            {/* Contract Card */}
            {showContract && (
              <div style={{
                background: "linear-gradient(135deg, #1e2535, #252c3f)",
                border: "1px solid #c9a84c55",
                borderLeft: "4px solid #c9a84c",
                borderRadius: 12,
                padding: "20px 20px 16px",
                marginBottom: 24,
              }}>
                <div style={{ fontSize: 11, letterSpacing: 3, color: "#c9a84c", textTransform: "uppercase", marginBottom: 6 }}>
                  Round {currentRound + 1} Contract
                </div>
                <div style={{ fontSize: 22, fontWeight: "bold", color: "#e8dfc8", marginBottom: 6 }}>
                  {contract.name}
                </div>
                <div style={{ fontSize: 15, color: "#8891a8" }}>
                  {contract.desc}
                </div>
                {currentRound === 6 && (
                  <div style={{ fontSize: 12, color: "#c9a84c", marginTop: 8, fontStyle: "italic" }}>
                    ★ Final round — no discard allowed
                  </div>
                )}
                <button
                  onClick={() => setShowContract(false)}
                  style={{
                    marginTop: 14,
                    background: "transparent",
                    border: "1px solid #2a3040",
                    borderRadius: 6,
                    color: "#6b7a99",
                    fontSize: 12,
                    padding: "6px 14px",
                    cursor: "pointer",
                    fontFamily: "'Georgia', serif",
                  }}
                >
                  Got it ✓
                </button>
              </div>
            )}

            {!showContract && (
              <button
                onClick={() => setShowContract(true)}
                style={{
                  marginBottom: 16,
                  background: "transparent",
                  border: "1px solid #2a3040",
                  borderRadius: 6,
                  color: "#c9a84c",
                  fontSize: 12,
                  padding: "6px 14px",
                  cursor: "pointer",
                  fontFamily: "'Georgia', serif",
                }}
              >
                ↑ Show Contract
              </button>
            )}

            {/* Score Entry */}
            <div style={{ fontSize: 13, color: "#6b7a99", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>
              Enter Scores
            </div>
            {names.map((name, i) => (
              <div key={i} style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                marginBottom: 10,
                background: "#1a1f2e",
                border: "1px solid #2a3040",
                borderRadius: 10,
                padding: "10px 14px",
              }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 15, color: "#e8dfc8" }}>{name}</div>
                  <div style={{ fontSize: 12, color: "#6b7a99" }}>Total: {totalScore(i)}</div>
                </div>
                <input
                  type="number"
                  value={inputs[i]}
                  onChange={e => handleInputChange(i, e.target.value)}
                  placeholder="pts"
                  style={{
                    width: 72,
                    background: "#0f1117",
                    border: "1px solid #2a3040",
                    borderRadius: 6,
                    color: "#e8dfc8",
                    fontSize: 16,
                    padding: "8px 10px",
                    outline: "none",
                    textAlign: "center",
                    fontFamily: "'Georgia', serif",
                  }}
                />
              </div>
            ))}

            <button
              onClick={handleSubmitRound}
              style={{
                marginTop: 18,
                width: "100%",
                background: "linear-gradient(135deg, #c9a84c, #e8c96d)",
                color: "#0f1117",
                border: "none",
                borderRadius: 10,
                padding: "15px",
                fontSize: 16,
                fontWeight: "bold",
                cursor: "pointer",
                fontFamily: "'Georgia', serif",
              }}
            >
              {currentRound + 1 < CONTRACTS.length ? `Submit & Next Round →` : "Submit Final Round"}
            </button>

            {/* Scoreboard */}
            {scores[0].length > 0 && (
              <div style={{ marginTop: 32 }}>
                <div style={{ fontSize: 13, color: "#6b7a99", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>
                  Scoreboard
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left", color: "#6b7a99", padding: "6px 8px", borderBottom: "1px solid #2a3040" }}>Player</th>
                        {scores[0].map((_, r) => (
                          <th key={r} style={{ color: "#6b7a99", padding: "6px 8px", borderBottom: "1px solid #2a3040", textAlign: "center" }}>R{r + 1}</th>
                        ))}
                        <th style={{ color: "#c9a84c", padding: "6px 8px", borderBottom: "1px solid #2a3040", textAlign: "center" }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {names.map((name, i) => (
                        <tr key={i}>
                          <td style={{ padding: "8px 8px", color: "#e8dfc8", borderBottom: "1px solid #1a1f2e" }}>{name}</td>
                          {scores[i].map((s, r) => (
                            <td key={r} style={{ padding: "8px 8px", color: "#8891a8", textAlign: "center", borderBottom: "1px solid #1a1f2e" }}>{s}</td>
                          ))}
                          <td style={{ padding: "8px 8px", color: "#c9a84c", fontWeight: "bold", textAlign: "center", borderBottom: "1px solid #1a1f2e" }}>{totalScore(i)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ── END ── */}
        {phase === "end" && (
          <div>
            <div style={{ textAlign: "center", marginBottom: 28 }}>
              <div style={{ fontSize: 11, letterSpacing: 4, color: "#6b7a99", textTransform: "uppercase", marginBottom: 8 }}>Game Over</div>
              <div style={{ fontSize: 28, fontWeight: "bold", color: "#e8dfc8" }}>Final Results</div>
              <div style={{ fontSize: 13, color: "#6b7a99", marginTop: 4 }}>Lowest score wins</div>
            </div>

            {getRanking().map((p, rank) => (
              <div key={p.name} style={{
                display: "flex",
                alignItems: "center",
                gap: 14,
                background: rank === 0 ? "linear-gradient(135deg, #1e2535, #252c3f)" : "#1a1f2e",
                border: rank === 0 ? "1px solid #c9a84c88" : "1px solid #2a3040",
                borderRadius: 12,
                padding: "14px 18px",
                marginBottom: 10,
              }}>
                <div style={{ fontSize: rank === 0 ? 22 : 18, width: 36, textAlign: "center", color: rank === 0 ? "#c9a84c" : "#6b7a99" }}>
                  {rank === 0 ? "🏆" : `#${rank + 1}`}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 17, color: rank === 0 ? "#e8dfc8" : "#8891a8", fontWeight: rank === 0 ? "bold" : "normal" }}>
                    {p.name}
                  </div>
                </div>
                <div style={{ fontSize: 20, color: rank === 0 ? "#c9a84c" : "#6b7a99", fontWeight: "bold" }}>
                  {p.total}
                </div>
              </div>
            ))}

            <div style={{ marginTop: 28 }}>
              <div style={{ fontSize: 13, color: "#6b7a99", letterSpacing: 2, textTransform: "uppercase", marginBottom: 14 }}>
                Full Scoreboard
              </div>
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: "left", color: "#6b7a99", padding: "6px 8px", borderBottom: "1px solid #2a3040" }}>Player</th>
                      {CONTRACTS.map((_, r) => (
                        <th key={r} style={{ color: "#6b7a99", padding: "6px 8px", borderBottom: "1px solid #2a3040", textAlign: "center" }}>R{r + 1}</th>
                      ))}
                      <th style={{ color: "#c9a84c", padding: "6px 8px", borderBottom: "1px solid #2a3040", textAlign: "center" }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {names.map((name, i) => (
                      <tr key={i}>
                        <td style={{ padding: "8px 8px", color: "#e8dfc8", borderBottom: "1px solid #1a1f2e" }}>{name}</td>
                        {scores[i].map((s, r) => (
                          <td key={r} style={{ padding: "8px 8px", color: "#8891a8", textAlign: "center", borderBottom: "1px solid #1a1f2e" }}>{s}</td>
                        ))}
                        <td style={{ padding: "8px 8px", color: "#c9a84c", fontWeight: "bold", textAlign: "center", borderBottom: "1px solid #1a1f2e" }}>{totalScore(i)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <button
              onClick={handleRestart}
              style={{
                marginTop: 24,
                width: "100%",
                background: "linear-gradient(135deg, #c9a84c, #e8c96d)",
                color: "#0f1117",
                border: "none",
                borderRadius: 10,
                padding: "15px",
                fontSize: 16,
                fontWeight: "bold",
                cursor: "pointer",
                fontFamily: "'Georgia', serif",
              }}
            >
              Play Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
