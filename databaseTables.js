const Sequelize = require('sequelize');
const databaseConnection = require('./databaseConnection');

const tabelaLivro = databaseConnection.sequelize.define('cadastrodelivros', {
    idLivro: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nomeLivro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    autorLivro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    editoraLivro: {
        type: Sequelize.STRING,
        allowNull: false
    },
    anoPublicacaoLivro: {
        type: Sequelize.DATE,
        allowNull: false
    }
},{
    timestamps: false
    }
);

module.exports = {
    tabelaLivro
}