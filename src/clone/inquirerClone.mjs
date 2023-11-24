import { execSync } from 'child_process'
import fs from 'fs-extra'
import inquirer from 'inquirer'

import { log } from '../utils/index.mjs'

export function inquirerClone() {
  try {
    inquirer
      .prompt([
        {
          type: 'input',
          name: 'url',
          message: '请输入 git 仓库地址:',
          validate: v => {
            // 使用正则检验 url 是否合法, 验证 ssh 的形式或者 http 形式
            const reg = /^(git@|http(s)?:\/\/)([\w.@:/\-~]+)(\.git)(\/)?$/g
            return reg.test(v) ? true : '请输入正确的 git 仓库地址'
          }
        },
        {
          type: 'input',
          name: 'savePath',
          message: '请输入指定克隆到本地的目录:',
          validate: (v, arg) => {
            const { url, savePath } = arg
            const dirName = savePath || url.split('/').pop().replace('.git', '')

            // 判断目录是否存在, 不存在则创建
            if (fs.existsSync(dirName)) {
              return `当前目录【${dirName}】已存在, 请重新输入`
            } else {
              fs.ensureDirSync(dirName)

              return true
            }
          }
        },
        {
          type: 'list',
          name: 'branch',
          message: '请选择分支:',
          choices: arg => {
            const { url, savePath } = arg
            const dirName = savePath || url.split('/').pop().replace('.git', '')

            try {
              // 切换当前目录到 dirName
              process.chdir(dirName)
              execSync('git init', { stdio: 'inherit' })
              execSync(`git remote add origin ${url}`, { stdio: 'inherit' })
              const branchList = execSync('git ls-remote --heads')
                .toString()
                .split('\n')
              return branchList
                .map(item => item.split('refs/heads/').pop())
                .filter(item => item)
            } catch (e) {
              throw new Error(e)
            }
          }
        },
        {
          type: 'input',
          name: 'dir',
          message: '请输入需要下载的目录:'
        }
      ])
      .then(async answers => {
        const { dir, branch } = answers

        // 没有指定目录直接 git pull
        try {
          if (!dir) {
            execSync(`git pull origin ${branch || 'master'}`, {
              stdio: 'inherit'
            })
          } else {
            // 获取当前的系统
            const platform = process.platform
            let command = ''

            switch (platform) {
              case 'win32':
                command = `git config core.sparsecheckout true &
                            echo ${dir} >> .git/info/sparse-checkout & 
                            git pull origin ${branch || 'master'}
                            `
                break
              case 'linux':
              case 'darwin':
                command = ` 
                  git config core.sparsecheckout true
                  echo ${dir} >> .git/info/sparse-checkout
                  git pull origin ${branch || 'master'}
                  `
                break
            }
            // git clone
            execSync(command, { stdio: 'inherit' })
          }
        } catch (e) {
          throw new Error(e)
        } finally {
          log({
            type: 'success',
            message: '克隆成功!'
          })
        }
      })
  } catch (e) {
    throw new Error(e)
  }
}
