const path = require('path')
const inquirer = require('inquirer')
const PromptModuleAPI = require('./PromptModuleAPI')
const Creator = require('./Creator')
const Generator = require('./Generator')
const clearConsole = require('./utils/clearConsole')
const executeCommand = require('./utils/executeCommand')

async function create(name) {
    const creator = new Creator()
    const promptModules = getPromptModules() // 获取所有功能的交互提示语
    const promptAPI = new PromptModuleAPI(creator)
    promptModules.forEach(m => m(promptAPI)) // 将所有交互提示语注入到 creator 对象

    // 清空控制台
    clearConsole()

    // 弹出交互提示语并获取用户的选择,并将用户选择结果赋值给 answers 变量
    const answers = await inquirer.prompt(creator.getFinalPrompts())

    // package.json 文件内容
    const pkg = {
        name,
        version: '0.1.0',
        dependencies: {},
        devDependencies: {},
    }
    
    const generator = new Generator(pkg, path.join(process.cwd(), name))
    // 填入 vue webpack 必选项，无需用户选择
    answers.features.unshift('vue', 'webpack')

    // 根据用户选择的选项加载相应的模块，在 package.json 写入对应的依赖项
    // 并且将对应的 template 模块渲染
    answers.features.forEach(feature => {
        require(`./generator/${feature}`)(generator, answers)
    })

    await generator.generate()

    console.log('\n正在下载依赖...\n')
    // 下载依赖
    // await executeCommand('npm install', path.join(process.cwd(), name))
    await executeCommand('npm', ['install'], path.join(process.cwd(), name))
    console.log('\n依赖下载完成! 执行下列命令开始开发：\n')
    console.log(`cd ${name}`)
    console.log(`npm run dev`)
}

function getPromptModules() {
    return [
        'babel',
        'router',
        'vuex',
        'linter',
    ].map(file => require(`./promptModules/${file}`))
}

module.exports = create