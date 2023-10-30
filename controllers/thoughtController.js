const { Thought, Reaction } = require('../models');

module.exports = {
// Finds all thoughts
    async getAllThoughts(req, res) {
        try {
            const thoughts = Thought.find();

            res.status(200).json(thoughts);
        } catch (err) {
            res.status(500).json(err);
        }
    },
// Finds a single thought by ID
    async getSingleThought(req, res) {
        try {
            const thought = await Thought.findOne({ _id: req.params.id }).select('-__v');
            if(!thought) {
                res.status(404).json({ message: 'Thought does not exist' });
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

// Creates a thought
    async createThought(req, res) {
        try {
            const newThought = await Thought.create(req.body);

            res.status(200).json(newThought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

// Updates a thought by ID
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { runValidators: true, new: true}
            )
            if(!thought) {
                res.status(404).json({ message: 'Thought does not exist' });
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

// Deletes a thought by ID
    async deleteThought(req, res) {
        try {
            const thought = await Thought.findOneAndDelete({ _id: req.params.id });
            if(!thought) {
                res.status(404).json({ message: 'Thought does not exist' });
            }

            res.status(200).json(thought);
        } catch (err) {
            res.status(500).json(err);
        }
    },

// Adds a reaction to a thought
    async addReaction (req, res) {
        try {
            const thoughtReaction = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true}
            )
            if(!thoughtReaction) {
                res.status(404).json({ message: 'Thought does not exist' });
            }

            res.status(200).json(thoughtReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    },

// Removes a reaction from a thought
    async removeReaction (req, res) {
        try {
            const thoughtReaction = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                { $pull: { reactions: { reactionId: req.params.reactionId } } },
                { runValidators: true, new: true }
            )
            if(!thoughtReaction) {
                res.status(404).json({ message: 'Thought does not exist' });
            }

            res.status(200).json(thoughtReaction);
        } catch (err) {
            res.status(500).json(err);
        }
    }
};