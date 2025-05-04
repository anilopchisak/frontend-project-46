#!/usr/bin/env node
import { Command } from 'commander'
import interfaceGenDiff from '../src/interfaceGenDiff'

const program = new Command()
program
  .description('Compares two configuration files and shows a difference.')
  .version('0.1.0')
  .argument('filepath1')
  .argument('filepath2')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((filepath1, filepath2, formatName = 'stylish') => {
    const diff = interfaceGenDiff(filepath1, filepath2, formatName)
    console.log(diff)
  })

program.parse()
