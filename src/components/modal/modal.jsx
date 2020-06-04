import React from 'react';
import './modal.scss';

export default function Modal({ children, updateModalState }){
  return(
    <div className="modal" onClick={(e)=>updateModalState(e, false)}>
      <div className="modal__content">
        { children }
      </div>
    </div>
  );
}