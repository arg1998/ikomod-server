//TODO: refactor this file and move the route controllers to its dedicated folder

const router = require('express').Router();
const userController = require('../controllers/User.controller');

const { userSignUpValidator } = require('../validators/user.validator');

router.get('/:object_id', userController.getUser);

router.post('/signup', userSignUpValidator, userController.signUp);

module.exports = router;
