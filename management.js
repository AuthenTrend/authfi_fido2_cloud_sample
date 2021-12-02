
const fs = require('fs');
const path = require('path');

const authfi = require('./authfi')

const MANAGEMENT_API_BASE = '/api/v1/users'


async function getRegisteredUsers(page, size) {
    let response = await authfi.getFromAuthFi(`${MANAGEMENT_API_BASE}?page=${page}&size=${size}`);
    console.log('response from authfi server:', response)
    return response.body;
}

async function updateUserState(userId, newState) {
    console.log('updateUserState()');
    let response = await authfi.putToAuthFi(`${MANAGEMENT_API_BASE}/${userId}`, JSON.stringify({state: newState}));
    console.log('response from authfi server:', response)
    return response.body;
}

async function deleteUserRegisterData(userId) {
    console.log('deleteUserRegisterData()');
    let response = await authfi.deleteFromAuthFi(`${MANAGEMENT_API_BASE}/${userId}`);
    console.log('response from authfi server:', response)
    return response.body;
}

async function getUserRegisterKeys(userId) {
    console.log('getUserRegisterKeys()');
    let response = await authfi.getFromAuthFi(`${MANAGEMENT_API_BASE}/${userId}/keys`);
    console.log('response from authfi server:', response)
    return response.body;
}

async function chageUserRegisterKeyName(userId, credentialId, newName) {
    console.log('chageUserRegisterKeyName()');
    let response = await authfi.putToAuthFi(
        `${MANAGEMENT_API_BASE}/${userId}/keys/${credentialId}`, JSON.stringify({name: newName})
    );
    console.log('response from authfi server:', response)
    return response.body;
}

async function deleteRegisterKey(userId, credentialId) {
    console.log('deleteRegisterKey()');
    let response = await authfi.deleteFromAuthFi(
        `${MANAGEMENT_API_BASE}/${userId}/keys/${credentialId}`
    );
    console.log('response from authfi server:', response)
    return response.body;
}

module.exports = {
    getRegisteredUsers, updateUserState, deleteUserRegisterData,
    getUserRegisterKeys, chageUserRegisterKeyName, deleteRegisterKey
}
