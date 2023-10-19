const express = require('express');
const { getPosts, createPosts, updatePost, deletePost, likePost } = require('../controllers/posts.js');
const auth = require("../middleware/auth.js");
const router = express.Router();

router.get('/', getPosts);
router.post('/',auth,  createPosts);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

module.exports = router;
