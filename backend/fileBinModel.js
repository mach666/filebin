const MONGOOSE=require('mongoose')

const urlSchema=MONGOOSE.Schema({
    serverurl:{type:String,trim:true},
    firebaseurl:{type:String,trim:true},
    fetched:{type:Boolean,required:true,default:false}
})
const Filebin=MONGOOSE.model("url",urlSchema)
module.exports=Filebin
