
const { Router } = require('express');
const PostController = require('../../controllers/post.controller');

const router = new Router;

router.get('/user/jwt', PostController.getByUserToken);
router.get('/user/:userId', PostController.getByUserId);
router.get('/:id', PostController.getById);
router.post('/', PostController.create);
router.put('/', PostController.update);
router.delete('/', PostController.delete);

module.exports = router;