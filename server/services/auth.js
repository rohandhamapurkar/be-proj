let jwt = require('jsonwebtoken');
module.exports = {
    issueToken: claim => {
        return jwt.sign(claim, config.auth.secret, { expiresIn: config.auth.tokenLifeInSec });
    },
    verifyToken: async token => new Promise((resolve, reject) => {
        jwt.verify(token, config.auth.secret, (err, decoded) => {
            if (err) { resolve(false) }
            else { resolve(decoded) }
        })
    }),
    hashPassword: password => {
        const crypto = require('crypto');
        const secret = 'kjbs76576cdkjhsbdjbsd8732y8gfe387g2ofg27fg27o4lyg';
        const hash = crypto.createHmac('sha256', secret)
            .update(password)
            .digest('hex');
        return hash;
    },
    checkUserExists: async (user) => {
        try {
            let result = await db.auth.findOne(user, { id:1,accountType:1,_id:0 });
            if (result) {
                return ({ ok: true, user: result });
            }
            else {
                return ({ ok: false, message: "No such user exists" });
            }
        } catch (err) {
            console.log('Mongo issue ', err);
            return ({ ok: false, message: 'unknown db issue' });
        }
    },
    registerUser: async (user) => {
        try {
            user.accountType = 10;
            let result = await db.auth.insert(user);
            if (result.result.ok == 1 && result.result.n == 1) {
                return ({ ok: true, message: 'User created' });
            }
            else {
                return ({ ok: false, message: 'User created' })
            }
        } catch (err) {
            if (err.code && err.code == 11000) {
                return ({ ok: false, message: 'user already present' });
            } else {
                console.log('Mongo issue ', err.code);
                return ({ ok: false, message: 'unknown db issue' });
            }
        }
    }
}