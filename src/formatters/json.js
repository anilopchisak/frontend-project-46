import { DIFF_STATUS } from '../utils/consts.js'

export default (diff) => {
  const iter = (nodes, parent = {}) => {
    nodes.forEach((node) => {
      switch (node.type) {
        case (DIFF_STATUS.ADDED):
        case (DIFF_STATUS.UNCHANGED): {
          parent[node.key] = node.value
          return
        }
        case (DIFF_STATUS.UPDATED): {
          parent[node.key] = node.newValue
          return
        }
        case (DIFF_STATUS.NESTED): {
          parent[node.key] = iter(node.children, {})
          return
        }
        default: {
          return
        }
      }
    })
    return parent
  }

  return JSON.stringify(iter(diff))
}
