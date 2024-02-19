const express = require('express')
const router = express.Router()

const User = require('../models/user')

router.get("/", (req, res) => {
    res.redirect("/home")
})

router.get("/login", (req, res) => {
    res.render("login.handlebars");
})

router.get("/signup", (req, res) => {
    res.render("signup.handlebars");
})

router.post("/signup", (req, res) => {
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    })
        .then(user => {
            res.sendStatus(201)
        })
        .catch(err => {
            console.log(err)
        })
})
router.get("/home", (req, res) => {
    User.findAll()
        .then(users => {
            console.log(users)
            res.render('home', {
                users
            });
            // res.render("home.handlebars", {users})
        })
        .catch(err => {
            console.log(err)
        });
})

module.exports = router