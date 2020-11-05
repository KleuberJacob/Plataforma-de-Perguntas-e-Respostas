const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const connection = require('./database/database')
const pergunta = require('./database/pergunta')
const resposta = require('./database/resposta')

app.set('view engine', 'ejs')
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

connection.authenticate()
    .then(function() {
        console.log('Conexao ao DB MySQL realizada com sucesso!')
})  .catch(function(error) {
        console.log(error)
})

app.get('/', function(req, res) {    
    pergunta.findAll({ raw: true, order: [
        ['id', 'DESC']
    ] }).then(function(perguntas){
            res.render('index', {
            perguntas: perguntas
        })
    })
})

app.get('/perguntar', function(req, res) {
    res.render('perguntar')
})

app.post('/salvarpergunta', function(req, res) {
    let titulo = req.body.titulo
    let descricao = req.body.descricao    
    pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(function(){
        res.redirect('/')
    }).catch(function(error){
        console.log(error)
    })    
})

app.get('/pergunta/:id', function(req, res) {
    let id = req.params.id    
    pergunta.findOne({
        where: {id: id}
    }).then(function(pergunta){
        if(pergunta != undefined) {
            resposta.findAll({
                where: {perguntaId: pergunta.id},
                order: [
                    ['id', 'DESC']                 
                ]
        }).then(function (respostas) {
                res.render('pergunta', {
                    pergunta: pergunta,
                    respostas: respostas
                })
            })
        } else {
            res.redirect('/')
        }
    })
})

app.post('/responder', function(req, res) {
    let corpo = req.body.corpo
    let perguntaId = req.body.pergunta    
    resposta.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(function(){
        res.redirect('/pergunta/'+perguntaId)
    }).catch(function(error){
        console.log(error)
    })    
})

app.listen(8080, function() {
    console.log('Servidor Rodando!')
})