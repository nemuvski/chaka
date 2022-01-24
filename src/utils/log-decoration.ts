type LogValue = string | Error

/**
 * 制御文字
 */
const controlChar = {
  reset: '\x1b[0m',
  underscore: '\x1b[4m',
  red: '\x1b[31m',
  green: '\x1b[32m',
  blue: '\x1b[34m',
}

/**
 * 引数valueを適宜文字列変換して返却する
 * @param value 値
 * @returns string 文字列
 */
function toString(value: LogValue): string {
  if (value instanceof Error) {
    return value.toString()
  }

  return value
}

/**
 * 下線を装飾した文字列を返却する
 *
 * @param value 値
 * @returns string 装飾済み文字列
 */
export function decoUnderscore(value: LogValue): string {
  return controlChar.underscore + toString(value) + controlChar.reset
}

/**
 * 赤色に装飾した文字列を返却する
 *
 * @param value 値
 * @returns string 装飾済み文字列
 */
export function decoRed(value: LogValue): string {
  return controlChar.red + toString(value) + controlChar.reset
}

/**
 * 緑色に装飾した文字列を返却する
 *
 * @param value 値
 * @returns string 装飾済み文字列
 */
export function decoGreen(value: LogValue): string {
  return controlChar.green + toString(value) + controlChar.reset
}

/**
 * 青色に装飾した文字列を返却する
 *
 * @param value 値
 * @returns string 装飾済み文字列
 */
export function decoBlue(value: LogValue): string {
  return controlChar.blue + toString(value) + controlChar.reset
}
