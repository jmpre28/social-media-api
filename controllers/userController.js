const { User } = require('../models');

module.exports = {
// Finds all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find();

            res.status(200).json(users);
        } catch (err) {
            res.status(500).json(err);
        }
    },

// Finds a single user by ID
    async getSingleUser(req, res) {
        try {
            const user = await User.findOne({ _id: req.params.id }).select('-__v');
            if(!user) {
                res.status(404).json({ message: 'User does not exist' });
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

// Creates a new user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);

            res.status(200).json(newUser);
        } catch (err) {
            res.status(500).json(err);
        }
    },

// Updates a user by ID
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true }
            )
            if(!user) {
                res.status(404).json({ message: 'User does not exist' });
            }
            
            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    },

// Deletes a user by ID
    async deleteUser(req, res) {
        try {
            const user = User.findOneAndDelete({ _id: req.params.id });
            if(!user) {
                res.status(404).json({ message: 'User does not exist' });
            }

            res.status(200).json(user);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};