const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'root', 'Kleuber201317', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection