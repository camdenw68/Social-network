const { Schema, Types, model} = require('mongoose');

const userSchema = new Schema (
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trimmed: true

        },
        email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
            // https://stackoverflow.com/questions/18022365/mongoose-validate-email-syntax
        },
        thoughts: [{
            type: Schema.Types.ObjectId,
            ref: 'thought'
        }],
        friends: [{
            type: Schema.Types.ObjectId,
            ref: 'user'
    }] ,
    },
    {
        toJSON: {
            getters: true,
            virtuals: true,
        
        },
        id: false
    }
);
userSchema.virtual('friendcount').get( function() {
    return this.friends.length
})

const User = model('user', userSchema)

module.exports = User;