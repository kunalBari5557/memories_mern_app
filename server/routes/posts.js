const express = require('express');
const { getPosts,getPost, createPosts, updatePost, deletePost, likePost, commentPost, getPostsBySearch } = require('../controllers/posts.js');
const auth = require("../middleware/auth.js");
const router = express.Router();

router.get('/search', getPostsBySearch);
router.get('/', getPosts);
router.get('/:id', getPost);

router.post('/', auth,  createPosts);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);
router.post('/:id/commentPost', auth, commentPost);

module.exports = router;
