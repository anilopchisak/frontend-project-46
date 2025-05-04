#!/usr/bin/env node
import { Command } from 'commander'
import handleParse from '../src/handleParse.js'
import genDiff from '../src/genDiff.js'
import stylish from '../src/stylish.js'

const program = new Command()
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .argument('filepath1')
  .argument('filepath2')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2) => {
    const parsed = handleParse([filepath1, filepath2])
    const diff = (genDiff(parsed))
    console.log(diff)
    const formattedDiff = stylish(diff)
    console.log(formattedDiff)
  })

program.parse()
