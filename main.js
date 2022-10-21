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

//rotas da página e consulta

app.get('/home', async (req, resp)=>{
    resp.render('home'); 
});

app.post('/addLivro', async (req, resp)=>{
    await dbTables.tabelaLivro.create({
        nomeLivro: req.body.nomeLivro,
        autorLivro: req.body.autorLivro,
        editoraLivro: req.body.editoraLivro,
        anoPublicacaoLivro: req.body.anoPublicacaoLivro
    }).then(()=>{
        req.body = "";
        alert('Livro Cadastrado com sucesso');
        app.get('/home', (req, resp)=>{
            resp.redirect('home');
        })
    }).catch((err)=>{
        alert(`Livro não cadastrado. Erro: ${err}`);
    })
});

app.get('/listarLivros', async (req, resp)=>{
    await dbTables.tabelaLivro.findAll()
    .then((livrosLista)=>{ 
        resp.render('home', {livrosLista: livrosLista});
    }).catch((err)=>{
        resp.send(err);
    });    
});

app.get('/deletarLivro/:idLivro', async (req, resp)=>{
    await dbTables.tabelaLivro.destroy({where: {idLivro: req.params.idLivro}})
    .then(()=>{ 
        resp.send('Deletado com sucesso');
    }).catch((err)=>{
        resp.send('Título Inexistente');
    });    
});

//Inicialização do

app.listen(8081, ()=>{
    let data = new Date();
    console.log(`Servidor iniciado em: ${data}`)
})
