const { Schema, Model} = require('mongoose');
const reactionSchema = require('./reaction')
const thoughtSchema = newSchema({
    thoughText: {
    type: String,
    required: true,
    min_length: 1,
    max_length: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},
{
    toJSON: {
        getters: true,
    }
})
const thought = model('thought', thoughtSchema);

module.exports = thought;