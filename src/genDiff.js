import _ from 'lodash'

export default ([data1, data2]) => {
  let result = '{\n'
  const keys1 = Object.keys(data1)
  const keys2 = Object.keys(data2)
  const keys = _.union(keys1, keys2).sort()
  keys.forEach((key) => {
    if (!Object.hasOwn(data1, key)) {
      result += `  + ${key}: ${data2[key]}\n`
    }
    else if (!Object.hasOwn(data2, key)) {
      result += `  - ${key}: ${data1[key]}\n`
    }
    else if (data1[key] !== data2[key]) {
      result += `  - ${key}: ${data1[key]}\n`
      result += `  + ${key}: ${data2[key]}\n`
    }
    else {
      result += `    ${key}: ${data2[key]}\n`
    }
  })
  result += `}`
  console.log(result)
  return result
}
