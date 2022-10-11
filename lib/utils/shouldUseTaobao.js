const execa = require('execa')
const chalk = require('chalk')
const request = require('./request')
const { hasYarn } = require('./env')
const inquirer = require('inquirer')
const registries = require('./registries')
const { loadOptions, saveOptions } = require('./options')
  
async function ping(registry) {
    await request.get(`${registry}/vue-cli-version-marker/latest`)
    return registry
}
  
function removeSlash(url) {
    return url.replace(/\/$/, '')
}
  
let checked
let result
  
module.exports = async function shouldUseTaobao(command) {
    if (!command) {
        command = hasYarn() ? 'yarn' : 'npm'
    }
  
    // ensure this only gets called once.
    if (checked) return result
    checked = true
  
    // previously saved preference
    const saved = loadOptions().useTaobaoRegistry
    if (typeof saved === 'boolean') {
        // eslint-disable-next-line no-return-assign
        return (result = saved)
    }
  
    const save = val => {
        result = val
        saveOptions({ useTaobaoRegistry: val })
        return val
    }
  
    let userCurrent
    try {
        userCurrent = (await execa(command, ['config', 'get', 'registry'])).stdout
    } catch (registryError) {
        try {
        // Yarn 2 uses `npmRegistryServer` instead of `registry`
            userCurrent = (await execa(command, ['config', 'get', 'npmRegistryServer'])).stdout
        } catch (npmRegistryServerError) {
            return save(false)
        }
    }
  
    const defaultRegistry = registries[command]
    if (removeSlash(userCurrent) !== removeSlash(defaultRegistry)) {
        // user has configured custom registry, respect that
        return save(false)
    }
  
    let faster
    try {
        // 向 npm 默认源和淘宝源各发一个 get 请求，这样更快的那个请求会先返回，从而知道用默认源还是淘宝源。
        faster = await Promise.race([
            ping(defaultRegistry),
            ping(registries.taobao),
        ])
    } catch (e) {
        return save(false)
    }
  
    if (faster !== registries.taobao) {
        // default is already faster
        return save(false)
    }
  
    if (process.env.VUE_CLI_API_MODE) {
        return save(true)
    }
  
    // 如果淘宝源速度更快，向用户提示是否切换到淘宝源
    const { useTaobaoRegistry } = await inquirer.prompt([
        {
            name: 'useTaobaoRegistry',
            type: 'confirm',
            message: chalk.yellow(
                ` Your connection to the default ${command} registry seems to be slow.\n`
            + `   Use ${chalk.cyan(registries.taobao)} for faster installation?`,
            ),
        },
    ])
    
    // 注册淘宝源
    if (useTaobaoRegistry) {
        await execa(command, ['config', 'set', 'registry', registries.taobao])
    }

    return save(useTaobaoRegistry)
}
