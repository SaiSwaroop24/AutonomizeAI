const express = require('express');
const axios = require('axios');
const { User } = require('./models');

const router = express.Router();

// Save GitHub User Details
router.post('/user', async (req, res) => {
    const { username } = req.body;
    const existingUser = await User.findOne({ where: { username } });

    if (existingUser) return res.status(200).json(existingUser);

    try {
        const { data } = await axios.get(`https://api.github.com/users/${username}`);
        const newUser = await User.create({
            username: data.login,
            name: data.name,
            location: data.location,
            blog: data.blog,
            bio: data.bio,
            public_repos: data.public_repos,
            public_gists: data.public_gists,
            followers: data.followers,
            following: data.following,
            avatar_url: data.avatar_url,
            created_at: data.created_at,
        });
        res.status(201).json(newUser);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Update User Details
router.put('/user/:username', async (req, res) => {
    const { username } = req.params;
    const updatedFields = req.body;

    const updatedUser = await User.update(updatedFields, { where: { username } });
    res.status(200).json(updatedUser);
});

// Soft Delete User
router.delete('/user/:username', async (req, res) => {
    const { username } = req.params;

    await User.destroy({ where: { username } });
    res.status(200).json({ message: 'User deleted' });
});

// Search Users
router.get('/search', async (req, res) => {
    const { username, location } = req.query;

    const users = await User.findAll({
        where: { 
            username: username || undefined,
            location: location || undefined,
        },
    });
    res.status(200).json(users);
});

// Get Sorted Users
router.get('/users/sorted', async (req, res) => {
    const { field } = req.query;

    const users = await User.findAll({ order: [[field, 'ASC']] });
    res.status(200).json(users);
});

module.exports = router;
