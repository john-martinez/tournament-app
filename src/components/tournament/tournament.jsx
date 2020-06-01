import React from 'react';
import './tournament.scss';

export default function tournament({ data }){
  const {
    createdDate,
    name, 
    players,
    status,
    type,
    winner,
    _id,
  } = data;

  const reformatDate = (dateString) => {
    // format is <DATE>T<TIME>Z
    const TIME_END_INDEX = 5;
    const splitDate = dateString.split('T');
    let date = splitDate[0];
    let time = splitDate[1].substr(0,splitDate[1].length - TIME_END_INDEX);
    console.log(date)
    console.log(time);
    return `${date}`
  }

  const reformatType = (type) => type.replace("_", " ");
 return (
  <div className="tournament" id={_id}>
    <div className="tournament__row">
      <div>
        <h2 className="tournament__header">{name}</h2>
        <span className="tournament__type">{ reformatType(type) }</span>
        <p className="tournament__date">{ reformatDate(createdDate) }</p>
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
  </div>
 );
}