const rateLimit = require('express-rate-limit');
const RedisStore = require('rate-limit-redis');
const Redis = require('ioredis');
const redisClient = new Redis();

const rateLimiter = rateLimit({
  store: new RedisStore({
    client: redisClient,
  }),
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10, // limit each IP to 10 requests per windowMs
  keyGenerator: (req) => req.headers['api-key'],
  handler: (req, res) => {
    res.status(429).json({ message: 'Too many requests, please try again later.' });
  },
});

module.exports = rateLimiter;
