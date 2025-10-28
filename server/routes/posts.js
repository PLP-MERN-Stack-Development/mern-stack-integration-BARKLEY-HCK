const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { upload } = require('../utils/upload');
const postController = require('../controllers/postController');

router.get('/', postController.getPosts);
router.post('/', auth, upload.single('image'), postController.createPost);
router.get('/:postId', postController.getPost);
router.put('/:postId', auth, upload.single('image'), postController.updatePost);
router.delete('/:postId', auth, postController.deletePost);

module.exports = router;
