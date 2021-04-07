import express from 'express'
import fs from 'fs/promises'
import path from 'path'

interface Unit {
  id: string
  content: string
  type: 'text' | 'code'
}

export const createUnitsRouter = (filename: string, dir: string) => {
  const router = express.Router()
  router.use(express.json())

  const fullPath = path.join(dir, filename)

  router.get('/units', async (req, res) => {
    try {
      const response = await fs.readFile(fullPath, { encoding: 'utf-8' })

      res.send(JSON.parse(response))
    } catch (error) {
      if (error.code === 'ENOENT') {
        await fs.writeFile(fullPath, '[]', 'utf-8')
        res.send([])
      } else {
        throw error
      }
    }
  })

  router.post('/units', async (req, res) => {
    const { units }: { units: Unit[] } = req.body

    await fs.writeFile(fullPath, JSON.stringify(units), 'utf-8')

    res.send({ status: 'ok' })
  })

  return router
}
