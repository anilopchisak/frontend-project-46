import { fileURLToPath } from 'node:url'
import path from 'node:path'
import * as fs from 'node:fs'
import genDiff from '../src/genDiff.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const fixturesPath = path.join(__dirname, '..', '__fixtures__')

const expectedStylish = fs.readFileSync(path.resolve(fixturesPath, 'expected_stylish.txt'), 'utf-8')
const expectedPlain = fs.readFileSync(path.resolve(fixturesPath, 'expected_plain.txt'), 'utf-8')
const expectedJson = JSON.stringify(JSON.parse(fs.readFileSync(path.resolve(fixturesPath, 'expected_json.json'), 'utf-8')))

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
