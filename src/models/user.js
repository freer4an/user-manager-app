const {DataTypes} = require('sequelize')
const db = require('../config/db')

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowedNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowedNull: false,
        unique: true
    },
    hashed_password: {
        type: DataTypes.STRING(64),
        validate: {
            is: /^[0-9a-f]{64}$/i
        }
    },
    created_at: {
        type: DataTypes.DATE
    },
    updated_at: {
        type: DataTypes.DATE
    },
    status: {
        type: DataTypes.ENUM('active', 'blocked')
    }
},
{
    freezeTableName: true
})

db.sync({force: true}).then(() => {
    console.log("User table created successfully")
})
module.exports = User