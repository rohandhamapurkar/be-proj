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
    }
}