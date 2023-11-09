#!/usr/bin/env node

import chalk from 'chalk'
import { program } from 'commander'

import { cloneAction, inquirerCloneAction } from '../src/clone/index.mjs'
import { cliPackageJson } from '../src/utils/index.mjs'

program.allowUnknownOption()

// 展示命令行工具的版本号
program
  .version(`${cliPackageJson.name} ${cliPackageJson.version}`)
  .usage('<command> [options]')

// 没有 clone 命令时, 采用终端交互形式
program
  .action(() => inquirerCloneAction())

// 终端参数克隆
program
  .command('clone')
  .description('用于克隆 git 仓库, 可自定义指定只下载仓库中的某个目录')
  // 固定参数
  .argument('<url>', 'git 仓库地址')
  .argument('[savePath]', '指定克隆到本地的目录')
  // 指定配置的参数
  .option('-d, --dir <dir>', '指定需要下载的目录, 默认全部下载')
  .option('-b, --branch <branch>', '指定当前的分支, 默认使用 master 分支')
  .action((url, savePath, args) => cloneAction(url, savePath, args))

// 展示帮助信息
program
  .on('--help', () => {
    console.log()
    console.log(`  Run ${chalk.cyan('gitckt <command> --help')} for detailed usage of given command.`)
    console.log()
  })

program.parse(process.argv)
