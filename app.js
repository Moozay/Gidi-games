const express = require('express')
//const request = require('request')
const https = require('https')
const ejs = require("ejs");
const  mongoose  = require("mongoose");
const dotenv = require('dotenv').config()
const User = require('./User')


const URI = process.env.MONGODB_URL
     mongoose.connect
     (URI, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    }).then(()=>{
        console.log('connected to db');
    }).catch
    ((e)=>{
        console.log('error:' , e);
    })
   
    let highScore
    let name = 'Sheddy'
    let lname = 'Moozay'
    let city = 'Sale'

const app = express()
app.use(express.static('public'))
// app.use(express.urlencoded({extended: true}))
app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs');
getHighScore()

app.get('/', (req, res)=>{
    res.render("index",{highScore,name,lname,city})
})

app.get('/GameField', (req, res)=>{
    res.render("GameField",{highScore})
  })
async function getHighScore(){
    User
  .findOne({})
  .sort('-score')  // give me the max
  .exec(function (err, level) {
      name = level.name
      lname = level.lname
      city = level.city
      highScore = level.score
  });
}


setInterval(()=>{
    getHighScore()
    //console.log(highScore);
}, 4000);


async function addUser(req){
    try{
        const PLayer = await User.create({
            name: req.body.name,
            lname: req.body.lastname,
            city: req.body.city,
            mobile: req.body.mobile,
            score: req.body.myscore

        })
    } catch(e){
        console.log(e.message);
    }
}

app.post('/score',(req,res)=>{
    addUser(req)
    console.log(req.body)
    res.json({ status: 200 })
    
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log("server is running on port 3000")

})
