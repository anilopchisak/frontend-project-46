import { fileURLToPath } from 'url'
import path from 'path'
import * as fs from 'node:fs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const getFixturePath = (filepath) => {
  if (path.isAbsolute(filepath)) return filepath
  else if (filepath.includes('__fixtures__')) return path.resolve(__dirname, '..', filepath)
  return path.resolve(__dirname, '..', '__fixtures__', filepath)
}

export const readFile = filepath =>
  fs.readFileSync(getFixturePath(filepath), 'utf-8')
