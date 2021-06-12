const EXPRESS= require('express')
const APP=EXPRESS()
const MONGOOOSE=require('mongoose')
const filebin=require("./fileBinModel")
const cors=require('cors')
const PORT=8000 || process.env.PORT
APP.use(cors())
APP.use(EXPRESS.json())


MONGOOOSE.connect("YOUR MONGODB URI GOES HERE",
{ useNewUrlParser: true ,useUnifiedTopology: true,useFindAndModify:false })
.then(Res=>{console.log("DATABASE IS CONNECTED")})
.catch(Err=>{console.log(Err)})

APP.post('/newurl',(req,res)=>{
    const FIREBASEURL=req.body.firebaseurl
    const newfilebin=new filebin({
        firebaseurl:FIREBASEURL
    })
    newfilebin.save().then(Res=>{
        const ID=Res._id
        filebin.findByIdAndUpdate(ID,{serverurl:`http://localhost:8000/fetchfile/${ID}`},{returnOriginal:false})
        .then(Res=>{res.status(200).json(Res.serverurl)})
    }).catch(Err=>{console.log(Err)})
})

APP.get('/fetchfile/:id',(req,res)=>{
    const ID=req.params.id
    filebin.findById(ID).then(Res=>{
        const FETCHED=Res.fetched;
        const FIREBASEURL=Res.firebaseurl
        const ID=Res._id
        if(FETCHED){
            res.status(200).send("URL HAS BEEN FETCHED ONCE")
        }else{
            filebin.findByIdAndUpdate(ID,{fetched:true},{returnOriginal:false})
            .then(Res=>{
                if(Res){
                    res.redirect(FIREBASEURL)
                }
            })
        }
    })

})










APP.listen(PORT,()=>{console.log(`Server is listening on port:${PORT}`)})