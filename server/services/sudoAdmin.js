module.exports = {
    registerAdmin: async (user) => {
        try {
            user.accountType = 1;
            let result = await db.auth.insert(user);
            if (result.result.ok == 1 && result.result.n == 1) {
                return ({ ok: true, message: 'Admin created' });
            }
            else {
                return ({ ok: false, message: 'Admin created' });
            }
        } catch (err) {
            if (err.code && err.code == 11000) {
                return ({ ok: false, message: 'admin already present' });
            } else {
                console.log('Mongo issue ', err.code);
                return ({ ok: false, message: 'unknown db issue' });
            }
        }
    }
}
