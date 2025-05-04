import _ from 'lodash'
import { DIFF_STATUS } from '../utils/consts.js'
import createNode from './createNode.js'

const getCommonKeys = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  return _.union(keys1, keys2).sort()
}

const genDiff = ([data1, data2]) => {
  const diffTree = []

  const iter = (keys, accumulator, obj1, obj2, depth = 1) => {
    keys.forEach((key) => {
      // if key added
      if (!Object.hasOwn(obj1, key)) {
        accumulator.push(createNode(key, DIFF_STATUS.ADDED, obj2[key]))
      }

      // if key deleted
      else if (!Object.hasOwn(obj2, key)) {
        accumulator.push(createNode(key, DIFF_STATUS.REMOVED, obj1[key]))
      }

      // if one of obj[key] is NOT an object
      else if (!_.isPlainObject(obj1[key]) || !_.isPlainObject(obj2[key])) {
        // updated
        if (obj1[key] !== obj2[key]) {
          accumulator.push(createNode(key, DIFF_STATUS.UPDATED, obj1[key], obj2[key]))
        }
        // unchanged
        else {
          accumulator.push(createNode(key, DIFF_STATUS.UNCHANGED, obj2[key]))
        }
      }

      // if both obj[key] are objects
      else {
        // create nested node with array of children nodes
        const nestedNode = createNode(key, DIFF_STATUS.NESTED)
        // using mutation fill children array
        iter(getCommonKeys(obj1[key], obj2[key]), nestedNode.children, obj1[key], obj2[key], depth + 1)
        // fill output array with filled nested node
        accumulator.push(nestedNode)
      }
    })
  }

  iter(getCommonKeys(data1, data2), diffTree, data1, data2)
  return diffTree
}

export default genDiff
