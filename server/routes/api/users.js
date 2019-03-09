import mongoose from 'mongoose';
import passport from 'passport';
import nodemailer from 'nodemailer';
import express from 'express';
import { isAuthenticated } from '../../auth';
import nev from '../../services/email-verification';
import config from 'config';

const resetPassConfig = config.get('auth').resetPassword;

const router = express.Router();
const Users = mongoose.model('Users');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: resetPassConfig.user,
        pass: resetPassConfig.pass
    }
})

//POST new user route (optional, everyone has access)
router.post('/signup', (req, res, next) => {
    const { body: { email, password } } = req;

    if (!email) {
        return res.status(422).json({ errors: { email: 'is required' } });
    }

    if (!password) {
        return res.status(422).json({ errors: { password: 'is required' } });
    }

    Users.findOne({ email }).then(user => {
        if (user) {
            return res.status(409).json({ errors: { user: 'already exists' } });
        }
        const finalUser = new Users({ email });
        finalUser.setPassword(password);
        return finalUser.save()
            .then(() => res.json({ user: finalUser.toAuthJSON() }));
    })

    // const finalUser = new Users({email});
    // nev.createTempUser(finalUser, (err, existingPersistentUser, newTempUser) => {
    //     if (err) {
    //         return res.status(500).json(err);
    //     }
    //     if (existingPersistentUser) {
    //         return res.status(409).json({errors: {user: 'already exists'}});
    //     }
    //     if (newTempUser) {
    //         const URL = newTempUser[nev.options.URLFieldName];
    //         nev.sendVerificationEmail(email, URL, (err, info) => {
    //             if (err) {
    //                 return res.status(500).json(err);
    //             }
    //             res.status(200).json(info)
    //         });
    //     } else {
    //         return res.status(409).json({errors: {verification: 'already sent'}});
    //     }
    // });

    // finalUser.setPassword(password);
    // return finalUser.save()
    //     .then(() => res.json({user: finalUser.toAuthJSON()}));
});

//POST login route (optional, everyone has access)
router.post('/login', (req, res, next) => {
    const { body: { email, password } } = req;

    if (!email) {
        return res.status(422).json({ errors: { email: 'is required' } });
    }

    if (!password) {
        return res.status(422).json({ errors: { password: 'is required' } });
    }

    return passport.authenticate('local', (err, passportUser, info) => {
        if (err) {
            return next(err);
        }

        if (passportUser) {
            return req.login(passportUser, (err) => res.json(passportUser));
        }

        return res.status(400).send('Please check your credentials');
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

router.post('/reset-password', async (req, res, next) => {
    const { body: { email, password, token } } = req;

    if (!email) {
        return res.status(422).json({ errors: { email: 'is required' } });
    }

    if (!password) {
        return res.status(422).json({ errors: { password: 'is required' } });
    }

    if (!token) {
        return res.status(422).json({ errors: { token: 'is required' } });
    }

    try {
        const user = await Users.findOne({
            email,
            resetPasswordToken: token,
            resetPasswordTTL: {
                $gt: Date.now()
            }
        })
        if (!user) {
            return res.status(400).json({ errors: { link: 'is invalid or have expired' } });
        }
        const passObj = user.setPassword(password)
        await user.update({
            ...passObj,
            resetPasswordToken: null,
            resetPasswordTTL: null
        })
        return res.status(200).send()
    } catch (e) {
        res.status(500).json(e)
    }
});

router.post('/forgot-password', async (req, res, next) => {
    const { body: { email } } = req;

    if (!email) {
        return res.status(422).json({ errors: { email: 'is required' } });
    }

    try {
        const user = await Users.findOne({ email })
        if (!user) {
            return res.status(400).json({ errors: { user: 'does not exists' } });
        }
        const token = Math.random().toString(36).slice(2);
        await Users.update({ _id: user._id }, { $set: { resetPasswordToken: token, resetPasswordTTL: Date.now() + 60 * 60 * 1000 } });

        const mailOptions = {
            from: 'asaftest68@gmail.com',
            to: `${email}`,
            subject: 'Reset Password',
            text: `${resetPassConfig.url}?email=${email}&token=${token}`
        };

        await transporter.sendMail(mailOptions)
        res.status(200).send();
    } catch (e) {
        res.status(500).json(e)
    }
});

//GET current route (required, only authenticated users have access)
router.get('/current', isAuthenticated, (req, res, next) => {
    const { user: { _id } } = req;

    return Users.findById(_id)
        .then((user) => {
            if (!user) {
                return res.sendStatus(400);
            }

            return res.json({ user: user.toAuthJSON() });
        });
});

router.post('/validate-reset-password-token', isAuthenticated, async (req, res, next) => {
    const { body: { token, email } } = req;

    if (!email) {
        return res.status(422).json({ errors: { email: 'is required' } });
    }

    if (!token) {
        return res.status(422).json({ errors: { token: 'is required' } });
    }

    try {
        const user = await Users.findOne({
            email,
            resetPasswordToken: token,
            resetPasswordTTL: {
                $gt: Date.now()
            }
        })
        if (!user) {
            return res.status(400).json({ errors: { link: 'is invalid or have expired' } });
        }

        return res.json({ user: user.toAuthJSON() });
    } catch (e) {
        res.status(500).json(e)
    }
});

export default router;
