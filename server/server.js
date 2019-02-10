import express from 'express';
import { PORT, mongo } from 'config';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import './models/Users';
import './models/Story';
import passport from './auth/passport';
import routes from './routes';

const MongoStore = require('connect-mongo')(session);
const app = express();
const SECRET = 'secret stuff';
const dist = path.join(__dirname, '../dist');
const mongoUri = process.env.MONGODB_URI || `${mongo.host}/${mongo.db}`;

// Connect to DB
mongoose.connect(mongoUri, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));
mongoose.Promise = global.Promise;
const db = mongoose.connection;

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json({limit: '10mb'}));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser(SECRET));
app.use(session({ secret: SECRET, resave: false, saveUninitialized: true, store: new MongoStore({ mongooseConnection: db }), cookie: { httpOnly: true, maxAge: 2419200000 } }));
app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(dist));
app.use(routes);
app.get('*', (req, res) => res.sendFile(path.join(dist, 'index.html')));

// app.use('/', express.static(path.join(__dirname, '../dist/index.html')))

const port = process.env.PORT || PORT;

app.listen(port, () => console.log('Server running on http://localhost:' + port));



