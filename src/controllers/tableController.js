const User = require("../models/user");


module.exports.getUsers = async (req, res) => {
    const user = await User.findOne({where: {id: req.user.id}})
    if (!user || user.status === "blocked" || isNaN(req.params.id) || req.params.id != user.id) {
        return res.redirect("/login")
    }
    const script = `<script src="/js/table.js"></script>`
    User.findAll({raw: true, nested: true})
        .then(users => {
            res.render('home', {
                user: user.name,
                users: users,
                script: script
            });
        })
        .catch(err => {
            console.log(err)
        });
}

module.exports.blockUser = async (req, res) => {
    let {ids} = req.body;
    if (!ids || ids.some(isNaN)) return res.sendStatus(400);
    try {
        const users = await User.findAll({where: {id: ids}})
        if (!users) return res.sendStatus(400);
        users.forEach(user => user.update({status: "blocked"}))
        return res.sendStatus(200)
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

module.exports.unblockUser = async (req, res) => {
    let {ids} = req.body;
    if (!ids || ids.some(isNaN)) return res.sendStatus(400);
    try {
        const users = await User.findAll({where: {id: ids}})
        if (!users) return res.sendStatus(400);
        users.forEach(user => user.update({status: "active"}))
        return res.sendStatus(200)
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}

module.exports.deleteUser = async (req, res) => {
    let {ids} = req.body;
    if (!ids || ids.some(isNaN)) return res.sendStatus(400);
    try {
        const count = await User.destroy({where: {id: ids}})
        console.log("Deleted " + count + " users")
        return res.sendStatus(200)
    } catch (err) {
        console.log(err)
        return res.sendStatus(500)
    }
}