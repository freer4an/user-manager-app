const { Sequelize } = require('sequelize');

const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || 5432;

const db = new Sequelize("user-management", "postgres", "pass", {
    host: dbHost,
    port: dbPort,
    dialect: "postgres"
})

module.exports = db