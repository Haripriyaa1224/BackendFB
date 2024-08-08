// controllers/postController.js
import Post from '../models/Post.js';
import User from '../models/User.js';

// Create a new post
export const createPost = async (req, res) => {
    try {
        const { userId, text } = req.body;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const newPost = new Post({ text, userId });
        await newPost.save();

        res.status(201).json({ success: true, post: newPost });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Add a comment to a post
export const addComment = async (req, res) => {
    try {
        const { postId, userId, text } = req.body;

        // Find the post by ID
        const post = await Post.findById(postId);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Find the user by ID
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Create a new comment
        const comment = { text, userId };

        // Push the comment into the post's comments array
        post.comments.push(comment);

        // Save the post with the new comment
        await post.save();

        res.status(201).json({ success: true, post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getFriendsPosts = async (req, res) => {
    try {
        const { userId } = req.params;

        // Find the user by ID
        const user = await User.findById(userId).populate('friends', '_id');
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Extract friend IDs
        const friendIds = user.friends.map(friend => friend._id);

        // Find posts created by the user's friends
        const friendsPosts = await Post.find({ userId: { $in: friendIds } }).sort({ createdAt: -1 });

        res.status(200).json({ success: true, posts: friendsPosts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};