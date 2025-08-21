const ErrorMessages = [
   {
      code: "auth/wrong-password",
      message: "The password is invalid or the user does not have a password."
   },
   {
      code: "auth/claims-too-large",
      message: "The claims payload provided to setCustomUserClaims() exceeds the maximum allowed size of 1000 bytes."
   },
   {
      code: "auth/email-already-exists",
      message: "The provided email is already in use by an existing user. Each user must have a unique email."
   },
   {
      code: "auth/id-token-expired",
      message: "The provided Firebase ID token is expired."
   },
   {
      code: "auth/id-token-revoked",
      message: "The Firebase ID token has been revoked."
   },
   {
      code: "auth/insufficient-permission",
      message: "The credential used to initialize the Admin SDK has insufficient permission to access the requested Authentication resource.",
   },
   {
      code: "auth/invalid-argument",
      message: "An invalid argument was provided to an Authentication method."
   },
   {
      code: "auth/invalid-claims",
      message: "The custom claim attributes provided to setCustomUserClaims() are invalid."
   },
   {
      code: "auth/invalid-creation-time",
      message: "The creation time must be a valid UTC date string."
   },
   {
      code: "auth/invalid-disabled-field",
      message: "The provided value for the disabled user property is invalid. It must be a boolean."
   },
   {
      code: "auth/invalid-display-name",
      message: "The provided value for the displayName user property is invalid. It must be a non-empty string."
   },
   {
      code: "auth/invalid-email-verified",
      message: "The provided value for the emailVerified user property is invalid. It must be a boolean."
   },
   {
      code: "auth/invalid-hash-algorithm",
      message: "The hash algorithm must match one of the strings in the list of supported algorithms."
   },
   {
      code: "auth/invalid-hash-block-size",
      message: "The hash block size must be a valid number."
   },
   {
      code: "auth/invalid-hash-derived-key-length",
      message: "The hash derived key length must be a valid number."
   },
   {
      code: "auth/invalid-hash-key",
      message: "The hash key must a valid byte buffer."
   },
   {
      code: "auth/invalid-hash-memory-cost",
      message: "The hash memory cost must be a valid number."
   },
   {
      code: "auth/invalid-hash-parallelization",
      message: "The hash parallelization must be a valid number."
   },
   {
      code: "auth/invalid-hash-rounds",
      message: "The hash rounds must be a valid number.",
   },
   {
      code: "auth/invalid-hash-salt-separator",
      message: "The hashing algorithm salt separator field must be a valid byte buffer."
   },
   {
      code: "auth/invalid-id-token",
      message: "The provided ID token is not a valid Firebase ID token."
   },
   {
      code: "auth/invalid-last-sign-in-time",
      message: "The last sign-in time must be a valid UTC date string."
   },
   {
      code: "auth/invalid-page-token",
      message: "The provided next page token in listUsers() is invalid. It must be a valid non-empty string."
   },
   {
      code: "auth/invalid-password",
      message: "The password is invalid. Please enter the correct password."
   },
   {
      code: "auth/invalid-password-hash",
      message: "The password hash must be a valid byte buffer."
   },
   {
      code: "auth/invalid-password-salt",
      message: "The password salt must be a valid byte buffer"
   },
   {
      code: "auth/invalid-photo-url",
      message: "The provided value for the photoURL user property is invalid. It must be a string URL."
   },
   {
      code: "auth/invalid-provider-data",
      message: "The providerData must be a valid array of UserInfo objects."
   },
   {
      code: "auth/invalid-oauth-responsetype",
      message: "Only exactly one OAuth responseType should be set to true."
   },
   {
      code: "auth/invalid-session-cookie-duration",
      message: "The session cookie duration must be a valid number in milliseconds between 5 minutes and 2 weeks."
   },
   {
      code: "auth/invalid-uid",
      message: "The provided uid must be a non-empty string with at most 128 characters."
   },
   {
      code: "auth/invalid-user-import",
      message: "The user record to import is invalid."
   },
   {
      code: "auth/maximum-user-count-exceeded",
      message: "The maximum allowed number of users to import has been exceeded."
   },
   {
      code: "auth/missing-hash-algorithm",
      message: "Importing users with password hashes requires that the hashing algorithm and its parameters be provided."
   },
   {
      code: "auth/missing-uid",
      message: "A uid identifier is required for the current operation."
   },
   {
      code: "auth/missing-oauth-client-secret",
      message: "The OAuth configuration client secret is required to enable OIDC code flow."
   },
   {
      code: "auth/phone-number-already-exists",
      message: "The provided phoneNumber is already in use by an existing user. Each user must have a unique phoneNumber."
   },
   {
      code: "auth/project-not-found",
      message: "No Firebase project was found for the credential used to initialize the Admin SDKs. Refer to Set up a Firebase project for documentation on how to generate a credential for your project and use it to authenticate the Admin SDKs."
   },
   {
      code: "auth/reserved-claims",
      message: "One or more custom user claims provided to setCustomUserClaims() are reserved. For example, OIDC specific claims such as (sub, iat, iss, exp, aud, auth_time, etc) should not be used as keys for custom claims."
   },
   {
      code: "auth/session-cookie-expired",
      message: "The provided Firebase session cookie is expired."
   },
   {
      code: "auth/session-cookie-revoked",
      message: "The Firebase session cookie has been revoked."
   },
   {
      code: "auth/uid-already-exists",
      message: "The provided uid is already in use by an existing user. Each user must have a unique uid."
   },
   {
      code: "auth/admin-restricted-operation",
      message: "This operation is restricted to administrators only."
   },
   {
      code: "auth/app-not-authorized",
      message: "This app, identified by the domain where it's hosted, is not authorized to use Firebase Authentication with the provided API key. Review your key configuration in the Google API console."
   },
   {
      code: "auth/app-not-installed",
      message: "The requested mobile application corresponding to the identifier (Android package name or iOS bundle ID) provided is not installed on this device."
   },
   {
      code: "auth/captcha-check-failed",
      message: "The reCAPTCHA response token provided is either invalid, expired, already used or the domain associated with it does not match the list of whitelisted domains."
   },
   {
      code: "auth/code-expired",
      message: "The SMS code has expired. Please re-send the verification code to try again."
   },
   {
      code: "auth/cordova-not-ready",
      message: "Cordova framework is not ready."
   },
   {
      code: "auth/cors-unsupported",
      message: "This browser is not supported."
   },
   {
      code: "auth/credential-already-in-use",
      message: "This credential is already associated with a different user account."
   },
   {
      code: "auth/custom-token-mismatch",
      message: "The custom token corresponds to a different audience."
   },
   {
      code: "auth/requires-recent-login",
      message: "This operation is sensitive and requires recent authentication. Log in again before retrying this request."
   },
   {
      code: "auth/dependent-sdk-initialized-before-auth",
      message: "Another Firebase SDK was initialized and is trying to use Auth before Auth is initialized. Please be sure to call `initializeAuth` or `getAuth` before starting any other Firebase SDK."
   },
   {
      code: "auth/dynamic-link-not-activated",
      message: "Please activate Dynamic Links in the Firebase Console and agree to the terms and conditions."
   },
   {
      code: "auth/email-change-needs-verification",
      message: "Multi-factor users must always have a verified email."
   },
   {
      code: "auth/email-already-in-use",
      message: "The email address is already in use by another account."
   },
   {
      code: "auth/emulator-config-failed",
      message: "Auth instance has already been used to make a network call. Auth can no longer be configured to use the emulator. Try calling 'connectAuthEmulator()' sooner."
   },
   {
      code: "auth/expired-action-code",
      message: "The action code has expired."
   },
   {
      code: "auth/cancelled-popup-request",
      message: "This operation has been cancelled due to another conflicting popup being opened."
   },
   {
      code: "auth/internal-error",
      message: "An internal AuthError has occurred."
   },
   {
      code: "auth/invalid-app-credential",
      message: "The phone verification request contains an invalid application verifier. The reCAPTCHA token response is either invalid or expired."
   },
   {
      code: "auth/invalid-app-id",
      message: "The mobile app identifier is not registed for the current project."
   },
   {
      code: "auth/invalid-user-token",
      message: "This user's credential isn't valid for this project. This can happen if the user's token has been tampered with, or if the user isn't for the project associated with this API key."
   },
   {
      code: "auth/invalid-auth-event",
      message: "An internal AuthError has occurred."
   },
   {
      code: "auth/invalid-verification-code",
      message: "The SMS verification code used to create the phone auth credential is invalid. Please resend the verification code sms and be sure to use the verification code provided by the user."
   },
   {
      code: "auth/invalid-continue-uri",
      message: "The continue URL provided in the request is invalid."
   },
   {
      code: "auth/invalid-cordova-configuration",
      message: "The following Cordova plugins must be installed to enable OAuth sign-in: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme."
   },
   {
      code: "auth/invalid-custom-token",
      message: "The custom token format is incorrect. Please check the documentation."
   },
   {
      code: "auth/invalid-dynamic-link-domain",
      message: "The provided dynamic link domain is not configured or authorized for the current project."
   },
   {
      code: "auth/invalid-email",
      message: "The email address is badly formatted."
   },
   {
      code: "auth/invalid-emulator-scheme",
      message: "Emulator URL must start with a valid scheme (http:// or https://)."
   },
   {
      code: "auth/invalid-api-key",
      message: "Your API key is invalid, please check you have copied it correctly."
   },
   {
      code: "auth/invalid-cert-hash",
      message: "The SHA-1 certificate hash provided is invalid."
   },
   {
      code: "auth/invalid-credential",
      message: "The supplied auth credential is malformed or has expired."
   },
   {
      code: "auth/invalid-message-payload",
      message: "The email template corresponding to this action contains invalid characters in its message. Please fix by going to the Auth email templates section in the Firebase Console."
   },
   {
      code: "auth/invalid-multi-factor-session",
      message: "The request does not contain a valid proof of first factor successful sign-in."
   },
   {
      code: "auth/invalid-oauth-provider",
      message: "EmailAuthProvider is not supported for this operation. This operation only supports OAuth providers."
   },
   {
      code: "auth/invalid-oauth-client-id",
      message: "The OAuth client ID provided is either invalid or does not match the specified API key."
   },
   {
      code: "auth/unauthorized-domain",
      message: "This domain is not authorized for OAuth operations for your Firebase project. Edit the list of authorized domains from the Firebase console."
   },
   {
      code: "auth/invalid-action-code",
      message: "The action code is invalid. This can happen if the code is malformed, expired, or has already been used."
   },
   {
      code: "auth/invalid-persistence-type",
      message: "The specified persistence type is invalid. It can only be local, session or none."
   },
   {
      code: "auth/invalid-phone-number",
      message: "The format of the phone number provided is incorrect. Please enter the phone number in a format that can be parsed into E.164 format. E.164 phone numbers are written in the format [+][country code][subscriber number including area code]."
   },
   {
      code: "auth/invalid-provider-id",
      message: "The specified provider ID is invalid."
   },
   {
      code: "auth/invalid-recipient-email",
      message: "The email corresponding to this action failed to send as the provided recipient email address is invalid."
   },
   {
      code: "auth/invalid-sender",
      message: "The email template corresponding to this action contains an invalid sender email or name. Please fix by going to the Auth email templates section in the Firebase Console."
   },
   {
      code: "auth/invalid-verification-id",
      message: "The verification ID used to create the phone auth credential is invalid."
   },
   {
      code: "auth/invalid-tenant-id",
      message: "The Auth instance's tenant ID is invalid."
   },
   {
      code: "auth/missing-android-pkg-name",
      message: "An Android Package Name must be provided if the Android App is required to be installed."
   },
   {
      code: "auth/auth-domain-config-required",
      message: "Be sure to include authDomain when calling firebase.initializeApp(), by following the instructions in the Firebase console."
   },
   {
      code: "auth/missing-app-credential",
      message: "The phone verification request is missing an application verifier assertion. A reCAPTCHA response token needs to be provided."
   },
   {
      code: "auth/missing-verification-code",
      message: "The phone auth credential was created with an empty SMS verification code."
   },
   {
      code: "auth/missing-continue-uri",
      message: "A continue URL must be provided in the request."
   },
   {
      code: "auth/missing-iframe-start",
      message: "An internal AuthError has occurred."
   },
   {
      code: "auth/missing-ios-bundle-id",
      message: "An iOS Bundle ID must be provided if an App Store ID is provided."
   },
   {
      code: "auth/missing-or-invalid-nonce",
      message: "The request does not contain a valid nonce. This can occur if the SHA-256 hash of the provided raw nonce does not match the hashed nonce in the ID token payload."
   },
   {
      code: "auth/missing-multi-factor-info",
      message: "No second factor identifier is provided."
   },
   {
      code: "auth/missing-multi-factor-session",
      message: "The request is missing proof of first factor successful sign-in."
   },
   {
      code: "auth/missing-phone-number",
      message: "To send verification codes, provide a phone number for the recipient."
   },
   {
      code: "auth/missing-verification-id",
      message: "The phone auth credential was created with an empty verification ID."
   },
   {
      code: "auth/app-deleted",
      message: "This instance of FirebaseApp has been deleted."
   },
   {
      code: "auth/multi-factor-info-not-found",
      message: "The user does not have a second factor matching the identifier provided."
   },
   {
      code: "auth/multi-factor-auth-required",
      message: "Proof of ownership of a second factor is required to complete sign-in."
   },
   {
      code: "auth/account-exists-with-different-credential",
      message: "An account already exists with the same email address but different sign-in credentials. Sign in using a provider associated with this email address."
   },
   {
      code: "auth/network-request-failed",
      message: "A network AuthError (such as timeout, interrupted connection or unreachable host) has occurred."
   },
   {
      code: "auth/no-auth-event",
      message: "An internal AuthError has occurred."
   },
   {
      code: "auth/no-such-provider",
      message: "User was not linked to an account with the given provider."
   },
   {
      code: "auth/null-user",
      message: "A null user object was provided as the argument for an operation which requires a non-null user object."
   },
   {
      code: "auth/operation-not-allowed",
      message: "The given sign-in provider is disabled for this Firebase project. Enable it in the Firebase console, under the sign-in method tab of the Auth section."
   },
   {
      code: "auth/operation-not-supported-in-this-environment",
      message: "This operation is not supported in the environment this application is running on. 'location.protocol' must be http, https or chrome-extension and web storage must be enabled."
   },
   {
      code: "auth/popup-blocked",
      message: "Unable to establish a connection with the popup. It may have been blocked by the browser."
   },
   {
      code: "auth/popup-closed-by-user",
      message: "The popup has been closed by the user before finalizing the operation."
   },
   {
      code: "auth/provider-already-linked",
      message: "User can only be linked to one identity for the given provider."
   },
   {
      code: "auth/quota-exceeded",
      message: "The project's quota for this operation has been exceeded."
   },
   {
      code: "auth/redirect-cancelled-by-user",
      message: "The redirect operation has been cancelled by the user before finalizing."
   },
   {
      code: "auth/redirect-operation-pending",
      message: "A redirect sign-in operation is already pending."
   },
   {
      code: "auth/rejected-credential",
      message: "The request contains malformed or mismatching credentials."
   },
   {
      code: "auth/second-factor-already-in-use",
      message: "The second factor is already enrolled on this account."
   },
   {
      code: "auth/maximum-second-factor-count-exceeded",
      message: "The maximum allowed number of second factors on a user has been exceeded."
   },
   {
      code: "auth/tenant-id-mismatch",
      message: "The provided tenant ID does not match the Auth instance's tenant ID"
   },
   {
      code: "auth/timeout",
      message: "The operation has timed out."
   },
   {
      code: "auth/user-token-expired",
      message: "The user's credential is no longer valid. The user must sign in again."
   },
   {
      code: "auth/too-many-requests",
      message: "We have blocked all requests from this device due to unusual activity. Try again later."
   },
   {
      code: "auth/unauthorized-continue-uri",
      message: "The domain of the continue URL is not whitelisted.  Please whitelist the domain in the Firebase console."
   },
   {
      code: "auth/unsupported-first-factor",
      message: "Enrolling a second factor or signing in with a multi-factor account requires sign-in with a supported first factor."
   },
   {
      code: "auth/unsupported-persistence-type",
      message: "The current environment does not support the specified persistence type."
   },
   {
      code: "auth/unsupported-tenant-operation",
      message: "This operation is not supported in a multi-tenant context."
   },
   {
      code: "auth/unverified-email",
      message: "The operation requires a verified email."
   },
   {
      code: "auth/user-cancelled",
      message: "The user did not grant your application the permissions it requested."
   },
   {
      code: "auth/user-not-found",
      message: "No user record found with the provided credentials. The user may have been deleted or the user does not exist."
   },
   {
      code: "auth/user-disabled",
      message: "The user account has been disabled by an administrator."
   },
   {
      code: "auth/user-mismatch",
      message: "The supplied credentials do not correspond to the previously signed in user."
   },
   {
      code: "auth/weak-password",
      message: "The password must be 6 characters long or more."
   },
   {
      code: "auth/web-storage-unsupported",
      message: "This browser is not supported or 3rd party cookies and data may be disabled."
   },
   {
      code: "auth/already-initialized",
      message: "initiali"
   },
   {
      code: "cancelled",
      message: "The operation was cancelled (typically by the caller)."
   },
   {
      code: "unknown",
      message: "Unknown error or an error from a different error domain."
   },
   {
      code: "invalid-argument",
      message: "Client specified an invalid argument. Note that this differs from 'failed-precondition'"
   },
   {
      code: 'invalid-argument',
      message: "indicates arguments that are problematic regardless of the state of the system(e.g.an invalid field name)."
   },
   {
      code: "deadline-exceeded",
      message: "Deadline expired before operation could complete. For operations that change the state of the system, this error may be returned even if the operation has completed successfully. For example, a successful response from a server could have been delayed long enough for the deadline to expire."
   },
   {
      code: "not-found",
      message: "Some requested document was not found."
   },
   {
      code: "already-exists",
      message: "Some document that we attempted to create already exists."
   },
   {
      code: "permission-denied",
      message: "The caller does not have permission to execute the specified operation."
   },
   {
      code: "resource-exhausted",
      message: "Some resource has been exhausted, perhaps a per-user quota, or perhaps the entire file system is out of space."
   },
   {
      code: "failed-precondition",
      message: "Operation was rejected because the system is not in a state required for the operation's execution."
   },
   {
      code: "aborted",
      message: "The operation was aborted, typically due to a concurrency issue like transaction aborts, etc."
   },
   {
      code: "out-of-range",
      message: "Operation was attempted past the valid range."
   },
   {
      code: "unimplemented",
      message: "Operation is not implemented or not supported/enabled."
   },
   {
      code: "internal",
      message: "Internal errors. Means some invariants expected by underlying system has been broken. If you see one of these errors, something is very broken."
   },
   {
      code: "unavailable",
      message: "The service is currently unavailable. This is most likely a transient condition and may be corrected by retrying with a backoff."
   },
   {
      code: "data-loss",
      message: "Unrecoverable data loss or corruption."
   },
   {
      code: "unauthenticated",
      message: "The request does not have valid authentication credentials for the operation."
   }
];

export default ErrorMessages;