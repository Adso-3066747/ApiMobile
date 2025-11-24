0const express=require('express')
const bodyParser=require('body-parser')
var mongoose=require('mongoose')
const cors=require('cors')

var app=express()
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

const conect=mongoose.connection
mongoose.connect('mongodb+srv://opm:123456789abc@cluster0.nvvlb7t.mongodb.net/')
conect.once('open',()=>{
    console.log("ok")
})
conect.on('error',(e)=>{
    console.log("Error", e)
})
const Usuario=mongoose.model('Usuario',{
    usuario:String,
    password:String,
    membresia:String
})

app.post('/registro',async (req,res)=>{
    try{
        console.log("Estamos en registro")
        const {usuario,password,membresia}=req.body
        const existe=await Usuario.findOne({usuario})
        if(existe){
            res.json({
                ok:false,
                message:'Usuario YA registrado',
            })
        }
        else{
            const newUser=new Usuario({usuario,password,membresia})
            await newUser.save()
            res.json({
                ok:true,
                message:"Usuario creado"
            })
        }
    }
    catch(err){
        console.log(err)
    }
})


app.post('/login',async (req,res)=>{
    try{
        console.log("Estamos en login")
        const {usuario,password}=req.body
        const user=await Usuario.findOne({usuario,password})
        if(user){
            res.json({
                ok:true,
                message:'Usuario registrado',
            })
        }
        else{
            res.json({
                ok:false,
                message:'Usuario  no registrado',
            })
        }
    }
    catch(err){
        console.log(err)
    }
})
/*app.listen(5000,()=>{
    console.log("Servidor corriendo")
})*/
