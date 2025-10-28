const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentController = require('../controllers/commentController');

// Note: mounted at /api/posts
router.post('/:postId/comments', auth, commentController.createComment);
router.get('/:postId/comments', commentController.getComments);

module.exports = router;
