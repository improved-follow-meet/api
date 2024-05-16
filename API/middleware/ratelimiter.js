import { createClient } from 'redis';
import { RateLimiterRedis } from 'rate-limiter-flexible';

const redisClient = createClient({
  url:process.env.REDIS_ENDPOINT_URI,
});

redisClient.on('error', (err) => console.log('Redis Client Error', err));

await redisClient.connect();

const opts= {
  storeClient: redisClient,
  keyPrefix: 'middleware',
  points: 50, // requests
  duration: 10, // per second
};
const rateLimiter = new RateLimiterRedis(opts);

const rateLimiterMiddleware = (req, res, next) => {
  console.log(`Request: ${req.ip}`)
  rateLimiter.consume(req.connection.remoteAddress)
    .then(() => {
      // console.log(`Request allowed: ${req.ip}`);
      next();
    })
    .catch((rejRes) => {
      // console.log(`Too many requests: ${req.ip}`);
      // console.log(rejRes.message);
      res.status(429).send('Too Many Requests');
    });
};

export default rateLimiterMiddleware;
