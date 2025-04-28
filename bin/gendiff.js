#!/usr/bin/env node
import { Command } from 'commander'
import path from 'node:path'
import handleParse from '../src/handleParse.js'
import genDiff from '../src/genDiff.js'

const program = new Command()
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .argument('filepath1')
  .argument('filepath2')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => {
    const newPath1 = path.resolve(filepath1)
    const newPath2 = path.resolve(filepath2)
    const parsed = handleParse([newPath1, newPath2])
    genDiff(parsed)
  })

program.parse()
