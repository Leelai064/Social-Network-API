const {Schema, model} = require('mongoose');

const Reaction = require('./Reaction')

const postSchema = new Schema(
    {
        text: {
            type: String,
            required: true,
        },
        createdAt: { type: Date, default: Date.now },
        username: [ 
            {
            type: String,
            required: true,
            }
        ],
        reactions: [Reaction]
    },
    {
        toJSON: {
          virtuals: true,
        },
        id: false,
    }
)
postSchema.virtual('reactionCount').get(function () {
    return this.reactions.length
});

const Post = model('Post', postSchema)

module.exports = Post