import { Logger } from '@david.uhlir/context-log'

Logger.attach()

;(async function() {
  await Logger.runInNamespace('namespace-1', async () => {
    console.log('My log')

    const result = await Logger.runInNamespace('namespace-2', async () => {
      console.log('My nested log')
      return true
    })
  })
})()
