const Smallify = require('smallify')
const smallifyRedis = require('./index')

const smallify = Smallify({
  pino: {
    level: 'info',
    prettyPrint: true
  }
})

smallify.register(
  async function (ins1) {
    ins1.register(smallifyRedis, {
      url: 'redis://',
      namespace: 'test'
      // name: 'test'
    })

    ins1.register(
      async function (ins2) {
        ins2.register(smallifyRedis, {
          url: 'redis://',
          namespace: 'test',
          name: 'exam'
        })
      },
      { name: 'ins2' }
    )
  },
  {
    name: 'ins1'
  }
)

smallify.ready(async err => {
  err && smallify.$log.error(err.message)
  // console.log(smallify.redis)
  // const { test: cache } = smallify.redis
  // await cache.set('testKey', 'testValue')
  // const val = await cache.get('testKey')
  // console.log({ val })
  smallify.print()
})
