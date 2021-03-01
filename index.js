const Redis = require('ioredis')

const defaults = {
  namespace: 'cache'
}

module.exports = function (smallify, options, done) {
  const opts = { ...defaults, ...options }

  const { url, namespace, ...redisOptions } = opts

  if (!smallify.hasDecorator('redis')) {
    smallify.decorate('redis', {})
  }

  const { redis } = smallify
  if (namespace in redis) {
    const e = new Error(`redis.${namespace} has already been registered`)
    return done(e)
  }

  let redisClient = null

  try {
    if (url) {
      redisClient = new Redis(url, redisOptions)
    } else {
      redisClient = new Redis(redisOptions)
    }

    smallify.addHook('onClose', async function () {
      return new Promise(resolve => {
        redisClient.quit(resolve)
      })
    })

    redis[namespace] = redisClient
    return done()
  } catch (e) {
    return done(e)
  }
}
