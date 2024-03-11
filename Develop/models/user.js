const { Schema, Types } = require('mongoose');

const userSchema = newSchema (
    {
        username: {
            type: string,
            unique: true,
            required: true,
            trimmed: true

        },
        email: {
            type: string,
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

const user = model('user', userSchema)

module.exports = User;