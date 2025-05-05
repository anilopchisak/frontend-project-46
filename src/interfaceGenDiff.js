import handleParse from './parsers/handleParse.js'
import genDiff from './diff/genDiff.js'
import iFormatter from './formatters/index.js'

const interfaceGenDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const parsed = handleParse([filepath1, filepath2])
  const diff = (genDiff(parsed))
  const formatter = iFormatter(formatName)
  return formatter(diff)
}

export default interfaceGenDiff
