import { inquirerClone } from './inquirerClone.mjs'

export const inquirerCloneAction = async () => {
  try {
    inquirerClone()
  } catch (e) {
    throw new Error(e)
  }
}
