module.exports = {
    verifyApiKey: async key => {
        let result = await db.auth.findOne({'apiKey':key},{'id':1});
        if (result) {
            return ({ ok: true, resp: result });
        }
        else {
            return ({ ok: false, message: "No such apiKey exists" });
        }
    }
}
