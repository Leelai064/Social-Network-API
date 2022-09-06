const { Schema, model } = require('mongoose');

// model for users
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      max_length: 50,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true,
      match: [/.+@.+\..+/, 'Must match an email address!'],
      
    },
    thoughts: {
      type: Schema.Types.ObjectId,
      ref: 'Thought',
    },
    friends: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  ]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,

  }
);

const User = model('user', userSchema);

module.exports = User;