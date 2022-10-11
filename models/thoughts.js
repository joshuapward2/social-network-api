const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');





const ReactionSchema = new Schema(
  {
    // set custom id to avoid confusion with parent Thoughts's _id field
    reactionId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxLength: 280
    },
    username: {
      type: String,
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: formatter => dateFormat(formatter)
    }
  },
  {
    toJSON: {
      getters: true
    }
  }
);


const ThoughtSchema = new Schema(
    {
       thoughtText: {
        type: String,
        required: true,
        maxlength: 280
       },
       createdAt: {
        type: Date,
        default: Date.now,
        get: formatter => dateFormat(formatter)
      },
      username: {
        type: String,
        required: true,
        
      },
      // use ReactionSchema will validate data for a reaction
    reactions: [ReactionSchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
);

ThoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});




    // create the user model defined by userschema

  const Thoughts = model('Thoughts', ThoughtSchema);

  // export the user model
  
  module.exports = Thoughts;
  