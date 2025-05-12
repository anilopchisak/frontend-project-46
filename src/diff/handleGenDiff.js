import _ from 'lodash'
import { DIFF_STATUS } from '../utils/consts.js'

const getCommonKeys = (data1, data2) => {
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  return _.union(keys1, keys2).sort()
}

const handleGenDiff = (data1, data2) => {
  const iter = (keys, d1, d2) => {
    const diff = keys.map((key) => {
      if (!Object.hasOwn(d1, key)) {
        return {
          key: key,
          type: DIFF_STATUS.ADDED,
          value: d2[key],
        }
      }
      else if (!Object.hasOwn(d2, key)) {
        return {
          key: key,
          type: DIFF_STATUS.REMOVED,
          value: d1[key],
        }
      }
      else if (_.isPlainObject(d1[key]) && _.isPlainObject(d2[key])) {
        return {
          key: key,
          type: DIFF_STATUS.NESTED,
          children: iter(getCommonKeys(d1[key], d2[key]), d1[key], d2[key]),
        }
      }
      else if (d1[key] !== d2[key]) {
        return {
          key: key,
          type: DIFF_STATUS.UPDATED,
          oldValue: d1[key],
          newValue: d2[key],
        }
      }
      else {
        return {
          key: key,
          type: DIFF_STATUS.UNCHANGED,
          value: d1[key],
        }
      }
    })
    return diff
  }

  return iter(getCommonKeys(data1, data2), data1, data2)
}

export default handleGenDiff
