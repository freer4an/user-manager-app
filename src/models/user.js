const {DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')
const db = require('../config/db')

const User = db.define('User', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowedNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowedNull: false,
        unique: true
    },
    hashed_password: {
        type: DataTypes.STRING(64),
    },
    createdAt: {
        type: DataTypes.DATE,
        value: DataTypes.NOW,
        defaultValue: DataTypes.NOW
    },
    last_session: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },
    status: {
        type: DataTypes.ENUM('active', 'blocked'),
        defaultValue: 'active'
    }
},
{
    freezeTableName: true
})

User.beforeCreate((user, options) => {
    user.hashed_password = bcrypt.hashSync(user.hashed_password, 5)
})

db.sync({force: false}).then(() => {
    console.log("User table created successfully")
})

module.exports = User