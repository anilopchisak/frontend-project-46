import handleParse from '../src/handleParse.js'
import genDiff from '../src/genDiff.js'
import { readFile } from '../src/readFile.js'

const expected = readFile('expected.txt')

describe('genDiff', () => {
  test('json files', () => {
    const parsed = handleParse(['file1.json', 'file2.json'])
    const diff = genDiff(parsed)
    expect(diff).toEqual(expected)
  })

  test('yaml/yml files', () => {
    const parsed = handleParse(['file1.yml', 'file2.yaml'])
    const diff = genDiff(parsed)
    expect(diff).toEqual(expected)
  })

  test('yaml and json files', () => {
    const parsed = handleParse(['file1.yml', 'file2.json'])
    const diff = genDiff(parsed)
    expect(diff).toEqual(expected)
  })
})
