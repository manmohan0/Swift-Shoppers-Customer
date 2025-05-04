import { createClient } from 'redis';

export const connectRedis = async () => {
    try {
        const redisClient = createClient()
        redisClient.on('error', (err) => {
            console.log('Redis Client Error', err)
            throw err
        });
        await redisClient.connect()
        console.log('Connected to Redis')
        return redisClient
    } catch (error) {
        console.error('Error connecting to Redis:', error);
        return null
    }
}   