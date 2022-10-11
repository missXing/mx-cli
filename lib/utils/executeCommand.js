const execa = require('execa')

module.exports = function executeCommand(command, args, cwd) {
    return new Promise((resolve, reject) => {
        const child = execa(command, args, {
            cwd,
            stdio: ['inherit', 'pipe', 'inherit'],
        })

        // 将子进程的输出传给主进程，也就是输出到控制台，让用户看到下载依赖的过程
        child.stdout.on('data', buffer => {
            process.stdout.write(buffer)
        })

        child.on('close', code => {
            if (code !== 0) {
                reject(new Error(`command failed: ${command}`))
                return
            }

            resolve()
        })
    })
}