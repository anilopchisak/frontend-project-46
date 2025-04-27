import { Command } from "commander";
import path from 'node:path';
import handleParse from "./src/handleParse.js";
import _ from 'lodash';

const genDiff = ([data1, data2]) => {
    const result = {};
    const keys1 = Object.keys(data1);
    const keys2 = Object.keys(data2);
    const keys = _.union(keys1, keys2);
    keys.forEach((key) => {
        if (!Object.hasOwn(data1, key)) {
            result[`+ ${key}`] = data2[key];
        }
        else if (!Object.hasOwn(data2, key)) {
            result[`- ${key}`] = data1[key];
        }
        else if (data1[key] !== data2[key]) {
            result[`- ${key}`] = data1[key];
            result[`+ ${key}`] = data2[key];
        }
        else {
            result[key] = data2[key];
        }
    });
    console.log(JSON.stringify(result));
    return JSON.stringify(result);
}

const program = new Command();
program
    .description('Compares two configuration files and shows a difference.')
    .version('0.1.0')
    .argument('filepath1')
    .argument('filepath2')
    .option('-f, --format [type]', 'output format')
    .action((filepath1, filepath2) => {
        const newPath1 = path.resolve(filepath1);
        const newPath2 = path.resolve(filepath2);
        const parsed = handleParse([newPath1, newPath2]);
        const diff = genDiff(parsed);
    });

program.parse();
