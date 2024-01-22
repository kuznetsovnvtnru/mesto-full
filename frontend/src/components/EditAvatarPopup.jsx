import React, { useRef, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import Input from './Input';


export default function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const inputRef = useRef();
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
            avatar: inputRef.current.value
        });
    }
    useEffect(() => {
        inputRef.current.value = "";
    }, [isOpen]);
    return (
        <PopupWithForm
            title="Обновить аватар"
            name="update-avatar"
            isOpen={isOpen}
            onClose={onClose}
            button="Да"
            onSubmit={handleSubmit}
        >
            <Input
                ref={inputRef}
                type="url"
                placeholder="Ссылка на новый аватар"
                name="avatar"
                id="avatar"
                className="type_avatar"
                children=" "
            />

        </PopupWithForm>
    )
}
