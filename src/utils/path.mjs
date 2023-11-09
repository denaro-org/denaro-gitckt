import path from 'path'
import { fileURLToPath } from 'url'

// 相当于 node 中的内置变量 __filename
export const __filename = fileURLToPath(import.meta.url)
// 相当于 node 中的内置变量 __dirname
export const __dirname = path.dirname(__filename)
// 相当于 node 中的 process.cwd()
export const __cwd = process.cwd()

// package.json
export const cliPackageJsonPath = path.resolve(__dirname, '../../package.json')
