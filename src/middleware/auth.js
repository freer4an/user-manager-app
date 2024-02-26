const jwt = require('jsonwebtoken');


function authenticate(req, res, next) {
    const token = req.cookies.token;
    console.log(token)
    if (!token) return res.redirect('/login');
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, "secret_key");
    } catch (err) {
        return res.sendStatus(403);
    }
    req.user = decodedToken
    next()
}

module.exports = authenticate