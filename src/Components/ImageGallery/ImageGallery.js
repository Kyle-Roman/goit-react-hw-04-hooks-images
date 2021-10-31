import React, { useState } from "react";
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Modal from "../Modal/Modal";

import s from './ImageGallery.module.css';

export default function ImageGallery({images}) {
    const [modalStatus, setModalStatus] = useState(false);
    const [largeImageURL, setLargeImageURL] = useState("");
    const [tags, setTags] = useState("");

    const showModal = (modalStatus) => {
        setModalStatus(!modalStatus);
    };

    const handleImgClick = (largeImageURL, tags) => {
        setLargeImageURL(largeImageURL);
        setTags(tags)
        showModal();
    };

    return (
        <div className={s.listContainer}>
            <ul className={s.ImageGallery}>
                {images.map((image) => (
                <ImageGalleryItem
                  key={image.id}  
                  id={image.id}
                  url={image.webformatURL}
                  alt={image.tags}               
                  largeUrl={image.largeImageURL}
                onClick={() => { handleImgClick(image.largeImageURL, image.tags) }}
                />
                ))}                
            </ul>
            <div>
                {modalStatus && <Modal onClick={showModal} url={largeImageURL} alt={tags} />}
            </div>           
        </div>)
}