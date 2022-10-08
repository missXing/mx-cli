# mx-cli

├─.vscode
├─bin 
│  ├─mvc.js # mvc 全局命令
├─lib
│  ├─generator # 各个功能的模板
│  │  ├─babel # babel 模板
│  │  ├─linter # eslint 模板
│  │  ├─router # vue-router 模板
│  │  ├─vue # vue 模板
│  │  ├─vuex # vuex 模板
│  │  └─webpack # webpack 模板
│  ├─promptModules # 各个模块的交互提示语
│  └─utils # 一系列工具函数
│  ├─create.js # create 命令处理函数
│  ├─Creator.js # 处理交互提示
│  ├─Generator.js # 渲染模板
│  ├─PromptModuleAPI.js # 将各个功能的提示语注入 Creator
└─scripts # commit message 验证脚本 和项目无关 不需关注