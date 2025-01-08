var express = require("express")
var mongoClient = require("mongodb").MongoClient
var cors = require("cors")
require('dotenv').config()
var PORT = process.env.CON_STRING

var app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:"true"}))


// API user routes
app.get('/users', (req, res)=>{
    
    mongoClient.connect(PORT).then((clientObj)=>{
        var database = clientObj.db('todo-react')
        database.collection('tblusers').find().toArray().then((docs)=>{
            res.send(docs)
            res.end()
        })
    })

})

app.post('/register-user', (req, res)=>{
    mongoClient.connect(PORT).then((clientObj)=>{

        var user = {
            UserId: req.body.UserId,
            UserName: req.body.UserName,
            Password: req.body.Password,
            Email: req.body.Email,
            Mobile: req.body.Mobile

        }

        var database = clientObj.db('todo-react')
        database.collection('tblusers').insertOne(user).then(()=>{
            console.log("registered the specific user");
            res.end()
        })
    })
})

app.put('/edit-user/:userid',(req, res)=>{
    mongoClient.connect(PORT).then((clientObj)=>{
        var database = clientObj.db('todo-react')
        database.collection('tblusers').updateOne({UserId:req.params.userid},{$set:{
            UserId: req.body.UserId, 
            UserName: req.body.UserName,
            Password: req.body.Password,
            Email: req.body.Email,
            Mobile: req.body.Mobile}}).then(()=>{
                console.log("edited successfully");
                res.end()
            })
    })
})

app.delete('/delete-user/:userid', (req, res)=>{
    mongoClient.connect(PORT).then((clientObj)=>{
        var database = clientObj.db('todo-react')
        database.collection('tblusers').deleteOne({UserId:req.params.userid}).then(()=>{
            console.log("deleted successfully");
            res.end()
        })
})
})

// APPOINTMENT ROUTES

app.get('/appointments/:userid', (req, res)=>{
    mongoClient.connect(PORT).then((clientObj)=>{
        var database = clientObj.db('todo-react')
        database.collection('tblappointments').find({UserId: req.params.userid}).toArray().then(docs=>{
            res.send(docs)
            res.end()
        })
    })
})

app.post('/add-appointment', (req, res)=>{
    var appointment = {
        Appointment_Id: parseInt(req.body.Appointment_Id),
        Title: req.body.Title,
        Description: req.body.Description,
        Date: new Date(req.body.Date),
        UserId: req.body.UserId
    }

    mongoClient.connect(PORT).then((clientObj)=>{
        var database = clientObj.db('todo-react')
        database.collection('tblappointments').insertOne(appointment).then(()=>{
            console.log("appointment added");
            res.end()
        })
        })
    })

app.get('/modify-appointment/:id', (req, res) => {
    mongoClient.connect(PORT).then((clientObj) => {
        var database = clientObj.db('todo-react')
        database.collection('tblappointments').find({ Appointment_Id: parseInt(req.params.id) }).toArray().then(docs => {
            res.send(docs)
            res.end()
        })
    })
})

app.put('/update-appointment/:id', (req, res) => {
    mongoClient.connect(PORT).then((clientObj) => {
        var database = clientObj.db('todo-react')
        database.collection('tblappointments').updateOne({Appointment_Id: parseInt(req.params.id)}, {
            $set: {
                Appointment_Id: parseInt(req.body.Appointment_Id),
                Title: req.body.Title,
                Description: req.body.Description,
                Date: new Date(req.body.Date),
                UserId: req.body.UserId
            }
        }).then(() => {
            console.log("appointment edited");
            res.end()
        })
    })
})

app.delete('/delete-appointment/:id', (req, res) => {
    mongoClient.connect(PORT).then((clientObj) => {
        var database = clientObj.db('todo-react')
        database.collection('tblappointments').deleteOne({Appointment_Id: parseInt(req.params.id)}).then(() => {
            console.log("appointment deleted successfully");
            res.end()
        })
    })
})

app.listen(2000, ()=>{
    console.log("server listening at 2000");
})