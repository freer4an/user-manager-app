const express = require('express')
const exphbs  = require('express-handlebars');
const app = express()
const path = require('path');
const bcrypt = require('bcrypt');
const db = require('./config/db');
const User = require('./models/user')
const router = require('./routes/routes')

app.engine('handlebars', exphbs.engine({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.use(express.static("public"));
app.use("/", require("./routes/routes"));

const port  = 3000;
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})