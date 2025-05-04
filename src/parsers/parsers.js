import yaml from 'js-yaml'

const parsers = {
  '.json': JSON.parse,
  '.yml': yaml.load,
  '.yaml': yaml.load,
}

export default (format) => {
  const parse = parsers[format]
  if (!parse) {
    throw new Error(`Unsupported format: ${format}`)
  }
  return parse
}
