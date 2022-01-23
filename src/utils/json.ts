/**
 * 文字列からオブジェクトに変換し、返却する
 *
 * @param data 変換する文字列
 * @returns T 変換後のオブジェクト
 */
export function jsonParse<T>(data: string): T {
  return JSON.parse(data)
}

/**
 * オブジェクトを文字列に変換し、返却する
 *
 * @param data 変換するオブジェクト
 * @param space 挿入するスペース数
 * @returns {string} 変換後の文字列
 */
export function jsonStringify(data: any, space = 2): string {
  return JSON.stringify(data, null, space)
}
