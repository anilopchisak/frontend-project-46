import interfaceGenDiff from '../src/interfaceGenDiff.js'
import { readFile } from '../src/utils/readFile.js'

const expectedStylish = readFile('expected_stylish.txt')
const expectedPlain = readFile('expected_plain.txt')

const cases = [
  ['file1.json', 'file2.json'],
  ['file1.yml', 'file2.yaml'],
  ['file1.yml', 'file2.json'],
  ['file1.json', 'file2.yaml'],
]

describe.each(cases)('genDiff', (filename1, filename2) => {
  test('plain', () => {
    const diff = interfaceGenDiff(filename1, filename2, 'plain')
    expect(diff).toEqual(expectedPlain)
  })
  test('stringfy', () => {
    const diff = interfaceGenDiff(filename1, filename2)
    expect(diff).toEqual(expectedStylish)
  })
})

// describe('genDiff stylish', () => {
//   test('json files', () => {
//     const parsed = handleParse(['file1.json', 'file2.json'])
//     const diff = genDiff(parsed)
//     const formattedDiff = stylish(diff)
//     expect(formattedDiff).toEqual(expectedStylish)
//     expect(formattedDiff).toEqual(expectedPlain)
//   })

//   test('yaml/yml files', () => {
//     const parsed = handleParse(['file1.yml', 'file2.yaml'])
//     const diff = genDiff(parsed)
//     const formattedDiff = stylish(diff)
//     expect(formattedDiff).toEqual(expectedStylish)
//     expect(formattedDiff).toEqual(expectedPlain)
//   })

//   test('yaml and json files', () => {
//     const parsed = handleParse(['file1.yml', 'file2.json'])
//     const diff = genDiff(parsed)
//     const formattedDiff = stylish(diff)
//     expect(formattedDiff).toEqual(expectedStylish)
//     expect(formattedDiff).toEqual(expectedPlain)
//   })
// })

// describe('genDiff plain', () => {
//   test('json files', () => {
//     const parsed = handleParse(['file1.json', 'file2.json'])
//     const diff = genDiff(parsed)
//     const formattedDiff = stylish(diff)
//     expect(formattedDiff).toEqual(expectedStylish)
//     expect(formattedDiff).toEqual(expectedPlain)
//   })

//   test('yaml/yml files', () => {
//     const parsed = handleParse(['file1.yml', 'file2.yaml'])
//     const diff = genDiff(parsed)
//     const formattedDiff = stylish(diff)
//     expect(formattedDiff).toEqual(expectedStylish)
//     expect(formattedDiff).toEqual(expectedPlain)
//   })

//   test('yaml and json files', () => {
//     const parsed = handleParse(['file1.yml', 'file2.json'])
//     const diff = genDiff(parsed)
//     const formattedDiff = stylish(diff)
//     expect(formattedDiff).toEqual(expectedStylish)
//     expect(formattedDiff).toEqual(expectedPlain)
//   })
// })
