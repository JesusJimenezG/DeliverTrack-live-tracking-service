const config = {
    server: {
        url: process.env.URL || 'http://localhost:4002',
        port: process.env.PORT || 4002,
        host: process.env.HOST || '0.0.0.0'
    },
    secret: {
        jwt_secret: process.env.JWT_SECRET || 'secret'
    },
    redis: {
        url: process.env.REDIS_HOST || 'redis://localhost:6379'
    }
};

export default config;
