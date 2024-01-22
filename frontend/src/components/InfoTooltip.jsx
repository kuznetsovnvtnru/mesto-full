import React from 'react'

export default function InfoTooltip({ isOpen, onClose, title, image }) {
    const popupOpenModificatorClass = `${isOpen ? 'popup_opened' : ' '}`;
    return (
        <div className={`popup ${popupOpenModificatorClass}`}>
            <div className="popup__container">
                <button type="button"
                    className="popup__close"
                    onClick={onClose}></button>
                <div className="popup__tooltip">
                    <img src={image} alt={image} className='popup__tooltip-img' />
                    <h2 className="popup__title">{`${title}`}</h2>
                </div>

            </div>
        </div>
    )
}
