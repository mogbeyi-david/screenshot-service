const captureWebsite = require('capture-website');

export const snapWebsite = async (url: string): Promise<Buffer> => {
  return captureWebsite.buffer(url);
};
