const router = require('express').Router();

const { getUserInfo, updateProfile } = require('../controllers/users');

/* const {
  validationUpdateAvatar, validationUpdateProfile, validationUserId,
} = require('../middlewares/validation'); */

router.get('/users/me', getUserInfo);
router.patch('/users/me', updateProfile);

module.exports = router;
