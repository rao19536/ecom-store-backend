const dbConnect = require('./connect')
const express = require('express')
const mongodb = require('mongodb')
const cors = require('cors')
const users = require('./data')
const app = express()
const port = process.env.PORT || 5000
app.use(express.json())
app.use(cors())

app.get('/allusers', async (req, res)=>{
    const db = await dbConnect()
    const collection = db.collection('users')
    await collection.find().toArray().then((resp)=>{
        res.send(resp)
    }).catch((err)=>{
        console.log('err', err)
    })
})

app.post('/registeruser', async (req, res) => {
    const db = await dbConnect()
    const collection = db.collection('users')
    await collection.insertOne(req.body)
    .then((resp)=>{
        res.send(
            Object.assign({}, resp, req.body)
        )
    }).catch((err)=>{
        console.log('err', err)
    })
    
})

app.put('/updateuser/:id',async (req, res)=>{
    const db = await dbConnect()
    let mongoObj = new mongodb.ObjectId(req.params.id)
    const collection = db.collection('users')
    await collection.updateOne({_id: mongoObj},{
        $set: req.body
    }).then((resp)=>{
        res.send(
            Object.assign({}, resp, req.body)
        )
    }).catch((err)=>{
        console.log('err', err)
    })
})

app.delete('/deleteuser/:id', async (req, res)=>{
    const db = await dbConnect()
    let mongoObj = new mongodb.ObjectId(req.params.id)
    const collection = db.collection('users')
    await collection.deleteOne({_id: mongoObj})
    .then((resp)=>{
        res.send(
            Object.assign({}, resp, req.body)
        )
    }).catch((err)=>{
        console.log('err', err)
    })
})

app.listen(port)
