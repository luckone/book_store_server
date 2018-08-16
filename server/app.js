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

app.post('/books/create', upload.single('preview'), (req, res) => {
    // console.log(req, "CREATE")
    console.log(req.body, 'BODY')
    // console.log(req.file, "CREATE")
    db.createBook(req.body.preview, req.body).then(data => {
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

// app.post('/login/create', upload.single('avatar'), (req, res) => {
//     console.log(req.file)
//     db.createUser(`http://localhost:3000/${req.file.path}`, req.body).then(data => {
//         res.send({account: data, status: true})
//     }).catch(ex => {
//         res.send(ex )
//     })
// })


const server = app.listen(3000, () => {
    console.log(`server is up on ${config.serverPort}`)
})