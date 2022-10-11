const { hasYarn } = require('./utils/env')
const isManualMode = answers => answers.preset === '__manual__'

const {
    defaults,
    loadOptions,
} = require('./utils/options')

class Creator {
    constructor() {
        this.injectedPrompts = []
        const { presetPrompt, featurePrompt } = this.getDefaultPrompts()
        this.presetPrompt = presetPrompt
        this.featurePrompt = featurePrompt
    }

    getFinalPrompts() {
        debugger
        this.injectedPrompts.forEach(prompt => {
            const originalWhen = prompt.when || (() => true)
            prompt.when = (answers) => isManualMode(answers) && originalWhen(answers)
        })
    
        const prompts = [
            this.presetPrompt,
            this.featurePrompt,
            ...this.injectedPrompts,
            ...this.getOtherPrompts(),
        ]

        return prompts
    }

    getPresets() {
        const savedOptions = loadOptions()
        return { ...savedOptions.presets, ...defaults.presets }
    }
      
    getDefaultPrompts() {
        const presets = this.getPresets()
        const presetChoices = Object.entries(presets).map(([name, preset]) => {
            let displayName = name

            return {
                name: `${displayName} (${preset.features})`,
                value: name,
            }
        })

        const presetPrompt = {
            name: 'preset',
            type: 'list',
            message: `Please pick a preset:`,
            choices: [
                // 默认配置
                ...presetChoices,
                // 这是手动模式提示语
                {
                    name: 'Manually select features',
                    value: '__manual__',
                },
            ],
        }

        const featurePrompt = {
            name: 'features',
            when: isManualMode,
            type: 'checkbox',
            message: 'Check the features needed for your project:',
            choices: [],
            pageSize: 10,
        }

        return {
            presetPrompt,
            featurePrompt,
        }
    }
      
    getOtherPrompts() {
        // 如果用户创建项目时选择手动模式，询问用户是否将这次的项目选择保存为默认配置
        const otherPrompts = [
            {
                name: 'save',
                when: isManualMode,
                type: 'confirm',
                message: 'Save this as a preset for future projects?',
                default: false,
            },
            {
                name: 'saveName',
                when: answers => answers.save,
                type: 'input',
                message: 'Save preset as:',
            },
        ]
    
        // 获取之前设置的默认配置
        const savedOptions = loadOptions()

        // 之前存储过默认配置 那么packageManager 就会复用之前的配置
        if (!savedOptions.packageManager && hasYarn) {
            const packageManagerChoices = []
    
            if (hasYarn()) {
                packageManagerChoices.push({
                    name: 'Use Yarn',
                    value: 'yarn',
                    short: 'Yarn',
                })
            }
    
            packageManagerChoices.push({
                name: 'Use NPM',
                value: 'npm',
                short: 'NPM',
            })
    
            otherPrompts.push({
                name: 'packageManager',
                type: 'list',
                message: 'Pick the package manager to use when installing dependencies:',
                choices: packageManagerChoices,
            })
        }
    
        return otherPrompts
    }
}

module.exports = Creator