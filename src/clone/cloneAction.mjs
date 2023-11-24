import { execSync } from 'child_process'
import fs from 'fs-extra'

import { log } from '../utils/index.mjs'

export const cloneAction = (url, savePath, args) => {
  if (url) {
    const { dir, branch } = args
    // 没有 -d 参数时直接使用 git clone
    if (!dir) {
      log({
        type: 'info',
        message: '正在克隆中...'
      })

      try {
        // git clone
        execSync(`git clone ${url} ${savePath} -b ${branch || 'master'}`, {
          stdio: 'inherit'
        })
      } catch (e) {
        throw new Error(e)
      } finally {
        log({
          type: 'success',
          message: '克隆成功!'
        })
      }
    } else {
      // 没有目录的时候解析 url 获取目录
      const dirName = savePath || url.split('/').pop().replace('.git', '')

      // 判断目录是否存在, 不存在则创建
      if (fs.existsSync(dirName)) {
        log({
          type: 'error',
          message: `当前目录【${dirName}】已存在, 请重新输入`
        })
        return false
      }

      fs.ensureDirSync(dirName)

      // 获取当前的系统
      const platform = process.platform

      let command = ''
      switch (platform) {
        case 'win32':
          command = `git init & 
                      git remote add origin ${url} & 
                      git config core.sparsecheckout true & echo ${dir} >> .git/info/sparse-checkout & 
                      git pull origin ${branch || 'master'}
                      `
          break
        case 'linux':
        case 'darwin':
          command = `
            git init
            git remote add origin ${url}
            git config core.sparsecheckout true
            echo ${dir} >> .git/info/sparse-checkout
            git pull origin ${branch || 'master'}
            `
          break
      }

      try {
        // 切换当前目录到 dirName
        process.chdir(dirName)
        // git clone
        execSync(command, { stdio: 'inherit' })
      } catch (e) {
        throw new Error(e)
      } finally {
        log({
          type: 'success',
          message: '克隆成功!'
        })
      }
    }
  } else {
    log({
      type: 'error',
      message: '请输入 git 仓库地址'
    })
  }
}
