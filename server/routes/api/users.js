import mongoose from 'mongoose';
import passport from 'passport';
import express from 'express';
import {isAuthenticated} from '../../auth';

const router = express.Router();
const Users = mongoose.model('Users');

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
        if(user) {
            return res.status(409).json({ errors: { user: 'already exists' } });
        }
        const finalUser = new Users({ email });
        finalUser.setPassword(password);
        return finalUser.save()
            .then(() => res.json({ user: finalUser.toAuthJSON() }));
    })
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
            // const user = passportUser;
            // user.token = passportUser.generateJWT();
            return req.login(passportUser, (err) => res.json(passportUser))
        }

        return res.status(400).send('User not found');
    })(req, res, next);
});

router.post('/logout', (req, res, next) => {
    req.logout();
    res.status(200).send()
})

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

export default router;
