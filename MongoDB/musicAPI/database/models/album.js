const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AlbumSchema = new Schema({
    title: String,
    date: Date,
    copiesSold: Number,
    numberTracks: Number,
    image: String,
    revenue: Number
});

//-----------------------------------------------------
// Handling Album as an embedded document for Artist
// therefore the Model is not required only the Schema.
//-----------------------------------------------------
//const Album = mongoose.model('album', AlbumSchema);
//module.exports = Album;

module.exports = AlbumSchema;