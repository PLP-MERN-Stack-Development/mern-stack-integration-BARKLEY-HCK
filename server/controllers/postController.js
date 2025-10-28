const Post = require('../models/Post');
const { uploadToCloudinary } = require('../utils/upload');

exports.createPost = async (req, res) => {
  try {
    const { title, body, tags } = req.body;
    let imageUrl;

    // If there's an uploaded file on req.file, upload to cloudinary
    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'posts');
      imageUrl = result.secure_url;
    }

    const post = new Post({
      title,
      body,
      author: req.user._id,
      image: imageUrl,
      tags: tags ? tags.split(',').map(t => t.trim()) : []
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error in createPost' });
  }
};

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'name email')
      .sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error in getPosts' });
  }
};

exports.getPost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId).populate('author', 'name email');
    if (!post) return res.status(404).json({ message: 'Post not found' });
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error in getPost' });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (!post.author.equals(req.user._id)) return res.status(403).json({ message: 'Not authorized' });

    const { title, body, tags } = req.body;
    if (title) post.title = title;
    if (body) post.body = body;
    if (tags) post.tags = tags.split(',').map(t => t.trim());

    if (req.file) {
      const result = await uploadToCloudinary(req.file.buffer, 'posts');
      post.image = result.secure_url;
    }

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error in updatePost' });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (!post.author.equals(req.user._id)) return res.status(403).json({ message: 'Not authorized' });

    await post.remove();
    res.json({ message: 'Post deleted' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error in deletePost' });
  }
};
