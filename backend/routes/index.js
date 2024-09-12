
const { Router } = require('express');
const userRouter = require('./groups/user.route');
const postRouter = require('./groups/post.route');
const commentRouter = require('./groups/comment.route');
const likeRouter = require('./groups/like.route');
const authRouter = require('./groups/auth.route');
const messageRouter = require('./groups/message.route');

const router = new Router;

router.use('/user', userRouter);
router.use('/post', postRouter);
router.use('/comment', commentRouter);
router.use('/like', likeRouter);
router.use('/auth', authRouter);
router.use('/message', messageRouter);

module.exports = router;