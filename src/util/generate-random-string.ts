import crypto from 'crypto';

export const generateRandomString = (length = 4) => {
  return crypto.randomBytes(length).toString('hex');
};
