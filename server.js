const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

//const helpers = require('');
const sequelize = require('./config/connection');
const controller = require('./controllers');

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = exphbs.create();

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const middleware = (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
  next();
}

app.use(middleware)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


const sess = {
  secret: process.env.SECRET,
  cookie: {
    maxAge:3600000,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  }),
};

app.use(session(sess));

app.use(controller);


sequelize
  .authenticate()
  .then(() => {
    console.log("Connection has been established.");
    return sequelize.sync({ force: false });
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Now listening on PORT ${PORT}`));
  })
  .catch ((err) => {
    console.error("Unable to connect to the database", err);
  });
