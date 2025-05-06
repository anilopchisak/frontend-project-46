import handleParse from './parsers/handleParse.js'
import handleGenDiff from './diff/handleGenDiff.js'
import iFormatter from './formatters/index.js'

export default function genDiff(filepath1, filepath2, formatName = 'stylish') {
  const parsed = handleParse([filepath1, filepath2])
  const diff = (handleGenDiff(parsed))
  const formatter = iFormatter(formatName)
  const formattedDiff = formatter(diff)
  console.log(formattedDiff)
  return formattedDiff
}
