import parsers from '../src/parsers.js'
import path from 'node:path'
import { readFile } from './readFile.js'

export default (paths) => {
  const parsed = paths
    .map((filePath) => {
      const data = readFile(filePath)
      const parse = parsers(path.extname(filePath))
      const parsedFile = parse(data)
      return parsedFile
    })
  return parsed
}
