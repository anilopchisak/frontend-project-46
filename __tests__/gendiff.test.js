import { fileURLToPath } from 'url'
import path from 'path'
import fs from 'fs'
import handleParse from '../src/handleParse.js'
import genDiff from '../src/genDiff.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => 
    path.join(__dirname, '..', '__fixtures__', filename);

const readFile = (filename) => 
    JSON.stringify(JSON.parse(
        fs.readFileSync(getFixturePath(filename), 'utf-8')
    ));

describe('genDIff', () => {
    test('Flat JSON files comparison', () => {
        const filepath1 = getFixturePath('file1.json');
        const filepath2 = getFixturePath('file2.json');

        const parsed = handleParse([filepath1, filepath2]);
        const diff = genDiff(parsed);

        const expected = readFile('expected.json');

        expect(diff).toEqual(expected);
    });
});