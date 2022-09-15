const express = require("express");
const app = express();
const session = require('express-session');
const PORT = process.env.PORT || 3001;
const sequelize = require("./config/config");

const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
  app.use(session(sess));
  
const exphbs = require("express-handlebars");
const hbs = exphbs.create({});
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.use(require('./controllers/'));


app.listen(PORT, async () => {
   console.log(`App listening on port ${PORT}!`);
   try {
    await sequelize.sync({ force: false })
    console.log('connected to db!')
} catch(e){
    console.log(e)
}
});

