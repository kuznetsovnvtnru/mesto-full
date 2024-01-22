import React, { useEffect, useState } from 'react';
import PopupWithForm from "./PopupWithForm";
import Input from "./Input";

export default function AddPlacePopup({ isOpen, onClose, onAddPlace }) {
    const [place, setPlace] = useState('');
    const [link, setLink] = useState('');

    function handlePlaceChange(evt) {
        setPlace(evt.target.value);
    }

    function handleLinkChange(evt) {
        setLink(evt.target.value)
    }

    const handleAddPlaceSubmit = (evt) => {
        evt.preventDefault();
        onAddPlace({
            name: place,
            link
        });
    }
    useEffect(() => {
        setPlace('');
        setLink('')
    }, [isOpen])
    return (
        <PopupWithForm //попап Новое место
            title="Новое место"
            name="new-card"
            isOpen={isOpen}
            onClose={onClose}
            onAddPlace={onAddPlace}
            onSubmit={handleAddPlaceSubmit}
            button="Сохранить"
        >
            <Input
                value={place}
                onChange={handlePlaceChange}
                type="text"
                placeholder="Название"
                name="name"
                id="place"
                className="type_place">
            </Input>
            <Input
                value={link}
                onChange={handleLinkChange}
                type="url"
                placeholder="Ссылка на картинку"
                name="link"
                id="link"
                className="type_link"
                children=" ">
            </Input>
        </PopupWithForm>
    )
}
