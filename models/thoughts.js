const { Schema, model, Types } = require('mongoose');
const dateFormat = require('../utils/dateFormat.js');

const formatter = require('formatter');


const ThoughtSchema = new Schema(
    {
       thoughtText: {
        type: String,
        required: true,
        maxLength: 280
       },
       createdAt: {
        type: Date,
        default: Date.now,
        get: formatter => dateFormat(formatter)
      },
      username: {
        type: String,
        required: true,
        
      }




    })



    // create the user model defined by userschema

  const Thoughts = model('Thoughts', ThoughtSchema);

  // export the user model
  
  module.exports = Thoughts;
  