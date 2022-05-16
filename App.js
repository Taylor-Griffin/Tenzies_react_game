import React, { useState, useEffect } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  function getRandomNumber() {
    return Math.ceil(Math.random() * 6);
  }
  function generateNewDie() {
    return {
      value: getRandomNumber(),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
  function rollDice() {
    setDice((oldDice) =>
      tenzies
        ? allNewDice()
        : oldDice.map((die) => {
            return die.isHeld ? die : generateNewDie();
          })
    );
  }
  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return id === die.id
          ? { value: die.value, id: die.id, isHeld: !die.isHeld }
          : die;
      })
    );
  }

  const diceElements = dice.map(({ value, isHeld, id }) => (
    <Die key={id} id={id} value={value} isHeld={isHeld} holdDice={holdDice} />
  ));

  return (
    <main>
      <h1 className="title">Tenzies</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? 'Reset' : 'Roll'}
      </button>
    </main>
  );
}
