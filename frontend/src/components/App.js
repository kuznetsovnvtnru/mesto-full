import { useEffect, useState } from "react";
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup from './ImagePopup';
import api from '../utils/Api';
import { apiAuth } from "../utils/AuthApi";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import AddPlacePopup from "./AddPlacePopup";
import Login from "./Login";
import Register from "./Register";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import InfoTooltip from "./InfoTooltip";
import ProtectedRouteElement from './ProtectedRoute';
import fail from '../image/fail-icon.svg';
import success from '../image/success-icon.svg';

function App() {
    const [cards, setCards] = useState([]);
    const [currentUser, setCurrentUser] = useState({});
    const [selectedCard, setSelectedCard] = useState({});
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [isInfoTooltip, setIsInfoTooltip] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [email, setEmail] = useState('');
    const [infoImage, setInfoImage] = useState('');
    const [infoTitle, setInfoTitle] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const jwt = localStorage.getItem("jwt");
        if (jwt) {
            apiAuth.checkToken(jwt).then((res) => {
                if (res) {
                    setLoggedIn(true);
                    setEmail(res.email);
                }
            }).catch((err) => {
                console.error(err);
            });
        }
    }, []);

    useEffect(() => {
        if (loggedIn === true) {
            navigate("/");
        }
    }, [loggedIn, navigate]);

    useEffect(() => {
        if (loggedIn === true) {
            Promise.all([api.getUserInfo(), api.getCards()])
                .then(([profileData, cardData]) => {
                    setCurrentUser(profileData);
                    setCards(cardData);
                })
                .catch((err) => {
                    console.log(err);
                })
        }
    }, [loggedIn])

    const handleCardClick = function (card) {
        setSelectedCard(card);
    }

    function handleCardLike(card) {
        const isLiked = card.likes.some(i => i === currentUser._id);
        api.changeLike(card._id, isLiked)
            .then((newCard) => {
                setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
            })
            .catch((err) => {
                console.log(err);
            });
    }

    function handleCardDelete(card) {
        api.deleteCard(card._id)
            .then(() => {
                setCards((state) => state.filter((item) => item._id !== card._id))
            })
            .catch((err) => {
                console.log(err);
            })
    }

    function handleUpdateUser(data) {
        api.editUserInfo(data)
            .then((profileData) => {
                setCurrentUser(profileData);
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleUpdateAvatar(data) {
        api.editAvatar(data)
            .then((data) => {
                setCurrentUser(data);
                closeAllPopups()
            })
            .catch((err) => {
                console.log(err);
            });
    }
    function handleAddPlace(card) {
        api.addCard(card)
            .then((newCard) => {
                setCards([newCard, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err);
            });
    }


    //открытие попапа Редактирование профиля
    const handleEditProfileClick = function () {
        setIsEditProfilePopupOpen(true);
    }

    //открытие попапа Редактирование профиля
    const handleAddPlaceClick = function () {
        setIsAddPlacePopupOpen(true);
    }
    //открытие попапа Редактирование аватара
    const handleEditAvatarClick = function () {
        setIsEditAvatarPopupOpen(true);
    }
    //закрытие попапа Редактирование профиля
    const closeAllPopups = function () {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard(false);
        setIsInfoTooltip(false)
    }
    function handleInfoTooltip() {
        setIsInfoTooltip(true)
    }
    function handleRegister(email, password) {
        apiAuth.signup({ email, password })
            .then((res) => {
                setEmail(res.email);
                setIsInfoTooltip(true)
                setInfoImage(success);
                setInfoTitle("Вы успешно зарегистрировались!");
                navigate("/sign-in")
            })
            .catch(err => {
                console.log(err);
                handleInfoTooltip(false);
                setInfoImage(fail);
                setInfoTitle("Что-то пошло не так! Попробуйте еще раз.")
            })
    }

    function handleLogin(email, password) {
        apiAuth.signin({ email, password }).then((res) => {
            localStorage.setItem("jwt", res.token);
            setLoggedIn(true);
            setEmail(email);
            navigate("/");
        }).catch((err) => {
            console.log(err);
            setInfoImage(fail);
            setInfoTitle("Что-то пошло не так! Попробуйте ещё раз.")
            handleInfoTooltip();
        });
    }
    function onSignOut() {
        localStorage.removeItem('jwt');
        setEmail(null)
        setLoggedIn(false);
    }
    return (
        <div className="content">
            <div className="page">
                <CurrentUserContext.Provider value={currentUser}>
                    <Routes>
                        <Route path='/sign-in' element={
                            <Login onLogin={handleLogin} loggedIn={loggedIn} />
                        }
                        />
                        <Route path='/sign-up' element={
                            <Register onRegister={handleRegister} loggedIn={loggedIn} />
                        }
                        />

                        <Route exact path='/' element={
                            <>

                                <Header
                                    loggedIn={loggedIn}
                                    email={email}
                                    onSignOut={onSignOut} />
                                <ProtectedRouteElement
                                    element={Main}
                                    loggedIn={loggedIn}
                                    onEditProfile={handleEditProfileClick}
                                    onAddPlace={handleAddPlaceClick}
                                    onEditAvatar={handleEditAvatarClick}
                                    cards={cards}
                                    onCardClick={handleCardClick}
                                    onLikeClick={handleCardLike}
                                    onDeleteCard={handleCardDelete}
                                />
                            </>

                        } />

                        <Route path="*" element={<Navigate to={loggedIn ? "/" : "/sign-in"} />} />

                    </Routes>

                    <Footer />
                    <InfoTooltip
                        isOpen={isInfoTooltip}
                        onClose={closeAllPopups}
                        image={infoImage}
                        title={infoTitle}
                    />
                    <EditProfilePopup
                        isOpen={isEditProfilePopupOpen}
                        onClose={closeAllPopups}
                        onUpdateUser={handleUpdateUser} />

                    <AddPlacePopup
                        isOpen={isAddPlacePopupOpen}
                        onClose={closeAllPopups}
                        onAddPlace={handleAddPlace}
                    />

                    <EditAvatarPopup
                        isOpen={isEditAvatarPopupOpen}
                        onClose={closeAllPopups}
                        onUpdateAvatar={handleUpdateAvatar} />

                    <ImagePopup
                        card={selectedCard}
                        onClose={closeAllPopups}
                    />
                </CurrentUserContext.Provider>
            </div>
        </div >
    );
}

export default App;
