
const { Router } = require('express');
const LikeController = require('../../controllers/like.controller');

const router = new Router;

router.get('/:postId', LikeController.getByPostId);
router.post('/', LikeController.create);
router.delete('/', LikeController.delete);

module.exports = router;