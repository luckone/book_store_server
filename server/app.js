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
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Authorization, Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
    );
    if (req.headers.origin) {
        res.header("Access-Control-Allow-Origin", req.headers.origin);
    }
    next();
});


app.get('/uploads/:id', (req, res) => {
    res.sendFile(`/uploads/${req.params.id}`, { root : __dirname})
})

app.get('/books/list', (req, res) => {
    db.listOfBooks().then(data => {
        if(data) res.send({status: true, books: data})
        else res.send({status:false})
    }).catch(ex => {
        console.log(ex)
    })
})

app.get('/books/get-book/:id', (req, res) => {
    db.getBook(req.params.id).then(data => {
        if(data) res.send({status:true, book: data})
        else res.send({status:false})
    }).catch(ex => {
        console.log(ex)
    })
})

app.post('/books/create', upload.any(), (req, res) => {
    console.log(req.files.length)
    const img = req.files.length !== 0 ? `http://199.247.23.102:3000/${req.files[0].path}` : ''
    db.createBook(img, req.body).then(data => {
        if(data) res.send({status: true, book: data})
        else res.send({status:false})
    }).catch(ex => {
        console.log(ex)
    })
})

app.delete('/books/remove/:id', (req, res) => {
    console.log('delete:', req.params.id)
    db.removeBook(req.params.id).then(data => {
        if(data) res.send({status: true})
        else res.send({status:false})
    }).catch(ex => {
        console.log(ex)
    })
})

app.post('/books/update/:id', (req, res) => {
    db.updateBook(req.params.id, req.body).then(data => {
        console.log('updated', data)
        if (data) res.send({status: true, book: data})
        else res.send({status: false})
    }).catch(ex => {
        console.log(ex)
    })
})

const server = app.listen(3000, () => {
    console.log(`server is up on ${config.serverPort}`)
})