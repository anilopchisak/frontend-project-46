// import { fileURLToPath } from 'url'
import path from 'path'
import * as fs from 'node:fs'

// const __filename = fileURLToPath(import.meta.url)
// const __dirname = path.dirname(__filename)

export const readFile = (filepath) => {
  if (!filepath.includes('\\')) return fs.readFileSync(path.resolve('__fixtures__', filepath), 'utf-8')
  return fs.readFileSync(path.resolve(filepath), 'utf-8')
}
