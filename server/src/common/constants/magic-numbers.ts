// common
export const defaultPort = 3000;
// auth
export const minLengthPasswordValidation = 8;
export const minLengthUsernameValidation = 4;
export const passwordMatchPattern = /^(?=.*[A-Za-z])(?=.*\d)[\dA-Za-z]{8,}$/;
export const emailTokenExpiresIn = '1h';

// crypto
export const cryptoIterations = 1000;
export const cryptoKeylen = 64;
export const cryptoDigest = 'sha512';
export const emailTokenExpiresAt = '1h';
