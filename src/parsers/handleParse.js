import parsers from './parsers.js'

export default (data, extName) => {
  const parse = parsers(extName)
  const parsedFile = parse(data)
  return parsedFile
}
