module.exports = {
  auth: {
    secret: process.env.ADMIN_AUTH_SECRET || 'verdealiva_admin_secret',
  },
  apiToken: {
    salt: process.env.API_TOKEN_SALT || 'verdealiva_api_token',
  },
  transfer: {
    token: {
      salt: process.env.TRANSFER_TOKEN_SALT || 'verdealiva_transfer',
    },
  },
};
