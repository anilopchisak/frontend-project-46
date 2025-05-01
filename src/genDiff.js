import _ from 'lodash'
import formatStylish from '../src/stylish.js'

const DIFF_STATUS = {
  ADDED: 'added',
  UPDATED: 'updated',
  REMOVED: 'removed',
  UNCHANGED: 'unchanged',
  NESTED: 'nested',
}

const getCommonKeys = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const keys = _.union(keys1, keys2).sort()
  return keys
}

const createNode = (key, type, value1 = undefined, value2 = undefined) => {
  switch (type) {
    case (DIFF_STATUS.UPDATED): {
      return {
        key: key,
        type: type,
        oldValue: value1,
        newValue: value2,
      }
    }
    case (DIFF_STATUS.NESTED): {
      return {
        key: key,
        type: type,
        children: [],
      }
    }
    // added, removed, unchanged
    default: {
      return {
        key: key,
        type: type,
        value: value1,
      }
    }
  }
}

const genDiff = ([data1, data2]) => {
  const diffTree = []

  const iter = (keys, outputArr, obj1, obj2, depth = 1) => {
    keys.forEach((key) => {
      // if key added
      if (!Object.hasOwn(obj1, key)) {
        outputArr.push(createNode(key, DIFF_STATUS.ADDED, obj2[key]))
      }
      // if key deleted
      else if (!Object.hasOwn(obj2, key)) {
        outputArr.push(createNode(key, DIFF_STATUS.REMOVED, obj1[key]))
      }
      // if data[key] is not an object
      else if (!_.isObject(data1[key])) {
        if (data1[key] !== data2[key]) {
          outputArr.push(createNode(key, DIFF_STATUS.UPDATED, obj1[key], obj2[key]))
        }
        else {
          outputArr.push(createNode(key, DIFF_STATUS.UNCHANGED, obj2[key]))
        }
      }
      // if data[key] is an object
      else {
        // create nested node with array of children nodes
        const nestedNode = createNode(key, DIFF_STATUS.NESTED)
        // using mutation fill children array
        iter(getCommonKeys(data1[key], data2[key]), nestedNode.children, data1[key], data2[key], depth + 1)
        // fill output array with filled nested node
        outputArr.push(nestedNode)
      }
    })
  }

  iter(getCommonKeys(data1, data2), diffTree, data1, data2)
  console.log(formatStylish(diffTree))
}

export default genDiff
