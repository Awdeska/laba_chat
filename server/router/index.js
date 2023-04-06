const userController = require('../controllers/user-controller');
const chatController = require('../controllers/chat-controller');
const Router = require('express').Router;

const router = new Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/messages', chatController.addMessage);
router.get('/refresh', userController.refresh);
router.get('/messages', chatController.getMessages);


module.exports = router;