const { User } = require('../models');

module.exports = {
// Finds all users
    async getAllUsers(req, res) {
        try {
            const users = await User.find().select('-__v');
            console.log(users);
            
            res.status(200).json(users);
        } catch (err) {
            console.error(err);
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
            console.log(user)

            res.status(200).json(user);
        } catch (err) {
            console.error(err);
            res.status(500).json(err);
        }
    },

// Creates a new user
    async createUser(req, res) {
        try {
            const newUser = await User.create(req.body);
            console.log(newUser);

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
            const user = await User.findOneAndDelete({ _id: req.params.id });
            if(!user) {
                res.status(404).json({ message: 'User does not exist' });
            }

            res.status(200).json(user);
            console.log('User has been successfully deleted.')
        } catch (err) {
            res.status(500).json(err);
        }
    },

// Adds a friend to a user
    async addFriend(req, res) {
        try {
            const friend = await User.findByIdAndUpdate(
                req.params.id,
                { $addToSet: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            );

            if (!friend) {
                return res.status(404).json({ message: 'User does not exist' });
            }

            console.log('User ID:', req.params.id);
            console.log('Friend ID:', req.params.friendId);
            res.status(200).json(friend);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: 'Internal server error' });
        }
    },

// Removes a friend from user
    async removeFriend(req, res) {
        try {
            const friend = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { friends: req.params.friendId } },
                { runValidators: true, new: true }
            )
            if(!friend) {
                res.status(404).json({ message: 'User does not exist' });
            }

            res.status(200).json(friend);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};