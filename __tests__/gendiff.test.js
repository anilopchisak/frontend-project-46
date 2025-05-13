import { fileURLToPath } from 'node:url';
import path from 'node:path'
import genDiff from '../src/genDiff.js'
import { readFile } from '../src/readFile.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fixturesPath = path.join(__dirname, '..', '__fixtures__')

const expectedStylish = readFile('expected_stylish.txt', fixturesPath)
const expectedPlain = readFile('expected_plain.txt', fixturesPath)
const expectedJson = JSON.stringify(JSON.parse(readFile('expected_json.json', fixturesPath)))

const pairs = [
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yaml'],
  ['file1.yml', 'file2.json'],
  ['file1.json', 'file2.yaml'],
]

const cases = pairs.map(([file1, file2]) => [
  path.join(fixturesPath, file1),
  path.join(fixturesPath, file2),
])

describe.each(cases)('genDiff', (filename1, filename2) => {
  test('stylish', () => {
    const diff = genDiff(filename1, filename2)
    expect(diff).toEqual(expectedStylish)
  })
  test('plain', () => {
    const diff = genDiff(filename1, filename2, 'plain')
    expect(diff).toEqual(expectedPlain)
  })
  test('json', () => {
    const diff = genDiff(filename1, filename2, 'json')
    expect(diff).toEqual(expectedJson)
  })
})
