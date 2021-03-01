import { Smallify, PluginOptions } from 'smallify'
import IORedis from 'ioredis'

export class SmallifyRedisOptions extends PluginOptions {
  namespace: string
  url?: string
  redis?: IORedis.RedisOptions
}

export type SmallifyRedis = {
  (smallify: Smallify, opts: SmallifyRedisOptions): Promise<void>
}
