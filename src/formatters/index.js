import stylish from './stylish.js'
import plain from './plain.js'
import json from './json.js'

export default (formatName) => {
  switch (formatName) {
    case ('stylish'): {
      return stylish
    }
    case ('plain'): {
      return plain
    }
    case ('json'): {
      return json
    }
    default: throw new Error(`No such formatter.\nTry one of available formatters: stylish, plain or json\n\n`)
  }
}
