(function () {
  // npm import
  const express = require('express');
  const dotenv = require('dotenv');
  const morgan = require('morgan');
  const cors = require('cors');
  const hpp = require('hpp');
  const helmet = require('helmet');
  const path = require('path');
  const cookieParser = require('cookie-parser');
  const session = require('express-session');
  const passport = require('passport');
  const swaggerJsdoc = require('swagger-jsdoc');
  const swaggerUi = require('swagger-ui-express');
  const ejs = require('ejs');
  const compression = require('compression');
  const app = express();

  // mongoose import
  const connect = require('./schemas');

  // passportConfig import
  const passportConfig = require('./passport');

  // routes import
  const indexRouter = require('./routes');

  // use middlewares
  dotenv.config();
  passportConfig();
  connect();
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, 'views')); // C:\cuha\views\ + render
  app.set('PROJECT_NAME', process.env.PROJECT_NAME || 'kucis2021');
  app.set('PORT', process.env.PORT || 4000);
  app.use(compression());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cookieParser(process.env.COOKIE_SECRET));
  app.use(
    session({
      resave: false,
      saveUninitialized: false,
      secret: process.env.COOKIE_SECRET,
      cookie: {
        httpOnly: true,
        secure: false,
      },
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  const prod = process.env.NODE_NEV === 'production';
  if (prod) {
    app.use(morgan('combined'));
    app.use(helmet({ contentSecurityPolicy: false }));
    app.use(hpp());
  } else {
    app.use(morgan('dev'));
    app.use(
      cors({
        origin: true,
        credentials: true,
      }),
    );
  }

  // swagger
  const options = {
    definition: {
      openapi: '3.0.0',
      info: {
        title: `${app.get('PROJECT_NAME')} API`,
        version: '0.1.0',
        description: `${app.get('PROJECT_NAME')} API with Swagger`,
      },
      servers: [
        {
          url: `http://localhost:${app.get('PORT')}/api`,
        },
      ],
    },
    apis: ['./models/*.js', './routes/*.js'],
  };

  // api router
  const specs = swaggerJsdoc(options);

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));
  app.use('/', indexRouter);

  app.use((req, res, next) => {
    res.status(404).send('404Error-Sorry cant find that');
  });

  app.use((err, req, res, next) => {
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(500).send('Something broke!');
  });
  // listen port:8080
  app.listen(app.get('PORT'), () => {
    console.log(`listening on port ${app.get('PORT')}`);
  });
})();
