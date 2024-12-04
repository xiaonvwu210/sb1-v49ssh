import React, { useState } from 'react';
import { StartScreen } from './components/StartScreen';
import { GameBoard } from './components/GameBoard';

function App() {
  const [gameStarted, setGameStarted] = useState(false);

  return (
    <div className="App">
      {!gameStarted ? (
        <StartScreen onStart={() => setGameStarted(true)} />
      ) : (
        <GameBoard />
      )}
    </div>
  );
}

export default App;