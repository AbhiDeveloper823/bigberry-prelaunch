const express = require('express'),
      mongoose = require('mongoose'),
      cors    = require('cors'),
      bodyParser = require('body-parser'),
      morgan = require('morgan'),
      fs  = require('fs'),
      path = require('path'),
      app       = express()
require('dotenv').config()
const nodemailer = require('nodemailer')

//CONFIGURATION

mongoose.connect(`mongodb+srv://abhi:${process.env.DB_PASS}@cluster0.ddjzu.mongodb.net/?bigberry_ecom=true&w=majority`, {
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology: true 
}).then(()=>{
    console.log(`DATABASE CONNECTED!!`)
}).catch((err)=>{
    console.log(err)
})
app.use(express.static(path.join(__dirname, 'build')))
app.use(cors())
app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json({limit:'50mb'}))
app.use(morgan('tiny'))

//routes
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'build/index.html'))
});

fs.readdirSync('./routes').map((f)=>{
    app.use('/api', require('./routes/' + f))
})

app.listen(process.env.PORT, (err)=>{
    if(err) console.log('Sorry...Not able to start the server!!')
    console.log('BIGBERRY ECOMMERCE SERVER STARTED!!')
})


