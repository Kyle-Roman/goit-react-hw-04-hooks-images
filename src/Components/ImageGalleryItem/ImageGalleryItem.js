import React from "react";
import s from './ImageGalleryItem.module.css'

export default function ImageGalleryItem({ id, url, alt, onClick }) {
    return (
        <li id={id} className={s.ImageGalleryItem} onClick={onClick}>
            <img src={url} alt={alt} className={s.ImageGalleryItem_image} />
        </li>
    )   
}