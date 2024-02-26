const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const moment = require("moment");


function createToken(id) {
    return jwt.sign({id: id}, "secret_key", {expiresIn: "1h"});
}

async function updateUserLastSession(userId) {
    try {
        const user = await User.findByPk(userId);
        user.changed('last_session', true);
        user.last_session = moment().format();
        await user.save();
    } catch (error) {
        console.error("Error updating user last session:", error);
    }
}

module.exports.login_get = (req, res) => {
    const script = `<script src="/js/login.js"></script>`
    res.render("login.handlebars", {script: script});
}

module.exports.signup_get = (req, res) => {
    const script = `<script src="/js/signup.js"></script>`
    res.render("signup.handlebars", {script: script})
}

module.exports.login_post = async (req, res) => {
    try {
        let { email, password } = req.body;
        const user = await User.findOne({ where: { email: email } });
        if (!user) return res.status(404).json({ error: { email: `Email not found` }});
        if (!bcrypt.compareSync(password, user.hashed_password)) {
            return res.status(400).json({ error: { password: `Wrong password` }});
        }
        await updateUserLastSession(user.id);
        res.cookie("token", createToken(user.id), { maxAge: 60 * 60 * 1000, httpOnly: false });
        return res.status(200).json({ user: user.id });
    } catch (err) {
        console.log(err.message);
        return res.status(500).json({ error: err.message });
    }
};

module.exports.signup_post = (req, res) => {
    let {name, email, password} = req.body;
    if (!name || !email || !password) {
        res.status(400).json({error: "All fields are required"})
        return
    }
    User.create({
        name: name,
        email: email,
        hashed_password: password
    })
        .then(user => {
            res.status(201).json({user: user})
        })
        .catch(err => {
            if (err.name === "SequelizeUniqueConstraintError") {
                res.status(400).json({ error: "Email already in use" });
                return
            }
            console.log(err.message)
            res.status(500).json({error: res.statusText})
        })
}