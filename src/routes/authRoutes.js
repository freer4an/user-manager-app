const { Router } = require('express');
const authController = require('../controllers/authController')

const router = Router();

const User = require('../models/user')
router.get("/login", authController.login_get)
router.get("/signup", authController.signup_get)
router.post("/login", authController.login_post)
router.post("/signup", authController.signup_post)

module.exports = router