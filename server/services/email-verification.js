import mongoose from 'mongoose';
import ev from 'email-verification';
import config, { auth } from 'config';

const {emailVerification: {verificationURL, service, tempUserCollection}} = auth;
const Users = mongoose.model('Users');
const nev = ev(mongoose);

const systemEmailUser = config.util.getEnv('SYSTEM_EMAIL_USER');
const systemEmailPassword = config.util.getEnv('SYSTEM_EMAIL_PASSWORD');

nev.configure({
    verificationURL,
    persistentUserModel: Users,
    tempUserCollection,
    transportOptions: {
        service,
        auth: {
            user: systemEmailUser,
            pass: systemEmailPassword
        }
    },
    verifyMailOptions: {
        from: `Do Not Reply <${systemEmailUser}>`,
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    },
    shouldSendConfirmation: false
}, function(error, options){
});

nev.generateTempUserModel(Users, (error, options) => {});

export default nev;
