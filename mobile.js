const fs = require('fs');
const path = require('path');

const authfi = require('./authfi')

const MOBILE_API_BASE = '/api/v1/mobile';

const register_data = {};

async function getRegisterQRCode(account, name) {
    const mobile_page_path = '/app/m_r.html';
    let params = {
        user: account,
        path: mobile_page_path
    }

    let response = await authfi.postToAuthFi(
        `${MOBILE_API_BASE}/registration/qrcode`,
        JSON.stringify({params}));

    let authfiResp = response.body;

    register_data[`${authfiResp.token}`] = {account, name};

    return authfiResp;
}

async function getRegisterAppResult(token) {
    let response = await authfi.getFromAuthFi(
        `${MOBILE_API_BASE}/registration/result?token=${token}`);
    return response.body;
}

async function doRegisterOption(token) {
    let params = {
        token,
        user: {
            name: register_data[token].account,
            displayName: register_data[token].name
        },
        authenticatorSelection: {
            authenticatorAttachment: 'platform',
            requireResidentKey: true,
            userVerification: 'required'
        },
        attestation: 'direct'
    };

    let response = await authfi.postToAuthFi(
        `${MOBILE_API_BASE}/registration`, JSON.stringify({params})
    );
    return response.body;
}

async function doRegisterResult(token, fido_response) {
    let response = await authfi.putToAuthFi(
        `${MOBILE_API_BASE}/registration`,
        JSON.stringify({token, fido_register_response:fido_response}));

    return response.body;
}

function getRegisterUser(token) {
    // Sample: we have an optional API for App web page to get registered user name
    // to do callback to authenticator app.
    // let response = await authfi.getFromAuthFi(`${MOBILE_API_BASE}/registration/user?token=${token}`);
    // let rj = response.body;
    // if (rj.code !== 0)
    //     throw new Error(`authfi API response error: ${rj.code}`);
    // return rj.account;

    return register_data[token].account;
}

async function getVerifyQRCode() {
    const mobile_page_path = '/app/m_v.html';
    let params = {
        path: mobile_page_path
    }
    let response = await authfi.postToAuthFi(`${MOBILE_API_BASE}/verification/qrcode`, JSON.stringify({params}));
    return response.body;
}

async function getVerifyAppResult(token) {
    let response = await authfi.getFromAuthFi(`${MOBILE_API_BASE}/verification/result?token=${token}`);
    return response.body;
}

async function doVerifyOption(token, userAccount) {
    let params = {
        userVerification: "required"
    };
    let response = await authfi.postToAuthFi(
        `${MOBILE_API_BASE}/verification`,
        JSON.stringify({uId:userAccount, token, params})
    );
    return response.body;
}

async function doVerifyResult(token, fido_response) {
    let response = await authfi.putToAuthFi(
        `${MOBILE_API_BASE}/verification`,
        JSON.stringify({token, fido_auth_response:fido_response})
    );
    return response.body;
}

module.exports = {
    getRegisterUser, getRegisterQRCode, getRegisterAppResult, doRegisterOption, doRegisterResult,
    getVerifyQRCode, getVerifyAppResult, doVerifyOption, doVerifyResult,
};
