# Mobile Device work with WebAuthn

For mobile devices with Android < 14, or iOS < 16, iPad OS < 16, which are only partial feature of Passkey, or just regular FIDO2 foramt credential.    
We supply a way for mobile device as external security key to register/verify for service show on computer UI.    

### Requirement

Using WebAuthn with PC/Mac, you'll need:

- Update computer OS to lastest update
	- Windows 10 > 1903
	- Windows 11 > 22H2
	- Mac OS > 12.3.1
- Android 7+
- iOS 14.5+

### Warning

**For Android < 14, the OS doest not support resident key feature.** So the mobile device won't save user information for the target service URL. **It does not able to use mobile device as first factor security key to do WebAuthn verification**.    
You will need to send user email when doing the verification, so AuthFi will return WebAuthn allowed list for security key to verify.

### Mobile as External Security Key for Computer

Here explan how to use mobile device as external security key of WebAuthn for computer UI.

#### Registeration

First need a web page for mobile device to trigger register event. We use [app/m_r.html](public/app/m_r.html) to do this job.    
Then relying party will query a QRCode from AuthFi server via ```POST /{API_ACCESSPOINT}/api/v1/mobile/registration/qrcode```. You will send user information and web page url for the QRCode.    
Turn on AuthFi Authenticator App on mobile device, scan the QRCode. Click the register button to trigger register event, pass biometrics verification, and wait for AuthFi server to response registration result.    
After mobile device credential create and registered, the service on computer will receive result from AuthFi API, means user had just register a new security key, and it could guid user to rename the new registered security key or others.    

#### Verification

To do WebAuthn verification, it need a web page for mobile device to trigger verify event. We use [app/m_v.html](public/app/m_v.html) to do this job.    
Then relying party will query a QRCode from AuthFi server
via ```POST /{API_ACCESSPOINT}/api/v1/mobile/verification/qrcode```. You will send web page url for the QRCode.    
Turn on AuthFi Authenticator App on mobile device, click the account you want to do WebAuthn verification. It will turn on camera to scan the QRCode on computer UI.    
Click the verify button to trigger verify event, pass biometrics verification, and wait for AuthFi server to response verification result.    
After mobile device credential and signature was verified, the service on computer will receive result from AuthFi API, means user had pass checks and able to login to the target service.

### Reference

- AT.AuthFi Authenticator

	- [App Store](https://apps.apple.com/app/at-authfi-authenticator/id1613903768)

	- [Google Play](https://play.google.com/store/apps/details?id=com.authentrend.atauthfi_authenticator)
