import handleParse from './parsers/handleParse.js'
import handleGenDiff from './diff/handleGenDiff.js'
import iFormatter from './formatters/index.js'
import { readFile } from './readFile.js'
import path from 'node:path'

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const data1 = readFile(filepath1)
  const extName1 = path.extname(filepath1)
  const parsedData1 = handleParse(data1, extName1)

  const data2 = readFile(filepath2)
  const extName2 = path.extname(filepath2)
  const parsedData2 = handleParse(data2, extName2)

  const diff = handleGenDiff(parsedData1, parsedData2)
  const formatter = iFormatter(formatName)
  const formattedDiff = formatter(diff)
  return formattedDiff
}
