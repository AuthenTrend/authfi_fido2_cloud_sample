const cookieParser = require('cookie-parser');
const express = require('express');

const management = require('./management');
const mobile = require('./mobile');
const webauthn = require('./webauthn');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());

app.post('/api/register', async (req, res) => {
    try {
        let result = await webauthn.doRegisterOption(req.body.email, req.body.name, req.body.registerOption);
        res.json(result);
    } catch(err) {
        console.log('register step1 error:', err.message);
        res.json({code:3});
    }
});

app.put('/api/register', async (req, res) => {
    try {
        let result = await webauthn.registerResult(req.body);
        res.json(result);
    } catch(err) {
        console.log('register step2 error: ', err.message);
        res.json({code:3});
    }
});

app.post('/api/login', async (req, res) => {
    try {
        let result = await webauthn.loginOption(req.body.loginOption);
        res.json(result);
    } catch(err) {
        console.log('login step1 error: ', err.message);
        res.json({code:3});
    }
});

app.put('/api/login', async (req, res) => {
    try {
        let result = await webauthn.loginResult(req.body);
        res.json(result);
    } catch(err) {
        console.log('login step2 error: ', err.message);
        res.json({code:3});
    }
});

app.post('/api/identity', async (req, res) => {
    try {
        let result = await webauthn.verifyOption(req.body.email, req.body.identityOption);
        res.json(result);
    } catch(err) {
        console.log('verify step1 error: ', err.message);
        res.json({code:3});
    }
});

app.put('/api/identity', async (req, res) => {
    try {
        let result = await webauthn.verifyResult(req.body);
        res.json(result);
    } catch(err) {
        console.log('verify step2 error: ', err.message);
        res.json({code:3});
    }
});

app.get('/api/registeredUsers', async (req, res) => {
    try {
        let page = '1';
        if (req.query.page)
            page = req.query.page;
        let size = '20';
        if (req.query.size)
            size = req.query.size;
        let result = await management.getRegisteredUsers(page, size);
        res.json(result);
    } catch(err) {
        console.log('get user list error: ', err.message);
        res.json({code: 3});
    }
});

app.put('/api/updateuserstate', async (req, res) => {
    try {
        let result = await management.updateUserState(req.body.uid, req.body.state);
        res.json(result);
    } catch(err) {
        console.log('update user status error: ', err.message);
        res.json({code: 3});
    }
});

app.put('/api/removeregisteruser', async (req, res) => {
    try {
        let result = await management.deleteUserRegisterData(req.body.uid);
        res.json(result);
    } catch(err) {
        console.log('remove user error: ', err.message);
        res.json({code:3});
    }
});

app.get('/api/registerKeys/:userId', async (req, res) => {
    try {
        let result = await management.getUserRegisterKeys(req.params.userId);
        res.json(result);
    } catch(err) {
        console.log('get register key error: ', err.message);
        res.json({code:3});
    }
});

app.put('/api/changekeyname', async (req, res) => {
    try {
        let result = await management.chageUserRegisterKeyName(req.body.uid, req.body.kid, req.body.kname);
        res.json(result);
    } catch(err) {
        console.log('change register key friendly name error: ', err.message);
        res.json({code:3});
    }
});

app.put('/api/deleteregisterkey', async (req, res) => {
    try {
        let result = await management.deleteRegisterKey(req.body.uid, req.body.kid);
        res.json(result);
    } catch(err) {
        console.log('change register key friendly name error: ', err.message);
        res.json({code:3});
    }
});

app.post('/api/register/qrcode', async(req, res) => {
    try {
        let result = await mobile.getRegisterQRCode(req.body.email, req.body.name);

        res.json(result);
    } catch(err) {
        console.log('get register qrcode fail: ', err.message);
        res.json({code:55});
    }
});

app.get('/api/register/app/result', async(req, res) => {
    try {
        let result = await mobile.getRegisterAppResult(req.query.t);
        res.json(result);
    } catch(err) {
        console.log('get app result error: ', err.message);
        res.json({code: 55});
    }
});

app.get('/api/register/app/user', async(req, res) => {
    try {
        let u = mobile.getRegisterUser(req.query.t);
        res.json({code: 0, user: u});
    } catch(err) {
        console.log('get app registerd user error: ', err.message);
        res.json({code: 55});
    }
});

app.post('/api/mobile/register', async(req, res) => {
    try {
        let result = await mobile.doRegisterOption(req.body.token);
        res.json(result);
    } catch(err) {
        res.json({code: 55});
    }
});

app.put('/api/mobile/register', async(req, res) => {
    try {
        let result = await mobile.doRegisterResult(req.body.token, req.body.fidoResp);
        res.json(result);
    } catch(err) {
        console.log('mobile register result error: ', err.message);
        res.json({code: 55});
    }
});

app.get('/api/verify/qrcode', async(req, res) => {
    try {
        let result = await mobile.getVerifyQRCode();
        res.json(result);
    } catch(err) {
        res.json({code:55});
    }
});

app.get('/api/verify/app/result', async(req, res) => {
    try {
        let result = await mobile.getVerifyAppResult(req.query.t);
        res.json(result);
    } catch(err) {
        res.json({code: 55});
    }
});

app.post('/api/mobile/verify', async(req, res) => {
    try {
        let result = await mobile.doVerifyOption(req.body.token, req.body.email);
        res.json(result);
    } catch(err) {
        res.json({code:55});
    }
});

app.put('/api/mobile/verify', async(req, res) => {
    try {
        let result = await mobile.doVerifyResult(req.body.token, req.body.fidoResp);
        res.json(result);
    } catch(err) {
        res.json({code: 55});
    }
});

app.listen(9900, () => {console.log('server start')});
