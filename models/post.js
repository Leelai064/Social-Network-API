const { Schema, model } = require('mongoose');

const reaction = require('./Reaction')

const postSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
            trim: true
        },
        createdAt: { 
            type: Date, 
            default: Date.now 
        },
        username: {
                type: String,
                required: true,
                trim: true
            },
        reactions: [reaction]
    },
    {
        toJSON: {
            virtuals: true,
        },
        id: false,
    }
)
postSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
});

const Post = model('Post', postSchema)

module.exports = Post