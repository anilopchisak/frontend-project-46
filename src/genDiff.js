import handleParse from './parsers/handleParse.js'
import handleGenDiff from './diff/handleGenDiff.js'
import iFormatter from './formatters/index.js'
import { readFile } from './readFile.js'
import path from 'node:path'

export default function genDiff(filepath1, filepath2, formatterName = 'stylish') {
  const data1 = readFile(filepath1)
  const formatName1 = path.extname(filepath1).split('.').pop()
  const parsedData1 = handleParse(data1, formatName1)

  const data2 = readFile(filepath2)
  const formatName2 = path.extname(filepath2).split('.').pop()
  const parsedData2 = handleParse(data2, formatName2)

  const diff = handleGenDiff(parsedData1, parsedData2)
  const formatter = iFormatter(formatterName)
  const formattedDiff = formatter(diff)
  return formattedDiff
}
