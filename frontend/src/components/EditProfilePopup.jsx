import PopupWithForm from "./PopupWithForm";
import Input from "./Input";
import { React, useState, useEffect, useContext } from 'react';
import { CurrentUserContext } from "../contexts/CurrentUserContext";

export default function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    
    function handleNameChange(e) {
        setName(e.target.value)
    }
    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }
    useEffect(() => {
        setName(currentUser?.name);
        setDescription(currentUser?.about);
    }, [currentUser, isOpen]);

    function handleSubmit(e) {
        e.preventDefault();
        onUpdateUser({
            name,
            about: description,
        });
    }

    return (
        <PopupWithForm //попап редактирования профиля
            title="Редактировать профиль"
            name="edit-profile"
            isOpen={isOpen}
            onClose={onClose}
            button="Сохранить"
            onSubmit={handleSubmit}
        >
            <Input
                type="text"
                placeholder="Имя"
                name="name"
                id="name"
                className="type_name"
                value={name||""}
                onChange={handleNameChange}
            >
            </Input>
            <Input
                type="text"
                placeholder="О себе"
                name="about"
                id="about"
                className="type_about"
                value={description||""}
                onChange={handleDescriptionChange}
            >
            </Input>
        </PopupWithForm>

    )
}
