#!/usr/bin/env node
import { Command } from 'commander'
import { fileURLToPath } from 'url'
import genDiff from '../src/interfaceGenDiff.js'

const program = new Command()
export const createCli = () => {
  program
    .description('Compares two configuration files and shows a difference.')
    .version('0.1.0')
    .argument('<filepath1>')
    .argument('<filepath2>')
    .option('-f, --format [type]', 'output format', 'stylish')
    .action((filepath1, filepath2, options) => {
      const diff = genDiff(filepath1, filepath2, options.format)
      console.log(diff)
    })
}

if (fileURLToPath(import.meta.url) === process.argv[1]) {
  createCli().parse()
}
