const mongoose = require('mongoose');
const AlbumSchema = require('./album');
const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    name: String,
    age: Number,
    yearsActive: Number,
    image: String,
    genre: String,
    website: String,
    netWorth: Number,
    labelName: String,
    retired: Boolean,
    //----------------------------------------------
    // Albums are embedded documents and only have a 
    // Schema not a model
    //----------------------------------------------
    Albums: [AlbumSchema]
    //----------------------------------------------
    // If Albums had a Model and we wanted to link them
    //----------------------------------------------
    //Albums: [{
    //    type: Schema.Types.ObjectId,
    //    ref: 'album'
    //}]

});

//-----------------------------------------------------------------
// If Albums had a Model and we wanted to clean up 
// the Albums on Artist delete
//-----------------------------------------------------------------
//ArtistSchema.pre('deleteOne', {document: true}, function(next) {
//    const Album = mongoose.model('album');
//    Album.deleteMany({ _id: { $in: this.Albums } })
//        .then(() => next());
//});

// Create a collection 'artist' in MongoDB
const Album = mongoose.model('artist', ArtistSchema);

module.exports = Album;