import chalk from 'chalk'
import symbols from 'log-symbols'

export const log = options => {
  const {
    type = 'info', // 状态
    message, // 输出信息
    prefix = '', // 前置文本
    suffix = '' // 后置文本
  } = options

  const stateOpt = {
    success: 'green', // 成功对应的终端输出颜色
    error: 'red', // 失败对应的终端输出颜色
    info: 'cyan', // 普通信息对应的终端输出颜色
    warning: 'yellow' // 警告对应的终端输出颜色
  }
  if (stateOpt[type]) {
    const stateChalk = chalk[stateOpt[type]]

    console.log(symbols[type], '  ', stateChalk(`${prefix}${message}${suffix}`))
  } else {
    console.log(`${prefix}${message}${suffix}`)
  }
}
