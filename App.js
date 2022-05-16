import React, { useState, useEffect } from 'react';
import Die from './Die';
import { nanoid } from 'nanoid';
import useWindowSize from 'react-use/lib/useWindowSize';
import Confetti from 'react-confetti';

export default function App() {
  const [dice, setDice] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false);
  const [rolls, setRolls] = useState(1);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
    }
  }, [dice]);

  useEffect(() => {
    let timer;
    timer = setInterval(() => {
      setTime((time) => time + 1);
    }, 1000);
    if (tenzies) {
      clearInterval(timer);
      setTime(0);
    }
    setTime(timer);

    return () => clearInterval(timer);
  }, [tenzies]);

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
    if (!tenzies) {
      setRolls((rolls) => rolls + 1);
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
    } else {
      setTenzies(false);
      setDice(allNewDice());
      setRolls(1);
    }
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

  const { width, height } = useWindowSize();

  return (
    <main>
      {tenzies && <Confetti width={width} height={height} />}
      <h1 className="title">{tenzies ? 'YOU WON!' : 'Tenzies'}</h1>
      <p className="instructions">
        {tenzies
          ? ''
          : "Roll until all dice are the same. Click each die to freeze it at it's current value between rolls."}
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice}>
        {tenzies ? 'New Game' : 'Roll'}
      </button>
      <p>Number of rolls: {rolls}</p>
      <p>{time}</p>
    </main>
  );
}
