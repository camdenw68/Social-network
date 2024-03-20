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
        default: Date.now,
        get: (dateGetter) => dateGetter.toLocaleDateString ()
    },
    username: {
        type: String,
        required: true
    },
    reactions: [
        reactionSchema
    ]
},
{
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false
})
thoughtSchema.virtuals('reactionCount').get(
    function() {
        return this.reactions.length
    }
)
const thought = model('thought', thoughtSchema);

module.exports = thought;