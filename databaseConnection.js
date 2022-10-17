const Sequelize = require('sequelize');

const sequelize = new Sequelize('livros', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
    define: {freezeTableName: true},
    query:{raw:true},
    port: 3306
  });

 sequelize.authenticate().then(()=>{
    console.log('Connected');
 }).catch((err)=>{
    console.log(`Erro de conexão: ${err}`);
 })

 module.exports = {
    sequelize
 }