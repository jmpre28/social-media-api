const { Schema, model } = require('mongoose');
const Thought = require('./Thought,js');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
        },
        thoughts: [
            { 
                type: Schema.Types.ObjectId, 
                ref: Thought 
            }
        ],
        friends: [
            { 
                type: Schema.Types.ObjectId, 
                ref: 'User' 
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false
    }
);

/*
Create a virtual called friendCount that retrieves the 
length of the user's friends array field on query.
*/

const User = model('User', userSchema);

module.exports = User;