//{ urlCode: { mandatory, unique, lowercase, trim }, longUrl: {mandatory, valid url}, shortUrl: {mandatory, unique} }

const mongoose=require('mongoose');
const shortId= require('shortid')
 const urlSchema= new mongoose.Schema({
    urlCode:{
        type:String,
        unique: true,
        trim:true,
        lowercase: true,
        required: true,
        
    },
    longUrl:{
        type:String,
        trim:true,
        required: true
    },
    shortUrl:{
        type:String,
        unique: true,
        trim:true,
        required: true,
        default: shortId.generate()
    }
 },{timestamps:true})

 module.exports=mongoose.model('url',urlSchema);