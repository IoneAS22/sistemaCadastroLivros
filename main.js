const Express = require('express');
const app = Express();
const dbTables = require('./databaseTables');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser')

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.get('/home', (req, resp)=>{
    resp.render('home');
})

app.get('/cadastroLivro',(req, resp)=>{
    resp.render('cadastroLivro')
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
    }).catch((err)=>{
        resposta = `Livro não cadastrado. Erro: ${err}`;
    }) 
    resp.render('cadastroLivro', {resposta: resposta})
})

app.get('/consultarLivro',(req, resp)=>{
    dbTables.tabelaLivro.findAll().then((livros)=>{
        resp.render('consultarLivro', {livros: livros})
    })
})

app.get('/consultarLivro/:id', (req, resp)=>{
    dbTables.tabelaLivro.findAll({where: {idLivro: req.params.id}}).then((livro)=>{ //findAll tras todos os dados do banco de dados postagem do BD
        resp.render('consultarLivro/Resultado', {livro: livro});
    }).catch((erro)=>{
        resp.send(erro);
    });    
})

app.listen(8081, ()=>{
    let data = new Date();
    console.log(`Servidor iniciado em: ${data}`)
})
