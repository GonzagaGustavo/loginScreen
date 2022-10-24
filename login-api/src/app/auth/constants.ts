export const jwtSecret = 'elisa-api-secret-token';

export const googleSecret = {
  client_id:
    '340121538638-d520s70441vsptian29ajdkmlr8cbigl.apps.googleusercontent.com',
  project_id: 'elisa-oauth-dev',
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  client_secret: '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',
  redirect_uris: ['http://localhost:3000/api/auth/google/callback'],
  javascript_origins: ['http://localhost:3001'],
};
