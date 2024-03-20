const { Schema, Types } = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionid: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId() },
        reactionBody: {
            type: String,
            required: true, // Corrected 'require' to 'required'
            minlength: 1, // Corrected 'min_length' to 'minlength'
            maxlength: 280, // Corrected 'max_length' to 'maxlength'
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (dateGetter) => dateGetter.toLocaleDateString(),
        },
    },
    {
        toJSON: { getters: true },
        id: false,
    }
);

module.exports = reactionSchema;
