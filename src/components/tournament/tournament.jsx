import React from 'react';
import { Link } from 'react-router-dom'
import './tournament.scss';

export default function tournament({ data }){
  const {
    createdDate,
    name, 
    status,
    type,
    winner,
    _id,
  } = data;

  const reformatDate = (dateString) => {
    // format is <DATE>T<TIME>Z
    const splitDate = dateString.split('T');
    let date = splitDate[0];
    return `${date}`
  }

  const reformatType = (type) => type.replace("_", " ");

  return (
    <Link 
      className="tournament" 
      id={_id}
      to={`tournaments/${_id}`}
    >
      <div className="tournament__row">
        <div>
          <h2 className="tournament__header">{name}</h2>
          <span className="tournament__type">{reformatType(type)}</span>
          <p className="tournament__date">{reformatDate(createdDate)}</p>
          <span className="tournament__status">{status}</span>
        </div>

        <div>
          {status === 'completed' && 
            <p>
              <span> Winner: </span> {winner}
            </p>
          }
        </div>
      </div>
    </Link>
  );
}