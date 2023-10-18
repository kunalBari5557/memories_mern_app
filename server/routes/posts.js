const express = require('express');
const { getPosts, createPosts, updatePost, deletePost, likePost } = require('../controllers/posts.js');

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPosts);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

module.exports = router;
