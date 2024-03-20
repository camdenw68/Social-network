const { Schema, model } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema({
    thoughText: {
        type: String,
        required: true,
        minlength: 1, // Corrected 'min_length' to 'minlength'
        maxlength: 280, // Corrected 'max_length' to 'maxlength'
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: (dateGetter) => dateGetter.toLocaleDateString(),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [reactionSchema],
}, {
    toJSON: {
        getters: true,
        virtuals: true,
    },
    id: false,
});

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;
