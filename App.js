import React from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid(),
      });
    }
    return newDice;
  }
  function holdDice(id) {
    console.log(id);
  }

  const diceElements = dice.map(({ value, isHeld, id }) => (
    <Die key={id} id={id} value={value} isHeld={isHeld} holdDice={holdDice} />
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
