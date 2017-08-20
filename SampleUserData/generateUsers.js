userSample = {
    id: "/db/User/71",
    version: 1,
    acl: {
        read: {
            "/db/User/71": "allow"
        },
        write: {
            "/db/User/71": "allow"
        }
    },
    createdAt: "2017-08-18T14:27:32.672Z",
    updatedAt: "2017-08-18T14:27:32.672Z",
    username: "company4@swijo.com",
    inactive: false,
    iscomp: false,
    isConfigCompleted: false,
    _password: "pjfV0PRCatq1prGu96oB5y1G0Ko+z7T01/99yNRyf6FJr4865+AnnLQUmdWx3+KvAyjGJxOeaivvjucEj0jquA==",
    _revokedAt: "2017-08-18T14:27:32Z",
    _salt: "n331b+4BJE1BZFXGCE5qnvp5QwIoU8ClKJPbgeR+9tqFsnYWu1fQAUiC2hCd0ZRhD7g5htxFQp5NQvF/NsCJ4w==",
    _oAuth: null,
    _verificationNonce: "4Mb2NNFg"
};

function newBewerber(x) {
    const id = '/db/User/' + (72 + x);
    const aclAllow = {};
    aclAllow[id] = "allow";
    return {
        "id": id,
        "version": 1,
        "acl": {
            "read": aclAllow,
            "write": aclAllow
        },
        "username": '' + (x + 1) + '@bewerber.com',
        "inactive": false,
        "iscomp": false,
        "isConfigCompleted": true,
        "_password": "pjfV0PRCatq1prGu96oB5y1G0Ko+z7T01/99yNRyf6FJr4865+AnnLQUmdWx3+KvAyjGJxOeaivvjucEj0jquA==",
        "_revokedAt": "2017-08-18T14:27:32Z",
        "_salt": "n331b+4BJE1BZFXGCE5qnvp5QwIoU8ClKJPbgeR+9tqFsnYWu1fQAUiC2hCd0ZRhD7g5htxFQp5NQvF/NsCJ4w==",
        "_oAuth": null,
        "_verificationNonce": "4Mb2NNFg"
    };
}

function newUnternehmen(x) {
    const id = '/db/User/' + (272 + x);
    const aclAllow = {};
    aclAllow[id] = "allow";
    return {
        "id": id,
        "version": 1,
        "acl": {
            "read": aclAllow,
            "write": aclAllow
        },
        "username": '' + (x + 1) + '@unternehmen.com',
        "inactive": false,
        "iscomp": true,
        "isConfigCompleted": true,
        "_password": "pjfV0PRCatq1prGu96oB5y1G0Ko+z7T01/99yNRyf6FJr4865+AnnLQUmdWx3+KvAyjGJxOeaivvjucEj0jquA==",
        "_revokedAt": "2017-08-18T14:27:32Z",
        "_salt": "n331b+4BJE1BZFXGCE5qnvp5QwIoU8ClKJPbgeR+9tqFsnYWu1fQAUiC2hCd0ZRhD7g5htxFQp5NQvF/NsCJ4w==",
        "_oAuth": null,
        "_verificationNonce": "4Mb2NNFg"
    };
}

users = [];
for (var i = 0; i < 200; i++) {
    users.push(newBewerber(i));
}
for (var i = 0; i < 50; i++) {
    users.push(newUnternehmen(i));
}
console.log(JSON.stringify(users));