import { Smallify } from 'smallify'
import IORedis from 'ioredis'
import { SmallifyRedisOptions, SmallifyRedis } from './types/options'

declare const redis: SmallifyRedis

export = redis

interface Redis {
  [key: string]: IORedis.Redis
}

declare module 'smallify' {
  interface SmallifyPlugin {
    (plugin: SmallifyRedis, opts: SmallifyRedisOptions): Smallify
  }

  interface Smallify {
    redis: Redis
  }
}
