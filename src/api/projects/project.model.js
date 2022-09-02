const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    projectTitle: {type: String, require: true},
    projectDescription: {type: String, require: false},
    //TODO: PREGUNTAR A ANTONIO/ALBERTO SOBRE AÑADIR MAS DE UNA IMAGEN/VIDEO
    projectImage: {type: String, require: false},
    projectVideo: {type: String, require: false},
    users: [{ type: Schema.Types.ObjectId, ref:"users"}]
    
    
    //songs: [{ type: Schema.Types.ObjectId, ref:"songs"}],

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('projects', schema);