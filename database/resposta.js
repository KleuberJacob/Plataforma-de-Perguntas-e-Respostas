const Sequelize = require('sequelize')
const connection = require('./database')

const resposta = connection.define('respostas', {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }    
})

resposta.sync({force: false})
  .then(function(){
      console.log('Tabela de Resposta Criada')
}).catch(function(error){
      console.log(error)
})

module.exports = resposta