const Express = require('express');
const app = Express();

const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');


app.get('/home', (req, resp)=>{
    resp.render('home');
})

app.get('/cadastroLivro',(req, resp)=>{
    resp.render('cadastroLivro')
})

app.listen(8081, ()=>{
    let data = new Date();
    console.log(`Servidor iniciado em: ${data}`)
})