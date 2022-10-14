# 一个vue脚手架

## 综述
- 用户输入命令，准备创建项目。
- 脚手架解析用户命令，并弹出交互语句，询问用户创建项目需要哪些功能。
- 用户选择自己需要的功能。
- 脚手架根据用户的选择创建 package.json 文件，并添加对应的依赖项。
- 脚手架根据用户的选择渲染项目模板，生成文件（例如 index.html、main.js、App.vue 等文件）。
- 执行 npm install 命令安装依赖。

```
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
```


## 处理用户命令
使用 commander.js。这个库的功能就是解析用户的命令，提取出用户的输入交给脚手架

## 和用户交互
使用 Inquirer.js。弹出一个问题和一些选项，让用户选择。并且选项可以指定是多选、单选等等


## 渲染模版
1. 从package.json中提取单独文件 使用 javascript-stringify 序列化
2. 使用 globby 读取模板目录下的所有文件
3. 遍历所有读取的文件。如果文件是二进制文件，则不作处理，渲染时直接生成文件。否则读取文件内容，再调用 ejs 进行渲染
4. 注入特定代码
  - 使用vue-codemod 提供一组用于  jscodeshift 的 codemod 脚本将代码解析成语法抽象树 AST。
  - 然后将要插入的代码变成 AST 节点插入到上面所说的 AST 中。
  - 最后将新的 AST 重新渲染成代码。

## 生成文件
1. 遍历所有渲染好的文件，逐一生成。
2. 在生成一个文件时，确认它的父目录在不在，如果不在，就先生成父目录。
3. 写入文件。

## 下载依赖
使用 execa，它可以调用子进程执行命令

[思维导图](https://s7pa9r4zdw.feishu.cn/docx/L6x9dToX1oEGsqxsqj0czj5HnQf)
