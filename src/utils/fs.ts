import * as fs from 'fs-extra'

export const existsSync = fs.existsSync

export const mkdir = fs.promises.mkdir

export const rm = fs.promises.rm

export const readFile = fs.promises.readFile

export const writeFile = fs.promises.writeFile

export const copy = fs.copy
