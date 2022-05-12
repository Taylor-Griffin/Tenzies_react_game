import React from 'react';
import Die from './Die';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
      });
    }
    return newDice;
  }

  const diceElements = dice.map(({ value, isHeld }) => (
    <Die value={value} isHeld={isHeld} />
  ));

  return (
    <main>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={() => setDice(allNewDice())}>
        Roll Dice
      </button>
    </main>
  );
}
