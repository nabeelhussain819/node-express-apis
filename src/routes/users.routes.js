const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/', userController.getUsers);
router.post('/',  userController.createUser);
router.put('/:userId',  userController.updateUser);

module.exports = router;

