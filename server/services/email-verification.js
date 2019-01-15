import mongoose from 'mongoose';
import ev from 'email-verification';
import { auth } from 'config';

const {emailVerification: {verificationURL, service, user, pass, tempUserCollection}} = auth;
const Users = mongoose.model('Users');
const nev = ev(mongoose);

nev.configure({
    verificationURL,
    persistentUserModel: Users,
    tempUserCollection,
    transportOptions: {
        service,
        auth: {
            user,
            pass
        }
    },
    verifyMailOptions: {
        from: `Do Not Reply <${user}>`,
        subject: 'Please confirm account',
        html: 'Click the following link to confirm your account:</p><p>${URL}</p>',
        text: 'Please confirm your account by clicking the following link: ${URL}'
    },
    shouldSendConfirmation: false
}, function(error, options){
});

nev.generateTempUserModel(Users, (error, options) => {});

export default nev;
