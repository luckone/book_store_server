import express from 'express'
import bodyParser from 'body-parser'
import * as db from './utils/dbutils'
import config from '../config.json'

db.setUpConnection()

const app = express()

app.use(bodyParser.json())

app.post('/posts/list', (req, res) => {
    db.listOfPosts().then(data => {
        res.send(data)
    }).catch(ex => {
        res.send(ex)
    })
})

app.post('/posts/add', (req, res) => {
    db.createPost(req.body).then(data => {
        res.send(data)
    }).catch(ex => {
        res.send(ex)
    })
})

const server = app.listen(3000, () => {
    console.log(`server is up on ${config.serverPort}`)
})