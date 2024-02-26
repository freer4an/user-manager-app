const { Sequelize } = require('sequelize');

const dbHost = process.env.DB_HOST || "localhost";
const dbPort = process.env.DB_PORT || 5432;
const dbUser = process.env.DB_USER || "postgres";
const dbName = process.env.DB_NAME || "user-management";
const dbPass = process.env.DB_PASSWORD || "pass";

const db = new Sequelize(dbName, dbUser, dbPass, {
    host: dbHost,
    port: dbPort,
    dialect: "postgres"
})

module.exports = db