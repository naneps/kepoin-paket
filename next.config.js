/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    // Reference a variable that was defined in the .env file and make it available at Build Time
    API_RESI: process.env.API_RESI,
    API_RESI_KEY: process.env.API_RESI_KEY,
  },
};

module.exports = nextConfig;
