import express from 'express'
import bodyParser from 'body-parser'
import * as db from './utils/dbutils'
import config from '../config.json'
import multer from 'multer'

db.setUpConnection()

const app = express()
const upload = multer({ dest: 'uploads/'})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/posts/list', (req, res) => {
    db.listOfPosts().then(data => {
        res.send(data)
    }).catch(ex => {
        res.send(ex)
    })
})

app.post('/posts/add', (req, res) => {
    console.log(req.body)
    db.createPost(req.body).then(data => {
        res.send(data)
    }).catch(ex => {
        res.send(ex)
    })
})

app.post('/login', (req, res) => {
    db.checkUser(req.body).then(data => {
        if(data !== null) {
          res.send({status: true, access_token: data.access_token})
        } else res.send({status: false, message:'user not found'})
    }).catch(ex => {
        res.send(ex)
    })
})

app.post('/login/create', upload.single('avatar'), (req, res) => {
    console.log(req.file)
    db.createUser(`http://localhost:3000/${req.file.path}`, req.body).then(data => {
        res.send({account: data, status: true})
    }).catch(ex => {
        res.send(ex )
    })
})

app.post('/get-me', (req, res) => {
    db.getMe(req.body).then(data => {
        if(data !== null) {
            res.send({status: true, profile: data})
        }
    }).catch(ex => {
        res.send(ex)
    })
})

const server = app.listen(3000, () => {
    console.log(`server is up on ${config.serverPort}`)
})