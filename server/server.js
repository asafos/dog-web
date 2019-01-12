import express from 'express';
import { PORT, mongo } from 'config';
import mongoose from 'mongoose';
import path from 'path';
import bodyParser from 'body-parser';
import session from 'express-session';
import cors from 'cors';
const app = express();

app.use(cors());
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: 'passport-tutorial', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false }));

app.listen(PORT, () => console.log('Server running on http://localhost:' + PORT));

// Connect to DB
mongoose.connect(`${mongo.host}/${mongo.db}`, { useNewUrlParser: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

import './models/Users';
import './auth/passport';

import routes from './routes';
app.use(routes);
