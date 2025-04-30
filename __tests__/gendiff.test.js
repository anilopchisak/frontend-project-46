import handleParse from '../src/handleParse.js'
import genDiff from '../src/genDiff.js'
import { readFile } from '../src/readFile.js'

describe('genDiff', () => {
  test('Flat JSON files comparison', () => {
    const parsed = handleParse(['file1.json', 'file2.json'])
    const diff = genDiff(parsed)
    const expected = readFile('expected.txt')
    expect(diff).toEqual(expected)
  })

  test('Flat yaml files comparison', () => {
    const parsed = handleParse(['file1.yml', 'file2.yaml'])
    const diff = genDiff(parsed)
    const expected = readFile('expected.txt')
    expect(diff).toEqual(expected)
  })
})
