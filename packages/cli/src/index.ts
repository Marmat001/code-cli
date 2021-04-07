#!/usr/bin/env node
import { program } from 'commander'
import { officiateCommand } from './commands/officiate'

program.addCommand(officiateCommand)

program.parse(process.argv)
