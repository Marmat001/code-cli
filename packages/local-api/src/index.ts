import express from 'express'
import { createProxyMiddleware } from 'http-proxy-middleware'
import path from 'path'
import { createUnitsRouter } from './routes/units'

export const officiate = (
  port: number,
  filename: string,
  dir: string,
  useProxy: boolean
) => {
  const app = express()

  app.use(createUnitsRouter(filename, dir))

  if (useProxy) {
    app.use(
      createProxyMiddleware({
        target: 'http://localhost:3000',
        ws: true,
        logLevel: 'silent',
      })
    )
  } else {
    const packagePath = require.resolve(
      '@noterjs/local-client/build/index.html'
    )
    app.use(express.static(path.dirname(packagePath)))
  }

  return new Promise<void>((res, rej) => {
    app.listen(port, res).on('error', rej)
  })
}
