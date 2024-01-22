import React from 'react'

export default function ImagePopup({ card, onClose }) {
  const popupOpenModificatorClass = `${Object.keys(card).length !== 0 ? "popup_opened" : ""}`;
  const srcImage = card.link;
  const altImage = card.name;
  return (
    <div className={`popup popup_type_image ${popupOpenModificatorClass}`}>
      <div className="popup__img">
        <button type="button" className="popup__close popup__close_type_image" onClick={onClose}></button>
        <figure>
          <img className="popup__image" src={srcImage} alt={altImage} />
          <figcaption className="popup__image-caption">{altImage}</figcaption>
        </figure>
      </div>
    </div>
  )
}
