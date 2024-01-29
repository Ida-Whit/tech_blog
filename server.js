const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
//const helpers = require('');
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequielize')(session.Store);

const app = express();
const PORT = process.env.PORT || 3001;

//const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

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

app.use(routes);

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
