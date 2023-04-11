# AuthFi FIDO2/webauthn API Relying Party Demo Sample Code

This is a sample code to help uderstand how FIDO2/webauthn work in your relying party with ATKey product.
It written in Nodejs express on server side.

#### 1.1.0 Update
**New** Add a feature to show QRCode, so AT.AuthFi Authenticator App can scan the QRCode to do FIDO2 registration/verification.    
Add input options for Passkey mobile device to register and verify.    

#### How mobile authenticator application work
Please refer to [doc/Mobile/](https://github.com/AuthenTrend/authfi_fido2_cloud_sample/blob/master/doc/Mobile/) to see more details.

#### Setup

First you need to signup at [AuthFi manage console](https://authfi.authentrend.com) to apply a new relying party.

##### Configuration

Copy API Key and access point from manage console and fill in "authfi.js".

```
const ACCESS_POINT = 'HERE IS WHERE TO PLACE ACCESS POINT';
const API_KEY = 'HERE IS WHERE TO PLACE API_KEY';
```

It will look like
```
const ACCESS_POINT = 'https://authfi.authentrend.com/VGhpcyBpcyBhIHNhbXBsZSBhY2Nlc3MgcG9pbnQ';
const API_KEY = 'VHJ5IGEgc2FtcGxlIEFQSSBrZXk';
```

Also you will need a SSL certification and a URL to make webauthn work.

##### Run

Run ```npm install``` to install dependency packages. Then run ```npm start``` to start server.
Now you can goto your website and check how's everything work.


### License
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
- [MIT License](https://github.com/AuthenTrend/authfi_fido2_cloud_sample/blob/master/LICENSE)
- Copyright 2021 - 2023 © Authentrend Technology Inc.
