import { RedisPubSub } from "graphql-redis-subscriptions";
import Redis from "ioredis";

// const options = {
// 	host: "127.0.0.1",
// 	port: 6379,
// 	retryStrategy: (times: any) => {
// 		// reconnect after
// 		return Math.min(times * 50, 2000);
// 	}
// };

export const redis = new Redis();

export const pubsub = new RedisPubSub({
	connection:{
    host: '127.0.0.1',
    port: 6379,
    retryStrategy: options=>Math.max(options*100,3000)
  }
});
