/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env:{
        MONGO_URL : process.env.MONGO_URL,
        TOKEN_SECRET : process.env.TOKEN_SECRET
    }
}

module.exports = nextConfig
