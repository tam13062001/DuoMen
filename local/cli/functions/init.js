const inquirer = require('inquirer').default
const Handlebars = require('handlebars')
const fs = require('fs/promises')

class Init {
  async prompt() {
    this.options = await inquirer.prompt([
      { name: 'name', type: 'input', message: 'Project Name ?', required: true },
      { name: 'type', type: 'list', message: 'Project Type ?', choices: ['Theme', 'Plugin'] },
      { name: 'db', type: 'text', message: 'Database Name ?' },
      {
        name: 'useTailwindcss',
        type: 'input',
        message: 'Use tailwind css ? [Y/N]',
        default: 'Y'
      }
    ])
  }
  async build(filePath, options) {
    const content = await fs.readFile(filePath, 'utf8')
    const compiler = Handlebars.compile(content)
    return compiler(options)
  }
  async run() {
    await this.prompt()
    console.log(this.options)
  }
}

module.exports = Init
