import { DIFF_STATUS } from '../utils/consts.js'

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

export default createNode
