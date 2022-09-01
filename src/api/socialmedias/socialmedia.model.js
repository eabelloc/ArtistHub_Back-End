const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    company: {type: String, require: false, unique: true},
    location: {type: String, require: false},
    website: {type: String, require: false, unique: true},
    twitter: {type: String, require: false, unique: true},
    linkedin: {type: String, require: false, unique: true}
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('socialmedia', schema);