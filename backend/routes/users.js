const router = require('express').Router();
const celebrates = require('../middlewares/celebrates');
const {
  getUsers, getUserById, updateUser, updateAvatar, getCurrentUser,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getCurrentUser);
router.get('/:userId', celebrates.ValidateUserId, getUserById);
router.patch('/me', celebrates.ValidateUpdateUser, updateUser);
router.patch('/me/avatar', celebrates.ValidateUpdateAvatar, updateAvatar);

module.exports = router;
