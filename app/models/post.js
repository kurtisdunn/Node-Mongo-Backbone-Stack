var mongoose = require('mongoose');

var Schema = mongoose.Schema;  

var Post = new Schema({  
    heading: { type: String, required: true }, 
    sub_heading: { type: String, required: true },  
    body: { type: String, unique: true },  
    footer: { type: String, required: true },  
	category: {type: String, required: true},
	modified: { type: Date, default: Date.now }
});

// create the model for users and expose it to our app
module.exports =  PostModel = mongoose.model('Post', Post);  