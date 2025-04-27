import { Command } from "commander";
import process from 'node:process';
import path from 'node:path';
import handleParse from "./handleParse.js";

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
        handleParse([newPath1, newPath2]);
    });

program.parse();
