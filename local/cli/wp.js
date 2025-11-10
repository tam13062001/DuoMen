#!/usr/local/bin/node
const yargs = require('yargs/yargs')
const Init = require("./functions/init")

const argv = yargs(process.argv.slice(2)).argv
const { _, $0, ...args } = argv

async function main() {
  const command = _.shift()
  switch (command) {
    case 'init':
      const init = new Init()
      await init.run()
      break
    default:
      console.log(`Command ${command} is not supported`)
  }
}

main()
