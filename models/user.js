const { Schema, model } = require('mongoose');

// model for users
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
      unique: true,
      required: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
    },
    posts: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Post',
      }
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      }
    ],

  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,

  }
);

userSchema.virtual('friendCount').get(function () {
  return this.friends.length;
})

const User = model('User', userSchema);

module.exports = User;