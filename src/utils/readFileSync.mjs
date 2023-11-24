import fs from 'fs-extra'

import { cliPackageJsonPath } from './path.mjs'

// package.json 的读取内容
export const cliPackageJson = cliPackageJsonPath
  ? fs.readJsonSync(cliPackageJsonPath)
  : {}
