const router = require('express').Router();

const { getUserInfo, updateProfile } = require('../controllers/users');

const { validationUpdateProfile } = require('../middlewares/validation');

router.get('/me', getUserInfo);
router.patch('/me', validationUpdateProfile, updateProfile);

module.exports = router;
