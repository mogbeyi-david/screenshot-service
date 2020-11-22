import { randomBytes } from 'crypto';

export function throwIfUndefined<T>(x: T | undefined, name?: string): T {
  if (x === undefined) {
    throw new Error(`${name} must not be undefined`);
  }
  return x;
}

/**
 * Appends a random string to the DB name of the connection string
 *
 * @export
 * @param {string} url  - Connection string
 * @returns {string}
 */
export function randomizeMongoURL(url: string): string {
  return url.replace(
    /([^/]\/)([^/][a-zA-Z-_0-9]+)/,
    `$1${randomBytes(4).toString('hex')}`,
  );
}
