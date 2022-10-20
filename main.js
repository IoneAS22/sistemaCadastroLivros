const Express = require('express');
const app = Express();
const dbTables = require('./databaseTables');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const { where } = require('sequelize');

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//rotas das páginas

app.get('/home', (req, resp)=>{
    resp.render('home');
})

app.get('/cadastroLivro',(req, resp)=>{
    resp.render('cadastroLivro')
})

app.get('/consultarLivro', async (req, resp)=>{
    resp.render('consultarLivro')
})

app.get('/consultarLivro/btn', async (req, resp)=>{
    dbTables.tabelaLivro.findAll()
    .then((livros)=>{ 
        resp.render('consultarLivro', {livros: livros});
    }).catch((erro)=>{
        resp.send(erro);
    });    
})

app.post('/addLivro', async (req, resp)=>{
    let resposta;
    dbTables.tabelaLivro.create({
        nomeLivro: req.body.nomeLivro,
        autorLivro: req.body.autorLivro,
        editoraLivro: req.body.editoraLivro,
        anoPublicacaoLivro: req.body.anoPublicacaoLivro
    }).then(()=>{
        resposta = 'Livro Cadastrado com sucesso';
        resp.render('cadastroLivro', {resposta: resposta})
    }).catch((err)=>{
        resposta = `Livro não cadastrado. Erro: ${err}`;
    }) 
})

app.listen(8081, ()=>{
    let data = new Date();
    console.log(`Servidor iniciado em: ${data}`)
})
