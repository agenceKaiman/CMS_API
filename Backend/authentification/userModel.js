const mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
      admin: {
        type: String,
        required: false,
      },
      
      name: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
    {
      collection: "auth",
    },
    {
      timestamps: true,
    }
  );
  
  module.exports = mongoose.model("user", schema);