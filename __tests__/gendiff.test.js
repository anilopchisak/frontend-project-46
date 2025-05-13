import path from 'node:path'
import genDiff from '../src/genDiff.js'
import { readFile } from '../src/readFile.js'

const expectedStylish = readFile('expected_stylish.txt', '__fixtures__')
const expectedPlain = readFile('expected_plain.txt', '__fixtures__')
const expectedJson = JSON.stringify(JSON.parse(readFile('expected_json.json', '__fixtures__')))

const cases = [
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yaml'],
  ['file1.yml', 'file2.json'],
  ['file1.json', 'file2.yaml'],
]

describe.each(cases)('genDiff', (filename1, filename2) => {
  test('stylish', () => {
    const diff = genDiff(path.join('__fixtures__', filename1), path.join('__fixtures__', filename2))
    expect(diff).toEqual(expectedStylish)
  })
  test('plain', () => {
    const diff = genDiff(path.join('__fixtures__', filename1), path.join('__fixtures__', filename2), 'plain')
    expect(diff).toEqual(expectedPlain)
  })
  test('json', () => {
    const diff = genDiff(path.join('__fixtures__', filename1), path.join('__fixtures__', filename2), 'json')
    expect(diff).toEqual(expectedJson)
  })
})
