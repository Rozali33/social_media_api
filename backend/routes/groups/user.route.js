
const { Router } = require('express');
const UserController = require('../../controllers/user.controller');
const authMiddleware = require('../../middleware/auth');

const router = new Router;

router.get('/short/jwt', authMiddleware, UserController.getShortUserByToken);
router.get('/jwt', authMiddleware, UserController.getByToken);
router.get('/', UserController.getAll);
router.get('/short', UserController.getShortUser);
router.get('/:id', UserController.getById);
router.post('/', UserController.create);
router.put('/', UserController.update);
router.delete('/', UserController.delete);

module.exports = router;