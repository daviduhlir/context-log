# Context namespace base log for async closure

This util is usefull to prefix logs by namespace based on async context. Using method `runInNamespace` on Logger class, provides ability to push namespace in front of any log, so more detailed info will be provided. To create instance just simply call `Logger.attach(...)`, which will provides replacement of console and wrap it by namespace.

Example:
```ts
import { Logger } from '@david.uhlir/context-log'

Logger.attach(console)

await Logger.runInNamespace('namespace-1', async () => {
  console.log('My log')

  const result = await Logger.runInNamespace('namespace-2', async () => {
    console.log('My nested log')
    return true
  })
})
```
