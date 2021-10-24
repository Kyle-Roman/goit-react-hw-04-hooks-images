import React from "react";
import s from './Modal.module.css'

export default function Modal({ url, alt, onClick }) {
       return (
      <div className={s.Overlay} onClick={onClick}>
        <div className={s.Modal}>
          <img src={url} alt={alt} />
        </div>
      </div>
     )
};