class Creator {
    constructor() {
        this.featurePrompt = {
            name: 'features', // 选项名称
            message: 'Check the features needed for your project:', // 选项提示语
            pageSize: 10,
            type: 'checkbox', // 选项类型 另外还有 confirm list 等
            choices: [], // 具体的选项
        }

        this.injectedPrompts = []
    }

    getFinalPrompts() {
        this.injectedPrompts.forEach(prompt => {
            const originalWhen = prompt.when || (() => true)
            prompt.when = answers => originalWhen(answers)
        })
    
        const prompts = [
            this.featurePrompt,
            ...this.injectedPrompts,
        ]
    
        return prompts
    }
}

module.exports = Creator