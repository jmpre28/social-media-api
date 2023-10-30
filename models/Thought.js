const { Schema, model } = require('mongoose');
const Reaction = require('./Reaction')

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAt) => createdAt.toLocaleString()
        },     
        username: {
            type: String,
            required: true
        },
        reactions: [Reaction]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id: false,
    }
);

/*
Create a virtual called reactionCount that retrieves the length 
of the thought's reactions array field on query.
*/
thoughtSchema.virtual('reactionCount').get(() => {
    return this.reactions.length;
})


const Thought = model('Thought', thoughtSchema);

module.exports = Thought;