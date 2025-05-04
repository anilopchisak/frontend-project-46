import { DIFF_STATUS } from '../utils/consts.js'
import _ from 'lodash'

export default (diff) => {
  const iter = (nodes, depthStr = '') => {
    const lines = nodes.map((node) => {
      switch (node.type) {
        case (DIFF_STATUS.ADDED): {
          return `Property '${depthStr}${node.key}' was added with value: ${formatValue(node.value)}`
        }
        case (DIFF_STATUS.REMOVED): {
          return `Property '${depthStr}${node.key}' was removed`
        }
        case (DIFF_STATUS.UPDATED): {
          return `Property '${depthStr}${node.key}' was updated. From ${formatValue(node.oldValue)} to ${formatValue(node.newValue)}`
        }
        case (DIFF_STATUS.NESTED): {
          return iter(node.children, `${depthStr}${node.key}.`)
        }
        default: {
          break
        }
      }
    })

    return _.union(lines.flat())
  }

  const formatValue = (value) => {
    if (_.isPlainObject(value)) return `[complex value]`
    else if (typeof value === 'string') return `'${value}'`
    return value
  }

  return iter(diff).filter(item => !_.isNil(item)).join('\n')
}
