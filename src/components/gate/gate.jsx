import React from 'react';
import { Link } from 'react-router-dom';

export default function Gate({
  type,
  handler,
}){

  const isPaused = type === 'paused';
  const isNew = type === 'new';
  const isCancelled = type === 'canceled';

  const generateCopy = () => {
    switch (true){
      case isPaused: return "Tournament is currently paused";
      case isNew: return "Let's get this tournament started!";
      case isCancelled: return "Tournament is cancelled.";
      default: // do nothing
    }
  }
  return(
    <div className="tournament-details__modal">
      <h2 className="tournament-details__copy">
        {generateCopy()}
      </h2>
      {!isCancelled 
        ? (
            <button className="tournament-details__cta" onClick={handler}>{isNew ? 'START' : 'RESUME'}</button>
          )
        : (
            <Link className="tournament-details__cta" to='/'>BACK</Link>
          ) 
      }
    </div>
  );
}