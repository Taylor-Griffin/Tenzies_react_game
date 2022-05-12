import React from 'react';

export default function Die({ isHeld, value, holdDice, id }) {
  return (
    <div
      className={isHeld ? 'die-face--held die-face' : 'die-face'}
      onClick={() => holdDice(id)}
    >
      <h2 className="die-num">{value}</h2>
    </div>
  );
}
