const Sequelize = require('sequelize')
const Connection = require('./database')

const pergunta = Connection.define('perguntas', {
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
},{})

pergunta.sync({force: false})
  .then(function(){
      console.log('Tabela de Perguntas Criada')
}).catch(function(error){
      console.log(error)
})

module.exports = pergunta