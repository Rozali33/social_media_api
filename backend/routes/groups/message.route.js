
const { Router } = require('express');
const MessageController = require('../../controllers/message.controller');

const router = new Router;

router.post('/:userFromId/:userToId', MessageController.getByUsers);
router.post('/', MessageController.create);

module.exports = router;