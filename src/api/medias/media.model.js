const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
    mediaTitle: {type: String, require: true},
    mediaDescription: {type: String, require: false},
    mediaSpotify: {type: String, require: false},
    //TODO: PREGUNTAR A ANTONIO/ALBERTO SOBRE AÑADIR MAS DE UNA IMAGEN/VIDEO
    mediaImage: {type: String, require: false},
    mediaVideo: {type: String, require: false}
    
    
    //songs: [{ type: Schema.Types.ObjectId, ref:"songs"}],

},
    {
        timestamps: true
    }
);

module.exports = mongoose.model('medias', schema);