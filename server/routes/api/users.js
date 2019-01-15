import mongoose from 'mongoose';
import passport from 'passport';
import express from 'express';
import {isAuthenticated} from '../../auth';
import nev from '../../services/email-verification';

const router = express.Router();
const Users = mongoose.model('Users');

//POST new user route (optional, everyone has access)
router.post('/signup', (req, res, next) => {
    const {body: {email, password}} = req;

    if (!email) {
        return res.status(422).json({errors: {email: 'is required'}});
    }

    if (!password) {
        return res.status(422).json({errors: {password: 'is required'}});
    }

    const finalUser = new Users({email});
    nev.createTempUser(finalUser, (err, existingPersistentUser, newTempUser) => {
        if (err) {
            return res.status(500).json(err);
        }
        if (existingPersistentUser) {
            return res.status(409).json({errors: {user: 'already exists'}});
        }
        if (newTempUser) {
            const URL = newTempUser[nev.options.URLFieldName];
            nev.sendVerificationEmail(email, URL, (err, info) => {
                if (err) {
                    return res.status(500).json(err);
                }
                res.status(200).json(info)
            });
        } else {
            return res.status(409).json({errors: {verification: 'already sent'}});
        }
    });

    // finalUser.setPassword(password);
    // return finalUser.save()
    //     .then(() => res.json({user: finalUser.toAuthJSON()}));
});

//POST login route (optional, everyone has access)
router.post('/login', (req, res, next) => {
    const {body: {email, password}} = req;

    if (!email) {
        return res.status(422).json({errors: {email: 'is required'}});
    }

    if (!password) {
        return res.status(422).json({errors: {password: 'is required'}});
    }

    return passport.authenticate('local', (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            return req.login(passportUser, (err) => res.json(passportUser))
        }

        return res.status(400).send('User not found');
    })(req, res, next);
});

router.post('/logout', (req, res, next) => {
    req.logout();
    res.status(200).send()
});

// TODO: handle email-verification
router.post('/email-verification', (req, res, next) => {
    nev.confirmTempUser(url, function (err, user) {
        if (err)
        // handle error...

        // user was found!
            if (user) {
                // optional
                nev.sendConfirmationEmail(user['email_field_name'], function (err, info) {
                    // redirect to their profile...
                });
            }

            // user's data probably expired...
            else {

            }
        // redirect to sign-up
    });
});

//GET current route (required, only authenticated users have access)
router.get('/current', isAuthenticated, (req, res, next) => {
    const {user: {_id}} = req;

    return Users.findById(_id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({user: user.toAuthJSON()});
        });
});

export default router;
