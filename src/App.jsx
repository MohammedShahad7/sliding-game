import React, { useState, useEffect } from "react";

const size = 3;

const createBoard = () => {
  const arr = [...Array(size * size).keys()];
  return arr;
};

const shuffleBoard = (board) => {
  let newBoard = [...board];
  for (let i = newBoard.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newBoard[i], newBoard[j]] = [newBoard[j], newBoard[i]];
  }
  return newBoard;
};

export default function App() {
  const [board, setBoard] = useState(createBoard());
  const [moves, setMoves] = useState(0);
  const [won, setWon] = useState(false);

  useEffect(() => {
    setBoard(shuffleBoard(createBoard()));
  }, []);

  const isAdjacent = (i, j) => {
    const x1 = Math.floor(i / size);
    const y1 = i % size;
    const x2 = Math.floor(j / size);
    const y2 = j % size;
    return Math.abs(x1 - x2) + Math.abs(y1 - y2) === 1;
  };

  const handleClick = (index) => {
    const emptyIndex = board.indexOf(0);
    if (isAdjacent(index, emptyIndex)) {
      const newBoard = [...board];
      [newBoard[index], newBoard[emptyIndex]] = [
        newBoard[emptyIndex],
        newBoard[index],
      ];
      setBoard(newBoard);
      setMoves(moves + 1);

      if (checkWin(newBoard)) {
        setWon(true);
      }
    }
  };

  const checkWin = (b) => {
    for (let i = 0; i < b.length - 1; i++) {
      if (b[i] !== i + 1) return false;
    }
    return true;
  };

  const restart = () => {
    setBoard(shuffleBoard(createBoard()));
    setMoves(0);
    setWon(false);
  };

  return (
    <div className="container">
      <h1>🧩 Sliding Puzzle</h1>

      <div className="stats">
        <span>Moves: {moves}</span>
      </div>

      <div className="grid">
        {board.map((num, index) => (
          <div
            key={index}
            className={`tile ${num === 0 ? "empty" : ""}`}
            onClick={() => handleClick(index)}
          >
            {num !== 0 && num}
          </div>
        ))}
      </div>

      {won && <h2>🎉 You Win!</h2>}

      <button onClick={restart}>Restart</button>
    </div>
  );
}