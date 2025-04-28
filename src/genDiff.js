import _ from 'lodash'

export default ([data1, data2]) => {
  const result = {}
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const keys = _.union(keys1, keys2).sort()
  keys.forEach((key) => {
    if (!Object.hasOwn(data1, key)) {
      result[`+ ${key}`] = data2[key]
    }
    else if (!Object.hasOwn(data2, key)) {
      result[`- ${key}`] = data1[key]
    }
    else if (data1[key] !== data2[key]) {
      result[`- ${key}`] = data1[key]
      result[`+ ${key}`] = data2[key]
    }
    else {
      result[key] = data2[key]
    }
  })
  console.log(result)
  return JSON.stringify(result)
}
