const mongoose = require('mongoose');
const PointSchema = require('./Utils/PointSchema');

const DevSchema = new mongoose.Schema({
  name: String,
  github_username: String,
  bio: String,
  avatar_url: String,
  techs: [String],
  location: {
    type: PointSchema,
    createIndex: '2dsphere',
  },
});

module.exports = mongoose.model('dev', DevSchema);
