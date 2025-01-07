import Redis from "ioredis"

const RedisConnection = ()=>{
    const port = +(process.env.REDIS_PORT??0) as number
    const host = process.env.REDIS_HOST as string
    const password = process.env.REDIS_PASSWORD as string
    const redis = new Redis({
        host,
        port,
        password
    })
    redis.on('connect', () => {
        console.log('Connected to Redis')
    })
    redis.on('error', (err) => {
        console.error(`Error connecting to Redis: ${err}`)
    })
    return redis
}
const redis = null 
export default redis