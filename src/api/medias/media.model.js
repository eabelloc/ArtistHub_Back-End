const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    mediaTitle: {type: String, require: true, unique: true},
    mediaDescription: {type: String, require: false},
    mediaSpotify: {type: String, require: false, unique: true},
    //TODO: PREGUNTAR A ANTONIO/ALBERTO SOBRE AÑADIR MAS DE UNA IMAGEN/VIDEO
    mediaImage: [{type: String, require: false, unique: true}],
    mediaVideo: [{type: String, require: false, unique: true}]
    
    
    //songs: [{ type: Schema.Types.ObjectId, ref:"songs"}],

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('medias', schema);