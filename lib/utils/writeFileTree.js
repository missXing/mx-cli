const fs = require('fs-extra')
const path = require('path')

module.exports = async function writeFileTree(dir, files) {
    // 遍历所有渲染好的文件，逐一生成。
    Object.keys(files).forEach((name) => {
        const filePath = path.join(dir, name)
        // 在生成一个文件时，确认它的父目录在不在，如果不在，就先生成父目录。
        fs.ensureDirSync(path.dirname(filePath))
        // 写入文件
        fs.writeFileSync(filePath, files[name])
    })
}
