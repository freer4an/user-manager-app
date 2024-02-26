const { Sequelize } = require('sequelize');

const db = new Sequelize("user-management", "postgres", "pass", {
    host: "localhost",
    dialect: "postgres"
})

const sessions = {}

module.exports = db