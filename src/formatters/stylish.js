import { DIFF_STATUS } from '../utils/consts.js'
import _ from 'lodash'

const genSpecChar = (type) => {
  switch (type) {
    case (DIFF_STATUS.ADDED): return '+ '
    case (DIFF_STATUS.REMOVED): return '- '
    default: return '  '
  }
}

const genIndent = (depth, nodeType = DIFF_STATUS.UNCHANGED, spacesCount = 4) => {
  const indent = depth * spacesCount - 2
  return indent > 0 ? ' '.repeat(depth * spacesCount - 2) + genSpecChar(nodeType) : ''
}

const formatValue = (value, depth) => {
  if (_.isPlainObject(value)) {
    const lines = Object.entries(value).map(([key, val]) => {
      return `${genIndent(depth + 1)}${key}: ${formatValue(val, depth + 1)}`
    })
    return `{\n${lines.join('\n')}\n${genIndent(depth)}}`
  }
  return value
}

const stylish = (diffTree) => {
  const iter = (nodes, depth = 1) => {
    const lines = nodes.map((node) => {
      switch (node.type) {
        case (DIFF_STATUS.UPDATED): {
          const oldValue = `${genIndent(depth, DIFF_STATUS.REMOVED)}${node.key}: ${formatValue(node.oldValue, depth)}`
          const newValue = `${genIndent(depth, DIFF_STATUS.ADDED)}${node.key}: ${formatValue(node.newValue, depth)}`
          return `${oldValue}\n${newValue}`
        }
        case (DIFF_STATUS.NESTED): {
          return `${genIndent(depth, node.type)}${node.key}: ${iter(node.children, depth + 1)}`
        }
        default: {
          return `${genIndent(depth, node.type)}${node.key}: ${formatValue(node.value, depth)}`
        }
      }
    })

    return `{\n${lines.join('\n')}\n${genIndent(depth - 1)}}`
  }

  return iter(diffTree)
}

export default stylish
