import type { DirectoryResult } from 'tmp-promise'

function stubTmpdir(tmpPath: string) {
  return () => tmpPath
}

function stubDir(tmpPath: string) {
  return async () => {
    return {
      path: tmpPath,
      cleanup: async () => {
        return
      },
    } as DirectoryResult
  }
}

export { stubTmpdir, stubDir }
