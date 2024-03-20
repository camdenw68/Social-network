const { Schema, Types} = require('mongoose');
const reactionSchema = new Schema (
    {
        reactionid: { type: Schema.Types.ObjectId, default: () => new Types.ObjectId()},
        reactionBody: {
            Type: String, 
            require: true,
            min_length: 1,
            max_length: 280,
        },
        username: {
            type: String,
            require: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (dateGetter) => dateGetter.toLocaleDateString ()
        }
    },
    {
       toJSON:  {getters: true},
       id: false
    },
)
module.exports = reactionSchema