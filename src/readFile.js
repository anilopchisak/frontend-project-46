import path from 'path'
import * as fs from 'node:fs'

export const readFile = (filepath, dir = process.cwd()) => {
  const hasDirectory = filepath.includes('/') || filepath.includes('\\')
  const formattedPath = hasDirectory ? filepath : path.join('__fixtures__', filepath)
  return fs.readFileSync(path.resolve(dir, formattedPath), 'utf-8')
}
