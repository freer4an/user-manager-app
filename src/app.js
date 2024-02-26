const express = require('express')
const exphbs  = require('express-handlebars');
const cookieParser = require('cookie-parser');
const authRoutes = require('./routes/authRoutes');
const protectedRoutes = require('./routes/tableRoute');

const app = express()
const hbs = exphbs.create({
    // Specify helpers which are only registered on this instance.
    defaultLayout: 'main',
    helpers: {
        formatDate(date) {return date.toLocaleString('en-GB')},
    }
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static("public"));
app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);
app.use(protectedRoutes);
app.get('/', (req, res) => {res.redirect("/login")})

const port  = 3000;

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})