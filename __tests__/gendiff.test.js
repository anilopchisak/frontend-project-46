import interfaceGenDiff from '../src/interfaceGenDiff.js'
import { readFile } from '../src/readFile.js'

const expectedStylish = readFile('expected_stylish.txt')
const expectedPlain = readFile('expected_plain.txt')
const expectedJson = JSON.stringify(JSON.parse(readFile('expected_json.json')))

const cases = [
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yaml'],
  ['file1.yml', 'file2.json'],
  ['file1.json', 'file2.yaml'],
]

describe.each(cases)('genDiff', (filename1, filename2) => {
  test('stylish', () => {
    const diff = interfaceGenDiff(filename1, filename2)
    expect(diff).toEqual(expectedStylish)
  })
  test('plain', () => {
    const diff = interfaceGenDiff(filename1, filename2, 'plain')
    expect(diff).toEqual(expectedPlain)
  })
  test('json', () => {
    const diff = interfaceGenDiff(filename1, filename2, 'json')
    expect(diff).toEqual(expectedJson)
  })
})
