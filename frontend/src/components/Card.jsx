
import React, { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

export default function Card({ card, name, link, likes, onCardClick, onLikeClick, onDeleteCard }) {
    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner === currentUser._id;
    const isLiked = card.likes.some(i => i === currentUser._id);

    const cardLikeButtonClassName = (
        `card__icon ${isLiked ? 'card__icon_active' : ''}`)


    function handleCardClick() {
        onCardClick(card);
    };

    function handleLikeClick() {
        onLikeClick(card);
    }
    function handleDeleteCard() {
        onDeleteCard(card);
    }
    return (
        <>
            {isOwn && <button type="button" className="card__trash" onClick={handleDeleteCard} />}
            <img className="card__image" src={link} alt={name} onClick={handleCardClick} />
            <div className="card__caption">
                <h2 className="card__title">{name}</h2>
                <div className="card__like">
                    <button type="button" className={cardLikeButtonClassName} aria-label="Иконка-сердечко"
                        title="Добавить в избранное" onClick={handleLikeClick}></button>
                    <span className="card__like-counter">{likes}</span>
                </div>
            </div>
        </>
    )
}
