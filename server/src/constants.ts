function envError(): string {
  throw new Error('Missing environment variable');
}

export const { APP_SECRET = envError() } = process.env;
