import { createRoot } from "react-dom/client";
import { StrictMode, useState, useEffect } from "react";

function App() {
  const wins = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 4, 7],
  ];

  const initalGameState = {
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
    6: null,
    7: null,
    8: null,
    9: null,
  };

  const [gameState, setGameState] = useState(initalGameState);

  const [activePlayer, setActivePlayer] = useState("x");

  const [gameover, setGameover] = useState(false);

  useEffect(() => {
    checkWin();
  }, [gameState]);

  const checkWin = () => {
    const player = activePlayer === "x" ? "o" : "x";
    wins.map((win) => {
      let i = 0;
      win.map((square) => {
        if (gameState[square] !== player) return;
        i++;
        if (i === 3) {
          setGameover(true);
        }
      });
    });
  };

  const handleClick = (event) => {
    if (gameState[event.target.id] !== null) return;
    const newGameState = gameState;
    newGameState[event.target.id] = activePlayer;
    setGameState({ ...gameState, newGameState });
    setActivePlayer(activePlayer === "x" ? "o" : "x");
  };

  const restart = () => {
    setGameState(initalGameState);
    setActivePlayer("x");
    setGameover(false);
  };

  const getIcon = (id) => {
    return (
      <i className="material-icons">
        {gameState[id] === "x" ? <i className="material-icons">close</i> : null}
        {gameState[id] === "o" ? (
          <i className="material-icons">circle</i>
        ) : null}
      </i>
    );
  };

  return (
    <>
      {gameover ? (
        <div>Player {activePlayer === "x" ? "o" : "x"} wins!</div>
      ) : null}
      <div className="game">
        {Object.entries(initalGameState).map((value, i) => (
          <div id={i + 1} key={i} onClick={handleClick}>
            <i className="material-icons">{getIcon(i + 1)}</i>
          </div>
        ))}
      </div>
      <button onClick={restart}>Restart</button>
    </>
  );
}

const root = createRoot(document.getElementById("root"));

root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
