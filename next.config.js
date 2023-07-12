const webpack = require('webpack')

// const { parsed: myEnv } = require('dotenv').config({
//   path: './.env'
// });
require('dotenv').config();

const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['lh3.googleusercontent.com'],
  },
  // Add the following if you need to allow specific paths within the domain
  // The path can be adjusted based on your requirements
  async rewrites() {
    return [
      {
        source: '/a/:path*',
        destination: 'https://lh3.googleusercontent.com/a/:path*',
      },
    ];
  },
};

// const defaultEnv = {
//   GOOGLE_ID: process.env.GOOGLE_ID || 'default-google-id',
//   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET || 'default-client-secret',
//   MONGODB_URI: process.env.MONGODB_URI || 'default-mongodb-uri',
//   NEXTAUTH_URL: process.env.NEXTAUTH_URL || 'default-nextauth-url',
//   NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET || 'default-nextauth-secret',
// };

module.exports = nextConfig
// module.exports =  {
//   ...nextConfig,
//   webpack(config) {
//     // config.plugins.push(new webpack.EnvironmentPlugin(defaultEnv))
//     return config
//   }
// }
