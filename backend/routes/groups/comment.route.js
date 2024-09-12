
const { Router } = require('express');
const CommitController = require('../../controllers/comment.controller');

const router = new Router;

router.get('/:postId', CommitController.getByPostId);
router.post('/', CommitController.create);
router.put('/', CommitController.update);
router.delete('/', CommitController.delete);

module.exports = router;