
const fs = require('fs');
const path = require('path');

const authfi = require('./authfi')

const WEBAUTHN_API_BASE = '/api/v1/webauthn';

async function doRegisterOption(userAccount, userName) {
    let params = {
        user: {
            name: userAccount,
            displayName: userName
        },
        authenticatorSelection: {
            authenticatorAttachment: 'cross-platform',
            requireResidentKey: true,
            userVerification: 'required'
        },
        attestation: 'direct'
    };

    let response = await authfi.postToAuthFi(
        `${WEBAUTHN_API_BASE}/registration`, JSON.stringify({params})
    );
    return response.body;
}

async function registerResult(fido_response) {
    let response = await authfi.putToAuthFi(
        `${WEBAUTHN_API_BASE}/registration`,
        JSON.stringify({fido_register_response:fido_response})
    );
    return response.body;
}

async function loginOption() {
    let params = {
        userVerification: 'required',
    }

    let response = await authfi.postToAuthFi(
        `${WEBAUTHN_API_BASE}/login`,
        JSON.stringify({params})
    );
    return response.body;
}

async function loginResult(fido_response) {
    let response = await authfi.putToAuthFi(
        `${WEBAUTHN_API_BASE}/login`,
        JSON.stringify({fido_login_response:fido_response})
    );
    return response.body;
}

async function verifyOption(userAccount) {
    let params = {
        userVerification: "required"
    }
    let response = await authfi.postToAuthFi(
        `${WEBAUTHN_API_BASE}/verification`,
        JSON.stringify({uId:userAccount, params})
    );
    return response.body;
}

async function verifyResult(fido_response) {
    let response = await authfi.putToAuthFi(
        `${WEBAUTHN_API_BASE}/verification`,
        JSON.stringify({fido_auth_response:fido_response})
    );
    return response.body;
}

module.exports = {
    doRegisterOption, registerResult,
    loginOption, loginResult,
    verifyOption, verifyResult
}
