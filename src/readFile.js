import path from 'path'
import * as fs from 'node:fs'

export const readFile = (filepath, dir = process.cwd()) => {
  return fs.readFileSync(path.resolve(dir, filepath), 'utf-8')
}
