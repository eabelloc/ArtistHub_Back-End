const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require("bcrypt");
const {validationPassword} = require("../../helpers/utils/util");
const {setError} = require("../../helpers/utils/error");
const {USERTYPE} = require("../../helpers/constants/usertype")

const schema = new Schema({
   username: {type: String, require: true, unique: true},
   password: {type: String, require: true},
   email: {type: String, require: true, unique: true},
   avatar: {type: String, require: false},
   userType: {type: String, enum: USERTYPE, require: true},
   projects: [{type: Schema.Types.ObjectId, ref:"projects"}],
   favProjects: [{type: Schema.Types.ObjectId, ref:"projects"}],
   medias: [{type: Schema.Types.ObjectId, ref:"medias"}],
   userIntro: {type: String, require: false},
   socialMedia: [{type: Schema.Types.ObjectId, ref:"socialMedia"}]
}, 
    {
        timestamps: true
    }
)



schema.pre('save', function(next) {
    if(!validationPassword(this.password)) return next(setError('404', "Invalid password"));
    this.password = bcrypt.hashSync(this.password, 10);
    next();
});

module.exports = mongoose.model('users', schema)