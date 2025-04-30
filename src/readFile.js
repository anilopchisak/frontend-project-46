import { fileURLToPath } from 'url'
import path from 'path'
import * as fs from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = filename =>
  path.join(__dirname, '..', '__fixtures__', filename)

export const readFile = filename =>
  fs.readFileSync(getFixturePath(filename), 'utf-8', (err, data) => {
    if (err) throw err
    console.log(data)
  })
