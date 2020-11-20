const captureWebsite = require('capture-website');

export const snapWebsite = async (
  url: string,
  outputPath: string,
): Promise<Buffer> => {
  return await captureWebsite.file(url, outputPath);
};
