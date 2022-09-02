const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    company: {type: String, require: false},
    location: {type: String, require: false},
    website: {type: String, require: false},
    twitter: {type: String, require: false},
    linkedin: {type: String, require: false}
},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('socialMedia', schema);