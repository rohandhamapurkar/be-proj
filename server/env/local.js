module.exports = {
    port: 3000,
    dbURL:"mongodb://root:root@ds157057.mlab.com:57057/login-api",
    stegKey:[7,8,6,7,8,6,7,8,6],
    auth: {
        secret: '6twgh876ejlwhi8e2ej2i878eyh2d3g74gi4g38gno65756giosekrgi43ogv8347gvirelngkb4i3gib',
        tokenLifeInSec: 60 * 60 * 24 * 7,// 300 days
    },
    versions: {
        default: 'v0.1',
        all: [
            'v0.1',
            'v0.2',
            'v1.0'
        ]
    },
    envName: "local"
}