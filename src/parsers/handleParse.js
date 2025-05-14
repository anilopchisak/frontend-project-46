import parsers from './parsers.js'

export default (data, formatName) => {
  const parse = parsers(formatName)
  const parsedFile = parse(data)
  return parsedFile
}
